import Link from "next/link";
import Image from "next/image";

export default function OmniSearchFeature() {
  return (
    <section className="w-full py-16 md:py-24" style={{ backgroundColor: "var(--menu-bg, #1a1a2e)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left side: Image */}
          <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-2xl">
            <Image 
              src="/uploads/omni_search_lab_no_text.webp" 
              alt="Omni-Search Engine Laboratory" 
              fill
              className="object-cover"
            />
          </div>

          {/* Right side: Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <span className="font-bold tracking-widest text-sm mb-4 uppercase" style={{ color: "var(--teal)" }}>
              OMNI-SEARCH
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Explore new indications<br />
              <span style={{ color: "var(--teal)" }}>for approved drugs.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Screen your molecule portfolio for candidate indications, with ranked results and evidence dossiers.
            </p>
            <Link 
              href="/omni-search" 
              className="inline-flex items-center gap-3 text-white font-extrabold py-3.5 px-8 rounded-md transition-colors text-lg bg-[var(--teal)] hover:bg-[var(--teal-dark)]"
            >
              Learn more
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
