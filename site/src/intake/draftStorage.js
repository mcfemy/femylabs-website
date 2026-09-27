import { INITIAL_DATA } from './schema.js'

/*
 * Save-on-next draft persistence. Answers are written to
 * localStorage each time the visitor moves between steps, so a refresh or an
 * accidental tab close doesn't lose their work. All access is wrapped in
 * try/catch: storage can be unavailable (private mode, blocked cookies).
 */
const KEY = 'femylabs-intake-draft-v1'
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000 // discard drafts older than 30 days

export function loadDraft() {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const draft = JSON.parse(raw)
    if (!draft?.data || Date.now() - (draft.savedAt ?? 0) > MAX_AGE_MS) {
      clearDraft()
      return null
    }
    // Merge onto INITIAL_DATA so fields added in later versions get defaults.
    return { data: { ...INITIAL_DATA, ...draft.data }, stepIndex: draft.stepIndex ?? 0, savedAt: draft.savedAt }
  } catch {
    return null
  }
}

export function saveDraft(data, stepIndex) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ data, stepIndex, savedAt: Date.now() }))
    return true
  } catch {
    return false
  }
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* storage unavailable — nothing to clear */
  }
}
