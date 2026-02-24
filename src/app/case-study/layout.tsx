import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YĀTRI — Design Case Study',
  description:
    'A comprehensive design case study explaining every layout, typography, color, and interaction decision behind YĀTRI — a digital ticketing companion for BMTC bus conductors.',
};

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
