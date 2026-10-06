import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { QuestionProgress, ReportedQuestion } from '../types'

interface BrazisDB extends DBSchema {
  progress: {
    key: string // questionId
    value: QuestionProgress
    indexes: { 'by-chapter': string }
  }
  reports: {
    key: string // report id
    value: ReportedQuestion
    indexes: { 'by-question': string }
  }
  settings: {
    key: string
    value: unknown
  }
}

const DB_NAME = 'brazis-neuro-trainer-db'
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<BrazisDB>> | null = null

function getDB(): Promise<IDBPDatabase<BrazisDB>> {
  if (!dbPromise) {
    dbPromise = openDB<BrazisDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('progress')) {
          const progressStore = db.createObjectStore('progress', { keyPath: 'questionId' })
          progressStore.createIndex('by-chapter', 'chapter')
        }
        if (!db.objectStoreNames.contains('reports')) {
          const reportsStore = db.createObjectStore('reports', { keyPath: 'id' })
          reportsStore.createIndex('by-question', 'questionId')
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings')
        }
      }
    })
  }
  return dbPromise
}

export async function getQuestionProgress(questionId: string): Promise<QuestionProgress | undefined> {
  const db = await getDB()
  return db.get('progress', questionId)
}

export async function getAllProgress(): Promise<QuestionProgress[]> {
  const db = await getDB()
  return db.getAll('progress')
}

export async function saveQuestionProgress(progress: QuestionProgress): Promise<void> {
  const db = await getDB()
  await db.put('progress', progress)
}

export async function addReportedQuestion(report: ReportedQuestion): Promise<void> {
  const db = await getDB()
  await db.put('reports', report)
}

export async function getAllReports(): Promise<ReportedQuestion[]> {
  const db = await getDB()
  return db.getAll('reports')
}

export async function getSetting<T>(key: string, defaultValue: T): Promise<T> {
  const db = await getDB()
  const val = await db.get('settings', key)
  return (val !== undefined ? (val as T) : defaultValue)
}

export async function setSetting<T>(key: string, value: T): Promise<void> {
  const db = await getDB()
  await db.put('settings', value, key)
}

export interface BackupData {
  version: number
  exportedAt: string
  progress: QuestionProgress[]
  reports: ReportedQuestion[]
}

export async function exportUserData(): Promise<BackupData> {
  const progress = await getAllProgress()
  const reports = await getAllReports()
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress,
    reports
  }
}

export async function importUserData(data: BackupData): Promise<{ success: boolean; count: number }> {
  if (!data || !Array.isArray(data.progress)) {
    throw new Error('Invalid backup file format')
  }
  const db = await getDB()
  const tx = db.transaction(['progress', 'reports'], 'readwrite')
  let count = 0
  for (const item of data.progress) {
    if (item.questionId && item.fsrsCard) {
      await tx.objectStore('progress').put(item)
      count++
    }
  }
  if (Array.isArray(data.reports)) {
    for (const r of data.reports) {
      if (r.id && r.questionId) {
        await tx.objectStore('reports').put(r)
      }
    }
  }
  await tx.done
  return { success: true, count }
}

export async function clearAllUserData(): Promise<void> {
  const db = await getDB()
  const tx = db.transaction(['progress', 'reports'], 'readwrite')
  await tx.objectStore('progress').clear()
  await tx.objectStore('reports').clear()
  await tx.done
}
