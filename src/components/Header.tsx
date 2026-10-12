import React from 'react';
import {
  Calendar,
  Users,
  Wallet,
  Plus,
  Bell,
  Download,
} from 'lucide-react';
import { ViewTab } from '../types';
import { useApp } from '../context/AppContext';
import { formatDateSpanishLong } from '../utils/formatters';
import { getTodayDateString } from '../utils/initialData';
import { AppLogo } from './AppLogo';
import { usePWAInstall } from '../hooks/usePWAInstall';

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
  const { business, unreadRemindersCount } = useApp();
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const todayStr = getTodayDateString();

  const brandName = (business?.name && business.name !== '[Tu Nombre o Marca]') ? business.name : 'Tu Agenda Lista';

  const getTabLabel = () => {
    switch (currentTab) {
      case 'agenda': return 'Agenda & Turnos';
      case 'clientes': return 'Directorio de Clientes';
      case 'servicios': return 'Catálogo de Servicios';
      case 'profesionales': return 'Equipo Profesional';
      case 'caja': return 'Caja Diaria & Finanzas';
      case 'reportes': return 'Métricas & Estadísticas';
      case 'exportar': return 'Imprimir & Exportar';
      case 'configuracion': return 'Configuración de Marca';
      default: return 'Agenda';
    }
  };

  return (
    <>
      {/* Top Clean SaaS Header Bar */}
      <header className="no-print bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 select-none shadow-xs">
        {/* Brand & Section Overview */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Logo & Main Title Area (Single clean instance, no duplicated subtitles, no truncation) */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0 group"
            onClick={() => onSelectTab('agenda')}
          >
            {/* Modern SaaS Vector Logo combining Calendar + Checkmark */}
            <AppLogo size={38} className="group-hover:scale-105 transition-transform shrink-0" />

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-slate-900 whitespace-nowrap leading-none">
                {brandName}
              </span>
              <span className="inline-flex text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/70 uppercase tracking-wider shrink-0">
                PRO
              </span>
            </div>
          </div>

          {/* Desktop Section Divider & Current View Pill */}
          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-200">
            <span className="text-xs font-bold text-slate-700 bg-slate-100/90 px-3 py-1.5 rounded-xl border border-slate-200/60 whitespace-nowrap">
              {getTabLabel()}
            </span>
            <span className="text-xs font-semibold text-slate-600 capitalize flex items-center gap-1.5 bg-blue-50/60 px-3 py-1.5 rounded-xl border border-blue-100/80 text-blue-800 whitespace-nowrap">
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              {formatDateSpanishLong(todayStr)}
            </span>
          </div>
        </div>

        {/* Right Actions: PWA Install (if available) + Reminders + Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* PWA quick install button in header if installable */}
          {isInstallable && !isInstalled && (
            <button
              type="button"
              onClick={install}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 transition-colors"
              title="Instalar App en el dispositivo"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Instalar App</span>
            </button>
          )}

          {/* Center of Reminders with counter */}
          <button
            type="button"
            onClick={onOpenReminders}
            className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            title="Centro de Recordatorios"
          >
            <Bell className="w-5 h-5" />
            {unreadRemindersCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse shadow-xs">
                {unreadRemindersCount}
              </span>
            )}
          </button>

          {/* "+ Nuevo Turno" Premium Button */}
          <button
            type="button"
            onClick={onNewAppointment}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nuevo Turno</span>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (48px+ touch targets) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 lg:hidden flex items-center justify-around h-16 px-2 shadow-lg no-print select-none">
        <button
          type="button"
          onClick={() => onSelectTab('agenda')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'agenda' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Agenda</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('clientes')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'clientes' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Clientes</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('caja')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'caja' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Caja</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('configuracion')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'configuracion' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">
            ⚙
          </div>
          <span className="text-[10px] mt-1 font-medium">Ajustes</span>
        </button>
      </nav>
    </>
  );
}
