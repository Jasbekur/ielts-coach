import Link from "next/link";
import { GraduationCap, Zap, Target, Mic, BookOpen, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Zap,
    title: "Results in 15 seconds",
    desc: "Paste your essay or record yourself speaking. Gemini 2.0 Flash scores you faster than any human examiner.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950",
  },
  {
    icon: Target,
    title: "Examiner-grade accuracy",
    desc: "Scores across all 4 official IELTS criteria — Task Response, Coherence, Lexical Resource, and Grammar.",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950",
  },
  {
    icon: BookOpen,
    title: "Band 8 rewrites included",
    desc: "Every submission gets a full Band 8 model answer, corrections with explanations, and your next 3 drills.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950",
  },
];

const skills = [
  "Band score per criterion (0–9 scale)",
  "Sentence-level corrections with reasons",
  "Full Band 8 model essay or answer",
  "Pronunciation coaching for Speaking",
  "Verbatim transcript with filler tags",
  "Personalised next-step drills",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm">IELTS AI Coach</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-violet-500 hover:bg-violet-600 text-white">Start free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-20 text-center">
        <Badge variant="outline" className="mb-5 text-xs border-violet-200 text-violet-600">
          Powered by Gemini 2.0 Flash
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
          Get your IELTS band score{" "}
          <span className="text-violet-500">in 15 seconds</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Paste an essay or record yourself speaking. Get examiner-grade band scores,
          sentence-level corrections, and a Band 8 rewrite — instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg" className="w-full sm:w-auto gap-2 bg-violet-500 hover:bg-violet-600 text-white px-8">
              Start practicing free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              I have an account
            </Button>
          </Link>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          10 free attempts per day · No credit card required
        </p>
      </section>

      {/* Mock score display */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <div className="border border-border rounded-2xl bg-card overflow-hidden shadow-sm">
          <div className="border-b border-border bg-muted px-4 py-2.5 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">ielts-ai.coach/writing</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
              {[
                { label: "Task Response", band: 7.0, color: "text-emerald-500" },
                { label: "Coherence", band: 6.5, color: "text-emerald-500" },
                { label: "Lexical Resource", band: 6.0, color: "text-amber-500" },
                { label: "Grammar", band: 6.5, color: "text-emerald-500" },
              ].map(({ label, band, color }) => (
                <div key={label} className="flex flex-col items-center gap-1 border rounded-lg p-3">
                  <span className={`font-mono font-bold text-2xl ${color}`}>{band.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground text-center">{label}</span>
                </div>
              ))}
            </div>
            <div className="border rounded-lg p-3 bg-muted/50">
              <p className="text-xs font-medium text-muted-foreground mb-2">Sample correction</p>
              <div className="text-sm">
                <span className="line-through text-red-500">
                  &ldquo;The amount of people who uses social media are increasing.&rdquo;
                </span>
              </div>
              <div className="text-sm mt-1">
                <span className="text-emerald-600 font-medium">
                  &ldquo;The number of people who use social media is increasing.&rdquo;
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Subject-verb agreement + wrong quantifier for countable nouns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Everything you need to improve fast</h2>
          <p className="text-muted-foreground text-sm">
            Built for IELTS candidates in Tashkent and beyond
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="border border-border rounded-xl p-5">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="border border-border rounded-2xl p-8 bg-card">
          <div className="grid sm:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">What you get with every attempt</h2>
              <p className="text-muted-foreground text-sm mb-6">
                No vague feedback — specific corrections that move your score up.
              </p>
              <ul className="space-y-2.5">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 border rounded-xl p-4 bg-background">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                  </div>
                  <span className="font-medium text-sm">Writing</span>
                </div>
                <p className="text-xs text-muted-foreground">Task 1 Academic report + Task 2 essay scoring with full corrections</p>
              </div>
              <div className="flex-1 border rounded-xl p-4 bg-background">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    <Mic className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <span className="font-medium text-sm">Speaking</span>
                </div>
                <p className="text-xs text-muted-foreground">Parts 1, 2 (Cue Card with prep timer), and 3 with pronunciation coaching</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 mb-20 text-center">
        <div className="bg-violet-500 rounded-2xl px-8 py-12 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to hit your target band?</h2>
          <p className="text-violet-100 mb-6 text-sm">
            Join thousands of IELTS candidates getting smarter feedback, faster.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 font-semibold px-8">
              Start free — 10 attempts/day
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-violet-500 flex items-center justify-center">
              <GraduationCap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium">IELTS AI Coach</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Not affiliated with the British Council or IDP.
          </p>
        </div>
      </footer>
    </div>
  );
}
