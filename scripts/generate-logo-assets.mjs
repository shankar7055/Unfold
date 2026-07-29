import { readFile, writeFile } from "node:fs/promises"
import { deflateSync } from "node:zlib"

const BRAND = [245, 158, 11, 255]
const WHITE = [255, 255, 255, 255]
const MASTER_WIDTH = 708
const MASTER_HEIGHT = 920
const ROWS = 9
const STEP = MASTER_HEIGHT / ROWS

const CELL_MAP = [
  "###.#..",
  "###.##.",
  "###.###",
  "###....",
  "###.###",
  "###.###",
  "###.###",
  ".##.###",
  "#.#.###",
]

const cells = CELL_MAP.flatMap((row, y) =>
  Array.from(row).flatMap((value, x) => (value === "#" ? [{ x, y }] : []))
)

function cellRect({ x, y }) {
  return {
    x: Math.round(x * STEP),
    y: Math.round(y * STEP),
    width: Math.max(2, Math.ceil(STEP)),
    height: Math.max(2, Math.ceil(STEP)),
  }
}

function pathData() {
  const commands = []

  for (let y = 0; y < CELL_MAP.length; y += 1) {
    const row = CELL_MAP[y]
    let x = 0

    while (x < row.length) {
      if (row[x] !== "#") {
        x += 1
        continue
      }

      const start = x
      while (x + 1 < row.length && row[x + 1] === "#") x += 1
      const first = cellRect({ x: start, y })
      const last = cellRect({ x, y })
      const end = Math.min(MASTER_WIDTH, last.x + last.width)
      const bottom = Math.min(MASTER_HEIGHT, first.y + first.height)
      commands.push(`M${first.x} ${first.y}H${end}V${bottom}H${first.x}Z`)
      x += 1
    }
  }

  return commands.join("")
}

const MARK_PATH = pathData()

const UNFOLD_AMBER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="512" height="512" role="img" aria-label="Unfold logo">
  <defs>
    <linearGradient id="unfold-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F59E0B" />
      <stop offset="50%" stopColor="#D97706" />
      <stop offset="100%" stopColor="#B45309" />
    </linearGradient>
    <linearGradient id="unfold-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#D97706" />
      <stop offset="100%" stopColor="#78350F" />
    </linearGradient>
  </defs>
  <g transform="translate(50, 50)">
    <path d="M 50,50 L 250,50 L 250,350 L 50,350 Z" fill="url(#unfold-grad1)" opacity="0.9" />
    <path d="M 250,50 L 350,150 L 250,350 Z" fill="url(#unfold-grad2)" opacity="0.85" />
    <path d="M 250,150 L 320,280 L 210,350 Z" fill="#FBBF24" opacity="0.95" />
    <path d="M 50,50 L 250,50 L 210,350 L 50,350 Z" fill="none" stroke="#F59E0B" strokeWidth="4" opacity="0.3" />
  </g>
</svg>
`

function logoSvg() {
  return UNFOLD_AMBER_SVG
}

function docsLogoSvg() {
  return UNFOLD_AMBER_SVG
}

function faviconSvg() {
  return UNFOLD_AMBER_SVG
}

function appIconSvg({ maskable = false } = {}) {
  const scale = maskable ? 0.3 : 0.4
  const x = (512 - MASTER_WIDTH * scale) / 2
  const y = (512 - MASTER_HEIGHT * scale) / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="FileRouter app icon">
  <rect width="512" height="512" fill="#00bdf7" />
  <path fill="#fff" transform="translate(${x} ${y}) scale(${scale})" d="${MARK_PATH}" />
</svg>
`
}

function reactComponent() {
  return `export function FileRouterLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      role="img"
      aria-label="Unfold logo"
    >
      <defs>
        <linearGradient id="unfold-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="unfold-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 50)">
        <path d="M 50,50 L 250,50 L 250,350 L 50,350 Z" fill="url(#unfold-grad1)" opacity="0.9" />
        <path d="M 250,50 L 350,150 L 250,350 Z" fill="url(#unfold-grad2)" opacity="0.85" />
        <path d="M 250,150 L 320,280 L 210,350 Z" fill="#FBBF24" opacity="0.95" />
        <path d="M 50,50 L 250,50 L 210,350 L 50,350 Z" fill="none" stroke="#F59E0B" strokeWidth="4" opacity="0.3" />
      </g>
    </svg>
  )
}
`
}

