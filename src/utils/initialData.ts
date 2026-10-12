import { Business, Client, Service, StaffMember, Appointment, CashMovement } from '../types';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDefaultBusiness(ownerId: string, businessName = '[Tu Nombre o Marca]'): Business {
  const today = getTodayDateString();
  return {
    id: `biz_${ownerId.slice(0, 10)}`,
    ownerId,
    name: businessName,
    category: 'Centro de Estética & Belleza',
    phone: '+54 9 11 4567-8901',
    address: 'Av. Principal 1234',
    currency: '$',
    cbuAlias: 'agenda.turnos.mp',
    defaultSlotMinutes: 30,
    developerName: '[Tu Nombre]',
    tagline: 'Desarrollado por [Tu Nombre]',
    createdAt: today,
    updatedAt: today,
  };
}

export function getDefaultServices(businessId: string): Service[] {
  const today = getTodayDateString();
  return [
    {
      id: 'srv_1',
      businessId,
      name: 'Corte de Cabello & Brushing',
      category: 'Peluquería',
      durationMinutes: 45,
      price: 8500,
      description: 'Lavado premium, corte personalizado y secado modelado.',
      color: '#3b82f6', // blue
      active: true,
      createdAt: today,
    },
    {
      id: 'srv_2',
      businessId,
      name: 'Balayage / Iluminación',
      category: 'Peluquería',
      durationMinutes: 120,
      price: 28000,
      description: 'Decoloración técnica, matiz personalizado y baño de nutrición.',
      color: '#0284c7', // sky blue
      active: true,
      createdAt: today,
    },
    {
      id: 'srv_3',
      businessId,
      name: 'Semipermanente con Kapping',
      category: 'Manicuría',
      durationMinutes: 60,
      price: 9500,
      description: 'Fortalecimiento con base rubber o gel y esmaltado de alta duración.',
      color: '#06b6d4', // cyan
      active: true,
      createdAt: today,
    },
    {
      id: 'srv_4',
      businessId,
      name: 'Lifting de Pestañas + Tinte',
      category: 'Pestañas & Cejas',
      durationMinutes: 50,
      price: 11000,
      description: 'Curvatura natural de pestañas con nutrición de queratina.',
      color: '#6366f1', // indigo
      active: true,
      createdAt: today,
    },
    {
      id: 'srv_5',
      businessId,
      name: 'Limpieza Facial Profunda',
      category: 'Cosmetología',
      durationMinutes: 60,
      price: 14000,
      description: 'Higiene, espátula ultrasónica, extracción y máscara hidratante.',
      color: '#0ea5e9',
      active: true,
      createdAt: today,
    },
    {
      id: 'srv_6',
      businessId,
      name: 'Perfilado de Barba & Corte',
      category: 'Barbería',
      durationMinutes: 40,
      price: 7500,
      description: 'Corte fade con navaja, toalla caliente y aceite hidratante.',
      color: '#1d4ed8',
      active: true,
      createdAt: today,
    },
  ];
}

export function getDefaultStaff(businessId: string): StaffMember[] {
  const today = getTodayDateString();
  return [
    {
      id: 'stf_1',
      businessId,
      name: 'Camila Rossi',
      role: 'Especialista en Color y Pelo',
      phone: '+54 9 11 5566-7788',
      color: '#2563eb',
      workingDays: [1, 2, 3, 4, 5, 6], // Lun - Sáb
      workingHoursStart: '09:00',
      workingHoursEnd: '19:00',
      blockedDates: [],
      active: true,
      createdAt: today,
    },
    {
      id: 'stf_2',
      businessId,
      name: 'Valeria Gómez',
      role: 'Master en Uñas & Pestañas',
      phone: '+54 9 11 4433-2211',
      color: '#0284c7',
      workingDays: [1, 2, 3, 4, 5, 6], // Lun - Sáb
      workingHoursStart: '10:00',
      workingHoursEnd: '20:00',
      blockedDates: [],
      active: true,
      createdAt: today,
    },
    {
      id: 'stf_3',
      businessId,
      name: 'Lucas Medina',
      role: 'Barbero & Estilista',
      phone: '+54 9 11 9988-1122',
      color: '#1e40af',
      workingDays: [2, 3, 4, 5, 6], // Mar - Sáb
      workingHoursStart: '10:00',
      workingHoursEnd: '19:30',
      blockedDates: [],
      active: true,
      createdAt: today,
    },
  ];
}

