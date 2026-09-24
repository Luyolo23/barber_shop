import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page Not Found | Rand & Razor Barber Co.')
  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="label text-oxblood">Error 404</p>
      <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
      <p className="mt-4">Looks like this page got a bit too much off the top.</p>
      <Link to="/" className="btn-primary mt-8">Back to home</Link>
    </section>
  )
}