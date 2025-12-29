import React, { useRef, useState } from "react";
import { BookOpen, ExternalLink, Github, Linkedin, Mail } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "@/hooks/use-toast";
import { loadLocalJSON, saveLocalJSON } from "@/mock";
import { SectionShell } from "@/components/portfolio/PortfolioLayout";

export function CertificationsSection({ certifications }) {
  return (
    <SectionShell
      id="certifications"
      kicker="CERTIFICATIONS"
      title="Credentials (minimal, clean)"
      description="Add or remove as needed — this layout stays quiet and premium."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {certifications.map((c) => (
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
  );
}

export function BlogSection({ posts }) {
  const [subscribeEmail, setSubscribeEmail] = useState("");

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
      title: "Subscribed (MOCK)",
      description: "Stored locally — connect to email provider later.",
    });
  };

  return (
    <SectionShell
      id="blog"
      kicker="BLOG"
      title="Insights (thought leadership)"
      description="Even ‘coming soon’ should feel intentional. Topics signal your depth."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((b) => (
          <Card
            key={b.id}
            className="rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <BookOpen className="h-4 w-4" />
              </span>
              <Badge
                className="rounded-full bg-black/5 text-black/70"
                variant="secondary"
              >
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
            <Button type="submit" className="h-11 rounded-xl bg-black text-white">
              Subscribe
            </Button>
          </form>
        </div>
      </Card>
    </SectionShell>
  );
}

export function ContactSection({ links }) {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });

  const submissionsRef = useRef(loadLocalJSON("portfolio.contactSubmissions", []));

  const submitContact = (e) => {
    e.preventDefault();

    const id =
      (crypto && typeof crypto.randomUUID === "function" && crypto.randomUUID()) ||
      String(Date.now());

    const next = [
      {
        id,
        ...contact,
        createdAt: new Date().toISOString(),
      },
      ...submissionsRef.current,
    ].slice(0, 25);

    submissionsRef.current = next;
    saveLocalJSON("portfolio.contactSubmissions", next);

    setContact({ name: "", email: "", message: "" });
    toast({
      title: "Message captured",
      description:
        "Saved locally for now. We’ll wire this to the backend when you’re ready.",
    });
  };

  return (
    <SectionShell
      id="contact"
      kicker="CONTACT"
      title="Let’s build intelligent systems together"
      description="Use the form or reach out directly. This is a frontend-only MOCK right now, but every interaction works."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
          <p className="text-sm text-black/70">
            Preferred channels (sample placeholders — replace with real links):
          </p>
          <div className="mt-5 grid gap-3">
            <a
              href={`mailto:${links.email}`}
              className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/75 transition-colors hover:border-black/20"
            >
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {links.email}
              </span>
              <ExternalLink className="h-4 w-4 opacity-60" />
            </a>
            <a
              href={links.linkedin}
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
              href={links.github}
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
            </Button>
          </form>
        </Card>
      </div>
    </SectionShell>
  );
}
