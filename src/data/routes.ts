/* ═══════════════════════════════════════════
 * YĀTRI — Route & Stop Data
 * Hardcoded JSON for BMTC routes used by conductors
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

export type RouteId = '500C' | '401K';

export const ROUTES: Record<RouteId, Route> = {
  '500C': {
    depot: 'Vijayanagar Depot',
    stops: [
      { name: 'K R Market', zone: 'A', fare: 10, km: 3 },
      { name: 'Majestic', zone: 'A', fare: 12, km: 4 },
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
  '401K': {
    depot: 'Shantinagar Depot',
    stops: [
      { name: 'City Market', zone: 'A', fare: 10, km: 2 },
      { name: 'Lalbagh', zone: 'A', fare: 12, km: 4 },
      { name: 'BTM Layout', zone: 'B', fare: 16, km: 7 },
      { name: 'JP Nagar', zone: 'B', fare: 18, km: 9 },
      { name: 'Bannerghatta Road', zone: 'C', fare: 22, km: 12 },
      { name: 'Hulimavu', zone: 'C', fare: 25, km: 15 },
    ],
  },
};

export const ROUTE_IDS = Object.keys(ROUTES) as RouteId[];
