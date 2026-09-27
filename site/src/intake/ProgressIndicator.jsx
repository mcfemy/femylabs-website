import Icon from '../components/ui/Icon.jsx'
import { STEPS } from './schema.js'

/**
 * Progress for the intake.
 *  - Compact bar + "Step X of Y" on every screen size.
 *  - On large screens, a full step list; steps already reached are buttons
 *    so visitors can jump back (forward jumps are blocked by validation).
 * `current` may equal STEPS.length, which means the review screen.
 */
export function ProgressBar({ current }) {
  const total = STEPS.length + 1 // + review
  const onReview = current >= STEPS.length
  const percent = Math.round(((current + 1) / total) * 100)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-navy-500">
        <span>{onReview ? 'Review & submit' : `Step ${current + 1} of ${STEPS.length}`}</span>
        <span>{percent}% complete</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-navy-900/10" aria-hidden="true">
        <div className="h-full rounded-full bg-verdigris-600 transition-[width] duration-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export function StepList({ current, furthest, onJump }) {
  const items = [...STEPS.map((s) => s.nav), 'Review & Submit']
  return (
    <nav aria-label="Intake progress">
      <ol className="space-y-1">
        {items.map((label, index) => {
          const isCurrent = index === current
          const isDone = index < furthest && !isCurrent
          const reachable = index <= furthest
          const base = 'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[0.95rem]'
          const marker = (
            <span
              aria-hidden="true"
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.7rem] font-bold ${
                isCurrent
                  ? 'bg-verdigris-700 text-white'
                  : isDone
                    ? 'bg-verdigris-200 text-verdigris-800'
                    : 'border border-navy-900/25 text-navy-500'
              }`}
            >
              {isDone ? <Icon name="check" className="h-3.5 w-3.5" /> : index + 1}
            </span>
          )
          return (
            <li key={label}>
              {reachable && !isCurrent ? (
                <button type="button" onClick={() => onJump(index)} className={`${base} text-navy-700 hover:bg-navy-900/5`}>
                  {marker}
                  {label}
                  {isDone && <span className="sr-only"> (completed)</span>}
                </button>
              ) : (
                <span
                  className={`${base} ${isCurrent ? 'bg-cream-50 font-semibold text-navy-900 ring-1 ring-navy-900/10' : 'text-navy-500'}`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {marker}
                  {label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
