import './globals.css';
import Link from 'next/link'; // Import the Link component from Next.js


export const metadata = {
  title: 'Website: Yael Borger',
  description: 'Website generated by create next app, designed and used by Yael Borger',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(clouds.jpg)' }}
        >
          {/* Container of page content */}
          <div className="bg-white rounded-lg shadow-xl p-8 m-8 w-full max-w-4xl">
            {/* Signature-ish Image at the Top */}
            <Link href="/" className="flex justify-center mb-6">
              <img
                src="/art sign.png"
                className="w-24 h-24 rounded-lg"
                alt="Signature"
              />
            </Link>

            {/* Clickable Pages */}
            <div className="grid grid-cols-4 gap-4">
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

            {/* Render children content here */}
            <div className="mt-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
