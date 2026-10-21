import axios from 'axios';

// 👇 ACÁ ESTÁ EL CAMBIO: Quitamos la URL de Railway y ponemos '/api'
const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getConfiguracion = (slug) =>
  api.get(`/${slug}/configuracion`).then(r => r.data);

export const getServicios = (slug) =>
  api.get(`/${slug}/servicios`).then(r => r.data);

export const getDiasDisponibles = (slug, desde, dias = 14) =>
  api.get(`/${slug}/dias-disponibles`, { params: { desde, dias } }).then(r => r.data);

export const getDisponibilidad = (slug, fecha, servicioId) =>
  api.get(`/${slug}/disponibilidad`, { params: { fecha, servicio_id: servicioId } }).then(r => r.data);

export const crearClienta = (slug, data) =>
  api.post(`/${slug}/clientas`, data).then(r => r.data);

export const crearTurno = (slug, data) =>
  api.post(`/${slug}/turnos`, data).then(r => r.data);

export default api;