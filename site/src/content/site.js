// Site-wide constants: routes, navigation, contact details.

export const ROUTES = {
  home: '/',
  howItWorks: '/how-it-works',
  whatWeBuild: '/what-we-build',
  pricing: '/pricing',
  faq: '/faq',
  start: '/start-your-project',
}

export const NAV_LINKS = [
  { label: 'Home', to: ROUTES.home },
  { label: 'How It Works', to: ROUTES.howItWorks },
  { label: 'What We Build', to: ROUTES.whatWeBuild },
  { label: 'Pricing & Partnership', to: ROUTES.pricing },
  { label: 'FAQ', to: ROUTES.faq },
]

export const COMPANY_NAME = 'Femylabs LLC'

export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hello@femylabs.com'
