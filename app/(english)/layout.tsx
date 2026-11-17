import { PortfolioLayout, portfolioMetadata, portfolioViewport } from "@/components/portfolio-layout";

export const metadata = portfolioMetadata("en");
export const viewport = portfolioViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <PortfolioLayout locale="en">{children}</PortfolioLayout>;
}
