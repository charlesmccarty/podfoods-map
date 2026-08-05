import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  Store, Users, Factory, Truck, ShoppingCart, Megaphone, UserPlus,
  Database, RefreshCw, Heart, ShieldCheck, Zap, Banknote,
  FileCheck2, MonitorSmartphone, PackageCheck, MoreHorizontal, Target,
  TrendingUp, LineChart, ShoppingBag, SlidersHorizontal,
  Gauge,
} from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, GradientRule, IconChip } from './src/components/elements'
import { riseIn, fadeIn, scaleIn } from './src/components/anim'
import { colors, font, gradient, radius } from './src/theme'
import { BrandLogo, BrandSymbol, Footer, HeroPhotoCarousel, Closer, halo, h2Style, coverVeil } from './common'
import { LiveDashboard } from './dashboard'

/* ══════════════════════════════════════════════════ shared slide primitives */

const cardBase: CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.lg,
}

/* ══════════════════════════════════════════════════════════════════ Cover */

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
        <motion.div variants={riseIn}><Eyebrow>Pod Foods &times; Bright.Blue &times; Miami Factory &times; Akiva</Eyebrow></motion.div>
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

/* ════════════════════════════════════════════════════════════════ Journey */

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

/* ═══════════════════════════════════════════════════════════ Intelligence */

export function Intelligence() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Live intelligence</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 66, marginTop: 14 }}>
        Connected Retail <GradientText>Intelligence</GradientText>
      </motion.h2>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', marginTop: 26 }}>
        <LiveDashboard />
      </div>

      <Closer muted="Brands no longer wait weeks for reports." accent="They optimise while campaigns are still running." />
      <Footer />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════ Payments */

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

/* ════════════════════════════════════════════════════════ Revenue streams */

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

/* ══════════════════════════════════════════════════════════════════ Close */

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

