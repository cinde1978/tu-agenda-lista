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
  Bell,
  Sparkles,
  LogIn,
  LogOut,
  ChevronRight,
  Clock,
  Building2,
  TrendingUp
} from 'lucide-react';
import { ViewTab } from '../types';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

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
    unreadRemindersCount,
    upcomingTodayAppointments,
    appointments,
  } = useApp();

  const navItems: { id: ViewTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'agenda', label: 'Agenda', icon: <Calendar className="w-5 h-5" /> },
    { id: 'clientes', label: 'Clientes', icon: <Users className="w-5 h-5" /> },
    { id: 'servicios', label: 'Servicios', icon: <Scissors className="w-5 h-5" /> },
    { id: 'profesionales', label: 'Profesionales', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'caja', label: 'Caja Diaria', icon: <Wallet className="w-5 h-5" /> },
    { id: 'reportes', label: 'Estadísticas', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'exportar', label: 'Imprimir / Excel', icon: <Printer className="w-5 h-5" /> },
    { id: 'configuracion', label: 'Configuración', icon: <Settings className="w-5 h-5" /> },
  ];

  // Calculate today's projected revenue
  const todayRevenue = upcomingTodayAppointments
    .filter((a) => a.status !== 'cancelado')
    .reduce((sum, a) => sum + (a.price || 0), 0);

  return (
    <aside className="no-print hidden lg:flex flex-col w-72 bg-white border-r border-gray-200/80 shadow-xs h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('agenda')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/25">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-gray-900">
                Tu Agenda <span className="text-purple-600">Lista</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/60 uppercase tracking-wider">
                PRO
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium truncate max-w-[160px] mt-0.5">
              <Building2 className="w-3 h-3 shrink-0 text-gray-400" />
              <span className="truncate">{business?.name || 'Mi Negocio'}</span>
            </div>
          </div>
        </div>

        {/* Quick CTA "+ Nuevo Turno" in Sidebar */}
        <button
          type="button"
          onClick={onNewAppointment}
          className="mt-5 w-full py-2.5 px-4 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nuevo Turno</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all group ${
                isActive
                  ? 'bg-purple-50 text-purple-900 font-bold border border-purple-100 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`transition-colors ${isActive ? 'text-purple-700' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                  {item.badge}
                </span>
              ) : isActive ? (
                <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Today Mini Summary Card */}
      <div className="p-4 mx-4 mb-3 rounded-2xl bg-gradient-to-br from-purple-50/80 via-indigo-50/50 to-white border border-purple-100/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-800">
          <span className="flex items-center gap-1.5 text-purple-900">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            Hoy en el Salón
          </span>
          <button
            type="button"
            onClick={onOpenReminders}
            className="text-[10px] font-bold text-purple-700 hover:underline flex items-center gap-0.5"
          >
            Ver {upcomingTodayAppointments.length}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="bg-white/80 p-2 rounded-xl border border-purple-100/60">
            <span className="text-[10px] text-gray-500 block font-medium">Turnos</span>
            <span className="font-extrabold text-gray-900 text-sm">
              {upcomingTodayAppointments.length}
            </span>
          </div>
          <div className="bg-white/80 p-2 rounded-xl border border-purple-100/60">
            <span className="text-[10px] text-gray-500 block font-medium">Estimado</span>
            <span className="font-extrabold text-purple-700 text-xs truncate block">
              {formatCurrency(todayRevenue, business?.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* User / Account Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
        {user ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-xs ring-2 ring-purple-100 shrink-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full" />
                ) : (
                  user.displayName?.charAt(0) || 'U'
                )}
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-gray-900 truncate">
                  {user.displayName || 'Usuario'}
                </span>
                <span className="block text-[10px] text-gray-500 truncate">
                  {user.email}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={logoutUser}
              className="p-1.5 hover:bg-white rounded-lg text-gray-400 hover:text-gray-700 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-full space-y-2">
            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full py-2 px-3 bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5 text-purple-600" />
              <span>Conectar Google</span>
            </button>
            <span className="block text-[10px] text-gray-400 text-center">
              Plan Gratuito Permanente
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
