import React from 'react';
import { 
  X, 
  Home, 
  UserCog, 
  QrCode, 
  Gift, 
  MapPin, 
  MessageSquareText, 
  Languages, 
  Sparkles, 
  CalendarDays, 
  Compass, 
  Crown,
  ChevronRight,
  LogOut,
  Flame
} from 'lucide-react';
import { ClubUser } from '../types.ts';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenFeedback: () => void;
  onOpenCard: () => void;
  lang: 'ru' | 'en';
  onToggleLang: () => void;
  user: ClubUser;
  onLogout: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  onOpenFeedback,
  onOpenCard,
  lang,
  onToggleLang,
  user,
  onLogout,
}) => {
  if (!isOpen) return null;

  const handleNav = (tabId: string) => {
    onSelectTab(tabId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs h-full bg-gradient-to-b from-[#140b24] via-[#0d0718] to-[#08040f] border-r border-amber-500/20 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div>
          {/* Header of Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-[1px] shadow-lg shadow-amber-900/40">
                <div className="w-full h-full bg-[#0d091a] rounded-[11px] flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="text-sm font-serif font-bold tracking-widest text-amber-200">
                  ROYAL NOIR
                </div>
                <div className="text-[10px] text-amber-400/80 tracking-widest font-mono">
                  VIP MEMBER #{user.cardNumber}
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick User Status Mini Card */}
          <div className="my-5 p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-amber-950/40 border border-amber-500/20 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Ваш уровень</div>
              <div className="text-base font-serif font-bold text-amber-300 flex items-center gap-1.5">
                <span>{user.level}</span>
                <span className="text-xs font-sans font-normal text-slate-300">({user.cardType})</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Баланс ВУ</div>
              <div className="text-base font-mono font-bold text-amber-400">
                {user.pleasureCurrencyBalance} <span className="text-xs font-sans text-purple-300">ВУ</span>
              </div>
            </div>
          </div>

          {/* Menu Items matching user's screenshot with high luxury touches */}
          <nav className="space-y-1">
            <button
              onClick={() => handleNav('profile')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 text-amber-400" />
                <span>{lang === 'ru' ? 'Главная' : 'Home'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => {
                onOpenCard();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>{lang === 'ru' ? 'Ваша карта' : 'Your Card'}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                QR
              </span>
            </button>

            <button
              onClick={() => handleNav('booking')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                activeTab === 'booking'
                  ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarDays className="w-4 h-4 text-rose-400" />
                <span className="text-rose-200 font-semibold">{lang === 'ru' ? 'Бронирование стола' : 'Table Booking'}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 uppercase tracking-wider">
                Online
              </span>
            </button>

            <button
              onClick={() => handleNav('games')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                activeTab === 'games'
                  ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-amber-200">{lang === 'ru' ? 'Колесо бонусов & Квесты' : 'Bonus Wheel & Quests'}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                Спин
              </span>
            </button>

            <button
              onClick={() => handleNav('privileges')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                activeTab === 'privileges'
                  ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-purple-400" />
                <span>{lang === 'ru' ? 'Что я могу получить за ВУ' : 'Redeem Pleasure Currency'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => handleNav('clubs')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                activeTab === 'clubs'
                  ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{lang === 'ru' ? 'Адреса клубов & Афиша' : 'Club Locations & Schedule'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => handleNav('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCog className="w-4 h-4 text-slate-400" />
                <span>{lang === 'ru' ? 'Настройки профиля' : 'Profile Settings'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <div className="pt-2 pb-1 border-t border-white/10 my-2"></div>

            <button
              onClick={() => {
                onOpenFeedback();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-medium text-amber-300 hover:bg-amber-500/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <MessageSquareText className="w-4 h-4 text-amber-400" />
                <span>{lang === 'ru' ? 'Оставить отзыв директору' : 'Message General Manager'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-500/60" />
            </button>

            <button
              onClick={onToggleLang}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-medium text-slate-300 hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <Languages className="w-4 h-4 text-slate-400" />
                <span>{lang === 'ru' ? 'English (Switch)' : 'Русский язык'}</span>
              </div>
              <span className="text-xs uppercase text-slate-400 font-mono">
                {lang === 'ru' ? 'EN' : 'RU'}
              </span>
            </button>
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 hover:text-purple-100 text-xs font-medium border border-purple-800/30 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'Выйти из кабинета' : 'Log out'}</span>
          </button>
          <div className="text-[10px] text-center text-slate-600 mt-3 font-mono">
            ROYAL NOIR APPMINIA v2.4 • 2026
          </div>
        </div>
      </div>
    </div>
  );
};
