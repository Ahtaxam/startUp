import React from 'react';
import Navbar from '../../components/Navbar';
import Image from '../../assets/images/startup1.jpg';
import { useState } from 'react';
import { useEffect } from 'react';
const COLORS = ['#764BA2', '#667EEA', '#A1C4FD'];
// const COLORS = ['#006400', '#00008B', '#4B0082'];
function Home() {
  const [bgColor, setBgColor] = useState(COLORS[0]);
  useEffect(() => {
    let colorIndex = 0;
    const interval = setInterval(() => {
      colorIndex = (colorIndex + 1) % COLORS.length;
      setBgColor(COLORS[colorIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {/* header */}
      <Navbar />
      <div
        style={{ backgroundColor: bgColor }}
        className='grid grid-cols-1 sm:grid-cols-2 items-center  gap-4 p-4 transition-colors duration-1000 h-screen'
      >
        <div className='flex flex-col justify-center items-center text-center'>
          <div>
            <p className='font-bold text-4xl sm:text-6xl'>Learn. Build.</p>
            <p className='font-bold text-4xl sm:text-6xl'>Share</p>
          </div>
          <p className='font-sans text-lg sm:text-xl mt-2'>
            It is a Platform where you can share <br /> your projects with the
            world
          </p>
        </div>

        <div className='flex justify-center'>
          <img
            src={Image}
            alt='image'
            className='max-h-[500px] w-[90%]  rounded-sm'
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
