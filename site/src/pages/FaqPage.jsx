import useDocumentTitle from '../hooks/useDocumentTitle.js'
import PageHero from '../components/ui/PageHero.jsx'
import StartProjectCta from '../components/ui/StartProjectCta.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import { FAQS } from '../content/faq.js'
import { AGREEMENT_NOTE } from '../content/pricing.js'
import { CONTACT_EMAIL } from '../content/site.js'

export default function FaqPage() {
  useDocumentTitle('FAQ')
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions."
        lede="Straight answers about pricing, ownership, timelines, and working with Femylabs."
      />
      <section aria-label="Questions and answers" className="bg-cream-100 py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_2.2fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-2xl">Still have a question?</h2>
            <p className="mt-3 text-navy-500">
              Email us at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-verdigris-700 underline decoration-2 underline-offset-4 hover:text-navy-900"
              >
                {CONTACT_EMAIL}
              </a>
              , or include it in your project intake and we’ll answer it during our review.
            </p>
            <p className="mt-6 text-sm text-navy-500">{AGREEMENT_NOTE}</p>
          </aside>
          <Accordion items={FAQS} headingLevel={2} />
        </div>
      </section>
      <StartProjectCta />
    </>
  )
}
