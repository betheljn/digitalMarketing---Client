import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import Services from './components/Services/services';
import About from './components/About/about';
import LoginForm from './components/Auth/login';
import Articles from './components/Articles/articles';
import SingleArticle from './components/Articles/singleArticle';
import ContactsForm from './components/Contacts/contactsForm';
import ClientDashboard from './components/Dashboards/Client/client-Dashboard';
import AdminDashboard from './components/Dashboards/Admin/admin-Dashboard';
import ClientPage from './components/Admin/ClientPage';
import ArticlesPage from './components/Admin/ArticlesPage';

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
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:id' element={<SingleArticle />} />
        <Route path='/contact' element={<ContactsForm />} />
        <Route path='/client-dashboard' element={<ClientDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/admin-dashboard/clients' element={<ClientPage />} />
        <Route path='/admin-dashboard/articles' element={<ArticlesPage />} />
      </Routes>
    </div>
  );
}

export default App


