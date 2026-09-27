import { mockIntakeHandler } from './mockIntakeHandler.js'

/*
 * Intake submission client — sends the intake straight from the browser to
 * Web3Forms (https://web3forms.com), which emails it to the Femylabs inbox.
 * There is no Femylabs server.
 *
 * Configuration (build-time env var, see .env.example):
 *   VITE_WEB3FORMS_KEY – Web3Forms access key. This key is public by design:
 *                        it only allows sending mail to the address it was
 *                        created for, so it is safe to ship in client code.
 *
 * Request: POST https://api.web3forms.com/submit as multipart/form-data.
 *   access_key, subject, from_name, replyto, botcheck (only if a bot ticked it),
 *   and one human-readable field per intake answer (multi-selects comma-joined).
 *   Text fields only.
 *
 * Response: JSON { success: boolean, message: string }.
 *
 * Degradation:
 *   • Key unset in development → mock handler (logs to console).
 *   • Key unset in production  → IntakeError('not-configured'); the UI offers
 *     a downloadable copy and an email fallback so no lead is lost.
 */

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY ?? '').trim()
const TIMEOUT_MS = 30_000

export const isMockMode = !ACCESS_KEY && !import.meta.env.PROD

export class IntakeError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'IntakeError'
    this.code = code // 'not-configured' | 'network' | 'timeout' | 'rejected'
  }
}

const joinList = (values, other) =>
  [...values.filter((v) => v !== 'Other'), ...(values.includes('Other') && other ? [`Other: ${other}`] : [])].join(', ')

const withOther = (value, other) => (value === 'Other' && other ? `Other: ${other}` : value)

/**
 * Intake answers as ordered, human-readable email fields. Web3Forms shows each
 * key as a label in the notification email, so the keys are written for people.
 */
export function toEmailFields(d) {
  return {
    // About You
    Name: d.name,
    Company: d.company,
    Email: d.email,
    Phone: d.phone,
    Website: d.website || '—',
    Industry: withOther(d.industry, d.industryOther),
    // Idea, Problem, Solution
    'Idea — What would you like Femylabs to build?': d.idea,
    'Problem — What problem will this solve?': d.problem,
    'Solution — What should the application make possible?': d.solution,
    // Users & Features
    Users: joinList(d.users, d.usersOther),
    Features: d.features.join(', ') || '—',
    'Other features': d.featuresOther || '—',
    // Existing Systems & Project
    'Connects to existing software': d.connectsExisting === 'yes' ? 'Yes' : 'No',
    'Existing software': d.connectsExisting === 'yes' ? d.existingSystems : '—',
    'Existing project': d.existingProject,
    // Business
    'Business model': joinList(d.businessModel, d.businessModelOther),
    'Project stage': d.projectStage,
    Priority: withOther(d.priority, d.priorityOther),
    // Final Question
    'Success — What does success look like?': d.successVision,
  }
}

/**
 * Submit the intake. Resolves to { reference } on success; throws IntakeError.
 * @param {object}  answers  – validated form data
 * @param {boolean} botcheck – the hidden honeypot checkbox (true = likely a bot)
 */
export async function submitIntake(answers, botcheck = false) {
  if (!ACCESS_KEY) {
    if (import.meta.env.PROD) {
      throw new IntakeError('not-configured', 'Online submission isn’t available right now.')
    }
    return mockIntakeHandler(toEmailFields(answers))
  }

  const form = new FormData()
  form.append('access_key', ACCESS_KEY)
  form.append('subject', `New Femylabs Project Intake — ${answers.company.trim() || answers.name.trim()}`)
  form.append('from_name', answers.name.trim())
  form.append('replyto', answers.email.trim()) // lets you reply straight to the submitter
  // Web3Forms rejects the submission when botcheck is present, so only send it if a bot ticked it.
  if (botcheck) form.append('botcheck', 'on')

  for (const [label, value] of Object.entries(toEmailFields(answers))) {
    form.append(label, value ?? '')
  }

  // Don't set Content-Type: the browser adds the multipart boundary itself.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  let response
  try {
    response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: form,
      signal: controller.signal,
    })
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new IntakeError('timeout', 'The request took too long. Please check your connection and try again.')
    }
    throw new IntakeError('network', 'We couldn’t reach our submission service. Please check your connection and try again.')
  } finally {
    clearTimeout(timer)
  }

  let body = null
  try {
    body = await response.json()
  } catch {
    /* non-JSON response — handled below */
  }

  if (!response.ok || body?.success !== true) {
    // Log Web3Forms' own message for debugging; show visitors a friendly one.
    console.warn('[Femylabs intake] Web3Forms rejected the submission:', response.status, body?.message)
    throw new IntakeError('rejected', 'Something went wrong on our end and your project wasn’t sent.')
  }

  return { reference: null }
}
