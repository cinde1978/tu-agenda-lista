import React, { useState, useEffect } from 'react';
import {
  Settings,
  Building2,
  Phone,
  MapPin,
  DollarSign,
  CreditCard,
  Check,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Copy,
  Award,
  Smartphone,
  Download,
  Key,
  Eye,
  EyeOff,
  MessageCircle,
  QrCode,
  Lock,
  Palette,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppLogo } from '../AppLogo';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { WhatsAppIcon, MercadoPagoIcon } from '../icons';
import { ConfigImportExportCard } from './ConfigImportExportCard';
import { THEME_COLOR_OPTIONS } from '../../types';

export function SettingsAndGuideView() {
  const {
    business,
    updateBusiness,
    resetToSampleData,
    loginWithGoogle,
    user,
    isDemoMode,
  } = useApp();

  const { isInstallable, isInstalled, install } = usePWAInstall();

  // Local form state
  const [name, setName] = useState(business?.name || 'Tu Agenda Lista');
  const [category, setCategory] = useState(business?.category || 'Centro de Estética & Belleza');
  const [phone, setPhone] = useState(business?.phone || '+54 9 11 4567-8901');
  const [phoneCountryPrefix, setPhoneCountryPrefix] = useState(business?.phoneCountryPrefix || '+54');
  const [address, setAddress] = useState(business?.address || 'Av. Principal 1234');
  const [currency, setCurrency] = useState(business?.currency || '$');
  const [cbuAlias, setCbuAlias] = useState(business?.cbuAlias || 'agenda.turnos.mp');
  const [mercadoPagoAccessToken, setMercadoPagoAccessToken] = useState(business?.mercadoPagoAccessToken || '');
  const [mercadoPagoAlias, setMercadoPagoAlias] = useState(business?.mercadoPagoAlias || business?.cbuAlias || 'agenda.turnos.mp');
  const [mercadoPagoCvu, setMercadoPagoCvu] = useState(business?.mercadoPagoCvu || '0000003100085492109482');
  const [defaultDepositPercentage, setDefaultDepositPercentage] = useState(business?.defaultDepositPercentage || 30);
  const [showToken, setShowToken] = useState(false);
  const [defaultSlotMinutes, setDefaultSlotMinutes] = useState(business?.defaultSlotMinutes || 30);
  const [themeColor, setThemeColor] = useState(business?.themeColor || '#D4AF37');
  const [themeName, setThemeName] = useState(business?.themeName || 'Oro Metálico & Obsidian (Oficial)');

  const [isSaved, setIsSaved] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Sync state whenever business updates (e.g. on JSON configuration import)
  useEffect(() => {
    if (business) {
      setName(business.name || 'Tu Agenda Lista');
      setCategory(business.category || 'Centro de Estética & Belleza');
      setPhone(business.phone || '+54 9 11 4567-8901');
      setPhoneCountryPrefix(business.phoneCountryPrefix || '+54');
      setAddress(business.address || 'Av. Principal 1234');
      setCurrency(business.currency || '$');
      setCbuAlias(business.cbuAlias || 'agenda.turnos.mp');
      setMercadoPagoAccessToken(business.mercadoPagoAccessToken || '');
      setMercadoPagoAlias(business.mercadoPagoAlias || business.cbuAlias || 'agenda.turnos.mp');
      setMercadoPagoCvu(business.mercadoPagoCvu || '0000003100085492109482');
      setDefaultDepositPercentage(business.defaultDepositPercentage || 30);
      setDefaultSlotMinutes(business.defaultSlotMinutes || 30);
      setThemeColor(business.themeColor || '#D4AF37');
      setThemeName(business.themeName || 'Oro Metálico & Obsidian (Oficial)');
    }
  }, [business]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBusiness({
      name: name.trim() || 'Tu Agenda Lista',
      developerName: 'Iris Quiroz', // Protected immutable master SaaS license
      tagline: 'Desarrollado por Iris Quiroz',
      themeColor,
      themeName,
      category: category.trim(),
      phone: phone.trim(),
      phoneCountryPrefix: phoneCountryPrefix.trim() || '+54',
      address: address.trim(),
      currency: currency.trim(),
      cbuAlias: cbuAlias.trim(),
      mercadoPagoAccessToken: mercadoPagoAccessToken.trim(),
      mercadoPagoAlias: mercadoPagoAlias.trim(),
      mercadoPagoCvu: mercadoPagoCvu.trim(),
      defaultDepositPercentage: Number(defaultDepositPercentage) || 30,
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
      {/* 1. SaaS White-label Brand Live Preview Card (Clean, aligned, zero empty or awkward boxes) */}
      <div className="bg-gradient-to-r from-slate-950 via-[#161B26] to-[#0B0F17] text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-[#D4AF37]/35 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5 text-[#D4AF37] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Identidad Oficial del Software</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/20 px-3.5 py-1 rounded-full text-emerald-300 border border-emerald-400/30 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SaaS Pro · Lista para Comercializar</span>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4 min-w-0">
            <AppLogo size={52} className="shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-tight">
                  {name || 'Tu Agenda Lista'}
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#FAF6ED] text-[#946E19] border border-[#E2D1A6] uppercase tracking-wider shrink-0 shadow-2xs">
                  PRO
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Desarrollado por <strong className="text-[#E5C378] font-bold">Iris Quiroz</strong>
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-[#D4AF37]/30 text-xs font-medium text-amber-200">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Marca Propia</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. SaaS White-Label Multi-Cliente: Exportar e Importar Configuración JSON */}
      <ConfigImportExportCard />

      {/* 3. Personalización de Marca & Software (Adequate padding, clear input labels, spacious buttons) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Personalización de Marca & Software</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                Configura el nombre principal de la aplicación, paleta de colores del salón, moneda y datos del negocio.
              </p>
            </div>
          </div>

          {isDemoMode && (
            <button
              type="button"
              onClick={loginWithGoogle}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
            >
              Conectar Cuenta de Google
            </button>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Panel de Control de Licencia SaaS (Protegido e Inmutable) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0F1420] border-2 border-[#D4AF37]/45 text-white space-y-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-[#D4AF37] border border-amber-400/30">
                  <ShieldCheck className="w-5 h-5 text-[#E5C378]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-white tracking-tight">
                      Panel de Control de Licencia SaaS
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      Inmutable
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Derechos de autor y autoría protegidos contractualmente contra modificaciones o borrado accidental.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#E5C378] bg-white/5 px-3 py-1 rounded-xl border border-white/10 self-start sm:self-auto shadow-2xs">
                LIC-SAAS-IRIS-QUIROZ-2026
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Desarrollado por (Pie de Página y Créditos Oficiales)
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-white tracking-tight">
                    Iris Quiroz
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#FAF6ED] text-[#946E19] border border-[#E2D1A6] uppercase shadow-2xs">
                    Master Autor
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Fijado de forma permanente en el pie de página y barra lateral de la aplicación para garantizar la autoría del software.
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Estado de Protección de Licencia
                </span>
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Activa · Protegida contra Borrado</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Los créditos "Desarrollado por Iris Quiroz" se mantienen fijos aunque se importen o dupliquen nuevos salones.
                </p>
              </div>
            </div>
          </div>

          {/* Configuración de Marca del Cliente y Colores */}
          <div className="p-5 sm:p-7 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-6">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              Identidad de Marca del Salón (White-Label)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Título Principal del Salón o Negocio *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu Agenda Lista"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none bg-white font-semibold text-slate-900 shadow-2xs transition-all"
                />
                <span className="text-xs text-slate-500 mt-2 block leading-relaxed">
                  Aparece en el encabezado principal, barra lateral y reportes (ej. Tu Agenda Lista)
                </span>
              </div>

              {/* Selector de Paleta de Colores del Salón */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-blue-600" />
                  Paleta de Color de Marca del Salón
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {THEME_COLOR_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setThemeColor(opt.hex);
                        setThemeName(opt.name);
                      }}
                      className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 ${
                        themeColor === opt.hex
                          ? 'border-slate-900 bg-white ring-2 ring-slate-900/10 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 shadow-2xs"
                        style={{ backgroundColor: opt.hex }}
                      />
                      <span className="text-[11px] font-bold text-slate-800 truncate">
                        {opt.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-500 mt-2 block leading-relaxed">
                  Color activo: <strong className="text-slate-800">{themeName}</strong> ({themeColor}). Se guarda y exporta en el JSON del cliente.
                </span>
              </div>
            </div>
          </div>

          {/* Business Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Rubro / Categoría del Salón</label>
              <input
                type="text"
                placeholder="Ej. Peluquería, Estética, Barbería, Spa..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none font-medium text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Teléfono / WhatsApp de Contacto</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  placeholder="+54 9 11 4567-8901"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none font-medium text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Configuración de WhatsApp & Prefijo de País */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WhatsAppIcon size={34} variant="badge" className="shadow-xs" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    Configuración de WhatsApp & Envíos Directos
                  </h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Define el prefijo internacional predeterminado para abrir WhatsApp con un clic en cada turno.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                wa.me activo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1.5">
                  Prefijo / País Predeterminado *
                </label>
                <select
                  value={phoneCountryPrefix}
                  onChange={(e) => setPhoneCountryPrefix(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none font-bold text-slate-800"
                >
                  <option value="+54">🇦🇷 Argentina (+54)</option>
                  <option value="+34">🇪🇸 España (+34)</option>
                  <option value="+52">🇲🇽 México (+52)</option>
                  <option value="+56">🇨🇱 Chile (+56)</option>
                  <option value="+598">🇺🇾 Uruguay (+598)</option>
                  <option value="+57">🇨🇴 Colombia (+57)</option>
                  <option value="+51">🇵🇪 Perú (+51)</option>
                  <option value="+595">🇵🇾 Paraguay (+595)</option>
                  <option value="+591">🇧🇴 Bolivia (+591)</option>
                  <option value="+1">🇺🇸 Estados Unidos / Canadá (+1)</option>
                  <option value="+55">🇧🇷 Brasil (+55)</option>
                </select>
                <span className="text-[11px] text-emerald-700 mt-1 block">
                  Al hacer clic en el ícono verde de WhatsApp, se formateará automáticamente el número del cliente.
                </span>
              </div>

              <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-200 text-xs space-y-1">
                <span className="font-bold text-emerald-900 block">Mensaje predeterminado generado:</span>
                <p className="text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                  "Hola [Nombre], te confirmamos tu turno para [Servicio] el día [Fecha] a las [Hora] hs."
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Dirección del Salón / Local</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Ej. Av. Santa Fe 2340, CABA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none font-medium text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Símbolo de Moneda</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="$, ARS, USD, EUR, MXN..."
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none font-bold text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Integración Completa de Cobros con Mercado Pago */}
          <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-sky-50/50 border-2 border-[#009EE3]/40 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-4">
              <div className="flex items-center gap-3">
                <MercadoPagoIcon size={40} variant="badge" className="shadow-md ring-2 ring-white/50" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">
                      Integración de Cobros con Mercado Pago
                    </h4>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#009EE3] text-white">
                      Oficial
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Permite generar botones de "Pagar Seña con Mercado Pago", checkout directo y códigos QR interactivos.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#009EE3] bg-sky-100/70 px-3 py-1 rounded-xl">
                <QrCode className="w-3.5 h-3.5" />
                <span>Link & QR Automático</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Mercado Pago Access Token */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#009EE3]" />
                  Mercado Pago Access Token (Producción o Prueba)
                </label>
                <div className="relative">
                  <input
                    type={showToken ? 'text' : 'password'}
                    placeholder="APP_USR-xxxxxx o TEST-xxxxxx"
                    value={mercadoPagoAccessToken}
                    onChange={(e) => setMercadoPagoAccessToken(e.target.value)}
                    className="w-full text-xs font-mono pl-3.5 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/20 outline-none font-medium text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                    title={showToken ? 'Ocultar token' : 'Ver token'}
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Obtenla en tu panel de Mercado Pago Developers &gt; Tus Credenciales.
                </span>
              </div>

              {/* Alias / CVU */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#009EE3]" />
                  Alias de Mercado Pago
                </label>
                <input
                  type="text"
                  placeholder="agenda.turnos.mp"
                  value={mercadoPagoAlias}
                  onChange={(e) => {
                    setMercadoPagoAlias(e.target.value);
                    setCbuAlias(e.target.value);
                  }}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/20 outline-none font-bold text-slate-800 font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Alias para transferencias inmediatas de señas sin comisiones bancarias.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              {/* CVU */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  CVU de Mercado Pago (22 dígitos opcionales)
                </label>
                <input
                  type="text"
                  placeholder="0000003100085492109482"
                  value={mercadoPagoCvu}
                  onChange={(e) => setMercadoPagoCvu(e.target.value)}
                  className="w-full text-xs font-mono px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/20 outline-none text-slate-800"
                />
              </div>

              {/* Porcentaje sugerido de Seña */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Porcentaje sugerido de seña (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="10"
                    max="100"
                    step="5"
                    value={defaultDepositPercentage}
                    onChange={(e) => setDefaultDepositPercentage(Number(e.target.value))}
                    className="w-28 text-sm px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/20 outline-none font-extrabold text-slate-800"
                  />
                  <span className="text-xs text-slate-500 font-medium">
                    (Se calculará automáticamente al agendar cada turno, ej. 30% o 50%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions with Generous Spacing */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={async () => {
                if (confirm('¿Restablecer los datos de ejemplo del salón?')) {
                  await resetToSampleData();
                }
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restaurar datos de muestra</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 active:scale-98"
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
              <span>{isSaved ? '¡Guardado correctamente!' : 'Guardar Cambios de Marca'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 4. Guide: Ownership, Export and Deployment */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-bold border border-blue-400/30">
            <ShieldCheck className="w-4 h-4" />
            100% Control y Propiedad del Código
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            Guía de Uso, Descarga y Comercialización Independiente
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Esta aplicación está desarrollada sobre estándares abiertos (React 19, TypeScript, Tailwind CSS y Firebase).
            No dependes de suscripciones obligatorias ni plataformas cerradas: eres libre de comercializarla,
            alojarla en tu propio dominio y ofrecerla a salones y estilistas bajo tu propia marca <strong>Tu Agenda Lista</strong>.
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
            ¿Cómo publicarla en tu propio dominio?
          </div>
          <ul className="text-xs text-slate-300 space-y-1.5 pl-8 list-disc">
            <li><strong>Vercel o Netlify:</strong> Conecta tu repositorio de GitHub en Vercel o Netlify y compila con un clic (<code className="text-sky-300">npm run build</code>). Tienen planes gratuitos excelentes.</li>
            <li><strong>Firebase Hosting:</strong> Ejecuta <code className="text-sky-300">firebase deploy</code> para alojar la web directamente en los servidores de Google con SSL gratis.</li>
            <li><strong>Dominio propio:</strong> Configura tu dominio personalizado en los DNS sin pagar costo extra.</li>
            <li><strong>Monetización:</strong> Puedes cobrar una tarifa mensual o instalación llave en mano a salones de belleza, barberías y manicurías.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
