import { useEffect, useRef, useState } from 'react';

export default function QuoteSection({ data }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const quoteText =
    data?.loveQuote?.caption ||
    'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir';
  const quoteSource = data?.loveQuote?.source || 'Q.S - AR RUM : 21';

  const photoSrc = data?.loveQuote?.photoSrc || data?.photos?.quote || '/images/quote-rihma-amir.jpg';
  const treeSrc = data?.loveQuote?.treeSrc || '/images/pohon.png';
  const sideFlowerSrc = data?.loveQuote?.sideFlowerSrc || '/images/bunga1.png';
  const bottomFlowerSrc = data?.loveQuote?.bottomFlowerSrc || '/images/bunga-bawah.png';

  return (
    <section
      id="quote"
      ref={sectionRef}
      className="relative z-10 overflow-hidden w-full pt-[57px] pb-0 flex flex-col items-center justify-start bg-gradient-to-b from-[#542d13] via-[#683b1a] to-[#3e1f0b]"
    >
      {/* ─── 1. Full-bleed background coklat hangat selaras dengan tema cover ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#542d13]/90 via-[#683b1a]/85 to-[#3e1f0b]/95 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(220,172,97,0.14),transparent_65%)] pointer-events-none z-0" />

      {/* Frame Container - Jarak puncak kubah ke batas atas menu tepat ~1,5cm (57px) */}
      <div className="relative w-full px-[18px] sm:px-6 flex items-center justify-center z-10 pt-0 pb-0">
        
        {/* ─── POHON SAMPING (Kiri): pohon.jpg / pohon.png ─── */}
        <img
          src={treeSrc}
          alt="Dekorasi pohon samping"
          style={{
            transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.95)',
          }}
          className={`absolute -left-5 sm:-left-8 top-0 sm:-top-2 w-48 sm:w-56 pointer-events-none object-contain z-0 drop-shadow-md transition-all duration-1000 ease-out delay-100 ${
            inView ? 'opacity-90' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* ─── BUNGA SAMPING (Kanan): bunga1.jpg / bunga1.png ─── */}
        <img
          src={sideFlowerSrc}
          alt="Dekorasi bunga samping"
          style={{
            transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.95)',
          }}
          className={`absolute -right-5 sm:-right-8 top-2 sm:top-4 w-44 sm:w-52 pointer-events-none object-contain z-0 drop-shadow-md transition-all duration-1000 ease-out delay-200 ${
            inView ? 'opacity-95' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* ─── PANEL / KARTU KUBAH ARCH (Transisi Mulus & Elegan) ─── */}
        <div
          className={`relative w-full max-w-[390px] sm:max-w-[420px] rounded-t-[185px] sm:rounded-t-[210px] rounded-b-none bg-[#FAF6F0] border-t-[1.5px] border-x-[1.5px] border-b-0 border-[#C9A15A]/70 pt-0 pb-0 shadow-[0_6px_24px_rgba(0,0,0,0.25),0_1px_6px_rgba(0,0,0,0.15),0_0_15px_rgba(201,161,90,0.15)] z-10 overflow-hidden text-center transition-all duration-1000 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* ─── FOTO PENGANTIN DI KUBAH ATAS (Sesuai Tata Letak Gambar Referensi) ─── */}
          <div className="relative w-full h-[400px] sm:h-[440px] overflow-hidden bg-[#542d13]/10">
            <img
              src={photoSrc}
              alt="Foto Pengantin"
              className={`w-full h-full object-cover object-[center_42%] transition-transform duration-1000 ease-out ${
                inView ? 'scale-100' : 'scale-105'
              }`}
              loading="lazy"
            />
            {/* Garis batas aksen emas halus antara foto dan kartu kutipan */}
            <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#C9A15A]/40 z-10" />
          </div>

          {/* ─── KONTEN TEKS KUTIPAN DI BAWAH FOTO (Tanpa Teks R & A) ─── */}
          <div className="relative z-20 w-full pt-6 sm:pt-7 pb-[148px] sm:pb-[164px] px-5 sm:px-8">
            {/* Inner watermark halus */}
            <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#683b1a_1.5px,transparent_1.5px)] [background-size:18px_18px] pointer-events-none" />

            <blockquote
              className={`relative z-10 font-serifDisplay italic font-medium text-[#2c2c2c] text-[14px] sm:text-[15.5px] leading-[1.8] sm:leading-[1.85] tracking-[0.01em] px-1 sm:px-2 max-w-[340px] sm:max-w-[370px] mx-auto transition-all duration-1000 ease-out delay-400 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              “{quoteText}”
            </blockquote>

            {quoteSource && (
              <p
                className={`relative z-10 font-serifDisplay text-xs sm:text-[13px] font-bold text-[#683b1a] mt-3.5 tracking-[0.16em] uppercase transition-all duration-1000 ease-out delay-500 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                {quoteSource}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ─── 3. ILUSTRASI BUNGA BAWAH: Menutupi Bagian Bawah Panel Kubah (Transisi Mengalir Halus) ─── */}
      <div
        className={`absolute bottom-0 left-0 right-0 w-full pointer-events-none z-30 transition-all duration-1000 ease-out delay-300 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <img
          src={bottomFlowerSrc}
          alt="Dekorasi bunga bawah"
          className="w-full h-auto min-h-[140px] max-h-[220px] object-cover object-top drop-shadow-2xl"
          loading="lazy"
        />
      </div>
    </section>
  );
}
