// Navbar.jsx
import { useState } from 'react';
import Logo from "../../assets/bBoxOrange.png";
import DarkMode from './darkMode';
import { HiMenuAlt3, HiMenuAlt1 } from 'react-icons/hi'
import ResponsiveMenu from './responsiveMenu';

export const MenuLinks = [
  {
    id: 1,
    name: "About",
    link: "/#about"
  },
  {
    id: 2,
    name: "Services",
    link: "/#services"
  },
  {
    id: 3,
    name: "Projects",
    link: "/#projects"
  }
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <nav className={`bg-${isDarkMode ? 'black' : 'white'} dark:bg-black dark:text-white duration-300`}>
        <div className='container py-3 md:py-2'>
          <div className='flex justify-between items-center'>
            {/* Logo Section */}
            <div>
              <a href="#" className='flex items-center gap-1'>
                <img src={Logo} alt="Logo" className='w-20' />
                <span className='text-2xl sm:text-3xl font-semibold'>Beltmar</span>
              </a>
            </div>
            {/* Desktop NavLinks Section */}
            <div className='hidden md:block'>
              <ul className='flex items-center gap-8'>
                {MenuLinks.map(({ id, name }) => (
                  <li key={id} className='cursor-pointer py-4'>
                    <a href="#" className='text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-all duration-300'>{name}</a>
                  </li>
                ))}
                <button className='btn-primary'>Connect Now</button>
                <DarkMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              </ul>
            </div>
            {/* Mobile View */}
            <div className='flex items-center gap-4 md:hidden'>
              <DarkMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              {
                showMenu ? (
                  <HiMenuAlt1 
                  onClick={toggleMenu} 
                  className='text-2xl cursor-pointer' /> 
                ): (
                  <HiMenuAlt3 
                  onClick={toggleMenu}
                  className='text-2xl cursor-pointer' />
                )}
            </div>
          </div>
        </div>
        {/* Mobile Menu section */}
        <ResponsiveMenu showMenu={showMenu} />
      </nav>
    </>
  );
}

export default Navbar;

