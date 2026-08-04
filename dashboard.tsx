import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { riseIn } from './src/components/anim'
import { colors, font, gradient, radius } from './src/theme'

/**
 * The live intelligence dashboard on slide 6. Numbers drift and counters climb
 * on a timer so the board reads as a running feed rather than a screenshot.
 *
 * Under `?clean` every value is frozen at its base so exported stills and PDF
 * captures are deterministic.
 */
const STILL =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('clean')

const rand = (min: number, max: number) => min + Math.random() * (max - min)

/** Value that random-walks around a base, clamped to +/- spread. */
function useDrift(base: number, spread: number, ms = 2000) {
  const [v, setV] = useState(base)
  useEffect(() => {
    if (STILL) return
    const t = setInterval(() => {
      setV((prev) => {
        const next = prev + rand(-spread / 2.2, spread / 2.2)
        return Math.min(base + spread, Math.max(base - spread, next))
      })
    }, ms)
    return () => clearInterval(t)
  }, [base, spread, ms])
  return v
}

/** Monotonic counter — units sold, impressions, anything that only goes up. */
function useCounter(start: number, step: [number, number], ms = 1500) {
  const [v, setV] = useState(start)
  const [lo, hi] = step
  useEffect(() => {
    if (STILL) return
    const t = setInterval(() => setV((prev) => prev + Math.round(rand(lo, hi))), ms)
    return () => clearInterval(t)
  }, [lo, hi, ms])
  return v
}

/** A series of bars that jitter around a fixed shape. */
function useSeries(shape: number[], jitter: number, ms = 2200) {
  const [v, setV] = useState(shape)
  const base = useRef(shape)
  useEffect(() => {
    if (STILL) return
    const t = setInterval(() => {
      setV(base.current.map((b) => Math.max(6, Math.min(100, b + rand(-jitter, jitter)))))
    }, ms)
    return () => clearInterval(t)
  }, [jitter, ms])
  return v
}

const int = (n: number) => Math.round(n).toLocaleString('en-GB')

/* ─────────────────────────────────────────────────────────── building blocks */

const panel: CSSProperties = { background: colors.bg, padding: '20px 26px 22px' }

function Label({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.textFaint }}>
      {children}
    </div>
  )
}

function Delta({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const up = value >= 0
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 19, fontWeight: 700, color: up ? colors.cyan : '#FF7A7A' }}>
      <Icon size={17} strokeWidth={2.8} />
      {up ? '+' : ''}{value.toFixed(1)}{suffix}
    </span>
  )
}

