import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

import { loadLocalJSON, saveLocalJSON } from "@/mock";
import { SectionShell } from "@/components/portfolio/PortfolioLayout";

const reveal = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function ProjectsSection({ projects }) {
  const [projectOpen, setProjectOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) || null,
    [activeProjectId, projects],
  );

  const [projectNotes, setProjectNotes] = useState("");

  const openProject = (id) => {
    setActiveProjectId(id);
    setProjectNotes(loadLocalJSON(`portfolio.projectNotes.${id}`, ""));
    setProjectOpen(true);
  };

  const saveNotes = () => {
    if (!activeProjectId) return;
    saveLocalJSON(`portfolio.projectNotes.${activeProjectId}`, projectNotes);
    toast({
      title: "Notes saved",
      description: "Stored locally in your browser (MOCKED persistence).",
    });
  };

  return (
    <SectionShell
      id="projects"
      kicker="PROJECTS"
      title="Case studies that feel like real AI work"
      description="Each project highlights problem framing, architecture choices, tools, and measurable outcomes."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.05 }}
          >
            <Card className="group h-full rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-[0.12em] text-black/55">
                    {p.impactSnapshot}
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-tight text-black">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-black/70">{p.tagline}</p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-black transition-colors group-hover:border-black/20">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>

              <Separator className="my-5 bg-black/10" />

              <div className="grid gap-4">
                <div>
                  <p className="text-xs font-medium tracking-[0.12em] text-black/55">
                    Problem
                  </p>
                  <p className="mt-2 text-sm text-black/70">{p.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.12em] text-black/55">
                    Architecture
                  </p>
                  <ul className="mt-2 grid gap-2">
                    {p.architecture.slice(0, 2).map((a) => (
                      <li key={a} className="text-sm text-black/70">
                        <span className="mr-2 text-[hsl(var(--neon))]">•</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tools.slice(0, 4).map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-full bg-black/5 text-black/80"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button
                  className="rounded-xl bg-black text-white transition-transform duration-200 hover:scale-[1.01]"
                  onClick={() => openProject(p.id)}
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-black/15"
                  onClick={() => {
                    toast({
                      title: "Demo link (sample)",
                      description:
                        "Hook this to your live demo when ready. For now it’s placeholder.",
                    });
                  }}
                >
                  Demo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={projectOpen} onOpenChange={setProjectOpen}>
        <DialogContent className="max-w-3xl rounded-2xl">
          {activeProject ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl tracking-tight">
                  {activeProject.title}
                </DialogTitle>
                <DialogDescription>{activeProject.tagline}</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-2">
                <TabsList className="rounded-xl bg-black/5">
                  <TabsTrigger value="overview" className="rounded-lg">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="architecture" className="rounded-lg">
                    Architecture
                  </TabsTrigger>
                  <TabsTrigger value="outcome" className="rounded-lg">
                    Outcome
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="rounded-lg">
                    Notes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-5">
                  <div className="grid gap-4">
                    <Card className="rounded-2xl border-black/10 p-5">
                      <p className="text-xs font-medium tracking-[0.12em] text-black/55">
                        Problem statement
                      </p>
                      <p className="mt-2 text-sm text-black/75">
                        {activeProject.problem}
                      </p>
                    </Card>
                    <Card className="rounded-2xl border-black/10 p-5">
                      <p className="text-xs font-medium tracking-[0.12em] text-black/55">
                        Tools & frameworks
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeProject.tools.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="rounded-full bg-black/5 text-black/80"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="architecture" className="mt-5">
                  <Card className="rounded-2xl border-black/10 p-5">
                    <p className="text-xs font-medium tracking-[0.12em] text-black/55">
                      Architecture decisions
                    </p>
                    <ul className="mt-3 grid gap-2">
                      {activeProject.architecture.map((a) => (
                        <li key={a} className="text-sm text-black/75">
                          <span className="mr-2 text-[hsl(var(--neon))]">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </TabsContent>

                <TabsContent value="outcome" className="mt-5">
                  <Card className="rounded-2xl border-black/10 p-5">
                    <p className="text-xs font-medium tracking-[0.12em] text-black/55">
                      Outcome / impact
                    </p>
                    <ul className="mt-3 grid gap-2">
                      {activeProject.outcome.map((o) => (
                        <li key={o} className="text-sm text-black/75">
                          <span className="mr-2 text-[hsl(var(--neon))]">•</span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="mt-5">
                  <Card className="rounded-2xl border-black/10 p-5">
                    <p className="text-xs font-medium tracking-[0.12em] text-black/55">
                      Recruiter / reviewer notes
                    </p>
                    <p className="mt-2 text-sm text-black/60">
                      Write down discussion points. This is saved locally for now.
                    </p>
                    <Textarea
                      value={projectNotes}
                      onChange={(e) => setProjectNotes(e.target.value)}
                      className="mt-4 min-h-[120px] rounded-xl"
                      placeholder="Example: Ask about eval strategy, grounding, vector DB choice, latency budgets…"
                    />
                    <div className="mt-4 flex items-center justify-end gap-3">
                      <Button
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => setProjectNotes("")}
                      >
                        Clear
                      </Button>
                      <Button
                        className="rounded-xl bg-[hsl(var(--neon))] text-black"
                        onClick={saveNotes}
                      >
                        Save Notes
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}
