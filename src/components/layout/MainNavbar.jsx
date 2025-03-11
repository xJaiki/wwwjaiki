import { NavLink } from 'react-router-dom';

const MainNavbar = () => {
  return (
    <nav className="py-2">
      <ul className="flex flex-nowrap whitespace-nowrap md:flex-wrap gap-4 md:gap-6 min-w-max">
        <li>
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              `text-2xl md:text-4xl font-light ${isActive ? "home-link" : "text-gray-800"} transition-colors duration-200 `
            }
          >
            home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => 
              `text-2xl md:text-4xl font-light ${isActive ? "home-link" : "text-gray-800"} transition-colors duration-200 `
            }
          >
            projects
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/stuff" 
            className={({ isActive }) => 
              `text-2xl md:text-4xl font-light  ${isActive ? "home-link" : "text-gray-800"} transition-colors duration-200 `
            }
          >
            stuff
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/social" 
            className={({ isActive }) => 
              `text-2xl md:text-4xl font-light  ${isActive ? "home-link" : "text-gray-800"} transition-colors duration-200 `
            }
          >
            social
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavbar;