import Navbar from "./components/Navbar/navbar";
import Hero from "./components/Hero/hero";
import Services from "./components/Services/services";

const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <Hero />
      <Services />
    </div>
  );
}

export default App


