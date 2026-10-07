import type { AssetStatus, QuestionStatus, ReviewRecord } from '../types'

/**
 * The status the UI shows and acts on: the user's decision from the review tool wins over
 * the status stored in the content files. Only the review tool can produce 'approved' here.
 */
export function effectiveQuestionStatus(status: QuestionStatus, review?: ReviewRecord): QuestionStatus {
  if (review?.decision === 'approve') return 'approved'
  if (review?.decision === 'discard') return 'discarded'
  return status
}

export type EffectiveAssetStatus = AssetStatus | 'discarded'

export function effectiveAssetStatus(status: AssetStatus, review?: ReviewRecord): EffectiveAssetStatus {
  if (review?.decision === 'approve') return 'approved'
  if (review?.decision === 'discard') return 'discarded'
  return status
}

export function isFlagged(review?: ReviewRecord): boolean {
  return review?.decision === 'flag'
}
