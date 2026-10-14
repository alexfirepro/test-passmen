import React, { useState } from 'react';
import { 
  Crown, 
  RotateCw, 
  Sun, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Wallet, 
  ArrowLeft 
} from 'lucide-react';
import { ClubUser } from '../types.ts';
import { LEVEL_TIERS } from '../mockData.ts';

interface VirtualCardViewProps {
  user: ClubUser;
  onBack: () => void;
  lang: 'ru' | 'en';
}

export const VirtualCardView: React.FC<VirtualCardViewProps> = ({
  user,
  onBack,
  lang,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMaxBrightness, setIsMaxBrightness] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);

  const tier = LEVEL_TIERS[user.level] || LEVEL_TIERS['XS'];

  return (
    <div className="w-full max-w-md mx-auto space-y-6 pb-24">
      {/* Top Bar for Card */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'ru' ? 'В кабинет' : 'Back to cabinet'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMaxBrightness(!isMaxBrightness)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
              isMaxBrightness
                ? 'bg-amber-400 text-black font-semibold shadow-lg shadow-amber-400/30'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
            title="Максимальная яркость для сканера на входе"
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{isMaxBrightness ? 'Ярко 100%' : 'Для сканера'}</span>
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-slate-300 hover:bg-white/15 text-xs"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'Перевернуть' : 'Flip'}</span>
          </button>
        </div>
      </div>

      {/* The 3D Luxury Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative w-full aspect-[1.58/1] cursor-pointer select-none transition-transform duration-500 perspective-1000"
      >
        <div
          className={`relative w-full h-full rounded-2xl p-6 transition-all duration-700 shadow-2xl flex flex-col justify-between overflow-hidden ${
            user.level === 'ROYAL VIP' || user.level === 'XL'
              ? 'bg-gradient-to-br from-[#1d152b] via-[#090610] to-[#1a102a] border border-amber-400/50 shadow-amber-900/30'
              : 'bg-gradient-to-br from-[#24133b] via-[#120822] to-[#2b1245] border border-purple-500/30 shadow-purple-950/50'
          }`}
        >
          {/* Subtle luxury mesh watermark */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-purple-600/15 blur-2xl pointer-events-none" />

          {/* Gold Foil Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

          {!isFlipped ? (
            /* FRONT OF CARD */
            <>
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-[1px] shadow-md">
                    <div className="w-full h-full bg-[#0d091a] rounded-[11px] flex items-center justify-center">
                      <Crown className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-sm tracking-[0.2em] font-bold text-amber-200">
                      ROYAL NOIR
                    </div>
                    <div className="text-[9px] tracking-widest text-slate-400 uppercase">
                      Gentlemen's Privilege
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-[11px] font-serif font-bold text-amber-300">
                    УРОВЕНЬ {user.level}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {user.cardType}
                  </div>
                </div>
              </div>

              {/* Card Chip & Contactless Emblem */}
              <div className="relative z-10 flex items-center gap-4 my-auto">
                <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-[1px] shadow-inner">
                  <div className="w-full h-full bg-gradient-to-br from-amber-300/80 to-amber-600/80 rounded-[5px] grid grid-cols-2 gap-1 p-1 opacity-90">
                    <div className="border-r border-amber-900/40 border-b"></div>
                    <div className="border-b border-amber-900/40"></div>
                    <div className="border-r border-amber-900/40"></div>
                    <div></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                    CARD NUMBER
                  </span>
                  <span className="font-mono text-lg font-bold tracking-[0.25em] text-amber-100">
                    {user.cardNumber.slice(0, 3)} {user.cardNumber.slice(3)}
                  </span>
                </div>
              </div>

              {/* Card Bottom Meta */}
              <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/10">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">
                    Владелец карты
                  </div>
                  <div className="text-sm font-medium tracking-wide text-slate-100 uppercase">
                    {user.name}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">
                    Кэшбэк
                  </div>
                  <div className="text-sm font-mono font-bold text-amber-400">
                    {user.cashbackPercent > 0 ? `${user.cashbackPercent}%` : '0%'}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* BACK OF CARD */
            <>
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400">
                  ПРАВИЛА И ПРИВИЛЕГИИ КАРТЫ
                </span>
                <span className="text-[10px] text-slate-400">ID: {user.id}</span>
              </div>

              {/* Magnetic Stripe simulation */}
              <div className="w-full h-8 bg-black/80 rounded my-1 border-y border-white/5 flex items-center px-4">
                <span className="font-mono text-[9px] text-slate-500 tracking-widest">
                  •••• •••• •••• {user.cardNumber} • NOIR ACCESS
                </span>
              </div>

              <div className="relative z-10 text-[10px] text-slate-300 space-y-1">
                <p>• Скидка на бар и кальян: <strong className="text-amber-300 font-mono">{user.discountBarKitchen}%</strong></p>
                <p>• Наценка при покупке фишек по б/н: <strong className="text-amber-300 font-mono">{user.cashlessFeeRate}%</strong></p>
                <p>• Карта действительна во всех клубах сети (SOHO, CITY, SECRET).</p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[9px] text-slate-400">
                <span>Персональная закрытая поддержка</span>
                <span className="font-mono text-amber-300">+7 (495) 777-09-09</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Scannable Reception Section (QR Code & Barcode) */}
      <div className={`p-6 rounded-2xl border transition-all text-center space-y-4 ${
        isMaxBrightness 
          ? 'bg-white text-black border-white shadow-2xl' 
          : 'velvet-card text-slate-100'
      }`}>
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-400">
            {lang === 'ru' ? 'Предъявите хостес на входе' : 'Present to Reception Hostess'}
          </div>
          <div className={`text-xs ${isMaxBrightness ? 'text-slate-700' : 'text-slate-400'}`}>
            Сканируйте для начисления визита, бонусов ВУ и применения клубной скидки
          </div>
        </div>

        {/* High Contrast Clean QR Box */}
        <div className="inline-block p-4 rounded-xl bg-white shadow-lg mx-auto">
          {/* Authentic SVG QR Code representation */}
          <svg viewBox="0 0 160 160" className="w-44 h-44 mx-auto text-black">
            {/* Corner position markers */}
            <rect x="10" y="10" width="40" height="40" rx="4" fill="currentColor" />
            <rect x="16" y="16" width="28" height="28" rx="2" fill="white" />
            <rect x="22" y="22" width="16" height="16" rx="2" fill="currentColor" />

            <rect x="110" y="10" width="40" height="40" rx="4" fill="currentColor" />
            <rect x="116" y="16" width="28" height="28" rx="2" fill="white" />
            <rect x="122" y="22" width="16" height="16" rx="2" fill="currentColor" />

            <rect x="10" y="110" width="40" height="40" rx="4" fill="currentColor" />
            <rect x="16" y="116" width="28" height="28" rx="2" fill="white" />
            <rect x="22" y="122" width="16" height="16" rx="2" fill="currentColor" />

            {/* Matrix dots pattern */}
            <rect x="60" y="14" width="8" height="8" fill="currentColor" />
            <rect x="76" y="14" width="8" height="8" fill="currentColor" />
            <rect x="92" y="14" width="8" height="8" fill="currentColor" />
            
            <rect x="60" y="30" width="8" height="8" fill="currentColor" />
            <rect x="76" y="38" width="16" height="8" fill="currentColor" />

            {/* Center crown emblem in QR */}
            <rect x="62" y="62" width="36" height="36" rx="4" fill="#120822" />
            <polygon points="68,88 74,74 80,82 86,74 92,88" fill="#d4af37" />

            {/* Bottom matrix patterns */}
            <rect x="60" y="110" width="8" height="8" fill="currentColor" />
            <rect x="76" y="110" width="16" height="8" fill="currentColor" />
            <rect x="100" y="110" width="8" height="16" fill="currentColor" />
            <rect x="116" y="90" width="8" height="8" fill="currentColor" />
            <rect x="132" y="80" width="16" height="8" fill="currentColor" />
            <rect x="116" y="126" width="24" height="8" fill="currentColor" />
            <rect x="60" y="134" width="16" height="8" fill="currentColor" />
            <rect x="84" y="134" width="8" height="16" fill="currentColor" />
          </svg>

          <div className="mt-2 text-center font-mono font-bold tracking-[0.2em] text-xs text-black">
            NOIR • {user.cardNumber}
          </div>
        </div>

        {/* Barcode line representation */}
        <div className="pt-2">
          <div className="flex justify-center items-end gap-[2px] h-8 max-w-[220px] mx-auto opacity-80">
            {[4,2,3,1,4,2,1,3,2,4,1,3,2,1,4,2,3,1,2,4,3,1,4,2,1,3,2,4,1,2,4,2].map((w, idx) => (
              <div 
                key={idx} 
                className={`bg-current ${idx % 2 === 0 ? 'h-8' : 'h-7'}`} 
                style={{ width: `${w * 1.5}px` }} 
              />
            ))}
          </div>
          <div className="text-[10px] font-mono tracking-widest mt-1 opacity-70">
            *{user.cardNumber}*
          </div>
        </div>
      </div>

      {/* Wallet Action Button */}
      <div className="space-y-3">
        <button
          onClick={() => setWalletAdded(true)}
          className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
            walletAdded
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-black text-white hover:bg-slate-900 border border-white/20 shadow-lg'
          }`}
        >
          {walletAdded ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ru' ? 'Карта добавлена в Wallet' : 'Added to Wallet'}</span>
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ru' ? 'Добавить в Apple Wallet / Google Pay' : 'Add to Apple Wallet / Google Pay'}</span>
            </>
          )}
        </button>

        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>VIP Консьерж и приватность</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Ваш номер карты защищен протоколом конфиденциальности сети. Номер не передается третьим лицам.
          </p>
        </div>
      </div>
    </div>
  );
};
