import React, { useState, useEffect } from 'react';
import { announcementService } from '../services/announcementService';
import { courseService } from '../services/courseService';

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourses();
    loadAnnouncements();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadAnnouncementsByCourse(selectedCourse);
    } else {
      loadAnnouncements();
    }
  }, [selectedCourse]);

  const loadCourses = async () => {
    try {
      const data = await courseService.getAll();
      setCourses(data);
    } catch (err) {
      console.error('Error al cargar cursos:', err);
    }
  };

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await announcementService.getAll();
      setAnnouncements(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar avisos: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAnnouncementsByCourse = async (courseId) => {
    try {
      setLoading(true);
      const data = await announcementService.getByCourse(courseId);
      setAnnouncements(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar avisos: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando avisos...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Avisos y Anuncios</h1>
        
        <div>
          <label style={{ marginRight: '10px' }}>Filtrar por curso:</label>
          <select 
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">Todos los cursos</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {announcements.length === 0 ? (
        <p>No hay avisos disponibles. Crea algunos desde el admin de Django.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              style={{
                border: announcement.is_pinned ? '2px solid #FF9800' : '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: announcement.is_pinned ? '#FFF3E0' : '#f9f9f9',
                position: 'relative'
              }}
            >
              {announcement.is_pinned && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#FF9800',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  📌 FIJADO
                </div>
              )}

              <h3 style={{ margin: '0 0 10px 0', paddingRight: '100px' }}>{announcement.title}</h3>
              
              <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#666', marginBottom: '15px' }}>
                <span><strong>Curso:</strong> {announcement.course_detail?.code}</span>
                <span><strong>Autor:</strong> {announcement.author_detail?.first_name} {announcement.author_detail?.last_name}</span>
                <span><strong>Fecha:</strong> {new Date(announcement.created_at).toLocaleDateString()}</span>
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                padding: '15px', 
                borderRadius: '4px',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap'
              }}>
                {announcement.content}
              </div>

              {announcement.updated_at !== announcement.created_at && (
                <div style={{ fontSize: '12px', color: '#999', marginTop: '10px', fontStyle: 'italic' }}>
                  Última actualización: {new Date(announcement.updated_at).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnnouncementsPage;