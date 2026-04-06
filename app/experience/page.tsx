import ExperienceHeader from "@/components/experience/ExperienceHeader";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <ExperienceHeader />
      <ExperienceTimeline />
    </div>
  );
}
