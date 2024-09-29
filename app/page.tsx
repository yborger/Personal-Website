"use client";
import React, { useState } from 'react';

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
      <section className="py-16 bg-white shadow-xl">
        <div className="text-center text-spacing ml-6 mr-6">
          <h1 className="text-4xl font-bold">Hi, I&apos;m Yael Borger</h1>

          <p className="text-md mt-12">
            I&apos;m a software developer passionate about creating innovative solutions and engaging user experiences. My journey spans various fields, including frontend, backend, and full-stack development. 
          </p>
          <p className="text-md mt-6">
            Equipped with a strong foundation in JavaScript, Python, Java, HTML, CSS, and C++, I am committed to transforming ideas into dynamic applications that make a difference.
          </p>

          <p className="text-md mt-6">
            Feel free to explore my projects and coursework to see how I apply my skills in real-world scenarios.
          </p>
        </div>
      </section>
    </>
  );
};

export default Page;
