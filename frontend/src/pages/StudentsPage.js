import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await userService.getStudents();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar estudiantes: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando estudiantes...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Estudiantes</h1>
      
      {students.length === 0 ? (
        <p>No hay estudiantes registrados.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Usuario</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre Completo</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.username}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {student.first_name} {student.last_name}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <span style={{ 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {student.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentsPage;