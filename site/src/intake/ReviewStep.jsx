import Icon from '../components/ui/Icon.jsx'
import { FILES_LATER_NOTE } from '../content/intake.js'
import { buildReviewSections } from './summary.js'

/**
 * Review-before-submit screen. Every section has an Edit button that jumps
 * back to its step; after saving, the visitor returns here.
 */
export default function ReviewStep({ data, onEdit, acknowledged, setAcknowledged, ackError }) {
  const sections = buildReviewSections(data)
  return (
    <div className="space-y-5">
      {sections.map((section) => (
        <section
          key={section.title}
          aria-labelledby={`review-${section.step}`}
          className="rounded-xl border border-navy-900/10 bg-white p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <h3 id={`review-${section.step}`} className="text-xl">
              {section.title}
            </h3>
            <button
              type="button"
              onClick={() => onEdit(section.step)}
              className="rounded-md px-3 py-1.5 font-semibold text-verdigris-700 underline decoration-2 underline-offset-4 hover:bg-verdigris-100"
            >
              Edit<span className="sr-only"> {section.title}</span>
            </button>
          </div>
          <dl className="mt-4 space-y-4">
            {section.items.map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-navy-500">{label}</dt>
                <dd className="mt-1 whitespace-pre-wrap break-words text-navy-900">{value || '—'}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <p className="flex gap-3 rounded-xl bg-verdigris-100 p-5 text-navy-800">
        <Icon name="file" className="mt-0.5 h-5 w-5 shrink-0 text-verdigris-700" />
        <span>{FILES_LATER_NOTE}</span>
      </p>

      <div
        className={`rounded-xl border-2 p-5 sm:p-6 ${ackError ? 'border-danger-700 bg-danger-100' : 'border-navy-900/15 bg-cream-50'}`}
      >
        <label htmlFor="acknowledge" className="flex cursor-pointer items-start gap-3">
          <input
            id="acknowledge"
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            aria-invalid={ackError ? true : undefined}
            aria-describedby={ackError ? 'acknowledge-error' : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-verdigris-700"
          />
          <span className="text-navy-700">
            I understand that submitting this form starts a project review. It is not a contract, and it doesn’t commit
            me or Femylabs to any work. Pricing and terms are confirmed in a written proposal and development
            agreement.
          </span>
        </label>
        {ackError && (
          <p id="acknowledge-error" className="mt-3 font-semibold text-danger-700">
            {ackError}
          </p>
        )}
      </div>
    </div>
  )
}
