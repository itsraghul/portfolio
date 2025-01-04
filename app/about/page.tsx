import ResumeButton from '@/components/ResumeButton/ResumeButton'
import { skills } from '@/constants/about'
import Image from 'next/image'
import React from 'react'

const page = () => {

    return (
        <div className='flex flex-col gap-2 mx-auto'>
            <h1 className='text-2xl font-semibold font-mono  text-primary' >Skills</h1>
            <RotatingSkills />
            <div className='flex items-center justify-center gap-3'>
                <span className='flex items-center font-mono'>
                    To know more about me, you can checkout the social links at below or through
                </span>
                <ResumeButton fileLink={process.env.RESUME_LINK!} />
            </div>

        </div>
    )
}

export default page;



const RotatingSkills = () => {
    return <div className="skills-wrapper">
        <div className="inner" style={{ "--quantity": skills.length } as React.CSSProperties}>
            {skills.map((skill) => (
                <div
                    key={skill.index}
                    className="skill-card"
                    style={{
                        "--index": skill.index,
                        "--color-card": skill.color,
                    } as React.CSSProperties}
                >
                    <div className="img flex items-center justify-center flex-col gap-2">
                        <span className='font-mono text-sm font-semibold'>{skill.name}</span>
                        <Image src={skill.logo} alt={`${skill.name}-logo`} width={80} height={80} />
                    </div>
                </div>
            ))}
        </div>
    </div>
}