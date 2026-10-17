import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Scissors, DollarSign, AlertCircle, Plus, Check, Palette, CreditCard, QrCode, Building2 } from 'lucide-react';
import { Appointment, AppointmentStatus, PaymentMethod, APPOINTMENT_COLORS, BranchId } from '../types';
import { useApp } from '../context/AppContext';
import { getTodayDateString } from '../utils/initialData';
import { MercadoPagoModal } from './mercadopago/MercadoPagoModal';
import { MercadoPagoIcon } from './icons/MercadoPagoIcon';

interface AppointmentModalProps {
  initialDate?: string;
  initialTime?: string;
  initialStaffId?: string;
  appointmentToEdit?: Appointment | null;
  onClose: () => void;
  onSaved: (aptId: string) => void;
}

export function AppointmentModal({
  initialDate,
  initialTime,
  initialStaffId,
  appointmentToEdit,
  onClose,
  onSaved,
}: AppointmentModalProps) {
  const {
    business,
    clients,
    services,
    staff,
    appointments,
    selectedBranch,
    branches,
    createAppointment,
    updateAppointment,
    createClient,
    createCashMovement,
  } = useApp();

  // Form states
  const [branchId, setBranchId] = useState<BranchId>(appointmentToEdit?.branchId || selectedBranch);
  const [clientId, setClientId] = useState(appointmentToEdit?.clientId || '');
  const [clientName, setClientName] = useState(appointmentToEdit?.clientName || '');
  const [clientPhone, setClientPhone] = useState(appointmentToEdit?.clientPhone || '');
  const [isNewClientMode, setIsNewClientMode] = useState(false);

  const [serviceId, setServiceId] = useState(appointmentToEdit?.serviceId || (services[0]?.id || ''));
  const [staffId, setStaffId] = useState(appointmentToEdit?.staffId || initialStaffId || (staff[0]?.id || ''));

  const [date, setDate] = useState(appointmentToEdit?.date || initialDate || getTodayDateString());
  const [time, setTime] = useState(appointmentToEdit?.time || initialTime || '10:00');
  const [durationMinutes, setDurationMinutes] = useState(appointmentToEdit?.durationMinutes || 45);

  const [price, setPrice] = useState(appointmentToEdit?.price || 0);
  const [depositAmount, setDepositAmount] = useState(appointmentToEdit?.depositAmount || 0);
  const [color, setColor] = useState(appointmentToEdit?.color || APPOINTMENT_COLORS[0].hex);
  const [status, setStatus] = useState<AppointmentStatus>(appointmentToEdit?.status || 'confirmado');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(appointmentToEdit?.paymentMethod || 'pendiente');
  const [registerDepositInCash, setRegisterDepositInCash] = useState(true);
  const [notes, setNotes] = useState(appointmentToEdit?.notes || '');
  const [showMercadoPagoModal, setShowMercadoPagoModal] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When selected service changes, update price & duration if new appointment
  const handleServiceChange = (id: string) => {
    setServiceId(id);
    const srv = services.find((s) => s.id === id);
    if (srv && !appointmentToEdit) {
      setPrice(srv.price);
      setDurationMinutes(srv.durationMinutes);
      if (srv.color) setColor(srv.color);
    }
  };

  // Set initial price and duration from first service if creating
  useEffect(() => {
    if (!appointmentToEdit && services.length > 0 && price === 0) {
      const firstSrv = services.find((s) => s.id === serviceId) || services[0];
      if (firstSrv) {
        setServiceId(firstSrv.id);
        setPrice(firstSrv.price);
        setDurationMinutes(firstSrv.durationMinutes);
        if (firstSrv.color) setColor(firstSrv.color);
      }
    }
  }, [services, serviceId, appointmentToEdit, price]);

  // Handle client selection
  const handleClientSelect = (id: string) => {
    setClientId(id);
    const cli = clients.find((c) => c.id === id);
    if (cli) {
      setClientName(cli.name);
      setClientPhone(cli.phone);
    }
  };

  // Calculate remaining balance
  const remainingBalance = Math.max(0, price - depositAmount);

  // Check conflicts
  const selectedStaff = staff.find((s) => s.id === staffId);
  const selectedDateObj = new Date(date + 'T12:00:00');
  const dayOfWeek = selectedDateObj.getDay();
  const isStaffOffDay = selectedStaff && !selectedStaff.workingDays.includes(dayOfWeek);
  const isStaffDateBlocked = selectedStaff && selectedStaff.blockedDates.includes(date);

  const hasConflict = appointments.some((apt) => {
    if (appointmentToEdit && apt.id === appointmentToEdit.id) return false;
    if (apt.date !== date || apt.staffId !== staffId || apt.status === 'cancelado') return false;
    const [aptH, aptM] = apt.time.split(':').map(Number);
    const aptStart = aptH * 60 + aptM;
    const aptEnd = aptStart + apt.durationMinutes;

    const [curH, curM] = time.split(':').map(Number);
    const curStart = curH * 60 + curM;
    const curEnd = curStart + durationMinutes;

    return Math.max(aptStart, curStart) < Math.min(aptEnd, curEnd);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    let finalClientName = clientName.trim();
    let finalClientId = clientId;

    if (!finalClientName) {
      setErrorMsg('Por favor indica el nombre del cliente.');
      return;
    }

    if (!date || !time) {
      setErrorMsg('Por favor indica fecha y hora del turno.');
      return;
    }

    setIsSubmitting(true);
    try {
      if ((isNewClientMode || !finalClientId) && finalClientName) {
        const existing = clients.find((c) => c.name.toLowerCase() === finalClientName.toLowerCase());
        if (existing) {
          finalClientId = existing.id;
        } else {
          finalClientId = await createClient({
            name: finalClientName,
            phone: clientPhone.trim(),
            email: '',
            notes: '',
          });
        }
      }

      const srvObj = services.find((s) => s.id === serviceId);
      const stfObj = staff.find((s) => s.id === staffId);

      if (appointmentToEdit) {
        const updated: Appointment = {
          ...appointmentToEdit,
          clientId: finalClientId,
          clientName: finalClientName,
          clientPhone: clientPhone.trim(),
          serviceId,
          serviceName: srvObj ? srvObj.name : 'Servicio general',
          staffId,
          staffName: stfObj ? stfObj.name : 'Personal asignado',
          branchId,
          date,
          time,
          durationMinutes: Number(durationMinutes),
          price: Number(price),
          depositAmount: Number(depositAmount),
          remainingBalance,
          color,
          status,
          paymentMethod,
          notes,
          updatedAt: getTodayDateString(),
        };
        await updateAppointment(updated);
        onSaved(updated.id);
      } else {
        const newId = await createAppointment({
          clientId: finalClientId,
          clientName: finalClientName,
          clientPhone: clientPhone.trim(),
          serviceId,
          serviceName: srvObj ? srvObj.name : 'Servicio general',
          staffId,
          staffName: stfObj ? stfObj.name : 'Personal asignado',
          branchId,
          date,
          time,
          durationMinutes: Number(durationMinutes),
          price: Number(price),
          depositAmount: Number(depositAmount),
          remainingBalance,
          color,
          status,
          paymentMethod,
          notes,
        });

        if (registerDepositInCash && depositAmount > 0) {
          await createCashMovement({
            date,
            branchId,
            type: 'ingreso',
            category: 'seña',
            amount: Number(depositAmount),
            paymentMethod: paymentMethod === 'pendiente' ? 'efectivo' : paymentMethod,
            description: `[${branchId === 'sucursal_1' ? 'Sucursal 1' : 'Sucursal 2'}] Seña para turno de ${finalClientName} (${srvObj?.name || 'Servicio'})`,
            appointmentId: newId,
          });
        }

        onSaved(newId);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error al guardar el turno');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {appointmentToEdit ? 'Editar Turno' : 'Nuevo Turno'}
              </h3>
              <p className="text-blue-100 text-xs">
                {appointmentToEdit ? 'Modifica los datos del turno programado' : 'Asigna un turno rápido en la agenda'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Client Selection */}
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Cliente
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsNewClientMode(!isNewClientMode);
                  setClientId('');
                  if (!isNewClientMode) {
                    setClientName('');
                    setClientPhone('');
                  }
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
              >
                {isNewClientMode ? 'Seleccionar existente' : '+ Crear nuevo cliente'}
              </button>
            </div>

            {!isNewClientMode && clients.length > 0 ? (
              <div>
                <select
                  value={clientId}
                  onChange={(e) => handleClientSelect(e.target.value)}
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-slate-800"
                >
                  <option value="">-- Seleccionar cliente de la lista --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.phone ? `(${c.phone})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {(isNewClientMode || clients.length === 0 || clientId) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Nombre y Apellido *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofía Martínez"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-white focus:border-blue-600 outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">WhatsApp / Teléfono</label>
                  <input
                    type="tel"
                    placeholder="Ej. 11 3344-5566"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-white focus:border-blue-600 outline-none text-slate-800"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Service & Staff */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1">
                <Scissors className="w-3.5 h-3.5 text-blue-600" />
                Servicio
              </label>
              <select
                value={serviceId}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-white focus:border-blue-600 outline-none text-slate-800"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.durationMinutes} min - {business?.currency || '$'} {s.price})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Profesional
              </label>
              <select
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-white focus:border-blue-600 outline-none text-slate-800"
              >
                {staff.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Warnings */}
          {isStaffOffDay && (
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center gap-2">
              ⚠️ {selectedStaff?.name} no suele trabajar los días seleccionados.
            </div>
          )}
          {isStaffDateBlocked && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              🚫 {selectedStaff?.name} tiene esta fecha bloqueada.
            </div>
          )}
          {hasConflict && (
            <div className="p-2.5 bg-orange-50 border border-orange-200 rounded-xl text-orange-800 text-xs flex items-center gap-2">
              ⚠️ Advertencia: Ya existe otro turno en este horario para este profesional.
            </div>
          )}

          {/* Sucursal / Local */}
          <div>
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#A2721C]" />
              <span>Sucursal asignada</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {branches.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBranchId(b.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                    branchId === b.id
                      ? 'bg-amber-500/15 border-[#D4AF37] text-amber-950 shadow-2xs ring-1 ring-[#D4AF37]/40'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date, Time & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Fecha
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Hora
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Duración (min)
              </label>
              <input
                type="number"
                step="5"
                min="5"
                max="480"
                required
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          {/* Color Picker for appointment */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Palette className="w-3.5 h-3.5 text-blue-600" />
              Color distintivo del turno
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {APPOINTMENT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  title={c.label}
                  className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                    color === c.hex ? 'scale-110 border-slate-900 shadow-xs' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {color === c.hex && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Deposit */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Precio Total ({business?.currency || '$'})</label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full text-sm font-semibold p-2 rounded-xl border border-slate-200 bg-white focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Seña Abonada ({business?.currency || '$'})</label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full text-sm font-semibold p-2 rounded-xl border border-slate-200 bg-white focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Saldo Restante</label>
                <div className={`p-2 rounded-xl border text-sm font-bold ${
                  remainingBalance > 0
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}>
                  {business?.currency || '$'} {remainingBalance}
                </div>
              </div>
            </div>

            {/* Mercado Pago Deposit Button */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setShowMercadoPagoModal(true)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#009EE3] to-[#007BBB] hover:from-[#0089C7] hover:to-[#006EA8] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <MercadoPagoIcon size={18} variant="badge" />
                <span>Pagar Seña con Mercado Pago (Link / QR)</span>
              </button>
              <span className="text-[11px] text-slate-500">
                Genera enlace de pago directo o código QR interactivo
              </span>
            </div>
          </div>

          {/* Status & Payment Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Estado</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
                className="w-full text-sm p-2 rounded-xl border border-slate-200 bg-white outline-none"
              >
                <option value="confirmado">Confirmado</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_espera">En espera de seña</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Medio de Pago</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full text-sm p-2 rounded-xl border border-slate-200 bg-white outline-none"
              >
                <option value="pendiente">Pendiente</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
                <option value="mercadopago">Mercado Pago</option>
                <option value="tarjeta">Tarjeta</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Notas del Turno</label>
            <input
              type="text"
              placeholder="Detalles específicos..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-sm p-2 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Guardando...' : appointmentToEdit ? 'Guardar Cambios' : 'Crear Turno'}</span>
            </button>
          </div>
        </form>
      </div>

      {showMercadoPagoModal && business && (
        <MercadoPagoModal
          appointment={{
            id: appointmentToEdit?.id,
            clientName: clientName || 'Cliente',
            clientPhone: clientPhone || '',
            serviceName: services.find((s) => s.id === serviceId)?.name || 'Servicio',
            price,
            depositAmount,
            date,
            time,
          }}
          business={business}
          onClose={() => setShowMercadoPagoModal(false)}
          onConfirmDepositPaid={(amountPaid) => {
            setDepositAmount(amountPaid);
            setPaymentMethod('mercadopago');
            if (status === 'pendiente' || status === 'en_espera') {
              setStatus('confirmado');
            }
          }}
        />
      )}
    </div>
  );
}
