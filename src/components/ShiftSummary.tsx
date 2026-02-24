/* ═══════════════════════════════════════════
 * Screen 5 — Shift Summary
 * Stats, hourly chart, end-shift action
 * ═══════════════════════════════════════════ */
'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  getShiftData,
  getFrequentStops,
  getHourlyTickets,
  endShift,
} from '@/lib/storage';

interface ShiftSummaryProps {
  onBack: () => void;
  onEndShift: () => void;
}

export default function ShiftSummary({ onBack, onEndShift }: ShiftSummaryProps) {
  const shiftData = getShiftData();
  const frequentStops = getFrequentStops(5);
  const hourlyTickets = getHourlyTickets();

  // Find busiest stop
  const busiestStop = frequentStops.length > 0 ? frequentStops[0] : null;

  // Prepare hourly chart data (6 AM to 10 PM = typical bus hours)
  const chartData = useMemo(() => {
    const hours = [];
    for (let h = 6; h <= 22; h++) {
      hours.push({
        hour: h,
        label: `${h % 12 || 12}${h < 12 ? 'a' : 'p'}`,
        count: hourlyTickets[h] || 0,
      });
    }
    return hours;
  }, [hourlyTickets]);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  const handleEndShift = () => {
    endShift();
    onEndShift();
  };

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
          Shift Summary
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* ─── Stats Cards ─── */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            className="bg-surface border border-border rounded-xl p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Tickets Issued</p>
            <p
              className="text-amber text-2xl font-bold"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              {shiftData?.ticketsIssued ?? 0}
            </p>
          </motion.div>

          <motion.div
            className="bg-surface border border-border rounded-xl p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Total Revenue</p>
            <p
              className="text-green text-2xl font-bold"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              ₹{shiftData?.totalRevenue ?? 0}
            </p>
          </motion.div>

          <motion.div
            className="bg-surface border border-border rounded-xl p-4 col-span-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Busiest Stop</p>
            <p className="text-text text-base font-semibold" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
              {busiestStop ? `${busiestStop.name} (${busiestStop.count} tickets)` : 'No data yet'}
            </p>
          </motion.div>
        </div>

        {/* ─── Hourly Chart (CSS, no library) ─── */}
        <motion.div
          className="bg-surface border border-border rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p className="text-text-muted text-xs uppercase tracking-wider mb-4 font-semibold">
            Hourly Ticket Volume
          </p>
          <div className="flex items-end gap-1 h-32">
            {chartData.map((d) => (
              <div key={d.hour} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center" style={{ height: '100px' }}>
                  <div
                    className="chart-bar w-full"
                    style={{
                      height: d.count > 0 ? `${Math.max(8, (d.count / maxCount) * 100)}%` : '4px',
                      background: d.count > 0 ? 'var(--amber)' : 'var(--surface3)',
                      minHeight: d.count > 0 ? '8px' : '4px',
                    }}
                  />
                </div>
                <span className="text-text-muted text-[9px]">{d.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Frequent Stops List ─── */}
        {frequentStops.length > 0 && (
          <motion.div
            className="bg-surface border border-border rounded-xl p-4 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-text-muted text-xs uppercase tracking-wider mb-3 font-semibold">
              Top Destinations
            </p>
            {frequentStops.map((stop, idx) => (
              <div key={stop.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-amber text-xs font-bold w-5" style={{ fontFamily: 'var(--font-space-mono)' }}>
                    #{idx + 1}
                  </span>
                  <span className="text-text text-sm font-medium" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
                    {stop.name}
                  </span>
                </div>
                <span className="text-text-muted text-xs" style={{ fontFamily: 'var(--font-space-mono)' }}>
                  {stop.count} tickets
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* ─── End Shift CTA ─── */}
      <div className="p-4 border-t border-border">
        <motion.button
          className="w-full h-14 rounded-xl bg-red text-text font-bold text-lg tracking-wide press-scale"
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          onClick={handleEndShift}
          whileTap={{ scale: 0.96 }}
        >
          END SHIFT
        </motion.button>
      </div>
    </motion.div>
  );
}
