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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-gradient-to-r from-blue-700 to-sky-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {staffToEdit ? 'Editar Profesional' : 'Nuevo Profesional'}
              </h3>
              <p className="text-blue-100 text-xs">
                Configura días de atención, horarios y bloqueos de agenda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Nombre Completo *</label>
              <input
                type="text"
                required
                placeholder="Ej. Camila Rossi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Especialidad / Rol *</label>
              <input
                type="text"
                required
                placeholder="Ej. Colorista & Peinadora"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">WhatsApp / Contacto</label>
              <input
                type="tel"
                placeholder="+54 9 11 1234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Color distintivo</label>
              <div className="flex items-center gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      color === c ? 'scale-110 border-slate-800' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Working Days */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Días de atención en la semana
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((d) => {
                const isSelected = workingDays.includes(d.day);
                return (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => toggleDay(d.day)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Working Hours */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Hora de entrada</label>
              <input
                type="time"
                value={workingHoursStart}
                onChange={(e) => setWorkingHoursStart(e.target.value)}
                className="w-full text-sm p-2 rounded-lg border border-slate-200 bg-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Hora de salida</label>
              <input
                type="time"
                value={workingHoursEnd}
                onChange={(e) => setWorkingHoursEnd(e.target.value)}
                className="w-full text-sm p-2 rounded-lg border border-slate-200 bg-white outline-none"
              />
            </div>
          </div>

          {/* Blocked Dates / Vacations */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Días no disponibles / Vacaciones / Francos especiales
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="date"
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
                className="flex-1 text-xs p-2 rounded-xl border border-slate-200 outline-none"
              />
              <button
                type="button"
                onClick={handleAddBlockedDate}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Bloquear fecha</span>
              </button>
            </div>

            {blockedDates.length > 0 && (
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-slate-50 rounded-lg">
                {blockedDates.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium"
                  >
                    <span>{d}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBlockedDate(d)}
                      className="hover:text-rose-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>Profesional activo en el equipo</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Guardando...' : staffToEdit ? 'Guardar' : 'Crear Profesional'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