/** Top-row KPI: big ticking figure with a delta and an optional share bar. */
function Kpi({ label, value, delta, bar }: { label: string; value: string; delta?: number; bar?: number }) {
  return (
    <div style={{ ...panel, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Label>{label}</Label>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 42, letterSpacing: -1, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
          {value}
        </span>
        {delta !== undefined && <Delta value={delta} />}
      </div>
      {bar !== undefined && (
        <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <div style={{ width: `${bar}%`, height: '100%', borderRadius: 999, background: gradient.primary, transition: 'width 1.4s cubic-bezier(0.22,1,0.36,1)' }} />
        </div>
      )}
    </div>
  )
}

/** Vertical bar chart with a live-updating series. */
function BarChart({ data, labels, highlight }: { data: number[]; labels: string[]; highlight?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, flex: 1, minHeight: 0, marginTop: 18 }}>
      {data.map((v, i) => (
        <div key={labels[i]} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%' }}>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
            <div
              style={{
                width: '100%',
                height: `${v}%`,
                borderRadius: 5,
                background: i === highlight ? gradient.primary : 'rgba(0,191,232,0.28)',
                border: i === highlight ? 'none' : '1px solid rgba(0,191,232,0.35)',
                transition: 'height 1.6s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          </div>
          <span style={{ fontSize: 15, color: colors.textFaint, whiteSpace: 'nowrap' }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────── dashboard */

const HOURS = ['06', '08', '10', '12', '14', '16', '18', '20', '22']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function LiveDashboard() {
  const unitsSold = useCounter(12418, [3, 14], 1400)
  const impressions = useCounter(1284000, [180, 900], 1200)
  const conversion = useDrift(7.4, 0.5, 2100)
  const basket = useDrift(27.8, 1.1, 2600)
  const marketShare = useDrift(18.6, 0.7, 3200)
  const categoryShare = useDrift(31.2, 0.9, 2900)
  const roas = useDrift(4.6, 0.35, 2400)
  const mediaImpact = useDrift(12.8, 1.6, 2300)
  const women = useDrift(58, 1.2, 3400)

  const byHour = useSeries([22, 38, 56, 88, 64, 52, 78, 96, 44], 7, 2000)
  const byDay = useSeries([54, 48, 62, 71, 88, 96, 68], 6, 2600)

  const today = new Date().getDay()
  const todayIndex = today === 0 ? 6 : today - 1

  return (
    <motion.div
      variants={riseIn}
      style={{
        border: `1px solid ${colors.border}`, borderRadius: radius.lg, overflow: 'hidden',
        background: colors.border, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column',
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '18px 30px', background: 'rgba(255,255,255,0.03)' }}>
        <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26 }}>Bright.Blue Intelligence</div>
        <LivePill />
        <div style={{ marginLeft: 'auto', fontSize: 18, color: colors.textFaint }}>UK Network &middot; All connected locations</div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, marginTop: 1 }}>
        <Kpi label="Units sold" value={int(unitsSold)} delta={9.2} />
        <Kpi label="Conversion rate" value={`${conversion.toFixed(1)}%`} delta={1.4} bar={conversion * 9} />
        <Kpi label="Basket value" value={`\u00a3${basket.toFixed(2)}`} delta={3.6} />
        <Kpi label="Market share" value={`${marketShare.toFixed(1)}%`} delta={2.1} bar={marketShare * 3.4} />
        <Kpi label="Category share" value={`${categoryShare.toFixed(1)}%`} delta={4.3} bar={categoryShare * 2.4} />
      </div>

      {/* charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr', gap: 1, marginTop: 1, flex: 1, minHeight: 0 }}>
        <div style={{ ...panel, display: 'flex', flexDirection: 'column' }}>
          <Label>Sales by time of day</Label>
          <BarChart data={byHour} labels={HOURS} highlight={7} />
        </div>

        <div style={{ ...panel, display: 'flex', flexDirection: 'column' }}>
          <Label>Sales by day of week</Label>
          <BarChart data={byDay} labels={DAYS} highlight={todayIndex} />
        </div>

        <div style={{ ...panel, display: 'flex', flexDirection: 'column' }}>
          <Label>Demographic split</Label>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 18 }}>
            <div>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 38, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{women.toFixed(0)}%</div>
              <div style={{ fontSize: 17, color: colors.textMuted, marginTop: 6 }}>Women</div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 38, lineHeight: 1, color: colors.textMuted, fontVariantNumeric: 'tabular-nums' }}>{(100 - women).toFixed(0)}%</div>
              <div style={{ fontSize: 17, color: colors.textFaint, marginTop: 6 }}>Men</div>
            </div>
          </div>
          <div style={{ display: 'flex', height: 12, borderRadius: 999, overflow: 'hidden', marginTop: 20, background: 'rgba(255,255,255,0.08)' }}>
            <div style={{ width: `${women}%`, background: gradient.primary, transition: 'width 1.6s cubic-bezier(0.22,1,0.36,1)' }} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.16)' }} />
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 18, fontSize: 17, color: colors.textFaint }}>
            Peak age band <span style={{ color: colors.text, fontWeight: 700 }}>25&ndash;34</span>
          </div>
        </div>
      </div>

      {/* media row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginTop: 1 }}>
        <Kpi label="Media impressions" value={int(impressions)} delta={6.7} />
        <Kpi label="ROAS" value={`${roas.toFixed(1)}\u00d7`} delta={5.2} bar={roas * 16} />
        <Kpi label="Media impact on sales" value={`+${mediaImpact.toFixed(1)}%`} delta={mediaImpact - 10.4} bar={mediaImpact * 5.4} />
      </div>
    </motion.div>
  )
}

/** LIVE badge with a pulsing dot. */
function LivePill() {
  const [on, setOn] = useState(true)
  useEffect(() => {
    if (STILL) return
    const t = setInterval(() => setOn((v) => !v), 900)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', borderRadius: 999, background: 'rgba(0,191,232,0.12)', border: '1px solid rgba(0,191,232,0.4)' }}>
      <span
        style={{
          width: 9, height: 9, borderRadius: 999, background: colors.cyan,
          boxShadow: `0 0 12px ${colors.cyan}`,
          opacity: on ? 1 : 0.3,
          transition: 'opacity 700ms ease',
        }}
      />
      <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>Live</span>
    </div>
  )
}
