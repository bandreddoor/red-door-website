export default function Merch() {
  return (
    <section
      id="merch"
      className="border-y border-ink/20 bg-cream py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:px-12 lg:gap-12 lg:px-16">
        {/* Left column */}
        <div className="flex min-w-0 items-center md:min-h-[320px] md:border-r md:border-ink/20 md:pr-8 lg:pr-12">
          <h2 className="whitespace-nowrap font-display text-7xl font-black uppercase leading-[0.8] tracking-tighter sm:text-8xl md:text-[9rem] lg:text-[10rem] xl:text-[10rem]">
            Merch<span className="text-red">.</span>
          </h2>
        </div>

        {/* Right column */}
        <div className="flex min-w-0 flex-col justify-center py-2 md:py-4">
          <p className="eyebrow mb-6 text-red md:mb-7">
            Official Red Door Store
          </p>

          <p className="eyebrow mb-3 text-ink/50">
            The first collection
          </p>

          <h3 className="font-display text-6xl font-black uppercase leading-[0.82] tracking-tighter sm:text-7xl lg:text-8xl">
            Coming
            <br />
            <span className="text-red">Soon.</span>
          </h3>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/60 md:mt-6 md:text-base">
            We're putting together the first batch of Red Door
            gear. Shirts, sweatshirts, and more. It'll be worth
            the wait.
          </p>
        </div>
      </div>
    </section>
  )
}