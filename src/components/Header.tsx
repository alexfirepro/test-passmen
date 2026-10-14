import React from 'react';
import { Menu, Crown, Sparkles, QrCode } from 'lucide-react';
import { ClubUser } from '../types.ts';

interface HeaderProps {
  user: ClubUser;
  onOpenMenu: () => void;
  onOpenCard: () => void;
  onSelectTab: (tab: string) => void;
  lang: 'ru' | 'en';
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenMenu,
  onOpenCard,
  onSelectTab,
  lang,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0a0713]/90 backdrop-blur-md border-b border-amber-500/20 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left: Brand Monogram & Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMenu}
            aria-label="Открыть меню"
            className="p-2 -ml-2 rounded-xl text-amber-200 hover:text-amber-100 hover:bg-white/5 active:scale-95 transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className="text-left flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-[1px] flex items-center justify-center shadow-lg shadow-amber-900/30">
              <div className="w-full h-full bg-[#0d091a] rounded-[7px] flex items-center justify-center">
                <Crown className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="text-xs font-serif tracking-[0.2em] uppercase font-bold text-amber-200 group-hover:text-amber-100 transition-colors">
                ROYAL NOIR
              </div>
              <div className="text-[10px] text-slate-400 tracking-wider">
                GENTLEMEN'S CLUB
              </div>
            </div>
          </button>
        </div>

        {/* Right: Currency Balance & Card QR */}
        <div className="flex items-center gap-2">
          {/* Pleasure Currency (ВУ) Quick Pill */}
          <button
            onClick={() => onSelectTab('privileges')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 hover:border-amber-500/50 hover:bg-purple-900/60 transition-all text-xs"
            title="Баланс Валюты Удовольствия"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-mono font-semibold text-amber-300 tabular-nums">
              {user.pleasureCurrencyBalance.toLocaleString('ru-RU')}
            </span>
            <span className="text-[10px] text-purple-300 font-medium">ВУ</span>
          </button>

          {/* Quick Card button */}
          <button
            onClick={onOpenCard}
            aria-label="Показать карту"
            className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all"
            title="Показать клубную карту"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