function updateWordmark(source) {
  const sizedSource = source.replace(
    /width="430" height="84" viewBox="0 10 430 84"/,
    'width="382" height="84" viewBox="34 10 382 84"'
  )
  const mark = `  <g fill="#00bdf7" transform="translate(38 17) scale(.076087)">
    <path d="${MARK_PATH}" />
  </g>`
  const pattern = /  <g fill="#00bdf7"[^>]*>[\s\S]*?  <\/g>/
  if (!pattern.test(sizedSource)) {
    throw new Error("Could not locate README wordmark logo")
  }
  return sizedSource.replace(pattern, mark)
}

function makeCanvas(width, height, background = [0, 0, 0, 0]) {
  const pixels = Buffer.alloc(width * height * 4)
  for (let offset = 0; offset < pixels.length; offset += 4) {
    pixels[offset] = background[0]
    pixels[offset + 1] = background[1]
    pixels[offset + 2] = background[2]
    pixels[offset + 3] = background[3]
  }
  return { width, height, pixels }
}

function fillRect(canvas, x0, y0, x1, y1, color) {
  const left = Math.max(0, Math.round(x0))
  const top = Math.max(0, Math.round(y0))
  const right = Math.min(canvas.width, Math.round(x1))
  const bottom = Math.min(canvas.height, Math.round(y1))

  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      const offset = (y * canvas.width + x) * 4
      canvas.pixels[offset] = color[0]
      canvas.pixels[offset + 1] = color[1]
      canvas.pixels[offset + 2] = color[2]
      canvas.pixels[offset + 3] = color[3]
    }
  }
}

function pointInTriangle(px, py, ax, ay, bx, by, cx, cy) {
  const d1 = (px - bx) * (ay - by) - (ax - bx) * (py - by)
  const d2 = (px - cx) * (by - cy) - (bx - cx) * (py - cy)
  const d3 = (px - ax) * (cy - ay) - (cx - ax) * (py - ay)
  const has_neg = d1 < 0 || d2 < 0 || d3 < 0
  const has_pos = d1 > 0 || d2 > 0 || d3 > 0
  return !(has_neg && has_pos)
}

function drawUnfoldFolderMark(canvas) {
  const s = canvas.width / 500
  fillRect(canvas, 100 * s, 100 * s, 300 * s, 400 * s, [245, 158, 11, 255])

  const t2_ax = 300 * s, t2_ay = 100 * s
  const t2_bx = 400 * s, t2_by = 200 * s
  const t2_cx = 300 * s, t2_cy = 400 * s
  const col2 = [217, 119, 6, 255]

  const minX2 = Math.max(0, Math.floor(Math.min(t2_ax, t2_bx, t2_cx)))
  const maxX2 = Math.min(canvas.width, Math.ceil(Math.max(t2_ax, t2_bx, t2_cx)))
  const minY2 = Math.max(0, Math.floor(Math.min(t2_ay, t2_by, t2_cy)))
  const maxY2 = Math.min(canvas.height, Math.ceil(Math.max(t2_ay, t2_by, t2_cy)))

  for (let y = minY2; y < maxY2; y += 1) {
    for (let x = minX2; x < maxX2; x += 1) {
      if (pointInTriangle(x + 0.5, y + 0.5, t2_ax, t2_ay, t2_bx, t2_by, t2_cx, t2_cy)) {
        const offset = (y * canvas.width + x) * 4
        canvas.pixels[offset] = col2[0]
        canvas.pixels[offset + 1] = col2[1]
        canvas.pixels[offset + 2] = col2[2]
        canvas.pixels[offset + 3] = col2[3]
      }
    }
  }

  const t3_ax = 300 * s, t3_ay = 200 * s
  const t3_bx = 370 * s, t3_by = 330 * s
  const t3_cx = 260 * s, t3_cy = 400 * s
  const col3 = [251, 191, 36, 255]

  const minX3 = Math.max(0, Math.floor(Math.min(t3_ax, t3_bx, t3_cx)))
  const maxX3 = Math.min(canvas.width, Math.ceil(Math.max(t3_ax, t3_bx, t3_cx)))
  const minY3 = Math.max(0, Math.floor(Math.min(t3_ay, t3_by, t3_cy)))
  const maxY3 = Math.min(canvas.height, Math.ceil(Math.max(t3_ay, t3_by, t3_cy)))

  for (let y = minY3; y < maxY3; y += 1) {
    for (let x = minX3; x < maxX3; x += 1) {
      if (pointInTriangle(x + 0.5, y + 0.5, t3_ax, t3_ay, t3_bx, t3_by, t3_cx, t3_cy)) {
        const offset = (y * canvas.width + x) * 4
        canvas.pixels[offset] = col3[0]
        canvas.pixels[offset + 1] = col3[1]
        canvas.pixels[offset + 2] = col3[2]
        canvas.pixels[offset + 3] = col3[3]
      }
    }
  }
}

