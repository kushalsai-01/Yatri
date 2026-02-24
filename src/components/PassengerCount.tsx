/* ═══════════════════════════════════════════
 * Screen 2 — Passenger Count
 * Adult / Child / Senior-Divyaang steppers
 * ═══════════════════════════════════════════ */
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Stop } from '@/data/routes';

interface PassengerCountProps {
  stop: Stop;
  onBack: () => void;
  onReview: (adults: number, children: number, seniors: number, total: number) => void;
}

interface PassengerType {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  concession: number; // 0 = full fare, 0.5 = 50% off, 1 = free
}

export default function PassengerCount({ stop, onBack, onReview }: PassengerCountProps) {
  const [counts, setCounts] = useState({ adult: 0, child: 0, senior: 0 });

  const types: PassengerType[] = [
    {
      id: 'adult',
      label: 'Adult',
      sublabel: 'Full fare',
      concession: 0,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'child',
      label: 'Child (5-12)',
      sublabel: '50% off',
      concession: 0.5,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="7" r="3" />
          <path d="M12 10v4" />
          <path d="M9 21l3-7 3 7" />
        </svg>
      ),
    },
    {
      id: 'senior',
      label: 'Senior / Divyaang',
      sublabel: 'Free (BMTC)',
      concession: 1,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="5" r="3" />
          <path d="M12 8v6" />
          <path d="M8 21l2-7" />
          <path d="M16 21l-2-7" />
          <path d="M6 15h12" />
        </svg>
      ),
    },
  ];

  const totalPassengers = counts.adult + counts.child + counts.senior;
  const totalFare = useMemo(() => {
    return (
      counts.adult * stop.fare +
      counts.child * Math.round(stop.fare * 0.5) +
      counts.senior * 0 // Free per BMTC policy
    );
  }, [counts, stop.fare]);

  const updateCount = (type: string, delta: number) => {
    setCounts((prev) => ({
      ...prev,
      [type]: Math.max(0, Math.min(20, (prev[type as keyof typeof prev] || 0) + delta)),
    }));
  };

  return (
    <motion.div
      className="flex flex-col h-full bg-bg"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* ─── Header ─── */}
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
        <div>
          <h2
            className="text-text text-lg font-bold"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            Passengers
          </h2>
        </div>
      </div>

      {/* ─── Destination Banner ─── */}
      <div className="mx-4 mb-4 p-3 rounded-xl bg-surface border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider">Destination</p>
            <p className="text-text text-base font-semibold mt-0.5" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
              {stop.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-text-muted text-xs uppercase tracking-wider">Fare / Adult</p>
            <p className="text-amber text-lg font-bold mt-0.5" style={{ fontFamily: 'var(--font-space-mono)' }}>
              ₹{stop.fare}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Passenger Type Rows ─── */}
      <div className="flex-1 px-4 flex flex-col gap-3">
        {types.map((type) => {
          const count = counts[type.id as keyof typeof counts];
          const isActive = count > 0;

          return (
            <motion.div
              key={type.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                isActive
                  ? 'bg-amber-glow border-amber/30'
                  : 'bg-surface border-border'
              }`}
              layout
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-3">
                <div className={`${isActive ? 'text-amber' : 'text-text-muted'} transition-colors`}>
                  {type.icon}
                </div>
                <div>
                  <p className="text-text text-[15px] font-semibold" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
                    {type.label}
                  </p>
                  <p className="text-text-muted text-xs">{type.sublabel}</p>
                </div>
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-3">
                <motion.button
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold transition-all press-scale ${
                    count > 0
                      ? 'bg-surface3 text-text border border-border'
                      : 'bg-surface2 text-text-muted/40 border border-transparent cursor-not-allowed'
                  }`}
                  onClick={() => updateCount(type.id, -1)}
                  disabled={count === 0}
                  whileTap={count > 0 ? { scale: 0.9 } : {}}
                >
                  −
                </motion.button>

                <div className="w-8 text-center">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={count}
                      className="block text-xl font-bold text-text"
                      style={{ fontFamily: 'var(--font-space-mono)' }}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      {count}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <motion.button
                  className="w-11 h-11 rounded-xl bg-amber text-bg flex items-center justify-center text-lg font-bold press-scale"
                  onClick={() => updateCount(type.id, 1)}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Live Total Bar + CTA ─── */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="flex items-center justify-between mb-3">
          <span className="text-text-muted text-sm">
            {totalPassengers} passenger{totalPassengers !== 1 ? 's' : ''}
          </span>
          <span className="text-amber text-xl font-bold" style={{ fontFamily: 'var(--font-space-mono)' }}>
            ₹{totalFare}
          </span>
        </div>
        <motion.button
          className={`w-full h-14 rounded-xl font-bold text-lg tracking-wide transition-all press-scale ${
            totalPassengers >= 1
              ? 'bg-amber text-bg cta-pulse'
              : 'bg-surface2 text-text-muted cursor-not-allowed'
          }`}
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          disabled={totalPassengers < 1}
          onClick={() => onReview(counts.adult, counts.child, counts.senior, totalFare)}
          whileTap={totalPassengers >= 1 ? { scale: 0.96 } : {}}
        >
          {totalPassengers >= 1 ? 'REVIEW TICKET →' : 'Add Passengers'}
        </motion.button>
      </div>
    </motion.div>
  );
}
