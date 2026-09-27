import { useEffect, useRef } from 'react'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import { ROUTES } from '../content/site.js'
import { FILES_LATER_NOTE } from '../content/intake.js'

const NEXT = [
  { title: 'Project Review', text: 'We review your submission and may follow up with a few questions.' },
  { title: 'Project Architecture', text: 'We plan how your application should be put together.' },
  { title: 'Scope & Proposal', text: 'You receive a written proposal. Nothing is built until you approve it.' },
]

/** Confirmation shown after a successful submission. Receives focus on mount. */
export default function SuccessView({ name, email, reference, mock }) {
  const headingRef = useRef(null)
  useEffect(() => headingRef.current?.focus(), [])

  const firstName = name.trim().split(/\s+/)[0]

  return (
    <div className="mx-auto max-w-3xl py-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-verdigris-700 text-white">
        <Icon name="check" className="h-8 w-8" />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="mt-8 text-4xl focus:outline-none sm:text-5xl">
        Thank you, {firstName}. Your project is in.
      </h2>
      <p className="mt-5 text-lg text-navy-500">
        We’ve received your project intake and will review it carefully. We’ll be in touch at{' '}
        <strong className="font-semibold text-navy-900">{email}</strong> with next steps.
      </p>
      {reference && (
        <p className="mt-6 inline-flex items-center gap-3 rounded-lg bg-cream-50 px-4 py-3 ring-1 ring-navy-900/10">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-navy-500">Reference</span>
          <span className="font-mono text-lg font-bold text-navy-900">{reference}</span>
        </p>
      )}
      <p className="mt-6 flex gap-3 rounded-lg bg-verdigris-100 px-4 py-3 text-navy-800">
        <Icon name="file" className="mt-0.5 h-5 w-5 shrink-0 text-verdigris-700" />
        <span>{FILES_LATER_NOTE}</span>
      </p>
      {mock && (
        <p className="mt-4 rounded-md bg-cream-200 px-4 py-2 font-mono text-sm text-navy-700">
          Development mode: this submission was handled by the mock endpoint and was not delivered.
        </p>
      )}

      <h3 className="mt-14 text-2xl">What happens next</h3>
      <ol className="mt-6 space-y-5">
        {NEXT.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-navy-900 font-mono text-sm font-bold"
            >
              {i + 2}
            </span>
            <div>
              <p className="font-semibold text-navy-900">{step.title}</p>
              <p className="text-navy-500">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Button to={ROUTES.howItWorks} variant="secondary">
          Read How It Works
        </Button>
        <Button to={ROUTES.faq} variant="secondary">
          Browse the FAQ
        </Button>
      </div>
    </div>
  )
}
