import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { fullAddress, shop } from '../data/shop'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const LAST_UPDATED = '24 September 2026'

type Section = { id: string; title: string; body: string[] }

const sections: Section[] = [
  {
    id: 'about',
    title: '1. About these terms',
    body: [
      `These Terms & Conditions apply to all bookings and visits made with ${shop.name} ("we", "us"), including bookings made through this website. By making a booking you confirm that you have read and accepted them.`,
    ],
  },
  {
    id: 'bookings',
    title: '2. Bookings',
    body: [
      'Appointments can be booked online for Tuesday to Saturday during our opening hours. All times are Johannesburg time (SAST).',
      'Each booking reserves a slot with your chosen barber for the length of your chosen service. Your booking is confirmed once you see your booking reference on screen. Please keep this reference and quote it if you contact us.',
      'You are responsible for giving us correct contact details so that we can reach you about your appointment.',
    ],
  },
  {
    id: 'cancellations',
    title: '3. Cancellations and no-shows',
    body: [
      'If you need to change or cancel, please give us at least 24 hours notice by phone or email, quoting your booking reference. This lets us offer your slot to someone else.',
      'Cancellations with less than 24 hours notice, and no-shows, may be recorded. After repeated late cancellations or no-shows we may ask for payment in advance for future bookings.',
      'If we need to cancel or move your appointment (for example, because a barber is ill), we will contact you as soon as possible and offer you another time.',
    ],
  },
  {
    id: 'late-arrivals',
    title: '4. Late arrivals',
    body: [
      'Please arrive 5 minutes before your appointment. We hold your slot for 15 minutes.',
      'If you arrive more than 15 minutes late, we may shorten your service to avoid delaying the next customer, or ask you to rebook. A late arrival does not entitle you to a reduced price.',
    ],
  },
  {
    id: 'prices',
    title: '5. Prices and payment',
    body: [
      'All prices are in South African rand (ZAR) and include VAT. Prices shown on this website are for the standard service described. We will tell you before starting if your request needs more time or a different service, and the price may change accordingly.',
      'No deposit is required. Payment is made in the shop after your service, by cash or card.',
    ],
  },
  {
    id: 'children',
    title: '6. Children',
    body: [
      'The Kids Cut is for children under 12. Children under 12 must be accompanied by a parent or guardian for the duration of their appointment.',
    ],
  },
  {
    id: 'health',
    title: '7. Health, skin and allergies',
    body: [
      'Please tell your barber before your service if you have a skin condition, allergy, open wound, or any other health concern affecting your head, face or neck. We may decline or adjust a service if we believe it is not safe to proceed.',
    ],
  },
  {
    id: 'offers',
    title: '8. Offers and promotions',
    body: [
      'The first-visit offer (code FIRST10) gives 10% off one single service for new customers only. The code must be mentioned at the chair before your service begins, and it cannot be combined with other offers, applied to a previous visit, or exchanged for cash.',
      'We may change or withdraw offers at any time without affecting bookings already confirmed.',
    ],
  },
  {
    id: 'privacy',
    title: '9. Privacy and your information',
    body: [
      'We collect only the information needed to run your appointment: your name, phone number, email address, any notes you add, and the details of your booking. We use it to manage your appointment and to contact you about it.',
      'We do not sell your information or share it with third parties for marketing. We may share it only where the law requires us to, or with service providers who help us operate this website.',
      'We handle personal information in line with the Protection of Personal Information Act (POPIA). You may ask to see, correct or delete the information we hold about you by contacting us using the details below.',
    ],
  },
  {
    id: 'conduct',
    title: '10. Conduct in the shop',
    body: [
      'We want everyone to feel comfortable in our shop. We reserve the right to refuse service to anyone who is abusive, threatening or disruptive.',
    ],
  },
  {
    id: 'liability',
    title: '11. Our responsibility',
    body: [
      'We take great care with every service. If you are unhappy with your cut or shave, please tell us before you leave so we can put it right.',
      'Nothing in these terms limits your rights under the Consumer Protection Act or any other law. Subject to that, we are not liable for loss or damage that we could not reasonably have foreseen.',
    ],
  },
  {
    id: 'changes',
    title: '12. Changes and governing law',
    body: [
      'We may update these terms from time to time. The version on this page at the time of your booking applies to that booking.',
      'These terms are governed by the laws of the Republic of South Africa.',
    ],
  },
]

export default function Terms() {
  useDocumentTitle('Terms & Conditions | Rand & Razor Barber Co.')
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        intro={`Last updated ${LAST_UPDATED}`}
      />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <nav aria-label="On this page" className="mb-10 border-2 border-dashed border-bottle p-5">
          <p className="label text-xs text-oxblood">On this page</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-bottle underline-offset-4 hover:text-oxblood hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="text-2xl font-bold">{s.title}</h2>
              <div className="mt-3 space-y-3 leading-relaxed">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          <section id="contact" className="scroll-mt-28 border-t-4 border-oxblood pt-6">
            <h2 className="text-2xl font-bold">13. Contact us</h2>
            <address className="mt-3 space-y-1 not-italic">
              <p>{shop.name}</p>
              <p>{fullAddress}</p>
              <p>
                Phone:{' '}
                <a href={shop.phoneHref} className="font-semibold text-bottle underline underline-offset-4 hover:text-oxblood">
                  {shop.phone}
                </a>
              </p>
              <p>
                Email:{' '}
                <a href={`mailto:${shop.email}`} className="font-semibold text-bottle underline underline-offset-4 hover:text-oxblood">
                  {shop.email}
                </a>
              </p>
            </address>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link to="/booking" className="btn-primary">Book an appointment</Link>
        </div>
      </div>
    </>
  )
}