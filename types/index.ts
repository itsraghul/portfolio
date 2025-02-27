

export type Project = {
    name: string;
    stack: string;
    description: string;
    githubLink?: string;
    websiteLink?: string;
}


export type Card = {
    index: number;
    color: string;
    name: string;
    logo: string;
}