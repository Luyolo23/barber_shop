import { downloadIcs, googleCalendarUrl } from '../services/calendar'
import type { Booking } from '../types'

export default function AddToCalendar({ booking }: { booking: Booking }) {
  return (
    <div className="mt-8 border-2 border-bottle bg-bottle/5 p-5">
      <h3 className="text-xl font-bold">Add to your calendar</h3>
      <p className="mt-1 text-sm">Never miss your appointment. We&apos;ll add a reminder one hour before.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <a
          href={googleCalendarUrl(booking)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Google Calendar
        </a>
        <button
          type="button"
          onClick={() => downloadIcs(booking)}
          className="btn border-2 border-bottle bg-bottle text-cream hover:bg-charcoal"
        >
          Apple / Outlook (.ics)
        </button>
      </div>
    </div>
  )
}