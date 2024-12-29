"use client";


import React from 'react'
import { Button } from '../ui/button';
import { GithubIcon, LinkedinIcon } from 'lucide-react';

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
    }
]
const Footer = () => {

    const onContactClick = (link: string) => {
        window.open(link, "_blank");
    }
    return (
        <footer className="flex items-center justify-center p-2 gap-2 h-[50px]">
            <>
                {
                    contactLinks.map((contact, index) => (
                        <Button variant={'ghost'} key={index} onClick={() => onContactClick(contact.link)}>
                            {contact.icon}
                        </Button>
                    ))
                }
            </>
            {/* <Button variant={'ghost'}>
                <Mail />
            </Button> */}
        </footer>
    )
}

export default Footer