"use client";


import React from 'react'
import { Button } from '../ui/button';
import { GithubIcon, LinkedinIcon, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="flex items-center justify-center p-2 gap-2 mt-auto h-[50px]">
            <Button variant={'ghost'}>
                <LinkedinIcon />
            </Button>
            <Button variant={'ghost'}>
                <GithubIcon />
            </Button>
            <Button variant={'ghost'}>
                <Mail />
            </Button>
        </footer>
    )
}

export default Footer