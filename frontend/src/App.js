import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import GradesPage from './pages/GradesPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import MaterialsPage from './pages/MaterialsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;