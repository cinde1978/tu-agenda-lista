import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Wallet,
  Download,
  Smartphone,
  X,
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
  onNewAppointment?: () => void;
  onOpenReminders?: () => void;
}

export function Header({
  currentTab,
  onSelectTab,
}: HeaderProps) {
  const { business } = useApp();
  const { isInstallable, install } = usePWAInstall();
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const todayStr = getTodayDateString();

  const brandName = (business?.name && business.name !== '[Tu Nombre o Marca]') ? business.name : 'Tu Agenda Lista';

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
      {/* Top Clean SaaS Header Bar */}
      <header
        className="no-print bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 px-4 sm:px-6 lg:px-8 py-3 select-none shadow-xs"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Left: Logo a la izquierda & Título principal 'Tu Agenda Lista' */}
        <div
          onClick={() => onSelectTab('agenda')}
          className="cursor-pointer group min-w-0 shrink"
          title="Ir a Agenda"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          <AppLogo size={36} className="shrink-0 group-hover:scale-105 transition-transform" />
          <h1
            className="font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-slate-900 leading-none m-0"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {brandName}
          </h1>
        </div>

        {/* Center / Fecha Actual */}
        <div
          className="hidden md:flex items-center gap-2 text-xs font-bold text-amber-950 bg-amber-50/90 border border-amber-200/80 px-3.5 py-1.5 rounded-xl capitalize shrink-0 shadow-2xs"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Calendar className="w-4 h-4 text-[#A2721C] shrink-0" />
          <span>{formatDateSpanishLong(todayStr)}</span>
        </div>

        {/* Right: Botón 'Instalar App' */}
        <div
          className="shrink-0"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA822A] hover:brightness-105 active:scale-98 text-slate-950 shadow-xs hover:shadow-md ring-1 ring-[#D4AF37]/50 transition-all whitespace-nowrap cursor-pointer shrink-0"
            title="Instala nuestra App en tu celular para un acceso más rápido"
          >
            <Download className="w-4 h-4 shrink-0 stroke-[2.5]" />
            <span>Instalar App</span>
          </button>
        </div>
      </header>

      {/* Quick PWA Installation Help Modal */}
      {showInstallHelp && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Instalar Tu Agenda Lista
                  </h3>
                  <p className="text-xs text-slate-500">
                    Acceso instantáneo desde tu pantalla de inicio
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInstallHelp(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-blue-600 shrink-0">📱 Android / Chrome:</span>
                <span>Toca el menú de tres puntos (⋮) en tu navegador y selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pantalla principal"</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                <span className="font-bold text-indigo-600 shrink-0">🍎 iPhone / Safari:</span>
                <span>Toca el botón <strong>Compartir</strong> (icono con flecha hacia arriba) y selecciona <strong>"Agregar al inicio"</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                <span className="font-bold text-slate-700 shrink-0">💻 Computadora:</span>
                <span>Haz clic en el icono de instalación (pantalla o flecha) situado a la derecha de la barra de direcciones.</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowInstallHelp(false)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (48px+ touch targets) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 lg:hidden flex items-center justify-around h-16 px-2 shadow-lg no-print select-none">
        <button
          type="button"
          onClick={() => onSelectTab('agenda')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'agenda' ? 'text-[#A2721C] font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Agenda</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('clientes')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'clientes' ? 'text-[#A2721C] font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Clientes</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('caja')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'caja' ? 'text-[#A2721C] font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Caja</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('configuracion')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors ${
            currentTab === 'configuracion' ? 'text-[#A2721C] font-extrabold' : 'text-slate-500 hover:text-slate-800'
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
