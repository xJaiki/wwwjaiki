import { NavLink, useLocation } from 'react-router-dom';

const SubNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Render different sub-navbars based on the current main route
  if (path.startsWith('/home')) {
    return (
      <nav className="mb-0">
        <ul className="flex flex-nowrap whitespace-nowrap md:flex-wrap gap-4 md:gap-6 min-w-max">
          <li>
            <NavLink 
              to="/home/welcome" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              WELCOME
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/home/aboutme" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              ABOUT ME
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/home/likesanddislikes" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              LIKES AND DISLIKES
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  } else if (path.startsWith('/projects')) {
    return (
      <nav className="mb-0">
        <ul className="flex flex-nowrap whitespace-nowrap md:flex-wrap gap-4 md:gap-6 min-w-max">
          <li>
            <NavLink 
              to="/projects/all" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              ALL
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/projects/personal" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              PERSONAL
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/projects/work" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              WORK
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  } else if (path.startsWith('/stuff')) {
    return (
      <nav className="mb-0">
        <ul className="flex flex-nowrap whitespace-nowrap md:flex-wrap gap-4 md:gap-6 min-w-max">
          <li>
            <NavLink 
              to="/stuff/games" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              GAMES
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/stuff/music" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              MUSIC
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/stuff/collections" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              COLLECTIONS
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  } else if (path.startsWith('/social')) {
    return (
      <nav className="mb-0">
        <ul className="flex flex-nowrap whitespace-nowrap md:flex-wrap gap-4 md:gap-6 min-w-max">
          <li>
            <NavLink 
              to="/social/contactme" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              CONTACT ME
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/social/cv" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              CV
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/social/socialssss" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
              }
            >
              SOCIALSSSS
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
  
  // Return null for other routes where no subnavbar is needed
  return null;
};

export default SubNavbar;