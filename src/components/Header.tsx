import React from 'react';
import {
  Calendar,
  Users,
  Wallet,
  Printer,
  Plus,
  Bell,
  Search,
  Sparkles,
  Menu,
  Clock,
  Building2,
  DollarSign
} from 'lucide-react';
import { ViewTab } from '../types';
import { useApp } from '../context/AppContext';
import { formatDateSpanishLong } from '../utils/formatters';
import { getTodayDateString } from '../utils/initialData';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onNewAppointment: () => void;
  onOpenReminders: () => void;
}

export function Header({
  currentTab,
  onSelectTab,
  onNewAppointment,
  onOpenReminders,
}: HeaderProps) {
  const { business, unreadRemindersCount, upcomingTodayAppointments } = useApp();
  const todayStr = getTodayDateString();

  return (
    <>
      {/* Top Header Bar */}
      <header className="no-print bg-white/95 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-20 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 select-none">
        {/* Left: Mobile Brand OR Desktop Section Title */}
        <div className="flex items-center gap-3">
          {/* Mobile only brand */}
          <div
            className="flex lg:hidden items-center gap-2.5 cursor-pointer"
            onClick={() => onSelectTab('agenda')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-gray-900 block leading-tight">
                Tu Agenda <span className="text-purple-600">Lista</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium block truncate max-w-[140px]">
                {business?.name || 'Pro'}
              </span>
            </div>
          </div>

          {/* Desktop Section Title & Today Date */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-xs font-bold text-gray-700 capitalize flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200/70">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              {formatDateSpanishLong(todayStr)}
            </span>
          </div>
        </div>

        {/* Right Actions: Reminders, Print quick link, and "+ Nuevo Turno" */}
        <div className="flex items-center gap-2.5">
          {/* Reminders Bell with Active Badge */}
          <button
            type="button"
            onClick={onOpenReminders}
            className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
            title="Centro de Recordatorios"
          >
            <Bell className="w-5 h-5" />
            {unreadRemindersCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse shadow-xs">
                {unreadRemindersCount}
              </span>
            )}
          </button>

          {/* New Turn Button (Header) */}
          <button
            type="button"
            onClick={onNewAppointment}
            className="hidden sm:flex px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white rounded-xl text-xs font-bold items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Turno</span>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (48px+ touch targets) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 lg:hidden flex items-center justify-around h-16 px-2 shadow-lg no-print select-none">
        <button
          type="button"
          onClick={() => onSelectTab('agenda')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'agenda' ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Agenda</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('clientes')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'clientes' ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Clientes</span>
        </button>

        {/* Center Floating Action Button */}
        <button
          type="button"
          onClick={onNewAppointment}
          className="w-13 h-13 -mt-6 rounded-full bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/35 active:scale-95 transition-transform"
          title="Nuevo Turno"
        >
          <Plus className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('caja')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'caja' ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Wallet className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Caja</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('reportes')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'reportes' ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Métricas</span>
        </button>
      </nav>
    </>
  );
}
