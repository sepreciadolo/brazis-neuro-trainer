/// <reference types="node" />
import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CHAPTERS_META, CHAPTERS_REGISTRY, getAllQuestions } from '../chapters'
import { SOURCES } from '../sources'
import summaries from '../summaries.json'
import {
  BOOK_PLATES_BY_LEVEL,
  MEDULLA_STRUCTURES,
  MIDBRAIN_STRUCTURES,
  PLATE_HOTSPOTS,
  PONS_STRUCTURES,
  SYNDROMES_BY_LEVEL,
  VASCULAR_MAP
} from '../../components/BrainstemCrossSectionViewer'

const PUBLIC = resolve(fileURLToPath(new URL('.', import.meta.url)), '../../../public')
const STRUCTURES = { ...MEDULLA_STRUCTURES, ...PONS_STRUCTURES, ...MIDBRAIN_STRUCTURES }
const STATUSES = ['draft', 'ai_checked', 'approved', 'discarded']

describe('question contract (AGENTS.md section 6)', () => {
  const all = getAllQuestions()

  it('has unique ids that match the chapter prefix', () => {
    const ids = all.map(q => q.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const q of all) expect(q.id).toMatch(/^ch\d{2}-\d{3}$/)
  })

  it('has 4 or 5 options, a valid zero-based answer and one distractor note per wrong option', () => {
    for (const q of all) {
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(4)
      expect(q.options.length, q.id).toBeLessThanOrEqual(5)
      expect(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length, q.id).toBe(true)
      expect(q.explanation.distractors.length, q.id).toBe(q.options.length - 1)
      expect(q.explanation.key_point.trim().length, q.id).toBeGreaterThan(0)
    }
  })

  it('uses only known statuses', () => {
    for (const q of all) {
      expect(STATUSES, q.id).toContain(q.status)
    }
  })

  it('requires a source quote and a page for every ai_checked or approved question', () => {
    for (const q of all.filter(x => x.status === 'ai_checked' || x.status === 'approved')) {
      expect((q.source_quote ?? '').trim().length, q.id).toBeGreaterThan(20)
      expect(Number.isInteger(q.page), q.id).toBe(true)
    }
  })

  it('keeps source quotes short (the book text is copyrighted)', () => {
    for (const q of all) {
      if (q.source_quote) expect(q.source_quote.split(/\s+/).length, q.id).toBeLessThanOrEqual(40)
    }
  })

  it('points figure fields at files that exist', () => {
    for (const q of all.filter(x => x.figure)) {
      expect(existsSync(resolve(PUBLIC, q.figure as string)), `${q.id} -> ${q.figure}`).toBe(true)
    }
  })

  it('does not put the correct answer in the same position too often', () => {
    const active = all.filter(q => q.status !== 'discarded')
    const counts = new Map<number, number>()
    for (const q of active) counts.set(q.correct, (counts.get(q.correct) ?? 0) + 1)
    for (const [pos, n] of counts) expect(n / active.length, `position ${pos}`).toBeLessThan(0.4)
  })

  it('has chapters whose registry and metadata agree', () => {
    for (const meta of CHAPTERS_META) expect(CHAPTERS_REGISTRY[meta.id], meta.id).toBeDefined()
    expect(CHAPTERS_META.length).toBe(23)
  })
})

describe('atlas data', () => {
  const plates = Object.values(BOOK_PLATES_BY_LEVEL).flat()

  it('uses image files that exist and have a size', () => {
    for (const p of plates) {
      expect(existsSync(resolve(PUBLIC, `.${p.image}`)), p.image).toBe(true)
      expect(p.width, p.id).toBeGreaterThan(0)
      expect(p.height, p.id).toBeGreaterThan(0)
    }
  })

  it('has hotspots for every plate, inside the picture, on known structures', () => {
    for (const p of plates) {
      const spots = PLATE_HOTSPOTS[p.id]
      expect(spots?.length, p.id).toBeGreaterThan(0)
      for (const s of spots) {
        expect(s.x, `${p.id}/${s.structureId} x`).toBeGreaterThan(0)
        expect(s.x, `${p.id}/${s.structureId} x`).toBeLessThan(100)
        expect(s.y, `${p.id}/${s.structureId} y`).toBeGreaterThan(0)
        expect(s.y, `${p.id}/${s.structureId} y`).toBeLessThan(100)
        expect(STRUCTURES[s.structureId], `${p.id}/${s.structureId}`).toBeDefined()
      }
      const ids = spots.map(s => s.structureId)
      expect(new Set(ids).size, p.id).toBe(ids.length)
    }
  })

  it('has a registry entry for every plate and its pins', () => {
    const ids = new Set(SOURCES.map(s => s.asset))
    for (const p of plates) {
      expect(ids.has(`atlas/plates/${p.id}`), p.id).toBe(true)
      expect(ids.has(`atlas/hotspots/${p.id}`), p.id).toBe(true)
    }
  })

  it('refers only to known structures in syndromes and vascular territories', () => {
    for (const level of ['medulla', 'pons', 'midbrain'] as const) {
      for (const syn of SYNDROMES_BY_LEVEL[level]) {
        for (const id of syn.structuresInvolved) expect(STRUCTURES[id], `${syn.id}/${id}`).toBeDefined()
      }
      for (const terr of VASCULAR_MAP[level]) {
        for (const id of terr.structures) expect(STRUCTURES[id], `${terr.id}/${id}`).toBeDefined()
      }
    }
  })

  it('keeps the red nucleus in the peduncular territory, not the thalamoperforating one (Brazis p. 452)', () => {
    const territory = VASCULAR_MAP.midbrain.find(t => t.structures.includes('red_nucleus'))
    expect(territory?.id).toBe('pca_peduncular')
    expect(VASCULAR_MAP.midbrain.some(t => /thalamoperforat/i.test(t.id))).toBe(false)
  })
})

describe('figure registry', () => {
  it('has one registry entry and one image file per figure', () => {
    const figures = SOURCES.filter(s => s.asset.startsWith('figures/'))
    expect(figures.length).toBeGreaterThan(0)
    for (const f of figures) expect(existsSync(resolve(PUBLIC, `${f.asset}.png`)), f.asset).toBe(true)
  })
})

describe('verified chapter digests', () => {
  const digests = summaries as unknown as Record<
    string,
    {
      coreAnatomy: { points: { text: string; page: number; quote: string }[] }[]
      localizationRules: { rule: string; page: number; quote: string }[]
      keySyndromes: { name: string; page: number; quote: string }[]
      boardTraps: { text: string; page: number; quote: string }[]
    }
  >

  it('gives every item a page and a quote', () => {
    for (const [ch, d] of Object.entries(digests)) {
      const items = [
        ...d.coreAnatomy.flatMap(g => g.points),
        ...d.localizationRules,
        ...d.keySyndromes,
        ...d.boardTraps
      ]
      expect(items.length, `chapter ${ch}`).toBeGreaterThan(0)
      for (const it of items) {
        expect(Number.isInteger(it.page), `chapter ${ch}`).toBe(true)
        expect(it.quote.trim().length, `chapter ${ch}`).toBeGreaterThan(20)
      }
    }
  })

  it('has a registry entry for every digest', () => {
    const ids = new Set(SOURCES.map(s => s.asset))
    for (const ch of Object.keys(digests)) {
      expect(ids.has(`summaries/chapter${ch.padStart(2, '0')}`), `chapter ${ch}`).toBe(true)
    }
  })
})
