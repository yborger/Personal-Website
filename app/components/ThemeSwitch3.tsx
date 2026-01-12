//A youtube video tutorial I followed to create this specific file:
//https://www.youtube.com/watch?v=7zqI4qMDdg8


'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiCircle } from 'react-icons/fi';




export default function ThemeSwitch3() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() =>  setMounted(true), []);

  if (!mounted) return (
    <FiCircle />
)
  if(resolvedTheme === 'dark'){
    return <FiSun onClick={() => setTheme('light')}/>
  }
  if(resolvedTheme === 'light'){
    return <FiMoon onClick={() => setTheme('dark')}/>    
  }
}