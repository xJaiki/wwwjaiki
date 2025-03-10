import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <Outlet />
    </div>
  );
};

export default HomePage;