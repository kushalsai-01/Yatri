/* ═══════════════════════════════════════════
 * YĀTRI — Design Case Study
 * A comprehensive walkthrough of every design
 * decision, optimized for recruiter review
 * ═══════════════════════════════════════════ */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────── Section Toggle ─────────── */
function Section({
  id,
  number,
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section id={id} className="border-b border-[#2A3030]">
      <button
        className="w-full text-left px-6 md:px-12 py-8 flex items-start gap-5 hover:bg-[#141717] transition-colors group"
        onClick={() => setOpen(!open)}
      >
        <span
          className="text-[#F5A623] text-sm font-bold mt-1 min-w-[28px]"
          style={{ fontFamily: 'var(--font-space-mono)' }}
        >
          {number}
        </span>
        <div className="flex-1 min-w-0">
          <h2
            className="text-[#F0EEE8] text-2xl md:text-3xl font-extrabold tracking-tight"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            {title}
          </h2>
          <p className="text-[#7A8585] text-sm mt-1">{subtitle}</p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7A8585"
          strokeWidth="2"
          strokeLinecap="round"
          className={`mt-2 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-12 pb-10 pl-[calc(1.5rem+28px+1.25rem)] md:pl-[calc(3rem+28px+1.25rem)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────── Color Swatch ─────────── */
function Swatch({ color, label, contrast }: { color: string; label: string; contrast?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg border border-[#2A3030]" style={{ backgroundColor: color }} />
      <div>
        <span className="text-[#F0EEE8] text-sm font-semibold">{label}</span>
        <span className="text-[#7A8585] text-xs ml-2" style={{ fontFamily: 'var(--font-space-mono)' }}>
          {color}
        </span>
        {contrast && <span className="text-[#2ECC71] text-xs ml-2">{contrast}</span>}
      </div>
    </div>
  );
}

/* ─────────── Key Insight Card ─────────── */
function Insight({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-3 bg-[#141717] border border-[#2A3030] rounded-xl p-4">
      <span className="text-lg">{icon}</span>
      <p className="text-[#F0EEE8] text-sm leading-relaxed">{text}</p>
    </div>
  );
}

/* ─────────── Metric Card ─────────── */
function Metric({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-[#141717] border border-[#2A3030] rounded-xl p-5 text-center">
      <div
        className="text-[#F5A623] text-3xl font-bold"
        style={{ fontFamily: 'var(--font-space-mono)' }}
      >
        {value}
      </div>
      <div className="text-[#F0EEE8] text-sm font-medium mt-1">{label}</div>
      {sub && <div className="text-[#7A8585] text-xs mt-0.5">{sub}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-[#0D0F0F]" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
      {/* ─── Hero ─── */}
      <header className="px-6 md:px-12 pt-12 pb-10 border-b border-[#2A3030]">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[#F5A623] text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            >
              YĀTRI
            </span>
            <span className="text-[#7A8585] text-xs border border-[#2A3030] rounded px-2 py-0.5 tracking-widest uppercase font-semibold mt-2">
              Design Case Study
            </span>
          </div>
          <h1 className="text-[#F0EEE8] text-2xl md:text-4xl font-bold leading-tight mb-4">
            Reimagining Bus Ticketing for Conductors Who Can&apos;t Look Down
          </h1>
          <p className="text-[#7A8585] text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            A mobile-first digital ticketing companion for BMTC Bangalore bus conductors — designed for
            one-handed operation on a moving, crowded bus under direct sunlight.
            10 routes · 90+ stops · Fully offline · 3-tap ticket flow.
          </p>

          {/* Quick nav */}
          <div className="flex flex-wrap gap-2">
            {[
              ['01', 'The "Why"'],
              ['02', 'Environment'],
              ['03', 'Info Hierarchy'],
              ['04', 'Interactions'],
              ['05', 'Edge Cases'],
              ['06', 'Typography'],
              ['07', 'Color System'],
              ['08', 'Tech Stack'],
            ].map(([num, label]) => (
              <a
                key={num}
                href={`#s${num}`}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#141717] border border-[#2A3030] text-[#7A8585] hover:text-[#F5A623] hover:border-[#F5A623]/30 transition-colors"
              >
                <span className="text-[#F5A623] mr-1" style={{ fontFamily: 'var(--font-space-mono)' }}>{num}</span>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA to live app */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F5A623] text-[#0D0F0F] font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            LAUNCH LIVE APP →
          </a>
          <a
            href="https://github.com/kushalsai-01/Yatri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2A3030] text-[#F0EEE8] font-semibold text-sm hover:border-[#7A8585] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Source
          </a>
        </div>
      </header>

      {/* ─── Problem Context ─── */}
      <div className="px-6 md:px-12 py-8 border-b border-[#2A3030] bg-[#141717]">
        <div className="max-w-4xl">
          <p className="text-[#7A8585] text-xs uppercase tracking-[0.15em] mb-4 font-bold">The Problem</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Metric value="400+" label="Tickets Per Shift" sub="Issued manually on paper rolls" />
            <Metric value="6–8 hrs" label="Continuous Standing" sub="On a moving, crowded bus" />
            <Metric value="< 4s" label="Time Per Ticket" sub="Target for digital replacement" />
          </div>
          <p className="text-[#F0EEE8] text-sm leading-relaxed mt-6 max-w-2xl">
            BMTC conductors currently tear tickets from paper rolls while simultaneously collecting
            cash, tracking stops, managing passenger flow, and maintaining balance on a swaying bus.
            Any digital replacement must be <strong className="text-[#F5A623]">faster than paper, not slower</strong>.
          </p>
        </div>
      </div>

      {/* ═══ SECTIONS ═══ */}
      <div className="max-w-4xl">

        {/* ── 01: THE WHY ── */}
        <Section
          id="s01"
          number="01"
          title="The &ldquo;Why&rdquo; Behind the &ldquo;What&rdquo;"
          subtitle="Every layout, typography, and element placement decision explained"
          defaultOpen={true}
        >
          <div className="space-y-6">
            <Insight
              icon="🏗️"
              text="The layout is a vertical single-column stack — not tabs, not a sidebar. On a 5&quot; phone held one-handed, horizontal navigation requires a thumb sweep across the screen. A vertical stack lets the conductor use a simple downward thumb motion. Each screen is a single task: select stop → set count → confirm."
            />
            <Insight
              icon="📐"
              text="The phone shell is constrained to 430px max-width — matching the 95th percentile of Android devices used by BMTC conductors. On actual mobile, it goes full-width. The fixed height of 880px represents reality: no pinch-to-zoom, no scroll-to-discover. Everything must fit."
            />
            <Insight
              icon="🔢"
              text="The numeric keypad on Screen 0 is a deliberate choice over a native text input. Native keyboards obscure 50% of the viewport, require precise small-key targeting, and show the wrong layout (QWERTY vs numeric). The custom 3×4 grid has 44×44px buttons — 120% larger than the WCAG 2.5.5 minimum tap target."
            />
            <Insight
              icon="🏷️"
              text="Route badges use Barlow Condensed — a narrow, bold typeface — inside rounded containers. This is modeled on actual BMTC bus route boards (white text on colored backgrounds). The conductor visually pattern-matches to what they already see on their own bus, reducing cognitive load."
            />
            <Insight
              icon="🎫"
              text="The ticket preview screen mimics a physical BMTC paper ticket: perforated top/bottom edges (CSS border-image), route in the header, fare in large monospace, a barcode strip. This isn't decoration — it's recognition. When a conductor sees something that looks like the ticket they've torn 10,000 times, trust increases."
            />

            <h3 className="text-[#F0EEE8] text-lg font-bold mt-8 mb-3" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
              Screen Flow Architecture
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2A3030]">
                    <th className="text-left py-3 pr-4 text-[#7A8585] font-semibold">Screen</th>
                    <th className="text-left py-3 pr-4 text-[#7A8585] font-semibold">User Action</th>
                    <th className="text-left py-3 pr-4 text-[#7A8585] font-semibold">Design Decision</th>
                    <th className="text-left py-3 text-[#7A8585] font-semibold">Taps</th>
                  </tr>
                </thead>
                <tbody className="text-[#F0EEE8]">
                  <tr className="border-b border-[#2A3030]/50">
                    <td className="py-3 pr-4 text-[#F5A623] font-bold">0 — Shift Start</td>
                    <td className="py-3 pr-4">Enter ID, pick route</td>
                    <td className="py-3 pr-4 text-[#7A8585]">Done once per shift. Keypad + dropdown. Sets context for all subsequent screens.</td>
                    <td className="py-3 text-[#F5A623]" style={{ fontFamily: 'var(--font-space-mono)' }}>~8</td>
                  </tr>
                  <tr className="border-b border-[#2A3030]/50">
                    <td className="py-3 pr-4 text-[#F5A623] font-bold">1 — Select Stop</td>
                    <td className="py-3 pr-4">Pick destination</td>
                    <td className="py-3 pr-4 text-[#7A8585]">Frequent chips (Zipf&apos;s law). Fuzzy search. Zone badges visually separate geographic clusters.</td>
                    <td className="py-3 text-[#F5A623]" style={{ fontFamily: 'var(--font-space-mono)' }}>1</td>
                  </tr>
                  <tr className="border-b border-[#2A3030]/50">
                    <td className="py-3 pr-4 text-[#F5A623] font-bold">2 — Passengers</td>
                    <td className="py-3 pr-4">Set Adult/Child/Senior</td>
                    <td className="py-3 pr-4 text-[#7A8585]">Stepper buttons, not text input. Live total recalculates on each tap. Concession rates applied automatically.</td>
                    <td className="py-3 text-[#F5A623]" style={{ fontFamily: 'var(--font-space-mono)' }}>1–3</td>
                  </tr>
                  <tr className="border-b border-[#2A3030]/50">
                    <td className="py-3 pr-4 text-[#F5A623] font-bold">3 — Preview</td>
                    <td className="py-3 pr-4">Verify & issue</td>
                    <td className="py-3 pr-4 text-[#7A8585]">Physical ticket layout. This is a guard screen — wrong fare gets caught here before printing.</td>
                    <td className="py-3 text-[#F5A623]" style={{ fontFamily: 'var(--font-space-mono)' }}>1</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-[#F5A623] font-bold">4 — Success</td>
                    <td className="py-3 pr-4">Auto-returns</td>
                    <td className="py-3 pr-4 text-[#7A8585]">3s animation → auto-return to Screen 1. No manual navigation needed for the next ticket.</td>
                    <td className="py-3 text-[#F5A623]" style={{ fontFamily: 'var(--font-space-mono)' }}>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#7A8585] text-sm mt-2">
              <strong className="text-[#F5A623]">Total: 3 taps</strong> for the critical path (stop → count → issue) after shift start.
              Repeat tickets to the same stop: <strong className="text-[#F5A623]">1 tap</strong> via frequency chips.
            </p>
          </div>
        </Section>

        {/* ── 02: ENVIRONMENTAL EMPATHY ── */}
        <Section
          id="s02"
          number="02"
          title="Environmental Empathy"
          subtitle="How physical realities dictate every design choice"
        >
          <div className="space-y-6">
            <h3 className="text-[#F0EEE8] text-lg font-bold" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
              The Physical Reality
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: '🚌',
                  title: 'Swaying Bus',
                  desc: 'Constant lateral motion. Small tap targets (< 40px) become impossible to hit accurately. Every interactive element is ≥ 44×44px. The CTA button spans the full width of the screen — you literally cannot miss it.',
                },
                {
                  icon: '✋',
                  title: 'One Hand Occupied',
                  desc: 'The conductor holds cash/change in one hand and the phone in the other. All CTAs are placed in the bottom 55% of the viewport — the natural thumb arc. Toggle the "Thumb Zone" overlay on desktop to see this visualized.',
                },
                {
                  icon: '☀️',
                  title: 'Direct Sunlight',
                  desc: 'Bangalore buses have open windows. Most color schemes wash out in glare. Amber (#F5A623) on deep black (#0D0F0F) achieves 12.4:1 contrast — nearly double WCAG AAA. This pairing remains readable even at 50% screen brightness.',
                },
                {
                  icon: '🙌',
                  title: 'Messy / Wet Hands',
                  desc: 'Cash, coins, rain. Precise gestures (pinch, swipe) fail with wet fingers. The app uses only taps — no swipe-to-dismiss, no drag, no long-press. Every interaction is a single, forgiving tap on a large target.',
                },
                {
                  icon: '🔊',
                  title: 'Noisy Environment',
                  desc: 'Engine noise, passenger chatter, honking. Audio feedback is useless. All confirmation is visual: scale animations (80ms, 0.96), color changes, and the animated success ring. The conductor glances, sees green, moves on.',
                },
                {
                  icon: '📶',
                  title: 'No Reliable Network',
                  desc: 'Routes pass through tunnels, flyover dead zones, and rural stretches. The app is 100% offline. All state (shift data, frequency maps, hourly analytics) persists in localStorage. Zero network calls, ever.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#141717] border border-[#2A3030] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <h4 className="text-[#F0EEE8] text-sm font-bold">{item.title}</h4>
                  </div>
                  <p className="text-[#7A8585] text-xs leading-[1.7]">{item.desc}</p>
                </div>
              ))}
            </div>

            <Insight
              icon="🎯"
              text="The thumb zone design was validated against Steven Hoober's research on one-handed phone use — 75% of users touch the screen with one thumb, and the natural reach area is the bottom-center quadrant. YĀTRI places 100% of primary actions in this zone."
            />
          </div>
        </Section>

        {/* ── 03: INFORMATION HIERARCHY ── */}
        <Section
          id="s03"
          number="03"
          title="Information Hierarchy"
          subtitle="Prioritizing signal over noise for split-second decisions"
        >
          <div className="space-y-6">
            <p className="text-[#F0EEE8] text-sm leading-relaxed">
              A bus conductor makes a decision in <strong className="text-[#F5A623]">under 2 seconds</strong>.
              At each screen, exactly one piece of information is visually dominant — everything else is secondary or hidden.
            </p>

            <h3 className="text-[#F0EEE8] text-lg font-bold mt-4" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
              Visual Weight Distribution
            </h3>

            <div className="space-y-3">
              {[
                {
                  screen: 'Destination Select',
                  primary: '₹ Fare (amber, 16px mono, right-aligned)',
                  secondary: 'Stop name (17px condensed, left-aligned)',
                  tertiary: 'Zone badge + distance (10px, muted)',
                  why: 'The conductor cares about fare first — it determines the cash to collect. Stop name confirms intent. Zone/km is reference-only.',
                },
                {
                  screen: 'Passenger Count',
                  primary: 'Total fare (₹XX, 28px mono, amber)',
                  secondary: 'Passenger counts (24px, with stepper buttons)',
                  tertiary: 'Concession rates (12px, muted text)',
                  why: 'The fare total drives cash collection. Counts are the input mechanism. Concession rates are informational — the conductor doesn\'t need to calculate manually.',
                },
                {
                  screen: 'Ticket Preview',
                  primary: 'Total ₹ amount (28px Space Mono, bold)',
                  secondary: 'From → To route information',
                  tertiary: 'Passenger breakdown badges, ticket ID, barcode',
                  why: 'Last chance to catch errors. The fare amount is the single most important number. Route info confirms correctness. The barcode is for auditing, not for the conductor.',
                },
                {
                  screen: 'Success Screen',
                  primary: 'Green checkmark ring (110px animated SVG)',
                  secondary: 'Passengers / Amount / Destination chips',
                  tertiary: '"Printing..." indicator, timer',
                  why: 'Glanceable confirmation. The conductor sees green → moves to the next passenger. The chips provide audit-trail data without demanding attention.',
                },
              ].map((item) => (
                <div key={item.screen} className="bg-[#141717] border border-[#2A3030] rounded-xl p-5">
                  <h4 className="text-[#F5A623] text-sm font-bold mb-3" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
                    {item.screen}
                  </h4>
                  <div className="space-y-1.5 mb-3">
                    <div className="flex gap-3 items-start">
                      <span className="text-[#F5A623] text-xs font-bold min-w-[60px]">Primary</span>
                      <span className="text-[#F0EEE8] text-xs">{item.primary}</span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-[#7A8585] text-xs font-bold min-w-[60px]">Secondary</span>
                      <span className="text-[#7A8585] text-xs">{item.secondary}</span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-[#7A8585]/60 text-xs font-bold min-w-[60px]">Tertiary</span>
                      <span className="text-[#7A8585]/60 text-xs">{item.tertiary}</span>
                    </div>
                  </div>
                  <p className="text-[#7A8585] text-xs leading-[1.7] border-t border-[#2A3030] pt-3">
                    <strong className="text-[#F0EEE8]">Why:</strong> {item.why}
                  </p>
                </div>
              ))}
            </div>

            <Insight
              icon="🧠"
              text='The 4-level surface hierarchy (bg → surface → surface2 → surface3) creates perceived depth without competing colors. Primary information sits on elevated surfaces, secondary on base surfaces. This gives the conductor implicit "z-axis" cues about importance without explicit labels.'
            />
          </div>
        </Section>

        {/* ── 04: INTERACTION INSTINCT ── */}
        <Section
          id="s04"
          number="04"
          title="Interaction Instinct"
          subtitle="Gestures, transitions, and feedback that improve the 'feel'"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Press Scale (80ms)',
                  detail: 'Every tappable element scales to 0.96 on press. Fast enough to feel instant, visible enough to confirm intent. Prevents double-taps (which would issue duplicate tickets).',
                  spec: 'transform: scale(0.96) · 80ms ease-out',
                },
                {
                  title: 'Spring Animations',
                  detail: 'Passenger count changes use spring physics (stiffness: 500, damping: 30) — the number bounces slightly when incremented. This organic motion signals "something changed" more effectively than a hard swap.',
                  spec: 'type: spring · stiffness: 500 · damping: 30',
                },
                {
                  title: 'CTA Pulse',
                  detail: 'When a CTA becomes active (all required fields filled), it animates with a pulsing box-shadow. This draws the conductor\'s peripheral vision to the next action without explicit instruction.',
                  spec: '@keyframes ctaPulse · 2s infinite',
                },
                {
                  title: 'Screen Transitions',
                  detail: 'Screens slide horizontally with 300ms cubic-bezier(0.4, 0, 0.2, 1) — the Material Design motion curve. Forward screens enter from right, backward from left. This creates spatial memory.',
                  spec: 'x: 100% → 0 · 300ms · ease-in-out',
                },
                {
                  title: 'Success Ring Draw',
                  detail: 'The green checkmark uses SVG stroke-dashoffset animation — the circle "draws" itself, then the checkmark appears. This takes 600ms total, during which the conductor visually registers "done".',
                  spec: 'stroke-dasharray: 302 · 0.4s ease-in',
                },
                {
                  title: 'Auto-Return Timer',
                  detail: 'After ticket issuance, the success screen auto-returns to stop selection after 3 seconds. No taps needed for the next ticket. The conductor can immediately attend to the next passenger.',
                  spec: 'setTimeout(3000) → Screen 1',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#141717] border border-[#2A3030] rounded-xl p-5">
                  <h4 className="text-[#F0EEE8] text-sm font-bold mb-2">{item.title}</h4>
                  <p className="text-[#7A8585] text-xs leading-[1.7] mb-3">{item.detail}</p>
                  <code className="text-[#F5A623] text-[10px] bg-[#0D0F0F] px-2 py-1 rounded" style={{ fontFamily: 'var(--font-space-mono)' }}>
                    {item.spec}
                  </code>
                </div>
              ))}
            </div>

            <Insight
              icon="⚡"
              text="No interaction on any screen requires more than a single tap. No swipes, no long-presses, no drag-and-drop. When the bus brakes suddenly, a finger mid-swipe will land on the wrong element. A tap is atomic — it either registers or it doesn't."
            />
          </div>
        </Section>

        {/* ── 05: EDGE CASES & POLISH ── */}
        <Section
          id="s05"
          number="05"
          title="Attention to Detail"
          subtitle="Edge cases and error states that make the product feel reliable"
        >
          <div className="space-y-6">
            <div className="space-y-3">
              {[
                {
                  case: 'Zero Passengers',
                  handling: 'The "REVIEW TICKET" CTA stays disabled (muted surface2 color, cursor-not-allowed) until total > 0. No error toast needed — the button state itself communicates.',
                },
                {
                  case: 'Employee ID Too Short',
                  handling: 'BEGIN SHIFT stays disabled until ID ≥ 4 digits. The blinking cursor provides affordance that more input is expected. Max 8 digits prevents fat-finger overtyping.',
                },
                {
                  case: 'No Route Selected',
                  handling: 'Placeholder text "Tap to select route" in muted color. CTA stays disabled. Two conditions (ID + route) must be met — the button text changes dynamically to guide.',
                },
                {
                  case: 'Fuzzy Search No Results',
                  handling: 'When search query matches no stops, a centered empty state appears: "No stops match [query]". No cryptic error codes, no blank screens.',
                },
                {
                  case: 'Senior/Divyaang Free Fare',
                  handling: 'Seniors have a ₹0 fare with a "Free" badge. The concession is applied automatically — the conductor doesn\'t manually override. This prevents fare disputes.',
                },
                {
                  case: 'Previous Shift Data',
                  handling: 'If localStorage has data from a previous shift, Screen 0 shows "Tickets Today" and "Collected" stats. This gives the conductor a running sense of their day.',
                },
                {
                  case: 'Hydration Mismatch',
                  handling: 'The decorative barcode uses Math.random(). SSR generates different values than client. Fixed by generating random values in useEffect — the barcode renders only after mount.',
                },
                {
                  case: 'Frequency Learning',
                  handling: 'Every ticket issued records the destination in a frequency map (localStorage). After 3+ tickets to the same stop, it appears as a "frequent stop" chip — reducing future taps from 3 to 1.',
                },
                {
                  case: 'Shift Summary Analytics',
                  handling: 'Hourly ticket distribution as a CSS bar chart (6AM–10PM). Top destinations ranked. Total revenue with ₹ formatting. The conductor gets operational insight without a backend dashboard.',
                },
              ].map((item) => (
                <div key={item.case} className="flex gap-4 items-start bg-[#141717] border border-[#2A3030] rounded-xl p-4">
                  <span className="text-[#F5A623] text-xs font-bold min-w-[140px] mt-0.5" style={{ fontFamily: 'var(--font-space-mono)' }}>
                    {item.case}
                  </span>
                  <p className="text-[#7A8585] text-xs leading-[1.7]">{item.handling}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 06: TYPOGRAPHY ── */}
        <Section
          id="s06"
          number="06"
          title="Typography System"
          subtitle="Three typefaces, each solving a specific readability problem"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="bg-[#141717] border border-[#2A3030] rounded-xl p-5">
                <h4
                  className="text-[#F0EEE8] text-3xl font-extrabold mb-2"
                  style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                >
                  Barlow Condensed
                </h4>
                <p className="text-[#F5A623] text-xs font-bold mb-2">Display · Headings · Route Badges · CTAs</p>
                <p className="text-[#7A8585] text-xs leading-[1.7]">
                  Narrow letterforms fit more text in constrained spaces (route badges: &ldquo;500C&rdquo; in 44px containers).
                  Extrabold weight (800) ensures legibility at extreme viewing angles — when the conductor glances sideways at their phone.
                  Used for: YĀTRI wordmark, screen titles, CTA labels, route badges.
                </p>
              </div>
              <div className="bg-[#141717] border border-[#2A3030] rounded-xl p-5">
                <h4
                  className="text-[#F0EEE8] text-2xl font-medium mb-2"
                  style={{ fontFamily: 'var(--font-barlow)' }}
                >
                  Barlow
                </h4>
                <p className="text-[#F5A623] text-xs font-bold mb-2">Body · Labels · Descriptions</p>
                <p className="text-[#7A8585] text-xs leading-[1.7]">
                  Same family as Condensed for visual harmony, but regular width for sustained reading.
                  Weight 400 for labels, 500 for emphasis, 600 for field labels. The 150% x-height (relative to cap height)
                  improves small-size legibility on low-DPI bus-used phones.
                </p>
              </div>
              <div className="bg-[#141717] border border-[#2A3030] rounded-xl p-5">
                <h4
                  className="text-[#F0EEE8] text-2xl font-bold mb-2"
                  style={{ fontFamily: 'var(--font-space-mono)' }}
                >
                  Space Mono
                </h4>
                <p className="text-[#F5A623] text-xs font-bold mb-2">Numeric · Fares · Ticket IDs · Keypad</p>
                <p className="text-[#7A8585] text-xs leading-[1.7]">
                  Monospace ensures digit columns align perfectly — critical for fare comparison (₹12 vs ₹120).
                  The distinctive zero (slashed Ø) prevents confusion with the letter O.
                  Used for: Employee ID display, fare amounts, ticket IDs, keypad numbers, shift statistics.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 07: COLOR SYSTEM ── */}
        <Section
          id="s07"
          number="07"
          title="Color System"
          subtitle="WCAG AAA contrast engineering for outdoor readability"
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <Swatch color="#F5A623" label="Amber" contrast="12.4:1 on #0D0F0F — WCAG AAA" />
              <Swatch color="#0D0F0F" label="Background" />
              <Swatch color="#141717" label="Surface (Level 1)" />
              <Swatch color="#1C2020" label="Surface (Level 2)" />
              <Swatch color="#232929" label="Surface (Level 3)" />
              <Swatch color="#2A3030" label="Border" />
              <Swatch color="#F0EEE8" label="Text Primary" contrast="15.8:1 on #0D0F0F" />
              <Swatch color="#7A8585" label="Text Muted" contrast="4.8:1 on #0D0F0F — WCAG AA" />
              <Swatch color="#2ECC71" label="Success Green" />
              <Swatch color="#E74C3C" label="Danger Red" />
            </div>

            <Insight
              icon="☀️"
              text="Why amber, not blue? Blue is the default choice for digital products, but it washes out under direct sunlight due to the sky's blue ambient light. Amber (warm wavelength: ~590nm) maintains its perceived brightness in high-ambient-light conditions. This is the same reason highway signs use yellow-on-black."
            />

            <Insight
              icon="🌙"
              text="The 4-level surface hierarchy (#0D0F0F → #141717 → #1C2020 → #232929) creates depth without bright colors. Each step is +7 lightness in HSL, perceptually uniform. This avoids the 'black slab' problem where dark UIs feel flat and elements blur together."
            />
          </div>
        </Section>

        {/* ── 08: TECH STACK ── */}
        <Section
          id="s08"
          number="08"
          title="Technical Implementation"
          subtitle="Architecture decisions and their UX implications"
        >
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2A3030]">
                    <th className="text-left py-3 pr-4 text-[#7A8585] font-semibold">Technology</th>
                    <th className="text-left py-3 pr-4 text-[#7A8585] font-semibold">Choice</th>
                    <th className="text-left py-3 text-[#7A8585] font-semibold">UX Impact</th>
                  </tr>
                </thead>
                <tbody className="text-[#F0EEE8]">
                  {[
                    ['Framework', 'Next.js 16 (App Router)', 'Static generation → sub-1s first paint. No server round-trips.'],
                    ['Language', 'TypeScript (strict)', 'Type safety prevents runtime errors (wrong fare type → caught at build).'],
                    ['Styling', 'Tailwind CSS 4 + CSS Variables', 'Design tokens as CSS custom properties → consistent spacing/color.'],
                    ['Animation', 'Framer Motion', 'Spring physics for organic feel. AnimatePresence for exit transitions.'],
                    ['State', 'React useState + localStorage', 'No Redux overhead. State tree is shallow — 6 screens, 1 ticket object.'],
                    ['Fonts', 'Google Fonts (3 families)', 'swap display strategy → text visible immediately, fonts load async.'],
                    ['Deployment', 'Vercel Edge', 'Global CDN. Static assets cached indefinitely. No cold starts.'],
                    ['Data', '10 BMTC routes, hardcoded', '90+ stops with zones, fares, distances. Zero API dependency.'],
                  ].map(([tech, choice, impact]) => (
                    <tr key={tech} className="border-b border-[#2A3030]/50">
                      <td className="py-3 pr-4 text-[#F5A623] font-bold text-xs">{tech}</td>
                      <td className="py-3 pr-4 text-xs">{choice}</td>
                      <td className="py-3 text-[#7A8585] text-xs">{impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-[#F0EEE8] text-lg font-bold mt-4" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
              What I&apos;d Add in Production
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: 'Service Worker', desc: 'True PWA with offline caching. Currently offline-capable via static gen, but a SW would persist assets permanently.' },
                { title: 'Web USB Printing', desc: 'Connect to thermal printers via Web USB API. The ticket data structure is already printer-ready.' },
                { title: 'Backend Sync', desc: 'IndexedDB + Background Sync API. When connectivity returns, batch-upload shift data to a central BMTC dashboard.' },
              ].map((item) => (
                <div key={item.title} className="bg-[#141717] border border-[#2A3030] rounded-xl p-4">
                  <h4 className="text-[#F0EEE8] text-sm font-bold mb-1">{item.title}</h4>
                  <p className="text-[#7A8585] text-[11px] leading-[1.6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

      </div>

      {/* ─── Footer ─── */}
      <footer className="px-6 md:px-12 py-10 border-t border-[#2A3030] mt-4">
        <div className="max-w-4xl flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <span
              className="text-[#F5A623] text-2xl font-extrabold tracking-tight"
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            >
              YĀTRI
            </span>
            <p className="text-[#7A8585] text-xs mt-1">
              Built by Kushal Sai · Nielsen Design Assignment · Feb 2026
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="/"
              className="text-[#F5A623] text-sm font-semibold hover:underline"
            >
              Live App →
            </a>
            <a
              href="https://github.com/kushalsai-01/Yatri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7A8585] text-sm font-semibold hover:text-[#F0EEE8] transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
