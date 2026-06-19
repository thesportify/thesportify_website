import Hero from '../components/hero'
import RashtriyaKhelMahotsav from '../components/RashtriyaKhelMahotsav'
import MeetupsGallery from '../components/MeetupGallery'
import Playbook from '../components/Playbook'
import JoinCommunity from '../components/joinCommunity'
import Footer from '../components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <Hero />
      <RashtriyaKhelMahotsav />
      <MeetupsGallery />
      <Playbook />
      <JoinCommunity />
      <Footer />
    </main>
  )
}


