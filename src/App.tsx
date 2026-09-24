import { Logo, LogoBadge } from './components/Logo'

export default function App() {
  return (
    <div>
      <header className="bg-bottle px-6 py-4">
        <Logo />
      </header>
      <div className="pole-divider" />
      <main className="mx-auto max-w-3xl px-6 py-16 text-center">
        <LogoBadge className="mx-auto h-56 w-56" />
        <p className="label mt-8 text-oxblood">Est. 1952 · Johannesburg</p>
        <h1 className="mt-2 text-5xl font-bold">Classic cuts. Proper shaves.</h1>
        <div className="mt-8 flex justify-center gap-4">
          <button className="btn-primary">Book now</button>
          <button className="btn-outline bg-bottle">Our services</button>
        </div>
      </main>
    </div>
  )
}