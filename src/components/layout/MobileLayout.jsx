import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Outlet } from 'react-router-dom';

// Importa le categorie dalle route originali
const mainRoutes = [
  { path: '/home', label: 'home' },
  { path: '/collections', label: 'collections' },
  { path: '/projects', label: 'projects' },
  { path: '/socialss', label: 'socialss' }
];

const homeSubRoutes = [
  { path: '/home/welcome', label: 'WELCOME' },
  { path: '/home/aboutme', label: 'ABOUT ME' },
  { path: '/home/likesanddislikes', label: 'LIKES AND DISLIKES' }
];

const MobileLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentMainIndex, setCurrentMainIndex] = useState(0);
  const [currentSubIndex, setCurrentSubIndex] = useState(0);
  
  // Identifica gli indici correnti in base all'URL
  useEffect(() => {
    const path = location.pathname;
    
    // Trova l'indice della route principale
    const mainIndex = mainRoutes.findIndex(route => path.startsWith(route.path));
    if (mainIndex !== -1) {
      setCurrentMainIndex(mainIndex);
    }
    
    // Trova l'indice della sub-route (se in /home)
    if (path.startsWith('/home')) {
      const subIndex = homeSubRoutes.findIndex(route => path === route.path);
      if (subIndex !== -1) {
        setCurrentSubIndex(subIndex);
      }
    }
  }, [location.pathname]);

  // Motion values per il drag orizzontale
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  
  // Funzione per gestire la fine del drag
  const handleDragEnd = (event, info) => {
    const { offset, velocity } = info;
    
    // Cambia pagina solo se lo swipe è abbastanza ampio o veloce
    if (offset.x > 100 || velocity.x > 500) {
      // Swipe verso destra (vai alla pagina precedente)
      if (currentMainIndex > 0) {
        navigate(mainRoutes[currentMainIndex - 1].path);
      }
    } else if (offset.x < -100 || velocity.x < -500) {
      // Swipe verso sinistra (vai alla pagina successiva)
      if (currentMainIndex < mainRoutes.length - 1) {
        navigate(mainRoutes[currentMainIndex + 1].path);
      }
    }
  };

  // Calcola lo spostamento massimo per prevenire swipe quando siamo agli estremi
  const getMaxDrag = () => {
    if (currentMainIndex === 0) {
      // Se siamo alla prima pagina, impedisci drag verso destra
      return { left: 0, right: 200 };
    } else if (currentMainIndex === mainRoutes.length - 1) {
      // Se siamo all'ultima pagina, impedisci drag verso sinistra
      return { left: 200, right: 0 };
    }
    // Altrimenti, permetti drag in entrambe le direzioni
    return { left: 200, right: 200 };
  };

  const { left, right } = getMaxDrag();

  return (
    <div className="mobile-app-container overflow-hidden">
      {/* Header con navbar e subnavbar */}
      <header className="mobile-header py-4">
        {/* Navbar principale con effetto "fuoriuscente" */}
        <div className="main-navbar-container">
          <div className="main-navbar-scroll" style={{ transform: `translateX(calc(-${currentMainIndex * 25}% + 8px))` }}>
            {mainRoutes.map((route, index) => (
              <button
                key={route.path}
                className={`main-nav-item ${index === currentMainIndex ? 'active' : ''} ${index === 0 ? 'home-link' : ''}`}
                onClick={() => navigate(route.path)}
              >
                {route.label}
              </button>
            ))}
            {/* Elementi fantasma per dare l'illusione di continuare */}
            <div className="ghost-item"></div>
            <div className="ghost-item"></div>
          </div>
        </div>
        
        {/* Subnavbar con effetto "fuoriuscente" - visibile solo nella sezione home */}
        {location.pathname.startsWith('/home') && (
          <div className="sub-navbar-container mt-4">
            <div className="sub-navbar-scroll" style={{ transform: `translateX(calc(-${currentSubIndex * 33.333}% + 8px))` }}>
              {homeSubRoutes.map((route, index) => (
                <button
                  key={route.path}
                  className={`sub-nav-item ${index === currentSubIndex ? 'active' : ''}`}
                  onClick={() => navigate(route.path)}
                >
                  {route.label}
                </button>
              ))}
              {/* Elementi fantasma per dare l'illusione di continuare */}
              <div className="ghost-item"></div>
              <div className="ghost-item"></div>
            </div>
          </div>
        )}
      </header>
      
      {/* Contenuto principale con drag che segue il dito */}
      <motion.main
        className="page-content"
        style={{ x, opacity }}
        drag="x"
        dragConstraints={{ left: -left, right: right }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <Outlet />
      </motion.main>
      
      {/* Indicatore visivo per swipe */}
      <div className="swipe-indicators">
        {mainRoutes.map((_, index) => (
          <div 
            key={index}
            className={`swipe-indicator ${index === currentMainIndex ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MobileLayout;