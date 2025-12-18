import React from 'react';
import CoursesPage from './pages/CoursesPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{
        backgroundColor: '#282c34',
        padding: '20px',
        color: 'white',
        marginBottom: '20px'
      }}>
        <h1>Sistema de Gestión Educativa</h1>
      </header>
      
      <CoursesPage />
    </div>
  );
}

export default App;