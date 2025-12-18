import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const data = await userService.getTeachers();
      setTeachers(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar profesores: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando profesores...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Profesores</h1>
      
      {teachers.length === 0 ? (
        <p>No hay profesores registrados.</p>
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
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{teacher.username}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {teacher.first_name} {teacher.last_name}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{teacher.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <span style={{ 
                    backgroundColor: '#2196F3', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {teacher.role}
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

export default TeachersPage;