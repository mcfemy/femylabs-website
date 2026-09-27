import Icon from '../../components/ui/Icon.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import { THIRD_PARTY } from '../../content/pricing.js'

/** Third-party expenses the customer pays directly. */
export default function ThirdPartyExpenses() {
  return (
    <section aria-labelledby="third-party-title" className="bg-cream-100 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="third-party-title" eyebrow="Paid by the customer" title={THIRD_PARTY.title} lede={THIRD_PARTY.intro} />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {THIRD_PARTY.items.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-lg bg-cream-50 px-5 py-4 ring-1 ring-navy-900/10">
              <Icon name="check" className="h-5 w-5 shrink-0 text-verdigris-700" />
              <span className="text-navy-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
