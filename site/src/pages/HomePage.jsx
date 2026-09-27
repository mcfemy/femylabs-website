import useDocumentTitle from '../hooks/useDocumentTitle.js'
import Hero from '../sections/home/Hero.jsx'
import NonTechnical from '../sections/home/NonTechnical.jsx'
import IdeaJourney from '../sections/home/IdeaJourney.jsx'
import SoundFamiliar from '../sections/home/SoundFamiliar.jsx'
import StartProjectCta from '../components/ui/StartProjectCta.jsx'
import { ROUTES } from '../content/site.js'

export default function HomePage() {
  useDocumentTitle(null)
  return (
    <>
      <Hero />
      <NonTechnical />
      <IdeaJourney />
      <SoundFamiliar />
      <StartProjectCta
        title="Your idea deserves more than a spreadsheet."
        secondary={{ label: 'See How It Works', to: ROUTES.howItWorks }}
      />
    </>
  )
}
