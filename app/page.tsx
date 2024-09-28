"use client"
import React, { useState } from 'react';
import Layout from './layout';

const Page: React.FC = () => {
  
  const [isVisible, setIsVisible] = useState(true); // Manage visibility state

  const handleVideoEnd = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    // Add the class to hide the video after it ends
    event.currentTarget.classList.add('fade-out'); // Optionally, add a fade-out class for effect

    setTimeout(() => {
      setIsVisible(false); // Hide video completely
    }, 1000); // Time matches the fade-out animation duration
  };

  return (
    <>
    {/* Video for opening the home page */}
    {isVisible && (
        <video 
          className="fixed top-0 left-0 w-full h-full object-cover" 
          autoPlay 
          muted 
          onEnded={handleVideoEnd}>
          <source src="/clouds_art_sign.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}


    {/* "Header" Section */}

    <section className="text-center py-16 bg-white shadow-xl">
      <div className="ml-6 mr-6">
        <h1 className="text-4xl font-bold">Hi, I'm Yael Borger</h1>
    <p className="text-lg mt-4">
      I'm a full-stack software developer with a focus on building scalable, efficient web applications. 
      Proficient in a wide range of technologies, including JavaScript, Python, and C++, I deliver solutions across the entire stack.
    </p></div>
    </section>

    </>
  );
};

export default Page;
