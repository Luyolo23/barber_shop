import { addDays, format, parse, parseISO } from 'date-fns'
import { openingHours, shop } from '../data/shop'
import type { Booking, Service } from '../types'

export const SLOT_STEP = 30 // minutes between start times
export const LEAD_MINUTES = 30 // can't book a slot starting sooner than this

export const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export const fromMinutes = (n: number) =>
  `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`

export const endTime = (time: string, duration: number) =>
  fromMinutes(toMinutes(time) + duration)

/** "2026-09-29" -> "Tuesday, 29 September 2026" */
export const formatDate = (date: string) => format(parseISO(date), 'EEEE, d MMMM yyyy')

/** "15:00" -> "3:00 PM" */
export const formatTime = (time: string) => format(parse(time, 'HH:mm', new Date()), 'h:mm a')

/** Opening hours for a yyyy-MM-dd date, or null if the shop is closed. */
export function getHours(date: string) {
  const dow = parseISO(date).getDay()
  const entry = openingHours.find((h) => h.days.includes(dow))
  if (!entry || !entry.open || !entry.close) return null
  return { open: entry.open, close: entry.close }
}

/** Current date and time in the shop's timezone, whatever the visitor's device says. */
export function shopNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: shop.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((p) => p.type === type)!.value
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

export function upcomingDays(count: number) {
  const start = parseISO(shopNow().date)
  return Array.from({ length: count }, (_, i) => {
    const d = addDays(start, i)
    const iso = format(d, 'yyyy-MM-dd')
    return {
      date: iso,
      weekday: format(d, 'EEE'),
      day: format(d, 'd'),
      month: format(d, 'MMM'),
      closed: getHours(iso) === null,
    }
  })
}

/** Does a new appointment [start, start + duration) collide with an existing booking? */
export function overlaps(existing: Booking[], start: number, duration: number) {
  return existing.some((b) => {
    const bStart = toMinutes(b.time)
    const bEnd = bStart + b.duration
    return start < bEnd && start + duration > bStart
  })
}

export type Slot = { time: string; available: boolean }

/** Every possible start time for the day, flagged as available or not. */
export function generateSlots(date: string, service: Service, existing: Booking[]): Slot[] {
  const hours = getHours(date)
  if (!hours) return []

  const open = toMinutes(hours.open)
  const close = toMinutes(hours.close)
  const now = shopNow()
  const slots: Slot[] = []

  // The appointment must finish before closing time
  for (let start = open; start + service.duration <= close; start += SLOT_STEP) {
    const inPast =
      date < now.date || (date === now.date && start < now.minutes + LEAD_MINUTES)
    const taken = overlaps(existing, start, service.duration)
    slots.push({ time: fromMinutes(start), available: !inPast && !taken })
  }
  return slots
}