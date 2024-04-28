import backgroundImage from "../../assets/website/bgImage.jpg";
import TopNavBar from './topNavBar';
import BottomNavBar from './bottomNavBar';

function LandingPage() {
  return (
        <div className="relative h-screen m-0 p-0">
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>

          {/* Main Navigation */}
          <div className="absolute inset-0 flex flex-col justify-between" style={{zIndex: 100}}>
            {/* Top Navigation Bar */}
            <TopNavBar />
            
            {/* Bottom Navigation Bar */}
            <BottomNavBar />
          </div>

          {/* Main Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold text-center" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Empowering Businesses to <br />
              <span className='text-primary'>Thrive Online</span>
            </h1>
          </div>
        </div>

      );
  }

export default LandingPage;



























