import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import Services from './components/Services/services';
import About from './components/About/about';
import LoginForm from './components/Auth/login';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className='overflow-x-hidden'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/services' element={<Services />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App


