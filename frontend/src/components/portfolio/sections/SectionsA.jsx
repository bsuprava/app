import React from "react";
import { Layers, Code, Briefcase } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { SectionShell } from "@/components/portfolio/PortfolioLayout";

export function AboutSection({ profile }) {
  return (
    <SectionShell
      id="about"
      kicker="ABOUT"
      title="Credibility without the fluff"
      description="A quick read recruiters can scan — with clear positioning around production-grade GenAI systems."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
          <p className="text-base leading-relaxed text-black/75">
            {profile.about}
          </p>
          <div className="mt-6 grid gap-2">
            {profile.highlights.map((h) => (
              <div
                key={h}
                className="flex items-start gap-3 rounded-xl border border-black/10 bg-white px-4 py-3"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-[hsl(var(--neon))]" />
                <p className="text-sm text-black/70">{h}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-2xl border-black/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.00))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
              <Layers className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-black">What I optimize for</p>
              <p className="text-xs text-black/60">
                Reliability, evaluation, and real-world outcomes
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {["Grounded answers", "Latency budgets", "Monitoring", "Cost controls"].map(
              (x) => (
                <div
                  key={x}
                  className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3"
                >
                  <p className="text-sm text-black/70">{x}</p>
                  <Badge className="rounded-full bg-black text-white">Core</Badge>
                </div>
              ),
            )}
          </div>

          <div className="mt-6 rounded-xl border border-black/10 bg-white p-4">
            <p className="text-xs font-medium tracking-[0.12em] text-black/55">
              ATS-friendly keywords
            </p>
            <p className="mt-2 text-sm text-black/70">
              RAG • LLM orchestration • Agentic workflows • Evaluation • MLOps •
              Observability • .NET • Python
            </p>
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}

export function SkillsSection({ skills }) {
  return (
    <SectionShell
      id="skills"
      kicker="SKILLS"
      title="AI-first capability map"
      description="Grouped for fast scanning. These are the buckets hiring managers care about."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((s) => (
          <Card
            key={s.category}
            className="rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--neon))] text-black">
                <Code className="h-4 w-4" />
              </span>
              <p className="text-base font-medium text-black">{s.category}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.items.map((i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="rounded-full bg-black/5 text-black/80 hover:bg-black/10"
                >
                  {i}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}

export function ExperienceSection({ experience }) {
  return (
    <SectionShell
      id="experience"
      kicker="EXPERIENCE"
      title="Systems + impact, timeline-style"
      description="Hiring managers want scope, contribution, and outcomes — without walls of text."
    >
      <div className="grid gap-6">
        {experience.map((x) => (
          <Card
            key={x.id}
            className="rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                  <Briefcase className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-base font-medium text-black">
                    {x.role} — {x.company}
                  </p>
                  <p className="text-sm text-black/60">{x.period}</p>
                </div>
              </div>
            </div>

            <ul className="mt-5 grid gap-2">
              {x.bullets.map((b) => (
                <li key={b} className="text-sm text-black/75">
                  <span className="mr-2 text-[hsl(var(--neon))]">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
