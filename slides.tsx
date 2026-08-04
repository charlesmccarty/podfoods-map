import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Tag, Store, User, Users, Factory, Truck, ShoppingCart, Megaphone, UserPlus,
  Database, RefreshCw, Heart, CreditCard, BarChart3, ShieldCheck, Zap, Banknote,
  FileCheck2, MonitorSmartphone, PackageCheck, MoreHorizontal, Warehouse, Target,
  TrendingUp, LineChart, PoundSterling, Check, X, ShoppingBag, SlidersHorizontal,
  Gauge,
} from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, GradientRule, IconChip } from './src/components/elements'
import { riseIn, fadeIn, scaleIn } from './src/components/anim'
import { colors, font, gradient, radius } from './src/theme'
import { BrandLogo, BrandSymbol, Footer, HeroPhotoCarousel, Closer, halo, h2Style, coverVeil } from './common'

/* ══════════════════════════════════════════════════ shared slide primitives */

const cardBase: CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.lg,
}

/** Round node used in the flow diagrams — muted by default, gradient when live. */
function Node({ icon: Icon, label, live = false, size = 104 }: { icon: LucideIcon; label: ReactNode; live?: boolean; size?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: size + 60 }}>
      <div
        style={{
          width: size, height: size, borderRadius: 999, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: live ? gradient.primary : colors.surfaceStrong,
          border: live ? 'none' : `1px solid ${colors.border}`,
          color: live ? '#fff' : colors.textMuted,
          boxShadow: live ? '0 0 44px rgba(24,62,246,0.4)' : 'none',
        }}
      >
        <Icon size={size * 0.4} strokeWidth={2} />
      </div>
      <span style={{ fontFamily: font.body, fontSize: 18, fontWeight: 700, letterSpacing: 2.4, textTransform: 'uppercase', color: live ? colors.text : colors.textFaint, textAlign: 'center', lineHeight: 1.3 }}>
        {label}
      </span>
    </div>
  )
}

/** Horizontal connector with an arrowhead, used between flow nodes. */
function Arrow({ live = false, width = 78 }: { live?: boolean; width?: number }) {
  const c = live ? colors.cyan : colors.textFaint
  return (
    <svg width={width} height={16} viewBox={`0 0 ${width} 16`} style={{ flexShrink: 0, marginBottom: 44 }} aria-hidden="true">
      <line x1="0" y1="8" x2={width - 10} y2="8" stroke={c} strokeWidth="2" strokeLinecap="round" opacity={live ? 0.9 : 0.5} />
      <path d={`M${width - 14} 2.5 L${width - 4} 8 L${width - 14} 13.5`} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={live ? 0.9 : 0.5} />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════ 1 · Cover */

export function Cover() {
  return (
    <Slide glow={false}>
      <HeroPhotoCarousel
        side="right"
        veil={coverVeil}
        images={[
          { src: '3.jpg', position: 'center center' },
          { src: '10.jpg', position: 'center center' },
          { src: '4.jpg', position: 'center center' },
          { src: 'hyperion.png', position: 'center center' },
        ]}
      />
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 1180 }}>
        <motion.div variants={riseIn}><Eyebrow>Bright.Blue &times; Pod Foods</Eyebrow></motion.div>
        <motion.h1 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 116, lineHeight: 1.02, letterSpacing: -2.5, margin: '28px 0 0' }}>
          Building the Future of<br /><GradientText>Connected Retail</GradientText>
        </motion.h1>
        <motion.div variants={riseIn} style={{ marginTop: 40 }}><GradientRule width={170} /></motion.div>
        <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 36, color: colors.text, marginTop: 40, maxWidth: 1000 }}>
          Where distribution, commerce, media and data become one relationship.
        </motion.p>
      </div>
      <Footer text="Confidential" />
    </Slide>
  )
}

/* ═════════════════════════════════════════════════════════════ 2 · Thesis */

