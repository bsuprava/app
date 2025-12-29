import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import AnimatedNeonUnderline from "@/components/AnimatedNeonUnderline";
import ProfileFrame from "@/components/ProfileFrame";

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

export default function HeroSection({ profile, links, onProjects, onContact }) {
  return (
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
            {profile.headline}
          </h1>
          <AnimatedNeonUnderline />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-black/70 md:text-lg">
            {profile.subheadline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              className="rounded-xl bg-[hsl(var(--neon))] text-black shadow-[0_18px_50px_rgba(52,211,153,0.25)] transition-transform duration-200 hover:scale-[1.02]"
              onClick={onProjects}
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-black/15 bg-white text-black transition-colors hover:bg-black hover:text-white"
              onClick={onContact}
            >
              Contact Me
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {profile.trustBadges.map((b) => (
              <Card
                key={b.label}
                className="rounded-2xl border-black/10 bg-white/70 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur"
              >
                <p className="text-xs font-medium tracking-[0.12em] text-black/55">
                  {b.label}
                </p>
                <p className="mt-2 text-sm font-medium text-black">{b.value}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <PillLink href={links.linkedin} icon={Linkedin} label="LinkedIn" />
            <PillLink href={links.github} icon={Github} label="GitHub" />
            <PillLink href={`mailto:${links.email}`} icon={Mail} label="Email" />
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
  );
}
