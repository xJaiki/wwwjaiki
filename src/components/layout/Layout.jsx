import { Outlet } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import SubNavbar from './SubNavbar';
import { useState, useEffect } from 'react';

const Layout = () => {
    const [navbarSize, setNavbarSize] = useState(0);

    useEffect(() => {
        setNavbarSize(document.querySelector('header').offsetHeight);
    }
    , []);
    return (
        <div className="max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <header className="pt-2 pb-6 md:pt-4 md:pb-6 fixed top-0 w-full z-50 bg-white">
                {/* Navbar responsive */}
                <div className="overflow-x-auto scrollbar-hide">
                    <MainNavbar />
                </div>

                {/* Subnavbar responsive */}
                <div className="overflow-x-auto scrollbar-hide">
                    <SubNavbar />
                </div>
            </header>

            <main className='mt-0 md:mt-4' style={{ paddingTop: `${navbarSize}px` }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;