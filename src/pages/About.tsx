import { Link } from 'react-router-dom'
import BarberCard from '../components/BarberCard'
import PageHeader from '../components/PageHeader'
import { barbers } from '../data/barbers'
import { shop } from '../data/shop'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const stats = [
  { value: String(shop.established), label: 'Founded' },
  { value: '3', label: 'Generations of regulars' },
  { value: '40+', label: 'Years of combined craft' },
]

const values = [
  { title: 'Craft first', text: 'We take the time to do it properly. No rushed cuts, no shortcuts.' },
  { title: 'Everyone in the chair', text: 'From first haircuts to grandfathers, every customer gets the same care.' },
  { title: 'Rooted in Joburg', text: 'We started in the shadow of the mine dumps and we are still here, in the heart of the city.' },
]

export default function About() {
  useDocumentTitle('Our Story | Rand & Razor Barber Co.')
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Barbering, the old way"
        intro="A Johannesburg shop with a gold-rush heritage and a very sharp razor."
      />

      {/* Story */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <img
          src="/images/about.jpg"
          alt="The classic interior of Rand & Razor Barber Co."
          loading="lazy"
          className="aspect-[4/3] w-full rounded-sm border-2 border-brass object-cover shadow-lg"
        />
        <div className="space-y-4 leading-relaxed">
          <h2 className="text-3xl font-bold">From the Reef to Fox Street</h2>
          <p>
            Rand &amp; Razor opened in {shop.established}, when Johannesburg was still a city built on gold. Our founder, a young barber
            with a single chair and a leather strop, set up shop where miners, clerks and jazz musicians all needed the same thing:
            a sharp cut and a proper shave.
          </p>
          <p>
            The name says it all. The <em>rand</em> for the city that made us, the <em>razor</em> for the craft that keeps people coming back.
            Seventy years on, the chairs have been restored, the towels are still hot, and the standards haven&apos;t moved an inch.
          </p>
          <p>
            Today our three barbers carry on that tradition, blending classic technique with the sharpest modern fades.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-bottle py-12">
        <dl className="mx-auto grid max-w-4xl gap-8 px-4 text-center sm:grid-cols-3 sm:px-6">
          {stats.map((s) => (
            <div key={s.label} className='flex flex-col'>
              <dt className="label order-2 mt-1 text-brass">{s.label}</dt>
              <dd className="font-display text-5xl font-bold text-cream">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-4xl font-bold">What we stand for</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="border-t-4 border-oxblood pt-4">
              <h3 className="text-2xl font-bold">{v.title}</h3>
              <p className="mt-2">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Barbers */}
      <section className="bg-charcoal/5 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="label text-center text-oxblood">The team</p>
          <h2 className="mt-2 text-center text-4xl font-bold">Your barbers</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {barbers.map((b) => (
              <BarberCard key={b.id} barber={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-4xl font-bold">Come and see for yourself</h2>
        <p className="mt-3">Your chair is waiting.</p>
        <Link to="/booking" className="btn-primary mt-8">Book now</Link>
      </section>
    </>
  )
}