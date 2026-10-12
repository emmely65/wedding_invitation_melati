import { useEffect, useState, useRef } from 'react';

export default function HeroSection({ data, opened }) {
  const videoRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  // Sinkronisasi pemutaran video hero agar diputar 1 kali lalu diam di frame terakhir
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = false;

    if (!opened) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (_) {}
      setShowContent(false);
      return;
    }

    const handleEnded = () => {
      video.pause();
      setShowContent(true);
    };

    const handleTimeUpdate = () => {
      // Teks muncul tepat di detik 10 dari video background
      if (video.currentTime >= 10.0) {
        setShowContent(true);
      }
    };

    const startPlaybackFromBeginning = () => {
      try {
        video.currentTime = 0;
      } catch (_) {}
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.debug('Autoplay fallback:', err);
        });
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    if (video.readyState >= 1) {
      startPlaybackFromBeginning();
    } else {
      video.addEventListener('loadedmetadata', startPlaybackFromBeginning, { once: true });
    }

    // Fallback timer jika browser throttle timeupdate (10.5 detik)
    const timer = setTimeout(() => setShowContent(true), 10500);

    return () => {
      clearTimeout(timer);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', startPlaybackFromBeginning);
    };
  }, [opened]);

  return (
    <section id="home" className="relative w-full bg-softPink">
      {/* 1. HERO VIEWPORT - 1 Layar Penuh HP (100dvh) */}
      <div
        onClick={() => {
          if (!showContent) setShowContent(true);
        }}
        className="relative h-dvh min-h-[580px] w-full overflow-hidden flex flex-col justify-between"
      >
        {/* 3D Motion Video Background - Pas Layar Penuh (1x putar kemudian diam) */}
        <div className="absolute inset-0 z-0 bg-softPink overflow-hidden">
          <video
            ref={videoRef}
            key={data.heroVideoUrl}
            src={data.heroVideoUrl}
            className="h-full w-full object-cover object-center"
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* Content over background - dinaikkan tambahan 0.7cm (-translate-y-[74px] sm:-translate-y-[82px]) */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 -translate-y-[74px] sm:-translate-y-[82px] text-center select-none">
          {/* 1. The Wedding Of */}
          <p
            className={`font-sansBody text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase text-[#FAF6EE]/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-2.5 sm:mb-3 transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-1' : 'opacity-0'
            }`}
          >
            {data.coverTitle || 'The Wedding Of'}
          </p>

          {/* 2. Bride Name (Rihma) */}
          <h2
            className={`my-1 sm:my-1.5 font-aston text-5xl sm:text-6xl font-normal tracking-wide text-[#FAF6EE] leading-relaxed drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)] transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-2' : 'opacity-0'
            }`}
          >
            {data.brideShort}
          </h2>

          {/* 3. Floral Ampersand Image (buanga-v2-transparent.png) */}
          <div
            className={`my-3 sm:my-4 transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-3' : 'opacity-0'
            }`}
          >
            <img
              src="/images/buanga-v2-transparent.png"
              alt="&"
              className="mx-auto h-20 sm:h-24 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* 4. Groom Name (Amir) */}
          <h2
            className={`my-1 sm:my-1.5 font-aston text-5xl sm:text-6xl font-normal tracking-wide text-[#FAF6EE] leading-relaxed drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)] transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-4' : 'opacity-0'
            }`}
          >
            {data.groomShort}
          </h2>

          {/* 5. Date */}
          <p
            className={`mt-6 sm:mt-8 font-serifDisplay text-base sm:text-lg font-medium tracking-[0.28em] text-[#FAF6EE]/95 leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-5' : 'opacity-0'
            }`}
          >
            {data.coverDate}
          </p>
        </div>
      </div>
    </section>
  );
}
