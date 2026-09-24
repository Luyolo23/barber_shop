import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
  if (hash) {
    // Wait a tick so the new page has rendered
    const id = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    }, 0)
    return () => window.clearTimeout(id)
  }
  window.scrollTo({ top: 0, behavior: 'instant' })
}, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-brass focus:px-4 focus:py-2 focus:text-charcoal"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}