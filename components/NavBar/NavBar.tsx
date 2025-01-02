"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import LogoLight from "../../public/images/PortfolioLogo-transparent.png";
import LogoDark from "../../public/images/PortfolioLogoDark-transparent.png";
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useTheme } from 'next-themes';

const pageLinks: string[] = ["experience", "projects", "about", "others"]

const NavBar = () => {
    const { theme } = useTheme();
    const LOGO = theme === "dark" ? LogoDark : LogoLight;
    return (
        <nav className='py-4 shadow-md fixed top-0 left-0 w-full z-50 bg-inherit'>
            <div className='container mx-auto flex justify-between items-center px-4'>
                <Link href={`/`} className='cursor-pointer font-extrabold italic'>
                    <Image
                        src={LOGO}
                        alt={"Raghul Logo"}
                        width={30}
                        height={30}
                    />
                </Link>
                <ul className='flex-row flex gap-4 items-center justify-evenly'>
                    <>
                        {pageLinks.map((link: string) => (
                            <li key={link}>
                                <Link href={`/${link}`} className='cursor-pointer hover:underline'>
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </>
                    <li>
                        <ThemeToggle />
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default NavBar