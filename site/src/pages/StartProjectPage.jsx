import useDocumentTitle from '../hooks/useDocumentTitle.js'
import PageHero from '../components/ui/PageHero.jsx'
import Icon from '../components/ui/Icon.jsx'
import IntakeForm from '../intake/IntakeForm.jsx'

const REASSURANCES = [
  'No technical knowledge needed',
  'Your answers save as you go',
  'Submissions are kept confidential',
]

export default function StartProjectPage() {
  useDocumentTitle('Start Your Project')
  return (
    <>
      <PageHero
        eyebrow="Project intake"
        title="Start Your Project"
        lede="Answer a few plain-language questions about your idea. Answer what you can — we’ll help shape the rest during our review."
      >
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {REASSURANCES.map((r) => (
            <li key={r} className="flex items-center gap-2 text-cream-100">
              <Icon name="check" className="h-5 w-5 text-verdigris-300" />
              {r}
            </li>
          ))}
        </ul>
      </PageHero>
      <section aria-label="Project intake form" className="bg-cream-100 py-12 sm:py-16">
        <div className="container-page">
          <IntakeForm />
        </div>
      </section>
    </>
  )
}
