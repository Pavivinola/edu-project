import api from './api';

export const courseService = {
  // CRUD Obtener todos los cursos
  getAll: async () => {
    const response = await api.get('/courses/');
    return response.data;
  },

  // Obtener un curso por ID
  getById: async (id) => {
    const response = await api.get(`/courses/${id}/`);
    return response.data;
  },

  // Crear un curso
  create: async (courseData) => {
    const response = await api.post('/courses/', courseData);
    return response.data;
  },

  // Actualizar un curso
  update: async (id, courseData) => {
    const response = await api.put(`/courses/${id}/`, courseData);
    return response.data;
  },

  // Eliminar un curso
  delete: async (id) => {
    const response = await api.delete(`/courses/${id}/`);
    return response.data;
  },

  // Inscribir estudiante
  enrollStudent: async (courseId, studentId) => {
    const response = await api.post(`/courses/${courseId}/enroll_student/`, {
      student_id: studentId,
    });
    return response.data;
  },
};