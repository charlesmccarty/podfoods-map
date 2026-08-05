import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, GradientRule } from './src/components/elements'
import { riseIn, scaleIn } from './src/components/anim'
import { colors, font, radius } from './src/theme'
import { Footer } from './common'

/**
 * One page per retail format — a photo collage of that machine in the wild.
 * Photography lives in Public/<Machine>/ and is grouped by machine type.
 *
 * Tiles take either a still or a looping video: set `kind: 'video'` and point
 * `src` at an mp4 in the same folder and it plays muted on loop in place.
 */
type Tile = {
  src: string
  kind?: 'img' | 'video'
  caption?: string
  area: string
  position?: string
  /** Seconds to skip on load and on each loop, past any intro footage. */
  start?: number
}

type Machine = {
  index: number
  name: string
  points: string[]
  /** Collage layout — takes anything from one tile to four. */
  columns: string
  rows: string
  tiles: Tile[]
}

const MACHINES: Machine[] = [
  {
    index: 1,
    name: 'Europa',
    points: ['Full-height digital display', 'Wrapped to any brand, any shape', 'Gyms, events, high street and retail'],
    columns: '1fr 1fr',
    rows: '1fr 1fr',
    tiles: [
      { src: 'Europa/Bright-Blue_Events_Europa_Costa_Coffee-Catch-a-Matcha_Photo_01 (1).jpg', caption: 'Costa \u00b7 Catch a Matcha', area: '1 / 1 / 2 / 2' },
      { src: 'Europa/Bright-Blue_MADFest_Photo_14b (2).jpg', caption: 'Pepsi \u00b7 MADFest', area: '1 / 2 / 2 / 3' },
      { src: 'Europa/Bright-Blue_Europa_Huel-Activation_Render_01 (1).jpg', caption: 'Huel \u00b7 activation', area: '2 / 1 / 3 / 2' },
      { src: 'Europa/Bright-Blue_Snap-Fitness_Virgin-Media_Photo_01 (3).jpg', caption: 'Virgin Media', area: '2 / 2 / 3 / 3' },
    ],
  },
  {
    index: 2,
    name: 'Hyperion',
    points: ['Wide multi-bay range', 'Travel and flagship sites', 'Built for high dwell time'],
    columns: '1fr 1fr',
    rows: '1.25fr 1fr',
    tiles: [
      { src: 'Hyperion/Bright-Blue_Events_Hyperion_NADairX_London-Longevity_Video.mp4', kind: 'video', caption: 'NAD airX \u00b7 The Longevity Show', area: '1 / 1 / 2 / 3', start: 6 },
      { src: 'Hyperion/Bright-Blue_Hyperion_Coca-Cola_Airport_Photo_01.png', caption: 'Coca-Cola \u00b7 airport', area: '2 / 1 / 3 / 2' },
      { src: 'Hyperion/Bright-Blue_Hyperion_Anker_Airport_Photo_01.png', caption: 'Anker \u00b7 Power Your Journey', area: '2 / 2 / 3 / 3' },
    ],
  },
  {
    index: 3,
    name: 'Blinx',
    points: ['Individually lit glass lockers', 'Interactive product screen', 'High-value and premium ranges'],
    columns: '1fr 1fr',
    rows: '1.25fr 1fr',
    tiles: [
      { src: 'Blinx/Bright-Blue_Blinx_Suntory_Whisky_Photo_02.jpg', caption: 'Suntory \u00b7 whisky', area: '1 / 1 / 2 / 3' },
      { src: 'Blinx/Bright-Blue_Blinx_Porsche_Photo_01.jpg', caption: 'Porsche Design', area: '2 / 1 / 3 / 2' },
      { src: 'Blinx/Bright-Blue_Blinx_Suntory_Whisky_Photo_01.jpg', caption: 'Hibiki \u00b7 interactive screen', area: '2 / 2 / 3 / 3', position: 'left center' },
    ],
  },
  {
    index: 4,
    name: 'Callisto',
    points: ['Frozen product on demand', 'Ice cream and dessert brands', 'Airports, stations and campuses'],
    columns: '1.15fr 1fr',
    rows: '1fr 1fr',
    tiles: [
      { src: 'Callisto/Bright-Blue_Callisto_Magnum_Airport_Render_01.jpg', caption: 'Magnum \u00b7 airport', area: '1 / 1 / 2 / 2' },
      { src: 'Callisto/Bright-Blue_Callisto_Nuii_Train-Station_Render.jpg', caption: 'Nuii \u00b7 train station', area: '2 / 1 / 3 / 2' },
      { src: 'Callisto/Bright-Blue_Callisto_Cornetto_University_Render.jpg', caption: 'Cornetto \u00b7 university', area: '1 / 2 / 3 / 3' },
    ],
  },
]

const tileBase: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  background: colors.bgDeep,
}

function MediaTile({ tile }: { tile: Tile }) {
  return (
    <motion.div variants={scaleIn} style={{ ...tileBase, gridArea: tile.area }}>
      {tile.kind === 'video' ? (
        <video
          src={tile.src}
          autoPlay
          muted
          playsInline
          loop={!tile.start}
          onLoadedMetadata={tile.start ? (e) => { e.currentTarget.currentTime = tile.start! } : undefined}
          onEnded={tile.start ? (e) => { e.currentTarget.currentTime = tile.start!; void e.currentTarget.play() } : undefined}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${tile.src}")`, backgroundSize: 'cover', backgroundPosition: tile.position ?? 'center' }} />
      )}
      {tile.caption && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(3,3,15,0.82) 0%, rgba(3,3,15,0) 42%)' }} />
          <div style={{ position: 'absolute', left: 20, bottom: 16, fontSize: 18, fontWeight: 700, letterSpacing: 1.6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.88)' }}>
            {tile.caption}
          </div>
        </>
      )}
    </motion.div>
  )
}

function Copy({ m }: { m: Machine }) {
  return (
    <>
      <motion.div variants={riseIn}>
        <Eyebrow>Retail format {String(m.index).padStart(2, '0')} / {String(MACHINES.length).padStart(2, '0')}</Eyebrow>
      </motion.div>
      <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 104, lineHeight: 1, letterSpacing: -2.4, margin: '22px 0 0' }}>
        <GradientText>{m.name}</GradientText>
      </motion.h2>
      <motion.div variants={riseIn} style={{ marginTop: 26 }}><GradientRule width={120} /></motion.div>
      <motion.ul variants={riseIn} style={{ listStyle: 'none', margin: '44px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {m.points.map((p) => (
          <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, color: colors.textMuted }}>
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: colors.cyan, flexShrink: 0 }} />
            {p}
          </li>
        ))}
      </motion.ul>
    </>
  )
}

function MachineSlide({ m }: { m: Machine }) {
  return (
    <Slide>
      <div style={{ display: 'grid', gridTemplateColumns: '480px 1fr', gap: 64, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
          <Copy m={m} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: m.columns, gridTemplateRows: m.rows, gap: 20, minHeight: 0 }}>
          {m.tiles.map((t) => <MediaTile key={t.src} tile={t} />)}
        </div>
      </div>
      <Footer />
    </Slide>
  )
}

export const Europa = () => <MachineSlide m={MACHINES[0]} />
export const Hyperion = () => <MachineSlide m={MACHINES[1]} />
export const Blinx = () => <MachineSlide m={MACHINES[2]} />
export const Callisto = () => <MachineSlide m={MACHINES[3]} />
