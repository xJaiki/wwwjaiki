import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import MobileLayout from './components/layout/MobileLayout';
import HomePage from './pages/home/HomePage';
import Welcome from './pages/home/Welcome';
import AboutMe from './pages/home/AboutMe';
import LikesAndDislikes from './pages/home/LikesAndDislikes';
import CollectionsPage from './pages/collections/CollectionsPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import SocialsPage from './pages/socials/SocialsPage';

import './index.css';
import './styles/custom.css';
import './styles/mobile.css';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // Controlla se è un dispositivo mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check iniziale
    checkMobile();
    
    // Aggiungi event listener per ridimensionamenti
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Usa il layout appropriato in base al dispositivo */}
        <Route path="/" element={isMobile ? <MobileLayout /> : <Layout />}>
          <Route index element={<Navigate to="/home/welcome" replace />} />
          
          <Route path="home" element={<HomePage />}>
            <Route index element={<Navigate to="/home/welcome" replace />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="aboutme" element={<AboutMe />} />
            <Route path="likesanddislikes" element={<LikesAndDislikes />} />
          </Route>
          
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="socialss" element={<SocialsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;