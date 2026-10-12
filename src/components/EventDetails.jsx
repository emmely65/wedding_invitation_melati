import Reveal from './Reveal.jsx';

function parseEventDate(dayDateStr, dayStr) {
  const parts = (dayDateStr || '').trim().split(' ');
  const dayNum = parts[0] || '25';
  const monthYear = parts.slice(1).join(' ').toUpperCase() || 'OKTOBER 2026';
  const dayName = dayStr || 'Minggu';
  return { dayName, dayNum, monthYear };
}

function formatAddress(address = '') {
  if (!address) return '';
  if (address.includes('\n')) return address;
  if (address.includes('Tunggulrejo')) {
    return 'Ds. Tunggulrejo RT 12 RW 04\nKec. Singgahan, Kab. Tuban';
  }
  if (address.includes('Cokroaminoto')) {
    return 'Jl. HOS Cokroaminoto No. 1\nPacul, Bojonegoro';
  }
  const parts = address.split(',').map((s) => s.trim());
  if (parts.length >= 3) {
    return `${parts[0]}\n${parts.slice(1).join(', ')}`;
  }
  if (parts.length === 2) {
    return `${parts[0]}\n${parts[1]}`;
  }
  return address;
}

function EventCard({ event }) {
  const { dayName, dayNum, monthYear } = parseEventDate(event.dayDate, event.day);
  const displayTitle = (event.title || '')
    .replace(/ Pernikahan$/i, '')
    .toUpperCase();
  const isCompactTitle =
    event.id === 'ngunduh-mantu' ||
    displayTitle.length > 11;

  return (
    <Reveal className="w-full mb-8 sm:mb-10 last:mb-0">
      <div
        style={{
          backgroundImage: "url('/images/background-cover-07.jpg')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="relative w-full max-w-[345px] sm:max-w-[370px] min-h-[590px] sm:min-h-[630px] rounded-[28px] sm:rounded-[32px] shadow-[0_14px_45px_rgba(0,0,0,0.35)] overflow-hidden text-center flex flex-col items-center justify-start pt-11 sm:pt-13 pb-10 sm:pb-12 px-5 sm:px-7 mx-auto border border-[#BFA07A]/50"
      >
        {/* 1. Header Acara */}
        <div className="w-full flex flex-col items-center">
          <h3
            className={`font-serifDisplay font-bold uppercase leading-tight text-[#3B1F0E] max-w-[215px] sm:max-w-[240px] text-center ${
              isCompactTitle
                ? 'text-[16px] sm:text-[18px] tracking-[0.05em] sm:tracking-[0.07em]'
                : 'text-[20px] sm:text-[22px] tracking-[0.18em]'
            }`}
          >
            {displayTitle}
          </h3>
          <div className="my-2 w-3/4 max-w-[150px] h-[1px] bg-[#8C6A48]/40 mx-auto" />
        </div>

        {/* 2. Hari, Tanggal, Jam (~1 cm di bawah Header Acara) */}
        <div className="w-full flex flex-col items-center mt-6 sm:mt-7">
          <p className="font-greatVibes text-[36px] sm:text-[42px] text-[#683B1A] leading-none select-none font-normal">
            {dayName}
          </p>
          <p className="font-serifDisplay font-bold text-[50px] sm:text-[56px] text-[#683B1A] leading-[0.88] my-1 tracking-tight">
            {dayNum}
          </p>
          <p className="font-serifDisplay font-bold text-[13.5px] sm:text-[15px] tracking-[0.2em] text-[#3B1F0E] uppercase leading-none mt-1">
            {monthYear}
          </p>

          <div className="inline-flex items-center justify-center gap-1.5 mt-2.5 text-[#3B1F0E]">
            <svg
              className="h-4 w-4 text-[#683B1A] shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-serifDisplay text-[13.5px] sm:text-[15px] font-bold tracking-wide leading-none">
              {event.time}
            </span>
          </div>
        </div>

        {/* 3. Lokasi & Google Maps (~1 cm di bawah Teks Waktu) */}
        <div className="w-full flex flex-col items-center mt-7 sm:mt-8">
          <p className="font-serifDisplay text-[14px] sm:text-[15px] font-bold text-[#3B1F0E] tracking-wider uppercase leading-none">
            Lokasi Acara
          </p>
          <p className="font-serifDisplay text-[14px] sm:text-[15px] font-bold text-[#522E13] mt-1.5 leading-snug max-w-[220px] mx-auto text-center">
            {event.place}
          </p>
          <p className="font-sansBody text-[12px] sm:text-[13px] text-[#553C2D] font-medium mt-1 leading-snug max-w-[215px] sm:max-w-[230px] mx-auto text-center whitespace-pre-line">
            {formatAddress(event.address)}
          </p>

          <div className="mt-3 sm:mt-3.5">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#683B1A] px-5 py-2 text-[13px] sm:text-[14px] font-serifDisplay font-bold text-white shadow-md transition duration-200 hover:scale-105 active:scale-95 hover:bg-[#522E13] border border-[#A87B56]/40"
            >
              <svg
                className="h-3.5 w-3.5 text-white fill-current shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
              </svg>
              <span className="tracking-wide leading-none">
                Google Maps
              </span>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function EventDetails({ events = [] }) {
  return (
    <section
      id="events"
      className="relative z-10 w-full bg-[#683B1A] px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center overflow-hidden border-b border-[#7A4B26]/30"
    >
      <div className="w-full max-w-md flex flex-col items-center">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