export function Thesis() {
  return (
    <Slide>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', columnGap: 90, flex: 1, alignItems: 'center' }}>
        {/* Traditional */}
        <div>
          <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 76, lineHeight: 1.04, letterSpacing: -1.6, color: colors.textMuted }}>
            Traditional<br />Retail
          </motion.h2>
          <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 40, color: colors.textFaint, marginTop: 18 }}>
            makes <span style={{ color: colors.text }}>sales.</span>
          </motion.p>

          <motion.div variants={riseIn} style={{ display: 'flex', alignItems: 'flex-start', marginTop: 78 }}>
            <Node icon={Tag} label="Brand" />
            <Arrow />
            <div style={{ position: 'relative' }}>
              <Node icon={Store} label="Retailer" />
              <div style={{ position: 'absolute', top: 190, left: '50%', transform: 'translateX(-50%)', width: 210, textAlign: 'center' }}>
                <div style={{ width: 1, height: 34, background: colors.borderStrong, margin: '0 auto 12px' }} />
                <div style={{ fontSize: 20, color: colors.textFaint, lineHeight: 1.4 }}>Customer data<br />stays here</div>
              </div>
            </div>
            <Arrow />
            <Node icon={User} label="Customer" />
          </motion.div>
        </div>

        <div style={{ alignSelf: 'stretch', background: colors.border }} />

        {/* Connected */}
        <div>
          <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 76, lineHeight: 1.04, letterSpacing: -1.6 }}>
            <GradientText>Connected<br />Retail</GradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 40, color: colors.textMuted, marginTop: 18 }}>
            builds <span style={{ color: colors.text }}>relationships.</span>
          </motion.p>

          <motion.div variants={riseIn} style={{ display: 'flex', alignItems: 'flex-start', marginTop: 78 }}>
            <Node icon={Tag} label="Brand" live />
            <Arrow live />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: 164 }}>
                <div style={{ position: 'relative', width: 104, height: 104, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={halo(230, 0.34)} />
                  <BrandSymbol style={{ height: 104, position: 'relative', filter: 'drop-shadow(0 0 34px rgba(24,62,246,.75))' }} />
                </div>
                <span style={{ fontFamily: font.body, fontSize: 18, fontWeight: 700, letterSpacing: 2.4, textTransform: 'uppercase', color: colors.text, textAlign: 'center', lineHeight: 1.3 }}>
                  Bright.Blue<br />Platform
                </span>
              </div>
              <div style={{ position: 'absolute', top: 196, left: '50%', transform: 'translateX(-50%)', width: 260, textAlign: 'center' }}>
                <div style={{ width: 1, height: 30, background: colors.cyan, opacity: 0.6, margin: '0 auto 12px' }} />
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.cyan, lineHeight: 1.4 }}>Real-time intelligence</div>
              </div>
            </div>
            <Arrow live />
            <Node icon={User} label="Customer" live />
          </motion.div>
        </div>
      </div>

      <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 34, textAlign: 'center', color: colors.textMuted, marginTop: 40 }}>
        Traditional retail ends with a sale. Connected retail <GradientText style={{ fontWeight: 800 }}>begins</GradientText> with one.
      </motion.p>
      <Footer />
    </Slide>
  )
}

/* ════════════════════════════════════════════════════════════ 3 · Journey */

const JOURNEY = [
  { icon: Factory, label: 'Manufacturing', live: false },
  { icon: Truck, label: 'Distribution', live: false },
  { icon: Store, label: 'Shelf', live: false },
  { icon: ShoppingCart, label: 'Commerce', live: true },
  { icon: Megaphone, label: 'Retail\nMedia', live: true },
  { icon: UserPlus, label: 'Customer\nAcquisition', live: true },
  { icon: Database, label: 'First-Party\nData', live: true },
  { icon: RefreshCw, label: 'Continuous\nOptimisation', live: true },
  { icon: Heart, label: 'Lifetime\nCustomer Value', live: true },
]

