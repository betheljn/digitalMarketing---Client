import { MdManageAccounts } from "react-icons/md";
import { PiStrategy } from "react-icons/pi";
import { MdMovieCreation } from "react-icons/md";
import { MdWeb } from "react-icons/md";
import TopNavBar from '../landingPage/topNavBar';
import BottomNavBar from '../landingPage/bottomNavBar';
import { useNavigate } from 'react-router-dom';

const skillsData = [
    {
        name: "Campaign Management",
        icon: <MdManageAccounts className='text-4xl text-primary' />,
        link: '#',
        description:
            " Our skilled team executes campaigns across diverse digital platforms with precision, maintaining adherence to industry best practices. We meticulously craft comprehensive campaign plans, detailing objectives, target demographics, messaging, channels, and timelines.",
        aosDelay: "0"
    },
    {
        name: "Content Creation",
        icon: <MdMovieCreation className='text-4xl text-primary' />,
        description: 
            "Our content creation service combines AI technology with creative expertise to produce engaging and relevant content for digital marketing campaigns. From blog posts and social media content to video scripts, our AI-driven tools assist in crafting compelling narratives that resonate with the target audience.",
        aosDelay: "300"

    },
    {
        name: "Web Development",
        icon: <MdWeb className='text-4xl text-primary' />,
        description:
            "Our web development services focus on creating user-friendly and visually appealing websites that align with the brand identity. From responsive design to e-commerce integration, we offer comprehensive solutions to enhance businesses' online presence.",
        aosDelay: "500"
    },
    {
        name: "Marketing Strategies",
        icon: <PiStrategy className='text-4xl text-primary' />,
        link: '#',
        description:
            "Our AI-driven marketing strategies leverage advanced algorithms to analyze real-time data, competitor insights, and market trends. The AI assistant provides personalized recommendations, helping businesses optimize their digital marketing campaigns for better performance and ROI.",
        aosDelay: "700"
    },
];

const Services = () => {
    const navigate = useNavigate();
    const handleArrowClick = () => {
        navigate('/');
      }

      return (
        <div className="relative py-12 sm:grid sm:place-items-center border border-gray-200 dark:border-gray-600 rounded-md">
            <div className="container">
                <TopNavBar />
                {/* Header Section */}
                <div className='pb-12 text-center space-y-3 mt-10'>
                    <h1 className='text-3xl font-semibold text-black dark:text-primary'>Our Services</h1>
                    <p>
                        We are a full-service digital marketing agency, providing a diverse range of comprehensive solutions tailored to meet your unique needs.
                    </p>
                </div>
                {/* Card Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
                    {skillsData.map((skill) => (
                <div
                    key={skill.name}
                    className='card space y-3 sm:space-y-4 p-4 border border-gray-200 dark:border-gray-600 rounded-md transition duration-300 transform hover:shadow-lg hover:scale-105'
                >
                <div className='flex justify-center'>{skill.icon}</div>
                    <h1 className='text-lg font-semibold flex justify-center'>
                        {skill.name}
                    </h1>
                    <p className='text-black dark:text-gray-400 flex text-center'>
                        {skill.description}
                    </p>
                </div>
                ))}
                </div>
                {/* Button Section */}
                <div className='text-center mt-4 sm:mt mb-10'>
                    <button className='btn-primary mx-auto block'>Learn More</button>
                </div>
                <BottomNavBar />
                {/* Down Arrow */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce" onClick={handleArrowClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 20 L5 10 L0 20 Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Services;

