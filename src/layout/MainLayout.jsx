import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';
import { useTheme } from '../hooks/useTheme';

const MainLayout = () => {
    const {theme} = useTheme()
    return (
        <div className={theme? 'dark': 'light'}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

            
        </div>
    );
};

export default MainLayout;