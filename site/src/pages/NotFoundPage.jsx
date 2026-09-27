import useDocumentTitle from '../hooks/useDocumentTitle.js'
import PageHero from '../components/ui/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import { ROUTES } from '../content/site.js'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <PageHero eyebrow="404" title="We couldn’t find that page." lede="The page may have moved. Here are a few good places to go next.">
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button to={ROUTES.start} variant="light" size="lg" arrow>
          Start Your Project
        </Button>
        <Button to={ROUTES.home} variant="ghostDark" size="lg">
          Back to Home
        </Button>
      </div>
    </PageHero>
  )
}
