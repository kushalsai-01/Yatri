/* ═══════════════════════════════════════════
 * YĀTRI — localStorage Utility Layer
 * Manages shift data, frequency maps, and session state
 * ═══════════════════════════════════════════ */

const KEYS = {
  SHIFT_DATA: 'yatri_shift_data',
  FREQUENCY_MAP: 'yatri_frequency_map',
  HOURLY_TICKETS: 'yatri_hourly_tickets',
} as const;

/** Shape of a single shift session */
export interface ShiftData {
  date: string; // ISO date string (YYYY-MM-DD)
  employeeId: string;
  route: string;
  ticketsIssued: number;
  totalRevenue: number;
  startTime: string;
}

/** Frequency map: stop name → count (for Zipf's law frequent-stops) */
export type FrequencyMap = Record<string, number>;

/** Hourly ticket volume for bar chart */
export type HourlyTickets = Record<number, number>; // hour (0-23) → count

// ─── Helpers ────────────────────────────────

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full — silently fail
  }
}

// ─── Shift Data ─────────────────────────────

export function getShiftData(): ShiftData | null {
  const data = safeGet<ShiftData | null>(KEYS.SHIFT_DATA, null);
  // Only return if it's today's shift
  if (data && data.date === getToday()) return data;
  return null;
}

export function startShift(employeeId: string, route: string): ShiftData {
  const data: ShiftData = {
    date: getToday(),
    employeeId,
    route,
    ticketsIssued: 0,
    totalRevenue: 0,
    startTime: new Date().toISOString(),
  };
  safeSet(KEYS.SHIFT_DATA, data);
  return data;
}

export function recordTicket(amount: number, stopName: string): void {
  const data = getShiftData();
  if (!data) return;

  // Update shift totals
  data.ticketsIssued += 1;
  data.totalRevenue += amount;
  safeSet(KEYS.SHIFT_DATA, data);

  // Update frequency map (Zipf distribution naturally emerges)
  const freq = getFrequencyMap();
  freq[stopName] = (freq[stopName] || 0) + 1;
  safeSet(KEYS.FREQUENCY_MAP, freq);

  // Update hourly tickets
  const hourly = getHourlyTickets();
  const hour = new Date().getHours();
  hourly[hour] = (hourly[hour] || 0) + 1;
  safeSet(KEYS.HOURLY_TICKETS, hourly);
}

export function endShift(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEYS.SHIFT_DATA);
  localStorage.removeItem(KEYS.FREQUENCY_MAP);
  localStorage.removeItem(KEYS.HOURLY_TICKETS);
}

// ─── Frequency Map ──────────────────────────

export function getFrequencyMap(): FrequencyMap {
  return safeGet<FrequencyMap>(KEYS.FREQUENCY_MAP, {});
}

/** Returns top N stops sorted by frequency (most frequent first) */
export function getFrequentStops(n: number = 5): Array<{ name: string; count: number }> {
  const freq = getFrequencyMap();
  return Object.entries(freq)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

// ─── Hourly Tickets ─────────────────────────

export function getHourlyTickets(): HourlyTickets {
  return safeGet<HourlyTickets>(KEYS.HOURLY_TICKETS, {});
}

// ─── Ticket ID Generator ────────────────────

export function generateTicketId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'TKT-';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
