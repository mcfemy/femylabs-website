import { describedBy, FieldError, FieldHint, FieldLabel, inputClasses } from './FieldShell.jsx'

/** Labeled single-line input. */
export default function TextField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  optional,
  type = 'text',
  autoComplete,
  inputMode,
  placeholder,
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required} optional={optional}>
        {label}
      </FieldLabel>
      <FieldHint id={id}>{hint}</FieldHint>
      <input
        id={id}
        name={id}
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={inputClasses(error)}
      />
      <FieldError id={id}>{error}</FieldError>
    </div>
  )
}
