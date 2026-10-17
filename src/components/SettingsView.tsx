import React, { useState, useEffect } from 'react';
import {
  Settings,
  Building2,
  Phone,
  MapPin,
  DollarSign,
  CreditCard,
  Check,
  RefreshCw,
  Award,
  Key,
  Eye,
  EyeOff,
  QrCode,
  Palette,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WhatsAppIcon, MercadoPagoIcon } from './icons';
import { THEME_COLOR_OPTIONS } from '../types';

/**
 * SettingsView - Configuración y personalización del negocio / salón.
 * - Textos de alto contraste (#111827 / text-gray-900) para lectura óptima sobre blanco.
 * - Eliminadas por completo las secciones técnicas: 'Aplicación Web Móvil (PWA)', 'Identidad Oficial' y 'Guía de Uso'.
 * - Muestra exclusivamente las opciones reales de configuración del negocio.
 */
export function SettingsView() {
  const {
    business,
    updateBusiness,
    resetToSampleData,
    loginWithGoogle,
    isDemoMode,
  } = useApp();

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

  // Sync state whenever business updates
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
      developerName: 'Iris Quiroz',
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-gray-900">
      {/* Tarjeta Principal de Configuración */}
      <div className="bg-white rounded-2xl border border-gray-300 p-6 sm:p-8 shadow-sm space-y-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-amber-50 text-amber-900 border border-amber-300 rounded-2xl shrink-0">
              <Building2 className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Configuración del Negocio
              </h2>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">
                Datos del local, medios de cobro, colores, teléfono y dirección.
              </p>
            </div>
          </div>

          {isDemoMode && (
            <button
              type="button"
              onClick={loginWithGoogle}
              className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-extrabold shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
            >
              Conectar Cuenta de Google
            </button>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-7">
          {/* 1. Datos Principales y Nombre del Local */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-300 space-y-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Nombre y Marca del Local</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                  Nombre Principal del Negocio *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu Agenda Lista"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none bg-white font-bold text-gray-900 shadow-xs transition-all"
                />
                <span className="text-xs font-medium text-gray-900 mt-1.5 block">
                  Se muestra en la barra superior, reportes y comprobantes.
                </span>
              </div>

              {/* Selector de Paleta de Color */}
              <div>
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Color Distintivo del Negocio
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
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                        themeColor === opt.hex
                          ? 'border-gray-900 bg-white ring-2 ring-gray-900 shadow-xs'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-black/10"
                        style={{ backgroundColor: opt.hex }}
                      />
                      <span className="text-xs font-black text-gray-900 truncate">
                        {opt.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-900 mt-1.5 block">
                  Color activo: <strong className="text-black font-extrabold">{themeName}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 2. Rubro y Teléfono de Contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
                Rubro o Especialidad del Salón
              </label>
              <input
                type="text"
                placeholder="Ej. Peluquería, Estética, Barbería, Spa, Uñas..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
                Teléfono / WhatsApp de Contacto
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-900 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  placeholder="+54 9 11 4567-8901"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none font-bold text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* 3. Prefijo Telefónico y Recordatorios */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/90 border border-emerald-300 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon size={34} variant="badge" className="shadow-xs" />
                <div>
                  <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wider">
                    WhatsApp & Envíos Directos
                  </h4>
                  <p className="text-xs font-semibold text-emerald-900 mt-0.5">
                    Prefijo para enviar mensajes y recordatorios con 1 solo toque.
                  </p>
                </div>
              </div>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 border border-emerald-400">
                wa.me activo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block mb-1.5">
                  Prefijo / País Predeterminado *
                </label>
                <select
                  value={phoneCountryPrefix}
                  onChange={(e) => setPhoneCountryPrefix(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-emerald-400 bg-white focus:border-emerald-700 outline-none font-black text-gray-900"
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
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-emerald-300 text-xs space-y-1">
                <span className="font-black text-emerald-950 block">Mensaje de confirmación:</span>
                <p className="text-gray-900 font-semibold italic bg-emerald-50/50 p-2 rounded-lg border border-emerald-200">
                  "Hola [Nombre], te confirmamos tu turno para [Servicio] el día [Fecha] a las [Hora] hs."
                </p>
              </div>
            </div>
          </div>

          {/* 4. Dirección del Local y Símbolo de Moneda */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
                Dirección del Local / Sucursal
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-900 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Ej. Av. Santa Fe 2340, CABA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none font-bold text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
                Símbolo de Moneda
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-900 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="$, ARS, USD, EUR, MXN..."
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none font-black text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* 5. Cobros con Mercado Pago */}
          <div className="p-5 sm:p-7 rounded-2xl bg-sky-50/80 border-2 border-sky-300 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-200 pb-4">
              <div className="flex items-center gap-3">
                <MercadoPagoIcon size={40} variant="badge" className="shadow-xs" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-gray-900 tracking-tight">
                      Cobros y Señas con Mercado Pago
                    </h4>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#009EE3] text-white">
                      Oficial
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-900 mt-0.5">
                    Permite generar links de pago de seña, botones directos y cobro por QR.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-black text-sky-900 bg-sky-100 px-3 py-1.5 rounded-xl border border-sky-300">
                <QrCode className="w-3.5 h-3.5 text-sky-800" />
                <span>Link & QR Automático</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Access Token */}
              <div>
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-sky-700" />
                  Mercado Pago Access Token
                </label>
                <div className="relative">
                  <input
                    type={showToken ? 'text' : 'password'}
                    placeholder="APP_USR-xxxxxx o TEST-xxxxxx"
                    value={mercadoPagoAccessToken}
                    onChange={(e) => setMercadoPagoAccessToken(e.target.value)}
                    className="w-full text-xs font-mono pl-3.5 pr-10 py-3 rounded-xl border border-gray-300 bg-white focus:border-gray-900 outline-none font-bold text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-3 text-gray-700 hover:text-black cursor-pointer"
                    title={showToken ? 'Ocultar token' : 'Ver token'}
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-xs font-medium text-gray-900 mt-1 block">
                  Panel de Mercado Pago Developers &gt; Tus Credenciales.
                </span>
              </div>

              {/* Alias */}
              <div>
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-sky-700" />
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
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-gray-900 outline-none font-black text-gray-900 font-mono"
                />
                <span className="text-xs font-medium text-gray-900 mt-1 block">
                  Alias para transferencias inmediatas de señas sin comisiones.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              {/* CVU */}
              <div>
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
                  CVU de Mercado Pago (22 dígitos opcionales)
                </label>
                <input
                  type="text"
                  placeholder="0000003100085492109482"
                  value={mercadoPagoCvu}
                  onChange={(e) => setMercadoPagoCvu(e.target.value)}
                  className="w-full text-xs font-mono px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-gray-900 outline-none font-bold text-gray-900"
                />
              </div>

              {/* Porcentaje sugerido de Seña */}
              <div>
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
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
                    className="w-28 text-sm px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-gray-900 outline-none font-black text-gray-900"
                  />
                  <span className="text-xs font-bold text-gray-900">
                    (% calculado automáticamente al agendar cada turno, ej. 30% o 50%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={async () => {
                if (confirm('¿Restablecer los datos de ejemplo del salón?')) {
                  await resetToSampleData();
                }
              }}
              className="text-xs font-bold text-gray-900 hover:text-black flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-gray-900" />
              <span>Restaurar datos de muestra</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Settings className="w-4 h-4 text-amber-300" />}
              <span>{isSaved ? '¡Guardado correctamente!' : 'Guardar Cambios del Negocio'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsView;
