import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import PageHero from '../components/ui/PageHero.jsx'
import StartProjectCta from '../components/ui/StartProjectCta.jsx'
import StepsSequence from '../sections/how/StepsSequence.jsx'
import PhasesSection from '../sections/how/PhasesSection.jsx'
import { ROUTES } from '../content/site.js'

export default function HowItWorksPage() {
  useDocumentTitle('How It Works')
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="A clear path from idea to launch."
        lede="You focus on what your business needs. We handle the planning, building, testing, and launch — and keep you informed at every step."
      />
      <StepsSequence />
      <PhasesSection />
      <section aria-labelledby="partnership-title" className="bg-cream-50 py-16">
        <div className="container-page max-w-3xl">
          <h2 id="partnership-title" className="text-2xl sm:text-3xl">
            A partnership on both sides.
          </h2>
          <p className="mt-4 text-lg text-navy-500">
            Your project moves fastest when the accounts, content, and approvals it needs arrive on time. See{' '}
            <Link
              to={`${ROUTES.pricing}#responsibilities`}
              className="font-semibold text-verdigris-700 underline decoration-2 underline-offset-4 hover:text-navy-900"
            >
              what we need from you
            </Link>{' '}
            and how{' '}
            <Link
              to={ROUTES.pricing}
              className="font-semibold text-verdigris-700 underline decoration-2 underline-offset-4 hover:text-navy-900"
            >
              pricing and partnership
            </Link>{' '}
            work.
          </p>
        </div>
      </section>
      <StartProjectCta
        title="Step one: tell us about your idea."
        body="Tell us about your project in plain language. We’ll review it and follow up with next steps — no commitment required to submit."
      />
    </>
  )
}
