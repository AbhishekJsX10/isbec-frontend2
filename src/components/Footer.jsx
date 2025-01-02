import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import BookDemoModal from './BookDemoModal';
import ContactModal from './ContactModal';
import { contactService } from '../services/api';
import { toast } from 'react-toastify';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill in all fields', {
        icon: false,
        style: {
          background: 'black',
          color: 'white',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      });
      setIsSubmitting(false);
      return;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number', {
        icon: false,
        style: {
          background: 'black',
          color: 'white',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      });
      setIsSubmitting(false);
      return;
    }

    // Validate email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address', {
        icon: false,
        style: {
          background: 'black',
          color: 'white',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await contactService.submitContact(formData);
      toast.success('Message sent successfully!', {
        icon: false,
        style: {
          background: 'black',
          color: 'white',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.', {
        icon: false,
        style: {
          background: 'black',
          color: 'white',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#1E1E1E] text-white py-12">
      {/* Desktop and Tablet Layout */}
      <div className="container mx-auto px-8 lg:px-24 hidden md:flex justify-between">
        {/* Left Section - 40% */}
        <div className="lg:w-[40%] space-y-12">
          <div className="text-center">
            <h3 className="text-2xl mb-2">Call Us:</h3>
            <p className="text-3xl">+91-9818023948</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl text-center font-['Prosto_One'] font-bold tracking-wide">Contact us</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name *" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 pb-2 outline-none text-white/90" 
                />
                <input 
                  type="email" 
                  placeholder="Your Email *" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 pb-2 outline-none text-white/90" 
                />
                <input 
                  type="tel" 
                  placeholder="Your Phone Number *" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 pb-2 outline-none text-white/90" 
                />
                <textarea 
                  placeholder="Your Message *" 
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 pb-2 outline-none resize-none text-white/90"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex justify-between items-start gap-8">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="border border-white px-6 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Now'}
                </button>
                <p className="text-gray-400 text-sm max-w-[280px]">If you have any questions regarding your rights or subsequently decide to withdraw your consent, please send your request to us.</p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section - 60% */}
        <div className="lg:w-[60%] flex flex-col">
          {/* Top Content */}
          <div className="space-y-6 md:text-right">
            <h2 className="text-5xl lg:text-7xl font-['Prosto_One'] tracking-wider">ISBE Consultancy</h2>
            <p className="text-gray-400 text-sm max-w-xl ml-auto">
              If you have any questions regarding your rights or subsequently decide to withdraw your consent, please send your request to us.
            </p>
            <div className="flex gap-4 justify-end">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="border border-white text-white px-8 py-2 rounded-full hover:bg-white hover:text-black transition-colors md:hidden"
              >
                Contact Us
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black px-8 py-2 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                Book Now <span className="text-lg">→</span>
              </button>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mt-12">
            <div className="space-y-4 text-center min-w-[200px]">
              <a href="#about" className="block text-[1rem] hover:text-gray-300">About Us</a>
              <a href="#projects" className="block text-[1rem] hover:text-gray-300">Projects</a>
              <a href="#what-we-do" className="block text-[1rem] hover:text-gray-300">What We Do</a>
              <Link to="/services" className="block text-[1rem] hover:text-gray-300">Services</Link>
            </div>

            <div className="space-y-8 text-center">
              <div>
                <h3 className="text-3xl mb-3 font-['Prosto_One'] font-bold tracking-wide">Location</h3>
                <p className="text-gray-400 text-xl">D-131, Block D, Sector 108, Noida, Uttar Pradesh 201304</p>
              </div>

              <div>
                <h3 className="text-3xl mb-4 font-['Prosto_One'] font-bold tracking-wide">Social Links</h3>
                <div className="flex gap-8 justify-center">
                  <Link href="#" className="hover:text-gray-300 text-2xl"><FaInstagram /></Link>
                  <a href="mailto:isbecabhishek@gmail.com" className="hover:text-gray-300 text-2xl"><IoMailOutline /></a>
                  <a href="https://www.linkedin.com/company/isbe-group/" className="hover:text-gray-300 text-2xl"><FaLinkedinIn /></a>
                  <Link href="#" className="hover:text-gray-300 text-2xl"><FaTwitter /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-6">
        {/* Top Section Grid */}
        <div className="grid grid-cols-2 gap-x-4 mb-12">
          {/* Left Top - Call Us */}
          <div className="text-left">
            <h3 className="text-lg  mb-2 font-['Prosto_One'] font-bold tracking-wide">Call Us:</h3>
            <p className="text-lg">+8989898989</p>
          </div>

          {/* Right Top - ISBE Consultancy */}
          <div className="text-right">
            <h2 className="text-xl font-['Prosto_One'] tracking-wider mb-4 ">ISBE Consultancy</h2>
            <p className="text-gray-400 text-[10px] leading-relaxed">
              If you have any questions regarding your rights or subsequently decide to withdraw your consent, please send your request to us.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-x-4">
          {/* Left Column - Navigation */}
          <div>
            <div className="space-y-6 text-left">
              <a href="#about" className="block text-base font-light">About Us</a>
              <a href="#projects" className="block text-base font-light">Projects</a>
              <a href="#what-we-do" className="block text-base font-light">What We Do</a>
              <Link to="/services" className="block text-base font-light">Services</Link>
            </div>
          </div>

          {/* Right Column - Buttons */}
          <div className="text-right">
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full border border-white text-white px-4 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors text-xs"
              >
                Contact Us
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-xs"
              >
                Book Now <span className="text-sm">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="text-center mt-16 mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <h3 className="text-2xl font-['Prosto_One'] font-bold tracking-wide">Location</h3>
            <span className="text-2xl text-white"><FaMapMarkerAlt /></span>
          </div>
          <p className="text-gray-400 text-sm max-w-[300px] mx-auto">D-131, Block D, Sector 108, Noida, Uttar Pradesh 201304</p>
        </div>

        {/* Social Links */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-['Prosto_One'] font-bold tracking-wide mb-4">Social Links</h3>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-lg hover:text-gray-300"><FaInstagram /></a>
            <a href="#" className="text-lg hover:text-gray-300"><IoMailOutline /></a>
            <a href="#" className="text-lg hover:text-gray-300"><FaLinkedinIn /></a>
            <a href="#" className="text-lg hover:text-gray-300"><FaTwitter /></a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center text-sm md:text-base gap-2">
            <span>Copyright @2024 | ISBEC Consultancy</span>
            <div className="flex gap-4">
              <Link to="/terms" className="hover:text-gray-300">Terms & Conditions</Link>
              <Link to="/privacy" className="hover:text-gray-300">Privacy Terms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section for Desktop */}
      <div className="container mx-auto px-8 lg:px-24 mt-16 pt-4 border-t border-white/10 hidden md:block">
        <div className="flex justify-between items-center text-sm md:text-base gap-2">
          <span>Copyright @2024 | ISBEC Consultancy</span>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-gray-300">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-gray-300">Privacy Terms</Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </footer>
  );
};

export default Footer;