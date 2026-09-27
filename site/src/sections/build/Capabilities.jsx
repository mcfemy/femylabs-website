import Icon from '../../components/ui/Icon.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import { ALSO, CAPABILITIES } from '../../content/capabilities.js'

/** Capability breadth, described by business outcome rather than technology. */
export default function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="bg-cream-100 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="capabilities-title"
          eyebrow="Capabilities"
          title="Software shaped around your business."
          lede="Whether you need to serve customers better, run operations more smoothly, or launch something new, Femylabs builds the application that makes it possible."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <li key={cap.title} className="flex flex-col rounded-xl border border-navy-900/10 bg-cream-50 p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-verdigris-100 text-verdigris-700">
                <Icon name={cap.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-2xl">{cap.title}</h3>
              <p className="mt-3 text-navy-500">{cap.text}</p>
              <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.16em] text-navy-500">For example</p>
              <ul className="mt-2 space-y-1.5 text-[0.95rem] text-navy-700">
                {cap.examples.map((ex) => (
                  <li key={ex} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-verdigris-500" />
                    {ex}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-xl bg-cream-200/70 p-6 sm:p-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-navy-500">And often, inside those</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {ALSO.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-4 py-2 text-navy-700 ring-1 ring-navy-900/10">
                <Icon name={item.icon} className="h-4 w-4 text-verdigris-700" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
