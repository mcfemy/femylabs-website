import { useId, useState } from 'react'
import Icon from './Icon.jsx'

/**
 * Accessible accordion (WAI-ARIA accordion pattern): each question is a
 * <button> inside a heading, with aria-expanded and aria-controls pointing to
 * a labelled region. Several panels may be open at once.
 */
export default function Accordion({ items, headingLevel = 3 }) {
  const [open, setOpen] = useState(() => new Set())
  const baseId = useId()
  const Heading = `h${headingLevel}`

  const toggle = (index) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  const allOpen = open.size === items.length

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((_, i) => i)))}
          className="font-mono text-sm font-bold uppercase tracking-wider text-verdigris-700 underline-offset-4 hover:underline"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>
      <ul className="divide-y divide-navy-900/10 border-y border-navy-900/10">
        {items.map((item, index) => {
          const isOpen = open.has(index)
          const buttonId = `${baseId}-q-${index}`
          const panelId = `${baseId}-a-${index}`
          return (
            <li key={item.question}>
              <Heading className="font-sans text-lg font-semibold tracking-normal">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left text-navy-900 hover:text-verdigris-700"
                >
                  <span>{item.question}</span>
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? 'border-verdigris-700 bg-verdigris-700 text-white' : 'border-navy-900/25'
                    }`}
                  >
                    <Icon name={isOpen ? 'minus' : 'plus'} className="h-4 w-4" />
                  </span>
                </button>
              </Heading>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="prose-body max-w-3xl pb-6 pr-4 text-navy-500 sm:pr-12"
              >
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
