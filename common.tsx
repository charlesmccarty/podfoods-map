import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeIn, riseIn } from './src/components/anim'
import { colors, font, gradient, radius } from './src/theme'

// Shared building blocks for the Bright.Blue x Pod Foods deck. The visual
// language is inherited from the Bright.Blue agency deck: near-black stage,
// blue-to-cyan gradient accents, Nunito headings on DM Sans body copy.

export const FOOTER = 'Bright.Blue \u00d7 Pod Foods \u00b7 Connected Retail'

export function BrandLogo({ style }: { style?: CSSProperties }) {
  return <img src="brand/bb-logo.png" alt="Bright.Blue" style={{ height: 46, width: 'auto', display: 'block', ...style }} />
}

export function BrandSymbol({ style }: { style?: CSSProperties }) {
  return <img src="brand/symbol.png" alt="Bright.Blue" style={{ height: 46, width: 'auto', display: 'block', ...style }} />
}

export function Footer({ text = FOOTER, side = 'left' }: { text?: string; side?: 'left' | 'right' }) {
  return (
    <div style={{ position: 'absolute', ...(side === 'right' ? { right: 140 } : { left: 140 }), bottom: 54, zIndex: 4, fontFamily: font.body, fontSize: 15, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: colors.textFaint }}>
      {text}
    </div>
  )
}

export const heroVeil = (side: 'left' | 'right') =>
  side === 'left'
    ? `linear-gradient(90deg, rgba(5,5,25,0) 26%, rgba(5,5,25,.45) 46%, rgba(5,5,25,.86) 66%, ${colors.bg} 86%),
       linear-gradient(0deg, rgba(5,5,25,.55) 0%, rgba(5,5,25,0) 22%, rgba(5,5,25,0) 82%, rgba(5,5,25,.35) 100%)`
    : `linear-gradient(270deg, rgba(5,5,25,0) 26%, rgba(5,5,25,.45) 46%, rgba(5,5,25,.86) 66%, ${colors.bg} 86%),
       linear-gradient(0deg, rgba(5,5,25,.55) 0%, rgba(5,5,25,0) 22%, rgba(5,5,25,0) 82%, rgba(5,5,25,.35) 100%)`

/** Crossfading full-bleed hero photos behind the cover copy. */
export function HeroPhotoCarousel({ images, side = 'right', dwellMs = 4600, veil }: { images: { src: string; position?: string }[]; side?: 'left' | 'right'; dwellMs?: number; veil?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), dwellMs)
    return () => clearInterval(t)
  }, [images.length, dwellMs])

  const img = images[index] ?? images[0]

  return (
    <>
      <div style={{ position: 'absolute', inset: -10, overflow: 'hidden', isolation: 'isolate' }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={img.src + index}
            initial={{ opacity: 0, scale: 1.075 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.6, ease: 'easeInOut' },
              scale: { duration: 8, ease: [0.22, 0.61, 0.36, 1] },
            }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${img.src})`,
              backgroundSize: 'cover',
              backgroundPosition: img.position || (side === 'right' ? 'right center' : 'left center'),
              backgroundRepeat: 'no-repeat',
              transformOrigin: side === 'right' ? '70% 50%' : '60% 50%',
            }}
          />
        </AnimatePresence>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: veil ?? heroVeil(side), zIndex: 1 }} />
    </>
  )
}

/** Cover veil — keeps the left-hand copy legible while the photo stays visible. */
export const coverVeil =
  'linear-gradient(90deg, rgba(5,5,25,0.96) 0%, rgba(5,5,25,0.88) 30%, rgba(5,5,25,0.52) 58%, rgba(5,5,25,0.16) 100%), ' +
  'linear-gradient(0deg, rgba(5,5,25,0.6) 0%, rgba(5,5,25,0) 32%)'

/** Photo or looping video bled to the slide edge, veiled so copy stays legible. */
export function SideMedia({ src, side = 'right', position = 'center', veil: veilOverride }: { src: string; side?: 'left' | 'right'; position?: string; veil?: string }) {
  const veil = veilOverride ?? (side === 'right'
    ? `linear-gradient(90deg, ${colors.bg} 0%, rgba(5,5,25,0) 34%), linear-gradient(0deg, rgba(5,5,25,.5) 0%, rgba(5,5,25,0) 24%)`
    : `linear-gradient(270deg, ${colors.bg} 0%, rgba(5,5,25,0) 34%), linear-gradient(0deg, rgba(5,5,25,.5) 0%, rgba(5,5,25,0) 24%)`)
  return (
    <motion.div variants={fadeIn} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: position }} />
      <div style={{ position: 'absolute', inset: 0, background: veil }} />
    </motion.div>
  )
}

export const heroCopyLeft: CSSProperties = {
  position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%', zIndex: 2,
  display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 30px 0 110px',
}

export const heroCopyRight: CSSProperties = {
  position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%', zIndex: 2,
  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
  padding: '0 140px 0 30px', boxSizing: 'border-box',
}

export const splitWrap: CSSProperties = { position: 'absolute', inset: 0, display: 'flex' }
export const splitCopy: CSSProperties = { display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '96px 56px 96px 140px', zIndex: 3, minWidth: 0 }
export const h2Style: CSSProperties = { fontFamily: font.heading, fontWeight: 800, fontSize: 72, lineHeight: 1.05, letterSpacing: -1.5, margin: '20px 0 0' }
export const leadStyle: CSSProperties = { color: colors.textMuted, fontSize: 32, lineHeight: 1.5, marginTop: 24, maxWidth: 900 }

/** Standard slide heading: eyebrow, headline, optional lead. */
export function SlideHead({ eyebrow, children, lead, size = 78, maxWidth }: { eyebrow?: ReactNode; children: ReactNode; lead?: ReactNode; size?: number; maxWidth?: number }) {
  return (
    <>
      {eyebrow}
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: size, maxWidth }}>{children}</motion.h2>
      {lead && <motion.p variants={riseIn} style={leadStyle}>{lead}</motion.p>}
    </>
  )
}

/** The closing statement that ends most slides — muted line, then the payoff. */
export function Closer({ muted, accent }: { muted: string; accent: string }) {
  return (
    <motion.div variants={riseIn} style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 'auto', paddingTop: 44 }}>
      <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 30, color: colors.textMuted }}>{muted}</span>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: colors.cyan, flexShrink: 0 }} />
      <span style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30, color: colors.text }}>{accent}</span>
    </motion.div>
  )
}

/** Soft blue halo used behind hub marks and focal diagram nodes. */
export const halo = (size: number, opacity = 0.16): CSSProperties => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  width: size,
  height: size,
  borderRadius: 999,
  background: `radial-gradient(circle, rgba(24,62,246,${opacity}), rgba(5,5,25,0) 68%)`,
  pointerEvents: 'none',
})

export const cardStyle: CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.lg,
}

export const gradientBorderCard: CSSProperties = {
  background: colors.surfaceInverse,
  border: `1px solid ${colors.borderPrimary}`,
  borderRadius: radius.lg,
}

export const gradientFill = gradient.primary
