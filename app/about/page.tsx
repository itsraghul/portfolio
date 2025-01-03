import { Button } from '@/components/ui/button'
import { openLink } from '@/lib/utils'
import { ArrowDown, FileText } from 'lucide-react'
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
            <Button variant={'outline'} onClick={() => openLink(process.env.RESUME_LINK!)} >
                <FileText size={16} />
                Resume
            </Button>
        </div>
    )
}

export default page