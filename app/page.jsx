// src/Home.jsx

import Hero from '../components/hero'
import SportifyInParadox from '../components/SportifyInParadox'
import RashtriyaKhelMahotsav from '../components/RashtriyaKhelMahotsav'
import ConstitutionPreview from '../components/ConstitutionPreview'
import WebsiteFeaturesGame from '../components/WebsiteFeaturesGame'
import JoinCommunity from '../components/joinCommunity'
import Footer from '../components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950">
      <Hero />
      <SportifyInParadox />
      <RashtriyaKhelMahotsav />
      <ConstitutionPreview />
      <WebsiteFeaturesGame />
      <JoinCommunity />
      <Footer />
    </main>
  )
}
