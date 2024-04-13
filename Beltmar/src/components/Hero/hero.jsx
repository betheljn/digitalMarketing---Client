import React from 'react'
import HeroImg from "../../assets/website/teamImg.jpg";

function Hero() {
  return (
    <div>
      <main className='bg-white dark:bg-gray-950 dark:text-white duration-300 '>
        <div className='container min-h-[620px] flex mt-10 sm:mt-0'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 place-items-center '>
                {/* Image Section */}
                <div className='order-1 sm-order-2  relative'>
                    <img src={HeroImg} alt="Beltmar Team" />
                    <div>
                        <p>

                        </p>
                    </div>
                </div>
                {/* Text Content Section */}
                <div className='space-y-5 order-2 sm:order-1 xl:pr-40'>
                    <h1 className='text-4xl sm:text-5xl font-semibold'>
                    Empowering Businesses to 
                    <span className='text-primary'>Thrive Online</span>
                    </h1>
                    <p>
                    We are passionate about driving growth for businesses 
                    through innovative digital marketing strategies. With a deep understanding 
                    of the unique challenges of each business face, we specialize in crafting personalized
                    solutions that maximize online visibility, engage target audiences, 
                    and drive meaningful results. Let us help you unlock the full potential 
                    of your online presence and achieve your business goals
                    </p>
                    <button className='btn-primary'>Get Started</button>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}

export default Hero;
