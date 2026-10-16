import React, { useState, useRef } from 'react';
import {
  FileJson,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  Copy,
  Layers,
  Sparkles,
  Scissors,
  Sparkle,
  Check,
  X,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessConfigExport } from '../../types';

// Pre-packaged industry templates for rapid multi-client deployment
const PRESET_TEMPLATES: Record<string, Partial<BusinessConfigExport>> = {
  luxury: {
    business: {
      name: 'Aurélia & Co. Alta Gama',
      category: 'Estética VIP & Alta Peluquería',
      phone: '+54 9 11 4567-8901',
      phoneCountryPrefix: '+54',
      address: 'Av. Alvear 1850, Recoleta',
      currency: '$',
      cbuAlias: 'aurelia.luxury.mp',
      mercadoPagoAlias: 'aurelia.luxury.mp',
      defaultDepositPercentage: 40,
      defaultSlotMinutes: 45,
      openingHour: '09:00',
      closingHour: '20:30',
      themeColor: '#D4AF37',
      themeName: 'Oro Metálico & Obsidian (Oficial)',
    },
    colors: {
      primary: '#D4AF37',
      themeName: 'Oro Metálico & Obsidian (Oficial)',
      palette: ['#D4AF37', '#B8860B', '#FAF6ED', '#1A1813'],
    },
    services: [
      { id: 'srv_lux1', name: 'Tratamiento Oro 24K & Brushing Real', category: 'Tratamientos VIP', durationMinutes: 60, price: 28000, description: 'Nutrición molecular con micropartículas de brillo y masaje craneal', color: '#D4AF37', active: true },
      { id: 'srv_lux2', name: 'Balayage Francés & Gloss Matiz', category: 'Coloración Alta Gama', durationMinutes: 120, price: 42000, description: 'Técnica francesa personalizada y baño de brillo de seda', color: '#B8860B', active: true },
      { id: 'srv_lux3', name: 'Ritual Manicura SPA Imperial', category: 'Manicuría', durationMinutes: 60, price: 16000, description: 'Exfoliación con sales marinas, parafina tibia y esmaltado de autor', color: '#E5C378', active: true },
    ],
    staff: [
      { id: 'stf_lux1', name: 'Sofía Martínez', role: 'Directora Artística & Colorista', phone: '+5491145678901', color: '#D4AF37', workingDays: [1, 2, 3, 4, 5, 6], workingHoursStart: '09:00', workingHoursEnd: '19:00', blockedDates: [], active: true },
      { id: 'stf_lux2', name: 'Mariana López', role: 'Master Stylist & Peinados de Novia', phone: '+5491145678902', color: '#B8860B', workingDays: [2, 3, 4, 5, 6], workingHoursStart: '10:00', workingHoursEnd: '20:00', blockedDates: [], active: true },
    ],
  },
  peluqueria: {
    business: {
      name: 'Salón Glamour Peluquería',
      category: 'Peluquería & Estilismo',
      phone: '+54 9 11 4000-1122',
      phoneCountryPrefix: '+54',
      address: 'Av. Libertador 4500, CABA',
      currency: '$',
      cbuAlias: 'salon.glamour.mp',
      mercadoPagoAlias: 'salon.glamour.mp',
      defaultDepositPercentage: 30,
      defaultSlotMinutes: 30,
      openingHour: '09:00',
      closingHour: '20:00',
      themeColor: '#2563eb',
      themeName: 'Azul Real & Índigo',
    },
    colors: {
      primary: '#2563eb',
      themeName: 'Azul Real & Índigo',
      palette: ['#2563eb', '#3b82f6', '#0284c7'],
    },
    services: [
      { id: 'srv_p1', name: 'Corte Unisex & Brushing', category: 'Peluquería', durationMinutes: 45, price: 9500, description: 'Lavado premium y peinado modelado', color: '#3b82f6', active: true },
      { id: 'srv_p2', name: 'Balayage & Nutrición', category: 'Coloración', durationMinutes: 120, price: 32000, description: 'Decoloración técnica, matiz y baño de brillo', color: '#0284c7', active: true },
      { id: 'srv_p3', name: 'Alisado Definitivo Láser', category: 'Tratamientos', durationMinutes: 90, price: 26000, description: 'Sin formol, brillo espejo y máxima nutrición', color: '#6366f1', active: true },
      { id: 'srv_p4', name: 'Botox Capilar Intensivo', category: 'Tratamientos', durationMinutes: 60, price: 14000, description: 'Recuperación de fibra capilar y sellado', color: '#8b5cf6', active: true },
    ],
    staff: [
      { id: 'stf_p1', name: 'Martina Solís', role: 'Colorista & Estilista Senior', phone: '+5491133001122', color: '#2563eb', workingDays: [1, 2, 3, 4, 5, 6], workingHoursStart: '09:00', workingHoursEnd: '19:00', blockedDates: [], active: true },
      { id: 'stf_p2', name: 'Diego Navarro', role: 'Especialista en Cortes & Peinados', phone: '+5491144002233', color: '#0284c7', workingDays: [2, 3, 4, 5, 6], workingHoursStart: '10:00', workingHoursEnd: '20:00', blockedDates: [], active: true },
    ],
  },
  estetica: {
    business: {
      name: 'Bella Vita Estética & Uñas',
      category: 'Estética, Manicuría & Pestañas',
      phone: '+54 9 11 5566-7788',
      phoneCountryPrefix: '+54',
      address: 'Calle Florida 890, Local 12',
      currency: '$',
      cbuAlias: 'bellavita.unas.mp',
      mercadoPagoAlias: 'bellavita.unas.mp',
      defaultDepositPercentage: 40,
      defaultSlotMinutes: 45,
      openingHour: '08:30',
      closingHour: '19:30',
      themeColor: '#ec4899',
      themeName: 'Rosa Glam & Magenta',
    },
    colors: {
      primary: '#ec4899',
      themeName: 'Rosa Glam & Magenta',
      palette: ['#ec4899', '#db2777', '#d946ef'],
    },
    services: [
      { id: 'srv_e1', name: 'Semipermanente con Kapping Gel', category: 'Manicuría', durationMinutes: 60, price: 11000, description: 'Nail art simple, cutículas rusas y refuerzo', color: '#ec4899', active: true },
      { id: 'srv_e2', name: 'Esculpidas Soft Gel', category: 'Manicuría', durationMinutes: 90, price: 16500, description: 'Largo a elección con esmaltado semipermanente', color: '#d946ef', active: true },
      { id: 'srv_e3', name: 'Lifting de Pestañas & Laminado', category: 'Mirada', durationMinutes: 50, price: 9800, description: 'Arqueado natural, tinte negro y nutrición con keratina', color: '#a855f7', active: true },
      { id: 'srv_e4', name: 'Limpieza Facial Profunda', category: 'Cosmetología', durationMinutes: 60, price: 15000, description: 'Extracción de impurezas, punta de diamante y máscara LED', color: '#06b6d4', active: true },
    ],
    staff: [
      { id: 'stf_e1', name: 'Valeria Rivas', role: 'Nail Artist & Master Kapping', phone: '+5491188776655', color: '#db2777', workingDays: [1, 2, 3, 4, 5, 6], workingHoursStart: '08:30', workingHoursEnd: '18:30', blockedDates: [], active: true },
      { id: 'stf_e2', name: 'Camila Benítez', role: 'Lash Maker & Cosmetóloga', phone: '+5491177665544', color: '#9333ea', workingDays: [1, 2, 3, 4, 5], workingHoursStart: '09:00', workingHoursEnd: '19:00', blockedDates: [], active: true },
    ],
  },
  barberia: {
    business: {
      name: 'The Boss Barber Club',
      category: 'Barbería Tradicional & Moderna',
      phone: '+54 9 11 6677-8899',
      phoneCountryPrefix: '+54',
      address: 'Av. Corrientes 3200',
      currency: '$',
      cbuAlias: 'theboss.barber.mp',
      mercadoPagoAlias: 'theboss.barber.mp',
      defaultDepositPercentage: 30,
      defaultSlotMinutes: 30,
      openingHour: '10:00',
      closingHour: '21:00',
      themeColor: '#334155',
      themeName: 'Grafito & Acero Negro',
    },
    colors: {
      primary: '#334155',
      themeName: 'Grafito & Acero Negro',
      palette: ['#334155', '#475569', '#64748b'],
    },
    services: [
      { id: 'srv_b1', name: 'Corte Degradé Fade & Peinado', category: 'Corte', durationMinutes: 35, price: 8000, description: 'Diseño de navaja y styling con pomada mate', color: '#475569', active: true },
      { id: 'srv_b2', name: 'Ritual de Barba & Toalla Caliente', category: 'Barba', durationMinutes: 30, price: 6500, description: 'Afeitado tradicional con aceites esenciales', color: '#64748b', active: true },
      { id: 'srv_b3', name: 'Combo Full: Corte + Barba + Cejas', category: 'Combos', durationMinutes: 60, price: 13500, description: 'Servicio completo premium con bebida de cortesía', color: '#334155', active: true },
      { id: 'srv_b4', name: 'Color / Platinado Global', category: 'Color', durationMinutes: 90, price: 24000, description: 'Decoloración técnica para rubio platinado o gris', color: '#0ea5e9', active: true },
    ],
    staff: [
      { id: 'stf_b1', name: 'Franco "Kiko" Morales', role: 'Master Barber & Fade Specialist', phone: '+5491122114455', color: '#334155', workingDays: [2, 3, 4, 5, 6], workingHoursStart: '10:00', workingHoursEnd: '20:00', blockedDates: [], active: true },
      { id: 'stf_b2', name: 'Lucas Santana', role: 'Barbero & Diseñador de Barbas', phone: '+5491133225566', color: '#475569', workingDays: [1, 2, 3, 4, 5, 6], workingHoursStart: '11:00', workingHoursEnd: '21:00', blockedDates: [], active: true },
    ],
  },
};

