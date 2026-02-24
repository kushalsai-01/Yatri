/* ═══════════════════════════════════════════
 * YĀTRI — Main App Container
 * Orchestrates all screens, manages state, renders
 * phone shell + desktop panel
 * ═══════════════════════════════════════════ */
'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { type Stop, type RouteId } from '@/data/routes';
import { startShift, recordTicket } from '@/lib/storage';

import ShiftStart from '@/components/ShiftStart';
import DestinationSelect from '@/components/DestinationSelect';
import PassengerCount from '@/components/PassengerCount';
import TicketPreview from '@/components/TicketPreview';
import SuccessScreen from '@/components/SuccessScreen';
import ShiftSummary from '@/components/ShiftSummary';
import DesktopPanel from '@/components/DesktopPanel';

/** Screens enum for clarity */
enum Screen {
  SHIFT_START = 0,
  DESTINATION = 1,
  PASSENGERS = 2,
  PREVIEW = 3,
  SUCCESS = 4,
  SUMMARY = 5,
}

interface TicketState {
  stop: Stop | null;
  adults: number;
  children: number;
  seniors: number;
  totalFare: number;
  ticketId: string;
}

export default function AppContainer() {
  const [screen, setScreen] = useState<Screen>(Screen.SHIFT_START);
  const [route, setRoute] = useState<RouteId | null>(null);
  const [thumbZoneVisible, setThumbZoneVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketState>({
    stop: null,
    adults: 0,
    children: 0,
    seniors: 0,
    totalFare: 0,
    ticketId: '',
  });

  // ─── Screen Handlers ───

  const handleBeginShift = useCallback((employeeId: string, selectedRoute: RouteId) => {
    startShift(employeeId, selectedRoute);
    setRoute(selectedRoute);
    setScreen(Screen.DESTINATION);
  }, []);

  const handleSelectStop = useCallback((stop: Stop) => {
    setTicket((prev) => ({ ...prev, stop }));
    setScreen(Screen.PASSENGERS);
  }, []);

  const handleReview = useCallback((adults: number, children: number, seniors: number, total: number) => {
    setTicket((prev) => ({
      ...prev,
      adults,
      children,
      seniors,
      totalFare: total,
    }));
    setScreen(Screen.PREVIEW);
  }, []);

  const handleIssue = useCallback((ticketId: string, fareAmount: number, stopName: string) => {
    setTicket((prev) => ({ ...prev, ticketId }));
    // Record in localStorage with passed values to avoid stale closure
    recordTicket(fareAmount, stopName);
    setScreen(Screen.SUCCESS);
  }, []);

  const handleNewTicket = useCallback(() => {
    setTicket({
      stop: null,
      adults: 0,
      children: 0,
      seniors: 0,
      totalFare: 0,
      ticketId: '',
    });
    setScreen(Screen.DESTINATION);
  }, []);

  const handleEndShift = useCallback(() => {
    setRoute(null);
    setTicket({
      stop: null,
      adults: 0,
      children: 0,
      seniors: 0,
      totalFare: 0,
      ticketId: '',
    });
    setScreen(Screen.SHIFT_START);
  }, []);

  const handleJumpScreen = useCallback((s: number) => {
    // Only allow jumping to screens that make sense given current state
    if (s === 0) {
      handleEndShift();
    } else if (s <= screen) {
      setScreen(s as Screen);
    }
  }, [screen, handleEndShift]);

  // ─── Render Current Screen ───

  const renderScreen = () => {
    switch (screen) {
      case Screen.SHIFT_START:
        return (
          <ShiftStart
            key="shift-start"
            onBeginShift={handleBeginShift}
          />
        );

      case Screen.DESTINATION:
        return route ? (
          <DestinationSelect
            key="destination"
            route={route}
            onSelectStop={handleSelectStop}
            onOpenSummary={() => setScreen(Screen.SUMMARY)}
          />
        ) : null;

      case Screen.PASSENGERS:
        return ticket.stop ? (
          <PassengerCount
            key="passengers"
            stop={ticket.stop}
            onBack={() => setScreen(Screen.DESTINATION)}
            onReview={handleReview}
          />
        ) : null;

      case Screen.PREVIEW:
        return route && ticket.stop ? (
          <TicketPreview
            key="preview"
            route={route}
            stop={ticket.stop}
            adults={ticket.adults}
            children={ticket.children}
            seniors={ticket.seniors}
            total={ticket.totalFare}
            onBack={() => setScreen(Screen.PASSENGERS)}
            onIssue={(ticketId) => handleIssue(ticketId, ticket.totalFare, ticket.stop!.name)}
          />
        ) : null;

      case Screen.SUCCESS:
        return (
          <SuccessScreen
            key="success"
            ticketId={ticket.ticketId}
            passengers={ticket.adults + ticket.children + ticket.seniors}
            amount={ticket.totalFare}
            destination={ticket.stop?.name || ''}
            onNewTicket={handleNewTicket}
          />
        );

      case Screen.SUMMARY:
        return (
          <ShiftSummary
            key="summary"
            onBack={() => setScreen(Screen.DESTINATION)}
            onEndShift={handleEndShift}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-12">
        {/* ─── Phone Shell ─── */}
        <div className="phone-shell">
          {/* Thumb Zone Overlay */}
          {thumbZoneVisible && <div className="thumb-zone-overlay" />}

          {/* Screen Content */}
          <AnimatePresence mode="wait">
            {renderScreen()}
          </AnimatePresence>
        </div>

        {/* ─── Desktop Presentation Panel ─── */}
        <DesktopPanel
          currentScreen={screen}
          onJumpScreen={handleJumpScreen}
          onToggleThumbZone={() => setThumbZoneVisible(!thumbZoneVisible)}
          thumbZoneVisible={thumbZoneVisible}
        />
      </div>
    </div>
  );
}
