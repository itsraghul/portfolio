import { experience } from '@/constants/experience';
import { cn } from '@/lib/utils';
import { CircleSlash2Icon } from 'lucide-react';
import React from 'react'

const ExperiencePage = () => {


    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Experience</h2>
            <div className="relative border-l border-gray-300">
                {experience.map((exp, index) => (
                    <div
                        key={exp.id}
                        className={cn(
                            "mb-8 ml-4",
                            index === experience.length - 1 ? "pb-0" : "pb-8"
                        )}
                    >
                        <div
                            className={cn(
                                "absolute w-8 h-8 rounded-full -left-4 flex items-center justify-center"
                            )}
                        >
                            <CircleSlash2Icon className="w-5 h-5 bg-white" />
                        </div>
                        <div className="ml-6">
                            <h3 className="text-lg font-medium text-gray-800">{exp.title}</h3>
                            <span className="text-md text-gray-500">{exp.date}</span>
                            <ul>
                                {
                                    exp.description.map((description, index) => (
                                        <li className="text-md text-gray-600 list-none" key={index}>{description}</li>
                                    ))
                                }
                            </ul>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExperiencePage
