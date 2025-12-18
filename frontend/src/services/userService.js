import api from './api';

export const userService = {
  getAll: async () => {
    const response = await api.get('/users/');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}/`);
    return response.data;
  },

  getTeachers: async () => {
    const response = await api.get('/users/teachers/');
    return response.data;
  },

  getStudents: async () => {
    const response = await api.get('/users/students/');
    return response.data;
  },

  create: async (userData) => {
    const response = await api.post('/users/', userData);
    return response.data;
  },

  update: async (id, userData) => {
    const response = await api.put(`/users/${id}/`, userData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}/`);
    return response.data;
  },
};