import { describedBy, FieldError, FieldHint, FieldLabel, inputClasses } from './FieldShell.jsx'

/** Labeled multi-line input with a soft character counter. */
export default function TextArea({ id, label, value, onChange, error, hint, required, optional, rows = 7, maxLength = 5000, placeholder }) {
  const length = (value ?? '').length
  return (
    <div>
      <FieldLabel htmlFor={id} required={required} optional={optional}>
        {label}
      </FieldLabel>
      <FieldHint id={id}>{hint}</FieldHint>
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value ?? ''}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={`${inputClasses(error)} min-h-40 resize-y leading-relaxed`}
      />
      <div className="flex items-start justify-between gap-4">
        <FieldError id={id}>{error}</FieldError>
        <p className="ml-auto mt-2 shrink-0 font-mono text-xs text-navy-500" aria-hidden="true">
          {length.toLocaleString()} / {maxLength.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
