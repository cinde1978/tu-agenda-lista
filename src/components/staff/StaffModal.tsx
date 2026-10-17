import React, { useState } from 'react';
import { X, User, Phone, Briefcase, Clock, Calendar, Check, Trash2, Plus } from 'lucide-react';
import { StaffMember } from '../../types';
import { useApp } from '../../context/AppContext';

interface StaffModalProps {
  staffToEdit?: StaffMember | null;
  onClose: () => void;
  onSaved: (staffId: string) => void;
}

const DAYS_OF_WEEK = [
  { day: 1, label: 'Lunes' },
  { day: 2, label: 'Martes' },
  { day: 3, label: 'Miércoles' },
  { day: 4, label: 'Jueves' },
  { day: 5, label: 'Viernes' },
  { day: 6, label: 'Sábado' },
  { day: 0, label: 'Domingo' },
];

const COLORS = [
  '#2563eb', // royal blue
  '#0284c7', // sky blue
  '#0d9488', // teal
  '#6366f1', // indigo
  '#7c3aed', // violet
  '#db2777', // pink
  '#ea580c', // orange
];

export function StaffModal({ staffToEdit, onClose, onSaved }: StaffModalProps) {
  const { createStaff, updateStaff } = useApp();
  const [name, setName] = useState(staffToEdit?.name || '');
  const [role, setRole] = useState(staffToEdit?.role || 'Estilista / Especialista');
  const [phone, setPhone] = useState(staffToEdit?.phone || '');
  const [color, setColor] = useState(staffToEdit?.color || COLORS[0]);
  const [workingDays, setWorkingDays] = useState<number[]>(staffToEdit?.workingDays || [1, 2, 3, 4, 5, 6]);
  const [workingHoursStart, setWorkingHoursStart] = useState(staffToEdit?.workingHoursStart || '09:00');
  const [workingHoursEnd, setWorkingHoursEnd] = useState(staffToEdit?.workingHoursEnd || '20:00');
  const [blockedDates, setBlockedDates] = useState<string[]>(staffToEdit?.blockedDates || []);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [active, setActive] = useState(staffToEdit?.active ?? true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDay = (day: number) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDate) return;
    if (!blockedDates.includes(newBlockedDate)) {
      setBlockedDates([...blockedDates, newBlockedDate]);
    }
    setNewBlockedDate('');
  };

  const handleRemoveBlockedDate = (dateStr: string) => {
    setBlockedDates(blockedDates.filter((d) => d !== dateStr));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      if (staffToEdit) {
        await updateStaff({
          ...staffToEdit,
          name: name.trim(),
          role: role.trim(),
          phone: phone.trim(),
          color,
          workingDays,
          workingHoursStart,
          workingHoursEnd,
          blockedDates,
          active,
        });
        onSaved(staffToEdit.id);
      } else {
        const newId = await createStaff({
          name: name.trim(),
          role: role.trim(),
          phone: phone.trim(),
          color,
          workingDays,
          workingHoursStart,
          workingHoursEnd,
          blockedDates,
          active,
        });
        onSaved(newId);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[85vh] flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header (Compact) */}
        <div className="bg-gradient-to-r from-blue-700 to-sky-600 px-4 py-3 sm:px-5 sm:py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-xs">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                {staffToEdit ? 'Editar Profesional' : 'Nuevo Profesional'}
              </h3>
              <p className="text-blue-100 text-[11px] sm:text-xs">
                Configura atención, horarios y bloqueos
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body with Sticky Footer */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto flex flex-col justify-between">
          <div className="p-4 sm:p-5 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Camila Rossi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Especialidad / Rol *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Colorista & Peinadora"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">WhatsApp / Contacto</label>
                <input
                  type="tel"
                  placeholder="+54 9 11 1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Color distintivo</label>
                <div className="flex items-center gap-1.5 pt-0.5">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all cursor-pointer ${
                        color === c ? 'scale-110 border-slate-900 ring-2 ring-blue-300' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Working Days */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-1.5">
                Días de atención en la semana
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DAYS_OF_WEEK.map((d) => {
                  const isSelected = workingDays.includes(d.day);
                  return (
                    <button
                      key={d.day}
                      type="button"
                      onClick={() => toggleDay(d.day)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Working Hours */}
            <div className="grid grid-cols-2 gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Hora de entrada</label>
                <input
                  type="time"
                  value={workingHoursStart}
                  onChange={(e) => setWorkingHoursStart(e.target.value)}
                  className="w-full text-xs sm:text-sm p-1.5 rounded-lg border border-slate-300 bg-white font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Hora de salida</label>
                <input
                  type="time"
                  value={workingHoursEnd}
                  onChange={(e) => setWorkingHoursEnd(e.target.value)}
                  className="w-full text-xs sm:text-sm p-1.5 rounded-lg border border-slate-300 bg-white font-semibold outline-none"
                />
              </div>
            </div>

            {/* Blocked Dates / Vacations */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-1">
                Días no disponibles / Vacaciones / Francos
              </label>
              <div className="flex items-center gap-2 mb-1.5">
                <input
                  type="date"
                  value={newBlockedDate}
                  onChange={(e) => setNewBlockedDate(e.target.value)}
                  className="flex-1 text-xs p-1.5 rounded-lg border border-slate-300 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddBlockedDate}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Bloquear</span>
                </button>
              </div>

              {blockedDates.length > 0 && (
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-slate-200">
                  {blockedDates.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"
                    >
                      <span>{d}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBlockedDate(d)}
                        className="hover:text-rose-900 cursor-pointer"
                        title="Eliminar bloqueo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-800 font-bold">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span>Profesional activo en el equipo</span>
              </label>
            </div>
          </div>

          {/* Sticky Action Footer */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 px-4 py-3 sm:px-5 sm:py-3 flex items-center justify-end gap-2.5 shrink-0 z-20 shadow-xs">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:border-black bg-white hover:bg-slate-100 text-[#000000] font-black text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#172554] active:scale-98 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{isSubmitting ? 'Guardando...' : staffToEdit ? 'Guardar Cambios' : 'Crear Profesional'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
