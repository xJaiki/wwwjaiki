import { Outlet } from 'react-router-dom';

const ProjectsPage = () => {
  return (
    <div className="projects-page">
      <Outlet />
    </div>
  );
};

export default ProjectsPage;