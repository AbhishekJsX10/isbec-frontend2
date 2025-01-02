import React from 'react';

const WhatWeDo = () => {
  const services = [
    {
      icon: "cube",
      title: "Project Management",
      description: "ISBE Consulting ensures seamless project execution with a focus on quality, timelines, and efficiency. Our expertise delivers measurable results in every project."
    },
    {
      icon: "cube",
      title: "Sustainable Consulting",
      description: "ISBE Consulting integrates sustainability into every project. We provide green solutions to reduce environmental impact and promote responsible development."
    },
    {
      icon: "cube",
      title: "Global Networking",
      description: "ISBE Consulting connects clients to a global network of professionals and resources. We foster collaboration to deliver cutting-edge, scalable solutions."
    }
  ];

  const CubeIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="w-12 md:w-10 lg:w-12" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <section id="what-we-do" className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Poppins'] font-bold text-center mb-8 md:mb-12 lg:mb-16">
          What We Do
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 place-items-center">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`
                  bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 
                  w-full max-w-sm md:max-w-md lg:max-w-md
                  flex flex-col items-center text-center
                  transform hover:scale-105 transition-transform duration-300
                  ${index === 0 ? 'shadow-[rgba(0,0,0,1)_-25px_25px_35px_0px]' : 
                    index === 1 ? 'shadow-[rgba(0,0,0,1)_0px_25px_35px_0px]' :
                    'shadow-[rgba(0,0,0,1)_25px_25px_35px_0px]'}
                  ${index === 2 && 'md:col-span-2 lg:col-span-1 md:max-w-lg lg:max-w-md'}
                `}
              >
                <div className="mb-4 md:mb-5 lg:mb-6">
                  <CubeIcon />
                </div>
                <h3 className="text-2xl md:text-2xl lg:text-3xl font-['Poppins'] mb-2 md:mb-3 lg:mb-4">
                  {service.title}
                </h3>
                <p className="text-xs md:text-sm lg:text-sm text-gray-600 leading-relaxed max-w-xs md:max-w-sm lg:max-w-md">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
