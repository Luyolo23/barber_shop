import { useEffect, useRef } from 'react'
import { barbers } from '../data/barbers'
import { services, formatPrice } from '../data/services'
import { fullAddress, shop } from '../data/shop'
import { endTime, formatDate, formatTime } from '../services/availability'
import type { Booking } from '../types'
import AddToCalendar from './AddToCalendar'

type Props = { booking: Booking; onReset: () => void }

export default function BookingConfirmation({ booking, onReset }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const service = services.find((s) => s.id === booking.serviceId)!
  const barber = barbers.find((b) => b.id === booking.barberId)!

  // Move focus to the heading so screen readers announce the result
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const rows: [string, string][] = [
    ['Service', `${service.name} (${service.duration} min)`],
    ['Barber', barber.name],
    ['Date', formatDate(booking.date)],
    ['Time', `${formatTime(booking.time)} - ${formatTime(endTime(booking.time, booking.duration))}`],
    ['Where', `${shop.name}, ${fullAddress}`],
    ['Price', `${formatPrice(service.price)} (pay in the shop)`],
  ]

  return (
    <div className="border-2 border-bottle bg-white/50 shadow-lg">
      <div className="bg-bottle px-6 py-6 text-center">
        <p className="label text-brass">Appointment card</p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-2 text-3xl font-bold text-cream! outline-none"
        >
          You&apos;re booked in, {booking.customer.name.split(' ')[0]}
        </h2>
      </div>

      <div className="p-6 sm:p-8">
        <div className="border-2 border-dashed border-bottle p-5 text-center">
          <p className="label text-xs text-oxblood">Booking reference</p>
          <p className="mt-1 font-display text-3xl font-bold tracking-widest text-bottle">
            {booking.reference}
          </p>
        </div>

        <dl className="mt-6 divide-y divide-charcoal/15">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-3 sm:grid-cols-3">
              <dt className="label text-xs text-oxblood">{label}</dt>
              <dd className="font-semibold sm:col-span-2">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-sm">
          A confirmation has been noted for {booking.customer.email}. Please arrive 5 minutes early.
        </p>

        <AddToCalendar booking={booking} />

        <div className="mt-8 text-center">
          <button type="button" onClick={onReset} className="btn border-2 border-bottle text-bottle hover:bg-bottle hover:text-cream">
            Book another appointment
          </button>
        </div>
      </div>
    </div>
  )
}