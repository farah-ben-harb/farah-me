import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { focusAreas, tr, type Locale } from "@/lib/portfolio-copy";

const labels = [
  ["Cloud", "Cloud"],
  ["DevOps", "DevOps"],
  ["MLOps", "MLOps"],
] as const;

function AtlasDiagram() {
  return (
    <svg className="atlas-visual" viewBox="0 0 460 300" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="atlas-surface" x1="0" x2="1" y1="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#526e43" />
          <stop offset="1" stopColor="#1a3b2c" />
        </linearGradient>
        <radialGradient id="atlas-grid-fade" cx=".5" cy=".5" r=".55">
          <stop offset=".4" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </radialGradient>
        <mask id="atlas-horizon"><rect width="460" height="300" fill="url(#atlas-grid-fade)" /></mask>
        <pattern id="atlas-grid" width="60" height="30" patternUnits="userSpaceOnUse">
          <path d="M-30 15 0 0 60 30 90 15 M-30 15 0 30 60 0 90 15" stroke="#63856c" strokeWidth=".7" opacity=".52" />
        </pattern>
      </defs>
      <rect x="5" width="450" height="300" fill="url(#atlas-grid)" mask="url(#atlas-horizon)" />

      <g className="atlas-circuit" strokeLinejoin="round">
        <path d="M118 132 198 173 312 116 M312 116 398 159 247 235 198 210 M118 132 71 156 146 193 M247 235 305 264 372 230" className="atlas-trace" />
        <path pathLength="100" d="M118 132 198 173 312 116 398 159 247 235 305 264 372 230" className="atlas-signal" />
        <path d="m198 173 22 11 31-16m119 62 16-8M71 156l-15 8" stroke="#7e9e78" opacity=".7" />
        <g fill="#f2bf90">
          <circle cx="198" cy="173" r="3" /><circle cx="398" cy="159" r="3" />
          <circle cx="305" cy="264" r="3" /><circle cx="71" cy="156" r="2.5" />
        </g>
      </g>

      <g transform="translate(123 108)" className="atlas-node atlas-node-cloud">
        <path className="atlas-plinth" d="M-65 22 0-11 65 22 0 55Z" />
        <g strokeLinejoin="round">
          <path d="M-48 3 0-21 48 3v12L0 39-48 15Z" fill="#172f25" stroke="#759760" />
          <path d="M-48 3 0 27 48 3M0 27v12" stroke="#759760" />
          <path d="M-48-25 0-49 48-25v12L0 11-48-13Z" fill="url(#atlas-surface)" stroke="#a7c785" />
          <path d="M-48-25 0-1 48-25M0-1v12M-30-23-4-36m5 27 30-15" stroke="#afcc8e" />
          <path d="m16 4 4-2m5-2 4-2m5-2 4-2m-22 36 4-2m5-2 4-2m5-2 4-2" stroke="#d7ef9d" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M-48-25v-11m48-13v-12m48 36v-11" stroke="#9ebe7a" strokeDasharray="2 3" />
        </g>
        <text x="-77" y="-42">01</text>
      </g>

      <g transform="translate(307 112)" className="atlas-node atlas-node-delivery">
        <path className="atlas-plinth" d="M-76 10 0-29 76 10 0 49Z" />
        <ellipse cy="1" rx="42" ry="22" fill="#19362b" stroke="#7f9f76" />
        <ellipse cy="-19" rx="42" ry="22" fill="url(#atlas-surface)" stroke="#a7c785" />
        <path d="M-42-19v20M42-19v20" stroke="#78966a" />
        <ellipse cy="-19" rx="29" ry="15" stroke="#bad599" strokeDasharray="3 4" />
        <path d="m-14-19 9 5 19-10" stroke="#f2bf90" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M0-43v-13m-5 4 5-4 5 4" stroke="#b2cd96" strokeLinecap="round" />
        <text x="58" y="-38">02</text>
      </g>

      <g transform="translate(247 222)" className="atlas-node atlas-node-model">
        <path className="atlas-plinth" d="M-66 13 0-20 66 13 0 46Z" />
        <path d="M-47-1 0-25 47-1v10L0 33-47 9Z" fill="#183328" stroke="#809e71" strokeLinejoin="round" />
        <path d="M-47-1 0 23 47-1M0 23v10" stroke="#809e71" />
        <path d="M-29-11 0-26 29-11 0 4Z" fill="url(#atlas-surface)" stroke="#afcc8e" />
        <path d="M-28-26 0-41 28-26 0-12Z" fill="#6a854b" stroke="#d7ef9d" />
        <path d="M-28-26v11L0 0l28-15v-11M0-12V0" stroke="#b2cd96" />
        <path d="M-8-26 0-30l8 4-8 4Z" fill="#f2bf90" />
        <path d="M-36 15v6m72-6v6M-16 26v6m32-6v6" stroke="#a7c785" />
        <text x="65" y="-14">03</text>
      </g>

      <path d="M28 40v-8h8m389 0h8v8M28 261v8h8m389 0h8v-8" stroke="#7a9a72" strokeLinecap="round" opacity=".75" />
      <path d="M84 215h10m-5-5v10m304-99h10m-5-5v10M203 56h10m-5-5v10" stroke="#b2cd96" opacity=".65" />
    </svg>
  );
}

export function PlatformAtlas({ locale }: { locale: Locale }) {
  const title = tr(locale, ["Carte des systèmes", "Systems map"]);
  return (
    <aside className="atlas" aria-label={title}>
      <div className="atlas-heading">
        <p className="eyebrow"><span className="signal" /> {title}</p>
        <span aria-hidden="true">FIG. 01</span>
      </div>
      <AtlasDiagram />
      <ol className="atlas-links">
        {focusAreas.map((area, index) => (
          <li key={area.href}>
            <a href={area.href} aria-label={tr(locale, area.label)}>
              <span className="atlas-index" aria-hidden="true">0{index + 1}</span>
              <strong>{tr(locale, labels[index])}</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
