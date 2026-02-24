/* ═══════════════════════════════════════════
 * Screen 0 — Shift Start / Login
 * Conductor enters Employee ID + selects route
 * ═══════════════════════════════════════════ */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTE_IDS, type RouteId } from '@/data/routes';
import { getShiftData } from '@/lib/storage';

interface ShiftStartProps {
  onBeginShift: (employeeId: string, route: RouteId) => void;
}

export default function ShiftStart({ onBeginShift }: ShiftStartProps) {
  const [employeeId, setEmployeeId] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<RouteId | ''>('');
  const [showRouteDropdown, setShowRouteDropdown] = useState(false);
  const [prevStats, setPrevStats] = useState({ tickets: 0, revenue: 0 });

  // Load previous shift stats from localStorage
  useEffect(() => {
    const data = getShiftData();
    if (data) {
      setPrevStats({
        tickets: data.ticketsIssued,
        revenue: data.totalRevenue,
      });
    }
  }, []);

  const isValid = employeeId.length >= 4 && selectedRoute !== '';

  const handleKeyPress = (key: string) => {
    if (key === 'del') {
      setEmployeeId((prev) => prev.slice(0, -1));
    } else if (employeeId.length < 8) {
      setEmployeeId((prev) => prev + key);
    }
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <motion.div
      className="flex flex-col h-full bg-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header */}
      <div className="pt-12 pb-4 px-6 text-center">
        <motion.h1
          className="text-amber text-[36px] font-extrabold tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          YĀTRI
        </motion.h1>
        <motion.p
          className="text-text-muted text-sm mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Digital Ticketing Companion
        </motion.p>
      </div>

      {/* Previous shift stats */}
      {(prevStats.tickets > 0) && (
        <motion.div
          className="mx-6 mb-4 p-3 rounded-xl bg-surface border border-border flex justify-between"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-amber text-lg font-bold" style={{ fontFamily: 'var(--font-space-mono)' }}>
              {prevStats.tickets}
            </div>
            <div className="text-text-muted text-xs">Tickets Today</div>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <div className="text-amber text-lg font-bold" style={{ fontFamily: 'var(--font-space-mono)' }}>
              ₹{prevStats.revenue}
            </div>
            <div className="text-text-muted text-xs">Collected</div>
          </div>
        </motion.div>
      )}

      {/* Employee ID Display */}
      <motion.div
        className="mx-6 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="text-text-muted text-xs uppercase tracking-wider mb-2 block font-semibold">
          Employee ID
        </label>
        <div
          className="h-14 rounded-xl bg-surface border border-border flex items-center px-4 gap-1"
        >
          <span className="text-text-muted text-base mr-1" style={{ fontFamily: 'var(--font-space-mono)' }}>EMP-</span>
          <span className="text-text text-xl font-bold tracking-[0.15em]" style={{ fontFamily: 'var(--font-space-mono)' }}>
            {employeeId || ''}
          </span>
          {employeeId.length < 8 && (
            <motion.span
              className="w-0.5 h-6 bg-amber ml-0.5"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      </motion.div>

      {/* Route Selector */}
      <motion.div
        className="mx-6 mb-4 relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="text-text-muted text-xs uppercase tracking-wider mb-2 block font-semibold">
          Select Route
        </label>
        <button
          className="w-full h-14 rounded-xl bg-surface border border-border flex items-center justify-between px-4 press-scale"
          onClick={() => setShowRouteDropdown(!showRouteDropdown)}
        >
          <span className={selectedRoute ? 'text-text font-bold text-lg' : 'text-text-muted text-base'}
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            {selectedRoute || 'Tap to select route'}
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${showRouteDropdown ? 'rotate-180' : ''}`}>
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-text-muted" />
          </svg>
        </button>
        <AnimatePresence>
          {showRouteDropdown && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-1 bg-surface2 border border-border rounded-xl overflow-hidden z-10"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {ROUTE_IDS.map((routeId) => (
                <button
                  key={routeId}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-surface3 transition-colors press-scale"
                  onClick={() => {
                    setSelectedRoute(routeId);
                    setShowRouteDropdown(false);
                  }}
                >
                  <span
                    className="bg-amber text-bg text-xs font-bold px-2 py-1 rounded-md"
                    style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                  >
                    {routeId}
                  </span>
                  <span className="text-text text-sm">
                    {routeId === '500C' ? 'Vijayanagar Depot' : 'Shantinagar Depot'}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Numeric Keypad — in thumb zone */}
      <motion.div
        className="px-6 pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="grid grid-cols-3 gap-2 justify-items-center max-w-[240px] mx-auto">
          {keys.map((key, i) => {
            if (key === '') return <div key={i} />;
            return (
              <button
                key={key}
                className="keypad-btn press-scale"
                style={{ fontFamily: 'var(--font-space-mono)' }}
                onClick={() => handleKeyPress(key)}
              >
                {key === 'del' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
                    <line x1="18" y1="9" x2="12" y2="15" />
                    <line x1="12" y1="9" x2="18" y2="15" />
                  </svg>
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Begin Shift CTA */}
      <div className="px-6 pb-8 pt-3">
        <motion.button
          className={`w-full h-14 rounded-xl font-bold text-lg tracking-wide transition-all press-scale ${
            isValid
              ? 'bg-amber text-bg cta-pulse'
              : 'bg-surface2 text-text-muted cursor-not-allowed'
          }`}
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          disabled={!isValid}
          onClick={() => {
            if (isValid && selectedRoute) {
              onBeginShift(employeeId, selectedRoute as RouteId);
            }
          }}
          whileTap={isValid ? { scale: 0.96 } : {}}
        >
          {isValid ? 'BEGIN SHIFT →' : 'Enter ID & Select Route'}
        </motion.button>
      </div>
    </motion.div>
  );
}
