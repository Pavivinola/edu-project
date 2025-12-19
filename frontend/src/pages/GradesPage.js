import React, { useState, useEffect } from 'react';
import { gradeService, assignmentService } from '../services/gradeService';
import { courseService } from '../services/courseService';
import GradeForm from '../components/GradeForm';

function GradesPage() {
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    loadCourses();
    loadAssignments();
    loadGrades();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadAssignmentsByCourse(selectedCourse);
    } else {
      loadAssignments();
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

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const data = await assignmentService.getAll();
      setAssignments(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar tareas: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAssignmentsByCourse = async (courseId) => {
    try {
      setLoading(true);
      const data = await assignmentService.getByCourse(courseId);
      setAssignments(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar tareas: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadGrades = async () => {
    try {
      const data = await gradeService.getAll();
      setGrades(data);
    } catch (err) {
      console.error('Error al cargar calificaciones:', err);
    }
  };

  const getGradesForAssignment = (assignmentId) => {
    return grades.filter(grade => grade.assignment === assignmentId);
  };

  const handleCreate = () => {
    setEditingGrade(null);
    setShowForm(true);
  };

  const handleEdit = (grade) => {
    setEditingGrade(grade);
    setShowForm(true);
  };

  const handleDelete = async (gradeId) => {
    if (window.confirm('¿Estás seguro de eliminar esta calificación?')) {
      try {
        await gradeService.delete(gradeId);
        loadGrades();
      } catch (err) {
        alert('Error al eliminar la calificación: ' + err.message);
      }
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingGrade(null);
    loadGrades();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingGrade(null);
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando tareas y calificaciones...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Tareas y Calificaciones</h1>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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

          <button
            onClick={handleCreate}
            style={{
              padding: '10px 20px',
              backgroundColor: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            + Asignar Calificación
          </button>
        </div>
      </div>

      {assignments.length === 0 ? (
        <p>No hay tareas disponibles. Crea algunas desde el admin de Django.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {assignments.map((assignment) => {
            const assignmentGrades = getGradesForAssignment(assignment.id);
            const avgScore = assignmentGrades.length > 0
              ? (assignmentGrades.reduce((sum, g) => sum + parseFloat(g.score), 0) / assignmentGrades.length).toFixed(2)
              : 'N/A';

            return (
              <div
                key={assignment.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <div style={{ marginBottom: '15px' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{assignment.title}</h3>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#666' }}>
                    <span><strong>Curso:</strong> {assignment.course_detail?.code}</span>
                    <span><strong>Puntaje máximo:</strong> {assignment.max_score}</span>
                    <span><strong>Fecha límite:</strong> {new Date(assignment.due_date).toLocaleDateString()}</span>
                    <span><strong>Calificaciones:</strong> {assignmentGrades.length}</span>
                    <span><strong>Promedio:</strong> {avgScore}</span>
                  </div>
                </div>

                {assignment.description && (
                  <p style={{ margin: '10px 0', color: '#555' }}>{assignment.description}</p>
                )}

                {assignmentGrades.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Calificaciones:</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#e0e0e0' }}>
                          <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ccc' }}>Estudiante</th>
                          <th style={{ padding: '8px', textAlign: 'center', border: '1px solid #ccc' }}>Nota</th>
                          <th style={{ padding: '8px', textAlign: 'center', border: '1px solid #ccc' }}>Porcentaje</th>
                          <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ccc' }}>Retroalimentación</th>
                          <th style={{ padding: '8px', textAlign: 'center', border: '1px solid #ccc' }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignmentGrades.map((grade) => (
                          <tr key={grade.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                              {grade.student_detail?.first_name} {grade.student_detail?.last_name}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center', border: '1px solid #ddd', fontWeight: 'bold' }}>
                              {grade.score}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center', border: '1px solid #ddd' }}>
                              {grade.percentage}%
                            </td>
                            <td style={{ padding: '8px', border: '1px solid #ddd', fontSize: '13px' }}>
                              {grade.feedback || '-'}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center', border: '1px solid #ddd' }}>
                              <button
                                onClick={() => handleEdit(grade)}
                                style={{
                                  padding: '4px 8px',
                                  backgroundColor: '#FF9800',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  marginRight: '5px'
                                }}
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDelete(grade.id)}
                                style={{
                                  padding: '4px 8px',
                                  backgroundColor: '#F44336',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '12px'
                                }}
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <GradeForm
          grade={editingGrade}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default GradesPage;