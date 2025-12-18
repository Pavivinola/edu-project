import api from './api';

export const announcementService = {
  // Obtener todos los avisos
  getAll: async () => {
    const response = await api.get('/announcements/');
    return response.data;
  },

  // Obtener avisos por curso
  getByCourse: async (courseId) => {
    const response = await api.get(`/announcements/?course=${courseId}`);
    return response.data;
  },

  // Obtener un aviso
  getById: async (id) => {
    const response = await api.get(`/announcements/${id}/`);
    return response.data;
  },

  // Crear aviso
  create: async (announcementData) => {
    const response = await api.post('/announcements/', announcementData);
    return response.data;
  },

  // Actualizar aviso
  update: async (id, announcementData) => {
    const response = await api.put(`/announcements/${id}/`, announcementData);
    return response.data;
  },

  // Eliminar aviso
  delete: async (id) => {
    const response = await api.delete(`/announcements/${id}/`);
    return response.data;
  },
};