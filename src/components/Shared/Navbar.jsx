
import React from 'react';
import { NavLink, Link } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import Swal from 'sweetalert2';
// import ThemeToggle from '../ThemeToggle';


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);


  const menuItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-semibold'
              : 'text-gray-700 dark:text-white/90 hover:text-blue-600'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/issues"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-semibold'
              : 'text-gray-700 dark:text-white/90 hover:text-blue-600'
          }
        >
          All Issues
        </NavLink>
      </li>
      {/* Add your 2 extra pages here */}
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-semibold'
              : 'text-gray-700 dark:text-white/90 hover:text-blue-600'
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-semibold'
              : 'text-gray-700 dark:text-white/90 hover:text-blue-600'
          }
        >
          Contact
        </NavLink>
      </li>
      {user &&
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold'
                : 'text-gray-700 dark:text-white/90 hover:text-blue-600'
            }
          >
            DashBoard
          </NavLink>
        </li>}
      {user &&
        <li>
          <NavLink
            to="/dashboard/myProfile"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold'
                : 'text-gray-700 dark:text-white/90 hover:text-blue-600'
            }
          >
            Profile
          </NavLink>
        </li>}


      <li>
        {/* <label className="flex cursor-pointer gap-2">
          <span className="label-text">light</span>

          <input type="checkbox" value="infratrack-dark" className="toggle theme-controller" />
          <span className="label-text">Dark</span>
        </label> */}

        {/* <label className="flex cursor-pointer gap-2 items-center">
          <span className="text-base-content text-sm">Light</span>
          <input
            type="checkbox"
            className="toggle theme-controller"
            onChange={(e) => {
              const theme = e.target.checked ? 'infratrack-dark' : 'infratrack';
              document.documentElement.setAttribute('data-theme', theme);
              localStorage.setItem('theme', theme);
            }}
          />
          <span className="text-base-content text-sm">Dark</span>
        </label> */}

        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="theme-controller"
            onChange={(e) => {
              const theme = e.target.checked ? 'infratrack-dark' : 'infratrack';
              document.documentElement.setAttribute('data-theme', theme);
              localStorage.setItem('theme', theme);
            }} />

          {/* sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

      </li>

    </>
  );

  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Signed out successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="navbar top-0 left-0 right-0 z-50 fixed bg-base-100 dark:bg-base-200 backdrop-blur-md shadow-lg border-b border-base-300">
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown rounded-2xl">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-2xl mt-3 z-1 p-4 shadow bg-white/90 dark:text-white dark:bg-gray-900 backdrop-blur-md rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>

        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            InfraTrack
          </span>
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu items-center menu-horizontal px-1 gap-2">
          {menuItems}
        </ul>
      </div>

      {/* Right side: Profile or Login */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar online ring-2 ring-offset-2 ring-blue-500/30 hover:ring-blue-500 transition-all duration-300 rounded-full cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img
                  src={user?.photoURL || '/default-avatar.png'}
                  alt={user?.displayName || 'User'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu p-4 shadow-lg bg-white/95 dark:bg-base-200 rounded-2xl backdrop-blur-md  w-64 mt-4 border border-gray-100"
            >
              {/* User Info */}
              <div className="flex flex-col items-center pb-4 border-b border-gray-200 mb-3">
                <img
                  src={user?.photoURL || '/default-avatar.png'}
                  alt={user?.displayName}
                  className="w-20 h-20 rounded-full border-4 border-blue-100 mb-3"
                />
                <p className="font-semibold text-gray-800 dark:text-white/95 text-lg">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-sm text-gray-500 dark:text-white/75">{user?.email}</p>
              </div>

              <li>
                <NavLink
                  to="/dashboard"
                  className="text-gray-700 dark:text-white/95 hover:text-blue-600 hover:bg-blue-50 py-3"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-red-600 hover:bg-red-50 py-3 font-medium"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-linear-to-r from-blue-600 to-indigo-600 text-white border-0 hover:from-blue-700 rounded-xl hover:to-indigo-700 shadow-md px-8"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;