

export type Project = {
    name: string;
    stack: string;
    description: string;
    githubLink?: string;
    websiteLink?: string;
    category?: string;
    featured?: boolean;
    techDescriptions?: Record<string, string>;
}


export type Card = {
    index: number;
    color: string;
    name: string;
    logo: string;
}