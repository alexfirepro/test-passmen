import React from 'react';
import { CreditCard, QrCode, CalendarDays, Flame, Gift } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  lang: 'ru' | 'en';
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  lang,
}) => {
  const tabs = [
    {
      id: 'profile',
      label: lang === 'ru' ? 'Кабинет' : 'Profile',
      icon: CreditCard,
    },
    {
      id: 'card',
      label: lang === 'ru' ? 'Карта' : 'VIP Card',
      icon: QrCode,
    },
    {
      id: 'booking',
      label: lang === 'ru' ? 'Бронь стола' : 'Booking',
      icon: CalendarDays,
      highlight: true,
    },
    {
      id: 'games',
      label: lang === 'ru' ? 'Квесты' : 'Quests',
      icon: Flame,
    },
    {
      id: 'privileges',
      label: lang === 'ru' ? 'За ВУ' : 'Perks',
      icon: Gift,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0614]/95 backdrop-blur-lg border-t border-amber-500/20 max-w-lg mx-auto">
      <div className="grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 transition-all relative ${
                isActive
                  ? 'text-amber-300 scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.highlight && !isActive && (
                <span className="absolute top-1.5 right-4 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 shadow-sm shadow-amber-500/20'
                    : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${tab.highlight && isActive ? 'text-rose-400' : ''}`} />
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 truncate max-w-[58px] ${
                  isActive ? 'text-amber-200 font-semibold' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
