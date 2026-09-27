import useDocumentTitle from '../hooks/useDocumentTitle.js'
import PageHero from '../components/ui/PageHero.jsx'
import StartProjectCta from '../components/ui/StartProjectCta.jsx'
import Icon from '../components/ui/Icon.jsx'
import PricingOverview from '../sections/pricing/PricingOverview.jsx'
import RevenueParticipation from '../sections/pricing/RevenueParticipation.jsx'
import ThirdPartyExpenses from '../sections/pricing/ThirdPartyExpenses.jsx'
import Ownership from '../sections/pricing/Ownership.jsx'
import CustomerResponsibilities from '../sections/pricing/CustomerResponsibilities.jsx'
import { AGREEMENT_NOTE, PRICING } from '../content/pricing.js'
import { ROUTES } from '../content/site.js'

export default function PricingPage() {
  useDocumentTitle('Pricing & Partnership')
  return (
    <>
      <PageHero eyebrow="Pricing & partnership" title={PRICING.title} lede={PRICING.lede} />
      <PricingOverview />
      <RevenueParticipation />
      <ThirdPartyExpenses />
      <Ownership />
      <CustomerResponsibilities />

      <div className="bg-cream-100 pb-20">
        <div className="container-page">
          <p role="note" className="flex max-w-3xl gap-3 rounded-lg bg-cream-200/70 p-5 text-navy-600">
            <Icon name="file" className="mt-0.5 h-5 w-5 shrink-0 text-navy-500" />
            <span>{AGREEMENT_NOTE}</span>
          </p>
        </div>
      </div>

      <StartProjectCta
        title="Get a proposal built around your project."
        body="Pricing is established after Femylabs reviews your project. Start with the intake — it’s the first step toward a clear, written proposal."
        secondary={{ label: 'Read the FAQ', to: ROUTES.faq }}
      />
    </>
  )
}
