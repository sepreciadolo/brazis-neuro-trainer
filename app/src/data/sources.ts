import type { SourceEntry } from '../types'
import sourcesJson from './sources.json'

// content/sources.json is copied here by scripts/sync_chapters_to_app.py.
export const SOURCES: SourceEntry[] = (sourcesJson as { assets: SourceEntry[] }).assets

const BY_ID = new Map(SOURCES.map(s => [s.asset, s]))

/** Registry entry for an asset id such as 'flowcharts/rule_of_4'. */
export function getSource(assetId: string): SourceEntry | undefined {
  return BY_ID.get(assetId)
}

/** Assets that cite a source outside Brazis (Gates, HINTS, Wikimedia...). */
export function getExternalSources(): SourceEntry[] {
  return SOURCES.filter(s => s.external_source)
}
