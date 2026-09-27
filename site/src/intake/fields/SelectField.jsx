import { describedBy, FieldError, FieldHint, FieldLabel, inputClasses } from './FieldShell.jsx'

/** Labeled native <select> (most accessible option for long lists). */
export default function SelectField({ id, label, value, onChange, options, error, hint, required, placeholder = 'Select one…' }) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <FieldHint id={id}>{hint}</FieldHint>
      <select
        id={id}
        name={id}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={`${inputClasses(error)} appearance-none bg-[length:1.25rem] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230C1A2B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FieldError id={id}>{error}</FieldError>
    </div>
  )
}
