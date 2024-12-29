"use client";


import { SunIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Logo from "../../public/images/PortfolioLogo-transparent.png"

const pageLinks: string[] = ["experience", "projects", "about", "others"]

const NavBar = () => {
    return (
        <nav className='py-4 shadow-md fixed top-0 left-0 w-full z-50 bg-inherit'>
            <div className='container mx-auto flex justify-between items-center px-4'>
                <Link href={`/`} className='cursor-pointer font-extrabold italic'>
                    <Image
                        src={Logo}
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
                        <SunIcon size={16} />
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default NavBar