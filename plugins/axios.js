import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://localhost:3000', // La URL de tu API de NestJS
  });

  // Puedes añadir interceptores o personalizar la instancia
  api.interceptors.request.use(config => {
    // Añadir lógica antes de que se envíe la solicitud
    return config;
  });

  api.interceptors.response.use(response => {
    // Manejar respuestas exitosas
    return response;
  }, error => {
    // Manejar errores de respuesta
    return Promise.reject(error);
  });

  // Añadir Axios a `nuxtApp`
  nuxtApp.provide('axios', api);
});