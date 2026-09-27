/**
 * Navy intro band used at the top of every interior page. Holds the page's h1.
 */
export default function PageHero({ eyebrow, title, lede, children }) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy-900 text-cream-100">
      <BlueprintGrid />
      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-4xl text-cream-50 sm:text-5xl lg:text-[3.5rem]">{title}</h1>
          {lede && <p className="mt-6 max-w-2xl text-lg text-cream-200 sm:text-xl">{lede}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

/** Faint drafting-grid texture behind dark bands. Purely decorative. */
export function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #F4F1EA 1px, transparent 1px), linear-gradient(to bottom, #F4F1EA 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'linear-gradient(to bottom left, black 10%, transparent 70%)',
        WebkitMaskImage: 'linear-gradient(to bottom left, black 10%, transparent 70%)',
      }}
    />
  )
}
