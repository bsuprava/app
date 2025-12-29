import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function ProfileFrame() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.20),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.06),transparent_55%)]" />
      <div className="relative rounded-[28px] border border-black/10 bg-white/70 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.12)] backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium tracking-tight text-black">
                Profile
              </p>
              <p className="text-xs text-black/60">
                Add headshot when ready
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70">
            <ShieldCheck className="h-4 w-4 text-[hsl(var(--neon))]" />
            Recruiter-ready
          </span>
        </div>

        <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-black/15 bg-white p-10">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 rounded-2xl bg-[linear-gradient(135deg,rgba(0,0,0,0.06),rgba(0,0,0,0.02))] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
            <p className="mt-4 text-sm font-medium text-black">Headshot placeholder</p>
            <p className="mt-1 text-xs text-black/60">
              Swap with your photo later
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-black/10 bg-white px-3 py-3">
            <p className="text-xs text-black/60">Signal</p>
            <p className="mt-1 text-sm font-semibold tracking-tight text-black">
              Systems
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white px-3 py-3">
            <p className="text-xs text-black/60">Signal</p>
            <p className="mt-1 text-sm font-semibold tracking-tight text-black">
              Impact
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white px-3 py-3">
            <p className="text-xs text-black/60">Signal</p>
            <p className="mt-1 text-sm font-semibold tracking-tight text-black">
              Reliability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
