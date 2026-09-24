type Props = {
  eyebrow: string
  title: string
  intro?: string
}

export default function PageHeader({ eyebrow, title, intro }: Props) {
  return (
    <>
      <section className="bg-bottle py-14 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="label text-brass">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold text-cream! md:text-5xl">{title}</h1>
          {intro && <p className="mx-auto mt-4 max-w-xl text-lg text-cream/85">{intro}</p>}
        </div>
      </section>
      <div className="pole-divider" />
    </>
  )
}