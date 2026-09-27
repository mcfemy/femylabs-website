import { REVENUE_PARTICIPATION } from '../../content/pricing.js'

/** Ongoing Revenue Participation (5%, applicable commercial projects only). */
export default function RevenueParticipation() {
  return (
    <section aria-labelledby="revenue-title" className="on-dark bg-navy-900 py-20 text-cream-100 sm:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        <div aria-hidden="true" className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-2 border-verdigris-300/60 sm:h-52 sm:w-52">
          <span className="font-display text-6xl font-semibold text-cream-50 sm:text-7xl">5%</span>
          <span className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-verdigris-300">Where applicable</span>
        </div>
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Long-term partnership</p>
          <h2 id="revenue-title" className="text-3xl text-cream-50 sm:text-4xl">
            {REVENUE_PARTICIPATION.title}
          </h2>
          <div className="prose-body mt-6 text-lg text-cream-200">
            {REVENUE_PARTICIPATION.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
