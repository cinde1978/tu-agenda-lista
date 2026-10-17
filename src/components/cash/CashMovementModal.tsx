import React, { useState } from 'react';
import { X, DollarSign, ArrowUpRight, ArrowDownLeft, Tag, CreditCard, Check, Building2 } from 'lucide-react';
import { CashMovementType, CashMovementCategory, PaymentMethod, BranchId } from '../../types';
import { useApp } from '../../context/AppContext';
import { getTodayDateString } from '../../utils/initialData';

interface CashMovementModalProps {
  initialDate?: string;
  onClose: () => void;
  onSaved: (id: string) => void;
}

const INCOME_CATEGORIES: CashMovementCategory[] = ['turno', 'seña', 'saldo', 'otro'];
const EXPENSE_CATEGORIES: CashMovementCategory[] = ['insumos', 'alquiler', 'servicios', 'comisiones', 'otro'];

export function CashMovementModal({ initialDate, onClose, onSaved }: CashMovementModalProps) {
  const { createCashMovement, business, selectedBranch, branches } = useApp();
  const [branchId, setBranchId] = useState<BranchId>(selectedBranch);
  const [date, setDate] = useState(initialDate || getTodayDateString());
  const [type, setType] = useState<CashMovementType>('ingreso');
  const [category, setCategory] = useState<CashMovementCategory>('turno');
  const [amount, setAmount] = useState<number>(1000);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('efectivo');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTypeChange = (newType: CashMovementType) => {
    setType(newType);
    if (newType === 'ingreso') {
      setCategory('turno');
    } else {
      setCategory('insumos');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    setIsSubmitting(true);
    try {
      const id = await createCashMovement({
        date,
        branchId,
        type,
        category,
        amount: Number(amount),
        paymentMethod,
        description: description.trim() || (type === 'ingreso' ? 'Ingreso registrado' : 'Gasto registrado'),
      });
      onSaved(id);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className={`p-5 text-white flex items-center justify-between ${
          type === 'ingreso' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gradient-to-r from-rose-600 to-red-600'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs">
              {type === 'ingreso' ? <ArrowDownLeft className="w-5 h-5 text-white" /> : <ArrowUpRight className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {type === 'ingreso' ? 'Nuevo Ingreso a Caja' : 'Nuevo Gasto de Caja'}
              </h3>
              <p className="text-white/80 text-xs">
                Registra movimientos para mantener el arqueo al día
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => handleTypeChange('ingreso')}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                type === 'ingreso'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              <span>Ingreso (+)</span>
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('gasto')}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                type === 'gasto'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Gasto (-)</span>
            </button>
          </div>

          {/* Sucursal Selector */}
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

          {/* Amount */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Monto ({business?.currency || '$'}) *
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                min="1"
                step="50"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full text-base font-bold pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          {/* Category & Payment Method */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CashMovementCategory)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white capitalize outline-none"
              >
                {(type === 'ingreso' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Medio de Pago</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white capitalize outline-none"
              >
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
                <option value="mercadopago">Mercado Pago</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Fecha del movimiento</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Descripción o Detalle</label>
            <input
              type="text"
              placeholder={type === 'ingreso' ? 'Ej. Venta de shampoo o propina' : 'Ej. Compra de algodón, café o toallas'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md flex items-center gap-2 ${
                type === 'ingreso' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Guardando...' : 'Registrar Movimiento'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
