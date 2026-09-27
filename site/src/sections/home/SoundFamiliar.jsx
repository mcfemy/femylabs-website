import { Link } from 'react-router-dom'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { SITUATIONS } from '../../content/home.js'
import { ROUTES } from '../../content/site.js'

/** Everyday business situations that often turn into a Femylabs project. */
export default function SoundFamiliar() {
  return (
    <section aria-labelledby="familiar-title" className="bg-cream-100 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="familiar-title"
          eyebrow="Where projects begin"
          title="Does any of this sound familiar?"
          lede="These are the kinds of challenges business owners bring to Femylabs. Each one can become a focused, well-defined application."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SITUATIONS.map((situation) => (
            <li key={situation} className="flex gap-4 rounded-xl bg-cream-50 p-6 ring-1 ring-navy-900/10">
              <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-verdigris-700" />
              <p className="text-navy-700">{situation}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-lg">
          <Link
            to={ROUTES.whatWeBuild}
            className="inline-flex items-center gap-2 font-semibold text-verdigris-700 underline decoration-2 underline-offset-4 hover:text-navy-900"
          >
            See what Femylabs builds
            <Icon name="arrowRight" className="h-5 w-5" />
          </Link>
        </p>
      </div>
    </section>
  )
}
