import SectionHeading from '../../components/ui/SectionHeading.jsx'
import Button from '../../components/ui/Button.jsx'
import { JOURNEY } from '../../content/home.js'
import { ROUTES } from '../../content/site.js'

/** Idea → Problem → Solution → Features → Project Intake, as a connected sequence. */
export default function IdeaJourney() {
  return (
    <section aria-labelledby="journey-title" className="border-y border-navy-900/10 bg-cream-50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="journey-title"
          eyebrow="From idea to project"
          title="Your idea becomes a clear, reviewable project."
          lede="Our project intake follows the same path every successful application does. By the end, your idea is organized into something Femylabs can review, scope, and propose on."
        />

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {JOURNEY.map((stage, index) => {
            const isLast = index === JOURNEY.length - 1
            return (
              <li key={stage.label} className="relative lg:pr-6">
                {/* Connector line between stages on large screens. */}
                {!isLast && (
                  <span aria-hidden="true" className="absolute left-12 right-0 top-6 hidden h-px bg-navy-900/20 lg:block" />
                )}
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full font-mono text-sm font-bold ${
                    isLast ? 'bg-verdigris-700 text-white' : 'border-2 border-navy-900 bg-cream-50 text-navy-900'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-5 text-2xl">{stage.label}</h3>
                <p className="mt-2 text-navy-500">{stage.text}</p>
              </li>
            )
          })}
        </ol>

        <div className="mt-12">
          <Button to={ROUTES.start} arrow>
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  )
}
