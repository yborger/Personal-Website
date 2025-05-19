'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';

//Goal: transitions if pages are delayed
//Additional bonus goal: make home page transition special

export default function RouteLoader() {
    const pathname = usePathname(); // maintained regardless :)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 1000) //duration
        return () => clearTimeout(timeout);
    }, [pathname]);

    if(!loading) return null; //don't show if it's not in loading screen

    return(
        <div className = "fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <LoadingSpinner/>
        </div>
    );
}