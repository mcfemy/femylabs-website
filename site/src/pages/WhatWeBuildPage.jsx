import useDocumentTitle from '../hooks/useDocumentTitle.js'
import PageHero from '../components/ui/PageHero.jsx'
import StartProjectCta from '../components/ui/StartProjectCta.jsx'
import Capabilities from '../sections/build/Capabilities.jsx'
import StartingPoint from '../sections/build/StartingPoint.jsx'
import { ROUTES } from '../content/site.js'

export default function WhatWeBuildPage() {
  useDocumentTitle('What We Build')
  return (
    <>
      <PageHero
        eyebrow="What we build"
        title="Custom applications that solve real business problems."
        lede="From customer-facing platforms to the tools that run your operations behind the scenes — if your business needs it to work a certain way, Femylabs can build it."
      />
      <Capabilities />
      <StartingPoint />
      <StartProjectCta secondary={{ label: 'See Pricing & Partnership', to: ROUTES.pricing }} />
    </>
  )
}
