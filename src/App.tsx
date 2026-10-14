import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { DrawerMenu } from './components/DrawerMenu.tsx';
import { ProfileView } from './components/ProfileView.tsx';
import { VirtualCardView } from './components/VirtualCardView.tsx';
import { BookingView } from './components/BookingView.tsx';
import { GamificationView } from './components/GamificationView.tsx';
import { PrivilegesView } from './components/PrivilegesView.tsx';
import { ClubsView } from './components/ClubsView.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import { FeedbackModal } from './components/FeedbackModal.tsx';
import { PromoModal } from './components/PromoModal.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { ClubUser } from './types.ts';
import { INITIAL_USER, DEMO_PRESETS } from './mockData.ts';

export default function App() {
  const [user, setUser] = useState<ClubUser>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [isPromoOpen, setIsPromoOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectLevelDemo = (presetKey: 'novice' | 'regular' | 'vip') => {
    const selected = DEMO_PRESETS[presetKey];
    if (selected) {
      setUser(selected);
      showToast(`Статус переключен: ${selected.level} (${selected.cardType})`);
    }
  };

  const handleAddVU = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      pleasureCurrencyBalance: prev.pleasureCurrencyBalance + amount,
    }));
    showToast(`Вам начислено +${amount} ВУ!`);
  };

  const handleDeductVU = (amount: number): boolean => {
    if (user.pleasureCurrencyBalance < amount) return false;
    setUser((prev) => ({
      ...prev,
      pleasureCurrencyBalance: prev.pleasureCurrencyBalance - amount,
      dailySpentVU: prev.dailySpentVU + amount,
    }));
    showToast(`Списано ${amount} ВУ. Ваучер активирован!`);
    return true;
  };

  const handleLogout = () => {
    setUser(INITIAL_USER);
    setActiveTab('profile');
    showToast('Вы вышли из сессии. Вход в демо-режиме обновлен.');
  };

  return (
    <div className="min-h-screen bg-[#07040d] text-slate-100 flex flex-col relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient background glows for luxury nightclub atmosphere */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-96 bg-gradient-to-b from-purple-900/20 via-amber-900/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-rose-900/10 blur-3xl pointer-events-none -z-10" />

      {/* Main Header */}
      <Header
        user={user}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenCard={() => setActiveTab('card')}
        onSelectTab={(tab) => setActiveTab(tab)}
        lang={lang}
      />

      {/* Drawer Menu (Screenshot 1 enhanced) */}
      <DrawerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        onOpenCard={() => setActiveTab('card')}
        lang={lang}
        onToggleLang={() => setLang(lang === 'ru' ? 'en' : 'ru')}
        user={user}
        onLogout={handleLogout}
      />

      {/* Content Area */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-4 pb-20">
        {activeTab === 'profile' && (
          <ProfileView
            user={user}
            onOpenCard={() => setActiveTab('card')}
            onOpenPromo={() => setIsPromoOpen(true)}
            onOpenFeedback={() => setIsFeedbackOpen(true)}
            onSelectTab={(tab) => setActiveTab(tab)}
            onSelectLevelDemo={handleSelectLevelDemo}
            lang={lang}
            onLogout={handleLogout}
          />
        )}

        {activeTab === 'card' && (
          <VirtualCardView
            user={user}
            onBack={() => setActiveTab('profile')}
            lang={lang}
          />
        )}

        {activeTab === 'booking' && (
          <BookingView
            user={user}
            onBack={() => setActiveTab('profile')}
            lang={lang}
          />
        )}

        {activeTab === 'games' && (
          <GamificationView
            user={user}
            onBack={() => setActiveTab('profile')}
            onNavigateToBooking={() => setActiveTab('booking')}
            onAddVU={handleAddVU}
            lang={lang}
          />
        )}

        {activeTab === 'privileges' && (
          <PrivilegesView
            user={user}
            onBack={() => setActiveTab('profile')}
            onDeductVU={handleDeductVU}
            lang={lang}
          />
        )}

        {activeTab === 'clubs' && (
          <ClubsView
            onBack={() => setActiveTab('profile')}
            onBookClub={(clubId) => {
              setActiveTab('booking');
            }}
            lang={lang}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            user={user}
            onUpdateUser={(updated) => {
              setUser((prev) => ({ ...prev, ...updated }));
              showToast('Профиль успешно обновлен');
            }}
            onBack={() => setActiveTab('profile')}
            lang={lang}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        lang={lang}
      />

      {/* Feedback to Director Modal (Screenshots 1 & 2) */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        lang={lang}
      />

      {/* Promo Codes Modal (Screenshot 2) */}
      <PromoModal
        isOpen={isPromoOpen}
        onClose={() => setIsPromoOpen(false)}
        onAddBonusVU={handleAddVU}
        lang={lang}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-amber-400 text-black font-semibold text-xs shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
