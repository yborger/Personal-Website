import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch';
import ThemeSwitch2 from './ThemeSwitch2';
import ThemeSwitch3 from './ThemeSwitch3';

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

{/* Theme SWITCH component Options */}
    
    <ThemeSwitch/>
    

    {/*
    <label className="lightdark py-4 m-1.5 mr-5 ml-auto cursor-pointer select-none text-dark  group">
      <div className="relative">
        <input type="checkbox" className="peer sr-only"         />
        
        <div className="h-5 rounded-full w-14 bg-white/20 shadow-lg ring-1 ring-black/5"></div>
       <ThemeSwitch2/>
      </div>
    </label> 
    */}
        </nav>
      </div>
    </aside>
  )
}
