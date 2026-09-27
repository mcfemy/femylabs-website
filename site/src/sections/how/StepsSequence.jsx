import { STEPS } from '../../content/process.js'

/**
 * The 7-step process as a vertical timeline. Large numerals and a continuous
 * rail make the sequence scannable; each step notes the customer's part.
 */
export default function StepsSequence() {
  return (
    <section aria-labelledby="steps-title" className="bg-cream-100 py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3">The process</p>
          <h2 id="steps-title" className="text-3xl sm:text-4xl">
            Seven steps from idea to a running application.
          </h2>
          <p className="mt-5 text-lg text-navy-500">
            Every project follows the same clear path. You always know where things stand, what comes next, and
            what’s needed from you.
          </p>
        </div>

        <ol className="relative">
          {STEPS.map((step, index) => {
            const isLast = index === STEPS.length - 1
            return (
              <li key={step.title} className="relative grid grid-cols-[3.5rem_1fr] gap-5 pb-10 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-7 top-14 w-px bg-gradient-to-b from-verdigris-500 to-navy-900/15 sm:left-9 sm:top-[4.5rem]"
                  />
                )}
                <div
                  aria-hidden="true"
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full font-display text-2xl font-semibold sm:h-[4.5rem] sm:w-[4.5rem] sm:text-3xl ${
                    index === 0 ? 'bg-verdigris-700 text-white' : 'bg-navy-900 text-cream-50'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="rounded-xl border border-navy-900/10 bg-cream-50 p-6 sm:p-7">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-verdigris-700">
                    Step {index + 1} of {STEPS.length}
                  </p>
                  <h3 className="mt-2 text-2xl sm:text-[1.7rem]">{step.title}</h3>
                  <p className="mt-3 text-navy-500">{step.description}</p>
                  <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream-200 px-3 py-1 text-sm text-navy-700">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-navy-500">Your part:</span>
                    {step.youDo}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
