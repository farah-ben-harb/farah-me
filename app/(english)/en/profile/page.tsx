import type { Metadata } from "next";
import { Profile } from "@/components/profile";

export const metadata: Metadata = { title: "Profile | Farah Ben Harb", alternates: { canonical: "/en/profile", languages: { fr: "/profile", en: "/en/profile" } } };
export default function ProfilePage() { return <Profile locale="en" />; }
