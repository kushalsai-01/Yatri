/* ═══════════════════════════════════════════
 * Screen 4 — Success
 * Animated check, ticket confirmation, auto-return
 * ═══════════════════════════════════════════ */
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface SuccessScreenProps {
  ticketId: string;
  passengers: number;
  amount: number;
  destination: string;
  onNewTicket: () => void;
}

export default function SuccessScreen({
  ticketId, passengers, amount, destination, onNewTicket,
}: SuccessScreenProps) {
  // Auto-return to Screen 1 after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onNewTicket, 3000);
    return () => clearTimeout(timer);
  }, [onNewTicket]);

  const chips = [
    { label: 'Passengers', value: passengers.toString(), icon: '👥' },
    { label: 'Collected', value: `₹${amount}`, icon: '💰' },
    { label: 'Destination', value: destination, icon: '📍' },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full bg-bg px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ─── Animated Success Ring ─── */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" className="mb-6">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="var(--green)"
            strokeWidth="3"
            className="success-circle"
          />
          <polyline
            points="30,52 44,65 70,38"
            fill="none"
            stroke="var(--green)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="success-check"
          />
        </svg>
      </motion.div>

      {/* ─── Title ─── */}
      <motion.h1
        className="text-green text-3xl font-extrabold tracking-tight mb-2"
        style={{ fontFamily: 'var(--font-barlow-condensed)' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        TICKET ISSUED
      </motion.h1>

      {/* Ticket ID */}
      <motion.p
        className="text-text-muted text-sm font-bold mb-6"
        style={{ fontFamily: 'var(--font-space-mono)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {ticketId}
      </motion.p>

      {/* ─── Meta Chips ─── */}
      <motion.div
        className="flex gap-3 mb-8 w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {chips.map((chip) => (
          <div
            key={chip.label}
            className="flex-1 bg-surface border border-border rounded-xl p-3 text-center"
          >
            <div className="text-lg mb-1">{chip.icon}</div>
            <div
              className="text-text text-sm font-bold"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              {chip.value}
            </div>
            <div className="text-text-muted text-[11px] mt-0.5">{chip.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Printing subtitle */}
      <motion.p
        className="text-text-muted text-sm mb-6 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
      >
        <span className="inline-block w-2 h-2 rounded-full bg-green animate-pulse" />
        Printing…
      </motion.p>

      {/* ─── New Ticket CTA ─── */}
      <motion.button
        className="w-full h-14 rounded-xl bg-surface2 border border-border text-text font-bold text-lg tracking-wide press-scale flex items-center justify-center gap-2"
        style={{ fontFamily: 'var(--font-barlow-condensed)' }}
        onClick={onNewTicket}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        whileTap={{ scale: 0.96 }}
      >
        NEW TICKET +
      </motion.button>

      {/* Auto-return hint */}
      <motion.p
        className="text-text-muted text-xs mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Auto-returning in 3s…
      </motion.p>
    </motion.div>
  );
}
