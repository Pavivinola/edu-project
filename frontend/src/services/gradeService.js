import api from './api';

export const gradeService = {
  // Obtener todas las calificaciones
  getAll: async () => {
    const response = await api.get('/grades/');
    return response.data;
  },

  // Obtener calificaciones por estudiante
  getByStudent: async (studentId) => {
    const response = await api.get(`/grades/?student=${studentId}`);
    return response.data;
  },

  // Obtener calificaciones por tarea
  getByAssignment: async (assignmentId) => {
    const response = await api.get(`/grades/?assignment=${assignmentId}`);
    return response.data;
  },

  // Crear calificación
  create: async (gradeData) => {
    const response = await api.post('/grades/', gradeData);
    return response.data;
  },

  // Actualizar calificación
  update: async (id, gradeData) => {
    const response = await api.put(`/grades/${id}/`, gradeData);
    return response.data;
  },

  // Eliminar calificación
  delete: async (id) => {
    const response = await api.delete(`/grades/${id}/`);
    return response.data;
  },
};

export const assignmentService = {
  // Obtener todas las tareas
  getAll: async () => {
    const response = await api.get('/assignments/');
    return response.data;
  },

  // Obtener tareas por curso
  getByCourse: async (courseId) => {
    const response = await api.get(`/assignments/?course=${courseId}`);
    return response.data;
  },

  // Obtener una tarea
  getById: async (id) => {
    const response = await api.get(`/assignments/${id}/`);
    return response.data;
  },

  // Crear tarea
  create: async (assignmentData) => {
    const response = await api.post('/assignments/', assignmentData);
    return response.data;
  },

  // Actualizar tarea
  update: async (id, assignmentData) => {
    const response = await api.put(`/assignments/${id}/`, assignmentData);
    return response.data;
  },

  // Eliminar tarea
  delete: async (id) => {
    const response = await api.delete(`/assignments/${id}/`);
    return response.data;
  },
};
