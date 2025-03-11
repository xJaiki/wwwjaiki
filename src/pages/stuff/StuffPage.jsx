import { Outlet } from 'react-router-dom';

const StuffPage = () => {
  return (
    <div className="stuff-page">
      <Outlet />
    </div>
  );
};

export default StuffPage;