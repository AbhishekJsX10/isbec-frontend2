import React from 'react';

const Services = () => {
  const services = [
    {
      icon: "cube",
      title: "Infrastructure",
      description: "ISBE Consulting delivers innovative solutions for infrastructure projects. With global expertise, we enhance project efficiency, sustainability, and ensure impactful results."
    },
    {
      icon: "cube",
      title: "IT",
      description: "ISBE Consulting integrates cutting-edge IT solutions to drive operational excellence. We specialize in tailored strategies for seamless project execution and outcomes."
    },
    {
      icon: "cube",
      title: "Telecom",
      description: "ISBE Consulting advances telecom development with innovative methodologies. Our team ensures efficient project management, operational growth, and technological progress."
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
    <div className="w-full py-10 sm:py-8 bg-white">
      <div className="container mx-auto px-4 xl:pt-[5rem]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Poppins'] font-bold text-center mb-8 md:mb-12 lg:mb-16">
          Our Services
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
    </div>
  );
};

export default Services;