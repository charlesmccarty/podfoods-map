import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Zap, Clock3, Store, ShoppingCart, Megaphone, BarChart3,
  Eye, RefreshCw, MonitorPlay, ArrowRight, Target,
  Rocket, Star, Plane, Hotel, Dumbbell, GraduationCap, Building2, Armchair,
  MapPin, Presentation, Cpu, Cloud, Code2, ScanEye, LineChart, LayoutGrid,
  CreditCard, Smartphone, Package, Boxes, Truck, BadgeCheck,
  FlaskConical, MessageSquare,
} from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, IconChip, Pill } from './src/components/elements'
import { fadeIn, riseIn, scaleIn } from './src/components/anim'
import { colors, font, gradient, radius } from './src/theme'
import { BrandLogo, BrandSymbol, Footer, HeroPhotoCarousel, heroCopyLeft, heroCopyRight, splitWrap, splitCopy, h2Style, leadStyle, coverVeil } from './common'

/**
 * Slides carried over from the "Future is Connected Retail" keynote: the shift
 * in expectations, the fragmentation it exposes, the picture of everything
 * working as one, and the company behind it.
 */

/* ══════════════════════════════════════════════════════════ Consumer shift */

const SHIFT = [
  { icon: Users, label: 'Consumers expect', items: ['Convenience', 'Personalisation', 'Instant gratification'] },
  { icon: Zap, label: 'Brands want', items: ['Faster launches', 'Direct relationships', 'Real-time feedback'] },
  { icon: Clock3, label: 'Retail delivers', items: ['Long lead times', 'Siloed channels', 'Insight too late'] },
]

