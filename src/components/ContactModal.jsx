import React, { useState, useEffect } from 'react';
import { contactService } from '../services/api';
import { toast } from 'react-toastify';

const ContactModal = ({ isOpen, onClose }) => {
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
    }
  }, [isOpen]);

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
      onClose();
      setFormData(initialFormData);
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-black rounded-2xl p-8 max-w-md w-full mx-4 text-white border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-['Prosto_One'] text-white">Contact Us</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white/90 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">Your Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">Your Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                placeholder="10-digit number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">Your Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows="4"
                required
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50 resize-none"
                placeholder="Tell us about your requirements..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black py-2 rounded-full hover:bg-white/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
