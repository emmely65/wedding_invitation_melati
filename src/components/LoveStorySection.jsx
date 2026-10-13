import Reveal from './Reveal.jsx';

export default function LoveStorySection({ data }) {
  const loveStory = data?.loveStory || {};
  const stories = loveStory.stories || [];

  return (
    <section
      id="story"
      className="relative z-10 w-full bg-gradient-to-b from-[#683B1A] via-[#572E13] to-[#683B1A] px-4 sm:px-6 py-14 sm:py-20 flex flex-col items-center overflow-hidden border-b border-[#7A4B26]/30"
    >
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(201,161,90,0.12),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[375px] sm:max-w-[420px] flex flex-col items-center relative z-10">
        {/* ─── HEADER SECTION ─── */}
        <Reveal className="w-full text-center mb-8 sm:mb-10 flex flex-col items-center">
          <span className="font-serifDisplay text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-[#E8C789] font-medium">
            Kisah Perjalanan Cinta
          </span>
          <h2 className="font-pinyon text-4xl sm:text-5xl text-[#FBF6EE] font-normal leading-tight mt-1 select-none drop-shadow-sm">
            {loveStory.title || 'Our Love Story'}
          </h2>

          {/* Ornamen Pemisah Bunga Elegan Murni Tanpa Background */}
          <div className="flex items-center justify-center gap-2.5 mt-2.5 w-full max-w-[260px]">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C9A15A]/70" />
            <img
              src="/images/bunga-story.png"
              alt=""
              aria-hidden="true"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain select-none pointer-events-none"
            />
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C9A15A]/70" />
          </div>
        </Reveal>

        {/* ─── TIMELINE KISAH ─── */}
        <div className="relative w-full flex flex-col gap-6 sm:gap-7">
          {/* Garis Vertikal Timeline Emas Elegan */}
          <div className="absolute left-[20px] sm:left-[24px] top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-[#C9A15A]/70 via-[#E8C789]/50 to-[#C9A15A]/30 z-0" />

          {stories.map((item, index) => (
            <Reveal
              key={item.id || index}
              className="relative z-10 w-full flex items-start pl-11 sm:pl-13"
            >
              {/* Titik / Node Timeline Berkilau */}
              <div className="absolute left-[12px] sm:left-[16px] top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FAF6F0] border-[2.5px] border-[#C9A15A] shadow-[0_0_10px_rgba(201,161,90,0.6)] flex items-center justify-center z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5C0F1A]" />
              </div>

              {/* Kartu Paragraf Cerita (Sesuai Nuansa Krem & Coklat Jawa) */}
              <div className="w-full rounded-[22px] sm:rounded-[26px] bg-[#FAF6F0]/95 border border-[#BFA07A]/60 shadow-[0_10px_28px_rgba(0,0,0,0.25)] p-4 sm:p-5 text-left backdrop-blur-sm transition-all duration-300 hover:shadow-[0_14px_34px_rgba(0,0,0,0.3)]">
                {/* Badge Waktu / Milestone */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#5C0F1A] text-[#FDFBF7] text-[10.5px] sm:text-[11px] font-serifDisplay tracking-wide font-medium shadow-sm mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>{item.badge}</span>
                </div>

                {/* Judul Bab / Fase */}
                <h3 className="font-serifDisplay font-bold text-[15px] sm:text-[16px] text-[#3B1F0E] tracking-tight leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Isi Teks Cerita */}
                <p className="font-sansBody text-[12.5px] sm:text-[13px] text-[#3A2A20] leading-relaxed whitespace-pre-line text-justify select-text">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ─── PENUTUP KISAH ─── */}
        <Reveal className="mt-8 text-center">
          <p className="font-serifDisplay italic text-[12px] sm:text-[13px] text-[#E8C789]/90 tracking-wide">
            "Dan kisah cinta kami kini siap menuju gerbang kehidupan baru."
          </p>
        </Reveal>
      </div>
    </section>
  );
}
