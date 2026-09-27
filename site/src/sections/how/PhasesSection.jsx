import Icon from '../../components/ui/Icon.jsx'
import { BlueprintGrid } from '../../components/ui/PageHero.jsx'
import { PHASES } from '../../content/process.js'

/**
 * "Build in Phases. Grow With Confidence." — explains the module/phase model
 * with five example phases and the required disclaimer that real projects vary.
 */
export default function PhasesSection() {
  return (
    <section aria-labelledby="phases-title" className="on-dark relative overflow-hidden bg-navy-900 py-20 text-cream-100 sm:py-28">
      <BlueprintGrid />
      <div className="container-page relative">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Modules &amp; phases</p>
          <h2 id="phases-title" className="text-3xl text-cream-50 sm:text-5xl">
            {PHASES.title}
          </h2>
          <p className="mt-6 text-lg text-cream-200">{PHASES.intro}</p>
        </div>

        {/* Example phases as ascending building blocks. */}
        <p className="mt-14 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-300" id="phases-example-label">
          An example of how one application might be phased
        </p>
        <ol aria-labelledby="phases-example-label" className="mt-5 grid gap-3 md:grid-cols-5 md:items-end">
          {PHASES.examples.map((phase, index) => (
            <li
              key={phase.name}
              className="flex flex-col rounded-lg border border-cream-100/15 bg-navy-800/80 p-5"
              style={{ minHeight: `${11 + index * 2.25}rem` }}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-verdigris-300">
                Phase {index + 1}
              </span>
              <h3 className="mt-2 text-xl text-cream-50">{phase.name}</h3>
              <p className="mt-3 text-[0.95rem] text-cream-200">{phase.text}</p>
            </li>
          ))}
        </ol>

        {/* Required disclaimer — keep visually prominent. */}
        <div role="note" className="mt-8 flex gap-4 rounded-lg border-l-4 border-verdigris-300 bg-cream-100/10 p-5 sm:p-6">
          <Icon name="alert" className="mt-0.5 h-6 w-6 shrink-0 text-verdigris-300" />
          <p className="text-cream-100">
            <strong className="font-semibold text-cream-50">Every project is different. </strong>
            {PHASES.disclaimer}
          </p>
        </div>

        <ul className="mt-14 grid gap-8 border-t border-cream-100/15 pt-10 sm:grid-cols-3">
          {PHASES.benefits.map((b) => (
            <li key={b.title}>
              <h3 className="text-xl text-cream-50">{b.title}</h3>
              <p className="mt-2 text-cream-200">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
