import { barbers } from '../data/barbers'
import { services } from '../data/services'
import { fullAddress, shop } from '../data/shop'
import { endTime } from './availability'
import type { Booking } from '../types'

// Johannesburg is UTC+2 all year (South Africa has no daylight saving).
const SAST_OFFSET_MINUTES = 120

/** "2026-09-29" + "15:00" (shop-local) -> "20260929T130000Z" (UTC) */
function toUtcStamp(date: string, time: string, addMinutes = 0) {
  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  const ms =
    Date.UTC(y, m - 1, d, hh, mm) + (addMinutes - SAST_OFFSET_MINUTES) * 60_000
  return new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

/** "2026-09-29" + "15:00" -> "20260929T150000" (floating local time, used with ctz for Google) */
const toLocalStamp = (date: string, time: string) =>
  `${date.replaceAll('-', '')}T${time.replace(':', '')}00`

function describe(booking: Booking) {
  const service = services.find((s) => s.id === booking.serviceId)!
  const barber = barbers.find((b) => b.id === booking.barberId)!
  const lines = [
    `${service.name} with ${barber.name}`,
    `Booking reference: ${booking.reference}`,
    `Price: R${service.price} (pay in the shop)`,
    'Please arrive 5 minutes early.',
    `Call us: ${shop.phone}`,
    'Need to change or cancel? Please give us at least 24 hours notice.',
  ]
  return { service, barber, text: lines.join('\n') }
}

/** Link that opens Google Calendar with the appointment pre-filled. */
export function googleCalendarUrl(booking: Booking) {
  const { service, barber, text } = describe(booking)
  const end = endTime(booking.time, booking.duration)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${service.name} at ${shop.name}`,
    dates: `${toLocalStamp(booking.date, booking.time)}/${toLocalStamp(booking.date, end)}`,
    ctz: shop.timezone,
    details: text,
    location: `${shop.name}, ${fullAddress}`,
  })
  void barber
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

// ---- .ics generation (RFC 5545) ----

const escapeText = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

/** Lines must be 75 octets or fewer; longer ones continue on the next line after a space. */
function fold(line: string) {
  const encoder = new TextEncoder()
  if (encoder.encode(line).length <= 75) return line
  const out: string[] = []
  let current = ''
  for (const ch of line) {
    const limit = out.length === 0 ? 75 : 74 // continuation lines start with a space
    if (encoder.encode(current + ch).length > limit) {
      out.push(current)
      current = ch
    } else {
      current += ch
    }
  }
  out.push(current)
  return out.join('\r\n ')
}

export function buildIcs(booking: Booking) {
  const { service, barber, text } = describe(booking)
  const end = endTime(booking.time, booking.duration)
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${shop.name}//Booking//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking.reference}@randandrazor.co.za`,
    `DTSTAMP:${now}`,
    `DTSTART:${toUtcStamp(booking.date, booking.time)}`,
    `DTEND:${toUtcStamp(booking.date, end)}`,
    `SUMMARY:${escapeText(`${service.name} at ${shop.name}`)}`,
    `DESCRIPTION:${escapeText(text)}`,
    `LOCATION:${escapeText(`${shop.name}, ${fullAddress}`)}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(`Reminder: ${service.name} with ${barber.name} in 1 hour`)}`,
    'TRIGGER:-PT1H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.map(fold).join('\r\n') + '\r\n'
}

/** Triggers a download of the .ics file for this booking. */
export function downloadIcs(booking: Booking) {
  const blob = new Blob([buildIcs(booking)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `rand-and-razor-${booking.reference}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}