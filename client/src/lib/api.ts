import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    // Check predefined credentials first
    if (email === import.meta.env.VITE_ADMIN_EMAIL && password === import.meta.env.VITE_ADMIN_PASSWORD) {
      const user = { name: 'Admin', role: 'admin', email: email };
      localStorage.setItem('user', JSON.stringify(user));
      return { user };
    }
    if (email === import.meta.env.VITE_PARKING_OWNER_EMAIL && password === import.meta.env.VITE_PARKING_OWNER_PASSWORD) {
      const user = { name: 'Parking Owner', role: 'parking_owner', email: email };
      localStorage.setItem('user', JSON.stringify(user));
      return { user };
    }
    if (email === import.meta.env.VITE_DEMO_USER_EMAIL && password === import.meta.env.VITE_DEMO_USER_PASSWORD) {
      const user = { name: 'Demo User', role: 'user', email: email };
      localStorage.setItem('user', JSON.stringify(user));
      return { user };
    }

    // Fallback to API authentication
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },
};

export default api;