import ResumeButton from '@/components/ResumeButton/ResumeButton'
import { ArrowDown } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='flex items-center justify-center gap-3'>
            <span>
                To know more about me, you can checkout the social links at below
            </span>
            <ArrowDown size={18} />
            <span>
                or through my
            </span>
            <ResumeButton fileLink={process.env.RESUME_LINK!} />
        </div>
    )
}

export default page