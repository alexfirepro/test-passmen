import React, { useState } from 'react';
import { X, Tag, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PROMO_CODES } from '../mockData.ts';

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBonusVU: (amount: number) => void;
  lang: 'ru' | 'en';
}

export const PromoModal: React.FC<PromoModalProps> = ({
  isOpen,
  onClose,
  onAddBonusVU,
  lang,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoList, setPromoList] = useState(PROMO_CODES);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();

    if (!cleanCode) return;

    if (promoList.some((p) => p.code === cleanCode)) {
      setStatusMessage({ type: 'error', text: 'Этот промокод уже активирован в вашем профиле.' });
      return;
    }

    if (cleanCode === 'NOIR2026' || cleanCode === 'VIP' || cleanCode === 'SECRET77') {
      const newPromo = {
        code: cleanCode,
        discount: 'Секретный клубный комплимент: +1 000 ВУ + Welcome Drink',
        expires: 'Сегодня ночью',
        active: true,
      };
      setPromoList([newPromo, ...promoList]);
      onAddBonusVU(1000);
      setStatusMessage({ type: 'success', text: 'Промокод успешно активирован! Начислено +1 000 ВУ.' });
      setPromoInput('');
    } else {
      setStatusMessage({ type: 'error', text: 'Промокод не найден или срок его действия истек.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl velvet-card-gold p-6 border border-amber-500/40 shadow-2xl space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
            ПРОГРАММА ЛОЯЛЬНОСТИ
          </div>
          <h2 className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2">
            <span>Мои промо-коды</span>
            <Tag className="w-4 h-4 text-amber-400" />
          </h2>
          <p className="text-xs text-slate-400">
            Специальные купоны на бесплатный вход, welcome-напитки и бонусные ВУ
          </p>
        </div>

        {/* Enter Code Form */}
        <form onSubmit={handleApplyCode} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Введите промокод (напр. NOIR2026)"
              className="flex-1 p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono uppercase text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shadow-md transition-all shrink-0"
            >
              Применить
            </button>
          </div>

          {statusMessage && (
            <div
              className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <Check className="w-4 h-4 shrink-0" />
              ) : (
                <X className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </form>

        {/* Active Codes List */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Доступные купоны ({promoList.length}):
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {promoList.map((promo, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-amber-300">
                    {promo.code}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    {promo.discount}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Действует до: {promo.expires}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Активен
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold"
        >
          Готово
        </button>
      </div>
    </div>
  );
};
