import Icon from '../../components/ui/Icon.jsx'

/*
 * Shared label / hint / error wiring for single-input fields.
 * IDs follow a convention so inputs can reference them:
 *   `${id}-hint` and `${id}-error` → aria-describedby
 */
export function describedBy(id, { hint, error }) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
}

export function FieldLabel({ htmlFor, children, required, optional }) {
  return (
    <label htmlFor={htmlFor} className="block text-[1.05rem] font-semibold text-navy-900">
      {children}
      {required && (
        <span className="ml-1 text-verdigris-700" aria-hidden="true">
          *
        </span>
      )}
      {optional && <span className="ml-2 font-mono text-xs font-normal uppercase tracking-wider text-navy-500">Optional</span>}
    </label>
  )
}

export function FieldHint({ id, children }) {
  if (!children) return null
  return (
    <p id={`${id}-hint`} className="mt-1.5 text-[0.95rem] text-navy-500">
      {children}
    </p>
  )
}

export function FieldError({ id, children }) {
  if (!children) return null
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-[0.95rem] font-semibold text-danger-700">
      <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
      {children}
    </p>
  )
}

/** Base classes for text inputs, textareas, and selects. */
export function inputClasses(error) {
  return [
    'mt-2 block w-full rounded-md border bg-white px-4 py-3 text-base text-navy-900 shadow-sm',
    'placeholder:text-navy-500/70 focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-1',
    error ? 'border-danger-700 ring-1 ring-danger-700' : 'border-navy-900/25 hover:border-navy-900/45',
  ].join(' ')
}
