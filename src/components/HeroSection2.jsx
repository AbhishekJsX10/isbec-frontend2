import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import meetingRoom from '../assets/hero-1.png'
import meetingRoom2 from '../assets/hero-2.png'
import circularPerson from '../assets/circularPerson.avif'
import BookDemoModal from './BookDemoModal'
import review1 from '../assets/review-person1.jpg'
import review2 from '../assets/review-person2.jpg'
import review3 from '../assets/review-person3.jpg'
import review4 from '../assets/review-person4.jpg'


const HeroSection2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full">
      {/* Desktop View (Large screens) */}
      <div className='w-full min-h-screen hidden xl:flex flex-col items-center justify-start'>
        <div className='flex flex-col mx-auto items-center relative w-full min-w-[500px] max-w-[700px] px-4 pt-[20rem]'>
          <h1 className="text-center font-[Poppins] text-[3.5rem] leading-[0.9] mb-8">
            Creating long-term,
            <br />
            sustainable wealth
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-[-1rem] w-[170px] px-7 py-3 bg-black text-white rounded-full hover:bg-[#262626] transition-colors text-base font-medium inline-flex items-center"
          >
            Book Demo
            <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Desktop images and text */}
          <div className="absolute top-[11.3rem] lg:left-[5%] xl:left-[-18rem]">
            <div className="rounded-tr-[32px] rounded-bl-[32px] overflow-hidden">
              <img 
                src={meetingRoom} 
                alt="Meeting Room" 
                className="w-[21rem] h-[13rem] object-cover"
              />
            </div>
          </div>
          <div className="absolute top-[11.3rem] lg:right-[5%] xl:right-[-18rem]">
            <div className="rounded-br-[32px] rounded-tl-[32px] overflow-hidden">
              <img 
                src={meetingRoom2} 
                alt="Meeting Room" 
                className="w-[21rem] h-[13rem] object-cover"
              />
            </div>
          </div>

          <div className="absolute bottom-[-5.3rem] lg:left-[8%] xl:left-[-16.5rem] max-w-[27rem] flex flex-col items-center">
            <div className='relative'>
              <p className="text-gray-600 text-base mb-4 text-[0.9rem] leading-[1.1]">
              A global network of professionals delivering the best practices and leading technologies to revolutionize the Indian construction industry.
              </p>
              <div className="absolute bottom-[-3rem] left-[11rem] flex -space-x-3">
                {[review1,review2,review3,review4].map((index) => (
                  <div 
                    key={index}
                    className="w-14 h-14 rounded-full border-2 border-white overflow-hidden"
                  >
                    <img 
                      src={index} 
                      alt={`Team Member ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-[-4rem] lg:right-[8%] xl:right-[-16.5rem] max-w-[20rem] flex flex-col items-center">
            <p className="text-gray-600 text-base mb-4 text-[0.8rem] leading-[1.1]">
            Our experienced team brings decades of expertise across developed and emerging markets, ensuring innovative and sustainable solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Tablet View */}
      <div className='w-full hidden md:block xl:hidden'>
        <div className='container mx-auto px-8 lg:px-16 pt-[6rem] pb-[2.5rem]'>
          {/* Center Content */}
          <div className='text-center mb-16'>
            <h1 className="text-center font-[Poppins] text-[2rem] leading-[1.1] mb-6">
              Creating long-term,
              <br />
              sustainable wealth
            </h1>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-block w-[170px] px-7 py-3 bg-black text-white rounded-full hover:bg-[#262626] transition-colors text-base font-medium items-center"
            >
              Book Demo
              <svg className="ml-2 w-5 h-5 inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Images and Text Grid */}
          <div className='grid grid-cols-2 gap-12'>
            {/* Left Image and Text */}
            <div className='flex flex-col items-center'>
              <div className='rounded-tr-[32px] rounded-bl-[32px] overflow-hidden mb-6'>
                <img src={meetingRoom} alt="Meeting Room" className='w-full h-[200px] object-cover'/>
              </div>
              <div className='max-w-[280px]'>
                <p className='text-gray-600 text-sm leading-relaxed text-center'>
                A global network of professionals delivering the best practices and leading technologies to revolutionize the Indian construction industry.
                </p>
              </div>
            </div>

            {/* Right Image and Text */}
            <div className='flex flex-col items-center'>
              <div className='rounded-br-[32px] rounded-tl-[32px] overflow-hidden mb-6'>
                <img src={meetingRoom2} alt="Meeting Room" className='w-full h-[200px] object-cover'/>
              </div>
              <div className='max-w-[280px]'>
                <p className='text-gray-600 text-sm leading-relaxed text-center'>
                  Our experienced team brings decades of expertise across developed and emerging markets, ensuring innovative and sustainable solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className='w-full min-h-screen md:hidden'>
        <div className='container mx-auto pt-[7rem] pb-[3rem] px-4 md:px-8'>
          <h1 className="text-center font-[Poppins] text-[2.1rem] md:text-[2.8rem] leading-[1.1] mb-8">
            Creating long-term,
            <br />
            sustainable wealth
          </h1>
          <div className='flex justify-center mb-12'>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-[170px] px-7 py-3 bg-black text-white rounded-full hover:bg-[#262626] transition-colors text-base font-medium inline-flex items-center"
            >
              Book Demo
              <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Cards Container */}
          <div className='flex flex-col md:flex-row gap-8 md:gap-6 max-w-5xl mx-auto'>
            {/* First Card */}
            <div className='flex-1 flex flex-col sm:flex-row md:flex-col items-center gap-6'>
              <div className='w-full md:w-full sm:order-2 md:order-none'>
                <div className='rounded-tr-[32px] rounded-bl-[32px] overflow-hidden'>
                  <img src={meetingRoom} alt="Meeting Room" className='w-full h-40 md:h-48 object-cover'/>
                </div>
              </div>
              <div className='w-full md:w-full sm:order-1 md:order-none'>
                <p className='text-gray-600 text-sm md:text-base leading-relaxed text-center md:text-center'>
                A global network of professionals delivering the best practices and leading technologies to revolutionize the Indian construction industry.
                </p>
              </div>
            </div>

            {/* Second Card */}
            <div className='flex-1 flex flex-col sm:flex-row md:flex-col items-center gap-6'>
              <div className='w-full md:w-full'>
                <div className='rounded-br-[32px] rounded-tl-[32px] overflow-hidden'>
                  <img src={meetingRoom2} alt="Meeting Room" className='w-full h-40 md:h-48 object-cover'/>
                </div>
              </div>
              <div className='w-full md:w-full'>
                <p className='text-gray-600 text-sm md:text-base leading-relaxed text-center md:text-center'>
                  Our experienced team brings decades of expertise across developed and emerging markets, ensuring innovative and sustainable solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookDemoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

export default HeroSection2