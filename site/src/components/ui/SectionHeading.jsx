/**
 * Eyebrow + heading + optional lede, used at the top of most sections.
 * Pass `id` so the parent <section> can reference it with aria-labelledby.
 */
export default function SectionHeading({ eyebrow, title, lede, id, align = 'left', dark = false, className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`max-w-3xl ${alignment} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className={`text-3xl sm:text-4xl ${dark ? 'text-cream-50' : ''}`}>
        {title}
      </h2>
      {lede && <p className={`mt-5 text-lg ${dark ? 'text-cream-200' : 'text-navy-500'}`}>{lede}</p>}
    </div>
  )
}
