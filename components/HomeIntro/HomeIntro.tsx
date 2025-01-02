
"use client"

import { HOMEPAGE_INFO } from '@/constants';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

const HomeIntro = () => {
    const [showSecond, setShowSecond] = useState(false);
    const [showParagraph, setShowParagraph] = useState(false);
    const [hideFirstCursor, setHideFirstCursor] = useState(false);
    const [hideSecondCursor, setHideSecondCursor] = useState(false);

    useEffect(() => {

        const timer1 = setTimeout(() => {
            setShowSecond(true);
            setHideFirstCursor(true)
        }, 3000);

        const timer2 = setTimeout(() => {
            setShowParagraph(true)
            setHideSecondCursor(true)
        }, 6000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };

    }, []);

    return (
        <div className="flex flex-col mt-8 items-center justify-center">
            <h1 className="font-mono text-6xl mb-6">
                <span className={cn("inline-block overflow-hidden whitespace-nowrap  border-primary animate-typing animate-blink",
                    hideFirstCursor ? "border-transparent" : "border-r-4"
                )}>
                    {HOMEPAGE_INFO.GREETING}
                </span>
            </h1>
            {showSecond && <h1 className="font-mono text-6xl mb-6">
                <span className={cn("inline-block overflow-hidden leading-[1.5em] whitespace-nowrap border-primary animate-typing animate-blink",
                    hideSecondCursor ? "border-transparent" : "border-r-4"
                )}>
                    {HOMEPAGE_INFO.NAME_INFO}
                </span>
            </h1>}

            {showParagraph && <p className="font-mono text-muted-foreground text-xl inline-block text-balance overflow-hidden whitespace-normal text-center animate-fadeIn">
                {HOMEPAGE_INFO.BASIC_DESC}
            </p>}
        </div>
    )
}

export default HomeIntro