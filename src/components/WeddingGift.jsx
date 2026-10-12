import { useState } from 'react';
import Reveal from './Reveal.jsx';

async function copyToClipboard(text) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback below
  }
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

export default function WeddingGift({ data }) {
  const [showCards, setShowCards] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const gift = data?.gift || {};
  const banks = gift.banks || [];
  const kirimKado = gift.kirimKado || null;

  const handleCopy = async (key, text) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2500);
    }
  };

  return (
    <section
      id="gift"
      className="relative z-10 w-full px-3.5 sm:px-6 py-12 sm:py-16 flex flex-col items-center overflow-hidden"
    >
      <div className="w-full max-w-md flex flex-col items-center">
        <Reveal>
          {/* Card Utama Putih/Krem Menu Wedding Gift */}
          <div
            style={{ backgroundColor: '#FAF6F0' }}
            className={`relative w-full max-w-[350px] sm:max-w-[385px] rounded-[28px] sm:rounded-[32px] border-[2px] sm:border-[2.5px] border-[#8C715A] shadow-[0_14px_40px_rgba(0,0,0,0.28)] pt-8 sm:pt-10 pb-7 sm:pb-8 text-center mx-auto transition-all duration-300 ${
              showCards ? 'px-3 sm:px-4.5' : 'px-6 sm:px-8'
            }`}
          >
            {/* 1. Judul: Wedding Gift (Cursive Kaligrafi Elegan) */}
            <h3 className="font-allura text-[46px] sm:text-[54px] text-[#2C221D] leading-tight select-none font-normal italic drop-shadow-sm">
              Wedding Gift
            </h3>

            {/* 2. Paragraf 1: Doa Restu */}
            <p className="mt-3.5 sm:mt-4 font-serifDisplay text-[13px] sm:text-[14.5px] text-[#4A3C35] leading-relaxed font-normal max-w-[270px] sm:max-w-[290px] mx-auto">
              Doa Restu Anda merupakan<br />
              karunia yang sangat berarti bagi kami.
            </p>

            {/* 3. Paragraf 2: Ungkapan Tanda Kasih */}
            <p className="mt-4 sm:mt-5 font-serifDisplay text-[13px] sm:text-[14.5px] text-[#4A3C35] leading-relaxed font-normal max-w-[275px] sm:max-w-[300px] mx-auto">
              Dan jika memberi adalah ungkapan tanda kasih,<br />
              Anda dapat memberi melalui dibawah ini.
            </p>

            {/* 4. Tombol: [ 💳 Klik di Sini ] (Hanya muncul sebelum diklik) */}
            {!showCards && (
              <div className="mt-6 sm:mt-7 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowCards(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#6B5542] hover:bg-[#5A4533] active:scale-95 px-6 sm:px-7 py-2.5 sm:py-3 text-white border border-[#9C826D]/70 shadow-[0_4px_14px_rgba(0,0,0,0.22)] transition-all duration-200 cursor-pointer"
                  aria-label="Buka Informasi Rekening dan Kado"
                >
                  <svg
                    className="w-4 h-4 text-white shrink-0 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                  </svg>
                  <span className="font-serifDisplay font-semibold text-[13.5px] sm:text-[14.5px] tracking-wide leading-none">
                    Klik di Sini
                  </span>
                </button>
              </div>
            )}

            {/* 5. Daftar Kartu ATM & Kado (Ikut ke dalam box putih menu gift) */}
            {showCards && (
              <div className="w-full mt-6 sm:mt-7 flex flex-col items-center space-y-4 sm:space-y-4.5 animate-fadeUp">
                {/* Kartu Bank: BNI, BRI, SeaBank, DANA */}
                {banks.map((bank, index) => {
                  const key = `bank-${bank.bankName}-${bank.accountNumber || index}`;
                  const isCopied = copiedKey === key;

                  return (
                    <div
                      key={key}
                      style={{
                        background:
                          'linear-gradient(135deg, #8E745A 0%, #634C36 42%, #7B634C 72%, #503926 100%)',
                      }}
                      className="relative w-full min-h-[195px] sm:min-h-[205px] rounded-[20px] sm:rounded-[22px] p-4 sm:p-4.5 shadow-[0_10px_28px_rgba(0,0,0,0.3)] border border-[#C2A78E]/60 overflow-hidden text-left transition-transform duration-300 hover:-translate-y-0.5 select-none"
                    >
                      {/* Satin waves decoration matching reference image */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
                        <svg
                          className="w-full h-full"
                          preserveAspectRatio="none"
                          viewBox="0 0 350 200"
                          fill="none"
                        >
                          <path
                            d="M-40,210 Q100,50 260,110 T420,10"
                            stroke="rgba(255,255,255,0.6)"
                            strokeWidth="48"
                            strokeLinecap="round"
                          />
                          <path
                            d="M-20,140 Q120,20 290,70 T420,-20"
                            stroke="rgba(255,255,255,0.35)"
                            strokeWidth="32"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      {/* Subtle radial sheen */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.22),transparent_55%)] pointer-events-none" />

                      {/* Header: Logo Bank (White badge) & Golden Smart Chip */}
                      <div className="relative z-10 flex items-center justify-between w-full mb-3">
                        <div className="bg-white rounded-[10px] px-2 py-1 shadow-sm flex items-center justify-center min-w-[74px] max-w-[92px] h-[34px] sm:h-[36px]">
                          {bank.logo ? (
                            <img
                              src={bank.logo}
                              alt={bank.bankName}
                              className="h-5 sm:h-5.5 w-auto max-w-[80px] object-contain"
                            />
                          ) : (
                            <span className="font-sansBody font-bold text-xs text-[#2A1E1B]">
                              {bank.bankName}
                            </span>
                          )}
                        </div>

                        {/* Golden EMV Smart Chip */}
                        <div className="w-10 h-7.5 sm:w-11 sm:h-8 rounded-md bg-gradient-to-br from-[#E8C564] via-[#FDE48C] to-[#B58E2E] border border-[#A67F24] shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_2px_5px_rgba(0,0,0,0.25)] relative flex items-center justify-center shrink-0">
                          <div className="w-5.5 h-4.5 sm:h-5 rounded-[3px] border border-[#7E5E16]/70 relative">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#7E5E16]/60 -translate-y-1/2" />
                            <div className="absolute top-0 left-1/2 h-full w-[1px] bg-[#7E5E16]/60 -translate-x-1/2" />
                          </div>
                          <div className="absolute left-0 top-1/2 w-2.5 h-[1px] bg-[#7E5E16]/60" />
                          <div className="absolute right-0 top-1/2 w-2.5 h-[1px] bg-[#7E5E16]/60" />
                        </div>
                      </div>

                      {/* Body: No Rekening, Atas Nama, and Salin Button */}
                      <div className="relative z-10 flex items-end justify-between w-full mt-2">
                        <div className="text-left flex-1 min-w-0 pr-2">
                          <p className="font-serifDisplay text-[12px] sm:text-[13px] font-medium text-white/90 leading-tight">
                            No Rekening
                          </p>
                          <p className="font-sansBody font-bold text-[15.5px] sm:text-[16.5px] text-white tracking-wider leading-snug mt-0.5 select-all">
                            {bank.accountNumber}
                          </p>
                          <p className="font-serifDisplay text-[12px] sm:text-[13px] font-medium text-white/90 leading-tight mt-2">
                            Atas Nama
                          </p>
                          <p className="font-serifDisplay italic font-medium text-[13.5px] sm:text-[14.5px] text-white leading-snug mt-0.5 truncate">
                            {bank.accountName}
                          </p>
                        </div>

                        {/* Button Salin */}
                        <button
                          type="button"
                          onClick={() => handleCopy(key, bank.accountNumber)}
                          className="shrink-0 rounded-full bg-white hover:bg-white/95 active:scale-95 text-[#4A3C2F] px-3.5 py-1 sm:py-1.5 text-[12px] sm:text-[12.5px] font-serifDisplay font-semibold shadow-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                          aria-label={`Salin nomor rekening ${bank.bankName}`}
                        >
                          {isCopied ? (
                            <>
                              <span className="text-emerald-700 font-bold">✓</span>
                              <span className="text-emerald-700 font-bold">Tersalin</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-3.5 h-3.5 fill-none stroke-current stroke-2 text-[#4A3C2F]"
                                viewBox="0 0 24 24"
                              >
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Kartu Kado Fisik */}
                {kirimKado && (
                  <div
                    style={{
                      background:
                        'linear-gradient(135deg, #8E745A 0%, #634C36 42%, #7B634C 72%, #503926 100%)',
                    }}
                    className="relative w-full min-h-[195px] sm:min-h-[205px] rounded-[20px] sm:rounded-[22px] p-4 sm:p-4.5 shadow-[0_10px_28px_rgba(0,0,0,0.3)] border border-[#C2A78E]/60 overflow-hidden text-left transition-transform duration-300 hover:-translate-y-0.5 select-none"
                  >
                    {/* Satin waves decoration */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
                      <svg
                        className="w-full h-full"
                        preserveAspectRatio="none"
                        viewBox="0 0 350 200"
                        fill="none"
                      >
                        <path
                          d="M-40,210 Q100,50 260,110 T420,10"
                          stroke="rgba(255,255,255,0.6)"
                          strokeWidth="48"
                          strokeLinecap="round"
                        />
                        <path
                          d="M-20,140 Q120,20 290,70 T420,-20"
                          stroke="rgba(255,255,255,0.35)"
                          strokeWidth="32"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.22),transparent_55%)] pointer-events-none" />

                    {/* Header: Judul Kado & White Gift Box Icon */}
                    <div className="relative z-10 flex items-center justify-between w-full mb-3">
                      <h4 className="font-serifDisplay font-bold text-2xl sm:text-[26px] text-white tracking-wide leading-none">
                        Kado
                      </h4>

                      {/* Solid White Gift Box Icon */}
                      <svg
                        className="w-8 h-8 sm:w-9 sm:h-9 text-white fill-current shrink-0 drop-shadow-sm"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 7h-2.58A4.98 4.98 0 0012 3a4.98 4.98 0 00-5.42 4H4a2 2 0 00-2 2v2a2 2 0 002 2h1v7a2 2 0 002 2h10a2 2 0 002-2v-7h1a2 2 0 002-2V9a2 2 0 00-2-2zm-9-2a3 3 0 013 3h-6a3 3 0 013-3zm-6 4h5v2H5V9zm2 4h4v7H7v-7zm10 7h-4v-7h4v7zm2-9h-5V9h5v2z" />
                      </svg>
                    </div>

                    {/* Body: Nama Penerima, Alamat, and Salin Button */}
                    <div className="relative z-10 flex items-end justify-between w-full mt-2">
                      <div className="text-left flex-1 min-w-0 pr-2">
                        <p className="font-serifDisplay text-[12px] sm:text-[13px] font-medium text-white/90 leading-tight">
                          Nama Penerima
                        </p>
                        <p className="font-serifDisplay font-semibold text-[13.5px] sm:text-[14.5px] text-white leading-snug mt-0.5">
                          {kirimKado.receiver}
                        </p>
                        {kirimKado.phone && (
                          <p className="font-sansBody italic text-[11.5px] sm:text-[12px] text-white/90 leading-tight mt-0.5">
                            ( {kirimKado.phone} )
                          </p>
                        )}
                        <p className="font-serifDisplay text-[12px] sm:text-[13px] font-medium text-white/90 leading-tight mt-2">
                          Alamat Penerima
                        </p>
                        <p className="font-serifDisplay italic text-[12px] sm:text-[12.5px] text-white/95 leading-relaxed mt-0.5 max-w-[200px] sm:max-w-[220px]">
                          {kirimKado.address}
                        </p>
                      </div>

                      {/* Button Salin Alamat */}
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            'kado',
                            `${kirimKado.receiver}\n${kirimKado.phone ? `(${kirimKado.phone})\n` : ''}${kirimKado.address}`
                          )
                        }
                        className="shrink-0 rounded-full bg-white hover:bg-white/95 active:scale-95 text-[#4A3C2F] px-3.5 py-1 sm:py-1.5 text-[12px] sm:text-[12.5px] font-serifDisplay font-semibold shadow-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                        aria-label="Salin alamat penerima"
                      >
                        {copiedKey === 'kado' ? (
                          <>
                            <span className="text-emerald-700 font-bold">✓</span>
                            <span className="text-emerald-700 font-bold">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-3.5 h-3.5 fill-none stroke-current stroke-2 text-[#4A3C2F]"
                              viewBox="0 0 24 24"
                            >
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Sembunyikan Rekening Toggle */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCards(false)}
                    className="text-[12px] font-serifDisplay text-[#6B5542] hover:text-[#4A3C35] underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    Sembunyikan Rekening
                  </button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
