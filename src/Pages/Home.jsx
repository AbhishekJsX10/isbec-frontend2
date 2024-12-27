import React from 'react'
import HeroSection2 from '../components/HeroSection2'
import MarqueeSection from '../components/MarqueeSection'
import Services from '../components/Services'
import WhatWeDo from '../components/WhatWeDo'
import InvestedIn from '../components/InvestedIn'

const Home = () => {
  return (
    <main className="relative w-full overflow-hidden">
      <HeroSection2 page={"home"}/>
      <MarqueeSection />
      <Services />
      <InvestedIn />
      <WhatWeDo/>
    </main>
  )
}

export default Home