function renderFavicon(size) {
  const canvas = makeCanvas(size, size)
  drawUnfoldFolderMark(canvas)
  return canvas
}

function renderAppIcon(size, { maskable = false } = {}) {
  const canvas = makeCanvas(size, size)
  drawUnfoldFolderMark(canvas)
  return canvas
}

const CRC_TABLE = Array.from({ length: 256 }, (_, index) => {
  let value = index
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
  }
  return value >>> 0
})

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function pngChunk(type, data) {
  const name = Buffer.from(type)
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const checksum = Buffer.alloc(4)
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])))
  return Buffer.concat([length, name, data, checksum])
}

function encodePng(canvas) {
  const header = Buffer.alloc(13)
  header.writeUInt32BE(canvas.width, 0)
  header.writeUInt32BE(canvas.height, 4)
  header[8] = 8
  header[9] = 6
  const stride = canvas.width * 4
  const raw = Buffer.alloc((stride + 1) * canvas.height)
  for (let y = 0; y < canvas.height; y += 1) {
    const output = y * (stride + 1)
    raw[output] = 0
    canvas.pixels.copy(raw, output + 1, y * stride, (y + 1) * stride)
  }
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", header),
    pngChunk("IDAT", deflateSync(raw, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ])
}

function encodeIco(entries) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(entries.length, 4)
  const directory = Buffer.alloc(entries.length * 16)
  let offset = header.length + directory.length

  entries.forEach(({ size, png }, index) => {
    const entry = index * 16
    directory[entry] = size === 256 ? 0 : size
    directory[entry + 1] = size === 256 ? 0 : size
    directory.writeUInt16LE(1, entry + 4)
    directory.writeUInt16LE(32, entry + 6)
    directory.writeUInt32LE(png.length, entry + 8)
    directory.writeUInt32LE(offset, entry + 12)
    offset += png.length
  })

  return Buffer.concat([header, directory, ...entries.map(({ png }) => png)])
}

async function main() {
  const logo = logoSvg()
  const favicon = faviconSvg()
  const appIcon = appIconSvg()
  const maskableIcon = appIconSvg({ maskable: true })

  await Promise.all([
    writeFile("public/logo.svg", logo),
    writeFile("src/logo.svg", logo),
    writeFile("docs/assets/filerouter-logo.svg", docsLogoSvg()),
    writeFile("public/favicon.svg", favicon),
    writeFile("docs/assets/favicon.svg", favicon),
    writeFile("public/app-icon.svg", appIcon),
    writeFile("public/app-icon-maskable.svg", maskableIcon),
    writeFile("src/components/file-router-logo.tsx", reactComponent()),
  ])

  for (const file of [
    "docs/assets/filerouter-wordmark-light.svg",
    "docs/assets/filerouter-wordmark-dark.svg",
  ]) {
    await writeFile(file, updateWordmark(await readFile(file, "utf8")))
  }

  const faviconEntries = [16, 32, 48].map((size) => ({
    size,
    png: encodePng(renderFavicon(size)),
  }))

  await Promise.all([
    writeFile("public/favicon.ico", encodeIco(faviconEntries)),
    writeFile("public/icon-192.png", encodePng(renderAppIcon(192))),
    writeFile("public/icon-512.png", encodePng(renderAppIcon(512))),
    writeFile(
      "public/icon-maskable-512.png",
      encodePng(renderAppIcon(512, { maskable: true }))
    ),
    writeFile("public/apple-touch-icon.png", encodePng(renderAppIcon(180))),
  ])

  console.log(
    `Generated FileRouter logo assets from ${cells.length} approved cells.`
  )
}

await main()
