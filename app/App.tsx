// src/app.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Routes and Route
import Layout from './layout'; // Ensure correct import for your Layout component
import Page from './page'; // Import your main page component
import About from './about'; // Import the About page component
import Contact from './contact'; // Import the Contact page component
import Coursework from './coursework'; // Import the Coursework page component
import Portfolio from './portfolio'; // Import the Portfolio page component

const App: React.FC = () => {
  return (
    <Layout> {/* Use Layout to wrap the Routes */}
      <Routes>
        <Route path="/" element={<Page />} /> {/* Main home page */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/coursework" element={<Coursework />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Layout>
  );
};

export default App;
