/* ═══════════════════════════════════════════
 * YĀTRI — Route & Stop Data
 * Hardcoded JSON for BMTC Bangalore routes
 * 10 real BMTC routes with actual stop names
 * ═══════════════════════════════════════════ */

export interface Stop {
  name: string;
  zone: 'A' | 'B' | 'C' | 'D';
  fare: number;
  km: number;
}

export interface Route {
  depot: string;
  stops: Stop[];
}

export type RouteId =
  | '500C'
  | '401K'
  | '335E'
  | '201R'
  | '356T'
  | '600A'
  | '411D'
  | '314B'
  | '365'
  | '252A';

export const ROUTES: Record<RouteId, Route> = {
  /* ───── Route 1 ───── */
  '500C': {
    depot: 'Kempegowda Bus Station',
    stops: [
      { name: 'Majestic', zone: 'A', fare: 5, km: 0 },
      { name: 'K R Market', zone: 'A', fare: 10, km: 3 },
      { name: 'Shivajinagar', zone: 'A', fare: 11, km: 4 },
      { name: 'Rajajinagar', zone: 'B', fare: 14, km: 6 },
      { name: 'Jayanagar 4th Block', zone: 'B', fare: 16, km: 7 },
      { name: 'Banashankari', zone: 'B', fare: 17, km: 8 },
      { name: 'Domlur', zone: 'B', fare: 15, km: 7 },
      { name: 'Indiranagar', zone: 'B', fare: 16, km: 7 },
      { name: 'Koramangala', zone: 'B', fare: 15, km: 6 },
      { name: 'Silk Board', zone: 'B', fare: 18, km: 8 },
      { name: 'Hebbal', zone: 'C', fare: 22, km: 11 },
      { name: 'Yelahanka', zone: 'C', fare: 20, km: 10 },
      { name: 'Marathahalli', zone: 'C', fare: 24, km: 13 },
      { name: 'Whitefield', zone: 'D', fare: 32, km: 22 },
      { name: 'Electronic City', zone: 'D', fare: 28, km: 18 },
    ],
  },

  /* ───── Route 2 ───── */
  '401K': {
    depot: 'Shantinagar Bus Station',
    stops: [
      { name: 'Shantinagar', zone: 'A', fare: 5, km: 0 },
      { name: 'City Market', zone: 'A', fare: 10, km: 2 },
      { name: 'Lalbagh', zone: 'A', fare: 12, km: 4 },
      { name: 'DVG Road', zone: 'A', fare: 12, km: 4 },
      { name: 'BTM Layout', zone: 'B', fare: 16, km: 7 },
      { name: 'JP Nagar', zone: 'B', fare: 18, km: 9 },
      { name: 'Bannerghatta Road', zone: 'C', fare: 22, km: 12 },
      { name: 'Hulimavu', zone: 'C', fare: 25, km: 15 },
      { name: 'Electronic City Phase 1', zone: 'D', fare: 30, km: 19 },
    ],
  },

  /* ───── Route 3 ───── */
  '335E': {
    depot: 'Yeshwanthpur Depot',
    stops: [
      { name: 'Yeshwanthpur', zone: 'A', fare: 5, km: 0 },
      { name: 'Malleshwaram', zone: 'A', fare: 8, km: 2 },
      { name: 'Rajajinagar', zone: 'A', fare: 10, km: 3 },
      { name: 'Majestic', zone: 'A', fare: 12, km: 5 },
      { name: 'Corporation Circle', zone: 'B', fare: 14, km: 6 },
      { name: 'MG Road', zone: 'B', fare: 16, km: 7 },
      { name: 'Trinity Circle', zone: 'B', fare: 17, km: 8 },
      { name: 'Indiranagar', zone: 'B', fare: 18, km: 9 },
      { name: 'HAL Airport Road', zone: 'C', fare: 22, km: 12 },
      { name: 'Marathahalli Bridge', zone: 'C', fare: 25, km: 14 },
      { name: 'ITPL', zone: 'D', fare: 30, km: 18 },
    ],
  },

  /* ───── Route 4 ───── */
  '201R': {
    depot: 'Banashankari Depot',
    stops: [
      { name: 'Banashankari', zone: 'A', fare: 5, km: 0 },
      { name: 'Jayanagar', zone: 'A', fare: 8, km: 2 },
      { name: 'Lalbagh Gate', zone: 'A', fare: 12, km: 4 },
      { name: 'KR Road', zone: 'A', fare: 13, km: 5 },
      { name: 'Town Hall', zone: 'B', fare: 15, km: 6 },
      { name: 'Shivajinagar', zone: 'B', fare: 17, km: 8 },
      { name: 'Cantonment Station', zone: 'B', fare: 18, km: 9 },
      { name: 'Frazer Town', zone: 'C', fare: 20, km: 10 },
      { name: 'Kalyan Nagar', zone: 'C', fare: 24, km: 13 },
      { name: 'Hebbal', zone: 'D', fare: 28, km: 16 },
    ],
  },

  /* ───── Route 5 ───── */
  '356T': {
    depot: 'Koramangala Depot',
    stops: [
      { name: 'Koramangala', zone: 'A', fare: 5, km: 0 },
      { name: 'Forum Mall', zone: 'A', fare: 8, km: 1 },
      { name: 'Silk Board', zone: 'A', fare: 10, km: 3 },
      { name: 'HSR Layout', zone: 'A', fare: 12, km: 4 },
      { name: 'Bommanahalli', zone: 'B', fare: 14, km: 6 },
      { name: 'Begur', zone: 'B', fare: 16, km: 8 },
      { name: 'Electronic City Phase 1', zone: 'C', fare: 20, km: 11 },
      { name: 'Electronic City Phase 2', zone: 'C', fare: 22, km: 13 },
      { name: 'Chandapura', zone: 'D', fare: 28, km: 18 },
      { name: 'Anekal', zone: 'D', fare: 35, km: 25 },
    ],
  },

  /* ───── Route 6 ───── */
  '600A': {
    depot: 'Vijayanagar Depot',
    stops: [
      { name: 'Vijayanagar', zone: 'A', fare: 5, km: 0 },
      { name: 'Magadi Road', zone: 'A', fare: 8, km: 2 },
      { name: 'Majestic', zone: 'A', fare: 12, km: 5 },
      { name: 'KR Puram', zone: 'B', fare: 16, km: 8 },
      { name: 'Tin Factory', zone: 'B', fare: 18, km: 10 },
      { name: 'Hoodi', zone: 'C', fare: 22, km: 13 },
      { name: 'Whitefield', zone: 'C', fare: 25, km: 16 },
      { name: 'Kadugodi', zone: 'D', fare: 30, km: 20 },
    ],
  },

  /* ───── Route 7 ───── */
  '411D': {
    depot: 'Jayanagar Depot',
    stops: [
      { name: 'Jayanagar 9th Block', zone: 'A', fare: 5, km: 0 },
      { name: 'South End Circle', zone: 'A', fare: 8, km: 2 },
      { name: 'Lalbagh', zone: 'A', fare: 10, km: 3 },
      { name: 'KR Market', zone: 'A', fare: 12, km: 4 },
      { name: 'Majestic', zone: 'B', fare: 15, km: 6 },
      { name: 'Gandhinagar', zone: 'B', fare: 16, km: 7 },
      { name: 'Seshadripuram', zone: 'B', fare: 18, km: 9 },
      { name: 'Sadashivanagar', zone: 'C', fare: 22, km: 12 },
      { name: 'Mekhri Circle', zone: 'C', fare: 24, km: 14 },
      { name: 'Hebbal', zone: 'D', fare: 28, km: 17 },
      { name: 'Yelahanka', zone: 'D', fare: 32, km: 21 },
    ],
  },

  /* ───── Route 8 ───── */
  '314B': {
    depot: 'Peenya Depot',
    stops: [
      { name: 'Peenya Industry', zone: 'A', fare: 5, km: 0 },
      { name: 'Goraguntepalya', zone: 'A', fare: 8, km: 2 },
      { name: 'Yeshwanthpur', zone: 'A', fare: 10, km: 4 },
      { name: 'Malleshwaram Circle', zone: 'B', fare: 14, km: 6 },
      { name: 'Sampige Road', zone: 'B', fare: 16, km: 7 },
      { name: 'Majestic', zone: 'B', fare: 18, km: 9 },
      { name: 'Richmond Circle', zone: 'C', fare: 22, km: 12 },
      { name: 'Koramangala', zone: 'C', fare: 25, km: 14 },
      { name: 'Silk Board', zone: 'D', fare: 28, km: 17 },
    ],
  },

  /* ───── Route 9 ───── */
  '365': {
    depot: 'Kengeri Depot',
    stops: [
      { name: 'Kengeri', zone: 'A', fare: 5, km: 0 },
      { name: 'RR Nagar', zone: 'A', fare: 8, km: 3 },
      { name: 'Nagarbhavi', zone: 'A', fare: 10, km: 4 },
      { name: 'Vijayanagar', zone: 'B', fare: 14, km: 7 },
      { name: 'Magadi Road', zone: 'B', fare: 16, km: 8 },
      { name: 'Majestic', zone: 'B', fare: 18, km: 10 },
      { name: 'Shivajinagar', zone: 'C', fare: 22, km: 13 },
      { name: 'Ulsoor', zone: 'C', fare: 24, km: 15 },
      { name: 'Old Airport Road', zone: 'D', fare: 28, km: 18 },
      { name: 'Marathahalli', zone: 'D', fare: 32, km: 22 },
    ],
  },

  /* ───── Route 10 ───── */
  '252A': {
    depot: 'Hebbal Depot',
    stops: [
      { name: 'Hebbal', zone: 'A', fare: 5, km: 0 },
      { name: 'Esteem Mall', zone: 'A', fare: 8, km: 2 },
      { name: 'Mekhri Circle', zone: 'A', fare: 10, km: 4 },
      { name: 'Palace Road', zone: 'B', fare: 14, km: 6 },
      { name: 'Cubbon Park', zone: 'B', fare: 16, km: 7 },
      { name: 'MG Road', zone: 'B', fare: 18, km: 9 },
      { name: 'Brigade Road', zone: 'B', fare: 18, km: 9 },
      { name: 'Residency Road', zone: 'C', fare: 22, km: 12 },
      { name: 'Richmond Town', zone: 'C', fare: 24, km: 13 },
      { name: 'Wilson Garden', zone: 'C', fare: 25, km: 14 },
      { name: 'Lalbagh', zone: 'D', fare: 28, km: 16 },
    ],
  },
};

export const ROUTE_IDS = Object.keys(ROUTES) as RouteId[];
