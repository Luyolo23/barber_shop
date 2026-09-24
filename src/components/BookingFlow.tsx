import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import BookingConfirmation from './BookingConfirmation'
import { barbers } from '../data/barbers'
import { services, formatPrice } from '../data/services'
import {
  endTime,
  formatDate,
  formatTime,
  generateSlots,
  upcomingDays,
} from '../services/availability'
import { createBooking, getBookingsFor, SlotTakenError } from '../services/bookingService'
import type { Booking } from '../types'

const detailsSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  phone: z
    .string()
    .trim()
    .regex(/^(\+27|0)[0-9 ]{9,12}$/, 'Enter a valid South African number, e.g. 082 123 4567'),
  email: z.string().trim().email('Enter a valid email address'),
  notes: z.string().trim().max(300, 'Please keep notes under 300 characters').optional(),
  agree: z.boolean().refine((v) => v === true, { message: 'Please accept the Terms & Conditions' }),
})
type DetailsForm = z.infer<typeof detailsSchema>

const choice = (selected: boolean, disabled = false) =>
  `rounded-sm border-2 p-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
    disabled
      ? 'cursor-not-allowed border-charcoal/15 bg-charcoal/5 opacity-50'
      : selected
        ? 'border-bottle bg-bottle text-cream'
        : 'border-charcoal/25 bg-white/40 hover:border-brass'
  }`

const inputClass =
  'w-full rounded-sm border-2 border-charcoal/30 bg-white/70 px-3 py-2.5 focus:border-bottle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brass'

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`step-${n}`} className="border-2 border-bottle p-5 sm:p-7">
      <h2 id={`step-${n}`} className="flex items-center gap-3 text-2xl font-bold">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bottle font-sans text-base text-cream">
          {n}
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-oxblood">
          {error}
        </p>
      )}
    </div>
  )
}

