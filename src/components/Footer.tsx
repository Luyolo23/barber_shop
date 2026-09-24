import { Link } from 'react-router-dom'
import { LogoBadge } from './Logo'
import { shop, fullAddress, openingHours, navLinks } from '../data/shop'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="pole-divider" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <LogoBadge className="h-24 w-24" />
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            Johannesburg&apos;s home for classic cuts and proper shaves since {shop.established}.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h2 className="label mb-4 !text-brass">Explore</h2>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-brass">{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/booking" className="font-semibold text-brass hover:underline">
                Book an appointment
              </Link>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h2 className="label mb-4 !text-brass">Opening hours</h2>
          <ul className="space-y-2 text-sm">
            {openingHours.map((h) => (
              <li key={h.label} className="flex justify-between gap-4">
                <span>{h.label}</span>
                <span className="text-cream/80">
                  {h.open ? `${h.open} - ${h.close}` : 'Closed'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="label mb-4 !text-brass">Visit us</h2>
          <address className="space-y-2 text-sm not-italic">
            <p>{fullAddress}</p>
            <p>
              <a href={shop.phoneHref} className="hover:text-brass">{shop.phone}</a>
            </p>
            <p>
              <a href={`mailto:${shop.email}`} className="hover:text-brass">{shop.email}</a>
            </p>
          </address>
          <ul className="mt-4 flex gap-4 text-sm">
            {shop.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-brass hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream/70 sm:px-6 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {shop.name} All rights reserved.</p>
          <Link to="/terms" className="hover:text-brass">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  )
}