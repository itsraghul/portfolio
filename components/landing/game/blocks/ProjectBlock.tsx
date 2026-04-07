import { Code2Icon, EarthIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openLink } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectBlockProps {
  project: Project;
}

export default function ProjectBlock({ project }: ProjectBlockProps) {
  return (
    <div className="flex flex-col h-full p-4">
      <h3 className="text-sm font-bold font-mono mb-1 text-primary truncate">
        {project.name.split(" - ")[0]}
      </h3>
      <p className="text-[10px] font-mono text-muted-foreground mb-2 truncate">
        {project.stack}
      </p>
      <p className="text-xs text-muted-foreground/80 flex-1 line-clamp-2 mb-2">
        {project.description}
      </p>
      <div className="flex gap-1">
        {project.githubLink && (
          <Button
            onClick={() => openLink(project.githubLink!)}
            variant="ghost"
            size="sm"
            className="font-mono text-[10px] h-6 px-2"
          >
            <Code2Icon className="w-3 h-3 mr-1" /> Code
          </Button>
        )}
        {project.websiteLink && (
          <Button
            onClick={() => openLink(project.websiteLink!)}
            variant="ghost"
            size="sm"
            className="font-mono text-[10px] h-6 px-2"
          >
            <EarthIcon className="w-3 h-3 mr-1" /> Live
          </Button>
        )}
      </div>
    </div>
  );
}
