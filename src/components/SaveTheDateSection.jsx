import { useEffect, useMemo, useState } from 'react';
import Reveal from './Reveal.jsx';

function getCountdown(target) {
  const distance = new Date(target).getTime() - Date.now();
  const safe = Math.max(distance, 0);
  return {
    days: Math.floor(safe / 86400000),
    hours: Math.floor((safe / 3600000) % 24),
    minutes: Math.floor((safe / 60000) % 60),
    seconds: Math.floor((safe / 1000) % 60),
  };
}

function CountdownCard({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-[#A87B56]/40 bg-[#7C5130]/90 backdrop-blur-sm py-3 sm:py-3.5 px-2 shadow-[0_4px_16px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:-translate-y-0.5">
      <div className="font-sansBody text-xl sm:text-2xl font-bold tabular-nums text-white leading-none">
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-1 font-sansBody text-[11px] sm:text-xs font-medium text-white/90 leading-none">
        {label}
      </div>
    </div>
  );
}

export default function SaveTheDateSection({ data }) {
  const [time, setTime] = useState(() => getCountdown(data.countdownTarget));
  const photoSrc = data?.photos?.date || '/images/date-rihma-amir.jpg';

  useEffect(() => {
    const timer = window.setInterval(
      () => setTime(getCountdown(data.countdownTarget)),
      1000
    );
    return () => window.clearInterval(timer);
  }, [data.countdownTarget]);

  const calendarUrl = useMemo(() => {
    const event = data.events?.[0];
    if (!event?.calendar) return '#';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `The Wedding of ${data.coupleName}`,
      dates: `${event.calendar.start}/${event.calendar.end}`,
      details: event.calendar.details || '',
      location: event.calendar.location || '',
    });
    return `https://www.google.com/calendar/render?${params.toString()}`;
  }, [data]);

  return (
    <section
      id="save-date"
      className="relative z-10 w-full bg-[#683B1A] text-center overflow-hidden flex flex-col items-center border-b border-[#7A4B26]/30"
    >
      {/* 1. Header Photo dengan Gradient Fade Halus ke Background Coklat */}
      <div className="relative w-full h-[380px] sm:h-[440px] overflow-hidden">
        <img
          src={photoSrc}
          alt="Save The Date"
          className="w-full h-full object-cover object-[center_14%]"
          loading="lazy"
        />
        {/* Gradient overlay lembut menyatu dengan warna coklat khas Jawa */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent via-45% to-[#683B1A] pointer-events-none" />
      </div>

      {/* 2. Area Konten: Judul + Countdown 4 Kotak Sebaris + Tombol Simpan Tanggal */}
      <div className="relative z-10 w-full px-4 sm:px-6 -mt-10 sm:-mt-12 pb-12 sm:pb-16 max-w-[390px] sm:max-w-[430px] flex flex-col items-center">
        {/* Judul: Save The Date (Teks Lama dengan Gaya Elegan Huruf Kapital Berspasi Sesuai Referensi) */}
        <Reveal>
          <h2 className="font-serifDisplay text-2xl sm:text-[28px] font-bold tracking-[0.22em] uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            Save The Date
          </h2>
        </Reveal>

        {/* 4 Countdown Boxes Sebaris (1 Baris) Sesuai Referensi */}
        <Reveal delay={150} className="w-full mt-6 sm:mt-7">
          <div
            className="grid grid-cols-4 gap-2 sm:gap-3 w-full"
            aria-label="Countdown menuju hari bahagia"
          >
            <CountdownCard value={time.days} label="Hari" />
            <CountdownCard value={time.hours} label="Jam" />
            <CountdownCard value={time.minutes} label="Menit" />
            <CountdownCard value={time.seconds} label="Detik" />
          </div>
        </Reveal>

        {/* Tombol Simpan Tanggal Kotak Rounded Berwarna Coklat Sesuai Referensi */}
        <Reveal delay={300} className="mt-6 sm:mt-8">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-[#A87B56]/50 bg-[#7C5130] px-6 py-2.5 sm:px-7 sm:py-3 text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-200 hover:bg-[#8C5D37] hover:border-[#C4956D] active:scale-95"
          >
            <svg
              className="h-4 w-4 text-white shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-sansBody text-xs sm:text-sm font-semibold tracking-wide leading-none">
              Simpan Tanggal
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
