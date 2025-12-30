import React from "react";
import {
  ArrowRight,
  ChevronRight,
  Menu,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SectionShell({ id, kicker, title, description, children }) {
  return (
    <section id={id} className="scroll-mt-28 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div>
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
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function PortfolioHeader({ profileName, sections, onNav, onContact }) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="group inline-flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            onNav("hero");
          }}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white transition-transform duration-200 group-hover:scale-[1.03]">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-medium tracking-tight">
              {profileName}
            </div>
            <div className="text-xs text-black/60">Full Stack IT Professional</div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNav(s.id);
              }}
              className="text-sm text-black/70 transition-colors hover:text-black"
            >
              {s.label}
            </a>
          ))}
          <Button
            className="rounded-xl bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-transform duration-200 hover:scale-[1.02]"
            onClick={onContact}
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
                    onClick={() => onNav(s.id)}
                  >
                    {s.label}
                    <ChevronRight className="ml-auto h-4 w-4 opacity-60" />
                  </Button>
                ))}
                <Separator className="my-2" />
                <Button
                  className="rounded-xl bg-black text-white"
                  onClick={onContact}
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
  );
}

export function PortfolioFooter({ profileName, onBackToTop, onCheckMessages }) {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-black/60">
          © {new Date().getFullYear()} {profileName}. Built for high-signal AI recruiting.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="#hero"
            className="text-sm text-black/70 hover:text-black"
            onClick={(e) => {
              e.preventDefault();
              onBackToTop();
            }}
          >
            Back to top
          </a>
          <span className="text-black/25">•</span>
          <button
            type="button"
            className="text-sm text-black/70 hover:text-black"
            onClick={onCheckMessages}
          >
            Check captured messages
          </button>
        </div>
      </div>
    </footer>
  );
}
