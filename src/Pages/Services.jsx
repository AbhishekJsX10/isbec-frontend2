import React from 'react'
import HeroSection2 from '../components/HeroSection2'
import AboutUs from '../components/AboutUs'
import MarqueeSection from '../components/MarqueeSection'

const Services = () => {
  return (
    <>
      <HeroSection2 page={"services"}/>
      <MarqueeSection />
      <AboutUs />
    </>
  )
}

export default Services