export function getDefaultClients(businessId: string): Client[] {
  const today = getTodayDateString();
  return [
    {
      id: 'cli_1',
      businessId,
      name: 'Sofía Martínez',
      phone: '+5491133445566',
      email: 'sofia.martinez@ejemplo.com',
      notes: 'Sensibilidad en cuero cabelludo. Prefiere café sin azúcar.',
      birthday: '1994-05-14',
      totalVisits: 5,
      totalSpent: 42500,
      createdAt: today,
      updatedAt: today,
    },
    {
      id: 'cli_2',
      businessId,
      name: 'Mariana López',
      phone: '+5491177889900',
      email: 'mariana.lopez@ejemplo.com',
      notes: 'Uñas esculpidas almendradas tono vía láctea.',
      birthday: '1998-11-20',
      totalVisits: 3,
      totalSpent: 28500,
      createdAt: today,
      updatedAt: today,
    },
    {
      id: 'cli_3',
      businessId,
      name: 'Federico Benítez',
      phone: '+5491122334455',
      email: 'fede.benitez@ejemplo.com',
      notes: 'Corte fade bajo 0.5 y toalla caliente.',
      birthday: '1991-03-08',
      totalVisits: 4,
      totalSpent: 30000,
      createdAt: today,
      updatedAt: today,
    },
    {
      id: 'cli_4',
      businessId,
      name: 'Lucía Fernández',
      phone: '+5491188991122',
      email: 'lucia.f@ejemplo.com',
      notes: 'Lifting cada 6 semanas. No usar productos con mentol.',
      birthday: '1996-08-30',
      totalVisits: 2,
      totalSpent: 22000,
      createdAt: today,
      updatedAt: today,
    },
  ];
}

export function getDefaultAppointments(businessId: string): Appointment[] {
  const today = getTodayDateString();
  return [
    {
      id: 'apt_1',
      businessId,
      clientId: 'cli_1',
      clientName: 'Sofía Martínez',
      clientPhone: '+5491133445566',
      staffId: 'stf_1',
      staffName: 'Camila Rossi',
      serviceId: 'srv_1',
      serviceName: 'Corte de Cabello & Brushing',
      date: today,
      time: '10:00',
      durationMinutes: 45,
      price: 8500,
      depositAmount: 3000,
      remainingBalance: 5500,
      status: 'confirmado',
      paymentMethod: 'mercadopago',
      notes: 'Confirmado por WhatsApp. Llega puntual.',
      createdAt: today,
      updatedAt: today,
    },
    {
      id: 'apt_2',
      businessId,
      clientId: 'cli_2',
      clientName: 'Mariana López',
      clientPhone: '+5491177889900',
      staffId: 'stf_2',
      staffName: 'Valeria Gómez',
      serviceId: 'srv_3',
      serviceName: 'Semipermanente con Kapping',
      date: today,
      time: '11:30',
      durationMinutes: 60,
      price: 9500,
      depositAmount: 9500,
      remainingBalance: 0,
      status: 'completado',
      paymentMethod: 'transferencia',
      notes: 'Abonado 100% por transferencia previa.',
      createdAt: today,
      updatedAt: today,
    },
    {
      id: 'apt_3',
      businessId,
      clientId: 'cli_3',
      clientName: 'Federico Benítez',
      clientPhone: '+5491122334455',
      staffId: 'stf_3',
      staffName: 'Lucas Medina',
      serviceId: 'srv_6',
      serviceName: 'Perfilado de Barba & Corte',
      date: today,
      time: '14:00',
      durationMinutes: 40,
      price: 7500,
      depositAmount: 0,
      remainingBalance: 7500,
      status: 'confirmado',
      paymentMethod: 'efectivo',
      notes: 'Paga en efectivo al llegar.',
      createdAt: today,
      updatedAt: today,
    },
    {
      id: 'apt_4',
      businessId,
      clientId: 'cli_4',
      clientName: 'Lucía Fernández',
      clientPhone: '+5491188991122',
      staffId: 'stf_2',
      staffName: 'Valeria Gómez',
      serviceId: 'srv_4',
      serviceName: 'Lifting de Pestañas + Tinte',
      date: today,
      time: '16:00',
      durationMinutes: 50,
      price: 11000,
      depositAmount: 4000,
      remainingBalance: 7000,
      status: 'pendiente',
      paymentMethod: 'mercadopago',
      notes: 'Enviar recordatorio 2 horas antes.',
      createdAt: today,
      updatedAt: today,
    },
  ];
}

export function getDefaultCashMovements(businessId: string): CashMovement[] {
  const today = getTodayDateString();
  return [
    {
      id: 'csh_1',
      businessId,
      date: today,
      type: 'ingreso',
      category: 'seña',
      amount: 3000,
      paymentMethod: 'mercadopago',
      description: 'Seña turno Sofía Martínez (Corte & Brushing)',
      appointmentId: 'apt_1',
      createdAt: today,
    },
    {
      id: 'csh_2',
      businessId,
      date: today,
      type: 'ingreso',
      category: 'turno',
      amount: 9500,
      paymentMethod: 'transferencia',
      description: 'Cobro total turno Mariana López (Semipermanente con Kapping)',
      appointmentId: 'apt_2',
      createdAt: today,
    },
    {
      id: 'csh_3',
      businessId,
      date: today,
      type: 'gasto',
      category: 'insumos',
      amount: 4200,
      paymentMethod: 'efectivo',
      description: 'Compra toallas descartables y guantes de nitrilo',
      createdAt: today,
    },
    {
      id: 'csh_4',
      businessId,
      date: today,
      type: 'ingreso',
      category: 'seña',
      amount: 4000,
      paymentMethod: 'mercadopago',
      description: 'Seña turno Lucía Fernández (Lifting de Pestañas)',
      appointmentId: 'apt_4',
      createdAt: today,
    },
  ];
}
