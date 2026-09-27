import Button from './Button.jsx'
import { BlueprintGrid } from './PageHero.jsx'
import { ROUTES } from '../../content/site.js'

/**
 * Closing call-to-action band. Every major page ends with this.
 */
export default function StartProjectCta({
  eyebrow = 'Ready when you are',
  title = 'Tell us what you want to accomplish.',
  body = 'Start with the idea. Our project intake walks you through the questions that matter — no technical knowledge required. We review every submission and follow up with next steps.',
  secondary,
}) {
  return (
    <section aria-labelledby="closing-cta-title" className="on-dark relative overflow-hidden bg-navy-900 text-cream-100">
      <BlueprintGrid />
      <div className="container-page relative py-20 sm:py-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 id="closing-cta-title" className="text-3xl text-cream-50 sm:text-5xl">
              {title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-cream-200">{body}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
            <Button to={ROUTES.start} variant="light" size="lg" arrow>
              Start Your Project
            </Button>
            {secondary && (
              <Button to={secondary.to} variant="ghostDark" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
