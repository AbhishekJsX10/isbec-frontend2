import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { demoService } from '../services/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './BookDemoModal.css'; 

const BookDemoModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: getTomorrowDate(),
        timeSlot: '',
        message: ''
    });
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get tomorrow's date
    function getTomorrowDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    }

    // Fetch available slots for a given date
    const fetchAvailableSlots = async (date) => {
        try {
            setLoading(true);
            console.log('Fetching slots for date:', date);
            const response = await demoService.getTimeSlots(date);
            console.log('Received slots:', response);
            setAvailableSlots(response.slots || []);
        } catch (error) {
            console.error('Error fetching slots:', error);
            toast.error('Failed to load available time slots', {
                icon: false,
                style: {
                    background: 'black',
                    color: 'white',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }
            });
            setAvailableSlots([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch slots when component mounts or date changes
    useEffect(() => {
        if (isOpen) {
            fetchAvailableSlots(formData.date);
        }
    }, [isOpen, formData.date]);

    // Add useEffect to handle body scroll
    useEffect(() => {
        if (isOpen) {
            // Disable body scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable body scroll when modal is closed
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to ensure scroll is re-enabled when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.timeSlot) {
            toast.error('Please fill in all required fields', {
                icon: false,
                style: {
                    background: 'black',
                    color: 'white',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }
            });
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
            return;
        }

        try {
            setLoading(true);
            const response = await demoService.bookDemo(formData);
            toast.success('Demo booked successfully!', {
                icon: false,
                style: {
                    background: 'black',
                    color: 'white',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }
            });
            onClose(); // Close modal after successful submission
        } catch (error) {
            console.error('Error booking demo:', error);
            toast.error('Failed to book demo. Please try again.', {
                icon: false,
                style: {
                    background: 'black',
                    color: 'white',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (date) => {
        console.log('Date changed to:', date);
        setFormData(prev => ({
            ...prev,
            date,
            timeSlot: '' // Reset time slot when date changes
        }));
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex items-start justify-center z-[9999] overflow-y-auto backdrop-blur-md"
            style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: '120vh'
            }}
            onClick={onClose}
        >
            <div className="fixed inset-0 bg-black/30" style={{ height: '120vh' }} />
            
            <div 
                className="w-full max-w-md relative z-10 px-4 top-[10px] md:top-[100px]"
                onClick={e => e.stopPropagation()}
                style={{ 
                    position: 'fixed',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    maxWidth: '28rem'
                }}
            >
                <div className="bg-[#111] rounded-xl overflow-hidden shadow-2xl ">
                    <div className="px-5 py-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-lg font-medium">Book Demo</h2>
                            <button
                                onClick={onClose}
                                className="text-white/70 hover:text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-1.5">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        required
                                        className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent text-white placeholder-white/40"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-1.5">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        required
                                        className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent text-white placeholder-white/40"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-1.5">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        required
                                        className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent text-white placeholder-white/40"
                                        placeholder="10-digit number"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-1.5">Preferred Date *</label>
                                    <DatePicker
                                        selected={formData.date}
                                        onChange={handleDateChange}
                                        minDate={new Date()}
                                        dateFormat="MMMM d, yyyy"
                                        className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent text-white placeholder-white/40"
                                        placeholderText="Select preferred date"
                                        required
                                        wrapperClassName="w-full"
                                        calendarClassName="dark-calendar"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-1.5">Preferred Time Slot *</label>
                                <select
                                    name="timeSlot"
                                    value={formData.timeSlot}
                                    onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent text-white placeholder-white/40"
                                >
                                    <option value="" className="bg-[#1a1a1a] text-white">Select a time slot</option>
                                    {availableSlots.map((slot, index) => (
                                        <option key={index} value={slot} className="bg-[#1a1a1a] text-white">
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                                {loading && (
                                    <p className="mt-1.5 text-sm text-white/50">Loading time slots...</p>
                                )}
                                {!loading && availableSlots.length === 0 && (
                                    <p className="mt-1.5 text-sm text-white/50">No time slots available for selected date</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-1.5">Message (Optional)</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    rows="4"
                                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent text-white placeholder-white/40 resize-none"
                                    placeholder="Tell us about your requirements..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black py-2.5 rounded-lg hover:bg-white/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            >
                                {loading ? 'Booking...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDemoModal;
