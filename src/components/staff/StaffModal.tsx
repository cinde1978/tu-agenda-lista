import React, { useState, useEffect } from 'react';

export function AgendaStaffView() {
  // Estado para la sucursal activa (Sucursal 1 o Sucursal 2) de forma independiente
  const [sucursalActiva, setSucursalActiva] = useState<'sucursal-1' | 'sucursal-2'>('sucursal-1');

  const [profesionalesStaff, setProfesionalesStaff] = useState<Array<{ id: string; nombre: string; avatar: string }>>(() => {
    try {
      const guardados = localStorage.getItem('soham_profesionales_v3');
      return guardados ? JSON.parse(guardados) : [
        { id: 'anto', nombre: 'Anto', avatar: 'A' },
        { id: 'daiana', nombre: 'Daiana', avatar: 'D' },
        { id: 'damaris', nombre: 'Damaris', avatar: 'D' },
        { id: 'iris', nombre: 'Iris', avatar: 'I' },
        { id: 'sofia', nombre: 'Sofia / Masajista 2', avatar: 'S' }
      ];
    } catch {
      return [
        { id: 'anto', nombre: 'Anto', avatar: 'A' },
        { id: 'daiana', nombre: 'Daiana', avatar: 'D' },
        { id: 'damaris', nombre: 'Damaris', avatar: 'D' },
        { id: 'iris', nombre: 'Iris', avatar: 'I' },
        { id: 'sofia', nombre: 'Sofia / Masajista 2', avatar: 'S' }
      ];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('soham_profesionales_v3', JSON.stringify(profesionalesStaff));
    } catch (e) {
      console.error(e);
    }
  }, [profesionalesStaff]);

  const horas = [
    '08:00', '08:15', '08:30', '08:45',
    '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45',
    '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45',
    '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30', '16:45',
    '17:00', '17:15', '17:30', '17:45',
    '18:00', '18:15', '18:30', '18:45',
    '19:00', '19:15', '19:30', '19:45'
  ];

  // Citas independientes por sucursal
  const [citasPorSucursal, setCitasPorSucursal] = useState<{ [sucursal: string]: { [key: string]: { cliente: string; servicio: string; duracionMin: number; esInicio: boolean } } }>(() => {
    try {
      const guardadas = localStorage.getItem('soham_citas_por_sucursal_v1');
      return guardadas ? JSON.parse(guardadas) : { 'sucursal-1': {}, 'sucursal-2': {} };
    } catch {
      return { 'sucursal-1': {}, 'sucursal-2': {} };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('soham_citas_por_sucursal_v1', JSON.stringify(citasPorSucursal));
    } catch (e) {
      console.error(e);
    }
  }, [citasPorSucursal]);

  const citas = citasPorSucursal[sucursalActiva] || {};

  const cambiarProfesional = (profId: string, nombreActual: string) => {
    const nuevoNombre = window.prompt(`Modificar nombre del profesional (Reemplazo):`, nombreActual);
    if (!nuevoNombre || nuevoNombre.trim() === '') return;

    const actualizado = profesionalesStaff.map(p => {
      if (p.id === profId) {
        return { ...p, nombre: nuevoNombre.trim(), avatar: nuevoNombre.trim().charAt(0).toUpperCase() };
      }
      return p;
    });
    setProfesionalesStaff(actualizado);
  };

  const manejarClickCelda = (profId: string, hora: string) => {
    const clave = `${profId}-${hora}`;
    const citaActual = citas[clave];

    const actualizaCitasSucursal = (nuevosDatos: { [key: string]: any }) => {
      setCitasPorSucursal(prev => ({
        ...prev,
        [sucursalActiva]: nuevosDatos
      }));
    };

    if (citaActual) {
      const accion = window.prompt(
        `Turno asignado (${sucursalActiva === 'sucursal-1' ? 'Sucursal 1' : 'Sucursal 2'}):\nCliente: ${citaActual.cliente}\nServicio: ${citaActual.servicio} (${citaActual.duracionMin} min)\n\nEscriba "borrar" para eliminar el turno:`,
        citaActual.cliente
      );

      if (accion === null) return;

      if (accion.toLowerCase() === 'borrar' || accion.trim() === '') {
        const copia = { ...citas };
        const bloquesOcupados = citaActual.duracionMin / 15;
        const indiceHora = horas.indexOf(hora);
        
        for (let i = 0; i < bloquesOcupados; i++) {
          if (indiceHora + i < horas.length) {
            delete copia[`${profId}-${horas[indiceHora + i]}`];
          }
        }
        actualizaCitasSucursal(copia);
      }
    } else {
      const cliente = window.prompt('Ingrese el nombre del cliente para este turno:');
      if (!cliente || cliente.trim() === '') return;

      const servicio = window.prompt('Ingrese el servicio (ej: Limpieza facial, Masajes):') || 'Sesión General';
      const duracionInput = window.prompt('Duración de la sesión en minutos (ej: 15, 30, 45, 60, 90):', '30');
      const duracionMin = parseInt(duracionInput || '30', 10) || 30;
      const bloquesOcupados = Math.ceil(duracionMin / 15);

      const indiceHora = horas.indexOf(hora);
      const copia = { ...citas };

      copia[clave] = { cliente: cliente.trim(), servicio: servicio.trim(), duracionMin, esInicio: true };

      for (let i = 1; i < bloquesOcupados; i++) {
        if (indiceHora + i < horas.length) {
          copia[`${profId}-${horas[indiceHora + i]}`] = { cliente: cliente.trim(), servicio: `(Ocupado)`, duracionMin: 0, esInicio: false };
        }
      }

      actualizaCitasSucursal(copia);
    }
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', width: '100%', fontFamily: 'sans-serif', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '6px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Estética Soham Rosario — Vista por Staff</h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Seleccione sucursal y haga clic en el profesional para reemplazar o en un horario para agendar.</span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            onClick={() => setSucursalActiva('sucursal-1')}
            style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', backgroundColor: sucursalActiva === 'sucursal-1' ? '#2563eb' : '#e2e8f0', color: sucursalActiva === 'sucursal-1' ? '#fff' : '#475569', border: 'none' }}
          >
            Sucursal 1
          </button>
          <button 
            onClick={() => setSucursalActiva('sucursal-2')}
            style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', backgroundColor: sucursalActiva === 'sucursal-2' ? '#2563eb' : '#e2e8f0', color: sucursalActiva === 'sucursal-2' ? '#fff' : '#475569', border: 'none' }}
          >
            Sucursal 2
          </button>
          <span style={{ fontSize: '11px', color: '#047857', backgroundColor: '#d1fae5', padding: '4px 8px', borderRadius: '4px', fontWeight: '600', marginLeft: '8px' }}>● Sincronizado</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '65px repeat(5, 1fr)', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#ffffff', maxHeight: '520px', overflowY: 'auto' }}>
        <div style={{ borderRight: '1px solid #cbd5e1', backgroundColor: '#f1f5f9' }}>
          <div style={{ padding: '10px 4px', textAlign: 'center', fontWeight: 'bold', fontSize: '11px', color: '#334155', borderBottom: '1px solid #cbd5e1', position: 'sticky', top: 0, backgroundColor: '#f1f5f9', zIndex: 10 }}>Hora</div>
          {horas.map((hora) => (
            <div key={hora} style={{ height: '34px', borderBottom: '1px solid #e2e8f0', fontSize: '11px', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '500' }}>
              {hora}
            </div>
          ))}
        </div>

        {profesionalesStaff.map((prof) => (
          <div key={prof.id} style={{ borderRight: '1px solid #cbd5e1', position: 'relative', backgroundColor: '#ffffff' }}>
            <div 
              onClick={() => cambiarProfesional(prof.id, prof.nombre)}
              style={{ padding: '8px 6px', borderBottom: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f8fafc', position: 'sticky', top: 0, zIndex: 10, height: '35px', cursor: 'pointer' }}
              title="Clic para cambiar el profesional"
            >
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '10px', flexShrink: 0 }}>
                {prof.avatar}
              </div>
              <span style={{ fontWeight: '600', fontSize: '11px', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prof.nombre} ✏️</span>
            </div>

            {horas.map((hora) => {
              const clave = `${prof.id}-${hora}`;
              const cita = citas[clave];
              return (
                <div 
                  key={hora} 
                  onClick={() => manejarClickCelda(prof.id, hora)}
                  style={{ 
                    height: '34px', 
                    borderBottom: '1px solid #f1f5f9', 
                    borderRight: '1px solid #f1f5f9',
                    position: 'relative', 
                    cursor: 'pointer',
                    backgroundColor: cita ? (cita.esInicio ? '#dbeafe' : '#f0fdf4') : 'transparent',
                    padding: '2px 4px',
                    fontSize: '11px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: '#1e3a8a',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                  title={cita ? `${cita.cliente} - ${cita.servicio}` : 'Disponible (Clic para agendar)'}
                >
                  {cita && cita.esInicio ? (
                    <>
                      <span style={{ fontWeight: 'bold', lineHeight: '1.1', fontSize: '10px' }}>{cita.cliente}</span>
                      <span style={{ fontSize: '9px', color: '#1e40af', opacity: 0.9, lineHeight: '1' }}>{cita.servicio} ({cita.duracionMin}m)</span>
                    </>
                  ) : cita ? (
                    <span style={{ fontSize: '9px', color: '#166534', fontStyle: 'italic' }}>{cita.servicio}</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgendaStaffView;



   
 
 
    
   
    
   
   
      
             

          
             
            
           
               

            

         
}
