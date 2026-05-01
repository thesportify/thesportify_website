// src/Home.jsx

import Hero from '../components/hero'
import SportifyInParadox from '../components/SportifyInParadox'
import RashtriyaKhelMahotsav from '../components/RashtriyaKhelMahotsav'
import FeaturedEvents from '../components/featuredEvents'
import JoinCommunity from '../components/joinCommunity'
import Footer from '../components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950">
      <Hero />
      <SportifyInParadox />
      <RashtriyaKhelMahotsav />
      <FeaturedEvents />
      <JoinCommunity />
      <Footer />
    </main>
  )
}
