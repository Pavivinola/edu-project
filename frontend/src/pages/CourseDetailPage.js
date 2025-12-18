import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { assignmentService } from '../services/gradeService';
import { announcementService } from '../services/announcementService';
import { materialService } from '../services/materialService';

function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourseData();
  }, [id]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      const courseData = await courseService.getById(id);
      const assignmentsData = await assignmentService.getByCourse(id);
      const announcementsData = await announcementService.getByCourse(id);
      const materialsData = await materialService.getByCourse(id);
      
      setCourse(courseData);
      setAssignments(assignmentsData);
      setAnnouncements(announcementsData);
      setMaterials(materialsData);
      setError(null);
    } catch (err) {
      setError('Error al cargar el curso');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando curso...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  if (!course) return <div style={{ padding: '20px' }}>Curso no encontrado</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ backgroundColor: '#4CAF50', color: 'white', padding: '30px', borderRadius: '8px', marginBottom: '20px' }}>
        <button onClick={() => navigate('/courses')} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginBottom: '15px' }}>
          Volver a cursos
        </button>
        <h1>{course.code} - {course.name}</h1>
        <p>Profesor: {course.teacher_detail?.first_name} {course.teacher_detail?.last_name}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('info')} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: activeTab === 'info' ? '#4CAF50' : '#ddd', color: activeTab === 'info' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Informacion</button>
        <button onClick={() => setActiveTab('students')} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: activeTab === 'students' ? '#4CAF50' : '#ddd', color: activeTab === 'students' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Estudiantes</button>
        <button onClick={() => setActiveTab('assignments')} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: activeTab === 'assignments' ? '#4CAF50' : '#ddd', color: activeTab === 'assignments' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Tareas</button>
        <button onClick={() => setActiveTab('announcements')} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: activeTab === 'announcements' ? '#4CAF50' : '#ddd', color: activeTab === 'announcements' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Avisos</button>
        <button onClick={() => setActiveTab('materials')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'materials' ? '#4CAF50' : '#ddd', color: activeTab === 'materials' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Materiales</button>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        {activeTab === 'info' && (
          <div>
            <h2>Descripcion del Curso</h2>
            <p>{course.description}</p>
            <p>Estudiantes: {course.student_count}</p>
            <p>Tareas: {assignments.length}</p>
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <h2>Estudiantes Inscritos</h2>
            {course.students_detail?.map((student) => (
              <div key={student.id} style={{ padding: '10px', backgroundColor: 'white', marginBottom: '10px', borderRadius: '4px' }}>
                {student.first_name} {student.last_name} - {student.email}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div>
            <h2>Tareas del Curso</h2>
            {assignments.map(assignment => (
              <div key={assignment.id} style={{ padding: '15px', backgroundColor: 'white', marginBottom: '10px', borderRadius: '4px' }}>
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                <p>Fecha limite: {new Date(assignment.due_date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div>
            <h2>Avisos del Curso</h2>
            {announcements.map(announcement => (
              <div key={announcement.id} style={{ padding: '15px', backgroundColor: 'white', marginBottom: '10px', borderRadius: '4px' }}>
                <h3>{announcement.title}</h3>
                <p>{announcement.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'materials' && (
          <div>
            <h2>Materiales del Curso</h2>
            {materials.map(material => (
              <div key={material.id} style={{ padding: '15px', backgroundColor: 'white', marginBottom: '10px', borderRadius: '4px' }}>
                <h3>{material.title}</h3>
                <p>{material.description}</p>
                {material.file_url && <a href={material.file_url} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '4px', marginRight: '10px' }}>Descargar</a>}
                {material.url && <a href={material.url} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', backgroundColor: '#2196F3', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Abrir enlace</a>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetailPage;