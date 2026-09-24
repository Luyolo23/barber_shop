import type { Barber } from '../types'

export default function BarberCard({ barber }: { barber: Barber }) {
  return (
    <article className="overflow-hidden rounded-sm border-2 border-brass bg-cream shadow-lg">
      <img
        src={barber.image}
        alt={`${barber.name}, ${barber.title} at Rand & Razor`}
        loading="lazy"
        className="aspect-[4/5] w-full object-cover"
      />
      <div className="p-5">
        <p className="label text-oxblood">{barber.title}</p>
        <h3 className="mt-1 text-2xl font-bold">{barber.name}</h3>
        <p className="mt-1 font-semibold">{barber.specialty}</p>
        <p className="mt-3 text-sm leading-relaxed">{barber.bio}</p>
        <p className="mt-4 border-t border-charcoal/20 pt-3 text-sm font-semibold text-bottle">
          {barber.years} years behind the chair
        </p>
      </div>
    </article>
  )
}