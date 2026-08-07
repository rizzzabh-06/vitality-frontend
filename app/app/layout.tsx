import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vitality App — Authorized Security Validation",
};

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
