import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { BlueprintGrid } from '../../components/ui/PageHero.jsx'
import { HERO } from '../../content/home.js'
import { ROUTES } from '../../content/site.js'

/** Home hero: headline, supporting copy, two CTAs, and an example project brief. */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-navy-900 text-cream-100">
      <BlueprintGrid />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-verdigris-500/20 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-28">
        <div>
          <p className="eyebrow mb-5">{HERO.eyebrow}</p>
          <h1 id="hero-title" className="text-[2.6rem] leading-[1.05] text-cream-50 sm:text-6xl lg:text-[4.25rem]">
            You Bring the Idea.{' '}
            <span className="italic text-verdigris-300">We Build the Technology.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-cream-200 sm:text-xl">{HERO.body}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button to={ROUTES.start} variant="light" size="lg" arrow>
              Start Your Project
            </Button>
            <Button to={ROUTES.howItWorks} variant="ghostDark" size="lg">
              See How It Works
            </Button>
          </div>
          <p className="mt-6 font-mono text-sm text-cream-300">No technical knowledge required.</p>
        </div>

        <ProjectBriefCard />
      </div>
    </section>
  )
}

/**
 * Illustrative "project brief" — shows how a plain-language idea becomes a
 * defined project. Hidden from assistive tech; the same message is in the copy.
 */
function ProjectBriefCard() {
  const rows = [
    { label: 'Idea', value: 'Let clients book and pay for appointments online.' },
    { label: 'Problem', value: 'Front desk spends 15+ hours a week on phone bookings and reminders.' },
    { label: 'Solution', value: 'A booking portal with automatic reminders and deposits.' },
  ]
  const features = ['Scheduling', 'Payments', 'Notifications', 'Admin portal']

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
      <div className="absolute -inset-3 -rotate-2 rounded-2xl border border-cream-100/15" />
      <div className="relative rounded-xl bg-cream-50 p-6 text-navy-900 shadow-2xl shadow-black/40 sm:p-7">
        <div className="flex items-center justify-between border-b border-dashed border-navy-900/20 pb-4">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-verdigris-700">Project Brief</p>
          <p className="font-mono text-xs text-navy-500">Draft&nbsp;01</p>
        </div>
        <dl className="mt-5 space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy-500">{row.label}</dt>
              <dd className="mt-1 font-display text-[1.05rem] leading-snug">{row.value}</dd>
            </div>
          ))}
          <div>
            <dt className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy-500">Features</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {features.map((f) => (
                <span key={f} className="rounded-full border border-verdigris-500/50 bg-verdigris-100 px-3 py-1 text-sm">
                  {f}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-navy-900 px-4 py-3 text-cream-50">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-verdigris-300 text-navy-900">
            <Icon name="check" className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold">Ready for project review</span>
        </div>
      </div>
    </div>
  )
}
