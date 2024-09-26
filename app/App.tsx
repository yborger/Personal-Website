import React from 'react';
import RootLayout from './layout'; // Import your layout component
import './globals.css'; // Import global styles if needed

const App = ({ Component, pageProps }: { Component: React.ElementType; pageProps: any }) => {
  return (
    <RootLayout>
      <Component {...pageProps} /> {/* Renders current page */}
    </RootLayout>
  );
};

export default App;
