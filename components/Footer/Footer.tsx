"use client";


import React from 'react'
import { Button } from '../ui/button';
import { GithubIcon, LinkedinIcon, Mail } from 'lucide-react';
import { openLink } from '@/lib/utils';
import MagneticWrapper from '../Cursor/MagneticWrapper';

type contactLink = {
    link: string
    icon: React.ReactNode
}
const contactLinks: contactLink[] = [
    {
        link: "https://www.linkedin.com/in/raghul-s25",
        icon: <LinkedinIcon />
    },
    {
        link: "https://www.github.com/itsraghul",
        icon: <GithubIcon />
    },
    {
        link: "mailto:raghul2521@gmail.com",
        icon: <Mail />
    }
]
const Footer = () => {
    return (
        <footer className="flex items-center justify-center p-2 gap-2 h-[50px]">
            <>
                {
                    contactLinks.map((contact, index) => (
                        <MagneticWrapper key={index} strength={0.5}>
                            <Button variant={'ghost'} onClick={() => openLink(contact.link)}>
                                {contact.icon}
                            </Button>
                        </MagneticWrapper>
                    ))
                }
            </>
        </footer>
    )
}

export default Footer