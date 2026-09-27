import Button from '../../components/ui/Button.jsx'
import { START_BLOCK } from '../../content/capabilities.js'
import { NON_TECHNICAL } from '../../content/home.js'
import { ROUTES } from '../../content/site.js'

/** "Have an Idea but Don't Know Where to Start?" block with a Start Your Project CTA. */
export default function StartingPoint() {
  return (
    <section aria-labelledby="starting-point-title" className="border-t border-navy-900/10 bg-cream-50 py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-3">Not sure where to begin?</p>
          <h2 id="starting-point-title" className="text-3xl sm:text-4xl">
            {START_BLOCK.title}
          </h2>
          <div className="prose-body mt-6 text-lg text-navy-500">
            {START_BLOCK.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8">
            <Button to={ROUTES.start} size="lg" arrow>
              Start Your Project
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-navy-900 p-7 text-cream-100 sm:p-9">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-verdigris-300">
            Come ready to answer
          </p>
          <ol className="mt-5 space-y-4">
            {NON_TECHNICAL.prompts.map((prompt, i) => (
              <li key={prompt.question} className="flex items-baseline gap-4 border-b border-cream-100/10 pb-4 last:border-0 last:pb-0">
                <span className="font-mono text-sm text-verdigris-300">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-xl text-cream-50">{prompt.question}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
