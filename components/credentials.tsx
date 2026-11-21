import { ArrowUpRight, Certificate } from "@phosphor-icons/react/dist/ssr";
import { tr, type Locale } from "@/lib/portfolio-copy";

type Credential = readonly [name: string, year: string, fr: string, en: string, url?: string];
const groups: readonly (readonly [string, string, readonly Credential[]])[] = [
  [
    "Cloud",
    "Cloud",
    [
      [
        "AWS Academy Cloud Operations",
        "2026",
        "Badge de formation · 40 h",
        "Training badge · 40 hours",
        "https://www.credly.com/go/DufCSSeB"
      ],
      [
        "AWS Academy Cloud Security Foundations",
        "2026",
        "Badge de formation · 20 h",
        "Training badge · 20 hours",
        "https://www.credly.com/go/nvGPvCtH"
      ],
      [
        "AWS Cloud Practitioner",
        "2024",
        "Mention CV",
        "Listed on résumé"
      ],
      [
        "OCI Foundations Associate",
        "2024",
        "Mention CV",
        "Listed on résumé"
      ]
    ]
  ],
  [
    "Réseaux",
    "Networking",
    [
      [
        "Cisco NetAcad Network Security",
        "2026",
        "Formation Cisco",
        "Cisco course"
      ],
      [
        "CCNA SRWE",
        "2023",
        "Formation Cisco",
        "Cisco course"
      ],
      [
        "Multicloud Network Associate",
        "2024",
        "Mention CV",
        "Listed on résumé"
      ]
    ]
  ],
  [
    "Blockchain",
    "Blockchain",
    [
      [
        "Hedera Certified Developer Associate (HCDA)",
        "2026",
        "Attestation de formation",
        "Certificate of completion"
      ],
      [
        "Hedera Certified Foundation (HCF)",
        "2026",
        "Attestation de formation",
        "Certificate of completion"
      ],
      [
        "Hedera Business Foundation (HBF)",
        "2026",
        "Attestation de formation",
        "Certificate of completion"
      ]
    ]
  ]
];

export function Credentials({ locale }: { locale: Locale }) {
  return (
    <div className="education-grid">
      {groups.map(([fr, en, entries]) => (
        <article className="education-card credential-card" key={en}>
          <h3><Certificate aria-hidden="true" /> {tr(locale, [fr, en])}</h3>
          <ul>
            {entries.map(([name, year, kindFr, kindEn, url]) => (
              <li key={name}>
                <strong>{name}</strong>
                <p className="education-detail">{year} · {tr(locale, [kindFr, kindEn])}</p>
                {url && <a className="text-link" href={url} aria-label={tr(locale, [`Voir le badge ${name}`, `View ${name} badge`])}>Credly <ArrowUpRight aria-hidden="true" /></a>}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
