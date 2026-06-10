import { describe, expect, it } from "vitest";
import { QUESTS } from "@/constants/quests";
import { PROJECTS } from "@/constants/projects";
import { VOYAGE_CHAPTERS } from "@/constants/voyage";
import { experience } from "@/constants/experience";
import { INVENTORY } from "@/constants/character";

describe("quest data derivation", () => {
    it("derives one quest per project", () => {
        expect(QUESTS).toHaveLength(PROJECTS.length);
    });

    it("derives rewards from each project's techDescriptions", () => {
        for (const quest of QUESTS) {
            const project = PROJECTS.find((p) => p.name === quest.projectName);
            expect(project).toBeDefined();
            const techs = Object.keys(project?.techDescriptions ?? {});
            expect(quest.rewards.map((r) => r.name)).toEqual(techs);
        }
    });

    it("maps site/git from project links, omitting empty strings", () => {
        const rsBlockchain = QUESTS.find((q) => q.projectName.startsWith("RS Blockchain"));
        expect(rsBlockchain?.site).toBeUndefined();
        expect(rsBlockchain?.git).toContain("github.com");
        const mockData = QUESTS.find((q) => q.projectName.startsWith("Mock Data"));
        expect(mockData?.site).toBe("https://www.mock-data.com");
        expect(mockData?.git).toBeUndefined();
    });

    it("gives every quest 1-5 stars and a category", () => {
        for (const quest of QUESTS) {
            expect(quest.stars).toBeGreaterThanOrEqual(1);
            expect(quest.stars).toBeLessThanOrEqual(5);
            expect(["web", "chain", "tool", "game"]).toContain(quest.category);
        }
    });
});

describe("voyage chapter mapping", () => {
    it("references only real experience entries", () => {
        for (const chapter of VOYAGE_CHAPTERS) {
            expect(experience.some((e) => e.id === chapter.experienceId)).toBe(true);
        }
    });

    it("is chronological with strictly rising bounties", () => {
        const bounties = VOYAGE_CHAPTERS.map((c) => c.bounty);
        const sorted = [...bounties].sort((a, b) => a - b);
        expect(bounties).toEqual(sorted);
        expect(new Set(bounties).size).toBe(bounties.length);
    });
});

describe("inventory derivation", () => {
    it("resolves a devicon URL for all 14 items", () => {
        expect(INVENTORY).toHaveLength(14);
        for (const item of INVENTORY) {
            expect(item.icon).toMatch(/^https:\/\/cdn\.jsdelivr\.net\//);
        }
    });
});
