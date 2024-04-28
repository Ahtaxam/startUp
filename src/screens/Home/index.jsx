import React from "react";
import Navbar from "../../components/Navbar";
import Image from "../../assets/images/startup1.jpg";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center  gap-4 p-4">
        <div className="flex flex-col justify-center items-center text-center">
          <div>
            <p className="font-bold text-4xl sm:text-6xl">Learn. Build.</p>
            <p className="font-bold text-4xl sm:text-6xl">Share</p>
          </div>
          <p className="font-sans text-lg sm:text-xl mt-2">
            It is a Platform where you can share <br/> your projects with the world
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src={Image}
            alt="image"
            className="max-h-[500px] w-[90%]  rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
