import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import { CONTACT_EMAIL } from '../content/site.js'
import { firstInvalidStep, INITIAL_DATA, STEPS } from './schema.js'
import { clearDraft, loadDraft, saveDraft } from './draftStorage.js'
import { isMockMode, submitIntake } from './submitIntake.js'
import { buildPlainTextSummary, downloadTextFile } from './summary.js'
import { ProgressBar, StepList } from './ProgressIndicator.jsx'
import ReviewStep from './ReviewStep.jsx'
import SuccessView from './SuccessView.jsx'

const REVIEW = STEPS.length // step index that means "review & submit"

/**
 * Multi-step project intake.
 *
 * Flow: one section per step → validate on Next → save draft → … → review →
 * submit. Visitors can jump back to any step they've reached; editing from the
 * review screen returns them to review after saving.
 */
export default function IntakeForm() {
  // Restore a saved draft once, on first render.
  const [initialDraft] = useState(() => loadDraft())
  const [data, setData] = useState(initialDraft?.data ?? INITIAL_DATA)
  const [step, setStep] = useState(initialDraft ? Math.min(initialDraft.stepIndex, REVIEW) : 0)
  const [furthest, setFurthest] = useState(initialDraft ? Math.min(initialDraft.stepIndex, REVIEW) : 0)
  const [restored, setRestored] = useState(Boolean(initialDraft))
  const [errors, setErrors] = useState({})
  const [returnToReview, setReturnToReview] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)
  const [ackError, setAckError] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [submitError, setSubmitError] = useState(null)
  const [result, setResult] = useState(null)
  const [savedNote, setSavedNote] = useState('')
  const [botcheck, setBotcheck] = useState(false)

  const headingRef = useRef(null)
  const errorSummaryRef = useRef(null)
  const formTopRef = useRef(null)
  const isFirstRender = useRef(true)

  // Move focus to the new step's heading whenever the step changes, so
  // keyboard and screen-reader users land at the top of the new content.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    formTopRef.current?.scrollIntoView({ block: 'start' })
    headingRef.current?.focus({ preventScroll: true })
  }, [step])

  /** Returns a change handler for one field; clears that field's error as the visitor fixes it. */
  const update = useCallback(
    (field) => (value) => {
      setData((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => {
        if (!prev[field]) return prev
        const next = { ...prev }
        delete next[field]
        return next
      })
    },
    [],
  )

  const persist = (nextStep) => {
    const ok = saveDraft(data, nextStep)
    setSavedNote(ok ? 'Progress saved on this device.' : '')
  }

  const goTo = (index) => {
    setErrors({})
    setStep(index)
    setFurthest((f) => Math.max(f, index))
  }

  const showErrors = (stepErrors) => {
    setErrors(stepErrors)
    // Wait for the summary to render, then focus it.
    requestAnimationFrame(() => errorSummaryRef.current?.focus())
  }

  const handleNext = () => {
    const stepErrors = STEPS[step].validate(data)
    if (Object.keys(stepErrors).length) {
      showErrors(stepErrors)
      return
    }
    const next = returnToReview ? REVIEW : step + 1
    if (next === REVIEW) setReturnToReview(false)
    persist(next)
    goTo(next)
  }

  const handleBack = () => {
    persist(step - 1)
    goTo(step - 1)
  }

  const handleJump = (index) => {
    if (index > furthest) return
    persist(index)
    goTo(index)
  }

  const handleEditFromReview = (index) => {
    setReturnToReview(true)
    goTo(index)
  }

  const handleSubmit = async () => {
    if (status === 'submitting') return
    // Re-validate everything in case a draft was edited in another tab.
    const invalid = firstInvalidStep(data)
    if (invalid !== -1) {
      setReturnToReview(true)
      goTo(invalid)
      showErrors(STEPS[invalid].validate(data))
      return
    }
    if (!acknowledged) {
      setAckError('Please confirm you understand before submitting.')
      document.getElementById('acknowledge')?.focus()
      return
    }
    setAckError('')
    setStatus('submitting')
    setSubmitError(null)
    try {
      const response = await submitIntake(data, botcheck)
      clearDraft()
      setResult(response)
      setStatus('success')
    } catch (err) {
      setSubmitError(err)
      setStatus('error')
    }
  }

  const handleStartOver = () => {
    if (!window.confirm('Start over? This clears all of your answers.')) return
    clearDraft()
    setData(INITIAL_DATA)
    setErrors({})
    setAcknowledged(false)
    setRestored(false)
    setReturnToReview(false)
    setSavedNote('')
    setFurthest(0)
    setStep(0)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    if (step === REVIEW) handleSubmit()
    else handleNext()
  }

  // ---------------------------------------------------------------------------
  if (status === 'success') {
    return <SuccessView name={data.name} email={data.email} reference={result?.reference} mock={result?.mock} />
  }

  const current = step < REVIEW ? STEPS[step] : null
  const StepComponent = current?.Component
  const errorEntries = Object.entries(errors)

  return (
    <div ref={formTopRef} className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <StepList current={step} furthest={furthest} onJump={handleJump} />
        </div>
      </aside>

      <div className="min-w-0">
        <ProgressBar current={step} />

        {restored && step < REVIEW && (
          <div className="mt-6 flex flex-col gap-3 rounded-lg bg-verdigris-100 p-4 text-navy-800 sm:flex-row sm:items-center sm:justify-between">
            <p>Welcome back — we restored the answers you saved on this device.</p>
            <button type="button" onClick={handleStartOver} className="shrink-0 font-semibold text-verdigris-800 underline underline-offset-4">
              Start over
            </button>
          </div>
        )}

        <form noValidate onSubmit={onFormSubmit} className="mt-8" aria-labelledby="intake-step-title">
          {/* Web3Forms honeypot: a hidden checkbox named "botcheck". People never see
              it; bots that tick every box get their submission rejected. */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            style={{ display: 'none' }}
            checked={botcheck}
            onChange={(e) => setBotcheck(e.target.checked)}
          />

          <div className="rounded-2xl border border-navy-900/10 bg-cream-50 p-5 shadow-[0_24px_48px_-32px_rgba(12,26,43,0.35)] sm:p-8 lg:p-10">
            <p className="eyebrow">{current ? `Step ${step + 1} · ${current.nav}` : 'Final step'}</p>
            <h2 id="intake-step-title" ref={headingRef} tabIndex={-1} className="mt-2 text-3xl focus:outline-none sm:text-4xl">
              {current ? current.title : 'Review & Submit'}
            </h2>
            <p className="mt-3 text-lg text-navy-500">
              {current ? current.intro : 'Take a moment to check your answers. You can edit any section before submitting.'}
            </p>

            {errorEntries.length > 0 && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                aria-labelledby="error-summary-title"
                className="mt-6 rounded-lg border-2 border-danger-700 bg-danger-100 p-5 focus:outline-none focus-visible:outline-3"
              >
                <p id="error-summary-title" className="flex items-center gap-2 font-semibold text-danger-700">
                  <Icon name="alert" className="h-5 w-5" />
                  {errorEntries.length === 1 ? 'One thing needs your attention' : `${errorEntries.length} things need your attention`}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-6 text-danger-700">
                  {errorEntries.map(([field, message]) => (
                    <li key={field}>
                      <a
                        href={`#${field}`}
                        onClick={(e) => {
                          e.preventDefault()
                          focusField(field)
                        }}
                        className="underline underline-offset-2"
                      >
                        {message}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              {StepComponent ? (
                <StepComponent data={data} update={update} errors={errors} />
              ) : (
                <ReviewStep
                  data={data}
                  onEdit={handleEditFromReview}
                  acknowledged={acknowledged}
                  setAcknowledged={(v) => {
                    setAcknowledged(v)
                    if (v) setAckError('')
                  }}
                  ackError={ackError}
                />
              )}
            </div>

            {status === 'error' && submitError && (
              <SubmitErrorPanel error={submitError} data={data} onRetry={handleSubmit} />
            )}

            {/* Navigation */}
            <div className="mt-10 flex flex-col-reverse gap-4 border-t border-navy-900/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 rounded-md px-3 py-3 font-semibold text-navy-700 hover:bg-navy-900/5"
                  >
                    <Icon name="arrowLeft" className="h-5 w-5" />
                    Back
                  </button>
                )}
              </div>
              <div className="flex flex-col items-stretch gap-2 sm:items-end">
                {step < REVIEW ? (
                  <Button type="submit" size="lg" arrow>
                    {returnToReview ? 'Save & Return to Review' : step === REVIEW - 1 ? 'Review Your Answers' : 'Next'}
                  </Button>
                ) : (
                  <Button type="submit" size="lg" disabled={status === 'submitting'} arrow={status !== 'submitting'}>
                    {status === 'submitting' ? 'Submitting…' : 'Submit Your Project'}
                  </Button>
                )}
              </div>
            </div>

            {/* Polite status updates for assistive tech. */}
            <p aria-live="polite" className="mt-3 text-right font-mono text-xs text-navy-500">
              {status === 'submitting' ? 'Submitting your project…' : savedNote}
            </p>
          </div>
        </form>

        {isMockMode && (
          <p className="mt-4 font-mono text-xs text-navy-500">
            Development mode: VITE_WEB3FORMS_KEY is not set, so submissions use the mock handler.
          </p>
        )}
      </div>
    </div>
  )
}

/** Focus the input behind an error-summary link (first control inside a fieldset). */
function focusField(field) {
  const el = document.getElementById(field)
  if (!el) return
  const target = el.matches('input, select, textarea') ? el : el.querySelector('input, select, textarea') ?? el
  target.focus()
  target.scrollIntoView({ block: 'center' })
}

/**
 * Shown when submission fails. Answers are never lost: visitors can retry,
 * download a copy, or email it to Femylabs directly.
 */
function SubmitErrorPanel({ error, data, onRetry }) {
  const notConfigured = error.code === 'not-configured'
  const subject = encodeURIComponent(`Project intake — ${data.company || data.name}`)
  const download = () =>
    downloadTextFile(
      `femylabs-project-intake-${(data.company || 'project').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`,
      buildPlainTextSummary(data),
    )

  return (
    <div role="alert" className="mt-8 rounded-lg border-2 border-danger-700 bg-danger-100 p-5 sm:p-6">
      <p className="flex items-center gap-2 text-lg font-semibold text-danger-700">
        <Icon name="alert" className="h-5 w-5" />
        {notConfigured ? 'Online submission isn’t available right now.' : 'We couldn’t submit your project.'}
      </p>
      <p className="mt-2 text-navy-800">
        {notConfigured ? 'Your answers are safe.' : `${error.message} Your answers are safe.`} You can also download a
        copy and email it to{' '}
        <a href={`mailto:${CONTACT_EMAIL}?subject=${subject}`} className="font-semibold underline underline-offset-2">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        {!notConfigured && (
          <Button onClick={onRetry} size="sm">
            Try again
          </Button>
        )}
        <Button onClick={download} variant="secondary" size="sm">
          Download a copy
        </Button>
      </div>
    </div>
  )
}
