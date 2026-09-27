import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/*
 * Shared button styles. Renders a router <Link> when `to` is set, an <a> when
 * `href` is set, otherwise a <button>.
 *   primary   – verdigris CTA on light backgrounds
 *   light     – cream CTA for dark (navy) backgrounds
 *   secondary – outlined, for light backgrounds
 *   ghostDark – outlined, for dark backgrounds
 */
const VARIANTS = {
  primary: 'bg-verdigris-700 text-white hover:bg-verdigris-800 shadow-[0_1px_0_rgba(12,26,43,0.15)]',
  light: 'bg-cream-100 text-navy-900 hover:bg-white',
  secondary: 'border-2 border-navy-900/80 text-navy-900 hover:bg-navy-900 hover:text-cream-100',
  ghostDark: 'border-2 border-cream-100/60 text-cream-100 hover:border-cream-100 hover:bg-cream-100/10',
}

const SIZES = {
  sm: 'px-4 py-2 text-[0.95rem]',
  md: 'px-5 py-3 text-base',
  lg: 'px-7 py-4 text-lg',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150',
    'disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ')

  const content = (
    <>
      {children}
      {arrow && <Icon name="arrowRight" className="h-5 w-5 shrink-0" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}
