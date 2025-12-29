import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronRight,
  Code,
  ExternalLink,
  Github,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";

import AnimatedNeonUnderline from "@/components/AnimatedNeonUnderline";
import ProfileFrame from "@/components/ProfileFrame";
import {
  loadLocalJSON,
  mockBlogPosts,
  mockCertifications,
  mockExperience,
  mockLinks,
  mockProfile,
  mockProjects,
  mockSkills,
  saveLocalJSON,
} from "@/mock";

const reveal = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: "easeOut" },
};

function useSectionScroll() {
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

  return { sections, scrollTo };
}

function SectionShell({ id, kicker, title, description, children }) {
  return (
    <section id={id} className="scroll-mt-28 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div {...reveal}>
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-black/55">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]" />
            <span>{kicker}</span>
          </div>
          <h2 className="mt-3 text-3xl font-light tracking-[-0.03em] text-black md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-black/70 md:text-lg">
              {description}
            </p>
          ) : null}
        </motion.div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function PillLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm text-black/75 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors hover:border-black/20 hover:text-black"
    >
      <Icon className="h-4 w-4" />
      {label}
      <ExternalLink className="h-4 w-4 opacity-60" />
    </a>
  );
}

export default function PortfolioLanding() {
  const { sections, scrollTo } = useSectionScroll();

  const [projectOpen, setProjectOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [subscribeEmail, setSubscribeEmail] = useState("");

  const notesKey = useMemo(
    () => `portfolio.projectNotes.${activeProjectId ?? "none"}`,
    [activeProjectId],
  );
  const [projectNotes, setProjectNotes] = useState(() =>
    loadLocalJSON(notesKey, ""),
  );

  const activeProject = useMemo(
    () => mockProjects.find((p) => p.id === activeProjectId) || null,
    [activeProjectId],
  );

  const openProject = (id) => {
    setActiveProjectId(id);
    const key = `portfolio.projectNotes.${id}`;
    setProjectNotes(loadLocalJSON(key, ""));
    setProjectOpen(true);
  };

  const saveNotes = () => {
    if (!activeProjectId) return;
    saveLocalJSON(`portfolio.projectNotes.${activeProjectId}`, projectNotes);
    toast({
      title: "Notes saved",
      description: "Stored locally in your browser (mocked persistence).",
    });
  };

  const contactSubmissionsRef = useRef(
    loadLocalJSON("portfolio.contactSubmissions", []),
  );

  const submitContact = (e) => {
    e.preventDefault();
    const next = [
      {
        id: crypto.randomUUID?.() ?? String(Date.now()),
        ...contact,
        createdAt: new Date().toISOString(),
      },
      ...contactSubmissionsRef.current,
    ].slice(0, 25);

    contactSubmissionsRef.current = next;
    saveLocalJSON("portfolio.contactSubmissions", next);

    setContact({ name: "", email: "", message: "" });
    toast({
      title: "Message captured",
      description:
        "Saved locally for now. We’ll wire this to the backend when you’re ready.",
    });
  };

  const subscribe = (e) => {
    e.preventDefault();
    const list = loadLocalJSON("portfolio.subscribers", []);
    const normalized = subscribeEmail.trim().toLowerCase();
    if (!normalized) {
      toast({ title: "Add an email", description: "Please enter your email." });
      return;
    }
    if (list.includes(normalized)) {
      toast({ title: "Already subscribed", description: "You’re on the list." });
      return;
    }
    saveLocalJSON("portfolio.subscribers", [normalized, ...list].slice(0, 50));
    setSubscribeEmail("");
    toast({
      title: "Subscribed (mock)",
      description: "Stored locally — connect to email provider later.",
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4">
          <a
            href="#hero"
            className="group inline-flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("hero");
            }}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white transition-transform duration-200 group-hover:scale-[1.03]">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-medium tracking-tight">
                {mockProfile.name}
              </div>
              <div className="text-xs text-black/60">AI Engineer</div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(s.id);
                }}
                className="text-sm text-black/70 transition-colors hover:text-black"
              >
                {s.label}
              </a>
            ))}
            <Button
              className="rounded-xl bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-transform duration-200 hover:scale-[1.02]"
              onClick={() => scrollTo("contact")}
            >
              Contact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="rounded-xl" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px]">
                <SheetHeader>
                  <SheetTitle>Navigate</SheetTitle>
                </SheetHeader>
                <div className="mt-6 grid gap-2">
                  {sections.map((s) => (
                    <Button
                      key={s.id}
                      variant="ghost"
                      className="justify-start rounded-xl"
                      onClick={() => scrollTo(s.id)}
                    >
                      {s.label}
                      <ChevronRight className="ml-auto h-4 w-4 opacity-60" />
                    </Button>
                  ))}
                  <Separator className="my-2" />
                  <Button
                    className="rounded-xl bg-black text-white"
                    onClick={() => scrollTo("contact")}
                  >
                    Contact
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <section id="hero" className="pt-12 md:pt-16">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 pb-10 md:grid-cols-2 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs text-black/70 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]" />
                White AI aesthetic • Neon accents (sparing)
              </div>

              <h1 className="mt-6 text-4xl font-light tracking-[-0.04em] text-black md:text-[56px] md:leading-[1.03]">
                {mockProfile.headline}
              </h1>
              <AnimatedNeonUnderline />
              <p className="mt-6 max-w-xl text-base leading-relaxed text-black/70 md:text-lg">
                {mockProfile.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="rounded-xl bg-[hsl(var(--neon))] text-black shadow-[0_18px_50px_rgba(52,211,153,0.25)] transition-transform duration-200 hover:scale-[1.02]"
                  onClick={() => scrollTo("projects")}
                >
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-black/15 bg-white text-black transition-colors hover:bg-black hover:text-white"
                  onClick={() => scrollTo("contact")}
                >
                  Contact Me
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {mockProfile.trustBadges.map((b) => (
                  <Card
                    key={b.label}
                    className="rounded-2xl border-black/10 bg-white/70 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur"
                  >
                    <p className="text-xs font-medium tracking-[0.12em] text-black/55">
                      {b.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-black">
                      {b.value}
                    </p>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <PillLink href={mockLinks.linkedin} icon={Linkedin} label="LinkedIn" />
                <PillLink href={mockLinks.github} icon={Github} label="GitHub" />
                <PillLink href={`mailto:${mockLinks.email}`} icon={Mail} label="Email" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
              className="md:justify-self-end"
            >
              <ProfileFrame />
            </motion.div>
          </div>
        </section>

        <Separator className="bg-black/10" />

        <SectionShell
          id="about"
          kicker="ABOUT"
          title="Credibility without the fluff"
          description={
            "A quick read recruiters can scan — with clear positioning around production-grade GenAI systems."
          }
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
              <p className="text-base leading-relaxed text-black/75">
                {mockProfile.about}
              </p>
              <div className="mt-6 grid gap-2">
                {mockProfile.highlights.map((h) => (
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

        <SectionShell
          id="skills"
          kicker="SKILLS"
          title="AI-first capability map"
          description="Grouped for fast scanning. These are the buckets hiring managers care about."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {mockSkills.map((s) => (
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

        <SectionShell
          id="projects"
          kicker="PROJECTS"
          title="Case studies that feel like real AI work"
          description="Each project highlights problem framing, architecture choices, tools, and measurable outcomes."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {mockProjects.map((p) => (
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

        <SectionShell
          id="experience"
          kicker="EXPERIENCE"
          title="Systems + impact, timeline-style"
          description="Hiring managers want scope, contribution, and outcomes — without walls of text."
        >
          <div className="grid gap-6">
            {mockExperience.map((x) => (
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

        <SectionShell
          id="certifications"
          kicker="CERTIFICATIONS"
          title="Credentials (minimal, clean)"
          description="Add or remove as needed — this layout stays quiet and premium."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {mockCertifications.map((c) => (
              <Card
                key={c.id}
                className="rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
              >
                <p className="text-base font-medium text-black">{c.name}</p>
                <p className="mt-2 text-sm text-black/60">
                  {c.issuer} • {c.year}
                </p>
              </Card>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="blog"
          kicker="BLOG"
          title="Insights (thought leadership)"
          description="Even ‘coming soon’ should feel intentional. Topics signal your depth."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {mockBlogPosts.map((b) => (
              <Card
                key={b.id}
                className="rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <Badge className="rounded-full bg-black/5 text-black/70" variant="secondary">
                    {b.readTime}
                  </Badge>
                </div>
                <p className="mt-4 text-base font-medium leading-snug text-black">
                  {b.title}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-full bg-black/5 text-black/80"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs text-black/60">
                  {b.status}
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-8 rounded-2xl border-black/10 bg-[linear-gradient(180deg,rgba(52,211,153,0.14),rgba(255,255,255,0))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-base font-medium text-black">
                  Get new insights when they drop
                </p>
                <p className="mt-1 text-sm text-black/65">
                  No spam. Add your email (stored locally for now).
                </p>
              </div>
              <form onSubmit={subscribe} className="flex w-full gap-3 md:w-auto">
                <Input
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-11 w-full rounded-xl md:w-[280px]"
                />
                <Button
                  type="submit"
                  className="h-11 rounded-xl bg-black text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </Card>
        </SectionShell>

        <SectionShell
          id="contact"
          kicker="CONTACT"
          title="Let’s build intelligent systems together"
          description="Use the form or reach out directly. This is a frontend-only mock right now, but every interaction works."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
              <p className="text-sm text-black/70">
                Preferred channels (sample placeholders — replace with real links):
              </p>
              <div className="mt-5 grid gap-3">
                <a
                  href={`mailto:${mockLinks.email}`}
                  className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/75 transition-colors hover:border-black/20"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {mockLinks.email}
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-60" />
                </a>
                <a
                  href={mockLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/75 transition-colors hover:border-black/20"
                >
                  <span className="inline-flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-60" />
                </a>
                <a
                  href={mockLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/75 transition-colors hover:border-black/20"
                >
                  <span className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-60" />
                </a>
              </div>
              <p className="mt-6 text-xs text-black/55">
                Tip: Once backend is live, we can send these messages via email and store them in MongoDB.
              </p>
            </Card>

            <Card className="rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
              <form onSubmit={submitContact} className="grid gap-4">
                <div>
                  <label className="text-xs font-medium tracking-[0.12em] text-black/55">
                    Your name
                  </label>
                  <Input
                    className="mt-2 h-11 rounded-xl"
                    value={contact.name}
                    onChange={(e) =>
                      setContact((s) => ({ ...s, name: e.target.value }))
                    }
                    placeholder="Jane Recruiter"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium tracking-[0.12em] text-black/55">
                    Email
                  </label>
                  <Input
                    className="mt-2 h-11 rounded-xl"
                    value={contact.email}
                    onChange={(e) =>
                      setContact((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="jane@company.com"
                    type="email"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium tracking-[0.12em] text-black/55">
                    Message
                  </label>
                  <Textarea
                    className="mt-2 min-h-[140px] rounded-xl"
                    value={contact.message}
                    onChange={(e) =>
                      setContact((s) => ({ ...s, message: e.target.value }))
                    }
                    placeholder="What role are you hiring for, and what should I prepare?"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="h-11 rounded-xl bg-[hsl(var(--neon))] text-black shadow-[0_18px_50px_rgba(52,211,153,0.22)]"
                >
                  Send message (mock)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Card>
          </div>
        </SectionShell>
      </main>

      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-black/60">
            © {new Date().getFullYear()} {mockProfile.name}. Built for high-signal AI recruiting.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="#hero"
              className="text-sm text-black/70 hover:text-black"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("hero");
              }}
            >
              Back to top
            </a>
            <span className="text-black/25">•</span>
            <button
              type="button"
              className="text-sm text-black/70 hover:text-black"
              onClick={() => {
                const count = loadLocalJSON("portfolio.contactSubmissions", []).length;
                toast({
                  title: "Local activity",
                  description: `Captured ${count} contact submission(s) in this browser.`,
                });
              }}
            >
              Check captured messages
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
