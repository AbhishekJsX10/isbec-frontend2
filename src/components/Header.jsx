import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { LuPhoneCall } from "react-icons/lu";
import BookDemoModal from './BookDemoModal';

const Header = ({ onPhoneClick }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const controlHeader = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShow(false);
      setIsDrawerOpen(false);
    } else {
      setShow(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'SERVICES', path: '/services' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full bg-white shadow-sm transition-transform duration-300 z-40 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between h-20 px-8 relative">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <img src="./src/assets/logo-isbe.jpg" className="w-10 h-10" alt="" />
          <span className="text-xl font-semibold tracking-wide">ISBEC</span>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (location.pathname === '/' && item.path === '/');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm tracking-wider relative ${
                  isActive 
                    ? 'font-bold text-black after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-black' 
                    : 'font-medium text-gray-700 hover:text-gray-900'
                } transition-colors`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={onPhoneClick}
            className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
          >
            Call Us
            <LuPhoneCall />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium flex items-center"
          >
            Book Demo
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2"
          onClick={toggleDrawer}
        >
          <FaBars className="h-6 w-6 text-gray-700" />
        </button>

        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <div className="md:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
              onClick={toggleDrawer}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            
            {/* Drawer */}
            <div 
              className="fixed top-0 left-0 right-0 h-[100vh] w-full bg-white shadow-xl z-[101]"
              style={{ 
                transform: isDrawerOpen ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 0.3s ease-in-out',
                position: 'fixed'
              }}
            >
              <div className="flex flex-col h-full bg-white">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="#000"/>
                    </svg>
                    <span className="text-lg font-semibold">ISBEC</span>
                  </div>
                  <button 
                    onClick={toggleDrawer} 
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FaTimes className="h-6 w-6 text-gray-700" />
                  </button>
                </div>

                <nav className="flex flex-col p-6 bg-white">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={toggleDrawer}
                      className={`py-4 text-lg text-center ${
                        location.pathname === item.path
                          ? 'font-bold text-black'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto p-6 space-y-4 border-t border-gray-200 bg-white">
                  <button 
                    onClick={() => {
                      onPhoneClick();
                      toggleDrawer();
                    }}
                    className="w-full px-5 py-3 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-base font-medium flex items-center justify-center gap-2"
                  >
                    Call Us
                    <LuPhoneCall />
                  </button>
                  <button 
                    onClick={() => {
                      setIsModalOpen(true);
                      toggleDrawer();
                    }}
                    className="w-full px-5 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-base font-medium flex items-center justify-center"
                  >
                    Book Demo
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;