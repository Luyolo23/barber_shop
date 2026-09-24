import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Logo } from './Logo'
import { navLinks } from '../data/shop'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `label py-2 transition-colors hover:text-brass ${
    isActive ? 'text-brass' : 'text-cream'
  }`

export default function Header() {
  const [open, setOpen] = useState(false)

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 bg-bottle shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" onClick={close} aria-label="Rand & Razor Barber Co. home">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/booking" className="btn-primary">
            Book Now
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <Link to="/booking" onClick={close} className="btn-primary px-4 py-2">
            Book
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="rounded-sm p-2 text-cream focus-visible:outline-2 focus-visible:outline-brass"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-brass/40 bg-bottle md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {navLinks.map((l) => (
              <li key={l.to} className="border-b border-cream/10 last:border-0">
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  onClick={close}
                  className={(s) => `${linkClass(s)} block py-4`}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="pole-divider" />
    </header>
  )
}