import React from 'react'
import Marquee from 'react-fast-marquee'

const MarqueeSection = () => {
  const partners = [
    "NBCC",
    "VSV Communication",
    "Inner Space",
    "AYOLEZZA",
    "KMRL",
    "HSCC",
    "NBCC"
  ];

  // Repeat the array 4 times to ensure continuous flow
  const repeatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <div className="w-full pt-8 pb-3 bg-white border-t border-gray-200">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Poppins'] font-bold text-center mb-8">
          Trusted By
        </h2>
      </div>

      <Marquee direction="right" speed={40} gradient={false}>
        {repeatedPartners.map((partner, index) => (
          <div key={index} className="mx-16 py-4">
            <span className="text-5xl lg:text-5xl text-[#00000087] font-prosto whitespace-nowrap">
              {partner}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default MarqueeSection