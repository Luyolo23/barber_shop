import { Link } from 'react-router-dom'
import BarberCard from '../components/BarberCard'
import OfferModal from '../components/OfferModal'
import { barbers } from '../data/barbers'
import { services, formatPrice } from '../data/services'

const featured = ['classic-cut', 'skin-fade', 'hot-towel-shave', 'full-service']
  .map((id) => services.find((s) => s.id === id)!)

const features = [
  { title: 'Since 1952', text: 'Seven decades of Johannesburg heads, and three generations of regulars.' },
  { title: 'Straight-razor craft', text: 'Hot towels, warm lather and a steady hand on every shave.' },
  { title: 'Book in minutes', text: 'Choose your barber and time online, then add it straight to your calendar.' },
]

const gallery = [
  { src: '/images/gallery-1.jpg', alt: 'Straight razor resting on a leather strop' },
  { src: '/images/gallery-2.jpg', alt: 'Barber tools laid out on a counter' },
  { src: '/images/gallery-3.jpg', alt: 'A fresh skin fade from behind' },
  { src: '/images/gallery-4.jpg', alt: 'Barber shaping a beard' },
  { src: '/images/gallery-5.jpg', alt: 'Vintage barber chair' },
  { src: '/images/gallery-6.jpg', alt: 'Hot towel shave in progress' },
]

export default function Home() {
  return (
    <>
      <OfferModal />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-charcoal">
        <img
          src="/images/hero.jpg"
          alt="Inside the Rand & Razor barber shop"
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-charcoal/90 via-charcoal/70 to-charcoal/30" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-36">
          <p className="label text-brass">Est. 1952 · Johannesburg</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight text-cream! md:text-6xl">
            Classic cuts. Proper shaves.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/90">
            Old-school barbering in the heart of Joburg. Sharp fades, hot towel shaves and beards done right.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link to="/booking" className="btn-primary">Book your chair</Link>
            <Link to="/services" className="btn-outline">View services</Link>
          </div>
        </div>
      </section>
      <div className="pole-divider" />

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <h2 className="text-2xl font-bold">{f.title}</h2>
              <p className="mx-auto mt-2 max-w-xs">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services teaser: vintage price board */}
      <section className="bg-bottle py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="border-2 border-brass p-6 sm:p-10">
            <p className="label text-center text-brass">The price board</p>
            <h2 className="mt-2 text-center text-4xl font-bold text-cream!">Our most popular</h2>
            <ul className="mt-8 space-y-6">
              {featured.map((s) => (
                <li key={s.id}>
                  <div className="flex items-baseline gap-3 text-cream">
                    <span className="font-display text-xl font-semibold">{s.name}</span>
                    <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-brass/60" />
                    <span className="font-display text-xl font-semibold text-brass">{formatPrice(s.price)}</span>
                  </div>
                  <p className="mt-1 text-sm text-cream/75">{s.description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Link to="/services" className="btn-primary">See all services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Barbers */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="label text-center text-oxblood">The team</p>
        <h2 className="mt-2 text-center text-4xl font-bold">Meet your barbers</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {barbers.map((b) => (
            <BarberCard key={b.id} barber={b} />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-charcoal py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="label text-center text-brass">The work</p>
          <h2 className="mt-2 text-center text-4xl font-bold text-cream!">From the chair</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((g) => (
              <img
                key={g.src}
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="aspect-square w-full rounded-sm object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-4xl font-bold">Ready for a fresh cut?</h2>
        <p className="mt-3">Tuesday to Saturday. Pick your barber and your time in under a minute.</p>
        <Link to="/booking" className="btn-primary mt-8">Book now</Link>
      </section>
    </>
  )
}