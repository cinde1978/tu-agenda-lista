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
} from 'lucide-react';
import { ViewTab } from '../types';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { AppLogo } from './AppLogo';

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

  const brandName = business?.name || '[Tu Nombre o Marca]';
  const developerName = business?.developerName || '[Tu Nombre]';

  const navItems: { id: ViewTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'agenda', label: 'Agenda', icon: <Calendar className="w-4 h-4" /> },
    { id: 'clientes', label: 'Clientes', icon: <Users className="w-4 h-4" /> },
    { id: 'servicios', label: 'Servicios', icon: <Scissors className="w-4 h-4" /> },
    { id: 'profesionales', label: 'Profesionales', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'caja', label: 'Caja Diaria', icon: <Wallet className="w-4 h-4" /> },
    { id: 'reportes', label: 'Estadísticas', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'exportar', label: 'Imprimir / Excel', icon: <Printer className="w-4 h-4" /> },
    { id: 'configuracion', label: 'Configuración & Marca', icon: <Settings className="w-4 h-4" /> },
  ];

  // Calculate today's projected revenue
  const todayRevenue = upcomingTodayAppointments
    .filter((a) => a.status !== 'cancelado')
    .reduce((sum, a) => sum + (a.price || 0), 0);

  return (
    <aside className="no-print hidden lg:flex flex-col w-72 bg-white border-r border-slate-200/80 shadow-xs h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onSelectTab('agenda')}
        >
          {/* Modern SaaS Vector Logo */}
          <AppLogo size={44} className="group-hover:scale-105 transition-transform shrink-0" />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-slate-900 truncate block leading-tight">
                {brandName}
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wider shrink-0">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
              Desarrollado por <span className="text-slate-700 font-semibold">{developerName}</span>
            </p>
          </div>
        </div>

        {/* Quick CTA "+ Nuevo Turno" in Sidebar */}
        <button
          type="button"
          onClick={onNewAppointment}
          className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
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
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all group ${
                isActive
                  ? 'bg-blue-50/80 text-blue-900 font-bold border border-blue-100 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  {item.badge}
                </span>
              ) : isActive ? (
                <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Today Mini Summary Card */}
      <div className="p-3.5 mx-3.5 mb-2.5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white border border-blue-100/70 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span className="flex items-center gap-1.5 text-blue-900">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Hoy en el Salón
          </span>
          <button
            type="button"
            onClick={onOpenReminders}
            className="text-[10px] font-bold text-blue-700 hover:underline flex items-center gap-0.5"
          >
            Ver {upcomingTodayAppointments.length}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
          <div className="bg-white/90 p-2 rounded-xl border border-blue-100/50">
            <span className="text-[10px] text-slate-500 block font-medium">Turnos</span>
            <span className="font-extrabold text-slate-900 text-sm">
              {upcomingTodayAppointments.length}
            </span>
          </div>
          <div className="bg-white/90 p-2 rounded-xl border border-blue-100/50">
            <span className="text-[10px] text-slate-500 block font-medium">Estimado</span>
            <span className="font-extrabold text-blue-700 text-xs truncate block">
              {formatCurrency(todayRevenue, business?.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* User / Account & Whitelabel Footer */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 space-y-2">
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

        {/* Whitelabel Developer Credit */}
        <div className="pt-2 border-t border-slate-200/60 text-center">
          <p className="text-[10.5px] text-slate-500 font-medium">
            Desarrollado por <span className="font-bold text-slate-800">{developerName}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
