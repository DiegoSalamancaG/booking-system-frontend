import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// request interceptor para agregar el token a cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = 
    error.response?.data?.message || "Unexpected error"

    return Promise.reject(message);
  }
)

export default api;