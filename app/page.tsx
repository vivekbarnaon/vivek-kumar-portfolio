import Hero from "./components/Hero";
import SkillsMatrix from "./components/SkillsMatrix";
import ExperienceTimeline from "./components/ExperienceTimeline";
import FeaturedProjects from "./components/FeaturedProjects";
import AchievementsEducation from "./components/AchievementsEducation";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col space-y-8 sm:space-y-12">
      {/* 1. Hero Section: The Introduction */}
      <Hero />

      {/* 2. Skills Matrix: The Toolkit (Bento Grid) */}
      <SkillsMatrix />

      {/* 3. Experience & Internships: Career Path Timeline */}
      <ExperienceTimeline />

      {/* 4. Projects: The Showcase */}
      <FeaturedProjects />

      {/* 5. Achievements & Education: Validations & Milestones */}
      <AchievementsEducation />

      {/* 6. Contact Footer */}
      <Footer />
    </div>
  );
}
