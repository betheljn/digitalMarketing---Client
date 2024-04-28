import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import { useUserProfileQuery, useLogoutMutation } from '../../api/beltmarApi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/bBoxOrange.png";

export const MenuLinks = [
  {
    id: 1,
    name: "Services",
    link: "/services"
  },
  {
    id: 2,
    name: "Articles",
    link: "/articles"
  },
  {
    id: 3,
    name: "About",
    link: "/about"
  },
  {
    id: 4,
    name: "Contact Us",
    link: "/contact"
  }
];

const ResponsiveMenu = () => {
  const [userData, setUserData] = useState(null);
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const { data: userProfileData, isLoading: userProfileLoading } = useUserProfileQuery();
  const navigate = useNavigate();

  // Log authentication status whenever it changes
  useEffect(() => {
    console.log("Authentication status changed:", userData ? "Logged in" : "Logged out");
  }, [userData]);

  // Check authentication status when userProfileData changes
  useEffect(() => {
    if (userProfileData) {
      setUserData(userProfileData.userProfile);
    } else {
      setUserData(null);
    }
  }, [userProfileData]);

  // Check authentication status when the component mounts
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('authToken');
    console.log("Initial authentication status:", isAuthenticated ? "Logged in" : "Logged out");
    setUserData(isAuthenticated ? userProfileData?.userProfile : null);
  }, [userProfileData]);
  
  
  const handleLogout = async () => {
    try {
      // Call the logout mutation
      await logout();

      // Clear authentication token from local storage
      sessionStorage.removeItem('authToken');

      // Update UI to reflect logout
      setUserData(null);

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={`${MenuLinks ? "left-0 " : "left-[-100%]"} 
    fixed bottom-0 top-0 w-[75%] transition-all duration-300 shadow-md pt-16 px-8 bg-white dark:bg-black z-50 flex flex-col pb-3`}>
      {/* Logo Section */}
      <div className='container py-3 md:py-2 flex items-center justify-center'>
        <a href="/" className='flex items-center gap-1'>
          <img src={Logo} alt="Logo" className='w-20' />
          <span className='text-2xl sm:text-3xl font-semibold' style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>BELTMAR</span>
        </a>
      </div>
      <hr />
      {userData && (
        <div className="card">
          {/* User Section */}
          <div className='flex items-center justify-start gap-3 mt-5'>
            <FaUserCircle size={50} />
            <div>
              <h1>Hello, {userData.firstName + " " + userData.lastName}</h1>
              <h1 className="text-sm text-slate-500">Premium Client</h1>
            </div>
          </div>
        </div>
      )}
      {/* Menu Section */}
      <nav className='mt-12'>
        <ul className='space-y-4 text-xl'>
          {MenuLinks.map(({ id, name, link }) => {
            return (
              <li key={id}>
                <a href={link} className='mb-5 inline-block'>
                  {name}
                </a>
              </li>
            );
          })}
          {userData ? (
            <li>
              <button onClick={handleLogout} disabled={logoutLoading} className="mb-5 inline-block">Logout</button>
            </li>
          ) : (
            <li>
              <a href="/login" className="mb-5 inline-block">Login</a>
            </li>
          )}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className='absolute bottom-0 w-full mb-3'>
        <p className='text-slate-500 text-sm'>
          Made By The Creators at BELTMAR
        </p>
      </div>
    </div>
  );
};

ResponsiveMenu.propTypes = {
  MenuLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ResponsiveMenu;









