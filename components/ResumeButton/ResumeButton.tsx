"use client";

import React from 'react'
import { Button } from '../ui/button';
import { FileText } from 'lucide-react';
import { openLink } from '@/lib/utils';

const ResumeButton = ({
    fileLink
}: { fileLink: string }) => {
    return (
        <Button variant={'outline'} onClick={() => openLink(fileLink)} >
            <FileText size={16} />
            Resume
        </Button>
    )
}

export default ResumeButton