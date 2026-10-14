import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  Check, 
  ArrowLeft, 
  Coins, 
  Wine, 
  Flame, 
  Crown, 
  QrCode,
  X
} from 'lucide-react';
import { ClubUser, PleasurePrivilege } from '../types.ts';
import { PLEASURE_PRIVILEGES } from '../mockData.ts';

interface PrivilegesViewProps {
  user: ClubUser;
  onBack: () => void;
  onDeductVU: (amount: number) => boolean;
  lang: 'ru' | 'en';
}

export const PrivilegesView: React.FC<PrivilegesViewProps> = ({
  user,
  onBack,
  onDeductVU,
  lang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVoucher, setActiveVoucher] = useState<PleasurePrivilege | null>(null);
  const [exchangeError, setExchangeError] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Все привилегии' },
    { id: 'dance', label: 'Приватные шоу' },
    { id: 'bar', label: 'Бар & Кальяны' },
    { id: 'vip', label: 'VIP-сьюты' },
    { id: 'experience', label: 'Crazy Menu' },
  ];

  const filteredItems = PLEASURE_PRIVILEGES.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  const handleRedeem = (priv: PleasurePrivilege) => {
    setExchangeError(null);
    if (user.pleasureCurrencyBalance < priv.costVU) {
      setExchangeError(`Недостаточно ВУ. Ваш баланс: ${user.pleasureCurrencyBalance} ВУ, требуется: ${priv.costVU} ВУ.`);
      return;
    }

    const success = onDeductVU(priv.costVU);
    if (success) {
      setActiveVoucher(priv);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'ru' ? 'Назад в кабинет' : 'Back'}</span>
        </button>
        <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
          PLEASURE VAULT
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
          <span>Что я могу получить за ВУ</span>
          <Gift className="w-5 h-5 text-amber-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Каталог эксклюзивных клубных удовольствий. Обменивайте накопленные баллы прямо со смартфона.
        </p>
      </div>

      {/* User Balance Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#180a2b] to-[#110521] border border-purple-500/30 flex items-center justify-between">
        <div>
          <div className="text-[11px] text-purple-300 uppercase tracking-wider">
            Доступно для обмена
          </div>
          <div className="text-2xl font-mono font-bold text-amber-300 mt-0.5">
            {user.pleasureCurrencyBalance.toLocaleString('ru-RU')} <span className="text-sm font-sans text-purple-300">ВУ</span>
          </div>
        </div>
        <div className="text-right text-xs text-slate-400">
          1 ВУ = 1 ₽
        </div>
      </div>

      {exchangeError && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs">
          {exchangeError}
        </div>
      )}

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-black font-semibold'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Privileges Grid */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const canAfford = user.pleasureCurrencyBalance >= item.costVU;

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl velvet-card hover:border-amber-500/30 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-100">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-mono font-bold text-amber-300">
                    {item.costVU.toLocaleString('ru-RU')} ВУ
                  </div>
                  <div className="text-[10px] text-slate-500 line-through">
                    В меню: {item.originalRubCost.toLocaleString('ru-RU')} ₽
                  </div>
                </div>

                <button
                  onClick={() => handleRedeem(item)}
                  disabled={!canAfford}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    canAfford
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20 active:scale-95'
                      : 'bg-white/5 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? 'Получить' : 'Не хватает ВУ'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Redeemed Voucher Modal */}
      {activeVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl velvet-card-gold p-6 border-2 border-amber-400 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400 mx-auto flex items-center justify-center">
              <Check className="w-7 h-7 text-amber-300" />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                ВАУЧЕР НА ПРИВИЛЕГИЮ АКТИВИРОВАН
              </div>
              <h3 className="text-lg font-serif font-bold text-amber-100">
                {activeVoucher.title}
              </h3>
              <p className="text-xs text-slate-300">
                Предъявите официанту или хостес в любом клубе сети
              </p>
            </div>

            {/* QR Voucher Box */}
            <div className="p-3 bg-white rounded-2xl inline-block mx-auto shadow-xl">
              <QrCode className="w-32 h-32 text-black" />
              <div className="text-[10px] font-mono text-black font-bold tracking-widest mt-1">
                VU-{activeVoucher.id.toUpperCase()}-77
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              Списано: <strong className="text-amber-300 font-mono">{activeVoucher.costVU} ВУ</strong>. Привилегия действительна 30 дней.
            </div>

            <button
              onClick={() => setActiveVoucher(null)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
