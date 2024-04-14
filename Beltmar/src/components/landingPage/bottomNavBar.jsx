import React from 'react';
import { Link } from 'react-router-dom';

export const BottomMenuLinks = [
  {
    id: 1,
    name: "About Us",
    link: "/about"
  },
  {
    id: 2,
    name: "Articles",
    link: "/articles"
  },
];

function BottomNavBar() {
  return (
    <div>
      {/* Header with Links */}
      <div className='hidden md:block mb-5'>
        <ul className='flex items-center justify-between px-8 py-4 border-t-2 border-primary'>
          <li>
            <Link to={BottomMenuLinks[0].link} className='text-lg font-bold hover:text-primary hover:border-primary transition-all duration-300'>
              {BottomMenuLinks[0].name}
            </Link>
          </li>
          <li>
            <Link to={BottomMenuLinks[1].link} className='text-lg font-bold hover:text-primary hover:border-primary transition-all duration-300'>
              {BottomMenuLinks[1].name}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BottomNavBar;



