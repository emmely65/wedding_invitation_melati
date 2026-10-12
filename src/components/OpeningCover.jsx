import { useState, useEffect } from 'react';

export default function OpeningCover({ data, guestName, onOpen, isOpening }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Staggered smooth appearance
    const t1 = setTimeout(() => setStep(1), 250); // "THE WEDDING OF" & couple names
    const t2 = setTimeout(() => setStep(2), 650); // Guest Info
    const t3 = setTimeout(() => setStep(3), 1050); // "Buka Undangan" button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const coverImage = data?.photos?.cover || '/images/cover-rihma-amir.jpg';
  const coverTitle = data?.coverTitle || 'THE WEDDING OF';
  
  // Deteksi gaya font: 'jawa' (kaligrafi kejawa-jawaan) atau 'picture' (gaya gambar referensi)
  // Dapat diatur lewat data.coverFontStyle maupun query param ?style=jawa atau ?style=picture
  const fontStyle = (
    (typeof window !== 'undefined' && (new URLSearchParams(window.location.search).get('style') || new URLSearchParams(window.location.search).get('font'))) ||
    data?.coverFontStyle ||
    'jawa'
  ).toLowerCase();

  const brideName = data?.brideShort || 'Rihma';
  const groomName = data?.groomShort || 'Amir';
  const coupleText = data?.coupleName || `${brideName} & ${groomName}`;
  const displayName = guestName || 'Tamu Undangan';

  return (
    <section
      onClick={() => {
        if (!isOpening && step < 3) setStep(3);
      }}
      className="absolute inset-0 z-[90] flex flex-col justify-end overflow-hidden bg-[#181615]"
    >
      {/* 1. Main Background Image */}
      {!isOpening && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-y-0 h-full"
            style={{
              left: '-1cm',
              width: 'calc(100% + 2cm)',
              transform: 'translateX(0.5cm)',
            }}
          >
            <img
              src={coverImage}
              alt="Cover Wedding"
              className="h-full w-full object-cover object-top"
            />
          </div>
          {/* Dual vignette overlay: soft top shadow for header contrast, clear middle for couple, bottom shadow for action card */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent via-28% to-black/85 to-85% pointer-events-none" />
        </div>
      )}

      {/* 2. Smooth Door Parting Transition when "Buka Undangan" is clicked */}
      {isOpening && (
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
          {/* Left Door */}
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden animate-coverPartLeft">
            <div
              className="absolute inset-y-0 h-full bg-cover bg-top"
              style={{
                backgroundImage: `url(${coverImage})`,
                left: '-1cm',
                width: 'calc(200% + 2cm)',
                transform: 'translateX(0.5cm)',
              }}
            />
            <div className="absolute right-0 inset-y-0 w-6 bg-gradient-to-r from-transparent to-black/35" />
          </div>

          {/* Right Door */}
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden animate-coverPartRight">
            <div
              className="absolute inset-y-0 h-full bg-cover bg-top"
              style={{
                backgroundImage: `url(${coverImage})`,
                left: 'calc(-100% - 1cm)',
                width: 'calc(200% + 2cm)',
                transform: 'translateX(0.5cm)',
              }}
            />
            <div className="absolute left-0 inset-y-0 w-6 bg-gradient-to-l from-transparent to-black/35" />
          </div>
        </div>
      )}

      {/* 3. Foreground Content - Top Header & Bottom Action Card */}
      <div
        className={`relative z-20 flex flex-col justify-between items-center h-full w-full px-4 sm:px-6 pt-10 sm:pt-14 pb-10 sm:pb-14 text-center select-none transition-all duration-300 ease-out ${
          isOpening
            ? 'opacity-0 scale-95 pointer-events-none'
            : step >= 1
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* TOP HEADER: The Wedding Of & Couple Names */}
        <header className="flex flex-col items-center w-full">
          {/* The Wedding Of */}
          <p
            className={`font-sansBody text-xs sm:text-[13px] font-semibold tracking-[0.28em] text-white/95 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-1 sm:mb-1.5 transition-all duration-700 ease-out ${
              step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            {coverTitle}
          </p>

          {/* Couple Names (Rihma & Amir) - Pilihan Gaya: Kaligrafi Jawa vs Gaya Gambar */}
          <div
            className={`w-full max-w-full my-1 sm:my-1.5 transition-all duration-700 ease-out flex items-center justify-center ${
              step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            {fontStyle === 'picture' ? (
              /* Gaya Geometris 3D persis seperti gambar referensi */
              <h1 className="font-coupleCover italic font-bold whitespace-nowrap text-[clamp(1.4rem,6vw,2.25rem)] tracking-wider text-white leading-normal lowercase drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] text-cover-picture">
                <span>{brideName.toLowerCase()}</span>
                <span className="font-serif italic font-normal text-xl sm:text-2xl mx-1.5 sm:mx-2 opacity-90">&</span>
                <span>{groomName.toLowerCase()}</span>
              </h1>
            ) : (
              /* Gaya Kaligrafi Kejawa-jawaan (Aston Script / Carakan Luwes Adat Jawa) */
              <h1 className="font-aston whitespace-nowrap text-[clamp(1.65rem,7.5vw,2.85rem)] font-normal text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.85)] leading-tight tracking-normal py-0.5">
                {coupleText}
              </h1>
            )}
          </div>
        </header>

        {/* BOTTOM ACTION: Guest Info & Open Invitation Button */}
        <footer className="flex flex-col items-center w-full">
          {/* Guest Info */}
          <div
            className={`my-2.5 sm:my-3 flex flex-col items-center transition-all duration-700 ease-out ${
              step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            <p className="font-sansBody text-[11px] sm:text-xs font-medium text-white/90 leading-relaxed tracking-wide">
              Kepada Yth
            </p>
            <p className="font-sansBody text-[11px] sm:text-xs font-medium text-white/90 leading-relaxed tracking-wide mt-0.5 mb-1.5">
              Bapak/Ibu/Saudara/i
            </p>
            <h2 className="font-serifDisplay text-xl sm:text-2xl font-normal text-white tracking-wider leading-relaxed drop-shadow-md">
              {displayName}
            </h2>
          </div>

          {/* Open Invitation Button */}
          <div
            className={`mt-2 sm:mt-2.5 transition-all duration-700 ease-out ${
              step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/70 bg-[#a67f5e]/85 px-6 py-2.5 sm:px-7 sm:py-2.5 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#b58c69] hover:border-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Buka Undangan"
            >
              {/* Mail Icon */}
              <svg
                className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-sansBody text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
                BUKA UNDANGAN
              </span>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
