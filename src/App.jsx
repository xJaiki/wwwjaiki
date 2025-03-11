import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import Welcome from './pages/home/Welcome';
import AboutMe from './pages/home/AboutMe';
import LikesAndDislikes from './pages/home/LikesAndDislikes';

// Projects Pages
import ProjectsPage from './pages/projects/ProjectsPage';
// These components will need to be created
import AllProjects from './pages/projects/AllProjects';
import PersonalProjects from './pages/projects/PersonalProjects';
import WorkProjects from './pages/projects/WorkProjects';

// Stuff Pages
import StuffPage from './pages/stuff/StuffPage';
// These components will need to be created
import Games from './pages/stuff/Games';
import Music from './pages/stuff/Music';
import Collections from './pages/stuff/Collections';

// Social Pages
import SocialPage from './pages/social/SocialPage';
// These components will need to be created
import ContactMe from './pages/social/ContactMe';
import CV from './pages/social/CV';
import Socialssss from './pages/social/Socialssss';

import './index.css';
import './styles/custom.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Use appropriate layout based on device */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home/welcome" replace />} />
          
          {/* Home Routes */}
          <Route path="home" element={<HomePage />}>
            <Route index element={<Navigate to="/home/welcome" replace />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="aboutme" element={<AboutMe />} />
            <Route path="likesanddislikes" element={<LikesAndDislikes />} />
          </Route>
          
          {/* Projects Routes */}
          <Route path="projects" element={<ProjectsPage />}>
            <Route index element={<Navigate to="/projects/all" replace />} />
            <Route path="all" element={<AllProjects />} />
            <Route path="personal" element={<PersonalProjects />} />
            <Route path="work" element={<WorkProjects />} />
          </Route>
          
          {/* Stuff Routes */}
          <Route path="stuff" element={<StuffPage />}>
            <Route index element={<Navigate to="/stuff/games" replace />} />
            <Route path="games" element={<Games />} />
            <Route path="music" element={<Music />} />
            <Route path="collections" element={<Collections />} />
          </Route>
          
          {/* Social Routes */}
          <Route path="social" element={<SocialPage />}>
            <Route index element={<Navigate to="/social/contactme" replace />} />
            <Route path="contactme" element={<ContactMe />} />
            <Route path="cv" element={<CV />} />
            <Route path="socialssss" element={<Socialssss />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;