import './globals.css';
import Link from 'next/link'; // Import the Link component from Next.js
import Image from 'next/image';

export const metadata = {
  title: 'Yael N Borger',
  description: 'A portfolio website showcasing projects and coursework built with React, Next.js, and Tailwind CSS. View the code on GitHub.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="en">
      <body>
        <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(clouds.jpg)' }}>

          {/* Container of page content */}
          <div className=" rounded-lg  p-8 m-8 w-full max-w-4xl">
            {/* Signature-ish Image at the Top */}
            <header role="banner" className="bg-white shadow-xl">
              <Link href="/" className=" flex justify-center mb-6">
                <Image 
                  src="/art sign.png"
                  className="w-24 h-24 rounded-lg"
                  alt="Signature"
                  height={50}
                  width={50}
                />
              </Link>

              {/* Clickable Pages */}
              <nav role="navigation" className="grid grid-cols-3 ">
                <Link href="/about" className="flex items-center justify-center h-12 bg-white-200 hover:underline hover:bg-gray-200 transition-all duration-300">
                  About
                </Link>
                <Link href="/contact" className="flex items-center justify-center h-12 bg-white-200 hover:underline hover:bg-gray-200 transition-all duration-300">
                  Contact
                </Link>
                {/*<Link href="/portfolio" className="flex items-center justify-center h-12 bg-white-200 hover:underline hover:bg-gray-200 transition-all duration-300">
                  Portfolio
                </Link>
                */}
                <Link href="/projects" className="flex items-center justify-center h-12 bg-white-200 hover:underline hover:bg-gray-200 transition-all duration-300">
                  Projects
                </Link>
                
              </nav>
            </header>
            {/* Render children content here */}
            <main role="main" className="bg-white p-8 shadow-xl">
              {children}
            </main>
             {/* Footer */}
            <div className=" ">
              <footer role="contentinfo" className="text-black text-sm py-4">
              <p>
                &copy; {currentYear} Yael Borger. This project is 
                <a href="https://github.com/yborger/website" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600"> open source </a> 
                and licensed under the 
                <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600"> MIT License</a>. 
                Built with React, Next.js, and Tailwind CSS.
              </p>
              </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
