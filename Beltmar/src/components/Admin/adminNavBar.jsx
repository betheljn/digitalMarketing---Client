import React, { useState } from 'react';
import Logo from "../../assets/bBoxOrange.png";
import { HiMenu, HiMenuAlt4 } from 'react-icons/hi';

function AdminNavBar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/admin-dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8 w-8" alt="Beltmar Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Beltmar</span>
          </a>
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-hamburger"
            aria-expanded={isNavbarOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            {isNavbarOpen ? <HiMenuAlt4 className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
          <div className={`${
            isNavbarOpen ? 'block' : 'hidden'
          } w-full`} id="navbar-hamburger">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <li>
                <a href="/admin-dashboard" className="block py-2 px-3 text-white bg-primary rounded dark:bg-blue-600" aria-current="page">Home</a>
              </li>
              <li>
                <a href="/admin-dashboard/articles" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Articles</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Business Data</a>
              </li>
              <li>
                <a href="/admin-dashboard/clients" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Clients</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Projects</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminNavBar;


