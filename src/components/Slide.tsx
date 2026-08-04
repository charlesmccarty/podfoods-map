import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { BASE_W, BASE_H, colors, font, pad } from '../theme'
import { container } from './anim'

interface SlideProps {
  children: ReactNode
  background?: string
  // Decorative glow blobs in the corners; on by default for depth.
  glow?: boolean
  padded?: boolean
  style?: CSSProperties
  /** @deprecated Footers removed to match Magnum/Decorum style. Ignored. */
  footer?: boolean
  /** @deprecated Page numbers removed to match Magnum/Decorum style. Ignored. */
  pageNumber?: number
}

// `?clean` (used for screenshots and PDF export) renders slides already
// settled, so a capture never catches a half-played entrance.
const STILL =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('clean')

/**
 * The 1920x1080 authoring canvas. Every slide type composes on top of this.
 * The player mounts one slide at a time, so the entrance stagger runs on mount
 * rather than on scroll.
 */
export function Slide({
  children,
  background = colors.bg,
  glow = true,
  padded = true,
  style,
}: SlideProps) {
  return (
    <motion.div
      variants={container}
      initial={STILL ? 'show' : 'hidden'}
      animate="show"
      style={{
        position: 'relative',
        width: BASE_W,
        height: BASE_H,
        background,
        overflow: 'hidden',
        color: colors.text,
        fontFamily: font.body,
        ...style,
      }}
    >
      {glow && <SlideGlow />}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          padding: padded ? `${pad.y}px ${pad.x}px` : 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

function SlideGlow() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: -360,
          right: -260,
          width: 900,
          height: 900,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(24,62,246,0.28) 0%, rgba(24,62,246,0) 68%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -420,
          left: -300,
          width: 820,
          height: 820,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,191,232,0.16) 0%, rgba(0,191,232,0) 66%)',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
