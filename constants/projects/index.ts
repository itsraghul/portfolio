import { Project } from "@/types";

export const PROJECTS: Project[] = [
    {
        name: "DataForge - Through WebScrape workflow",
        stack: "Next.js | Puppeteer | Prisma | OpenAI",
        description: "A dataset creator through webscrape workflow. Currently use AI to extract data in html and send data through webhook. Can also schedule the Workflows to run appropriately.",
        githubLink: "https://github.com/itsraghul/FlowBuilder",
        websiteLink: "https://flow-data-forge.vercel.app/"
    },
    {
        name: "Hearty-Foods - Food delivery app",
        stack: "Next.js | MongoDB | Cloudinary | Paypal API",
        description: "A food order and delivery application that allows users to order food items and pay using paypal. The admin can manage the users and create new orders and live track delivery status and update them accordingly.",
        githubLink: "https://github.com/itsraghul/hearty-foods",
        websiteLink: "https://hearty-foods.vercel.app/"
    },
    {
        name: "MediNet - Decentralized Medical Network",
        stack: "Next.js | Ethereum | Web3 | IPFS",
        description: "A Decentralised Platform that provides Patient Record Management Services and Medical Community Network for Doctors. Used IPFS for storing medical files in a secure decentralized way.",
        githubLink: "https://github.com/itsraghul/medi-net",
        websiteLink: "https://medinet.vercel.app/"
    },
    {
        name: "CampFund - Decentralized Funding Network",
        stack: "Next.js | Ethereum | Solidity | Azure",
        description: "A Decentralised Platform that provides users to gather or donate funds to support projects over blockchain. It also has Azure Chat bot to help new users to get used to funding in web3.",
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