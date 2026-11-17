import { PortfolioLayout, portfolioMetadata, portfolioViewport } from "@/components/portfolio-layout";

export const metadata = portfolioMetadata("fr");
export const viewport = portfolioViewport;

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <PortfolioLayout locale="fr">{children}</PortfolioLayout>;
}
