import { Outlet, useLocation } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import SubNavbar from './SubNavbar';
import { useSwipeable } from 'react-swipeable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [swipeHintDirection, setSwipeHintDirection] = useState(null);
  
  // Array di route basate sull'App.jsx
  const mainRoutes = [
    { path: '/home', label: 'home' },
    { path: '/collections', label: 'collections' },
    { path: '/projects', label: 'projects' },
    { path: '/socialss', label: 'socialss' }
  ];
  
  // Trova l'indice corrente in base al percorso
  const currentPathIndex = () => {
    return mainRoutes.findIndex(route => 
      location.pathname.startsWith(route.path)
    );
  };
  
  // Configurazione swipe handler solo per dispositivi mobili
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = currentPathIndex();
      if (currentIndex < mainRoutes.length - 1) {
        const nextRoute = mainRoutes[currentIndex + 1].path;
        navigate(nextRoute);
        showSwipeHint('right');
      }
    },
    onSwipedRight: () => {
      const currentIndex = currentPathIndex();
      if (currentIndex > 0) {
        const prevRoute = mainRoutes[currentIndex - 1].path;
        navigate(prevRoute);
        showSwipeHint('left');
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  // Mostra brevemente un indicatore di direzione dopo lo swipe
  const showSwipeHint = (direction) => {
    setSwipeHintDirection(direction);
    setTimeout(() => {
      setSwipeHintDirection(null);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="py-4">
        {/* Navbar responsive */}
        <div className="overflow-x-auto scrollbar-hide">
          <MainNavbar />
        </div>
        
        {/* Subnavbar responsive */}
        <div className="overflow-x-auto scrollbar-hide">
          <SubNavbar />
        </div>
      </header>
      
      {/* Area contenuto con supporto swipe su mobile */}
      <main {...handlers} className="relative touch-pan-y">
        <Outlet />
        
        {/* Indicatori visivi per feedback swipe - visibili solo quando attivi */}
        {swipeHintDirection && (
          <div className={`swipe-hint ${swipeHintDirection} swipe-active md:hidden`}>
            {swipeHintDirection === 'left' ? '←' : '→'}
          </div>
        )}
      </main>
      
      {/* Indicatore pagine su mobile */}
      <div className="md:hidden mt-4 flex justify-center">
        <div className="flex space-x-1">
          {mainRoutes.map((route, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${currentPathIndex() === index ? 'bg-primary' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;