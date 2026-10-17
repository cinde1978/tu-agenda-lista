import React from 'react';
import {
  Calendar,
  Users,
  Scissors,
  UserCheck,
  Wallet,
  BarChart3,
  Settings,
  Plus,
  Printer,
  LogIn,
  LogOut,
  ChevronRight,
  Clock,
  Download,
} from 'lucide-react';
import { ViewTab } from '../types';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { AppLogo } from './AppLogo';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface SidebarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onNewAppointment: () => void;
  onOpenReminders: () => void;
}

export function Sidebar({
  currentTab,
  onSelectTab,
  onNewAppointment,
  onOpenReminders,
}: SidebarProps) {
  const {
    business,
    user,
    loginWithGoogle,
    logoutUser,
    upcomingTodayAppointments,
  } = useApp();

  const { isInstallable, isInstalled, install } = usePWAInstall();

  const brandName = (business?.name && business.name !== '[Tu Nombre o Marca]') ? business.name : 'Tu Agenda Lista';
  const developerName = (business?.developerName && business.developerName !== '[Tu Nombre]') ? business.developerName : 'Iris Quiroz';

  const navItems: { id: ViewTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'agenda', label: 'Agenda', icon: <Calendar className="w-4 h-4" /> },
    { id: 'clientes', label: 'Clientes', icon: <Users className="w-4 h-4" /> },
    { id: 'servicios', label: 'Servicios', icon: <Scissors className="w-4 h-4" /> },
    { id: 'profesionales', label: 'Profesionales', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'caja', label: 'Caja Diaria', icon: <Wallet className="w-4 h-4" /> },
    { id: 'reportes', label: 'Estadísticas', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'exportar', label: 'Imprimir / Excel', icon: <Printer className="w-4 h-4" /> },
    { id: 'configuracion', label: 'Ajustes del Negocio', icon: <Settings className="w-4 h-4" /> },
  ];

  // Calculate today's projected revenue
  const todayRevenue = upcomingTodayAppointments
    .filter((a) => a.status !== 'cancelado')
    .reduce((sum, a) => sum + (a.price || 0), 0);

  return (
    <aside className="no-print hidden lg:flex flex-col w-72 bg-white border-r border-slate-200/80 shadow-xs h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header: Logo + Tu Agenda Lista + PRO tag (sin créditos arriba) */}
      <div className="p-5 border-b border-slate-100">
        <div
          className="cursor-pointer group"
          onClick={() => onSelectTab('agenda')}
          title="Tu Agenda Lista"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Modern SaaS Vector Logo */}
          <AppLogo size={40} className="group-hover:scale-105 transition-transform shrink-0" />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <span
              className="font-extrabold text-base tracking-tight text-slate-900 leading-none"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {brandName}
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#FAF6ED] text-[#946E19] border border-[#E2D1A6] uppercase tracking-wider shrink-0 shadow-2xs">
              PRO
            </span>
          </div>
        </div>

        {/* Quick CTA "+ Nuevo Turno" in Sidebar */}
        <button
          type="button"
          onClick={onNewAppointment}
          className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA822A] hover:brightness-105 active:scale-98 text-slate-950 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all hover:scale-[1.02] ring-1 ring-[#D4AF37]/50 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Nuevo Turno</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3.5 py-3 space-y-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all group cursor-pointer ${
                isActive
                  ? 'bg-amber-50 text-amber-950 font-black border border-amber-300 shadow-2xs'
                  : 'text-slate-900 font-bold hover:text-black hover:bg-slate-100/90'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`transition-colors ${isActive ? 'text-[#8C531D]' : 'text-slate-700 group-hover:text-black'}`}>
                  {item.icon}
                </span>
                <span className="tracking-tight">{item.label}</span>
              </div>

              {item.badge ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#F6EDD9] text-[#73431D] border border-[#EEDBBA]">
                  {item.badge}
                </span>
              ) : isActive ? (
                <ChevronRight className="w-3.5 h-3.5 text-[#8C531D] stroke-[2.5]" />
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Today Mini Summary Card */}
      <div className="p-3.5 mx-3.5 mb-2.5 rounded-2xl bg-gradient-to-br from-[#FCF9F2] via-[#F8F2E2] to-white border border-[#EEDBBA] space-y-2">
        <div className="flex items-center justify-between text-xs font-black text-slate-950">
          <span className="flex items-center gap-1.5 text-amber-950 font-black">
            <Clock className="w-3.5 h-3.5 text-[#8C531D]" />
            Hoy en el Salón
          </span>
          <button
            type="button"
            onClick={onOpenReminders}
            className="text-[10px] font-black text-[#8C531D] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            Ver {upcomingTodayAppointments.length}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
          <div className="bg-white/95 p-2 rounded-xl border border-amber-200/80 shadow-2xs">
            <span className="text-[10px] text-slate-800 block font-bold">Turnos</span>
            <span className="font-black text-slate-950 text-sm">
              {upcomingTodayAppointments.length}
            </span>
          </div>
          <div className="bg-white/95 p-2 rounded-xl border border-amber-200/80 shadow-2xs">
            <span className="text-[10px] text-slate-800 block font-bold">Estimado</span>
            <span className="font-black text-[#73431D] text-xs truncate block">
              {formatCurrency(todayRevenue, business?.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* User / Account & Whitelabel Footer */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 space-y-2">
        {/* PWA quick install in sidebar */}
        {isInstallable && !isInstalled && (
          <button
            type="button"
            onClick={install}
            className="w-full py-1.5 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 text-blue-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Instalar App en el equipo</span>
          </button>
        )}

        {user ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-blue-100 shrink-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-7 h-7 rounded-full" />
                ) : (
                  user.displayName?.charAt(0) || 'U'
                )}
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 truncate">
                  {user.displayName || 'Usuario'}
                </span>
                <span className="block text-[10px] text-slate-500 truncate">
                  {user.email}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={logoutUser}
              className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-full space-y-1">
            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-600" />
              <span>Conectar Google</span>
            </button>
          </div>
        )}

        {/* Whitelabel Developer Credit (Fixed & Protected SaaS License) */}
        <div className="pt-2.5 border-t border-slate-200/70 text-center select-none">
          <p className="text-[11px] text-slate-500 font-medium">
            Desarrollado por <span className="font-extrabold text-slate-900 tracking-tight">Iris Quiroz</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
