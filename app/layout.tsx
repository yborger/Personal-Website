import './globals.css';
import Link from 'next/link'; // Import the Link component from Next.js


export const metadata = {
  title: 'Website: Yael Borger',
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
            <div className="bg-white shadow-xl">
              <Link href="/" className=" flex justify-center mb-6">
                <img
                  src="/art sign.png"
                  className="w-24 h-24 rounded-lg"
                  alt="Signature"
                />
              </Link>

              {/* Clickable Pages */}
              <div className="grid grid-cols-4 ">
                <Link href="/about" className="flex items-center justify-center h-12 bg-white-200 hover:underline hover:bg-gray-200 transition-all duration-300">
                  About
                </Link>
                <Link href="/contact" className="flex items-center justify-center h-12 bg-white-200 hover:underline hover:bg-gray-200 transition-all duration-300">
                  Contact
                </Link>
                <Link href="/coursework" className="flex items-center justify-center h-12 bg-white-200 hover:underline hover:bg-gray-200 transition-all duration-300">
                  Coursework
                </Link>
                <Link href="/portfolio" className="flex items-center justify-center h-12 bg-white-200 hover:underline hover:bg-gray-200 transition-all duration-300">
                  Portfolio
                </Link>
              </div>
            </div>
            {/* Render children content here */}
            <div className="">
              {children}
            </div>

             {/* Footer */}
            <div className="bg-white shadow-xl">
              <footer className="bg-white-800 text-black text-sm py-4">
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
