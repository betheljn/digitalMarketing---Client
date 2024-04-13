import {useState, useEffect} from 'react'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

const DarkMode = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    );

    const element = document.documentElement;

    useEffect(() => {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            element.classList.add('dark');
    } else {
        element.classList.remove('light');
        element.classList.remove('dark');
    }
    });

  return <> {theme === "dark" ? (
  <BsFillSunFill onClick={() => setTheme("light")}
   className='text-2xl' />
  ) : (
  <BsFillMoonFill onClick={() => setTheme("dark")}
    className='text-2xl' />
  )}
  </>
};
export default DarkMode
