import React from 'react'
import WorldShell from '@/components/bridge/WorldShell'

const OthersPage = () => {
    return (
        <WorldShell world="ship" className='flex flex-col mx-auto items-center justify-center font-mono pt-24 pb-16 text-[var(--fg)]'>
            <h1 className='font-bold'>{"So, You've found the hidden page!"}</h1>
            <span> {"There's nothing much here. Just take this extra info about me."}</span>
            <h3 className='font-semibold'>My Top 7 Games</h3>
            <ul className='list-disc'>
                <li>Death Stranding</li>
                <li>Red Dead Redemption 2</li>
                <li>Elden Ring</li>
                <li>God of War</li>
                <li>Uncharted 4</li>
                <li>Spider Man</li>
                <li>Ghost of Tsushima</li>
            </ul>
        </WorldShell>
    )
}

export default OthersPage
