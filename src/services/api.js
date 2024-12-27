import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://api.isbec.com/api'
    : 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const contactService = {
    submitContact: async (formData) => {
        try {
            const response = await api.post('/contact', formData);
            return response.data;
        } catch (error) {
            console.error('Contact submission error:', error);
            throw new Error('Failed to submit contact form. Please try again.');
        }
    }
};

export const demoService = {
    // Get available time slots for a date
    getTimeSlots: async (date) => {
        try {
            console.log('Calling getTimeSlots with date:', date);
            const formattedDate = date.toISOString().split('T')[0];
            console.log('Formatted date:', formattedDate);
            const response = await api.get(`/demo/slots?date=${formattedDate}`);
            console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error getting time slots:', error);
            throw new Error('Unable to load time slots. Please try again.');
        }
    },

    // Check if a specific time slot is available
    checkSlotAvailability: async (date, timeSlot) => {
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const response = await api.get(`/demo/check-slot?date=${formattedDate}&timeSlot=${timeSlot}`);
            return response.data.available;
        } catch (error) {
            console.error('Error checking slot availability:', error);
            throw new Error('Failed to check slot availability');
        }
    },

    // Book a demo
    bookDemo: async (formData) => {
        try {
            // First check if the slot is still available
            const isAvailable = await demoService.checkSlotAvailability(
                formData.date,
                formData.timeSlot
            );

            if (!isAvailable) {
                throw new Error('This time slot is no longer available. Please select another time.');
            }

            const response = await api.post('/demo/book', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                date: formData.date.toISOString().split('T')[0],
                timeSlot: formData.timeSlot,
                message: formData.message || ''
            });
            
            if (response.data.slotTaken) {
                throw new Error('This time slot was just booked by someone else. Please select another time.');
            }

            return response.data;
        } catch (error) {
            console.error('Booking error:', error);
            if (error.response?.data?.slotTaken || error.message.includes('no longer available')) {
                throw new Error('This time slot is no longer available. Please select another time.');
            }
            throw new Error(error.response?.data?.message || error.message || 'Failed to book demo. Please try again.');
        }
    }
};
