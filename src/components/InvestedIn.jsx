import React from 'react';
import { Link } from 'react-router-dom';
import constructionSite from '../assets/Project1- Reliance Trends.jpg';
import interiorSite from '../assets/project2-salon design.jpg';
import telecomSite from '../assets/project3-good earth brewery.jpg';

const InvestedIn = () => {
  const sites = [
    {
      image: constructionSite,
      title: "Reliance Trends - Construction Site",
      location: "Patna, Bihar",
      description: "Modern commercial complex with retail and office , visibility , wide column free space with roof top restaurant concept in Tier 2 cities."
    },
    {
      image: interiorSite,
      title: "Vijay Salon",
      location: "Paschim Vihar, Delhi",
      description: "ISBE Consulting successfully transformed a premium salon project, delivering a modern, elegant design with optimized functionality.The project highlights our expertise in creating tailored infrastructure solutions that elevate client experiences."
    },
    {
      image: telecomSite,
      title: "Good Earth Brewery",
      location: "Gurgaon, Haryana",
      description: "ISBE Consulting empowers infrastructure and construction excellence through expert delivery, operational efficiency, and financial management, ensuring successful outcomes."
    }
  ];

  return (
    <section id="projects" className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Poppins'] font-bold mb-8 sm:mb-10 md:mb-12 lg:mb-16
                       text-center md:text-center lg:text-left">
          Invested In
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {sites.map((site, index) => (
            <div 
              key={index} 
              className={`
                group w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]
                max-w-[500px] ${index === 2 ? 'md:mx-auto lg:mx-0' : ''}
              `}
            >
              {/* Image Container */}
              <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                <img 
                  src={site.image} 
                  alt={site.title}
                  className="w-full h-full object-cover transition-all duration-700 
                           scale-[1.01] group-hover:scale-110 group-hover:blur-[2px]"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 
                              group-hover:opacity-60" />
                
                {/* Explore Now Button */}
                <Link 
                  to="/contact"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                           bg-white/90 text-black px-5 sm:px-6 md:px-7 lg:px-8 
                           py-2 sm:py-2.5 md:py-3 rounded-full
                           text-sm sm:text-base md:text-lg font-medium 
                           transition-all duration-500
                           opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100
                           hover:bg-white"
                >
                  Explore Now
                </Link>
              </div>

              {/* Text Content */}
              <div className="mt-4 sm:mt-5 md:mt-6 space-y-1 sm:space-y-2 text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-['Poppins'] font-semibold leading-tight">
                  {site.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-['Poppins'] font-medium text-gray-600">
                  {site.location}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3 md:mt-4 leading-relaxed font-['Poppins'] 
                          max-w-xs mx-auto">
                  {site.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestedIn;