import api from './api';

export const materialService = {
  // Obtener todos los materiales
  getAll: async () => {
    const response = await api.get('/materials/');
    return response.data;
  },

  // Obtener materiales por curso
  getByCourse: async (courseId) => {
    const response = await api.get(`/materials/?course=${courseId}`);
    return response.data;
  },

  // Obtener materiales por tipo
  getByType: async (materialType) => {
    const response = await api.get(`/materials/?type=${materialType}`);
    return response.data;
  },

  // Obtener un material
  getById: async (id) => {
    const response = await api.get(`/materials/${id}/`);
    return response.data;
  },

  // Crear material
  create: async (materialData) => {
    // Si hay archivo, usar FormData
    if (materialData.file) {
      const formData = new FormData();
      Object.keys(materialData).forEach(key => {
        if (materialData[key] !== null && materialData[key] !== undefined) {
          formData.append(key, materialData[key]);
        }
      });
      const response = await api.post('/materials/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    }
    const response = await api.post('/materials/', materialData);
    return response.data;
  },

  // Actualizar material
  update: async (id, materialData) => {
    if (materialData.file) {
      const formData = new FormData();
      Object.keys(materialData).forEach(key => {
        if (materialData[key] !== null && materialData[key] !== undefined) {
          formData.append(key, materialData[key]);
        }
      });
      const response = await api.put(`/materials/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    }
    const response = await api.put(`/materials/${id}/`, materialData);
    return response.data;
  },

  // Eliminar material
  delete: async (id) => {
    const response = await api.delete(`/materials/${id}/`);
    return response.data;
  },
};