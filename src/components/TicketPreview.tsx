/* ═══════════════════════════════════════════
 * Screen 3 — Ticket Preview / Confirm
 * Realistic ticket card with issue action
 * ═══════════════════════════════════════════ */
'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type Stop, type RouteId, ROUTES } from '@/data/routes';
import { generateTicketId } from '@/lib/storage';

interface TicketPreviewProps {
  route: RouteId;
  stop: Stop;
  adults: number;
  children: number;
  seniors: number;
  total: number;
  onBack: () => void;
  onIssue: (ticketId: string) => void;
}

/** Generates decorative barcode bars — hydration-safe (only renders client-side) */
function Barcode() {
  const [bars, setBars] = useState<Array<{ w: number; h: number; gap: number }>>([]);

  useEffect(() => {
    const result = [];
    for (let i = 0; i < 50; i++) {
      const w = Math.random() > 0.5 ? 2 : 1;
      const h = 24 + Math.floor(Math.random() * 16);
      result.push({ w, h, gap: Math.random() > 0.7 ? 2 : 1 });
    }
    setBars(result);
  }, []);

  if (bars.length === 0) return <div className="h-10" />;

  return (
    <div className="flex items-end justify-center gap-px h-10">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="barcode-line opacity-30"
          style={{ width: bar.w, height: bar.h, marginRight: bar.gap }}
        />
      ))}
    </div>
  );
}

export default function TicketPreview({
  route, stop, adults, children, seniors, total, onBack, onIssue,
}: TicketPreviewProps) {
  const ticketId = useMemo(() => generateTicketId(), []);
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const depot = ROUTES[route].depot;

  const passengerBadges = [];
  if (adults > 0) passengerBadges.push({ label: `${adults} Adult`, color: 'text-text' });
  if (children > 0) passengerBadges.push({ label: `${children} Child`, color: 'text-blue' });
  if (seniors > 0) passengerBadges.push({ label: `${seniors} Sr/Div`, color: 'text-green' });

  return (
    <motion.div
      className="flex flex-col h-full bg-bg"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-3">
        <motion.button
          className="w-10 h-10 rounded-full bg-surface2 border border-border flex items-center justify-center press-scale"
          onClick={onBack}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-text">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <h2
          className="text-text text-lg font-bold"
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
        >
          Review Ticket
        </h2>
      </div>

      {/* ─── Ticket Card ─── */}
      <div className="flex-1 flex items-start justify-center px-4 pt-2">
        <motion.div
          className="w-full max-w-sm rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* Ticket Header — amber */}
          <div className="bg-amber px-5 py-4">
            <div className="flex items-start justify-between">
              <div>
                <span
                  className="text-bg text-sm font-bold tracking-wider uppercase opacity-80"
                  style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                >
                  BMTC
                </span>
                <h3
                  className="text-bg text-3xl font-extrabold leading-tight mt-0.5"
                  style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                >
                  {route}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-bg text-sm font-semibold opacity-80">{dateStr}</p>
                <p
                  className="text-bg text-xl font-bold"
                  style={{ fontFamily: 'var(--font-space-mono)' }}
                >
                  {timeStr}
                </p>
              </div>
            </div>
            <p
              className="text-bg text-lg font-bold mt-1 opacity-90"
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            >
              → {stop.name}
            </p>
          </div>

          {/* Ticket Body */}
          <div className="bg-surface2 px-5 py-4">
            {/* From → To */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-muted">From</span>
              <span className="text-text font-medium">{depot}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-text-muted">To</span>
              <span className="text-text font-medium">{stop.name}</span>
              <span className={`zone-badge zone-${stop.zone} ml-auto`}>Zone {stop.zone}</span>
            </div>

            <hr className="ticket-divider" />

            {/* Passenger Breakdown */}
            <div className="flex flex-wrap gap-2 mb-3">
              {passengerBadges.map((badge) => (
                <span
                  key={badge.label}
                  className={`px-2.5 py-1 rounded-lg bg-surface3 text-xs font-semibold ${badge.color}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Total Amount */}
            <div className="flex items-end justify-between">
              <span className="text-text-muted text-sm">Total Amount</span>
              <span
                className="text-amber text-[28px] font-bold leading-none"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                ₹{total}
              </span>
            </div>
          </div>

          {/* Perforated Divider */}
          <div className="perforated bg-surface2">
            <hr className="ticket-divider mx-5" />
          </div>

          {/* Ticket Footer */}
          <div className="bg-surface2 px-5 pb-5 pt-2">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-text-muted text-xs font-bold tracking-wider"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                {ticketId}
              </span>
              <span className="text-text-muted text-xs">
                {stop.km} km · ₹{stop.fare}/adult
              </span>
            </div>
            <Barcode />
          </div>
        </motion.div>
      </div>

      {/* ─── Issue CTA ─── */}
      <div className="p-4">
        <motion.button
          className="w-full h-14 rounded-xl bg-green text-bg font-bold text-lg tracking-wide press-scale flex items-center justify-center gap-2"
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          onClick={() => onIssue(ticketId)}
          whileTap={{ scale: 0.96 }}
        >
          <span className="text-xl">🖨</span> ISSUE & PRINT
        </motion.button>
      </div>
    </motion.div>
  );
}
