import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { services, formatPrice } from '../data/services'
import type { Service } from '../types'

const categories: { id: Service['category']; title: string; note: string }[] = [
  { id: 'cuts', title: 'Cuts', note: 'Every cut ends with a neck shave and a style.' },
  { id: 'beard', title: 'Beard & Shave', note: 'Hot towels, warm lather and a steady hand.' },
  { id: 'packages', title: 'Packages', note: 'The best value if you want the works.' },
]

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="The price board"
        title="Services & pricing"
        intro="Honest prices, no surprises. All prices are in South African rand."
      />

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-14 sm:px-6">
        {categories.map((cat) => (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="border-2 border-bottle p-6 sm:p-8">
            <h2 id={`cat-${cat.id}`} className="text-3xl font-bold">{cat.title}</h2>
            <p className="mt-1 text-sm text-charcoal/75">{cat.note}</p>

            <ul className="mt-6 divide-y divide-charcoal/15">
              {services
                .filter((s) => s.category === cat.id)
                .map((s) => (
                  <li key={s.id} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                      <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-brass" />
                      <span className="font-display text-xl font-bold text-bottle">{formatPrice(s.price)}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed">{s.description}</p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <span className="label text-xs text-oxblood">{s.duration} min</span>
                      <Link
                        to={`/booking?service=${s.id}`}
                        className="btn-primary px-4 py-2 text-xs"
                        aria-label={`Book ${s.name}`}
                      >
                        Book this
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <p className="text-center text-sm text-charcoal/75">
          Prices include VAT. Cancellations and late arrivals are covered in our{' '}
          <Link to="/terms" className="font-semibold text-bottle underline underline-offset-4 hover:text-oxblood">
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </div>
    </>
  )
}