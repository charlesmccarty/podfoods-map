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
const COUNT = Number(process.env.COUNT || 11)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [`--window-size=${W},${H}`, '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 })

for (let i = 1; i <= COUNT; i++) {
  await page.goto(`${BASE}?clean&slide=${i}`, { waitUntil: 'networkidle0' })
  try { await page.evaluate(() => document.fonts && document.fonts.ready) } catch {}
  await sleep(700)
  const f = join(outDir, `s${String(i).padStart(2, '0')}.png`)
  await page.screenshot({ path: f, type: 'png', clip: { x: 0, y: 0, width: W, height: H } })
  process.stdout.write(`captured ${i}/${COUNT}\n`)
}

await browser.close()
console.log('done ->', outDir)
