import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'rr-offer-dismissed'

const wasDismissed = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export default function OfferModal() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Show after a short delay, unless already dismissed
  useEffect(() => {
    if (wasDismissed()) return
    const t = window.setTimeout(() => setOpen(true), 4000)
    return () => window.clearTimeout(t)
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* storage unavailable, ignore */
    }
  }

  // Escape key, focus, and body scroll lock while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/75 p-4"
      onClick={dismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-cream p-3 shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Close offer"
          className="absolute right-2 top-2 z-10 rounded-sm p-2 text-bottle hover:text-oxblood focus-visible:outline-2 focus-visible:outline-brass"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Vintage coupon */}
        <div className="border-2 border-dashed border-bottle px-6 py-9 text-center">
          <p className="label text-oxblood">First visit special</p>
          <h2 id="offer-title" className="mt-3 text-5xl font-bold">10% off</h2>
          <p className="mt-1 font-display text-xl text-bottle">your first cut</p>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed">
            New to Rand &amp; Razor? Mention code <strong>FIRST10</strong> at the chair and we’ll take 10% off any single service.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/booking" onClick={dismiss} className="btn-primary">
              Book my first cut
            </Link>
            <button type="button" onClick={dismiss} className="btn border-2 border-bottle text-bottle hover:bg-bottle hover:text-cream">
              No thanks
            </button>
          </div>
          <p className="mt-5 text-xs text-charcoal/70">New customers only. Valid on one service per customer.</p>
        </div>
      </div>
    </div>
  )
}