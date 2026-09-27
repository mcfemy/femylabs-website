import Icon from '../../components/ui/Icon.jsx'
import { FieldError } from './FieldShell.jsx'

/**
 * Checkbox (multiple) or radio (single) group rendered as selectable cards.
 * Semantics: <fieldset> + <legend>, native inputs (visually hidden but
 * focusable), so keyboard and screen readers behave exactly like native
 * controls — Space toggles checkboxes, arrow keys move between radios.
 */
export default function ChoiceGroup({
  id,
  legend,
  hint,
  options,
  value,
  onChange,
  error,
  multiple = false,
  required,
  columns = 2,
  legendAsHeading = false,
}) {
  const selected = multiple ? value ?? [] : value

  const isChecked = (v) => (multiple ? selected.includes(v) : selected === v)

  const handleChange = (v, checked) => {
    if (multiple) {
      onChange(checked ? [...selected, v] : selected.filter((x) => x !== v))
    } else {
      onChange(v)
    }
  }

  const grid = { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' }[columns]
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <fieldset
      id={id}
      tabIndex={-1}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      aria-required={!multiple && required ? true : undefined}
      className="focus:outline-none"
    >
      <legend
        className={
          legendAsHeading
            ? 'sr-only'
            : 'text-[1.05rem] font-semibold text-navy-900'
        }
      >
        {legend}
        {required && !legendAsHeading && (
          <span className="ml-1 text-verdigris-700" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.95rem] text-navy-500">
          {hint}
        </p>
      )}
      <div className={`mt-4 grid gap-3 ${grid}`}>
        {options.map((option) => {
          const inputId = `${id}-${option.value.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
          const checked = isChecked(option.value)
          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={`relative flex cursor-pointer items-start gap-3 rounded-lg border-2 bg-white px-4 py-3.5 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-verdigris-600 ${
                checked ? 'border-verdigris-700 bg-verdigris-100' : 'border-navy-900/15 hover:border-navy-900/40'
              }`}
            >
              <input
                id={inputId}
                type={multiple ? 'checkbox' : 'radio'}
                name={id}
                value={option.value}
                checked={checked}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 ${
                  multiple ? 'rounded' : 'rounded-full'
                } ${checked ? 'border-verdigris-700 bg-verdigris-700 text-white' : 'border-navy-900/40 bg-white'}`}
              >
                {checked && (multiple ? <Icon name="check" className="h-3.5 w-3.5" /> : <span className="h-2 w-2 rounded-full bg-white" />)}
              </span>
              <span>
                <span className="block font-semibold text-navy-900">{option.label}</span>
                {option.hint && <span className="mt-0.5 block text-sm text-navy-500">{option.hint}</span>}
              </span>
            </label>
          )
        })}
      </div>
      <FieldError id={id}>{error}</FieldError>
    </fieldset>
  )
}
