import React, { useState } from 'react';
import { 
  UserCog, 
  ShieldCheck, 
  Bell, 
  Lock, 
  ArrowLeft, 
  Check, 
  Smartphone, 
  EyeOff, 
  Sparkles 
} from 'lucide-react';
import { ClubUser } from '../types.ts';

interface SettingsViewProps {
  user: ClubUser;
  onUpdateUser: (updated: Partial<ClubUser>) => void;
  onBack: () => void;
  lang: 'ru' | 'en';
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateUser,
  onBack,
  lang,
}) => {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [incognitoMode, setIncognitoMode] = useState(true);
  const [notifyAfterparties, setNotifyAfterparties] = useState(true);
  const [notifyBonuses, setNotifyBonuses] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
          ACCOUNT SECURITY
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
          <span>Настройки профиля</span>
          <UserCog className="w-5 h-5 text-amber-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Управление персональными данными, приватностью визитов и уведомлениями
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="p-5 rounded-3xl velvet-card-gold space-y-4">
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[11px] text-slate-300 font-medium block mb-1">
              Имя гостя (или клубный псевдоним):
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-300 font-medium block mb-1">
              Номер телефона:
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 font-mono transition-colors"
            />
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
            <span className="text-slate-400">Привязанная карта:</span>
            <span className="font-mono text-amber-300 font-bold">#{user.cardNumber}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Текущий клубный статус:</span>
            <span className="text-amber-200 font-semibold">{user.level} ({user.cardType})</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          {saved ? <Check className="w-4 h-4" /> : null}
          <span>{saved ? 'Изменения сохранены' : 'Сохранить профиль'}</span>
        </button>
      </form>

      {/* Privacy and Incognito Visited */}
      <div className="p-4 rounded-2xl velvet-card space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
          <EyeOff className="w-4 h-4 text-amber-400" />
          <span>Клубная конфиденциальность</span>
        </div>

        <label className="flex items-start justify-between p-2.5 rounded-xl bg-white/5 cursor-pointer">
          <div className="text-xs pr-3">
            <div className="text-slate-200 font-medium">Режим «Инкогнито»</div>
            <div className="text-[11px] text-slate-400">
              При бронировании стола хостес и официанты обращаются только по номеру карты или выбранному псевдониму.
            </div>
          </div>
          <input
            type="checkbox"
            checked={incognitoMode}
            onChange={(e) => setIncognitoMode(e.target.checked)}
            className="accent-amber-500 w-4 h-4 rounded mt-1"
          />
        </label>
      </div>

      {/* Notifications */}
      <div className="p-4 rounded-2xl velvet-card space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-400" />
          <span>Клубные уведомления</span>
        </div>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 cursor-pointer">
          <div className="text-xs">
            <div className="text-slate-200 font-medium">Закрытые Afterparty & Спец-шоу</div>
            <div className="text-[11px] text-slate-400">Персональные приглашения в Telegram</div>
          </div>
          <input
            type="checkbox"
            checked={notifyAfterparties}
            onChange={(e) => setNotifyAfterparties(e.target.checked)}
            className="accent-amber-500 w-4 h-4 rounded"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 cursor-pointer">
          <div className="text-xs">
            <div className="text-slate-200 font-medium">Сгорающие бонусы и подарки</div>
            <div className="text-[11px] text-slate-400">Напоминания о накопленной Валюте Удовольствия</div>
          </div>
          <input
            type="checkbox"
            checked={notifyBonuses}
            onChange={(e) => setNotifyBonuses(e.target.checked)}
            className="accent-amber-500 w-4 h-4 rounded"
          />
        </label>
      </div>
    </div>
  );
};
