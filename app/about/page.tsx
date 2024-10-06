import React from 'react';
import Layout from '../layout';

const About: React.FC = () => {
  return (
    <Layout>
      <section className=" text-spacing">
      <div className="ml-6 mr-6">
      <h2 className="text-xl font-bold ">About Me</h2>
      <p className="mt-4">Hi! I&apos;m Yael Borger, and I am a software developer from New Jersey. My journey into the tech world began with a fascination for problem-solving and technology, leading me to explore various programming languages and frameworks.</p>
          
          <p>Throughout my career, I have honed my skills in JavaScript, Python, and HTML/CSS, and I enjoy working across the full stack, from frontend development to backend systems. I take pride in crafting engaging user experiences that not only look great but also function smoothly and seamlessly.</p>

          <p>I have worked on projects ranging from simple applications to complex software solutions, each teaching me something new. I&apos;m particularly interested in web development and UI/UX design.</p>

          <p>When I&apos;m not coding, I enjoy crocheting, listening to podcasts, and playing D&amp;D with my friends.</p>
          
          {/* Add more content as needed */}
    </div></section>
    </Layout>
  );
};

export default About;
