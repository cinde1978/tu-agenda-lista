import React from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
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
  const { staff, selectedBranch } = useApp();
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
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Date Navigator */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-100 rounded-xl p-1 border-2 border-slate-300 gap-1">
            <button
              type="button"
              onClick={() => handleShiftDate(agendaMode === 'semana' ? -7 : agendaMode === 'mes' ? -30 : -1)}
              className="p-1.5 hover:bg-white rounded-lg text-[#0F172A] hover:text-black transition-colors cursor-pointer"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() => onDateChange(todayStr)}
              className={`px-3.5 py-1 text-xs font-black rounded-lg border-2 transition-all cursor-pointer ${
                currentDate === todayStr
                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                  : 'bg-white text-[#1E3A8A] border-slate-300 hover:border-[#1E3A8A] hover:bg-blue-50'
              }`}
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={() => handleShiftDate(agendaMode === 'semana' ? 7 : agendaMode === 'mes' ? 30 : 1)}
              className="p-1.5 hover:bg-white rounded-lg text-[#0F172A] hover:text-black transition-colors cursor-pointer"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          <div className="relative">
            <input
              type="date"
              value={currentDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="text-xs p-2 rounded-xl border-2 border-slate-300 bg-white font-black text-[#000000] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
            />
          </div>

          <span className="text-xs font-black text-[#0F172A] capitalize hidden sm:inline-block px-2">
            {formatDateSpanishLong(currentDate)}
          </span>

          <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-[#0F172A] border-2 border-slate-300 shadow-2xs">
            {selectedBranch === 'sucursal_2' ? 'Sucursal 2' : 'Sucursal 1'}
          </span>
        </div>

        {/* View mode toggle & staff filter */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Staff filter */}
          <div className="flex items-center gap-1.5 bg-white border-2 border-slate-300 hover:border-slate-800 rounded-xl px-2.5 py-1 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
            <select
              value={selectedStaffId}
              onChange={(e) => onStaffChange(e.target.value)}
              className="text-xs font-black bg-white text-[#000000] outline-none cursor-pointer py-1"
            >
              <option value="todos" className="text-[#000000] font-bold bg-white">Todos los profesionales</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id} className="text-[#000000] font-bold bg-white">
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Switcher: Día, Semana, Mes with visible borders & high-contrast dark blue / black text */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border-2 border-slate-300">
            <button
              type="button"
              onClick={() => onModeChange('dia')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                agendaMode === 'dia'
                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                  : 'bg-white text-[#0F172A] border-slate-300 hover:border-slate-700 hover:text-black'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Día</span>
            </button>
            <button
              type="button"
              onClick={() => onModeChange('semana')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                agendaMode === 'semana'
                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                  : 'bg-white text-[#0F172A] border-slate-300 hover:border-slate-700 hover:text-black'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Semana</span>
            </button>
            <button
              type="button"
              onClick={() => onModeChange('mes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                agendaMode === 'mes'
                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                  : 'bg-white text-[#0F172A] border-slate-300 hover:border-slate-700 hover:text-black'
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
            className="px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nuevo Turno</span>
          </button>
        </div>
      </div>
    </div>
  );
}
