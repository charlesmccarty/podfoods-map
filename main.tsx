import { StrictMode, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './src/index.css'
import { SlideStage } from './src/components/SlideStage'
import { colors, font } from './src/theme'

import {
  Cover, Journey, Intelligence,
  Payments, RevenueStreams, Close,
} from './slides'
import {
  ConsumerShift, Fragmented, Imagine, Anywhere, MediaConverts, RealTime,
  BrightBlue, IntegratedPlatform, PlanBookReport, OpportunityForBrands,
} from './opening'
import { Europa, Hyperion, Blinx, Callisto } from './machines'

/**
 * Bright.Blue x Pod Foods — Building the Future of Connected Retail.
 *
 * Every slide is authored against a fixed 1920x1080 canvas and scaled as a
 * single unit by SlideStage, so the deck holds its exact composition from a
 * projector down to a phone.
 */
const slides: ReactNode[] = [
  <Cover />,
  <ConsumerShift />,
  <Fragmented />,
  <Imagine />,
  <Anywhere />,
  <MediaConverts />,
  <RealTime />,
  <Journey />,
  <BrightBlue />,
  <IntegratedPlatform />,
  <Europa />,
  <Hyperion />,
  <Blinx />,
  <Callisto />,
  <PlanBookReport />,
  <Intelligence />,
  <Payments />,
  <RevenueStreams />,
  <OpportunityForBrands />,
  <Close />,
]

// `?clean` hides the on-screen nav — for screenshots and PDF export.
const CLEAN = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('clean')

function Player() {
  const [i, setI] = useState(() => {
    const n = parseInt(new URLSearchParams(window.location.search).get('slide') || '1', 10)
    return Number.isFinite(n) && n >= 1 && n <= slides.length ? n - 1 : 0
  })
  const count = slides.length
  const go = useCallback((dir: 1 | -1) => setI((p) => Math.min(count - 1, Math.max(0, p + dir))), [count])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1) }
      if (e.key === 'Home') setI(0)
      if (e.key === 'End') setI(count - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, count])

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('slide', String(i + 1))
    window.history.replaceState(null, '', url)
  }, [i])

  // Swipe on touch devices.
  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.changedTouches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) < 50) return
    go(dx < 0 ? 1 : -1)
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ position: 'fixed', inset: 0, background: colors.bgDeep, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <SlideStage fit="contain" background={colors.bgDeep}>
        <div key={i} style={{ width: '100%', height: '100%' }}>{slides[i]}</div>
      </SlideStage>

      {!CLEAN && (
        <>
          <button aria-label="Previous slide" onClick={() => go(-1)} disabled={i === 0} style={{ ...ctrl, left: 24 }}>
            <ChevronLeft size={26} />
          </button>
          <button aria-label="Next slide" onClick={() => go(1)} disabled={i === count - 1} style={{ ...ctrl, right: 24 }}>
            <ChevronRight size={26} />
          </button>
          <div style={pager}>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')} / {count}</span>
          </div>
        </>
      )}
    </div>
  )
}

const ctrl: CSSProperties = {
  position: 'fixed', top: '50%', transform: 'translateY(-50%)', width: 42, height: 42, borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)',
  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20,
}
const pager: CSSProperties = {
  position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', padding: '8px 18px', borderRadius: 999,
  background: 'rgba(0,0,0,0.5)', border: `1px solid ${colors.border}`, backdropFilter: 'blur(10px)',
  fontFamily: font.body, fontSize: 14, color: colors.textMuted, zIndex: 20,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Player />
  </StrictMode>,
)
