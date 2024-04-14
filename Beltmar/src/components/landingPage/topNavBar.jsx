import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Logo from "../../assets/bBoxOrange.png";
import ResponsiveMenu from "../Menu/responsiveMenu";
import { HiMenu, HiMenuAlt4 } from 'react-icons/hi';

const MenuLinks = [
  {
    id: 1,
    name: "Services",
    link: "/services"
  },
  {
    id: 2,
    name: "Articles",
    link: "/#articles"
  },
  {
    id: 3,
    name: "About",
    link: "/#about"
  },
  {
    id: 4,
    name: "Login",
    link: "/#login"
  }
];

function TopNavBar() {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Set the max width for mobile view
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      {/* Logo Section */}
      <div className='container py-3 md:py-2 flex justify-center items-center'>
        <a href="/" className='flex items-center gap-1'>
          <img src={Logo} alt="Logo" className='w-20' />
          <span className='text-2xl sm:text-3xl font-semibold' style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>BELTMAR</span>
        </a>
      </div>
      {/* Header with Links */}
      {!isMobile && (
        <div className='hidden md:block'>
          <ul className='flex items-center justify-between px-8 py-4 border-b-2 border-primary'>
            <li>
              <a href="/services" className='text-lg font-bold hover:text-primary hover:border-primary transition-all duration-300'>
                Services
              </a>
            </li>
            <li className='self-end'>
              <a href="/login" className='text-lg font-bold hover:text-primary hover:border-primary transition-all duration-300'>
                Login
              </a>
            </li>
          </ul>
        </div>
      )}
      {/* Mobile View */}
      {isMobile && (
        <div className='flex justify-end pr-4'>
          {/* Render the menu icon based on showMenu state */}
          {showMenu ? (
            <HiMenuAlt4
              onClick={toggleMenu} 
              className='text-2xl cursor-pointer' /> 
          ) : (
            <HiMenu
              onClick={toggleMenu}
              className='text-2xl cursor-pointer' />
          )}
        </div>
      )}
      {/* Mobile Menu section */}
      {showMenu && <ResponsiveMenu MenuLinks={MenuLinks} showMenu={showMenu} />}
    </div>
  );
}

export default TopNavBar;






