import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  Users, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  CreditCard, 
  Crown,
  ChevronRight,
  Wine,
  Cigarette,
  Flame,
  ArrowLeft,
  QrCode
} from 'lucide-react';
import { ClubUser, ClubVenue, TableZone } from '../types.ts';
import { CLUB_VENUES, TABLE_ZONES } from '../mockData.ts';

interface BookingViewProps {
  user: ClubUser;
  onBack: () => void;
  lang: 'ru' | 'en';
}

export const BookingView: React.FC<BookingViewProps> = ({
  user,
  onBack,
  lang,
}) => {
  const [selectedClubId, setSelectedClubId] = useState<string>(CLUB_VENUES[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('today');
  const [selectedTime, setSelectedTime] = useState<string>('23:00');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('stage_front');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [addChampagne, setAddChampagne] = useState<boolean>(false);
  const [addHookah, setAddHookah] = useState<boolean>(false);
  const [specialWish, setSpecialWish] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const currentClub = CLUB_VENUES.find((c) => c.id === selectedClubId) || CLUB_VENUES[0];
  const currentZone = TABLE_ZONES.find((z) => z.id === selectedZoneId) || TABLE_ZONES[0];

  // Pricing calculations
  const rawDeposit = currentZone.depositPerPerson * guestsCount;
  const extrasCost = (addChampagne ? 14000 : 0) + (addHookah ? 3500 : 0);
  const discountAmount = Math.round((rawDeposit * user.discountBarKitchen) / 100);
  const totalDeposit = Math.max(0, rawDeposit - discountAmount + extrasCost);
  const bonusVUEarned = Math.round(totalDeposit * (user.cashbackPercent > 0 ? user.cashbackPercent / 100 : 0.05));

  const datesList = [
    { id: 'today', label: 'Сегодня', sub: '14 окт, ср' },
    { id: 'tomorrow', label: 'Завтра', sub: '15 окт, чт' },
    { id: 'friday', label: 'Пятница', sub: '16 окт, пт' },
    { id: 'saturday', label: 'Суббота', sub: '17 окт, сб' },
  ];

  const timesList = ['21:30', '22:30', '23:00', '23:30', '00:30', '01:30', '02:30'];

  if (bookingConfirmed) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6 pb-24 text-center">
        <div className="p-6 rounded-3xl velvet-card-gold space-y-5 border border-amber-500/40 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center">
            <Check className="w-8 h-8 text-amber-300" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
              БРОНИРОВАНИЕ ПОДТВЕРЖДЕНО
            </div>
            <h2 className="text-xl font-serif font-bold text-amber-100">
              Ждем вас в {currentClub.name}
            </h2>
            <div className="text-xs text-slate-400">
              Ваш персональный менеджер столика уже уведомлен
            </div>
          </div>

          {/* Booking Pass Card */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-left space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-slate-400">Код бронирования:</span>
              <span className="font-mono font-bold text-amber-300 text-sm">
                #RN-78401
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Дата и время:</span>
              <span className="text-slate-200 font-semibold">
                {datesList.find(d => d.id === selectedDate)?.sub}, {selectedTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Локация / Зона:</span>
              <span className="text-slate-200 font-semibold">{currentZone.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Гостей:</span>
              <span className="text-slate-200">{guestsCount} персоны</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/10">
              <span className="text-slate-400">Депозит к оплате на месте:</span>
              <span className="font-mono font-bold text-amber-400 text-sm">
                {totalDeposit.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>

          {/* QR Pass */}
          <div className="p-3 bg-white rounded-xl inline-block mx-auto shadow-md">
            <QrCode className="w-28 h-28 text-black" />
            <div className="text-[10px] font-mono text-black font-bold tracking-widest mt-1">
              RN-78401
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
            ✨ Вам будет начислено <strong>+{bonusVUEarned} ВУ</strong> после закрытия столика!
          </div>

          <button
            onClick={() => setBookingConfirmed(false)}
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-all"
          >
            Вернуться в меню бронирования
          </button>
        </div>
      </div>
    );
  }

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
        <span className="text-xs uppercase font-mono tracking-widest text-amber-400/80">
          ONLINE RESERVATION
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
          <span>Бронирование столика</span>
          <Crown className="w-5 h-5 text-amber-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Гарантированное размещение, персональная подача и лучшие места у сцены
        </p>
      </div>

      {/* Step 1: Select Club Venue */}
      <div className="space-y-2">
        <label className="text-xs uppercase font-mono tracking-wider text-slate-400">
          1. Выберите клуб сети
        </label>
        <div className="grid grid-cols-1 gap-2">
          {CLUB_VENUES.map((club) => (
            <button
              key={club.id}
              onClick={() => setSelectedClubId(club.id)}
              className={`p-3.5 rounded-2xl text-left transition-all ${
                selectedClubId === club.id
                  ? 'bg-gradient-to-r from-amber-950/60 to-purple-950/50 border border-amber-400/60 shadow-lg'
                  : 'velvet-card hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-serif font-bold text-amber-200">
                    {club.name}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{club.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                    ★ {club.rating}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-purple-300/90 font-medium">
                🎭 {club.activeShowTonight}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Date & Time */}
      <div className="space-y-2">
        <label className="text-xs uppercase font-mono tracking-wider text-slate-400">
          2. Дата визита
        </label>
        <div className="grid grid-cols-4 gap-2">
          {datesList.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDate(d.id)}
              className={`p-2.5 rounded-xl text-center transition-all ${
                selectedDate === d.id
                  ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <div className="text-xs">{d.label}</div>
              <div className="text-[10px] opacity-80 mt-0.5">{d.sub.split(',')[0]}</div>
            </button>
          ))}
        </div>

        <div className="pt-2">
          <label className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-1.5">
            Время прибытия
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {timesList.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  selectedTime === time
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 3: Zone Selection */}
      <div className="space-y-2">
        <label className="text-xs uppercase font-mono tracking-wider text-slate-400">
          3. Зона и категория стола
        </label>
        <div className="space-y-2">
          {TABLE_ZONES.map((zone) => (
            <div
              key={zone.id}
              onClick={() => setSelectedZoneId(zone.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all ${
                selectedZoneId === zone.id
                  ? 'bg-gradient-to-r from-amber-950/70 via-purple-950/60 to-black border border-amber-400/60 shadow-xl'
                  : 'velvet-card hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-100">
                      {zone.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      {zone.tag}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {zone.description}
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <div className="text-xs font-mono font-bold text-amber-300">
                    {zone.depositPerPerson.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="text-[10px] text-slate-500">депозит/чел</div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-slate-400" />
                  {zone.capacity}
                </span>
                <span className="text-amber-400/90">{zone.viewAngle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 4: Number of guests */}
      <div className="p-4 rounded-2xl velvet-card flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-200">Количество гостей</div>
          <div className="text-[11px] text-slate-400">Включая вас</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-sm"
          >
            -
          </button>
          <span className="font-mono font-bold text-base text-amber-300 w-4 text-center">
            {guestsCount}
          </span>
          <button
            onClick={() => setGuestsCount(Math.min(10, guestsCount + 1))}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Optional Pre-Orders to increase basket */}
      <div className="p-4 rounded-2xl velvet-card space-y-3">
        <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Предзаказ к подаче к столу (по желанию):</span>
        </div>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={addChampagne}
              onChange={(e) => setAddChampagne(e.target.checked)}
              className="accent-amber-500 w-4 h-4 rounded"
            />
            <div className="text-xs">
              <div className="text-slate-200 font-medium">Шампанское Moët & Chandon Brut</div>
              <div className="text-[10px] text-slate-400">Подача во льду сразу к вашему приходу</div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300">+14 000 ₽</span>
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={addHookah}
              onChange={(e) => setAddHookah(e.target.checked)}
              className="accent-amber-500 w-4 h-4 rounded"
            />
            <div className="text-xs">
              <div className="text-slate-200 font-medium">Премиальный кальян от шеф-мастера</div>
              <div className="text-[10px] text-slate-400">Чаша на ананасе с охлаждающей трубкой</div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300">+3 500 ₽</span>
        </label>
      </div>

      {/* Deposit Summary & Confirmation CTA */}
      <div className="p-5 rounded-2xl velvet-card-gold space-y-4">
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Базовый депозит ({guestsCount} чел.):</span>
            <span className="font-mono text-slate-200">{rawDeposit.toLocaleString('ru-RU')} ₽</span>
          </div>

          {user.discountBarKitchen > 0 && (
            <div className="flex justify-between text-emerald-400">
              <span>Скидка вашей карты ({user.discountBarKitchen}%):</span>
              <span className="font-mono">-{discountAmount.toLocaleString('ru-RU')} ₽</span>
            </div>
          )}

          {extrasCost > 0 && (
            <div className="flex justify-between text-purple-300">
              <span>Предзаказ бара/кальяна:</span>
              <span className="font-mono">+{extrasCost.toLocaleString('ru-RU')} ₽</span>
            </div>
          )}

          <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
            <span className="text-sm font-semibold text-amber-200">Депозит стола:</span>
            <span className="text-xl font-mono font-bold text-amber-300">
              {totalDeposit.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            * Депозит полностью расходуется на меню кухни, барную карту, кальяны и сигары в клубе.
          </div>
        </div>

        <button
          onClick={() => setBookingConfirmed(true)}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Crown className="w-4 h-4 text-black" />
          <span>Подтвердить бронирование столика</span>
        </button>
      </div>
    </div>
  );
};
