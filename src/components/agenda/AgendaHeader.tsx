import React from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  User,
  Plus,
  Clock,
  CalendarDays,
  CalendarRange
} from 'lucide-react';
import { AgendaMode } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatDateSpanishLong } from '../../utils/formatters';
import { getTodayDateString } from '../../utils/initialData';

interface AgendaHeaderProps {
  currentDate: string;
  onDateChange: (date: string) => void;
  agendaMode: AgendaMode;
  onModeChange: (mode: AgendaMode) => void;
  selectedStaffId: string;
  onStaffChange: (staffId: string) => void;
  onNewAppointment: () => void;
}

export function AgendaHeader({
  currentDate,
  onDateChange,
  agendaMode,
  onModeChange,
  selectedStaffId,
  onStaffChange,
  onNewAppointment,
}: AgendaHeaderProps) {
  const { staff } = useApp();
  const todayStr = getTodayDateString();

  const handleShiftDate = (deltaDays: number) => {
    const [y, m, d] = currentDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() + deltaDays);
    const nextY = dateObj.getFullYear();
    const nextM = String(dateObj.getMonth() + 1).padStart(2, '0');
    const nextD = String(dateObj.getDate()).padStart(2, '0');
    onDateChange(`${nextY}-${nextM}-${nextD}`);
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Date Navigator */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-gray-100/90 rounded-xl p-1 border border-gray-200/60">
            <button
              type="button"
              onClick={() => handleShiftDate(agendaMode === 'semana' ? -7 : agendaMode === 'mes' ? -30 : -1)}
              className="p-1.5 hover:bg-white rounded-lg text-gray-600 transition-colors"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDateChange(todayStr)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                currentDate === todayStr
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-gray-700 hover:bg-white'
              }`}
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={() => handleShiftDate(agendaMode === 'semana' ? 7 : agendaMode === 'mes' ? 30 : 1)}
              className="p-1.5 hover:bg-white rounded-lg text-gray-600 transition-colors"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <input
              type="date"
              value={currentDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="text-xs p-2 rounded-xl border border-gray-200 bg-white font-semibold text-gray-800 outline-none focus:border-purple-600"
            />
          </div>

          <span className="text-xs font-bold text-gray-700 capitalize hidden sm:inline-block px-2">
            {formatDateSpanishLong(currentDate)}
          </span>
        </div>

        {/* View mode toggle & staff filter */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Staff filter */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedStaffId}
              onChange={(e) => onStaffChange(e.target.value)}
              className="text-xs font-semibold bg-transparent text-gray-700 outline-none cursor-pointer py-1"
            >
              <option value="todos">Todos los profesionales</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-gray-100/90 p-1 rounded-xl border border-gray-200/60">
            <button
              type="button"
              onClick={() => onModeChange('dia')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                agendaMode === 'dia' ? 'bg-purple-700 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Día</span>
            </button>
            <button
              type="button"
              onClick={() => onModeChange('semana')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                agendaMode === 'semana' ? 'bg-purple-700 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Semana</span>
            </button>
            <button
              type="button"
              onClick={() => onModeChange('mes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                agendaMode === 'mes' ? 'bg-purple-700 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarRange className="w-3.5 h-3.5" />
              <span>Mes</span>
            </button>
          </div>

          {/* New turn button */}
          <button
            type="button"
            onClick={onNewAppointment}
            className="px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Turno</span>
          </button>
        </div>
      </div>
    </div>
  );
}
