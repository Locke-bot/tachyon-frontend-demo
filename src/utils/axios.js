/**
 * axios setup to use mock service
 */

import axios from 'axios';

// const API = (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) ? 'http://127.0.0.1:8000/' : 'https://tachyon-883917794458.us-central1.run.app/'
const API = 'https://tachyon-883917794458.us-central1.run.app/'

export const localAxiosServices = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL || 'http://127.0.0.1:8000/' });
const axiosServices = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL || API });
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

localAxiosServices.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

localAxiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 && !window.location.href.includes('/login')) {
            // window.location.pathname = '/login';
        }
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

axiosServices.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 && !window.location.href.includes('/login')) {
            // window.location.pathname = '/login';
        }
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

export default axiosServices;