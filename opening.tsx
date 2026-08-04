import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Zap, Clock3, Store, ShoppingCart, Megaphone, BarChart3,
  Eye, RefreshCw, MonitorPlay, ArrowRight,
} from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, IconChip } from './src/components/elements'
import { riseIn, scaleIn } from './src/components/anim'
import { colors, font, radius } from './src/theme'
import { BrandSymbol, Footer, splitWrap, splitCopy, h2Style, leadStyle } from './common'

/**
 * Opening act, carried over from the "Future is Connected Retail" keynote:
 * the shift in expectations, the fragmentation it exposes, and the picture of
 * everything working as one. Sets up the brand journey slide that follows.
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

const hubLabel: CSSProperties = { fontFamily: font.heading, fontWeight: 800, fontSize: 22, lineHeight: 1.18, whiteSpace: 'pre-line' }

/** Node on the orbit ring — counter-rotates so the label stays upright. */
function HubNode({ icon, label, x, y }: { icon: typeof Store; label: string; x: number; y: number }) {
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', zIndex: 5 }}>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: ORBIT_SECONDS, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', width: 170 }}
      >
        <IconChip icon={icon} size={56} tone="gradient" style={{ borderRadius: 999 }} />
        <span style={hubLabel}>{label}</span>
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
              {HUB_NODES.map((n) => <HubNode key={n.label} icon={n.icon} label={n.label} x={n.x} y={n.y} />)}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </Slide>
  )
}
