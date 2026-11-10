import {
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const actions = [
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: EnvelopeSimple,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: LinkedinLogo,
  },
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: GithubLogo,
  },
  {
    label: "Resumes",
    href: "#resumes",
    icon: FileText,
  },
] as const;

export function ContactActions() {
  return (
    <div className="flex max-w-lg flex-wrap gap-3">
      {actions.map(({ href, icon: Icon, label }) => {
        const external = href.startsWith("http");
        return (
          <Button asChild key={label} variant={label === "Email" ? "default" : "outline"}>
            <a href={href} rel={external ? "noreferrer" : undefined} target={external ? "_blank" : undefined}>
              <Icon aria-hidden="true" />
              {label}
            </a>
          </Button>
        );
      })}
    </div>
  );
}
