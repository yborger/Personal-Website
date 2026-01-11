'use client'
import Link from 'next/link'
//import { useTheme } from 'next-themes';
//import { useEffect, useState } from 'react';

const navItems = {
  '/': {
    name: 'home',
  },
  '/about': {
    name: 'about', //will be moved elsewhere
  },
  '/contact': { //about or contact
    name: 'contact',
  }
  ,'/portfolio': { //will become portfolio section
    name: 'portfolio',
  },
  
}

export function Navbar() {
  //const { theme, setTheme } = useTheme();
  //const [mounted, setMounted] = useState(false);

  //useEffect(() => {
  //  setMounted(true);
  //}, []);

  //if (!mounted) {
  //  return null;
  //}

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="w-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 ... rounded-full lg:sticky lg:top-12">
        
        <nav
          className="container navFull flex flex-row items-start relative md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >          
          <img src="/ybLogo.png" alt="logo" className="logo h-16 w-auto" />

          <div className="navMenu flex flex-row py-4 space-x-0 pr-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all cursor-pointer hover:text-neutral-100  flex relative px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}            
          </div>
  {/* the light/dark switch */}
    <label className="lightdark py-4 m-1.5 mr-5 ml-auto cursor-pointer select-none text-dark  group">
      <div className="relative">
        <input type="checkbox" className="peer sr-only" 
          //checked={theme === 'dark'}
          //onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
        {/* the track -- it's 20% transparent white for glass effect*/}
        <div className="h-5 rounded-full w-14 bg-white/20 shadow-lg ring-1 ring-black/5"></div>
        <div
          className="absolute left-0 transition bg-white rounded-full dot shadow-switch-1 -top-1 h-7 w-7 group-has-checked:translate-x-full group-has-checked:bg-primary">
    {/* moon */}
          <span className="hidden group-has-checked:inline">
              <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="-2.5 -2 24 24" stroke="currentColor"> 
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
          </span>
    {/* sun */}
          <span className="visible group-has-checked:hidden">
              <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="-2 -2 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
          </span>
        </div>
      </div>
    </label>

           
        </nav>
      </div>
    </aside>
  )
}
