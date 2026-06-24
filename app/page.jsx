import Hero from '../components/hero'
import RashtriyaKhelMahotsav from '../components/RashtriyaKhelMahotsav'
import MeetupsGallery from '../components/MeetupGallery'
import ConstitutionSection from '../components/ConstitutionSection'
import JoinCommunity from '../components/joinCommunity'
import Footer from '../components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <Hero />
      <RashtriyaKhelMahotsav />
      <MeetupsGallery />
      <section className="relative w-full py-16 bg-[#050505] overflow-hidden border-b border-white/5 z-30" id="constitution">
        <div className="container mx-auto px-4 relative z-10">
          <ConstitutionSection />
        </div>
      </section>
      <JoinCommunity />
      <Footer />
    </main>
  )
}


