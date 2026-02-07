//Note: This has been moved to its own file to reduce nav.tsx complexity

'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';



export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex ml-auto mr-5 py-1.5">
      {/* the light/dark switch */}
    <label className="lightdark py-4 cursor-pointer select-none text-dark  group">
      <div className="relative">
        <input 
          type="checkbox" 
          className="peer sr-only" 
          checked={resolvedTheme === 'dark'}
          onChange={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        />
        {/* the track -- it's 20% transparent white for glass effect*/}
        <div className="h-5 rounded-full w-14 bg-white/20 shadow-lg ring-1 ring-black/5"></div>
        <div
          className="dot absolute left-0 transition bg-white rounded-full shadow-switch-1 -top-1 h-7 w-7 peer-checked:translate-x-full peer-checked:bg-primary">
    {/* moon */}
          <span className="block peer-checked:hidden">
              <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="-2.5 -2 24 24" stroke="currentColor"> 
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
          </span>
    {/* sun */}
          <span className="hidden peer-checked:block">
              <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="-2 -2 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
          </span>
        </div>
      </div>
    </label>
    </div>
  );
}