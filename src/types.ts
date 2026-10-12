export type AppointmentStatus = 'confirmado' | 'pendiente' | 'completado' | 'cancelado' | 'en_espera';
export type PaymentMethod = 'efectivo' | 'transferencia' | 'tarjeta' | 'mercadopago' | 'pendiente';
export type CashMovementType = 'ingreso' | 'gasto';
export type CashMovementCategory = 'turno' | 'seña' | 'saldo' | 'insumos' | 'alquiler' | 'servicios' | 'comisiones' | 'otro';

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  category: string;
  phone: string;
  address: string;
  currency: string;
  cbuAlias?: string;
  defaultSlotMinutes: number;
  openingHour?: string; // e.g. "08:00"
  closingHour?: string; // e.g. "20:00"
  developerName?: string; // e.g. "[Tu Nombre]"
  tagline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  businessId: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  birthday?: string;
  totalVisits: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  category: string;
  durationMinutes: number;
  price: number;
  description: string;
  color: string;
  active: boolean;
  createdAt: string;
}

export interface StaffMember {
  id: string;
  businessId: string;
  name: string;
  role: string;
  phone: string;
  color: string;
  workingDays: number[]; // 0: Dom, 1: Lun, 2: Mar, 3: Mié, 4: Jue, 5: Vie, 6: Sáb
  workingHoursStart: string; // "08:00"
  workingHoursEnd: string; // "20:00"
  blockedDates: string[]; // ['2026-10-12', ...]
  active: boolean;
  createdAt: string;
}

export interface Appointment {
  id: string;
  businessId: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  staffId: string;
  staffName: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  price: number;
  depositAmount: number; // Seña
  remainingBalance: number; // price - depositAmount
  color?: string; // Distinctive color for appointment
  status: AppointmentStatus;
  paymentMethod: PaymentMethod;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CashMovement {
  id: string;
  businessId: string;
  date: string; // YYYY-MM-DD
  type: CashMovementType;
  category: CashMovementCategory;
  amount: number;
  paymentMethod: PaymentMethod;
  description: string;
  appointmentId?: string;
  createdAt: string;
}

export type ViewTab = 'agenda' | 'clientes' | 'servicios' | 'profesionales' | 'caja' | 'reportes' | 'exportar' | 'configuracion';
export type AgendaMode = 'dia' | 'semana' | 'mes';

export const APPOINTMENT_COLORS = [
  { label: 'Azul Real', hex: '#2563eb' },
  { label: 'Celeste Cielo', hex: '#0284c7' },
  { label: 'Esmeralda', hex: '#059669' },
  { label: 'Violeta', hex: '#7c3aed' },
  { label: 'Rosa Glam', hex: '#db2777' },
  { label: 'Ámbar Cálido', hex: '#d97706' },
  { label: 'Coral', hex: '#ea580c' },
  { label: 'Grafito', hex: '#475569' },
];
