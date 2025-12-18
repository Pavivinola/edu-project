import React, { useState, useEffect } from 'react';
import { materialService } from '../services/materialService';
import { courseService } from '../services/courseService';

function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const materialTypes = [
    { value: '', label: 'Todos los tipos' },
    { value: 'pdf', label: 'PDF' },
    { value: 'video', label: 'Video' },
    { value: 'link', label: 'Enlace' },
    { value: 'document', label: 'Documento' },
    { value: 'presentation', label: 'Presentacion' },
    { value: 'other', label: 'Otro' },
  ];

  useEffect(() => {
    loadCourses();
    loadMaterials();
  }, []);

  useEffect(() => {
    filterMaterials();
  }, [selectedCourse, selectedType]);

  const loadCourses = async () => {
    try {
      const data = await courseService.getAll();
      setCourses(data);
    } catch (err) {
      console.error('Error al cargar cursos:', err);
    }
  };

  const loadMaterials = async () => {
    try {
      setLoading(true);
      const data = await materialService.getAll();
      setMaterials(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar materiales: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterMaterials = async () => {
    try {
      setLoading(true);
      let data;
      
      if (selectedCourse && selectedType) {
        const allMaterials = await materialService.getByCourse(selectedCourse);
        data = allMaterials.filter(m => m.material_type === selectedType);
      } else if (selectedCourse) {
        data = await materialService.getByCourse(selectedCourse);
      } else if (selectedType) {
        data = await materialService.getByType(selectedType);
      } else {
        data = await materialService.getAll();
      }
      
      setMaterials(data);
      setError(null);
    } catch (err) {
      setError('Error al filtrar materiales: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando materiales...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Materiales de Clase</h1>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Filtrar por curso:</label>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' }}>
            <option value="">Todos los cursos</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.code} - {course.name}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Filtrar por tipo:</label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' }}>
            {materialTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {materials.length === 0 ? (
        <p>No hay materiales disponibles.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {materials.map((material) => (
            <div key={material.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
              <h3>{material.title}</h3>
              <p>{material.description}</p>
              {material.file_url && <a href={material.file_url} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '4px', marginRight: '10px' }}>Descargar</a>}
              {material.url && <a href={material.url} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', backgroundColor: '#2196F3', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Abrir enlace</a>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MaterialsPage;