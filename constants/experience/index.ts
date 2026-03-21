type experience = {
    id: number;
    title: string;
    description: string[];
    links: string;
    date: string;
}


export const experience: experience[] = [
    {
    id: 0,
    title: "Founding Software Engineer – Velt",
    description: [
        "Leading development and architecture of Velt Developer Console and Superflow collaboration platform, enabling real-time in-app workflows and integrations",
        "Designed and built scalable workflow automation system (triggers, actions, two-way sync) integrating platforms like Slack, Asana, ClickUp, and more",
        "Architected and maintained multi-tenant backend systems using Firebase (Firestore, Cloud Functions, Cloud Run) ensuring high scalability and reliability",
        "Developing AI-powered features including context-aware automation, intelligent processing nodes, and workflow decision systems",
        "Implemented high-performance data pipelines and analytics integrations (BigQuery, Amplitude, Mixpanel) to process hundreds of millions of events",
        "Optimized system performance and reduced latency through caching strategies, efficient querying, and distributed task processing (Cloud Tasks)",
        "Collaborating across product, design, and DevOps to deliver production-grade features with robust CI/CD pipelines and monitoring"
    ],
    links: "https://velt.dev",
    date: "March 2025 - Present"
    },
    {
        id: 2,
        title: "Full Stack Developer – ZOHO Corporation",
        description: [
            "Developed and optimized core front-end features using React and Redux, increasing user interaction efficiency by 15% ",
            "Minimized UI errors by covering automated test cases using Playwright",
            "Designed and engineered over 10+ REST APIs for features in Java and covered test cases using JUnit5",
            "Decreased server load by 80% for a feature API by implementing an efficient caching mechanism using Redis and browser storage",
            "Collaborated with DevOps and QA teams to ensure smooth, error-free deployments in CI/CD pipelines across different staging and production environments"
        ],
        links: "",
        date: "June 2023 - March 2025"
    },
    {
        id: 3,
        title: "Project Trainee – ZOHO Corporation",
        description: [
            "Implemented the front-end application for an internal Desk product tool using React, improving developer feature testing and product feature development",
            "Reduced feature creation time by over 20% through UI improvements",
            "Identified and resolved legacy code bugs by applying appropriate design patterns, refactored code in adherence to SOLID principles, reducing defects, enhancing maintainability and reducing code length by 25% ",
            "Composed and delivered a comprehensive course program for internal developers",
            "Increased user efficiency and lowered onboarding time by 50% through the course"
        ],
        date: "Jan 2023 - May 2023",
        links: "",
    },
    {
        id: 4,
        title: "Microsoft Azure Virtual Internship under FutureReadyTalent",
        description: [
            "Studied about Azure Technologies and worked on an individual project integrating Azure technologies such as Azure Bot in the project to complete the internship."
        ],
        date: "Oct 2021 - Mar 2022",
        links: "",
    },
];