export default function BookingFlow() {
  const [params] = useSearchParams()
  const preselected = services.find((s) => s.id === params.get('service'))?.id ?? ''

  const [serviceId, setServiceId] = useState(preselected)
  const [barberId, setBarberId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [existing, setExisting] = useState<Booking[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [confirmed, setConfirmed] = useState<Booking | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { name: '', phone: '', email: '', notes: '', agree: false },
  })

  const service = services.find((s) => s.id === serviceId)
  const barber = barbers.find((b) => b.id === barberId)
  const days = useMemo(() => upcomingDays(28), [])

  // Load the barber's existing bookings whenever barber or date changes
  useEffect(() => {
    if (!barberId || !date) return
    let cancelled = false
    setLoadingSlots(true)
    getBookingsFor(barberId, date).then((b) => {
      if (cancelled) return
      setExisting(b)
      setLoadingSlots(false)
    })
    return () => {
      cancelled = true
    }
  }, [barberId, date])

  const slots = useMemo(
    () => (service && barberId && date ? generateSlots(date, service, existing) : []),
    [service, barberId, date, existing],
  )
  const anyAvailable = slots.some((s) => s.available)

  // Changing an earlier choice invalidates the chosen time
  const pickService = (id: string) => { setServiceId(id); setTime('') }
  const pickBarber = (id: string) => { setBarberId(id); setTime('') }
  const pickDate = (d: string) => { setDate(d); setTime('') }

  const onSubmit = async (data: DetailsForm) => {
    if (!service || !barber || !date || !time) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const booking = await createBooking({
        serviceId: service.id,
        barberId: barber.id,
        date,
        time,
        duration: service.duration,
        customer: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          notes: data.notes || undefined,
        },
      })
      setConfirmed(booking)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      if (err instanceof SlotTakenError) {
        setSubmitError('Sorry, that time was just taken. Please choose another time.')
        setTime('')
        setExisting(await getBookingsFor(barber.id, date))
      } else {
        setSubmitError('Something went wrong while saving your booking. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const startOver = () => {
    setConfirmed(null)
    setServiceId('')
    setBarberId('')
    setDate('')
    setTime('')
    setExisting([])
    reset()
  }

  if (confirmed) return <BookingConfirmation booking={confirmed} onReset={startOver} />

  return (
    <div className="space-y-8">
      {/* 1. Service */}
      <Step n={1} title="Choose your service">
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={serviceId === s.id}
              onClick={() => pickService(s.id)}
              className={choice(serviceId === s.id)}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-display text-lg font-semibold">{s.name}</span>
                <span className="font-display text-lg font-bold">{formatPrice(s.price)}</span>
              </span>
              <span className="mt-1 block text-sm opacity-80">{s.duration} min</span>
            </button>
          ))}
        </div>
      </Step>

      {/* 2. Barber */}
      {service && (
        <Step n={2} title="Choose your barber">
          <div className="grid gap-3 sm:grid-cols-3">
            {barbers.map((b) => (
              <button
                key={b.id}
                type="button"
                aria-pressed={barberId === b.id}
                onClick={() => pickBarber(b.id)}
                className={`${choice(barberId === b.id)} flex items-center gap-3`}
              >
                <img
                  src={b.image}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-full border-2 border-brass object-cover"
                />
                <span>
                  <span className="block font-display text-lg font-semibold leading-tight">{b.name.split(' ')[0]}</span>
                  <span className="block text-xs opacity-80">{b.specialty}</span>
                </span>
              </button>
            ))}
          </div>
        </Step>
      )}

      {/* 3. Date */}
      {service && barber && (
        <Step n={3} title="Pick a date">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {days.map((d) => (
              <button
                key={d.date}
                type="button"
                disabled={d.closed}
                aria-pressed={date === d.date}
                aria-label={d.closed ? `${d.weekday} ${d.day} ${d.month}, closed` : `${d.weekday} ${d.day} ${d.month}`}
                onClick={() => pickDate(d.date)}
                className={`${choice(date === d.date, d.closed)} px-1 py-3 text-center`}
              >
                <span className="label block text-[0.65rem]">{d.weekday}</span>
                <span className="block font-display text-2xl font-bold leading-tight">{d.day}</span>
                <span className="block text-xs">{d.closed ? 'Closed' : d.month}</span>
              </button>
            ))}
          </div>
        </Step>
      )}

      {/* 4. Time */}
      {service && barber && date && (
        <Step n={4} title="Pick a time">
          {loadingSlots ? (
            <p>Checking {barber.name.split(' ')[0]}&apos;s diary&hellip;</p>
          ) : !anyAvailable ? (
            <p className="font-semibold text-oxblood">
              Fully booked on this day. Please try another date.
            </p>
          ) : (
            <>
              <p className="mb-4 text-sm">
                {formatDate(date)}. Times are Johannesburg time (SAST). Struck-through times are taken.
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((s) => (
                  <button
                    key={s.time}
                    type="button"
                    disabled={!s.available}
                    aria-pressed={time === s.time}
                    onClick={() => setTime(s.time)}
                    className={`${choice(time === s.time, !s.available)} px-2 py-3 text-center font-semibold ${
                      !s.available ? 'line-through' : ''
                    }`}
                  >
                    {formatTime(s.time)}
                  </button>
                ))}
              </div>
            </>
          )}
        </Step>
      )}

      {/* 5. Details */}
      {service && barber && date && time && (
        <Step n={5} title="Your details">
          <dl className="mb-6 space-y-1 border-2 border-dashed border-bottle p-4 text-sm">
            <div className="flex justify-between gap-4"><dt className="font-semibold">Service</dt><dd>{service.name}</dd></div>
            <div className="flex justify-between gap-4"><dt className="font-semibold">Barber</dt><dd>{barber.name}</dd></div>
            <div className="flex justify-between gap-4"><dt className="font-semibold">When</dt><dd className="text-right">{formatDate(date)}, {formatTime(time)} - {formatTime(endTime(time, service.duration))}</dd></div>
            <div className="flex justify-between gap-4"><dt className="font-semibold">Price</dt><dd>{formatPrice(service.price)}</dd></div>
          </dl>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Field id="name" label="Full name" error={errors.name?.message}>
              <input id="name" type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={inputClass} {...register('name')} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="phone" label="Phone number" error={errors.phone?.message}>
                <input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} className={inputClass} {...register('phone')} />
              </Field>
              <Field id="email" label="Email address" error={errors.email?.message}>
                <input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={inputClass} {...register('email')} />
              </Field>
            </div>
            <Field id="notes" label="Notes for your barber (optional)" error={errors.notes?.message}>
              <textarea id="notes" rows={3} className={inputClass} {...register('notes')} />
            </Field>

            <div>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" className="mt-1 h-5 w-5 accent-bottle" aria-invalid={!!errors.agree} {...register('agree')} />
                <span>
                  I have read and accept the{' '}
                  <Link to="/terms" target="_blank" rel="noopener" className="font-semibold text-bottle underline underline-offset-4 hover:text-oxblood">
                    Terms &amp; Conditions
                  </Link>
                  .
                </span>
              </label>
              {errors.agree && (
                <p role="alert" className="mt-1 text-sm font-semibold text-oxblood">{errors.agree.message}</p>
              )}
            </div>

            {submitError && (
              <p role="alert" className="border-2 border-oxblood bg-oxblood/10 p-3 text-sm font-semibold text-oxblood">
                {submitError}
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? 'Confirming...' : 'Confirm booking'}
            </button>
          </form>
        </Step>
      )}
    </div>
  )
}