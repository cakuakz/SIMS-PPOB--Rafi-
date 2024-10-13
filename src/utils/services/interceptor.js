import axios from "axios";
import { getAccessToken, isLoggedIn } from "../constants/storage";
import { persistor } from "../store";

export const isServer = () => {
    return typeof window === 'undefined';
}

const handleLogout = () => {
    persistor.purge();
}

// axios config for auth API request
export const apiAuth = axios.create({
    baseURL: "https://take-home-test-api.nutech-integrasi.com",
    headers: {
        'Content-Type': 'application/json',
    }
})

// axios config for non-auth API request
export const api = axios.create({
    baseURL: "https://take-home-test-api.nutech-integrasi.com",
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    if (isLoggedIn()) {
        const token = getAccessToken()
        config.headers.Authorization = token ? `Bearer ${token}` : ''
    }

    return config
})

api.interceptors.response.use(
    async (response) => response,
    async (error) => {
        if (error.response) {
            const config = error.config;
            if (config.url !== "/login" && error.response.status === 401) {
                window.location.href = '/login'
                handleLogout()
            }
        } else {
            console.error("Error without response:", error)
        }
        return Promise.reject(error)
    }
)