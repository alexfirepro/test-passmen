import React, { useState } from 'react';
import { X, Send, Check, ShieldCheck, Star } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ru' | 'en';
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [topic, setTopic] = useState<string>('compliment');
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl velvet-card-gold p-6 border border-amber-500/40 shadow-2xl space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400 mx-auto flex items-center justify-center">
              <Check className="w-7 h-7 text-amber-300" />
            </div>
            <h3 className="text-lg font-serif font-bold text-amber-100">
              Ваше сообщение передано директору
            </h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Каждое обращение рассматривается управляющим лично. Мы свяжемся с вами в течение 24 часов.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                ПРЯМАЯ ЛИНИЯ С ДИРЕКТОРОМ СЕТИ
              </div>
              <h2 className="text-lg font-serif font-bold text-amber-100">
                Оставить отзыв или пожелание
              </h2>
              <p className="text-xs text-slate-400">
                Абсолютная конфиденциальность. Ваши слова читает непосредственно генеральный управляющий.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] text-slate-300 font-medium block mb-1">
                  Тема обращения:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'compliment', label: 'Благодарность за вечер' },
                    { id: 'service', label: 'Замечание по сервису' },
                    { id: 'show', label: 'Отзыв о шоу/артистках' },
                    { id: 'vip', label: 'Персональный вопрос' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setTopic(t.id)}
                      className={`p-2 rounded-xl text-left transition-all ${
                        topic === t.id
                          ? 'bg-amber-500/20 border border-amber-400 text-amber-200'
                          : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-300 font-medium block mb-1">
                  Общая оценка визита:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-300 font-medium block mb-1">
                  Ваше сообщение:
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  required
                  placeholder="Опишите ваши впечатления, предложения или возникшие вопросы..."
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-300 font-medium block mb-1">
                  Контакты для персонального ответа (телефон или Telegram):
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+7 (999) 000-00-00 или @username"
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Гарантия закрытого рассмотрения без огласки третьим лицам</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-black" />
                <span>Отправить директору</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
