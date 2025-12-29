import React, { useMemo } from "react";

import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

import {
  loadLocalJSON,
  mockBlogPosts,
  mockCertifications,
  mockExperience,
  mockLinks,
  mockProfile,
  mockProjects,
  mockSkills,
} from "@/mock";

import {
  PortfolioFooter,
  PortfolioHeader,
} from "@/components/portfolio/PortfolioLayout";
import HeroSection from "@/components/portfolio/sections/HeroSection";
import ProjectsSection from "@/components/portfolio/sections/ProjectsSection";
import {
  AboutSection,
  ExperienceSection,
  SkillsSection,
} from "@/components/portfolio/sections/SectionsA";
import {
  BlogSection,
  CertificationsSection,
  ContactSection,
} from "@/components/portfolio/sections/SectionsB";

export default function Portfolio() {
  const sections = useMemo(
    () => [
      { id: "projects", label: "Works" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "blog", label: "Insights" },
      { id: "contact", label: "Contact" },
    ],
    [],
  );

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <PortfolioHeader
        profileName={mockProfile.name}
        sections={sections}
        onNav={scrollTo}
        onContact={() => scrollTo("contact")}
      />

      <main>
        <HeroSection
          profile={mockProfile}
          links={mockLinks}
          onProjects={() => scrollTo("projects")}
          onContact={() => scrollTo("contact")}
        />

        <Separator className="bg-black/10" />

        <AboutSection profile={mockProfile} />
        <SkillsSection skills={mockSkills} />
        <ProjectsSection projects={mockProjects} />
        <ExperienceSection experience={mockExperience} />
        <CertificationsSection certifications={mockCertifications} />
        <BlogSection posts={mockBlogPosts} />
        <ContactSection links={mockLinks} />
      </main>

      <PortfolioFooter
        profileName={mockProfile.name}
        onBackToTop={() => scrollTo("hero")}
        onCheckMessages={() => {
          const count = loadLocalJSON("portfolio.contactSubmissions", []).length;
          toast({
            title: "Local activity",
            description: `Captured ${count} contact submission(s) in this browser.`,
          });
        }}
      />
    </div>
  );
}
