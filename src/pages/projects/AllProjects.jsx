import { Outlet } from 'react-router-dom';
import PersonalProjects from './PersonalProjects';
import WorkProjects from './WorkProjects';

const ProjectsPage = () => {
  return (
    <div className="projects-page">
        <PersonalProjects />
        <WorkProjects />
    </div>
  );
};

export default ProjectsPage;