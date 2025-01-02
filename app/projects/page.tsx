
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import { PROJECTS } from '@/constants/projects';
import React from 'react'

const ProjectsPage = () => {
    return (
        <div className="max-w-4xl mt-8 flex flex-col items-start justify-start">
            <h2 className="text-2xl font-semibold font-mono text-primary mb-4">My Projects</h2>
            <div className='flex flex-col gap-4'>
                {PROJECTS.map((project, index) => (
                    <ProjectCard project={project} key={index} />
                ))}
            </div>

        </div >
    )
}

export default ProjectsPage;
