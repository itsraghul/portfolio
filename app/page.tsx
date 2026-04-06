import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import FeaturedWork from "@/components/landing/FeaturedWork";
import QuickLinks from "@/components/landing/QuickLinks";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <StatsBar />
      <FeaturedWork />
      <QuickLinks />
    </div>
  );
}
