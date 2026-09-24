import BookingFlow from '../components/BookingFlow'
import PageHeader from '../components/PageHeader'
import { fullAddress, openingHours, shop } from '../data/shop'

export default function Booking() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`

  return (
    <>
      <PageHeader
        eyebrow="Book & contact"
        title="Book your chair"
        intro="Choose your service, barber and time. It takes under a minute."
      />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <BookingFlow />
      </section>

      <div className="pole-divider" />

      <section id="contact" className="bg-charcoal/5 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <p className="label text-oxblood">Find us</p>
            <h2 className="mt-2 text-3xl font-bold">Visit the shop</h2>

            <address className="mt-5 space-y-2 not-italic">
              <p>{shop.name}</p>
              <p>{fullAddress}</p>
              <p>
                Phone:{' '}
                <a href={shop.phoneHref} className="font-semibold text-bottle underline underline-offset-4 hover:text-oxblood">{shop.phone}</a>
              </p>
              <p>
                Email:{' '}
                <a href={`mailto:${shop.email}`} className="font-semibold text-bottle underline underline-offset-4 hover:text-oxblood">{shop.email}</a>
              </p>
            </address>

            <h3 className="mt-8 text-xl font-bold">Opening hours</h3>
            <ul className="mt-3 max-w-xs space-y-1">
              {openingHours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4">
                  <span>{h.label}</span>
                  <span className="font-semibold">{h.open ? `${h.open} - ${h.close}` : 'Closed'}</span>
                </li>
              ))}
            </ul>

            <a href={directions} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
              Get directions
            </a>
          </div>

          <iframe
            title={`Map showing the location of ${shop.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border-2 border-brass md:h-full md:min-h-80"
          />
        </div>
      </section>
    </>
  )
}