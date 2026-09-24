import { Link } from 'react-router-dom'
import { LogoBadge } from '../components/Logo'

export default function Home() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <LogoBadge className="mx-auto h-48 w-48" />
      <p className="label mt-8 text-oxblood">Est. 1952 · Johannesburg</p>
      <h1 className="mt-2 text-5xl font-bold">Classic cuts. Proper shaves.</h1>
      <Link to="/booking" className="btn-primary mt-8">Book now</Link>
    </section>
  )
}