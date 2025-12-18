import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#282c34',
      padding: '15px 20px',
      color: 'white',
      marginBottom: '0'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          📚 EduPortal
        </Link>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
          <Link to="/courses" style={{ color: 'white', textDecoration: 'none' }}>Cursos</Link>
          <Link to="/students" style={{ color: 'white', textDecoration: 'none' }}>Estudiantes</Link>
          <Link to="/teachers" style={{ color: 'white', textDecoration: 'none' }}>Profesores</Link>
          <Link to="/grades" style={{ color: 'white', textDecoration: 'none' }}>Calificaciones</Link>
          <Link to="/announcements" style={{ color: 'white', textDecoration: 'none' }}>Avisos</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;