import { Project } from "@/types";

export const PROJECTS: Project[] = [
    {
        name: "Mock Data - Generate Realistic fake data",
        stack: "Next.js | Faker.js | TailwindCSS",
        description: "I built this platform to simplify the process of designing and generating mock data for developers, testers, and teams working on real-world applications. Whether you're building an app, testing APIs, or need sample datasets for your projects, this tool is here to make it fast, reliable, and fully customisable.The mock data generator currently supports 26 different data categories and allows you to create nearly 200+ unique types of data, catering to diverse application and testing needs. Currently supports generation of fake data in 43 different languages.",
        githubLink: "",
        websiteLink: "https://www.mock-data.com"
    },
    {
        name: "DataForge - Through WebScrape workflow",
        stack: "Next.js | Puppeteer | Prisma | OpenAI",
        description: "A dataset creator for ML models through Web-scrape workflows. Allows users to create web-scraping workflows with various configuration to create web-scraping workflow to collect data for dataset. It has AI integration that allows AI to extract necessary selectors and data from website. Also has facilities to schedule the workflow to appropriate times using cron syntax. Currently can send the data through webhook. In future, In house dataset storage and marketplace for selling datasets will be implemented.",
        githubLink: "https://github.com/itsraghul/FlowBuilder",
        websiteLink: "https://flow-data-forge.vercel.app/"
    },
    {
        name: "Hearty-Foods - Food delivery app",
        stack: "Next.js | MongoDB | Cloudinary | Paypal API",
        description: "Hearty Foods is a food order and delivery site build using NextJS. It has MongoDB for data storage and Material UI for styling.User can be able to order food and see their order history.Payment can be made with cash or through Paypal.The Admin(owner) can create new dishes and administer the orders made by the users and check the total collection and all the data. It was build using several apis like JSCookies, Cloudinary, JWToken and so on for various features.",
        githubLink: "https://github.com/itsraghul/hearty-foods",
        websiteLink: "https://hearty-foods.vercel.app/"
    },
    {
        name: "MediNet - Decentralized Medical Network",
        stack: "Next.js | Ethereum | Web3 | IPFS",
        description: "A Decentralized Platform that provides Patient Record Management Services and Medical Community Network for Doctors. Platform allows patient to have control over their medical record. And doctors to form their own medical networks for better patient diagnosis. The files shared in the platform are done using IPFS.",
        githubLink: "https://github.com/itsraghul/medi-net",
        websiteLink: "https://medinet.vercel.app/"
    },
    {
        name: "CampFund - Decentralized Funding Network",
        stack: "Next.js | Ethereum | Solidity | Azure",
        description: "An Open-Public Project Fund Raising Site. Uses Ethereum for exchange of funds. User can create their own project fund by deploying the smart contract instance with the help of this site. The Fund Raising Contract Factory have been deployed to Rinkeby Test Network. The Users need a Metamask Account and RinkebyEther to transfer and fund cryptocoins. A Project Fund manager can create a new request for projects and need the approval of contributors.All project changes are open and seen by the contributors which prevents embezzlement.Added Azure Chat bot for customer help.",
        githubLink: "https://github.com/itsraghul/camp-fund",
        websiteLink: "https://my-camp-fund.vercel.app/"
    },
    {
        name: "RS Blockchain - A miniature blockchain",
        stack: "Javascript | Redis ",
        description: "A miniature block chain built using Javascript. It uses redis pub-sub model for blockchain transaction and mining.",
        githubLink: "https://github.com/itsraghul/rs-blockchain/",
        websiteLink: ""
    },
    {
        name: "TriviaWebApp",
        stack: "Javascript | HTML | CSS ",
        description: "A simple triva app that gives you random trivia quesitons. The highscores are stored in browser storage for user understanding.",
        githubLink: "https://github.com/itsraghul/TriviaWebApp",
        websiteLink: "https://trivia-web-app.vercel.app/"
    },
    {
        name: "Cosmic Breakout- Endless Runner Mobile Game",
        stack: "GDevelop5 ",
        description: "A endless runner mobile game developed using GDevelop5.",
        githubLink: "https://github.com/itsraghul/CosmicBreakoutGameAndroid",
        websiteLink: ""
    },

]