import React from 'react';
import Layout from '../layout';

const Coursework: React.FC = () => {
  return (
    <Layout>
      <section className="bg-white shadow-xl ">
      <div className="ml-6 mr-6">
      <h2 className="text-xl font-bold text-center">Coursework</h2>

      {/* images for courses */}
      <div className="flex flex-wrap justify-center gap-4 ">
        
        {/* each image has special content */}
        <div className="relative flex flex-col items-end shadow-md transition-transform duration-300 hover:scale-105">
          <span className="w-full bg-white bg-opacity-90 border border-gray-300 p-1 rounded-tl-md rounded-tr-md shadow-md whitespace-nowrap text-center text-sm">
            Artificial Intelligence CS63
          </span>
          <a href="https://github.com/yborger/Artificial-Intelligence-Class" target="_blank" rel="noopener noreferrer">
            <img 
            src="/ai.png" 
            alt="Artificial Intelligence" 
            className="w-48 h-48 object-cover"/>
          </a>
        </div>
        
        <div className="relative flex flex-col items-end shadow-md transition-transform duration-300 hover:scale-105">
          <span className="w-full bg-white bg-opacity-90 border border-gray-300 p-1 rounded-tl-md rounded-tr-md shadow-md whitespace-nowrap text-center text-sm">
          Computational Images
          </span>
          <a href="https://github.com/yborger/Computational-Images" target="_blank" rel="noopener noreferrer">
          <img 
            src="/Computational_Images.png" 
            alt="Computational Images" 
            className="w-48 h-48 object-cover"/>
          </a>

        </div>
        
        <div className="relative flex flex-col items-end shadow-md transition-transform duration-300 hover:scale-105">
          <span className="w-full bg-white bg-opacity-90 border border-gray-300 p-1 rounded-tl-md rounded-tr-md shadow-md whitespace-nowrap text-center text-sm">
          Computer Systems
          </span>
          <a href="https://github.com/yborger/Intro-CS" target="_blank" rel="noopener noreferrer">
          <img 
            src="/Cs_31.jpg" 
            alt="Computer Systems" 
            className="w-48 h-48 object-cover "/>
          </a>

        </div>
        
        <div className="relative flex flex-col items-end shadow-md transition-transform duration-300 hover:scale-105">
          <span className="w-full bg-white bg-opacity-90 border border-gray-300 p-1 rounded-tl-md rounded-tr-md shadow-md whitespace-nowrap text-center text-sm">
          Data Structures & Algorithms
          </span>
          <a href="https://github.com/yborger/Data-Structures-Algorithms" target="_blank" rel="noopener noreferrer">
          <img 
            src="/Cs_35.jpg" 
            alt="Data Structures and Algorithms" 
            className="w-48 h-48 object-cover "/>
          </a>

        </div>
        
        <div className="relative flex flex-col items-end shadow-md transition-transform duration-300 hover:scale-105">
          <span className="w-full bg-white bg-opacity-90 border border-gray-300 p-1 rounded-tl-md rounded-tr-md shadow-md whitespace-nowrap text-center text-sm">
          Compilers
          </span>
          <a href="https://github.com/yborger/Compilers" target="_blank" rel="noopener noreferrer">
          <img 
            src="/compilers.jpg" 
            alt="Compilers" 
            className="w-48 h-48 object-cover "/>
          </a>

        </div>
        
        <div className="relative flex flex-col items-end shadow-md transition-transform duration-300 hover:scale-105">
          <span className="w-full bg-white bg-opacity-90 border border-gray-300 p-1 rounded-tl-md rounded-tr-md shadow-md whitespace-nowrap text-center text-sm">
          Game Systems
          </span>          
          <a href="https://github.com/yborger/Game-Systems" target="_blank" rel="noopener noreferrer">
          <img 
            src="/game_systems.jpg" 
            alt="Game Systems" 
            className="w-48 h-48 object-cover "/>
          </a>

        </div>

        <div className="relative flex flex-col items-end shadow-md transition-transform duration-300 hover:scale-105">
          <span className="w-full bg-white bg-opacity-90 border border-gray-300 p-1 rounded-tl-md rounded-tr-md shadow-md whitespace-nowrap text-center text-sm">
          Software Engineering
          </span>
          <a href="https://github.com/yborger/mystudybuddy" target="_blank" rel="noopener noreferrer">
          <img 
            src="/Software_engineering.jpg" 
            alt="Software Engineering" 
            className="w-48 h-48 object-cover "/>
          </a>

        </div>

        <div className="relative flex flex-col items-end shadow-md transition-transform duration-300 hover:scale-105">
          <span className="w-full bg-white bg-opacity-90 border border-gray-300 p-1 rounded-tl-md rounded-tr-md shadow-md whitespace-nowrap text-center text-sm">
          Computer Society
          </span>
          <a href="https://www.sccs.swarthmore.edu/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/SCCS_LOGO.jpg" 
            alt="SCCS" 
            className="w-48 h-48 object-cover "/>
          </a>

        </div>
      </div>
      </div>
      </section>
    </Layout>
  );
};

export default Coursework;
