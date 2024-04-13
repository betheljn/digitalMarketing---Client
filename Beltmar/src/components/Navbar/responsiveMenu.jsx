import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { MenuLinks } from './navbar';

const ResponsiveMenu = ( {showMenu }) => {
  return (
   <div className={`${showMenu ? "left-0 " : "left-[-100%]"} 
   fixed bottom-0 top-0 w-[75%] transion-all duration-300 shadow-md pt-16 px-8 bg-white dark:bg-black z-50 flex flex-col pb-3`}>
        <div className="card">
            {/* User Section */}
            <div className='flex items-center justify-start gap-3'>
                <FaUserCircle size={50} />
                <div>
                    <h1>Hello User</h1>
                    <h1 className="text-sm text-slate-500">Premium User</h1>
                </div>
            </div>
        </div>
        {/* Menu Section */}
        <nav className='mt-12'>
            <ul className='space-y-4 text-xl'>
                {
                    MenuLinks.map(({ id, name, link }) => {
                        return <li key={id}>
                            <a href={link} className='mb-5 inline-block'>
                                {""}
                                {name}
                            </a>
                        </li>
                    })}  
            </ul>
        </nav>

        {/* Footer Section */}
        <div className='absolute bottom-0 w-full mb-3'> 
            <p className='text-slate-500 text-sm'>
                Made By The Creators at Beltmar
            </p>
        </div>
    </div>
  );
};

export default ResponsiveMenu
