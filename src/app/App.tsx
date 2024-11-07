import React from 'react';
import { AppProps } from 'next/app'; // Import AppProps from next/app

import RootLayout from './layout'; // Import your layout component
import './globals.css'; // Import global styles if needed

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} /> {/* Renders current page */}
    </RootLayout>
  );
};

export default App;
