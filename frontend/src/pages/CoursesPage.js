import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '../services/courseService';

function CoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAll();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los cursos: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando cursos...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Cursos</h1>
      
      {courses.length === 0 ? (
        <p>No hay cursos disponibles. Crea algunos desde el admin de Django.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {courses.map((course) => (
            <div
              key={course.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{course.code} - {course.name}</h3>
              <p><strong>Profesor:</strong> {course.teacher_name}</p>
              <p><strong>Estudiantes:</strong> {course.student_count}</p>
              <p><strong>Estado:</strong> {course.is_active ? '✅ Activo' : '❌ Inactivo'}</p>
              
              <button
                onClick={() => navigate(`/courses/${course.id}`)}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Ver detalles →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CoursesPage;