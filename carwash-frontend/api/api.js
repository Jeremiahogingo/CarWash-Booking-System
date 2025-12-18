import axios from 'axios';

/**
 * IMPORTANT:
 * - Android emulator: http://10.0.2.2:8080
 * - Physical phone:   http://YOUR_PC_IP:8080
 * - Web:              http://localhost:8080
 */
const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/* =======================
   SERVICES API
======================= */

export const fetchServices = async () => {
    const response = await api.get('/api/services');
    return response.data;
};

export const fetchServiceById = async (id) => {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
};

export const createService = async (serviceData) => {
    const response = await api.post('/api/services', serviceData);
    return response.data;
};

export const updateService = async (id, serviceData) => {
    const response = await api.put(`/api/services/${id}`, serviceData);
    return response.data;
};

export const deleteService = async (id) => {
    await api.delete(`/api/services/${id}`);
};


/* =======================
   BOOKINGS API
======================= */

/**
 * bookingData example:
 * {
 *   service: { id: 1 },
 *   vehicle: {
 *     plateNumber: "KBD123",
 *     type: "SUV"
 *   },
 *   bookingTime: "2025-01-20T10:00:00"
 * }
 */
export const createBooking = async (bookingData) => {
    const response = await api.post('/api/booking/create', bookingData);
    return response.data;
};

export const fetchBooking = async (bookingId) => {
    const response = await api.get(`/api/booking/${bookingId}`);
    return response.data;
};

export const submitRating = async (bookingId, rating) => {
    const response = await api.post(
        `/api/booking/${bookingId}/rate`,
        null,
        { params: { rating } }
    );
    return response.data;
};

export const confirmBooking = async (bookingId) => {
    const response = await api.post(`/api/booking/${bookingId}/confirm`);
    return response.data;
};