export function Journey() {
  const cols = JOURNEY.length
  const connectedStart = 3

  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>The brand journey</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 76, maxWidth: 1300 }}>
        The brand journey doesn&apos;t <GradientText>end at retail.</GradientText>
      </motion.h2>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          {/* rail */}
          <div style={{ position: 'absolute', top: 46, left: `${(100 / cols) * 0.5}%`, right: `${(100 / cols) * 0.5}%`, height: 2, background: colors.border }} />
          <div style={{ position: 'absolute', top: 46, left: `${(100 / cols) * (connectedStart + 0.5)}%`, right: `${(100 / cols) * 0.5}%`, height: 2, background: gradient.primary }} />
          {/* end-of-traditional divider */}
          <div style={{ position: 'absolute', top: -14, bottom: 76, left: `${(100 / cols) * connectedStart}%`, width: 2, background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${colors.borderStrong} 30%, ${colors.borderStrong} 70%, rgba(255,255,255,0) 100%)` }} />

          <ol style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
            {JOURNEY.map((s) => (
              <motion.li key={s.label} variants={riseIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <div
                  style={{
                    width: 92, height: 92, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: s.live ? gradient.primary : colors.bg,
                    border: s.live ? 'none' : `1px solid ${colors.borderStrong}`,
                    color: s.live ? '#fff' : colors.textFaint,
                    boxShadow: s.live ? '0 0 40px rgba(24,62,246,0.35)' : 'none',
                  }}
                >
                  <s.icon size={36} strokeWidth={2} />
                </div>
                <span style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 21, textAlign: 'center', lineHeight: 1.25, color: s.live ? colors.text : colors.textFaint, whiteSpace: 'pre-line' }}>
                  {s.label}
                </span>
              </motion.li>
            ))}
          </ol>

          {/* "traditional retail ends here" note under Shelf */}
          <motion.div
            variants={fadeIn}
            style={{ position: 'absolute', top: 200, left: `${(100 / cols) * (connectedStart - 0.5)}%`, transform: 'translateX(-50%)', width: 220, textAlign: 'center', fontSize: 20, color: colors.textFaint, lineHeight: 1.4 }}
          >
            Traditional retail<br />ends here
          </motion.div>

          {/* bracket under the connected half */}
          <motion.div
            variants={fadeIn}
            style={{ position: 'absolute', top: 214, left: `${(100 / cols) * (connectedStart + 0.5)}%`, right: `${(100 / cols) * 0.5}%` }}
          >
            <div style={{ height: 22, borderBottom: `2px solid ${colors.borderPrimary}`, borderLeft: `2px solid ${colors.borderPrimary}`, borderRight: `2px solid ${colors.borderPrimary}`, borderRadius: '0 0 16px 16px' }} />
            <div style={{ textAlign: 'center', marginTop: 22 }}>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30 }}><GradientText>Bright.Blue Connected Retail</GradientText></div>
              <div style={{ fontSize: 22, color: colors.textMuted, marginTop: 10 }}>The journey continues. The relationship compounds.</div>
            </div>
          </motion.div>
        </div>
      </div>

      <Closer muted="Traditional retail ends at the shelf." accent="Connected retail compounds every interaction." />
      <Footer />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════ 4 · Platform */

const PLATFORM = [
  { icon: ShoppingCart, title: 'Commerce', desc: 'Physical retail, endless aisle, subscriptions, click & collect and home delivery.' },
  { icon: Megaphone, title: 'Retail Media', desc: 'Sponsored placements, featured products, digital out-of-home advertising and brand activations.' },
  { icon: CreditCard, title: 'Payments', desc: 'One payment infrastructure connecting physical and online commerce.' },
  { icon: BarChart3, title: 'Intelligence', desc: 'Live sales, customer insights, attribution and continuous optimisation.' },
]

export function Platform() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>The platform</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 76 }}>
        The <GradientText>Connected Retail</GradientText> Platform
      </motion.h2>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 420px 1fr', alignItems: 'center', columnGap: 56, marginTop: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
          {PLATFORM.slice(0, 2).map((c) => <HubCard key={c.title} {...c} />)}
        </div>

        <motion.div variants={scaleIn} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={halo(560, 0.3)} />
          <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: 999, border: `1px solid ${colors.border}` }} />
          <div style={{ position: 'absolute', width: 452, height: 452, borderRadius: 999, border: `1px solid rgba(255,255,255,0.05)` }} />
          <BrandSymbol style={{ height: 150, position: 'relative', filter: 'drop-shadow(0 0 50px rgba(24,62,246,.8))' }} />
          <div style={{ position: 'relative', marginTop: 26, fontFamily: font.heading, fontWeight: 800, fontSize: 32, textAlign: 'center' }}>Bright.Blue<br />Platform</div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
          {PLATFORM.slice(2).map((c) => <HubCard key={c.title} {...c} />)}
        </div>
      </div>

      <Closer muted="Every interaction is measurable." accent="Every interaction is monetisable." />
      <Footer />
    </Slide>
  )
}

function HubCard({ icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <motion.div variants={riseIn} style={{ ...cardBase, padding: 34, display: 'flex', gap: 26, alignItems: 'flex-start' }}>
      <IconChip icon={icon} size={68} tone="gradient" />
      <div>
        <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30 }}>{title}</div>
        <div style={{ color: colors.textMuted, fontSize: 21, marginTop: 8, lineHeight: 1.45 }}>{desc}</div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════ 5 · Formats */

const FORMATS = [
  { name: 'Europa', src: '10.jpg', desc: 'Brand-wrapped connected units for events and high-footfall activations.' },
  { name: 'Hyperion', src: 'hyperion.png', desc: 'Large-format connected retail for travel hubs and flagship locations.' },
  { name: 'Blinx', src: '4.jpg', desc: 'Premium connected display for hotels, lounges and members\u2019 clubs.' },
]

export function Formats() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Retail formats</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 76 }}>
        One platform. <GradientText>Three retail formats.</GradientText>
      </motion.h2>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, alignContent: 'center', marginTop: 40 }}>
        {FORMATS.map((f) => (
          <motion.div key={f.name} variants={riseIn} style={{ ...cardBase, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', background: colors.bgDeep }}>
              <img src={f.src} alt={`${f.name} connected retail unit`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '32px 34px 36px' }}>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 40 }}>{f.name}</div>
              <GradientRule width={54} height={5} style={{ marginTop: 16 }} />
              <div style={{ color: colors.textMuted, fontSize: 21, marginTop: 20, lineHeight: 1.45 }}>{f.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 30, color: colors.textMuted, marginTop: 'auto', paddingTop: 44 }}>
        Every model is powered by the same <span style={{ color: colors.text }}>Bright.Blue platform.</span>
      </motion.p>
      <Footer />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════ 6 · Intelligence */

type MetricRow = { k: string; v: string; up?: boolean; bar?: number; spark?: string }

const PANELS: { title: string; rows: MetricRow[] }[] = [
  {
    title: 'Live Sales',
    rows: [
      { k: 'Sell-through', v: '84.2%', up: true, bar: 84 },
      { k: 'SKU performance', v: '+18%', up: true, spark: 'M1 14 L20 12 L38 13 L56 8 L74 9 L92 4 L119 6' },
      { k: 'Units sold', v: '12,418' },
      { k: 'Basket value', v: '\u00a327.80' },
      { k: 'Location sales', v: '\u00a3184k', up: true, spark: 'M1 12 L24 11 L48 13 L72 8 L96 7 L119 5' },
    ],
  },
  {
    title: 'Consumer Intelligence',
    rows: [
      { k: 'Age 25\u201334', v: '41%', bar: 41 },
      { k: 'Female / Male', v: '58% / 42%' },
      { k: 'Units per basket', v: '2.3' },
      { k: 'Visit frequency', v: '2.4\u00d7 / wk' },
      { k: 'Repeat purchase', v: '37%', up: true, bar: 37 },
    ],
  },
  {
    title: 'Media Performance',
    rows: [
      { k: 'Impressions', v: '1.28M', spark: 'M1 15 L18 13 L36 14 L54 9 L72 10 L90 5 L119 3' },
      { k: 'Engagement rate', v: '6.8%', up: true, bar: 68 },
      { k: 'Conversions', v: '24,106' },
      { k: 'ROAS', v: '4.6\u00d7', up: true },
      { k: 'CTR', v: '2.9%' },
    ],
  },
  {
    title: 'Commercial Intelligence',
    rows: [
      { k: 'Avg. selling price', v: '\u00a34.85' },
      { k: 'Campaign revenue', v: '\u00a396.2k', up: true, spark: 'M1 13 L22 12 L44 10 L66 11 L88 6 L119 4' },
      { k: 'Category growth', v: '+9.4%', up: true, bar: 62 },
      { k: 'Gross margin', v: '34.1%' },
    ],
  },
]

export function Intelligence() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Live intelligence</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 76 }}>
        Connected Retail <GradientText>Intelligence</GradientText>
      </motion.h2>

      <motion.div variants={riseIn} style={{ ...cardBase, marginTop: 44, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, padding: '24px 34px', borderBottom: `1px solid ${colors.border}`, background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26 }}>Bright.Blue Intelligence</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', borderRadius: 999, background: 'rgba(0,191,232,0.12)', border: `1px solid rgba(0,191,232,0.4)` }}>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: colors.cyan, boxShadow: `0 0 12px ${colors.cyan}` }} />
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>Live</span>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 19, color: colors.textFaint }}>Updated just now &middot; UK Network</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: colors.border }}>
          {PANELS.map((p) => (
            <div key={p.title} style={{ background: colors.bg, padding: '28px 30px 30px' }}>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 24, paddingBottom: 14, borderBottom: `2px solid ${colors.borderPrimary}`, marginBottom: 4 }}>{p.title}</div>
              {p.rows.map((r) => <Metric key={r.k} row={r} />)}
            </div>
          ))}
        </div>
      </motion.div>

      <Closer muted="Brands no longer wait weeks for reports." accent="They optimise while campaigns are still running." />
      <Footer />
    </Slide>
  )
}

function Metric({ row }: { row: MetricRow }) {
  return (
    <div style={{ padding: '17px 0', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14 }}>
        <span style={{ fontSize: 20, color: colors.textMuted }}>{row.k}</span>
        <span style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 24, color: row.up ? colors.cyan : colors.text, whiteSpace: 'nowrap' }}>{row.v}</span>
      </div>
      {row.bar !== undefined && (
        <div style={{ marginTop: 12, height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <div style={{ width: `${row.bar}%`, height: '100%', borderRadius: 999, background: gradient.primary }} />
        </div>
      )}
      {row.spark && (
        <svg viewBox="0 0 120 18" preserveAspectRatio="none" style={{ width: '100%', height: 22, marginTop: 10, display: 'block' }} aria-hidden="true">
          <path d={row.spark} fill="none" stroke={colors.cyan} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════ 7 · Payments */

const CHANNELS = [
  { icon: MonitorSmartphone, label: 'Connected\nRetail Devices' },
  { icon: ShoppingCart, label: 'Online\nStorefronts' },
  { icon: PackageCheck, label: 'Click &\nCollect' },
  { icon: Truck, label: 'Home\nDelivery' },
  { icon: RefreshCw, label: 'Subscriptions' },
  { icon: MoreHorizontal, label: 'And more\nchannels' },
]

const PAY_STEPS = [
  { icon: ShieldCheck, title: 'Authorise', desc: 'Secure and seamless authorisation.' },
  { icon: Zap, title: 'Capture', desc: 'Every transaction captured in real time.' },
  { icon: Banknote, title: 'Settle', desc: 'Instant settlement and cash withdrawl.' },
  { icon: FileCheck2, title: 'Reconcile', desc: 'Automated reconciliation across all channels.' },
]

export function Payments() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Payments</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 76 }}>
        One payment infrastructure. <GradientText>Every transaction.</GradientText>
      </motion.h2>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 40 }}>
        {/* channels */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${CHANNELS.length}, 1fr)`, gap: 20, position: 'relative', zIndex: 2 }}>
          {CHANNELS.map((c) => (
            <motion.div key={c.label} variants={riseIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <IconChip icon={c.icon} size={64} />
              <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 20, textAlign: 'center', lineHeight: 1.3, color: colors.textMuted, whiteSpace: 'pre-line' }}>{c.label}</span>
            </motion.div>
          ))}
        </div>

        {/* converging wires */}
        <svg viewBox="0 0 1640 92" preserveAspectRatio="none" style={{ width: '100%', height: 92, display: 'block', marginTop: -4 }} aria-hidden="true">
          {[136, 410, 683, 957, 1230, 1504].map((x, n) => (
            <path key={n} d={`M${x} 0 C${x} 48, 820 38, 820 88`} fill="none" stroke={colors.borderPrimary} strokeWidth="1.5" />
          ))}
        </svg>

        {/* hub */}
        <motion.div
          variants={scaleIn}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            padding: '26px 40px', borderRadius: radius.lg, background: gradient.primary,
            boxShadow: '0 30px 80px -30px rgba(24,62,246,0.9)', position: 'relative', zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <BrandSymbol style={{ height: 52 }} />
            <span style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 42 }}>Bright.Blue Payments</span>
          </div>
          <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: 2.6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.82)' }}>
            One merchant account &middot; One payment flow &middot; One customer record
          </div>
        </motion.div>

        {/* pipeline */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PAY_STEPS.length}, 1fr)`, gap: 26, marginTop: 46 }}>
          {PAY_STEPS.map((s) => (
            <motion.div key={s.title} variants={riseIn} style={{ ...cardBase, padding: '28px 30px 30px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <IconChip icon={s.icon} size={62} tone="gradient" />
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 28 }}>{s.title}</div>
              <div style={{ fontSize: 21, color: colors.textMuted, lineHeight: 1.45 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </Slide>
  )
}

/* ═════════════════════════════════════════════════════ 8 · Revenue streams */

const STREAMS = [
  {
    icon: TrendingUp,
    title: 'Revenue',
    desc: 'Immediate and recurring revenue opportunities.',
    items: [
      { icon: ShoppingCart, t: 'Commerce', s: 'Product sales' },
      { icon: Megaphone, t: 'Retail Media', s: 'Sponsored placements' },
      { icon: RefreshCw, t: 'Subscriptions', s: 'Recurring revenue' },
    ],
  },
  {
    icon: Users,
    title: 'Customer Data',
    desc: 'Build lasting relationships with first-party data.',
    items: [
      { icon: Database, t: 'First-party Data', s: 'Purchase behaviour' },
      { icon: UserPlus, t: 'CRM', s: 'Customer insights' },
      { icon: Heart, t: 'Loyalty', s: 'Stronger retention' },
    ],
  },
  {
    icon: Gauge,
    title: 'Intelligence',
    desc: 'Turn data into action with real-time intelligence.',
    items: [
      { icon: LineChart, t: 'Live Reporting', s: 'Real-time performance' },
      { icon: SlidersHorizontal, t: 'Optimisation', s: 'Campaign optimisation' },
      { icon: Target, t: 'Attribution', s: 'Measure what matters' },
    ],
  },
]

export function RevenueStreams() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Value creation</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 66, marginTop: 16 }}>
        Every interaction creates <GradientText>multiple revenue streams.</GradientText>
      </motion.h2>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 22 }}>
        <motion.div
          variants={scaleIn}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 18, padding: '16px 36px 16px 18px', borderRadius: 999, background: colors.surfaceInverse, border: `1px solid ${colors.borderPrimary}` }}
        >
          <IconChip icon={ShoppingBag} size={52} tone="gradient" style={{ borderRadius: 999 }} />
          <span style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 29 }}>Customer Interaction</span>
        </motion.div>

        {/* tree */}
        <svg viewBox="0 0 1640 62" preserveAspectRatio="none" style={{ width: '100%', height: 62, display: 'block' }} aria-hidden="true">
          <path d="M820 0 V34" stroke={colors.borderPrimary} strokeWidth="2" fill="none" />
          <path d="M273 60 V34 H1367 V60" stroke={colors.borderPrimary} strokeWidth="2" fill="none" />
          <path d="M820 34 V60" stroke={colors.borderPrimary} strokeWidth="2" fill="none" />
        </svg>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 44, width: '100%' }}>
          {STREAMS.map((col) => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div variants={riseIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <IconChip icon={col.icon} size={56} tone="gradient" style={{ borderRadius: 999 }} />
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30, marginTop: 14 }}>{col.title}</div>
                <div style={{ fontSize: 19, color: colors.textMuted, marginTop: 8, maxWidth: 360, lineHeight: 1.4 }}>{col.desc}</div>
              </motion.div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', marginTop: 22 }}>
                {col.items.map((it) => (
                  <motion.div key={it.t} variants={riseIn} style={{ ...cardBase, borderRadius: radius.md, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 18 }}>
                    <IconChip icon={it.icon} size={44} />
                    <div>
                      <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 22 }}>{it.t}</div>
                      <div style={{ fontSize: 18, color: colors.textMuted, marginTop: 2 }}>{it.s}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div variants={riseIn} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 'auto', paddingTop: 30 }}>
        <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 27, color: colors.textMuted }}>One interaction.</span>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: colors.cyan }} />
        <span style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 27 }}><GradientText>Multiple value streams.</GradientText></span>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: colors.cyan }} />
        <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 27, color: colors.textMuted }}>Stronger brands.</span>
      </motion.div>
      <Footer />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════ 9 · Pod Foods */

const TODAY = [
  { icon: Tag, t: 'Sells through wholesale', s: 'One-off transactions' },
  { icon: BarChart3, t: 'Limited brand insight', s: 'Little to no customer data' },
  { icon: Target, t: 'Hard to measure impact', s: 'No closed-loop attribution' },
  { icon: Users, t: 'No ongoing relationship', s: 'Ends at the point of sale' },
]

const TOMORROW = [
  { icon: ShoppingCart, t: 'Premium retail distribution', s: 'More placements. More doors.' },
  { icon: Target, t: 'Closed-loop attribution', s: 'Know what works. Prove impact.' },
  { icon: Users, t: 'First-party customer relationships', s: 'Own the relationship. Drive loyalty.' },
  { icon: LineChart, t: 'Real-time customer intelligence', s: 'Understand behaviour as it happens.' },
  { icon: RefreshCw, t: 'Continuous optimisation', s: 'Improve assortment, pricing & media.' },
  { icon: PoundSterling, t: 'New recurring revenue', s: 'Beyond wholesale margins.' },
]

export function PodFoods() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Why it matters</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 76 }}>
        Why this matters for <GradientText>Pod Foods.</GradientText>
      </motion.h2>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 300px 1.08fr', alignItems: 'center', marginTop: 24 }}>
        {/* Today */}
        <motion.div variants={riseIn} style={{ ...cardBase, padding: '30px 30px 24px', position: 'relative' }}>
          <Badge>Today</Badge>
          <PanelLead icon={Warehouse} title="Distributor" sub="Moves products." tone="muted" />
          {TODAY.map((r) => (
            <div key={r.t} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '17px 0', borderTop: `1px solid ${colors.border}` }}>
              <IconChip icon={r.icon} size={50} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 23, color: colors.textMuted }}>{r.t}</div>
                <div style={{ fontSize: 19, color: colors.textFaint, marginTop: 2 }}>{r.s}</div>
              </div>
              <span style={{ width: 30, height: 30, borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: colors.textFaint }}>
                <X size={16} strokeWidth={2.6} />
              </span>
            </div>
          ))}
        </motion.div>

        {/* Hub */}
        <motion.div variants={scaleIn} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={halo(430, 0.34)} />
          <BrandSymbol style={{ height: 120, position: 'relative', filter: 'drop-shadow(0 0 44px rgba(24,62,246,.8))' }} />
          <div style={{ position: 'relative', marginTop: 22, textAlign: 'center' }}>
            <BrandLogo style={{ height: 34, margin: '0 auto' }} />
            <div style={{ marginTop: 12, fontSize: 16, fontWeight: 700, letterSpacing: 2.6, textTransform: 'uppercase', color: colors.cyan }}>Connected Retail</div>
          </div>
        </motion.div>

        {/* Tomorrow */}
        <motion.div variants={riseIn} style={{ ...cardBase, background: colors.surfaceInverse, border: `1px solid ${colors.borderPrimary}`, padding: '30px 30px 24px', position: 'relative' }}>
          <Badge tone="gradient">Tomorrow</Badge>
          <PanelLead icon={TrendingUp} title="Connected Platform" sub="Creates ongoing value." tone="bright" />
          {TOMORROW.map((r) => (
            <div key={r.t} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0', borderTop: `1px solid rgba(255,255,255,0.08)` }}>
              <span style={{ width: 26, height: 26, borderRadius: 999, background: gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={15} strokeWidth={3} />
              </span>
              <div>
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 23 }}>{r.t}</div>
                <div style={{ fontSize: 19, color: colors.textMuted, marginTop: 2 }}>{r.s}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </Slide>
  )
}

function Badge({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'gradient' }) {
  return (
    <span
      style={{
        position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
        padding: '7px 20px', borderRadius: 999, whiteSpace: 'nowrap',
        fontSize: 15, fontWeight: 800, letterSpacing: 2.6, textTransform: 'uppercase',
        ...(tone === 'gradient'
          ? { background: gradient.primary, color: '#fff' }
          : { background: '#12122b', border: `1px solid ${colors.border}`, color: colors.textFaint }),
      }}
    >
      {children}
    </span>
  )
}

function PanelLead({ icon, title, sub, tone }: { icon: LucideIcon; title: string; sub: string; tone: 'muted' | 'bright' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 20 }}>
      <IconChip icon={icon} size={58} tone={tone === 'bright' ? 'gradient' : 'surface'} />
      <div>
        <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30, color: tone === 'bright' ? colors.text : colors.textMuted }}>{title}</div>
        <div style={{ fontSize: 20, color: colors.textFaint, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════ 10 · Opportunity */

const OLD_WAY = [
  'Products are distributed.',
  'Sales are reported weeks later.',
  'The retailer owns the customer relationship.',
]
const NEW_WAY = [
  'Products are distributed.',
  'Consumers engage directly with brands.',
  'Every interaction is measured.',
  'Every transaction is attributed.',
  'Every campaign is optimised in real time.',
  'Brands own the relationship.',
]

export function Opportunity() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>The opportunity</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 76 }}>
        The <GradientText>opportunity.</GradientText>
      </motion.h2>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, alignItems: 'stretch', marginTop: 40, paddingBottom: 20 }}>
        <motion.div variants={riseIn} style={{ ...cardBase, padding: '48px 52px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 44, color: colors.textMuted }}>Traditional Retail</div>
          <div style={{ width: 54, height: 4, borderRadius: 999, background: colors.borderStrong, margin: '20px 0 34px' }} />
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {OLD_WAY.map((t) => (
              <li key={t} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', fontSize: 28, color: colors.textFaint, lineHeight: 1.4 }}>
                <span style={{ width: 9, height: 9, borderRadius: 2.5, background: colors.textFaint, marginTop: 14, flexShrink: 0 }} />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={riseIn}
          style={{ borderRadius: radius.lg, padding: '48px 52px', display: 'flex', flexDirection: 'column', background: gradient.primary, boxShadow: '0 40px 90px -40px rgba(24,62,246,0.9)' }}
        >
          <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 44 }}>Connected Retail</div>
          <div style={{ width: 54, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.7)', margin: '20px 0 34px' }} />
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {NEW_WAY.map((t) => (
              <li key={t} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', fontSize: 28, color: '#fff', lineHeight: 1.4 }}>
                <span style={{ width: 26, height: 26, borderRadius: 999, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 7, flexShrink: 0 }}>
                  <Check size={15} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <Footer />
    </Slide>
  )
}

/* ════════════════════════════════════════════════════════════ 11 · Close */

export function Close() {
  return (
    <Slide background={colors.bgDeep}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.div variants={scaleIn} style={{ position: 'relative', marginBottom: 60 }}>
          <div style={halo(620, 0.4)} />
          <BrandSymbol style={{ height: 118, position: 'relative', filter: 'drop-shadow(0 0 50px rgba(24,62,246,.85))' }} />
        </motion.div>

        <motion.div variants={riseIn}><Eyebrow style={{ justifyContent: 'center' }}>Bright.Blue &times; Pod Foods</Eyebrow></motion.div>

        <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 104, lineHeight: 1.04, letterSpacing: -2.2, margin: '30px 0 0', maxWidth: 1500 }}>
          Building the Future of<br /><GradientText>Connected Retail</GradientText>
        </motion.h2>

        <motion.div variants={riseIn} style={{ marginTop: 46 }}><GradientRule width={170} /></motion.div>
      </div>
    </Slide>
  )
}