export function ConsumerShift() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>The consumer shift</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 78 }}>
        Consumer expectations have<br /><GradientText>fundamentally changed.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ ...leadStyle, maxWidth: 900 }}>
        Consumers and brands have moved on. Retail hasn&apos;t.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 56, flex: 1, alignContent: 'start' }}>
        {SHIFT.map((c) => (
          <motion.div
            key={c.label}
            variants={riseIn}
            style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: 44, display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <IconChip icon={c.icon} size={72} tone="gradient" />
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30 }}>{c.label}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {c.items.map((it) => (
                <li key={it} style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                  <span style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 999, border: `1.5px solid ${colors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.cyan }}>
                    <ArrowRight size={24} />
                  </span>
                  <span style={{ color: colors.textMuted, fontSize: 22 }}>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <Footer />
    </Slide>
  )
}

/* ════════════════════════════════════════════════════════════ Fragmented */

const FRAG = [
  { icon: Store, title: 'Physical retail', desc: 'Months to shelf — the moment has passed.' },
  { icon: ShoppingCart, title: 'Digital commerce', desc: 'Cut off from the physical store.' },
  { icon: Megaphone, title: 'Media', desc: 'Drives awareness, rarely proven sales.' },
  { icon: BarChart3, title: 'Consumer insight', desc: 'Arrives siloed and weeks too late.' },
]

export function Fragmented() {
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 52%' }}>
          <motion.div variants={riseIn}><Eyebrow>The problem</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 82 }}>
            Today&apos;s retail is <GradientText>fragmented.</GradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={leadStyle}>
            Consumers experience one journey. Brands manage four disconnected ecosystems.
          </motion.p>
        </div>
        <div style={{ flex: '1 1 48%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26, padding: '96px 140px 96px 20px', zIndex: 3 }}>
          {FRAG.map((f) => (
            <motion.div
              key={f.title}
              variants={riseIn}
              style={{ display: 'flex', gap: 26, alignItems: 'center', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '26px 32px' }}
            >
              <IconChip icon={f.icon} size={64} tone="gradient" />
              <div>
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30 }}>{f.title}</div>
                <div style={{ color: colors.textMuted, fontSize: 22, marginTop: 4 }}>{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════ Imagine */

const IMAGINE = [
  { icon: Eye, text: <>Every <b style={{ color: colors.text }}>impression</b> becomes a sale</> },
  { icon: ShoppingCart, text: <>Every <b style={{ color: colors.text }}>purchase</b> creates insight</> },
  { icon: RefreshCw, text: <>Every <b style={{ color: colors.text }}>interaction</b> improves the next</> },
]

const ORBIT_R = 38.04 // % from centre — matches the node positions on the ring
const ORBIT_SECONDS = 46

function orbitPos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: 50 + ORBIT_R * Math.cos(rad), y: 50 + ORBIT_R * Math.sin(rad) }
}

const HUB_NODES = [
  { icon: Store, label: 'Physical\nRetail', ...orbitPos(-135) },
  { icon: ShoppingCart, label: 'Digital\nCommerce', ...orbitPos(-45) },
  { icon: MonitorPlay, label: 'Retail\nMedia', ...orbitPos(135) },
  { icon: BarChart3, label: 'Consumer\nIntelligence', ...orbitPos(45) },
]

const orbitLabel: CSSProperties = { fontFamily: font.heading, fontWeight: 800, fontSize: 22, lineHeight: 1.18 }

/** Node on an orbit ring — counter-rotates at the ring's speed so the label stays upright. */
function OrbitNode({
  icon, label, x, y, duration, iconSize = 56, labelStyle,
}: {
  icon: typeof Store
  label: string
  x: number
  y: number
  duration: number
  iconSize?: number
  labelStyle?: CSSProperties
}) {
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', zIndex: 5 }}>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: labelStyle ? 14 : 10, textAlign: 'center', width: labelStyle ? 170 : 150,
        }}
      >
        <IconChip icon={icon} size={iconSize} tone="gradient" style={{ borderRadius: 999 }} />
        <div style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: '#fff', lineHeight: 1.15, ...labelStyle }}>
          {label}
        </div>
      </motion.div>
    </div>
  )
}

export function Imagine() {
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 55%' }}>
          <motion.div variants={riseIn}><Eyebrow>The shift</Eyebrow></motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56, marginTop: 20 }}>
            <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 80, margin: 0 }}>
              Imagine if everything<br /><GradientText>worked together.</GradientText>
            </motion.h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {IMAGINE.map((b, i) => (
                <motion.div key={i} variants={riseIn} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <IconChip icon={b.icon} size={60} />
                  <span style={{ fontSize: 32, color: colors.textMuted }}>{b.text}</span>
                </motion.div>
              ))}
            </div>
            <motion.p variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: 0 }}>
              <GradientText>That&apos;s Connected Retail.</GradientText>
            </motion.p>
          </div>
        </div>

        <div style={{ flex: '1 1 45%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, padding: '0 80px 0 0' }}>
          <motion.div variants={scaleIn} style={{ position: 'relative', width: 640, height: 640 }}>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '100%', height: '100%', borderRadius: 999, background: 'radial-gradient(circle, rgba(24,62,246,.12), rgba(5,5,25,0) 68%)' }} />
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: `${ORBIT_R * 2}%`, height: `${ORBIT_R * 2}%`, borderRadius: 999, zIndex: 2, border: '1px solid rgba(255,255,255,0.12)' }} />
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 4, filter: 'drop-shadow(0 0 40px rgba(24,62,246,.8))' }}>
              <BrandSymbol style={{ height: 96 }} />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: ORBIT_SECONDS, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {HUB_NODES.map((n) => (
                <OrbitNode
                  key={n.label}
                  icon={n.icon}
                  label={n.label}
                  x={n.x}
                  y={n.y}
                  duration={ORBIT_SECONDS}
                  labelStyle={{ ...orbitLabel, whiteSpace: 'pre-line' }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </Slide>
  )
}

/* ═════════════════════════════════════════════════════════ Retail anywhere */

const ANYWHERE = [
  { icon: Rocket, text: <>Launch in <b style={{ color: colors.text }}>weeks, not months</b></> },
  { icon: RefreshCw, text: <>Physical + digital as <b style={{ color: colors.text }}>one</b></> },
  { icon: Star, text: <>Every location a <b style={{ color: colors.text }}>flagship</b></> },
]

const VENUES = [
  { icon: Plane, label: 'Airports' }, { icon: Hotel, label: 'Hotels' }, { icon: Dumbbell, label: 'Gyms' },
  { icon: GraduationCap, label: 'Universities' }, { icon: Building2, label: 'Offices' }, { icon: Armchair, label: 'Leisure' },
]

const DEPLOYMENTS = [
  { src: 'Blinx/Bright-Blue_Blinx_Suntory_Whisky_Photo_02.jpg', position: 'center 45%' },
  { src: 'Europa/Bright-Blue_Events_Europa_Adyen_Experience-London_Photo_04.jpg', position: 'center 40%' },
  { src: 'Blinx/Bright-Blue_Blinx_Porsche_Photo_01.jpg', position: 'center 45%' },
]

export function Anywhere() {
  return (
    <Slide padded={false} glow={false}>
      {/* Stronger cover-grade veil: these photos are far busier on the left
          than the ones this layout was designed around. */}
      <HeroPhotoCarousel images={DEPLOYMENTS} side="right" veil={coverVeil} />
      <div style={heroCopyLeft}>
        <motion.div variants={riseIn}><Eyebrow>Retail anywhere</Eyebrow></motion.div>
        <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 80 }}>
          Retail comes to<br /><GradientText>the consumer.</GradientText>
        </motion.h2>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {ANYWHERE.map((b, i) => (
            <motion.div key={i} variants={riseIn} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <IconChip icon={b.icon} size={60} />
              <span style={{ fontSize: 32, color: colors.textMuted }}>{b.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.div variants={riseIn} style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 46, maxWidth: 800 }}>
          {VENUES.map((v) => (
            <Pill key={v.label} style={{ gap: 12 }}><v.icon size={22} color={colors.cyan} /> {v.label}</Pill>
          ))}
        </motion.div>
      </div>
      <Footer />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════ Media that converts */

const CONVERTS = [
  { icon: MonitorPlay, text: <>Media at the <b style={{ color: colors.text }}>point of purchase</b></> },
  { icon: Target, text: <>Every impression an <b style={{ color: colors.text }}>opportunity</b></> },
  { icon: BarChart3, text: <>Every campaign <b style={{ color: colors.text }}>measurable</b></> },
]

const cyanLine: CSSProperties = { marginTop: 36, color: colors.cyan, fontWeight: 700, fontSize: 30, fontFamily: font.heading }

export function MediaConverts() {
  return (
    <Slide padded={false} glow={false}>
      <HeroPhotoCarousel images={[{ src: 'cheezits-ad.png', position: 'center center' }]} side="left" />
      <div style={{ ...heroCopyRight, width: '58%', padding: '0 90px 0 30px', alignItems: 'flex-end', textAlign: 'left' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <motion.div variants={riseIn}><Eyebrow>Media that converts</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 68, maxWidth: 'none', marginTop: 20 }}>
            Advertising that doesn&apos;t<br />
            just show. <GradientText>It sells.</GradientText>
          </motion.h2>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
            {CONVERTS.map((b, i) => (
              <motion.div key={i} variants={riseIn} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <IconChip icon={b.icon} size={60} />
                <span style={{ fontSize: 32, color: colors.textMuted }}>{b.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={{ ...cyanLine, maxWidth: 620, lineHeight: 1.35 }}>
            Retail becomes media. Media becomes commerce.
          </motion.p>
        </div>
      </div>
      <Footer />
    </Slide>
  )
}

/* ══════════════════════════════════════════════════════ Learn in real time */

const REALTIME = [
  { icon: Eye, text: <><b style={{ color: colors.text }}>Behaviour</b> — footfall to conversion</> },
  { icon: FlaskConical, text: <><b style={{ color: colors.text }}>Performance</b> — test price and creative</> },
  { icon: MessageSquare, text: <><b style={{ color: colors.text }}>Consumer voice</b> — ask, and hear back now</> },
]

export function RealTime() {
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 52%' }}>
          <motion.div variants={riseIn}><Eyebrow>Learn in real time</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 72 }}>
            Consumer intelligence,<br />not <GradientText>consumer data.</GradientText>
          </motion.h2>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {REALTIME.map((b, i) => (
              <motion.div key={i} variants={riseIn} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <IconChip icon={b.icon} size={60} />
                <span style={{ fontSize: 30, color: colors.textMuted }}>{b.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={{ ...cyanLine, maxWidth: 620, lineHeight: 1.35 }}>
            Every location becomes a live innovation lab.
          </motion.p>
        </div>
        <div style={{ flex: '1 1 48%', display: 'flex', alignItems: 'center', padding: '80px 120px 80px 0', zIndex: 3 }}>
          <LivePanel style={{ height: 'auto' }} />
        </div>
      </div>
      <Footer />
    </Slide>
  )
}

/** Live-updating mini dashboard for a single site — numbers drift every 1.3s. */
function LivePanel({ style }: { style?: CSSProperties }) {
  const [v, setV] = useState({ sales: 1247, impr: 3421900, inter: 8932, qr: 2145, acq: 412, conv: 6.8 })
  const [spark, setSpark] = useState<number[]>(() => Array.from({ length: 26 }, () => 14 + Math.random() * 16))
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: 12 }, () => 35 + Math.random() * 55))
  const [ages, setAges] = useState([23, 34, 21, 13, 9])

  useEffect(() => {
    const t = setInterval(() => {
      setV((p) => ({
        sales: p.sales + Math.floor(Math.random() * 4) + 1,
        impr: p.impr + Math.floor(Math.random() * 1400) + 300,
        inter: p.inter + Math.floor(Math.random() * 9) + 2,
        qr: p.qr + Math.floor(Math.random() * 5),
        acq: p.acq + (Math.random() < 0.55 ? 1 : 0),
        conv: Math.max(5.4, Math.min(8.6, p.conv + (Math.random() - 0.5) * 0.35)),
      }))
      setSpark((p) => [...p.slice(1), Math.max(6, Math.min(30, p[p.length - 1] + (Math.random() - 0.45) * 10))])
      setBars((p) => [...p.slice(1), Math.max(25, Math.min(100, p[p.length - 1] + (Math.random() - 0.5) * 40))])
      setAges((p) => p.map((a) => Math.max(4, a + (Math.random() - 0.5) * 2)))
    }, 1300)
    return () => clearInterval(t)
  }, [])

  const sparkPts = useMemo(
    () => spark.map((y, i) => `${((i / (spark.length - 1)) * 100).toFixed(1)},${(32 - y * 0.34).toFixed(1)}`).join(' '),
    [spark],
  )

  const kpis: [string, string][] = [
    [`£${Math.round(v.sales).toLocaleString()}`, 'Sales'],
    [`${(v.impr / 1e6).toFixed(2)}M`, 'Impressions'],
    [Math.round(v.inter).toLocaleString(), 'Interactions'],
    [Math.round(v.qr).toLocaleString(), 'QR Scans'],
    [String(v.acq), 'Acquisitions'],
    [`${v.conv.toFixed(1)}%`, 'Conversion'],
  ]
  const tileLabel: CSSProperties = { fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.textFaint, marginTop: 8 }
  const tile: CSSProperties = { background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.sm, padding: '16px 18px' }

  return (
    <motion.div variants={scaleIn} style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.borderStrong}`, borderRadius: radius.md, padding: 30, boxShadow: '0 40px 90px -30px rgba(0,0,0,0.7)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 17, letterSpacing: 2.5, textTransform: 'uppercase', color: colors.cyan }}>Manchester Airport &middot; Live</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: font.body, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#34d399' }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: '#34d399', boxShadow: '0 0 12px #34d399' }} /> Real-time
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {kpis.map(([n, l]) => (
          <div key={l} style={tile}>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 32, lineHeight: 1, letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums' }}>{n}</div>
            <div style={tileLabel}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <div style={{ ...tile, gridColumn: '1 / -1' }}>
          <div style={{ ...tileLabel, marginTop: 0, marginBottom: 10 }}>Sales today</div>
          <svg viewBox="0 0 100 34" preserveAspectRatio="none" style={{ width: '100%', height: 64, display: 'block', overflow: 'visible' }}>
            <defs>
              <linearGradient id="kfill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={colors.cyan} stopOpacity=".4" />
                <stop offset="1" stopColor={colors.cyan} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={`0,34 ${sparkPts} 100,34`} fill="url(#kfill)" />
            <polyline points={sparkPts} fill="none" stroke={colors.cyan} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={tile}>
          <div style={{ ...tileLabel, marginTop: 0, marginBottom: 10 }}>Age range</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(['18–24', '25–34', '35–44', '45–54', '55+'] as const).map((l, i) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 13, color: colors.textMuted, width: 48, flexShrink: 0 }}>{l}</span>
                <span style={{ flex: 1, height: 8, borderRadius: 999, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
                  <span style={{ display: 'block', height: '100%', width: `${ages[i]}%`, background: gradient.primary, transition: 'width .8s ease' }} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={tile}>
          <div style={{ ...tileLabel, marginTop: 0, marginBottom: 10 }}>Footfall / hr</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 120 }}>
            {bars.map((h, i) => (
              <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: gradient.primary, opacity: 0.9, transition: 'height .8s ease' }} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════ The opportunity for brands */

const BRAND_OPPORTUNITY = [
  { icon: MapPin, text: <>Be where consumers <b style={{ color: colors.text }}>are</b> — not just where products are sold.</> },
  { icon: Rocket, text: <>Launch faster. <b style={{ color: colors.text }}>Learn faster. Grow faster.</b></> },
  { icon: Star, text: <>Turn every touchpoint into a <b style={{ color: colors.text }}>premium brand experience</b>.</> },
  { icon: RefreshCw, text: <>Connect retail, media &amp; intelligence in <b style={{ color: colors.text }}>one platform</b>.</> },
  { icon: Target, text: <>Build the next generation of engagement — at <b style={{ color: colors.text }}>global scale</b>.</> },
]

export function OpportunityForBrands() {
  return (
    <Slide padded={false} glow={false}>
      <HeroPhotoCarousel images={[{ src: 'magnum-airport.png', position: 'right center' }]} side="right" />
      <div style={heroCopyLeft}>
        <motion.div variants={riseIn}><Eyebrow>The opportunity</Eyebrow></motion.div>
        <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 68 }}>
          The opportunity for <GradientText>brands</GradientText>.
        </motion.h2>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {BRAND_OPPORTUNITY.map((b, i) => (
            <motion.div key={i} variants={riseIn} style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <IconChip icon={b.icon} size={64} tone="gradient" />
              <span style={{ fontSize: 24, color: colors.textMuted, maxWidth: 560 }}>{b.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════ Plan, book and report */

const CLOUD_SHOTS = [
  'cloud/connect-1-objective.png',
  'cloud/connect-2-location.png',
  'cloud/connect-3-media.png',
  'cloud/connect-4-estimate.png',
]

const PLATFORM_FEATURES = [
  { icon: Target, title: 'Build audiences', desc: 'From live estate and venue data.' },
  { icon: LayoutGrid, title: 'Plan & book in one workflow', desc: 'Live availability across the estate.' },
  { icon: LineChart, title: 'Closed-loop results', desc: 'Sales and media in one dashboard.' },
]

/** Stacked product shots that deal themselves forward, one every few seconds. */
function CloudFlipCarousel() {
  const [active, setActive] = useState(0)
  const [exiting, setExiting] = useState<number | null>(null)
  const n = CLOUD_SHOTS.length

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => { setExiting(a); return (a + 1) % n })
      setTimeout(() => setExiting(null), 1000)
    }, 3200)
    return () => clearInterval(t)
  }, [n])

  const cardWrap: CSSProperties = { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }
  const imgStyle: CSSProperties = { width: '100%', maxWidth: 1024, borderRadius: 16, border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 44px 90px -28px rgba(0,0,0,0.9)', display: 'block' }

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: -40, right: 90 }}>
      <div style={{ position: 'absolute', width: '92%', height: '80%', top: '10%', left: '4%', borderRadius: 28, background: 'radial-gradient(circle at 55% 45%, rgba(24,62,246,0.28) 0%, rgba(5,5,25,0) 68%)' }} />
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {Array.from({ length: n }, (_, d) => {
          const idx = (active + d) % n
          if (exiting !== null && idx === exiting) return null
          return (
            <motion.div key={idx} style={{ ...cardWrap, zIndex: n - d }}>
              <motion.img
                src={CLOUD_SHOTS[idx]}
                alt=""
                initial={false}
                animate={{
                  y: -d * 56,
                  scale: 1 - d * 0.09,
                  opacity: d === 0 ? 1 : Math.max(0.28, 0.62 - d * 0.16),
                  filter: `brightness(${d === 0 ? 1 : Math.max(0.5, 0.82 - d * 0.12)})`,
                }}
                transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
                style={imgStyle}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function PlanBookReport() {
  return (
    <Slide padded={false} glow={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 54%' }}>
          <motion.div variants={riseIn}><Eyebrow>The platform</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 60, marginTop: 14 }}>
            Plan, book and report,<br /><GradientText>all in one place.</GradientText>
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 40, maxWidth: 720 }}>
            {PLATFORM_FEATURES.map((o) => (
              <motion.div key={o.title} variants={riseIn} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <IconChip icon={o.icon} size={64} tone="gradient" />
                <div>
                  <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30 }}>{o.title}</div>
                  <div style={{ color: colors.textMuted, fontSize: 22, marginTop: 4, lineHeight: 1.4, maxWidth: 560 }}>{o.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={{ marginTop: 30, color: colors.cyan, fontWeight: 700, fontSize: 22, fontFamily: font.heading }}>
            Hands-on support — we build the campaign with you.
          </motion.p>
        </div>

        <div style={{ flex: '1 1 46%', position: 'relative' }}>
          <CloudFlipCarousel />
          <div style={{ position: 'absolute', left: 40, bottom: 44, zIndex: 30, fontFamily: font.body, fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: colors.textMuted, background: 'rgba(0,0,0,0.5)', border: `1px solid ${colors.border}`, borderRadius: radius.pill, padding: '10px 18px' }}>
            Bright.Blue Cloud &middot; Connect
          </div>
        </div>
      </div>
      <Footer />
    </Slide>
  )
}

/* ══════════════════════════════════════════════════ One integrated platform */

const PLATFORM_INNER_R = 22
const PLATFORM_OUTER_R = 42
const PLATFORM_INNER_DURATION = 180
const PLATFORM_OUTER_DURATION = 300

const INNER_ORBIT = [
  { icon: Smartphone, label: 'Hardware', x: 50, y: 28.5 },
  { icon: Package, label: 'Fulfilment', x: 69.5, y: 39.5 },
  { icon: Boxes, label: 'Inventory', x: 69.5, y: 61.5 },
  { icon: Truck, label: 'Logistics', x: 50, y: 72 },
  { icon: CreditCard, label: 'Payments', x: 30.5, y: 61.5 },
  { icon: Cloud, label: 'Software', x: 30.5, y: 39.5 },
]

const OUTER_ORBIT = [
  { icon: Store, label: 'Physical Retail', x: 50, y: 8 },
  { icon: MonitorPlay, label: 'Retail Media', x: 81.3, y: 23.1 },
  { icon: Megaphone, label: 'DOOH', x: 91, y: 58.9 },
  { icon: BadgeCheck, label: 'Subscriptions', x: 67.4, y: 88 },
  { icon: MapPin, label: 'Predictive Retail', x: 32.6, y: 88 },
  { icon: BarChart3, label: 'Analytics', x: 9, y: 58.9 },
  { icon: ShoppingCart, label: 'Online Retail', x: 18.7, y: 23.1 },
]

const orbitRing = (radius: number): CSSProperties => ({
  position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
  width: `${radius * 2}%`, height: `${radius * 2}%`, borderRadius: 999, zIndex: 2,
  border: '1px solid rgba(255,255,255,0.12)',
})

export function IntegratedPlatform() {
  return (
    <Slide padded={false}>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 38%' }}>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 88 }}>
            One Integrated <GradientText>Platform</GradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={{ ...leadStyle, fontSize: 32, marginTop: 16, color: colors.textMuted }}>
            A fully turnkey solution
          </motion.p>
        </div>

        <div style={{ flex: '1 1 62%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
          <motion.div variants={scaleIn} style={{ position: 'relative', width: 820, height: 820 }}>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '100%', height: '100%', borderRadius: 999, background: 'radial-gradient(circle, rgba(24,62,246,.12), rgba(5,5,25,0) 68%)' }} />
            <div style={orbitRing(PLATFORM_OUTER_R)} />
            <div style={orbitRing(PLATFORM_INNER_R)} />
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 4, filter: 'drop-shadow(0 0 40px rgba(24,62,246,.8))' }}>
              <BrandSymbol style={{ height: 74 }} />
            </div>

            <motion.div animate={{ rotate: 360 }} transition={{ duration: PLATFORM_INNER_DURATION, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0 }}>
              {INNER_ORBIT.map((n) => (
                <OrbitNode key={n.label} {...n} duration={PLATFORM_INNER_DURATION} iconSize={48} labelStyle={orbitLabel} />
              ))}
            </motion.div>

            <motion.div animate={{ rotate: 360 }} transition={{ duration: PLATFORM_OUTER_DURATION, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0 }}>
              {OUTER_ORBIT.map((n) => (
                <OrbitNode key={n.label} {...n} duration={PLATFORM_OUTER_DURATION} iconSize={52} labelStyle={orbitLabel} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════ Introducing Bright.Blue */

const COMPETENCIES = [
  { icon: Store, label: 'Physical Retail' },
  { icon: ShoppingCart, label: 'Online Retail' },
  { icon: MapPin, label: 'Predictive Retail' },
  { icon: Presentation, label: 'Media & Advertising' },
  { icon: BarChart3, label: 'Data Analytics' },
]

const TECH = [
  { icon: Cpu, label: 'IoT Connected Hardware' },
  { icon: Cloud, label: 'Cloud Management' },
  { icon: Code2, label: 'AI Powered Software' },
  { icon: ScanEye, label: 'AI Powered Vision' },
  { icon: LineChart, label: 'AI Powered Analytics' },
  { icon: LayoutGrid, label: 'CMS & Ad Platform' },
  { icon: CreditCard, label: 'Integrated Payments' },
  { icon: Smartphone, label: 'Integrated eCommerce' },
]

export function BrightBlue() {
  const cardHead: CSSProperties = {
    fontFamily: font.heading, fontWeight: 800, fontSize: 27, textAlign: 'center', padding: '18px 20px',
    background: gradient.primary, color: '#fff',
    borderBottom: `1px solid ${colors.border}`,
  }
  const card: CSSProperties = { background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }
  const item: CSSProperties = { display: 'flex', alignItems: 'center', gap: 16, fontSize: 22, color: colors.textMuted }

  return (
    <Slide>
      <motion.div variants={riseIn} style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <BrandLogo style={{ height: 54 }} />
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30, flex: 1, minHeight: 0 }}>
        <motion.div variants={riseIn} style={card}>
          <div style={cardHead}>Global Presence</div>
          <div style={{ padding: '16px 22px 0', textAlign: 'center', fontSize: 20, fontWeight: 700, color: colors.textMuted }}>
            UK &middot; Europe &middot; US &middot; Middle East &middot; Australia
          </div>
          <div style={{ position: 'relative', flex: 1, minHeight: 0, margin: 20, borderRadius: radius.sm, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
            <div style={{ position: 'absolute', inset: 0, background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img
                src="world-presence-map.png"
                alt="UK, Europe, US, Middle East and Australia"
                style={{ height: '100%', width: 'auto', maxWidth: 'none', display: 'block', objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={riseIn} style={card}>
          <div style={cardHead}>Core Competencies</div>
          <div style={{ padding: '26px 34px', display: 'flex', flexDirection: 'column', gap: 22, justifyContent: 'flex-start', flex: 1 }}>
            {COMPETENCIES.map((c) => (
              <div key={c.label} style={item}><IconChip icon={c.icon} size={52} /> {c.label}</div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={riseIn} style={card}>
          <div style={cardHead}>Next Gen Technology</div>
          <div style={{ padding: '26px 34px', display: 'flex', flexDirection: 'column', gap: 22, justifyContent: 'flex-start', flex: 1 }}>
            {TECH.map((c) => (
              <div key={c.label} style={item}><IconChip icon={c.icon} size={52} /> {c.label}</div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </Slide>
  )
}
