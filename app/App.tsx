// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Page from './page'; // Adjust this based on your actual page file
import About from './about';
import Contact from './contact';
import Coursework from './coursework';
import Portfolio from './portfolio';
import Layout from './layout'; // Your layout file

const App: React.FC = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-300">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/about" className="mr-4">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/coursework">Coursework</Link>
        <Link to="/potfolio">Portfolio</Link>

      </nav>
      <Routes>
        <Route path="/"  Component={Page} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
        <Route path="/coursework" Component={Coursework} />
        <Route path="/portfolio" Component={Portfolio} />

      </Routes>
    </Router>
  );
};

export default App;
