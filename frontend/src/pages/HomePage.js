import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Bienvenido al Sistema de Gestión Educativa</h1>
      <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
        Gestiona cursos, estudiantes, profesores, calificaciones y materiales en un solo lugar.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginTop: '40px',
        maxWidth: '1200px',
        margin: '40px auto'
      }}>
        <Link to="/courses" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '30px',
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h2>📚 Cursos</h2>
            <p>Ver y gestionar cursos</p>
          </div>
        </Link>

        <Link to="/students" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '30px',
            backgroundColor: '#2196F3',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h2>👨‍🎓 Estudiantes</h2>
            <p>Lista de estudiantes</p>
          </div>
        </Link>

        <Link to="/teachers" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '30px',
            backgroundColor: '#FF9800',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h2>👨‍🏫 Profesores</h2>
            <p>Lista de profesores</p>
          </div>
        </Link>

        <Link to="/grades" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '30px',
            backgroundColor: '#9C27B0',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h2>📝 Calificaciones</h2>
            <p>Tareas y notas</p>
          </div>
        </Link>

        <Link to="/announcements" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '30px',
            backgroundColor: '#F44336',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h2>📢 Avisos</h2>
            <p>Anuncios y noticias</p>
          </div>
        </Link>

        <Link to="/materials" style={{ textDecoration: 'none' }}>
          <div style={{
              padding: '30px',
              backgroundColor: '#607D8B',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h2>📁 Materiales</h2>
              <p>Documentos y recursos</p>
            </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;