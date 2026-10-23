import Image from 'next/image'
import Section from './Section'
import Reveal from './Reveal'

export default function LiveGallery() {
  return (
    <Section id="live" title="Live">
      <Reveal>
        <div className="grid gap-4 md:grid-cols-12 md:gap-6">
          <figure className="relative aspect-[4/5] overflow-hidden bg-ink/5 md:col-span-7 md:aspect-[5/4]">
            <Image
              src="/images/band-about.JPG"
              alt="Red Door together onstage"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </figure>
          <figure className="relative aspect-[4/5] overflow-hidden bg-ink/5 md:col-span-5 md:mt-20">
            <Image
              src="/images/band-photo.jpg"
              alt="Red Door performing live"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </figure>
        </div>
        <p className="eyebrow mt-6 text-ink/50">Red Door — Live</p>
      </Reveal>
    </Section>
  )
}
