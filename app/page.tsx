import React from 'react';
import Layout from './layout';

const Page: React.FC = () => {
  return (
    <>
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
