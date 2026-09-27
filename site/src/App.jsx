import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import HowItWorksPage from './pages/HowItWorksPage.jsx'
import WhatWeBuildPage from './pages/WhatWeBuildPage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import StartProjectPage from './pages/StartProjectPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { ROUTES } from './content/site.js'

/**
 * Client-side routes. On S3 + CloudFront, 403/404 responses must be rewritten
 * to /index.html so deep links resolve here (see README).
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.howItWorks} element={<HowItWorksPage />} />
        <Route path={ROUTES.whatWeBuild} element={<WhatWeBuildPage />} />
        <Route path={ROUTES.pricing} element={<PricingPage />} />
        <Route path={ROUTES.faq} element={<FaqPage />} />
        <Route path={ROUTES.start} element={<StartProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
