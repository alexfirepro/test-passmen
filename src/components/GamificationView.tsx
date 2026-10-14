import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Crown, 
  Gift, 
  Clock, 
  Check, 
  ChevronRight, 
  Trophy, 
  Wine, 
  Cigarette, 
  ArrowLeft,
  Coins
} from 'lucide-react';
import { ClubUser, NightQuest, WheelPrize } from '../types.ts';
import { WHEEL_PRIZES, NIGHT_QUESTS } from '../mockData.ts';

interface GamificationViewProps {
  user: ClubUser;
  onBack: () => void;
  onNavigateToBooking: () => void;
  onAddVU: (amount: number) => void;
  lang: 'ru' | 'en';
}

export const GamificationView: React.FC<GamificationViewProps> = ({
  user,
  onBack,
  onNavigateToBooking,
  onAddVU,
  lang,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<WheelPrize | null>(null);
  const [hasSpunToday, setHasSpunToday] = useState(false);
  const [quests, setQuests] = useState<NightQuest[]>(NIGHT_QUESTS);
  const [activeTab, setActiveTab] = useState<'wheel' | 'quests'>('wheel');

  const spinWheel = () => {
    if (isSpinning || hasSpunToday) return;

    setIsSpinning(true);
    setWonPrize(null);

    // Pick a winning prize
    const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const selectedPrize = WHEEL_PRIZES[prizeIndex];

    // Total rotations: 5 full turns (1800 deg) + prize angle
    const segmentAngle = 360 / WHEEL_PRIZES.length;
    // Align wheel so top marker lands on slice
    const targetAngle = 1800 + (360 - (prizeIndex * segmentAngle + segmentAngle / 2));
    
    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      setHasSpunToday(true);
      if (selectedPrize.type === 'vu') {
        const amount = selectedPrize.title.includes('1 500') ? 1500 : 750;
        onAddVU(amount);
      }
    }, 4200);
  };

  const handleClaimQuest = (questId: string, rewardVU: number) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, progress: q.target } : q))
    );
    onAddVU(rewardVU);
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
          NIGHTLIFE ENGINE
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
          <span>Квесты & Колесо Бонусов</span>
          <Flame className="w-5 h-5 text-amber-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Интерактивные механики с бонусами, сгорающими к утру — играйте и забирайте привилегии в клубе
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#140b24]/90 border border-amber-500/20 backdrop-blur-md">
        <button
          onClick={() => setActiveTab('wheel')}
          className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'wheel'
              ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Колесо Искушений</span>
        </button>

        <button
          onClick={() => setActiveTab('quests')}
          className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'quests'
              ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-rose-400" />
          <span>Ночные Квесты ({quests.length})</span>
        </button>
      </div>

      {activeTab === 'wheel' ? (
        /* ================= WHEEL OF SEDUCTION ================= */
        <div className="space-y-4">
          <div className="p-5 rounded-3xl velvet-card-gold text-center space-y-4 border border-amber-500/30 shadow-2xl relative overflow-hidden">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-semibold">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>Действует сегодня до 06:00 утра</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-serif font-bold text-amber-100">
                Колесо Соблазна • Royal Spin
              </h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Вращайте колесо каждый вечер перед выездом в клуб. Ваш персональный бонус ждет вас на баре или у столика.
              </p>
            </div>

            {/* The Wheel */}
            <div className="relative w-64 h-64 mx-auto my-2">
              {/* Pointer Marker */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2.5 z-20 w-0 h-0 border-x-8 border-x-transparent border-t-[18px] border-t-amber-400 drop-shadow-md" />

              {/* Outer Golden Ring */}
              <div className="w-full h-full rounded-full p-2 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-800 shadow-2xl shadow-amber-900/40">
                {/* Spinning Disc */}
                <div
                  className="w-full h-full rounded-full relative overflow-hidden transition-all ease-out"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transitionDuration: isSpinning ? '4.2s' : '0.5s',
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {WHEEL_PRIZES.map((prize, idx) => {
                      const angle = 360 / WHEEL_PRIZES.length;
                      const startAngle = idx * angle;
                      const endAngle = startAngle + angle;
                      const startRad = (startAngle * Math.PI) / 180;
                      const endRad = (endAngle * Math.PI) / 180;

                      const x1 = 50 + 50 * Math.cos(startRad);
                      const y1 = 50 + 50 * Math.sin(startRad);
                      const x2 = 50 + 50 * Math.cos(endRad);
                      const y2 = 50 + 50 * Math.sin(endRad);

                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                      const colors = [
                        '#1e1035',
                        '#2f1554',
                        '#1e1035',
                        '#391866',
                        '#1e1035',
                        '#2f1554',
                        '#1e1035',
                        '#391866',
                      ];

                      return (
                        <g key={prize.id}>
                          <path
                            d={pathData}
                            fill={colors[idx % colors.length]}
                            stroke="#d4af37"
                            strokeWidth="0.5"
                          />
                          <text
                            x="50"
                            y="20"
                            transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                            fill="#fce085"
                            fontSize="4.2"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="sans-serif"
                          >
                            {prize.title.slice(0, 12)}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Center Crown Hub */}
                  <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-[2px] shadow-lg flex items-center justify-center">
                    <div className="w-full h-full bg-[#0d0718] rounded-full flex items-center justify-center">
                      <Crown className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spin CTA Button */}
            <div className="pt-2">
              <button
                onClick={spinWheel}
                disabled={isSpinning || hasSpunToday}
                className={`w-full py-3.5 px-6 rounded-2xl text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2 ${
                  hasSpunToday
                    ? 'bg-white/10 text-slate-400 cursor-not-allowed'
                    : isSpinning
                    ? 'bg-amber-600 text-black cursor-wait animate-pulse'
                    : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black active:scale-[0.98]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>
                  {hasSpunToday
                    ? 'Спин использован сегодня'
                    : isSpinning
                    ? 'Судьба решает...'
                    : 'Крутить Колесо Искушений (Бесплатно)'}
                </span>
              </button>
            </div>
          </div>

          {/* Won Prize Modal / Card */}
          {wonPrize && (
            <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/80 via-purple-950/80 to-black border-2 border-amber-400 text-center space-y-3 shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400 mx-auto flex items-center justify-center">
                <Gift className="w-6 h-6 text-amber-300" />
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                  ВАШ ВЫИГРЫШ СЕГОДНЯ
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-200 mt-0.5">
                  {wonPrize.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {wonPrize.subtitle}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Сгорает в 06:00 утра</span>
                </span>
                <span className="font-mono text-purple-300 font-semibold">
                  Код: #SPIN-{wonPrize.id}41
                </span>
              </div>

              <button
                onClick={onNavigateToBooking}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Забронировать стол и активировать бонус</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ================= NIGHTCLUB QUESTS ================= */
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Выполняйте ночные миссии клуба, получайте валюту удовольствия и эксклюзивные артефакты!
            </span>
          </div>

          {quests.map((quest) => {
            const isCompleted = quest.progress >= quest.target;

            return (
              <div
                key={quest.id}
                className={`p-4 rounded-2xl transition-all space-y-3 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40'
                    : quest.urgentTonight
                    ? 'bg-gradient-to-r from-rose-950/30 to-purple-950/40 border border-rose-500/30'
                    : 'velvet-card'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-100">
                        {quest.title}
                      </span>
                      {quest.urgentTonight && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-medium">
                          Срочно
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {quest.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-xs font-mono font-bold text-amber-300">
                      +{quest.rewardVU} ВУ
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Прогресс</span>
                    <span className="font-mono">
                      {quest.progress} / {quest.target}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{
                        width: `${Math.min(100, (quest.progress / quest.target) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-slate-500">
                    ⏳ {quest.deadlineLabel}
                  </span>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      <span>Выполнено</span>
                    </span>
                  ) : quest.progress === quest.target ? (
                    <button
                      onClick={() => handleClaimQuest(quest.id, quest.rewardVU)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-bold text-xs"
                    >
                      Забрать +{quest.rewardVU} ВУ
                    </button>
                  ) : (
                    <button
                      onClick={onNavigateToBooking}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                    >
                      <span>{quest.actionText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Secret Crazy Menu Teaser */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-amber-950/30 to-black border border-purple-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Секретное Crazy Menu</span>
          </div>
          <span className="text-[10px] text-purple-300 font-mono">Доступно в клубе</span>
        </div>
        <p className="text-xs text-slate-400">
          Специальные постановочные сценарии вечера, дуэты солисток, индивидуальные дегустации сигар и приватные перформансы. Спрашивайте у арт-директора в клубе.
        </p>
      </div>
    </div>
  );
};
