import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../providers/AuthContext';

const Navbar = () => {
    const {user, logOut} = use(AuthContext);
    const menuItems =
    <>
        <li><NavLink to="/">Home</NavLink></li>
        {/* <li><NavLink to="/report">Report Issue</NavLink></li> */}
        {/* <li><NavLink to="/staff">Be a Staff</NavLink></li> */}
        <li><NavLink to="/issues">All Issues</NavLink></li>
        <li><NavLink to="/dashboard">DashBoard</NavLink></li>
    </>;

    const handleSignOut = () => {
        logOut()
        .then(() => {   
            // Sign-out successful.
            console.log('User signed out successfully');
        })
        .catch((error) => {
            console.error(error);
        }); 
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {menuItems}
                    </ul>
                </div>
                <a className=" text-xl">InfraTrack</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">{user ? 
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="w-10 h-10 rounded-full bg-amber-300">
                        <img src={user?.photoURL} className='w-full h-full rounded-full' alt={user?.displayName} />
                    </div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                        <li><button onClick={()=>handleSignOut()}>Sign Out</button></li>
                    </ul>
                </div>
                :
                <NavLink to="/login" className="btn">Login</NavLink>
            }
            </div>
        </div>
    );
};

export default Navbar;