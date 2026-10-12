import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ViewTab, AgendaMode, Appointment } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UpcomingTodayWidget } from './components/UpcomingTodayWidget';
import { AgendaHeader } from './components/agenda/AgendaHeader';
import { AgendaDayView } from './components/agenda/AgendaDayView';
import { AgendaWeekView } from './components/agenda/AgendaWeekView';
import { AgendaMonthView } from './components/agenda/AgendaMonthView';
import { ClientsView } from './components/clients/ClientsView';
import { ServicesView } from './components/services/ServicesView';
import { StaffView } from './components/staff/StaffView';
import { CashView } from './components/cash/CashView';
import { ReportsView } from './components/reports/ReportsView';
import { ExportView } from './components/export/ExportView';
import { SettingsAndGuideView } from './components/settings/SettingsAndGuideView';
import { AppointmentModal } from './components/AppointmentModal';
import { AppointmentDetailModal } from './components/AppointmentDetailModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { RemindersModal } from './components/reminders/RemindersModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { getTodayDateString } from './utils/initialData';
import { Sparkles, LogIn, Plus } from 'lucide-react';

function MainAppContent() {
  const { user, loginWithGoogle, business, unreadRemindersCount } = useApp();

  const [currentTab, setCurrentTab] = useState<ViewTab>('agenda');
  const [currentDate, setCurrentDate] = useState<string>(getTodayDateString());
  const [agendaMode, setAgendaMode] = useState<AgendaMode>('dia');
  const [selectedStaffId, setSelectedStaffId] = useState<string>('todos');

  // Modals state
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState<Appointment | null>(null);
  const [selectedAppointmentForDetail, setSelectedAppointmentForDetail] = useState<Appointment | null>(null);
  const [appointmentForWhatsApp, setAppointmentForWhatsApp] = useState<Appointment | null>(null);
  const [slotInitialTime, setSlotInitialTime] = useState<string | undefined>(undefined);

  const handleOpenNewAppointment = (date?: string, time?: string) => {
    setAppointmentToEdit(null);
    if (date) setCurrentDate(date);
    setSlotInitialTime(time);
    setIsAppointmentModalOpen(true);
  };

  const handleEditAppointment = (apt: Appointment) => {
    setSelectedAppointmentForDetail(null);
    setAppointmentToEdit(apt);
    setIsAppointmentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex text-gray-900 font-sans antialiased">
      {/* Desktop Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onNewAppointment={() => handleOpenNewAppointment()}
        onOpenReminders={() => setIsRemindersModalOpen(true)}
      />

      {/* Main Column */}
      <div className="flex-1 min-w-0 flex flex-col pb-20 lg:pb-0">
        {/* PWA Install Suggestion Banner */}
        <PWAInstallBanner />

        {/* Optional cloud sync banner */}
        {!user && (
          <div className="no-print bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-800 text-white text-xs py-2 px-4 shadow-xs">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-200 shrink-0" />
                <span>
                  <strong>Sincronización en la nube:</strong> Tus turnos se guardan de forma instantánea y privada en tu dispositivo. Puedes conectar Google gratis para sincronizar en tiempo real en múltiples dispositivos.
                </span>
              </div>
              <button
                type="button"
                onClick={loginWithGoogle}
                className="px-3 py-1 bg-white hover:bg-slate-100 text-blue-900 rounded-lg font-bold text-xs shrink-0 flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Conectar Google Gratis</span>
              </button>
            </div>
          </div>
        )}

        {/* Top Header & Mobile Nav Bar */}
        <Header
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onNewAppointment={() => handleOpenNewAppointment()}
          onOpenReminders={() => setIsRemindersModalOpen(true)}
        />

        {/* Main Workspace Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {currentTab === 'agenda' && (
            <div className="space-y-6">
              {/* Upcoming Appointments of the Day Widget */}
              <UpcomingTodayWidget
                onSelectAppointment={(apt) => setSelectedAppointmentForDetail(apt)}
                onOpenWhatsApp={(apt) => setAppointmentForWhatsApp(apt)}
                onNewAppointment={() => handleOpenNewAppointment()}
              />

              {/* Agenda Navigation Bar */}
              <AgendaHeader
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                agendaMode={agendaMode}
                onModeChange={setAgendaMode}
                selectedStaffId={selectedStaffId}
                onStaffChange={setSelectedStaffId}
                onNewAppointment={() => handleOpenNewAppointment()}
              />

              {/* Views */}
              {agendaMode === 'dia' && (
                <AgendaDayView
                  currentDate={currentDate}
                  selectedStaffId={selectedStaffId}
                  onSelectAppointment={(apt) => setSelectedAppointmentForDetail(apt)}
                  onSlotClick={(time) => handleOpenNewAppointment(currentDate, time)}
                  onOpenWhatsApp={(apt) => setAppointmentForWhatsApp(apt)}
                />
              )}

              {agendaMode === 'semana' && (
                <AgendaWeekView
                  currentDate={currentDate}
                  selectedStaffId={selectedStaffId}
                  onSelectAppointment={(apt) => setSelectedAppointmentForDetail(apt)}
                  onDayClick={(dayDate) => {
                    setCurrentDate(dayDate);
                    setAgendaMode('dia');
                  }}
                />
              )}

              {agendaMode === 'mes' && (
                <AgendaMonthView
                  currentDate={currentDate}
                  selectedStaffId={selectedStaffId}
                  onSelectDay={(dayDate) => {
                    setCurrentDate(dayDate);
                    setAgendaMode('dia');
                  }}
                  onSelectAppointment={(apt) => setSelectedAppointmentForDetail(apt)}
                />
              )}
            </div>
          )}

          {currentTab === 'clientes' && (
            <ClientsView
              onSelectAppointment={(apt) => setSelectedAppointmentForDetail(apt)}
            />
          )}

          {currentTab === 'servicios' && <ServicesView />}

          {currentTab === 'profesionales' && <StaffView />}

          {currentTab === 'caja' && <CashView />}

          {currentTab === 'reportes' && <ReportsView />}

          {currentTab === 'exportar' && <ExportView />}

          {currentTab === 'configuracion' && <SettingsAndGuideView />}
        </main>

        {/* Footer (Professional Whitelabel SaaS) */}
        <footer className="no-print mt-auto border-t border-slate-200/80 bg-white py-4 px-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              <strong>{business?.name || 'Tu Agenda Lista'}</strong> © {new Date().getFullYear()} — Desarrollado por <strong className="text-slate-800 font-bold">{business?.developerName || 'Iris Quiroz'}</strong>.
            </span>
            <span className="text-slate-400">
              Software SaaS profesional de agenda y gestión de clientes.
            </span>
          </div>
        </footer>
      </div>

      {/* Floating Action Button for Mobile screens (sits right above bottom bar) */}
      <div className="fixed lg:hidden bottom-20 right-4 z-30">
        <button
          type="button"
          onClick={() => handleOpenNewAppointment()}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/30 flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
          title="Nuevo Turno"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Modals */}
      {isAppointmentModalOpen && (
        <AppointmentModal
          initialDate={currentDate}
          initialTime={slotInitialTime}
          initialStaffId={selectedStaffId !== 'todos' ? selectedStaffId : undefined}
          appointmentToEdit={appointmentToEdit}
          onClose={() => {
            setIsAppointmentModalOpen(false);
            setAppointmentToEdit(null);
            setSlotInitialTime(undefined);
          }}
          onSaved={(aptId) => {
            setIsAppointmentModalOpen(false);
            setAppointmentToEdit(null);
            setSlotInitialTime(undefined);
          }}
        />
      )}

      {selectedAppointmentForDetail && (
        <AppointmentDetailModal
          appointment={selectedAppointmentForDetail}
          onClose={() => setSelectedAppointmentForDetail(null)}
          onEdit={handleEditAppointment}
        />
      )}

      {appointmentForWhatsApp && business && (
        <WhatsAppModal
          appointment={appointmentForWhatsApp}
          business={business}
          onClose={() => setAppointmentForWhatsApp(null)}
        />
      )}

      {isRemindersModalOpen && (
        <RemindersModal
          onClose={() => setIsRemindersModalOpen(false)}
          onSelectAppointment={(apt) => setSelectedAppointmentForDetail(apt)}
          onOpenWhatsApp={(apt) => setAppointmentForWhatsApp(apt)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
