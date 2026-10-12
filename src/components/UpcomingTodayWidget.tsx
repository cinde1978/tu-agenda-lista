import React from 'react';
import { Clock, MessageCircle, User, Calendar, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { Appointment } from '../types';
import { useApp } from '../context/AppContext';
import { formatCurrency, getStatusBadge } from '../utils/formatters';

interface UpcomingTodayWidgetProps {
  onSelectAppointment: (appointment: Appointment) => void;
  onOpenWhatsApp: (appointment: Appointment) => void;
  onNewAppointment: () => void;
}

export function UpcomingTodayWidget({
  onSelectAppointment,
  onOpenWhatsApp,
  onNewAppointment,
}: UpcomingTodayWidgetProps) {
  const { upcomingTodayAppointments, business } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-4">
      {/* Widget Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 leading-tight">
              Próximos Turnos del Día
            </h3>
            <p className="text-[11px] text-gray-500">
              {upcomingTodayAppointments.length === 0
                ? 'No hay turnos pendientes para hoy'
                : `${upcomingTodayAppointments.length} cliente(s) agendados para atender hoy`}
            </p>
          </div>
        </div>

        {upcomingTodayAppointments.length > 0 && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60">
            {upcomingTodayAppointments.length} activos
          </span>
        )}
      </div>

      {/* List or Empty State */}
      {upcomingTodayAppointments.length === 0 ? (
        <div className="p-6 text-center rounded-xl bg-gray-50 border border-dashed border-gray-200 text-gray-400 space-y-2">
          <Calendar className="w-8 h-8 mx-auto text-gray-300" />
          <p className="text-xs text-gray-600 font-medium">No hay turnos para hoy en el salón.</p>
          <button
            type="button"
            onClick={onNewAppointment}
            className="text-xs text-purple-700 font-bold hover:underline"
          >
            + Agendar primer turno para hoy
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {upcomingTodayAppointments.slice(0, 6).map((apt) => {
            const status = getStatusBadge(apt.status);
            const avatarColor = apt.color || '#6D28D9';
            const initials = apt.clientName
              .split(' ')
              .map((n) => n.charAt(0))
              .slice(0, 2)
              .join('')
              .toUpperCase();

            return (
              <div
                key={apt.id}
                onClick={() => onSelectAppointment(apt)}
                className="p-3.5 rounded-xl border border-gray-100 hover:border-purple-300 bg-white hover:bg-purple-50/20 shadow-xs hover:shadow-sm cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                {/* Client Avatar + Details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: avatarColor }}
                  >
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                        {apt.clientName}
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-500 truncate mt-0.5">
                      {apt.serviceName}
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                        {apt.time} hs
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${status.bg}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Quick Trigger */}
                {apt.clientPhone && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWhatsApp(apt);
                    }}
                    className="p-2 hover:bg-emerald-50 rounded-xl text-emerald-600 hover:text-emerald-700 transition-colors shrink-0"
                    title="Avisar por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
