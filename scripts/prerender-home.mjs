import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createElement, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from '../src/App.jsx'

const distIndexPath = resolve(process.cwd(), 'dist', 'index.html')
const indexHtml = readFileSync(distIndexPath, 'utf8')
const appHtml = renderToString(createElement(StrictMode, null, createElement(App)))

if (!indexHtml.includes('<div id="root"></div>')) {
  throw new Error('Expected an empty #root container in dist/index.html before prerendering.')
}

const renderedHtml = indexHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

writeFileSync(distIndexPath, renderedHtml, 'utf8')
console.log('Prerendered homepage into dist/index.html')
