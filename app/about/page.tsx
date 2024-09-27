import React from 'react';
import Layout from '../layout';

const About: React.FC = () => {
  return (
    <Layout>
      <section className="bg-white shadow-xl ">
      <div className="ml-6 mr-6">
      <h2 className="text-xl font-bold ">About Us</h2>
      <p>This is the About page content.</p>
    {/* Add more content as needed */}
    </div></section>
    </Layout>
  );
};

export default About;
