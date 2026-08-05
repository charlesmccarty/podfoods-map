// Captures every slide at full 1920x1080. Requires the dev server running.
// Usage: npm run dev, then `node shots.mjs`
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '.shots')
mkdirSync(outDir, { recursive: true })

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = process.env.DECK_URL || 'http://localhost:5173/'
const W = 1920, H = 1080
const COUNT = Number(process.env.COUNT || 20)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [`--window-size=${W},${H}`, '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 })

for (let i = 1; i <= COUNT; i++) {
  // `networkidle0` never settles on slides with a looping video, so wait on the
  // things that actually affect the frame: fonts, then the first video frame.
  await page.goto(`${BASE}?clean&slide=${i}`, { waitUntil: 'load' })
  try { await page.evaluate(() => document.fonts && document.fonts.ready) } catch {}
  await page.evaluate(
    () => Promise.all([...document.querySelectorAll('video')].map((v) =>
      v.readyState >= 2 ? null : new Promise((r) => {
        v.addEventListener('loadeddata', r, { once: true })
        setTimeout(r, 8000)
      }))),
  )
  await sleep(900)
  const f = join(outDir, `s${String(i).padStart(2, '0')}.png`)
  await page.screenshot({ path: f, type: 'png', clip: { x: 0, y: 0, width: W, height: H } })
  process.stdout.write(`captured ${i}/${COUNT}\n`)
}

await browser.close()
console.log('done ->', outDir)
