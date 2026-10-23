import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Music from '@/components/Music'
import Shows from '@/components/Shows'
import Merch from '@/components/Merch'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Booking from '@/components/Booking'
import LiveGallery from '@/components/LiveGallery'

export const revalidate = 86400 // rebuild daily so past shows drop off the list

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero /><Music /><Shows /><Booking /><LiveGallery /><Merch /><About /><Contact />
      </main>
      <Footer />
    </>
  )
}
