import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Phone,
  MapPin,
  DollarSign,
  CreditCard,
  Clock,
  Download,
  Globe,
  Flame,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function SettingsAndGuideView() {
  const { business, updateBusiness, resetToSampleData, isDemoMode, user, loginWithGoogle } = useApp();

  const [name, setName] = useState(business?.name || '');
  const [category, setCategory] = useState(business?.category || 'Estética & Peluquería');
  const [phone, setPhone] = useState(business?.phone || '');
  const [address, setAddress] = useState(business?.address || '');
  const [currency, setCurrency] = useState(business?.currency || '$');
  const [cbuAlias, setCbuAlias] = useState(business?.cbuAlias || '');
  const [defaultSlotMinutes, setDefaultSlotMinutes] = useState(business?.defaultSlotMinutes || 30);

  const [isSaved, setIsSaved] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBusiness({
      name: name.trim(),
      category: category.trim(),
      phone: phone.trim(),
      address: address.trim(),
      currency: currency.trim(),
      cbuAlias: cbuAlias.trim(),
      defaultSlotMinutes: Number(defaultSlotMinutes),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Business Profile Configuration */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Datos de tu Negocio & Marca</h2>
              <p className="text-xs text-slate-500">
                Personaliza el nombre, moneda, dirección y datos bancarios para señas
              </p>
            </div>
          </div>

          {isDemoMode && (
            <button
              type="button"
              onClick={loginWithGoogle}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              Conectar Cuenta de Google
            </button>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Nombre Comercial *</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Ej. Salón de Belleza Glamour"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Rubro / Categoría</label>
              <input
                type="text"
                placeholder="Ej. Peluquería, Estética, Barbería, Spa..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Teléfono / WhatsApp del Local</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="+54 9 11 4567-8901"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Dirección del Salón</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Ej. Av. Santa Fe 2340, CABA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Símbolo de Moneda</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="$, ARS, USD, EUR, MXN..."
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none font-bold"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Alias / CBU para recibir señas bancarias
              </label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="agenda.salon.mp / 00000031000..."
                  value={cbuAlias}
                  onChange={(e) => setCbuAlias(e.target.value)}
                  className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={async () => {
                if (confirm('¿Restablecer los datos de ejemplo del salón?')) {
                  await resetToSampleData();
                }
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Cargar / restaurar datos de muestra</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
              <span>{isSaved ? '¡Guardado correctamente!' : 'Guardar Cambios'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Guide: Ownership, Export and Deployment */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-bold border border-blue-400/30">
            <ShieldCheck className="w-4 h-4" />
            100% Control y Propiedad del Código
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            Guía de Uso, Descarga y Publicación Independiente
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Esta aplicación está desarrollada sobre estándares abiertos (React 19, TypeScript, Tailwind CSS y Firebase).
            No dependes de suscripciones obligatorias ni plataformas cerradas: eres libre de comercializarla,
            alojarla en tu propio dominio y ofrecerla a salones y estilistas bajo tu propia marca.
          </p>
        </div>

        {/* Step 1: Testing */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">1</span>
            ¿Cómo probar la aplicación ahora mismo?
          </div>
          <ul className="text-xs text-slate-300 space-y-1.5 pl-8 list-disc">
            <li><strong>Agenda:</strong> Navega entre vista Diaria, Semanal y Mensual. Haz clic en cualquier hueco para crear un turno.</li>
            <li><strong>WhatsApp:</strong> Abre cualquier turno y toca el botón "WhatsApp". Se generará el mensaje personalizado listo para enviar.</li>
            <li><strong>Caja Diaria:</strong> Al finalizar un turno, haz clic en "Completar y Cobrar". El dinero ingresará automáticamente a la caja del día.</li>
            <li><strong>Clientes y Servicios:</strong> Administra las fichas de clientes y el catálogo de tratamientos con sus precios y duraciones.</li>
          </ul>
        </div>

        {/* Step 2: Download Code */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">2</span>
              ¿Cómo descargar y clonar el código a tu computadora?
            </div>
          </div>
          <p className="text-xs text-slate-300 pl-8">
            Puedes clonar el repositorio o descargar los archivos del proyecto directamente en tu máquina.
            Para ejecutarlo localmente:
          </p>
          <div className="bg-slate-950 p-3.5 rounded-xl text-xs font-mono text-emerald-400 flex items-center justify-between border border-white/10 ml-8">
            <code>npm install && npm run dev</code>
            <button
              onClick={() => copyToClipboard('npm install && npm run dev', 'npm_run')}
              className="text-slate-400 hover:text-white p-1"
              title="Copiar comando"
            >
              {copiedSection === 'npm_run' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Step 3: Own Firebase */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">3</span>
            ¿Cómo conectar tu propia base de datos Firebase 100% gratuita?
          </div>
          <ol className="text-xs text-slate-300 space-y-1.5 pl-8 list-decimal">
            <li>Ingresa a <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-sky-300 underline font-medium">console.firebase.google.com</a> con cualquier cuenta de Google.</li>
            <li>Crea un proyecto nuevo (el plan gratuito Spark incluye Firestore y Autenticación sin costo).</li>
            <li>En "Authentication", activa el proveedor de "Google".</li>
            <li>En "Cloud Firestore", crea la base de datos y copia las reglas de seguridad de este proyecto (<code className="text-sky-300">firestore.rules</code>).</li>
            <li>Copia las credenciales web en tu archivo <code className="text-sky-300">firebase-applet-config.json</code>. ¡Listo, tus datos serán 100% privados y tuyos!</li>
          </ol>
        </div>

        {/* Step 4: Publish to Web */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">4</span>
            ¿Cómo publicarla en tu propio dominio (ej. tuagendalista.com)?
          </div>
          <ul className="text-xs text-slate-300 space-y-1.5 pl-8 list-disc">
            <li><strong>Vercel o Netlify:</strong> Conecta tu repositorio de GitHub en Vercel o Netlify y compila con un clic (<code className="text-sky-300">npm run build</code>). Tienen planes gratuitos excelentes.</li>
            <li><strong>Firebase Hosting:</strong> Ejecuta <code className="text-sky-300">firebase deploy</code> para alojar la web directamente en los servidores de Google con SSL gratis.</li>
            <li><strong>Dominio propio:</strong> Configura tu dominio personalizado (ej. <em>tuagendalista.com</em> o <em>agenda.tunegocio.com</em>) en los DNS sin pagar costo extra.</li>
            <li><strong>Monetización:</strong> Puedes cobrar una tarifa mensual o instalación llave en mano a salones de belleza, barberías y manicurías.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
