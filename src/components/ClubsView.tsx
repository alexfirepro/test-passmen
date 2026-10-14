import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Crown, 
  Sparkles, 
  Music, 
  ArrowLeft, 
  Navigation, 
  CalendarDays,
  Flame,
  ChevronRight
} from 'lucide-react';
import { CLUB_VENUES, TONIGHT_DANCERS } from '../mockData.ts';

interface ClubsViewProps {
  onBack: () => void;
  onBookClub: (clubId: string) => void;
  lang: 'ru' | 'en';
}

export const ClubsView: React.FC<ClubsViewProps> = ({
  onBack,
  onBookClub,
  lang,
}) => {
  const [selectedClubId, setSelectedClubId] = useState<string>('soho');

  const dancersForSelected = TONIGHT_DANCERS.filter(
    (d) => d.clubId === selectedClubId
  );

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
          VENUES & STAGES
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
          <span>Сеть клубов & Афиша</span>
          <Crown className="w-5 h-5 text-amber-400" />
        </h1>
        <p className="text-xs text-slate-400">
          3 эксклюзивные локации в Москве, авторские шоу-программы и звездный состав артисток
        </p>
      </div>

      {/* Club Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CLUB_VENUES.map((club) => (
          <button
            key={club.id}
            onClick={() => setSelectedClubId(club.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedClubId === club.id
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {club.name.split('•')[0]}
          </button>
        ))}
      </div>

      {/* Selected Club Details Card */}
      {CLUB_VENUES.map((club) => {
        if (club.id !== selectedClubId) return null;

        return (
          <div key={club.id} className="space-y-4">
            <div className="p-5 rounded-3xl velvet-card-gold space-y-4 border border-amber-500/30 shadow-2xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                    ФЛАГМАНСКИЙ КЛУБ СЕТИ
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    ★ {club.rating}
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-amber-100 mt-0.5">
                  {club.name}
                </h2>
              </div>

              {/* Tonight's Headliner Show Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-rose-950/50 border border-purple-500/30 space-y-1">
                <div className="text-[10px] uppercase font-mono tracking-wider text-rose-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  <span>Шоу сегодня ночью</span>
                </div>
                <div className="text-xs font-bold text-slate-100">
                  {club.activeShowTonight}
                </div>
              </div>

              {/* Location details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div>{club.address}</div>
                    <div className="text-[11px] text-slate-500">м. {club.metro}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{club.hours}</span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`tel:${club.phone}`} className="hover:text-amber-300 underline font-mono">
                    {club.phone}
                  </a>
                </div>
              </div>

              {/* Features badges */}
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-300">Особенности клуба:</div>
                <div className="flex flex-wrap gap-1.5">
                  {club.features.map((feat, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-slate-300">
                      • {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onBookClub(club.id)}
                  className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <CalendarDays className="w-3.5 h-3.5 text-black" />
                  <span>Забронировать стол</span>
                </button>

                <a
                  href={`tel:${club.phone}`}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Позвонить в VIP</span>
                </a>
              </div>
            </div>

            {/* Tonight's Performers Lineup Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Артистки вечера ({dancersForSelected.length || TONIGHT_DANCERS.length})</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Соло-выходы</span>
              </div>

              <div className="space-y-2">
                {(dancersForSelected.length > 0 ? dancersForSelected : TONIGHT_DANCERS).map((dancer) => (
                  <div
                    key={dancer.id}
                    className="p-3.5 rounded-2xl velvet-card flex items-start gap-3.5 hover:border-amber-500/30 transition-all"
                  >
                    {/* Dancer Avatar with elegant ambient gradient */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dancer.avatarBg} border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md`}>
                      <Flame className="w-6 h-6 text-amber-300" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-serif font-bold text-slate-100 truncate">
                          {dancer.stageName}
                        </h4>
                        <span className="text-xs font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                          {dancer.soloShowTime}
                        </span>
                      </div>
                      <div className="text-[11px] text-purple-300 font-medium">
                        {dancer.style}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {dancer.about}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-500 truncate">
                        <Music className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{dancer.signatureMusic}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
