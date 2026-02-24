/* ═══════════════════════════════════════════
 * Desktop Presentation Panel
 * Shown alongside the phone shell on screens ≥ 900px
 * ═══════════════════════════════════════════ */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DesktopPanelProps {
  currentScreen: number;
  onJumpScreen: (screen: number) => void;
  onToggleThumbZone: () => void;
  thumbZoneVisible: boolean;
}

const SCREEN_LABELS = [
  'Shift Start',
  'Destination',
  'Passengers',
  'Preview',
  'Success',
  'Summary',
];

const RATIONALE_CARDS = [
  {
    title: 'One-Handed Reachability',
    icon: '👆',
    description:
      'All interactive elements are placed in the bottom 55% of the viewport — the thumb zone. Conductors hold the device in one hand while dealing with passengers, so every tap must be reachable without grip shifts.',
  },
  {
    title: 'Sub-4-Second Flow',
    icon: '⚡',
    description:
      'The critical path (select stop → set count → issue) requires just 3 taps. Frequent-stops chips and remembered patterns via localStorage reduce cognitive load to near-zero for repeat destinations.',
  },
  {
    title: 'Glanceable in Glare',
    icon: '☀️',
    description:
      'Amber (#F5A623) on deep black (#0D0F0F) achieves a 12.4:1 contrast ratio — exceeding WCAG AAA. Chosen specifically for outdoor readability on crowded, sun-exposed buses.',
  },
  {
    title: 'Interaction Feedback',
    icon: '🎯',
    description:
      'Every tap produces scale(0.96) micro-feedback in 80ms. Count changes use spring animations. CTAs pulse when actionable. This confirms intent without requiring the user to look up from the device.',
  },
  {
    title: 'Assumptions & Scope',
    icon: '📋',
    description:
      'Built for BMTC Bangalore conductors. Fares are hardcoded per route. Seniors/Divyaang ride free per BMTC policy. No network required — all data is client-side. Designed for Android devices (320–430px width).',
  },
];

export default function DesktopPanel({
  currentScreen,
  onJumpScreen,
  onToggleThumbZone,
  thumbZoneVisible,
}: DesktopPanelProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="hidden lg:flex flex-col w-[380px] max-w-[380px] p-8 overflow-y-auto h-full">
      {/* ─── App Info ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1
          className="text-amber text-5xl font-extrabold tracking-tight leading-none mb-2"
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
        >
          YĀTRI
        </h1>
        <p className="text-text-muted text-sm leading-relaxed mb-8">
          A digital ticketing companion for BMTC bus conductors — designed for
          speed, one-handed use, and outdoor readability.
        </p>
      </motion.div>

      {/* ─── Flow Stepper ─── */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-text-muted text-xs uppercase tracking-wider mb-3 font-semibold">
          Current Flow
        </p>
        <div className="flex items-center gap-1">
          {SCREEN_LABELS.slice(0, 5).map((label, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <button
                className={`stepper-dot ${currentScreen === idx ? 'active' : 'inactive'}`}
                onClick={() => onJumpScreen(idx)}
                title={label}
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                {idx}
              </button>
              {idx < 4 && <div className="stepper-line" />}
            </div>
          ))}
        </div>
        <p className="text-text text-sm mt-2 font-medium">
          {SCREEN_LABELS[currentScreen] || 'Unknown'}
        </p>
      </motion.div>

      {/* ─── Thumb Zone Toggle ─── */}
      <motion.button
        className={`mb-6 px-4 py-3 rounded-xl border text-sm font-semibold press-scale transition-all ${
          thumbZoneVisible
            ? 'bg-amber-glow border-amber text-amber'
            : 'bg-surface border-border text-text-muted hover:text-text'
        }`}
        onClick={onToggleThumbZone}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
      >
        {thumbZoneVisible ? '✋ Hide Thumb Zone' : '✋ Show Thumb Zone'}
      </motion.button>

      {/* ─── Design Rationale Cards ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-text-muted text-xs uppercase tracking-wider mb-3 font-semibold">
          Design Rationale
        </p>
        <div className="flex flex-col gap-2">
          {RATIONALE_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              className="bg-surface border border-border rounded-xl overflow-hidden cursor-pointer press-scale"
              onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
              layout
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="text-lg">{card.icon}</span>
                <span className="text-text text-sm font-semibold flex-1" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
                  {card.title}
                </span>
                <svg
                  width="14" height="14"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  className={`text-text-muted transition-transform ${expandedCard === idx ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              <AnimatePresence>
                {expandedCard === idx && (
                  <motion.div
                    className="px-4 pb-3"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-text-muted text-xs leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── Footer ─── */}
      <div className="mt-8 pt-4 border-t border-border">
        <p className="text-text-muted text-xs">
          Built with Next.js · Tailwind CSS · Framer Motion
        </p>
        <p className="text-text-muted text-xs mt-1">
          A portfolio piece by a product-minded engineer.
        </p>
      </div>
    </div>
  );
}
