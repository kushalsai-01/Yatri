/* ═══════════════════════════════════════════
 * Screen 1 — Destination Select
 * Fuzzy search, frequent stops chips, full stop list
 * ═══════════════════════════════════════════ */
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Stop, type RouteId, ROUTES } from '@/data/routes';
import { getFrequentStops } from '@/lib/storage';

interface DestinationSelectProps {
  route: RouteId;
  onSelectStop: (stop: Stop) => void;
  onOpenSummary: () => void;
}

/** Simple fuzzy match — matches if all chars appear in order */
function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (q === '') return true;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

export default function DestinationSelect({ route, onSelectStop, onOpenSummary }: DestinationSelectProps) {
  const [search, setSearch] = useState('');
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  const routeData = ROUTES[route];
  const stops = routeData.stops;

  // Fuzzy filter
  const filteredStops = useMemo(
    () => stops.filter((s) => fuzzyMatch(search, s.name)),
    [stops, search]
  );

  // Get frequent stops — cross-reference with current route stops
  const frequentStops = useMemo(() => {
    const freq = getFrequentStops(5);
    const stopNames = new Set(stops.map((s) => s.name));
    return freq
      .filter((f) => stopNames.has(f.name))
      .map((f) => {
        const stop = stops.find((s) => s.name === f.name)!;
        return { ...stop, count: f.count };
      });
  }, [stops]);

  return (
    <motion.div
      className="flex flex-col h-full bg-bg"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* ─── Top Bar ─── */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <h1
            className="text-amber text-2xl font-extrabold tracking-tight"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            YĀTRI
          </h1>
          <span
            className="bg-amber text-bg text-xs font-bold px-2.5 py-1 rounded-lg"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            {route}
          </span>
        </div>
        {/* Shift Summary icon */}
        <button
          className="w-10 h-10 rounded-full bg-surface2 border border-border flex items-center justify-center press-scale"
          onClick={onOpenSummary}
          aria-label="Shift Summary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-text-muted">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        </button>
      </div>

      {/* ─── Search Bar ─── */}
      <div className="px-4 pb-3">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search stops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface border border-border text-text text-sm
                       placeholder:text-text-muted focus:outline-none focus:border-amber/50 transition-colors"
          />
        </div>
      </div>

      {/* ─── Frequent Stops Chips ─── */}
      {frequentStops.length > 0 && !search && (
        <div className="px-4 pb-3">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-2 font-semibold">
            Frequent Stops
          </p>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {frequentStops.map((stop) => (
              <motion.button
                key={stop.name}
                className={`flex-none px-3 py-2 rounded-xl border press-scale transition-all ${
                  selectedStop?.name === stop.name
                    ? 'bg-amber-glow-strong border-amber'
                    : 'bg-surface border-border'
                }`}
                onClick={() => setSelectedStop(stop)}
                whileTap={{ scale: 0.96 }}
              >
                <div className="text-text text-sm font-medium whitespace-nowrap" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
                  {stop.name}
                </div>
                <div className="text-amber text-xs font-bold mt-0.5" style={{ fontFamily: 'var(--font-space-mono)' }}>
                  ₹{stop.fare}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Stop List ─── */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <p className="text-text-muted text-xs uppercase tracking-wider mb-2 font-semibold">
          {search ? `Results (${filteredStops.length})` : 'All Stops'}
        </p>
        <div className="flex flex-col gap-1">
          <AnimatePresence>
            {filteredStops.map((stop, idx) => (
              <motion.button
                key={stop.name}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all press-scale ${
                  selectedStop?.name === stop.name
                    ? 'bg-amber-glow-strong border border-amber'
                    : 'bg-surface border border-transparent hover:border-border'
                }`}
                onClick={() => setSelectedStop(stop)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                whileTap={{ scale: 0.97 }}
                layout
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-left min-w-0">
                    <div
                      className="text-text text-[17px] font-semibold truncate"
                      style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                    >
                      {stop.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`zone-badge zone-${stop.zone}`}>
                        Zone {stop.zone}
                      </span>
                      <span className="text-text-muted text-xs">
                        {stop.km} km
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="text-amber text-base font-bold flex-none"
                  style={{ fontFamily: 'var(--font-space-mono)' }}
                >
                  ₹{stop.fare}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
          {filteredStops.length === 0 && (
            <div className="text-center py-8 text-text-muted text-sm">
              No stops match &ldquo;{search}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* ─── Bottom CTA ─── */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-bg via-bg to-transparent pt-8">
        <motion.button
          className={`w-full h-14 rounded-xl font-bold text-lg tracking-wide transition-all press-scale ${
            selectedStop
              ? 'bg-amber text-bg cta-pulse'
              : 'bg-surface2 text-text-muted cursor-not-allowed'
          }`}
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          disabled={!selectedStop}
          onClick={() => selectedStop && onSelectStop(selectedStop)}
          whileTap={selectedStop ? { scale: 0.96 } : {}}
        >
          {selectedStop ? `SELECT PASSENGERS →` : 'Tap a Stop to Continue'}
        </motion.button>
      </div>
    </motion.div>
  );
}
