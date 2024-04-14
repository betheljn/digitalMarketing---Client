import backgroundImage from "../../assets/website/bgImage.jpg";
import TopNavBar from './topNavBar';
import BottomNavBar from './bottomNavBar';
import { useNavigate } from 'react-router-dom'; 

function LandingPage() {
    const navigate = useNavigate();

    const handleArrowClick = () => {
      navigate('/about');
    }

    const handleServicesClick = () => {
      navigate('/services');
    }

    const handleArticlesClick = () => {
        navigate('/articles');
    }

  return (
    <div className="relative h-screen m-0 p-0">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
      <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold text-center" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
        Empowering Businesses to <br />
        <span className='text-primary'>Thrive Online</span>
        </h1>
        <button className='btn-primary mt-5 text-lg md:text-xl'>Get Started</button>
        {/* Left Arrow with Animation Transition */}
        <div className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer animate-bounce ml-2" onClick={handleServicesClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 10a1 1 0 01-1 1H6.414l2.293 2.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L6.414 9H14a1 1 0 011 1z" />
            </svg>
        </div>
        <div className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer animate-bounce mr-2" onClick={handleArticlesClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 10a1 1 0 011-1h7.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 11H6a1 1 0 01-1-1z" />
            </svg>
        </div>
      </div>
      {/* Main Navigation */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Top Navigation Bar */}
        <TopNavBar />
        
        {/* Bottom Navigation Bar */}
        <BottomNavBar />
      </div>

      {/* Down Arrow with Animation Transition */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce" onClick={handleArrowClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" clipRule="evenodd" />
                </svg>
            </div>
    </div>
  );
}

export default LandingPage;












