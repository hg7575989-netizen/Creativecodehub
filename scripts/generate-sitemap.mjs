import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const publicDir = resolve(rootDir, 'public')
const baseUrl = 'https://creativecodehub.onrender.com'
const ignoredDirs = new Set(['.git', 'dist', 'node_modules', 'public', 'scripts', 'src'])
const today = new Date().toISOString().slice(0, 10)

const pageDirs = readdirSync(rootDir)
  .filter((entry) => {
    if (ignoredDirs.has(entry)) return false
    const dirPath = resolve(rootDir, entry)
    return statSync(dirPath).isDirectory() && existsSync(resolve(dirPath, 'index.html'))
  })
  .sort((left, right) => left.localeCompare(right))

const urls = [
  {
    loc: `${baseUrl}/`,
    priority: '1.0',
  },
  ...pageDirs.map((dir) => ({
    loc: `${baseUrl}/${dir}/`,
    priority: '0.9',
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

mkdirSync(publicDir, { recursive: true })
writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf8')
console.log(`Generated sitemap with ${urls.length} URLs on ${today}.`)
