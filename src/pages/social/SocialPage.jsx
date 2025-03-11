import React from 'react';
import { Outlet } from 'react-router-dom';

const SocialPage = () => {
    return (
        <div className="social-page">
            <Outlet />
        </div>
    );
};

export default SocialPage;