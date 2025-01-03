"use client"



import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { openLink } from '@/lib/utils';
import { Code2Icon, EarthIcon } from 'lucide-react';
import React from 'react'



const ProjectCard = ({ project }: { project: Project }) => {
    const { name, githubLink, websiteLink, stack, description } = project;

    return <Card className='w-[480px] h-[250px] flex bg-secondary flex-col box-content overflow-hidden project hover:scale-110 transition-transform'>
        <CardHeader className='h-[50px]'>
            <CardTitle className='font-mono font-semibold'>
                {name}
            </CardTitle>
            <CardDescription className='font-mono text-muted-foreground text-xs' >
                {stack}
            </CardDescription>
        </CardHeader>
        <CardContent className='flex-1 p-4 my-2 font-mono text-sm ml-1'>
            {description}
        </CardContent>
        <CardFooter className='flex  w-full h-[50px]'>
            <div className='flex flex-row justify-normal gap-4 w-full'>
                {githubLink && githubLink.length && <Button onClick={() => openLink(githubLink)} variant={"outline"} size={'default'} className='font-mono hover:bg-muted-foreground/20 border-secondary-foreground' title='CODE'>
                    <Code2Icon /> GITHUB
                </Button>}
                {websiteLink && websiteLink.length && <Button onClick={() => openLink(websiteLink)} variant="outline" size={'default'} className='font-mono hover:bg-muted-foreground/20 border-secondary-foreground' title='WEBSITE'>
                    <EarthIcon /> WEBSITE
                </Button>}
            </div>
        </CardFooter>
    </Card>
}

export default ProjectCard