import { PRICING } from '../../content/pricing.js'

/**
 * Core pricing statement. The wording comes verbatim from content/pricing.js —
 * never shorten it to a flat per-module price.
 */
export default function PricingOverview() {
  return (
    <section aria-labelledby="pricing-overview-title" className="bg-cream-100 py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-3">Development pricing</p>
          <h2 id="pricing-overview-title" className="text-3xl sm:text-4xl">
            Priced by defined module or development phase.
          </h2>
          <div className="mt-8 rounded-xl border border-navy-900/10 bg-cream-50 p-7 sm:p-9">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-navy-500">Starting at approximately</p>
            <p className="mt-2 font-display text-6xl font-semibold text-navy-900 sm:text-7xl">
              $250
              <span className="ml-3 align-middle font-sans text-lg font-medium text-navy-500">
                per defined module or development phase
              </span>
            </p>
            <p className="mt-6 text-lg text-navy-700">{PRICING.statement}</p>
            <p className="mt-4 border-t border-navy-900/10 pt-4 font-semibold text-navy-900">{PRICING.finalNote}</p>
          </div>
        </div>

        <div className="lg:pt-16">
          <h3 className="text-2xl">How your price is set</h3>
          <ol className="mt-6 space-y-6">
            {PRICING.howItWorks.map((item, i) => (
              <li key={item.title} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-verdigris-700 font-mono text-sm font-bold text-verdigris-700"
                >
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-sans text-lg font-semibold tracking-normal">{item.title}</h4>
                  <p className="mt-1 text-navy-500">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
