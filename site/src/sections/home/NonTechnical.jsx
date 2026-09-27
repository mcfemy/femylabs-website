import Icon from '../../components/ui/Icon.jsx'
import { NON_TECHNICAL } from '../../content/home.js'

/** "You Don't Need to Be Technical" — the reassurance line plus the five prompts. */
export default function NonTechnical() {
  return (
    <section aria-labelledby="non-technical-title" className="bg-cream-100 py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4">For business owners</p>
            <h2 id="non-technical-title" className="text-3xl sm:text-4xl">
              {NON_TECHNICAL.title}
            </h2>
            <blockquote className="mt-8 border-l-4 border-verdigris-500 pl-6">
              <p className="font-display text-2xl leading-snug text-navy-900 sm:text-[1.75rem]">
                {NON_TECHNICAL.line}
              </p>
            </blockquote>
            <p className="mt-8 text-lg text-navy-500">{NON_TECHNICAL.intro}</p>
          </div>

          <ol className="space-y-4">
            {NON_TECHNICAL.prompts.map((prompt, index) => (
              <li
                key={prompt.question}
                className="group flex gap-5 rounded-xl border border-navy-900/10 bg-cream-50 p-6 transition-colors hover:border-verdigris-500/60"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-verdigris-300">
                  <Icon name={prompt.icon} className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-verdigris-700">
                    Question {index + 1}
                  </p>
                  <h3 className="mt-1 text-xl sm:text-2xl">{prompt.question}</h3>
                  <p className="mt-2 text-navy-500">{prompt.hint}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
