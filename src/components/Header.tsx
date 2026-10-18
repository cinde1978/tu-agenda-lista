import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Wallet,
  Download,
  Smartphone,
  X,
  Building2,
  ChevronDown,
  Settings,
} from 'lucide-react';
import { ViewTab, BranchId } from '../types';
import { useApp } from '../context/AppContext';
import { formatDateSpanishLong } from '../utils/formatters';
import { getTodayDateString } from '../utils/initialData';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onNewAppointment?: () => void;
  onOpenReminders?: () => void;
}

const TAB_TITLES: Record<ViewTab, string> = {
  agenda: 'Agenda & Turnos',
  clientes: 'Directorio de Clientes',
  servicios: 'Catálogo de Servicios',
  profesionales: 'Equipo de Profesionales',
  caja: 'Caja Diaria & Finanzas',
  reportes: 'Estadísticas & Reportes',
  exportar: 'Imprimir / Excel',
  configuracion: 'Ajustes del Negocio',
};

export function Header({
  currentTab,
  onSelectTab,
}: HeaderProps) {
  const { selectedBranch, setSelectedBranch, branches } = useApp();
  const { isInstallable, install } = usePWAInstall();
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const todayStr = getTodayDateString();

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (!outcome) {
        setShowInstallHelp(true);
      }
    } else {
      setShowInstallHelp(true);
    }
  };

  return (
    <>
      {/* Top Clean Dark SaaS Header Bar - Sin logo duplicado (exclusivo del menú lateral) */}
      <header
        className="no-print bg-[#0E1420]/95 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-20 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 select-none shadow-md"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Título de Sección / Breadcrumb limpio (sin logo duplicado) */}
        <div className="min-w-0 flex items-center gap-2">
          <h1 className="text-base sm:text-lg font-black text-slate-100 tracking-tight truncate">
            {TAB_TITLES[currentTab] || 'Tu Agenda'}
          </h1>
        </div>

        {/* Center / Right Controls: Multisucursal Selector, Date & Install */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Selector Desplegable Multisucursal (2 Locales) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="relative flex items-center bg-[#161F30] border border-slate-700/80 hover:border-amber-400/60 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-xs transition-all">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 mr-1" />
              <label htmlFor="branch-selector" className="sr-only">Seleccionar Sucursal</label>
              <select
                id="branch-selector"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value as BranchId)}
                className="bg-[#161F30] font-black text-xs sm:text-sm text-slate-100 focus:outline-none cursor-pointer pr-4 appearance-none"
                title="Cambiar sucursal (Filtra automáticamente la agenda y la caja diaria)"
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id} className="text-slate-100 font-bold bg-[#161F30]">
                    {b.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 stroke-[2.5]" />
            </div>
          </div>

          {/* Fecha Actual (Desktop) */}
          <div
            className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-200 bg-[#161F30] border border-slate-700/80 px-3 py-1.5 rounded-xl capitalize shrink-0 shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{formatDateSpanishLong(todayStr)}</span>
          </div>

          {/* Botón 'Instalar App' */}
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-98 text-slate-950 shadow-md hover:shadow-lg transition-all whitespace-nowrap cursor-pointer shrink-0"
            title="Instala nuestra App en tu celular para un acceso más rápido"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" />
            <span className="hidden xs:inline sm:inline">Instalar App</span>
            <span className="inline xs:hidden sm:hidden">Instalar</span>
          </button>
        </div>
      </header>

      {/* Quick PWA Installation Help Modal (Dark Theme) */}
      {showInstallHelp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#121826] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-700 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-100">
                    Instalar Tu Agenda Lista
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    Acceso instantáneo desde tu pantalla de inicio
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInstallHelp(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-200 bg-[#161F30] p-4 rounded-xl border border-slate-700/80">
              <div className="flex items-start gap-2.5">
                <span className="font-black text-amber-400 shrink-0">📱 Android / Chrome:</span>
                <span className="font-semibold text-slate-300">Toca el menú de tres puntos (⋮) en tu navegador y selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pantalla principal"</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-700/60">
                <span className="font-black text-blue-400 shrink-0">🍎 iPhone / Safari:</span>
                <span className="font-semibold text-slate-300">Toca el botón <strong>Compartir</strong> (icono con flecha hacia arriba) y selecciona <strong>"Agregar al inicio"</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-700/60">
                <span className="font-black text-emerald-400 shrink-0">💻 Computadora:</span>
                <span className="font-semibold text-slate-300">Haz clic en el icono de instalación (pantalla o flecha) situado a la derecha de la barra de direcciones.</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowInstallHelp(false)}
                className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-[#172554] text-white rounded-xl text-xs font-black transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Dark theme, 48px+ touch targets, z-50) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0E1420]/98 backdrop-blur-md border-t border-slate-800/80 lg:hidden flex items-center justify-around h-16 px-1 shadow-2xl no-print select-none touch-manipulation">
        <button
          type="button"
          onClick={() => onSelectTab('agenda')}
          className={`flex flex-col items-center justify-center min-w-[60px] min-h-[48px] py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'agenda'
              ? 'text-amber-400 font-black bg-amber-400/10 scale-105'
              : 'text-slate-400 font-bold hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Calendar className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[11px] font-black mt-0.5">Agenda</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('clientes')}
          className={`flex flex-col items-center justify-center min-w-[60px] min-h-[48px] py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'clientes'
              ? 'text-amber-400 font-black bg-amber-400/10 scale-105'
              : 'text-slate-400 font-bold hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Users className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[11px] font-black mt-0.5">Clientes</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('caja')}
          className={`flex flex-col items-center justify-center min-w-[60px] min-h-[48px] py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'caja'
              ? 'text-amber-400 font-black bg-amber-400/10 scale-105'
              : 'text-slate-400 font-bold hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Wallet className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[11px] font-black mt-0.5">Caja</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('configuracion')}
          className={`flex flex-col items-center justify-center min-w-[60px] min-h-[48px] py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'configuracion'
              ? 'text-amber-400 font-black bg-amber-400/10 scale-105'
              : 'text-slate-400 font-bold hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Settings className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[11px] font-black mt-0.5">Ajustes</span>
        </button>
      </nav>
    </>
  );
}

export default Header;
