import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

// Array di sezioni disponibili
const sections = [
  { id: 'latest', title: 'Latest', color: '#47688e' },
  { id: 'favorites', title: 'Favorites', color: '#1f497d' },
  { id: 'shared', title: 'SHARED SPACE', color: '#333333' },
  { id: 'settings', title: 'Settings', color: '#173e1a' }
];

const MobileNavigation = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Verifica se il dispositivo è mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Configurazione handlers per lo swipe
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentSection < sections.length - 1) {
        setDirection(1);
        setCurrentSection(prev => prev + 1);
      }
    },
    onSwipedRight: () => {
      if (currentSection > 0) {
        setDirection(-1);
        setCurrentSection(prev => prev - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  // Varianti per le animazioni
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  // Gestione del cambio di sezione tramite clic
  const handleSectionClick = (index) => {
    setDirection(index > currentSection ? 1 : -1);
    setCurrentSection(index);
  };

  return (
    <div className="mobile-navigation-container">
      {/* Header con titolo app */}
      <header className="app-header">
        <h1 className="text-4xl font-light text-white mb-4">FeedTi:o</h1>
      </header>

      {/* Navigazione a tab in stile Windows Phone */}
      <div className="tab-navigation mb-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`tab-button ${currentSection === index ? 'active' : ''}`}
            onClick={() => handleSectionClick(index)}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Container principale per il contenuto scorrevole */}
      <div 
        className="content-container"
        {...handlers}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={sections[currentSection].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="content-panel"
            style={{ backgroundColor: sections[currentSection].color }}
          >
            {/* Contenuto della sezione */}
            <div className="section-content">
              <h2 className="section-title">{sections[currentSection].title}</h2>
              
              {/* Contenuto specifico per ogni sezione */}
              {sections[currentSection].id === 'latest' && (
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="feed-item bg-white bg-opacity-20 p-2 aspect-square flex items-center justify-center">
                      <span className="text-xs text-white">Feed {i+1}</span>
                    </div>
                  ))}
                </div>
              )}

              {sections[currentSection].id === 'favorites' && (
                <div className="flex flex-col space-y-2">
                  {[
                    { num: 3, title: 'Architecture' },
                    { num: 4, title: 'Cat Tricks' },
                    { num: 12, title: 'Do It yourself' },
                    { num: 11, title: 'ExpoArt' },
                    { num: 8, title: 'Wellness and others' },
                    { num: 54, title: 'All' }
                  ].map((item, i) => (
                    <div key={i} className="favorite-item flex items-center space-x-3 p-2">
                      <div className="w-6 h-6 bg-teal-500 flex items-center justify-center text-white">{item.num}</div>
                      <span className="text-white">{item.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {sections[currentSection].id === 'shared' && (
                <div className="shared-content flex justify-center pt-6">
                  <div className="avatar-container">
                    <div className="avatar bg-white w-16 h-16 rounded-full"></div>
                    <p className="text-white text-center mt-2">Shared Profile</p>
                  </div>
                </div>
              )}

              {sections[currentSection].id === 'settings' && (
                <div className="settings-list flex flex-col space-y-2 mt-4">
                  <div className="setting-item text-white">Application settings</div>
                  <div className="setting-item text-white">Setup Google Reader</div>
                  <div className="setting-item text-white">About</div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicatore pagina corrente (pallini) */}
      <div className="page-indicators flex justify-center space-x-2 mt-4">
        {sections.map((_, index) => (
          <div 
            key={index} 
            className={`w-2 h-2 rounded-full ${currentSection === index ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => handleSectionClick(index)}
          ></div>
        ))}
      </div>

      {/* Footer con pulsanti di navigazione stile Windows Phone */}
      <footer className="windows-phone-footer fixed bottom-0 left-0 right-0 h-12 bg-black flex justify-between px-4">
        <button className="footer-button">
          <span className="text-white">◄</span>
        </button>
        <button className="footer-button">
          <span className="text-white">□</span>
        </button>
        <button className="footer-button">
          <span className="text-white">○</span>
        </button>
      </footer>
    </div>
  );
};

export default MobileNavigation;