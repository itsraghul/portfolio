"use client";

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from '../ui/button';

const ThemeToggle = () => {
    const { setTheme, theme = "light" } = useTheme();

    const onSetTheme = (theme: string) => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
    return (
        <Button variant={'ghost'} onClick={() => onSetTheme(theme)}>
            {
                theme === "light" ? <SunIcon size={16} /> : <MoonIcon size={16} />
            }
        </Button>
    )
}

export default ThemeToggle