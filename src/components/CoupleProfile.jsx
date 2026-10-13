import { useEffect, useRef, useState } from 'react';

// Komponen Pembungkus Animasi Muncul Teks Per-Blok Saat Masuk Viewport
function AnimatedBlock({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function CoupleProfile({ data }) {
  const bride = data?.couple?.bride || {};
  const groom = data?.couple?.groom || {};
  const bridePhoto = bride.photo || data?.photos?.bride || '/images/mempelai-wanita.jpeg';
  const groomPhoto = groom.photo || data?.photos?.groom || '/images/cowok.jpg';

  return (
    <section
      id="couple"
      className="relative z-10 w-full py-16 sm:py-24 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ─── KARTU PANEL KAPSUL / ARCH ELEGAN (Garis tepi coklat sesuai referensi) ─── */}
      <div
        className="relative w-full max-w-[365px] sm:max-w-[415px] rounded-[175px] sm:rounded-[200px] bg-[#F8F2EC]/65 backdrop-blur-md border-[2px] sm:border-[2.5px] border-[#7A4B26] pt-12 sm:pt-16 pb-20 sm:pb-24 px-4 sm:px-7 shadow-[0_14px_50px_rgba(0,0,0,0.28),0_2px_12px_rgba(122,75,38,0.22)] z-10 overflow-hidden text-center flex flex-col items-center"
      >
        {/* ─── KONTEN: HEADER + PROFIL WANITA + PEMBATAS & + PROFIL PRIA ─── */}
        <div className="w-full flex flex-col items-center">
          {/* 1. HEADER: KEDUA MEMPELAI & SALAM PEMBUKA */}
          <AnimatedBlock className="relative z-10 w-full" delay={100}>
            {/* Judul Cursive Kaligrafi Elegan Coklat */}
            <h2 className="font-pinyon text-4xl sm:text-5xl text-[#6E3D19] font-normal leading-tight select-none tracking-normal">
              Kedua Mempelai
            </h2>

            {/* Salam Pembuka */}
            <p className="mt-1.5 sm:mt-2 font-serifDisplay text-[13.5px] sm:text-[14.5px] font-semibold text-[#1F1A1C] tracking-wide">
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </p>

            {/* Muqaddimah / Doa Pengiring */}
            <p className="mt-1.5 font-serifDisplay text-[12.5px] sm:text-[13px] text-[#3D2E32] leading-snug max-w-[285px] sm:max-w-[320px] mx-auto">
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga
              ridho-Mu tercurah mengiringi pernikahan kami.
            </p>
          </AnimatedBlock>

          {/* 2. PROFIL MEMPELAI WANITA (Dengan Foto Oval & Ornamen Bunga Sesuai Referensi) */}
          <AnimatedBlock className="relative z-10 w-full mt-4 sm:mt-5 flex flex-col items-center" delay={150}>
            {/* Foto Oval dengan Ornamen Bunga di Sekelilingnya */}
            <div className="relative my-2 sm:my-3 flex items-center justify-center">
              {/* Ornamen Bunga ornamen2-frame (Lebih kecil & proporsional) */}
              <img
                src="/images/ornamen2-frame.png"
                alt=""
                aria-hidden="true"
                className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-[225px] sm:w-[255px] max-w-none pointer-events-none select-none z-0 drop-shadow-md"
              />

              {/* Bingkai Ganda Coklat Elegan & Foto Mempelai (Sedikit lebih besar) */}
              <div className="relative z-10 p-[2.5px] rounded-full border-[2px] border-[#7A4B26] shadow-[0_6px_22px_rgba(0,0,0,0.2)] bg-[#FDFBF7]/50">
                <div className="w-[185px] h-[245px] sm:w-[210px] sm:h-[278px] rounded-full overflow-hidden border border-[#7A4B26]/40 bg-[#F8F2EC]">
                  <img
                    src={bridePhoto}
                    alt={bride.name || 'Mempelai Wanita'}
                    className="w-full h-full object-cover object-[center_20%]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Nama Panggilan Cursive Tulisan Tangan */}
            <h3 className="font-pinyon text-4xl sm:text-5xl text-[#6E3D19] font-normal leading-none select-none mt-1 sm:mt-1.5">
              {bride.name || 'Rihma'}
            </h3>

            {/* Nama Lengkap Tegas Elegan */}
            <h4 className="mt-1.5 sm:mt-2 font-serifDisplay text-[18px] sm:text-[20px] font-bold text-[#1F1A1C] tracking-wide leading-tight">
              {bride.fullName || 'Zuyyina Arih Melati'}
            </h4>

            {/* Keterangan Putri, Nama Orang Tua & Alamat */}
            <div className="mt-1 sm:mt-1.5 font-serifDisplay text-[13px] sm:text-[14px] text-[#241F1C] leading-snug text-center">
              <p className="font-medium text-[#4A3B32]">Putri dari</p>
              <p className="font-semibold text-[#1F1A1C] mt-0.5">Bapak Maftuchin dan Ibu Siti Zulaikah</p>
              <p className="text-[12px] sm:text-[12.5px] text-[#4A3B32]/90 mt-0.5 max-w-[285px] sm:max-w-[315px] mx-auto leading-tight">
                {bride.address || 'Ds.Tunggulrejo kec.Singgahan Kab.Tuban, Rt 12 Rw 04.'}
              </p>
            </div>

            {bride.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram.replace(/^@/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#6E3D19]/90 hover:bg-[#582F12] px-3.5 py-1 text-[11.5px] font-serifDisplay text-white shadow-sm transition duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>{bride.instagram.startsWith('@') ? bride.instagram : `@${bride.instagram}`}</span>
              </a>
            )}
          </AnimatedBlock>

          {/* 3. PEMBATAS ORNAMEN BUNGA & (Menggunakan bunga-v1.1) */}
          <AnimatedBlock className="relative z-10 w-full flex items-center justify-center my-3 sm:my-4" delay={100}>
            <img
              src="/images/bunga-v1.1.png"
              alt="&"
              className="h-20 sm:h-24 w-auto object-contain drop-shadow-md select-none"
            />
          </AnimatedBlock>

          {/* 4. PROFIL MEMPELAI PRIA (Dengan Foto Oval & Ornamen Bunga Sesuai Referensi) */}
          <AnimatedBlock className="relative z-10 w-full flex flex-col items-center" delay={150}>
            {/* Foto Oval Pria dengan Ornamen Bunga */}
            {groomPhoto && (
              <div className="relative my-2 sm:my-3 flex items-center justify-center">
                <img
                  src="/images/ornamen2-frame.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-[225px] sm:w-[255px] max-w-none pointer-events-none select-none z-0 drop-shadow-md"
                />

                <div className="relative z-10 p-[2.5px] rounded-full border-[2px] border-[#7A4B26] shadow-[0_6px_22px_rgba(0,0,0,0.2)] bg-[#FDFBF7]/50">
                  <div className="w-[185px] h-[245px] sm:w-[210px] sm:h-[278px] rounded-full overflow-hidden border border-[#7A4B26]/40 bg-[#F8F2EC]">
                    <img
                      src={groomPhoto}
                      alt={groom.name || 'Mempelai Pria'}
                      className="w-full h-full object-cover object-[center_18%]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Nama Panggilan Cursive Tulisan Tangan */}
            <h3 className="font-pinyon text-4xl sm:text-5xl text-[#6E3D19] font-normal leading-none select-none mt-1 sm:mt-1.5">
              {groom.name || 'Amir'}
            </h3>

            {/* Nama Lengkap Tegas Elegan */}
            <h4 className="mt-1.5 sm:mt-2 font-serifDisplay text-[18px] sm:text-[20px] font-bold text-[#1F1A1C] tracking-wide leading-tight">
              {groom.fullName || 'Amirul Mukminin, S. Pd.'}
            </h4>

            {/* Keterangan Putra, Nama Orang Tua & Alamat */}
            <div className="mt-1 sm:mt-1.5 font-serifDisplay text-[13px] sm:text-[14px] text-[#241F1C] leading-snug text-center">
              <p className="font-medium text-[#4A3B32]">Putra dari</p>
              <p className="font-semibold text-[#1F1A1C] mt-0.5">Bapak Drs. A. Abdul Kholiq dan Ibu Sri Hartini, BA</p>
              <p className="text-[12px] sm:text-[12.5px] text-[#4A3B32]/90 mt-0.5 max-w-[285px] sm:max-w-[315px] mx-auto leading-tight">
                {groom.address || 'Jl. HOS Cokroaminoto no 1 pacul Bojonegoro'}
              </p>
            </div>

            {groom.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram.replace(/^@/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#6E3D19]/90 hover:bg-[#582F12] px-3.5 py-1 text-[11.5px] font-serifDisplay text-white shadow-sm transition duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>{groom.instagram.startsWith('@') ? groom.instagram : `@${groom.instagram}`}</span>
              </a>
            )}
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}
