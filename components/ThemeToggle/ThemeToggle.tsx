"use client";

import { LucideIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from '../ui/button';

const ThemeRegistry: Record<string, LucideIcon> = {
    'light': SunIcon,
    'dark': MoonIcon
}
const ThemeToggle = () => {
    const { setTheme, theme } = useTheme();

    const onSetTheme = (theme: string | undefined) => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
    const ICON = theme ? ThemeRegistry[theme] : ThemeRegistry['light'];
    return (
        <>
            <Button variant={'ghost'} onClick={() => onSetTheme(theme)}>
                <ICON size={16} />
            </Button>
        </>
    )
}

export default ThemeToggle