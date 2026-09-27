import { Link } from 'react-router-dom'
import { COMPANY_NAME, CONTACT_EMAIL, NAV_LINKS, ROUTES } from '../../content/site.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark border-t border-cream-100/10 bg-navy-950 text-cream-200">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-cream-50">Femylabs</p>
          <p className="mt-3 max-w-sm text-cream-200">
            You bring the idea. We build the technology — custom web applications for business owners.
          </p>
          <Link
            to={ROUTES.start}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-cream-100 px-5 py-3 font-semibold text-navy-900 hover:bg-white"
          >
            Start Your Project
          </Link>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="rounded hover:text-cream-50 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Contact</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="rounded hover:text-cream-50 hover:underline">
            {CONTACT_EMAIL}
          </a>
          <p className="mt-6 text-sm text-cream-300">
            Pricing, ownership, and responsibilities described on this site are summaries. Binding terms are set out
            in each project&rsquo;s written development agreement.
          </p>
        </div>
      </div>
      <div className="border-t border-cream-100/10">
        <div className="container-page flex flex-col gap-2 py-6 font-mono text-xs uppercase tracking-wider text-cream-300 sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {COMPANY_NAME}. All rights reserved.
          </p>
          <p>femylabs.com</p>
        </div>
      </div>
    </footer>
  )
}
