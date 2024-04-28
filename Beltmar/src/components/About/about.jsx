import TopNavBar from "../landingPage/topNavBar"
import BottomNavBar from "../landingPage/bottomNavBar"
import toddImage from '../../assets/website/todd.jpg';
import jairusImage from '../../assets/website/jairus.jpg';
import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();
    const teamMembers = [
      {
        id: 1,
        name: "Jairus Bethel",
        role: "President, Developer, Strategist",
        bio: "Embracing a journey fueled by an early fascination with technology, Jairus found himself drawn to the intricate world of problem-solving and creation. With a background spanning military training and studies in Marketing and Business Administration, each chapter of his life has woven seamlessly into his path toward marketing and software engineering. His journey represents a harmonious fusion of strategic analysis and collaborative teamwork, interlaced with a profound love for creativity and software developmental methodologies. With a degree in Marketing and an innate passion for marketing technology and web development, Jairus is poised to embark on their role as a proficient and innovative leader. Eager to push boundaries and craft transformative solutions, he aspires to make a tangible difference in the lives of others through his work.",
        image: jairusImage,
      },
      {
        id: 2,
        name: "Todd Bethel",
        role: "Vice-President, Designer, Strategist",
        bio: "Born out of a fascination for technology and a drive for innovation, Todd embarked on a journey into the world of Electrical Engineering at Georgia Tech. Armed with a passion for creativity and an insatiable curiosity for emerging trends, he quickly found his niche in audiovisual design and digital video technologies. With a keen eye for detail and a knack for problem-solving, Todd became a Certified Technical Specialist - Designer (CTS-D), honing their skills in crafting seamless communication systems. But his journey doesn't end there. His thirst for knowledge and eagerness to explore the frontiers of technology has led him to delve into the realms of marketing and AI. Always ready to embrace new challenges, Todd is not just a technologist – he is a visionary, shaping the future of technology with each innovation and every creative endeavor.",
        image: toddImage,
      }

    ]
  return (
    <div className="container mx-auto py-8">
      <TopNavBar />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-10 mb-4">About Us</h1>
        <p className="mb-8 text-center">BELTMAR is an innovative digital marketing strategy firm committed to empowering small and mid-sized businesses (SMBs) to thrive in the digital landscape. With a mission to provide tailored solutions for optimizing online presence and marketing efforts, we specialize in leveraging cutting-edge technology and industry expertise. Our comprehensive services, ranging from strategic consulting to website development, are designed to meet the unique needs of SMBs and drive tangible results. At BELTMAR, we envision becoming the premier destination for SMBs seeking personalized and effective digital marketing solutions, driven by AI technology. Our holistic approach, integrating AI-driven strategies, dynamic marketing dashboards, content creation, web development, and educational courses, sets us apart and equips SMBs with the tools and knowledge to succeed in today's competitive market.</p>

        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white p-4 rounded shadow-md justify-items-center text-sm">
              <img src={member.image} alt={member.name} className="w-60 h-60 mx-auto mb-4 rounded" />
              <h3 className="text-xl font-bold mb-2 text-center">{member.name}</h3>
              <p className="text-gray-600 mb-2 text-center">{member.role}</p>
              <p className="text-center">{member.bio}</p>
            </div>
          ))}
        </div>
        {/* Button Section */}
        <div className='text-center mt-4 sm:mt mb-10'>
                    <button className='btn-primary mx-auto block' onClick={() => navigate('/contact')}>Learn More</button>
                </div>
      </div>
      <BottomNavBar />
    </div>
  )
}

export default About;









