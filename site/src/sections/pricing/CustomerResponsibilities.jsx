import SectionHeading from '../../components/ui/SectionHeading.jsx'
import { RESPONSIBILITIES } from '../../content/pricing.js'

/**
 * "What We Need From You" — customer responsibilities. Anchored at
 * #responsibilities so How It Works and the FAQ can link here.
 */
export default function CustomerResponsibilities() {
  return (
    <section id="responsibilities" aria-labelledby="responsibilities-title" className="bg-cream-100 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="responsibilities-title"
          eyebrow="Customer responsibilities"
          title={RESPONSIBILITIES.title}
          lede={RESPONSIBILITIES.intro}
        />

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {RESPONSIBILITIES.items.map((item) => (
            <li key={item} className="rounded-full border border-navy-900/15 bg-cream-50 px-4 py-2 text-navy-700">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {RESPONSIBILITIES.notes.map((note) => (
            <div key={note.title} className="rounded-xl border-t-4 border-verdigris-500 bg-cream-50 p-6 ring-1 ring-navy-900/10">
              <h3 className="text-xl">{note.title}</h3>
              <p className="mt-3 text-navy-500">{note.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
