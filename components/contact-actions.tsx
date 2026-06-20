"use client";

import { useState } from "react";
import {
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
  Phone,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const actions = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: GithubLogo,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: LinkedinLogo,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: EnvelopeSimple,
  },
  {
    label: "Resume",
    href: "/Resume_FarahBenHarb.pdf",
    icon: FileText,
  },
] as const;

export function ContactActions() {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {actions.map(({ href, icon: Icon, label }) => (
        <Button asChild key={label} size="icon" variant="outline">
          <a
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            <Icon aria-hidden="true" />
          </a>
        </Button>
      ))}
      <Button
        type="button"
        size="icon"
        variant="outline"
        aria-label="Show phone number"
        title="Show phone number"
        onClick={() => setShowPhone((value) => !value)}
      >
        <Phone aria-hidden="true" />
      </Button>
      {showPhone ? (
        <span className="border border-emerald-950/15 bg-white/75 px-3 py-2 text-sm font-medium text-emerald-950">
          {siteConfig.phone}
        </span>
      ) : null}
    </div>
  );
}
