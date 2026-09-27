import Icon from '../../components/ui/Icon.jsx'
import { OWNERSHIP } from '../../content/pricing.js'

/** "Your Project. Your Ownership." */
export default function Ownership() {
  return (
    <section aria-labelledby="ownership-title" className="border-y border-navy-900/10 bg-cream-50 py-20 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-navy-900 text-verdigris-300">
          <Icon name="shield" className="h-8 w-8" />
        </span>
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Ownership</p>
          <h2 id="ownership-title" className="text-3xl sm:text-4xl">
            {OWNERSHIP.title}
          </h2>
          <div className="prose-body mt-6 text-lg text-navy-500">
            {OWNERSHIP.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-8 font-display text-2xl italic text-navy-900 sm:text-3xl">{OWNERSHIP.tagline}</p>
        </div>
      </div>
    </section>
  )
}
