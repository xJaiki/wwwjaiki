import { NavLink } from 'react-router-dom';

const MainNavbar = () => {
  return (
    <nav className="py-4">
      <ul className="flex flex-nowrap whitespace-nowrap md:flex-wrap gap-6 md:gap-8 min-w-max">
        <li>
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              `text-xl transition-colors duration-200 home-link ${isActive ? "border-b-2 border-primary" : ""}`
            }
          >
            home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/collections" 
            className={({ isActive }) => 
              `text-xl text-gray-800 transition-colors duration-200 ${isActive ? "border-b-2 border-primary" : ""}`
            }
          >
            collections
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => 
              `text-xl text-gray-800 transition-colors duration-200 ${isActive ? "border-b-2 border-primary" : ""}`
            }
          >
            projects
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/socialss" 
            className={({ isActive }) => 
              `text-xl text-gray-800 transition-colors duration-200 ${isActive ? "border-b-2 border-primary" : ""}`
            }
          >
            socialss
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavbar;