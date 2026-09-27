import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import { NAV_LINKS, ROUTES } from '../../content/site.js'

/**
 * Sticky site header. Desktop: inline nav + prominent Start Your Project button.
 * Mobile: the CTA stays visible beside a menu toggle; the menu closes on
 * navigation and on Escape.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname])

  // Close on Escape and return focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Add a subtle shadow once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `relative rounded px-1 py-2 text-[0.95rem] font-medium transition-colors hover:text-verdigris-700 ${
      isActive
        ? 'text-navy-900 after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:bg-verdigris-500'
        : 'text-navy-600'
    }`

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-cream-100/95 backdrop-blur supports-[backdrop-filter]:bg-cream-100/85 ${
        scrolled ? 'border-navy-900/10 shadow-[0_4px_24px_-12px_rgba(12,26,43,0.25)]' : 'border-transparent'
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link to={ROUTES.home} className="flex items-baseline gap-2 rounded" aria-label="Femylabs — home">
          <span className="font-display text-2xl font-semibold tracking-tight text-navy-900">Femylabs</span>
          <span className="hidden font-mono text-xs font-bold uppercase tracking-[0.2em] text-verdigris-700 sm:inline">
            LLC
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === ROUTES.home} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button to={ROUTES.start} size="sm" className="whitespace-nowrap sm:px-5 sm:py-2.5">
            Start Your Project
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy-900 hover:bg-navy-900/5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <Icon name={menuOpen ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!menuOpen}
        className="border-t border-navy-900/10 bg-cream-100 lg:hidden"
      >
        <ul className="container-page flex flex-col py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === ROUTES.home}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-3 text-lg ${
                    isActive ? 'bg-verdigris-100 font-semibold text-navy-900' : 'text-navy-700 hover:bg-navy-900/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
