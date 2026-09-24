import { services } from '../data/services'
import type { Booking } from '../types'
import { fromMinutes, generateSlots, getHours, SLOT_STEP, toMinutes } from './availability'

const KEY = 'rr-bookings'

export class SlotTakenError extends Error {}

function readAll(): Booking[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Booking[]) : []
  } catch {
    return []
  }
}

function writeAll(bookings: Booking[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(bookings))
  } catch {
    /* storage unavailable (private mode etc.), booking still confirms on screen */
  }
}

/**
 * Deterministic "existing customers" so the diary looks like a real, busy shop.
 * Same barber + date always gives the same busy slots. Delete this (and its
 * use below) when a real backend provides the bookings.
 */
function demoBookings(barberId: string, date: string): Booking[] {
  const hours = getHours(date)
  if (!hours) return []
  const open = toMinutes(hours.open)
  const cells = (toMinutes(hours.close) - open) / SLOT_STEP

  let hash = 0
  for (const ch of `${barberId}${date}`) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0

  return [0, 1, 2, 3].map((i) => ({
    reference: `DEMO-${i}`,
    serviceId: 'classic-cut',
    barberId,
    date,
    time: fromMinutes(open + ((hash + i * 5) % cells) * SLOT_STEP),
    duration: i % 2 === 0 ? 30 : 60,
    customer: { name: 'Existing customer', phone: '', email: '' },
    createdAt: '',
  }))
}

// Reference codes skip look-alike characters (0/O, 1/I)
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const makeReference = () =>
  'RR-' +
  Array.from({ length: 6 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('')

/** All bookings that block this barber on this date. */
export async function getBookingsFor(barberId: string, date: string): Promise<Booking[]> {
  const mine = readAll().filter((b) => b.barberId === barberId && b.date === date)
  return [...demoBookings(barberId, date), ...mine]
}

type NewBooking = Omit<Booking, 'reference' | 'createdAt'>

export async function createBooking(input: NewBooking): Promise<Booking> {
  const service = services.find((s) => s.id === input.serviceId)
  if (!service) throw new Error('Unknown service')

  // Re-check at the moment of booking: someone may have taken the slot
  // while this customer was filling in the form.
  const existing = await getBookingsFor(input.barberId, input.date)
  const slot = generateSlots(input.date, service, existing).find((s) => s.time === input.time)
  if (!slot || !slot.available) throw new SlotTakenError()

  const booking: Booking = {
    ...input,
    reference: makeReference(),
    createdAt: new Date().toISOString(),
  }
  writeAll([...readAll(), booking])
  return booking
}