import React from 'react';
import Layout from '../layout';

const Contact: React.FC = () => {
  return (
    <Layout>
    <section className="text-spacing">
    <div className="ml-6 mr-6">
    <h2 className="text-xl font-bold">Contact Me</h2>
    <p>I&apos;d love to hear from you!</p>

    <div className="mt-6">
        <p>Email: yaelnborger@gmail.com</p>
        <p>LinkedIn: <a href="https://linkedin.com/in/yael-borger" target="_blank" rel="noopener noreferrer">linkedin.com/in/yael-borger</a></p>
        <p>GitHub: <a href="https://github.com/yborger" target="_blank" rel="noopener noreferrer">github.com/yborger</a></p>
      </div>
      <p className="mt-4">Interested in my experience? {" "}</p>
      <a
      href="/Yael-Borger-Frontend-Resume.docx" // Assuming the file is in the public folder
      download="YaelBorger_Resume.docx" // This sets the download file name
      className="text-blue-500 hover:underline"
    >
      Download my resume
    </a>
      </div>

    </section>
    </Layout>
    );
};

export default Contact;
