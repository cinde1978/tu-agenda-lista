import React, { useState } from 'react';
import { Plus, User, Phone, Clock, Calendar, Edit2, Trash2, ShieldAlert } from 'lucide-react';
import { StaffMember } from '../../types';
import { useApp } from '../../context/AppContext';
import { StaffModal } from './StaffModal';

const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export function StaffView() {
  const { staff, deleteStaff, appointments } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState<StaffMember | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar a ${name} del equipo?`)) {
      await deleteStaff(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Equipo de Profesionales</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configuración de especialistas, horarios de atención y días no disponibles
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setStaffToEdit(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Profesional</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {staff.map((member) => {
          // Count active appointments for this staff
          const memberAppointments = appointments.filter((a) => a.staffId === member.id && a.status !== 'cancelado');

          return (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl text-white flex items-center justify-center font-bold text-lg shadow-sm"
                      style={{ backgroundColor: member.color || '#2563eb' }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{member.name}</h4>
                      <p className="text-xs text-blue-600 font-medium">{member.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setStaffToEdit(member);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(member.id, member.name)}
                      className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {member.phone && (
                  <p className="text-xs text-slate-600 flex items-center gap-1.5 mb-3">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{member.phone}</span>
                  </p>
                )}

                {/* Schedule and working days */}
                <div className="space-y-2 py-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Horario habitual:
                    </span>
                    <span className="font-semibold text-slate-800">
                      {member.workingHoursStart} - {member.workingHoursEnd} hs
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Días laborales:</span>
                    <div className="flex items-center gap-1 flex-wrap">
                      {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                        const isWorking = member.workingDays.includes(d);
                        return (
                          <span
                            key={d}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              isWorking
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-400 opacity-60'
                            }`}
                          >
                            {DAY_NAMES[d]}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {member.blockedDates.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 mb-1">
                        <ShieldAlert className="w-3 h-3" />
                        {member.blockedDates.length} fecha(s) bloqueadas
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {member.blockedDates.slice(0, 3).map((d) => (
                          <span
                            key={d}
                            className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-[10px]"
                          >
                            {d}
                          </span>
                        ))}
                        {member.blockedDates.length > 3 && (
                          <span className="text-[10px] text-slate-400 self-center">
                            +{member.blockedDates.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom stats */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Turnos en agenda:</span>
                <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {memberAppointments.length} turnos
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <StaffModal
          staffToEdit={staffToEdit}
          onClose={() => {
            setIsModalOpen(false);
            setStaffToEdit(null);
          }}
          onSaved={() => {
            setIsModalOpen(false);
            setStaffToEdit(null);
          }}
        />
      )}
    </div>
  );
}