export function ConfigImportExportCard() {
  const { business, exportBusinessConfiguration, importBusinessConfiguration } = useApp();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [pendingImport, setPendingImport] = useState<BusinessConfigExport | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Export current salon configuration to JSON
  const handleExportJSON = () => {
    try {
      const config = exportBusinessConfiguration();
      const jsonString = JSON.stringify(config, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      const safeName = (business?.name || 'salon')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');
      const filename = `config-tu-agenda-lista-${safeName}.json`;

      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccessMessage('¡Archivo JSON exportado correctamente! Listo para duplicar o respaldar.');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Error exporting config:', err);
      setImportError('Error al generar el archivo JSON.');
      setTimeout(() => setImportError(null), 4000);
    }
  };

  // 2. Select file from disk
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        // Validation
        if (!parsed || typeof parsed !== 'object' || !parsed.business || !parsed.business.name) {
          throw new Error('El archivo JSON no contiene una estructura válida de configuración de Tu Agenda Lista.');
        }

        // Set pending import to show confirmation modal
        setPendingImport(parsed as BusinessConfigExport);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error al leer el archivo JSON.';
        setImportError(msg);
      } finally {
        // Reset file input so user can choose same file again if needed
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    reader.onerror = () => {
      setImportError('No se pudo leer el archivo seleccionado.');
    };

    reader.readAsText(file);
  };

  // 3. Confirm and apply pending import
  const handleApplyImport = async () => {
    if (!pendingImport) return;
    setIsProcessing(true);
    try {
      const result = await importBusinessConfiguration(pendingImport);
      setPendingImport(null);
      setSuccessMessage(
        `¡Salón configurado con éxito! Se cargó "${pendingImport.business.name}" con ${result.servicesCount} servicios y ${result.staffCount} profesionales.`
      );
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al aplicar la configuración.';
      setImportError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  // 4. Quick preset template import
  const handleLoadPreset = (key: keyof typeof PRESET_TEMPLATES) => {
    const preset = PRESET_TEMPLATES[key];
    if (!preset) return;

    const fullConfig: BusinessConfigExport = {
      version: '2.0',
      schema: 'TuAgendaLista_Config',
      exportedAt: new Date().toISOString(),
      business: preset.business as BusinessConfigExport['business'],
      colors: preset.colors,
      services: preset.services as BusinessConfigExport['services'],
      staff: preset.staff as BusinessConfigExport['staff'],
      license: {
        developer: 'Iris Quiroz',
        type: 'SaaS Multi-Cliente PRO',
        status: 'ACTIVE_VERIFIED',
        protected: true,
      },
    };

    setPendingImport(fullConfig);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-[#0B0F17] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-500/20 space-y-6">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-[#D4AF37] border border-amber-400/30 flex items-center justify-center font-bold shadow-sm">
            <FileJson className="w-6 h-6 text-[#E5C378]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black tracking-tight text-white">
                Exportar e Importar Configuración (White-Label)
              </h3>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FAF6ED] text-[#946E19] border border-[#E2D1A6] shadow-2xs uppercase">
                SaaS Multi-Cliente
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              Descarga o carga en 1 clic la configuración completa del local (nombre, servicios, empleados y colores) en un archivo JSON para duplicar la app rápidamente para nuevos clientes.
            </p>
          </div>
        </div>

        {/* Action Buttons: Export & Import */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/15 transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
            title="Descargar configuración actual en JSON"
          >
            <Download className="w-4 h-4 text-[#D4AF37]" />
            <span>Exportar JSON</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Cargar archivo JSON de configuración"
          >
            <Upload className="w-4 h-4 text-slate-950" />
            <span>Importar JSON</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {importError && (
        <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{importError}</span>
        </div>
      )}

      {/* Quick Presets / Templates for instant cloning */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
            Plantillas Rápidas para Nuevos Clientes (1 Clic)
          </span>
          <span className="text-[11px] text-slate-400">Preconfiguradas con servicios, precios, empleados y paleta de colores</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => handleLoadPreset('luxury')}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-base">✨</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-[#E5C378]">
                Alta Gama
              </span>
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-[#E5C378] transition-colors">
              Aurélia & Co. VIP
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Oro 24K, Balayage + 2 estilistas (Paleta Oro Oficial).
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleLoadPreset('peluqueria')}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-base">💇‍♀️</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300">
                Peluquería
              </span>
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
              Peluquería & Estilo
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">
              4 servicios (Corte, Color, Botox) + 2 estilistas.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleLoadPreset('estetica')}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/50 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-base">💅</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300">
                Estética & Uñas
              </span>
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-pink-300 transition-colors">
              Manicuría & Pestañas
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Kapping, Soft Gel, Lash + 2 manicuras listas.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleLoadPreset('barberia')}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-base">💈</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-500/30 text-slate-300">
                Barbería
              </span>
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
              Barber Club
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Degradé Fade, Barba + 2 barberos listos.
            </p>
          </button>
        </div>
      </div>

      {/* Confirmation Modal when a JSON file or preset is selected */}
      {pendingImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-7 max-w-lg w-full text-white shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 rounded-xl text-amber-300">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">Confirmar Importación de Salón</h4>
                  <p className="text-xs text-slate-400">Verifica los datos a clonar en la aplicación</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPendingImport(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview details */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Nombre del Salón:</span>
                <span className="font-bold text-white text-sm">{pendingImport.business.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Rubro / Categoría:</span>
                <span className="font-semibold text-amber-300">{pendingImport.business.category}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Catálogo de Servicios:</span>
                <span className="font-bold text-sky-300">{pendingImport.services?.length || 0} servicios incluidos</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Equipo de Profesionales:</span>
                <span className="font-bold text-emerald-300">{pendingImport.staff?.length || 0} profesionales incluidos</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Moneda & Horarios:</span>
                <span className="font-medium text-slate-200">
                  {pendingImport.business.currency} • {pendingImport.business.openingHour || '08:00'} a {pendingImport.business.closingHour || '20:00'} hs
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Color de Marca / Estilo:</span>
                <span className="font-bold text-white flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs"
                    style={{ backgroundColor: pendingImport.business.themeColor || pendingImport.colors?.primary || '#D4AF37' }}
                  />
                  <span>{pendingImport.business.themeName || pendingImport.colors?.themeName || 'Personalizado'}</span>
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Licencia SaaS Autor:</span>
                <span className="font-extrabold text-[#D4AF37] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Iris Quiroz (Fijo e Inmutable)
                </span>
              </div>
            </div>

            <p className="text-[11px] text-amber-200/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
              ⚠️ Al importar, se actualizarán los datos comerciales, servicios, profesionales y colores con la nueva configuración del cliente.
            </p>

            {/* Modal actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPendingImport(null)}
                className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 text-xs font-semibold text-slate-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleApplyImport}
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <Check className="w-4 h-4 text-slate-950" />
                <span>{isProcessing ? 'Importando...' : 'Confirmar y Aplicar al Salón'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
