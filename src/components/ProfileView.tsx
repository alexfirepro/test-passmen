import React from 'react';
import { 
  CreditCard, 
  Tag, 
  Coins, 
  CalendarDays, 
  Award, 
  ChevronRight, 
  Sparkles, 
  Info, 
  Flame, 
  Crown,
  MapPin,
  MessageSquareText,
  LogOut,
  TrendingUp,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { ClubUser, UserLevel } from '../types.ts';
import { LEVEL_TIERS } from '../mockData.ts';

interface ProfileViewProps {
  user: ClubUser;
  onOpenCard: () => void;
  onOpenPromo: () => void;
  onOpenFeedback: () => void;
  onSelectTab: (tab: string) => void;
  onSelectLevelDemo: (level: 'novice' | 'regular' | 'vip') => void;
  lang: 'ru' | 'en';
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onOpenCard,
  onOpenPromo,
  onOpenFeedback,
  onSelectTab,
  onSelectLevelDemo,
  lang,
  onLogout,
}) => {
  const currentTier = LEVEL_TIERS[user.level] || LEVEL_TIERS['XS'];
  const allLevels: UserLevel[] = ['XS', 'S', 'M', 'L', 'XL', 'ROYAL VIP'];
  const currentLevelIndex = allLevels.indexOf(user.level);

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-24">
      {/* Top Segmented Controls: "Профиль" | "Ваша карта" (Matches Screenshot 2 header) */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#140b24]/90 border border-amber-500/20 backdrop-blur-md">
        <button
          className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/40 text-amber-200 shadow-md flex items-center justify-center gap-2"
        >
          <CreditCard className="w-4 h-4 text-amber-400" />
          <span>{lang === 'ru' ? 'Профиль' : 'Profile'}</span>
        </button>
        <button
          onClick={onOpenCard}
          className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-amber-200 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{lang === 'ru' ? 'Ваша карта' : 'Your Card'}</span>
        </button>
      </div>

      {/* Demo Tier Switcher (Convenient for reviewing how UI changes with level) */}
      <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-between">
        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Тест уровней:</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onSelectLevelDemo('novice')}
            className={`px-2 py-1 text-[10px] rounded-lg transition-all ${
              user.level === 'XS'
                ? 'bg-amber-500 text-black font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            XS (Новичок)
          </button>
          <button
            onClick={() => onSelectLevelDemo('regular')}
            className={`px-2 py-1 text-[10px] rounded-lg transition-all ${
              user.level === 'M'
                ? 'bg-amber-500 text-black font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            M (Регулярный)
          </button>
          <button
            onClick={() => onSelectLevelDemo('vip')}
            className={`px-2 py-1 text-[10px] rounded-lg transition-all ${
              user.level === 'ROYAL VIP'
                ? 'bg-amber-500 text-black font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            ROYAL VIP
          </button>
        </div>
      </div>

      {/* Callout: Drive attendance tonight */}
      <div 
        onClick={() => onSelectTab('booking')}
        className="cursor-pointer p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/50 to-amber-950/40 border border-rose-500/30 hover:border-rose-400/50 transition-all shadow-lg flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-semibold text-rose-200">
              Сегодня в клубах сети: «Mysterium Noir»
            </div>
            <div className="text-[11px] text-slate-400">
              Забронируйте столик со скидкой карты и удвойте ВУ
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
      </div>

      {/* Button: "Мои промо-коды" (Matches Screenshot 2) */}
      <button
        onClick={onOpenPromo}
        className="w-full p-4 rounded-2xl velvet-card hover:border-amber-500/40 transition-all flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:text-amber-300 transition-colors">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-100">
              {lang === 'ru' ? 'Мои промо-коды' : 'My Promo Codes'}
            </div>
            <div className="text-[11px] text-slate-400">
              {user.activeCouponsCount} активных бонуса на визит
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center justify-center">
            {user.activeCouponsCount}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </div>
      </button>

      {/* Section: "Информация о карте" (Elevated from Screenshot 2) */}
      <div className="p-5 rounded-2xl velvet-card-gold space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-200 font-serif">
              Информация о карте
            </span>
          </div>
          <button
            onClick={onOpenCard}
            className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Показать QR</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">Номер</div>
            <div className="text-sm font-mono font-bold text-slate-100 mt-0.5">
              {user.cardNumber}
            </div>
          </div>

          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">Тип</div>
            <div className="text-sm font-serif font-bold text-amber-300 mt-0.5">
              {user.cardType}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
          <div className="flex items-center justify-between py-1">
            <span className="text-slate-300">
              Скидка на барное, ресторанное, кальянное меню:
            </span>
            <span className="font-mono font-bold text-amber-300 text-sm tabular-nums">
              {user.discountBarKitchen} %
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-300">
              Наценка при покупке фишек по б/н:
            </span>
            <span className="font-mono font-bold text-purple-300 text-sm tabular-nums">
              {user.cashlessFeeRate} %
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row: Average check & Max spend (Screenshot 2) */}
      <div className="p-4 rounded-2xl velvet-card space-y-3">
        <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
          <span className="text-slate-400">Ваш средний чек</span>
          <span className="font-mono font-bold text-slate-100 text-sm tabular-nums">
            {user.averageCheck.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
          <span className="text-slate-400">Самое большое кол-во трат за одно посещение</span>
          <span className="font-mono font-bold text-slate-100 text-sm tabular-nums">
            {user.maxSpendVisit.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        <div className="flex items-center justify-between text-xs py-1">
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300 font-medium">Количество посещений</span>
          </div>
          <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs flex items-center justify-center tabular-nums">
            {user.visitsCount}
          </span>
        </div>
      </div>

      {/* Level Card: "Ваш уровень: XS" + Cashback (Screenshot 2 elevated) */}
      <div className="p-5 rounded-2xl velvet-card space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              Ваш уровень
            </div>
            <div className="text-xl font-serif font-bold text-amber-300 mt-0.5 flex items-center gap-2">
              <span>{user.level}</span>
              <span className="text-xs font-sans font-normal text-slate-400">
                — {currentTier.title}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
              Кэшбэк с шоу и ресторана
            </div>
            <div className="text-xl font-mono font-bold text-amber-400 mt-0.5 tabular-nums">
              {user.cashbackPercent.toFixed(1)} %
            </div>
          </div>
        </div>

        {/* Level Progression Stepper */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            {allLevels.map((lvl, idx) => (
              <span
                key={lvl}
                className={
                  idx <= currentLevelIndex
                    ? 'text-amber-300 font-bold'
                    : 'text-slate-600'
                }
              >
                {lvl}
              </span>
            ))}
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(8, ((currentLevelIndex + 1) / allLevels.length) * 100)}%`,
              }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>
              {currentLevelIndex < allLevels.length - 1
                ? `Следующий: ${allLevels[currentLevelIndex + 1]} (+${LEVEL_TIERS[allLevels[currentLevelIndex + 1]].cashback}% кэшбэк)`
                : 'Максимальный статус достигнут'}
            </span>
          </div>
        </div>

        {/* Level Perks list */}
        <div className="pt-2 border-t border-white/5 space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-300">
            Привилегии вашего уровня:
          </div>
          {currentTier.perks.map((perk, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pleasure Currency (ВУ): "Ваш баланс валюты удовольствия" (Screenshot 2) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/70 via-[#180a2b] to-[#110521] border border-purple-500/30 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-purple-300/80 uppercase tracking-wider font-medium">
              Ваш баланс валюты удовольствия
            </div>
            <div className="text-3xl font-mono font-bold text-amber-300 mt-1 flex items-baseline gap-2">
              <span className="tabular-nums">{user.pleasureCurrencyBalance.toLocaleString('ru-RU')}</span>
              <span className="text-sm font-sans font-medium text-purple-300">ВУ</span>
            </div>
          </div>
          <button
            onClick={() => onSelectTab('privileges')}
            className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/40 text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <span>Что я могу получить?</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-200/80">
          <span>Лимит трат ВУ за сутки:</span>
          <span className="font-mono font-bold text-amber-300 tabular-nums">
            {user.dailySpentVU} / {user.dailySpendLimitVU.toLocaleString('ru-RU')} ВУ
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-black/30 border border-purple-500/20 text-[11px] text-purple-300/70">
          💡 1 ВУ = 1 ₽. Накопленные баллы можно обменять на приватный танец, элитные напитки или VIP-комнату.
        </div>
      </div>

      {/* Quick Club Addresses Link (Screenshot 2) */}
      <button
        onClick={() => onSelectTab('clubs')}
        className="w-full p-4 rounded-2xl velvet-card hover:border-amber-500/40 transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">
              Адреса клубов & Расписание шоу
            </div>
            <div className="text-[11px] text-slate-400">
              3 премиальных клуба сети в Москве
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
      </button>

      {/* Artifacts (Screenshot 2: Артефакты за посещения / Артефакты за траты) */}
      <div className="p-4 rounded-2xl velvet-card space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Клубные артефакты и трофеи</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-white/5 text-xs">
          <div className="flex items-center gap-2.5">
            <Tag className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-300">Артефакты за посещения</span>
          </div>
          <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs flex items-center justify-center tabular-nums">
            {user.artifactsVisitsCount}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-2.5">
            <Tag className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-300">Артефакты за траты</span>
          </div>
          <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs flex items-center justify-center tabular-nums">
            {user.artifactsSpendCount}
          </span>
        </div>

        {user.artifactsList.length > 0 && (
          <div className="pt-2">
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-xs">
                <div className="font-semibold text-amber-200">{user.artifactsList[0].title}</div>
                <div className="text-[11px] text-slate-400">{user.artifactsList[0].description}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Explanatory rules block (Word-for-word from Screenshot 2) */}
      <div className="p-4 rounded-2xl bg-[#130922]/80 border border-purple-900/30 text-xs text-slate-300 space-y-2.5 leading-relaxed">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <p>
            Ваш Уровень среднего чека и количество ВУ рассчитываются на следующий день после вашего визита.
          </p>
        </div>
        <p className="text-slate-400 text-[11px] pl-6">
          Все ваши траты и посещения для расчета бонусов берутся из базы за последние 1800 дней.
        </p>
        <p className="text-slate-400 text-[11px] pl-6">
          Все, что выходит за рамки 1800 дней, не засчитывается в статистику, но остается в архиве.
        </p>
      </div>

      {/* Direct Feedback to General Manager link (Screenshot 2) */}
      <div className="text-center py-2">
        <span className="text-xs text-slate-400">Есть замечания? </span>
        <button
          onClick={onOpenFeedback}
          className="text-xs text-amber-300 font-semibold underline hover:text-amber-200 transition-colors"
        >
          Оставьте отзыв директору.
        </button>
      </div>

      {/* Logout button (Screenshot 2) */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-900/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Выйти</span>
        </button>
      </div>
    </div>
  );
};
