import { NavLink, useLocation } from 'react-router-dom';

const SubNavbar = () => {
  const location = useLocation();
  
  // Mostra la sub navbar solo nella sezione home
  if (!location.pathname.startsWith('/home')) {
    return null;
  }
  
  return (
    <nav className="mb-8">
      <ul className="flex flex-nowrap whitespace-nowrap md:flex-wrap gap-6 md:gap-8 min-w-max">
        <li>
          <NavLink 
            to="/home/welcome" 
            className={({ isActive }) => 
              `text-base font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
            }
          >
            WELCOME
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/home/aboutme" 
            className={({ isActive }) => 
              `text-base font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
            }
          >
            ABOUT ME
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/home/likesanddislikes" 
            className={({ isActive }) => 
              `text-base font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800 hover:text-gray-600"}`
            }
          >
            LIKES AND DISLIKES
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SubNavbar;