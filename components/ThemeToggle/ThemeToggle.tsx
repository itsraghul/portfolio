"use client";

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';

const ThemeToggle = () => {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const onSetTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <Button variant={'ghost'} onClick={onSetTheme}>
            {mounted ? (
                theme === "light" ? <SunIcon size={16} /> : <MoonIcon size={16} />
            ) : (
                <span className="w-4 h-4" />
            )}
        </Button>
    )
}

export default ThemeToggle