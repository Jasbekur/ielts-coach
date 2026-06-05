"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { EssayEditor } from "@/components/writing/EssayEditor";
import { ScoreCard } from "@/components/writing/ScoreCard";
import { CorrectionsView } from "@/components/writing/CorrectionsView";
import { BandRewrite } from "@/components/writing/BandRewrite";
import { WritingResult } from "@/types/ielts";
import { Loader2, FileText, RotateCcw, RefreshCw, Timer, ChevronDown, ChevronUp, Shuffle, ImagePlus, X, BarChart3 } from "lucide-react";
import { wordCount } from "@/lib/utils/word-count";
import { TASK1_PRACTICE } from "@/lib/data/task1-practice";
import { useLocalDraft } from "@/hooks/useLocalDraft";
import { ShareScoreCard } from "@/components/shared/ShareScoreCard";

// ─── GT Task 1 Letter Questions ───────────────────────────────────────────
const GT_TASK1_QUESTIONS = [
  { type: "formal", q: "You recently stayed at a hotel and experienced serious problems with the service. Write a letter to the hotel manager. In your letter:\n• describe the problems you experienced\n• explain how they affected your stay\n• say what action you would like the hotel to take" },
  { type: "informal", q: "A friend has asked for your advice about moving to the city where you live. Write a letter to your friend. In your letter:\n• describe what it is like to live in your city\n• suggest some things your friend could do to settle in\n• explain what challenges they might face" },
  { type: "semi-formal", q: "You have seen an advertisement for a part-time job at a local company. Write a letter to the company manager. In your letter:\n• explain why you are interested in the job\n• describe your relevant experience and skills\n• say when you would be available for an interview" },
  { type: "formal", q: "You recently bought a household appliance that stopped working after one week. Write a letter to the manufacturer. In your letter:\n• describe the product and when you bought it\n• explain what the problem is\n• say what you want the manufacturer to do" },
  { type: "informal", q: "You are going abroad to study next year. Write a letter to your English-speaking pen friend who lives in that country. In your letter:\n• explain why you are coming to their country\n• ask for advice on finding accommodation\n• suggest meeting up when you arrive" },
  { type: "formal", q: "You feel that a local park in your area needs to be improved. Write a letter to the local council. In your letter:\n• explain what the park is like now\n• describe the improvements you think should be made\n• explain the benefits these improvements would bring" },
  { type: "semi-formal", q: "Your employer has asked staff to suggest ways to improve the working environment. Write a letter to your manager. In your letter:\n• describe the current working conditions\n• suggest two or three specific improvements\n• explain how these changes would benefit the company" },
  { type: "informal", q: "You borrowed something important from a friend but unfortunately it was damaged. Write a letter to your friend. In your letter:\n• explain what happened to the item\n• apologise for the damage\n• say what you intend to do about it" },
];

// ─── Question banks ────────────────────────────────────────────────────────
const TASK2_QUESTIONS = [
  { type: "discuss_both_views", q: "Some believe that lowering the speed limit will lead to maximum road safety; others believe there are many other ways to improve road safety. Discuss both views and give your opinion." },
  { type: "opinion", q: "Social media has done more harm than good to society. To what extent do you agree or disagree?" },
  { type: "problem_solution", q: "The number of children who read books for fun has dropped dramatically in recent years. What are the reasons for this? How can we encourage children to read more?" },
  { type: "direct_question", q: "We live in a world in which we are constantly exposed to advertising. To what extent does advertising influence our choices as customers, and what effects does it have on our lifestyle?" },
  { type: "opinion", q: "Students should pay the full cost for their own study, because university education benefits individuals rather than society. To what extent do you agree or disagree?" },
  { type: "discuss_both_views", q: "Online learning is just as effective as classroom learning. Discuss both views and give your opinion." },
  { type: "opinion", q: "A considerable amount of advertising today is directed at children. Should it be banned because of its adverse effects? To what extent do you agree or disagree?" },
  { type: "problem_solution", q: "Air pollution in major cities is reaching dangerous levels. What are the causes and what solutions can be suggested?" },
  { type: "discuss_both_views", q: "Some people think libraries are no longer necessary, while others disagree. Discuss both views and give your opinion." },
  { type: "opinion", q: '"Prevention is better than cure." Researching and treating diseases is too costly, so it would be better to invest in preventive measures. To what extent do you agree?' },
  { type: "discuss_both_views", q: "Some believe the government should provide financial support to elderly people after retirement. Others say individuals should save during their working years to fund their own retirement. What is your opinion?" },
  { type: "problem_solution", q: "Mental health problems among young people are increasing. What are the reasons for this and what can be done?" },
  { type: "opinion", q: "Children should not be allowed to own smartphones before the age of 16. To what extent do you agree or disagree?" },
  { type: "advantages_disadvantages", q: "More tourists are visiting places where conditions are difficult, such as the Sahara desert or Antarctica. What are the advantages and disadvantages?" },
  { type: "discuss_both_views", q: "Some companies sponsor sports as a way to advertise themselves. Some think it is positive; others think it has disadvantages. Discuss both sides and give your opinion." },
  { type: "opinion", q: "Wealth does not necessarily guarantee happiness. To what extent do you agree with this statement?" },
  { type: "problem_solution", q: "The world is experiencing a dramatic increase in population, causing problems for both poor and developed nations. Describe some of the problems overpopulation causes and suggest at least one possible solution." },
  { type: "opinion", q: "Working from home benefits employees more than employers. To what extent do you agree?" },
  { type: "discuss_both_views", q: "Some think all lawbreakers should be sent to prison; others believe minor crimes deserve alternatives such as community work. Discuss both views and give your opinion." },
  { type: "direct_question", q: "Many believe we have become a 'disposable' society, throwing things away rather than repairing them. Why do you think this is? What problems can it cause?" },
  { type: "opinion", q: "In many countries, the increase in crime rate has been blamed on violent images on television and in computer/video games. To what extent do you agree or disagree?" },
  { type: "discuss_both_views", q: "Some say films must be seen in cinemas to be fully enjoyed; others say watching them on phones and tablets is enough. Discuss both views and give your opinion." },
  { type: "problem_solution", q: "People today are suffering more stress-related problems than in the past. What are the causes and the possible effects?" },
  { type: "opinion", q: "Due to the rapid expansion of supermarkets, many small local businesses are unable to compete. The closure of local businesses brings about the death of local communities. To what extent do you agree or disagree?" },
  { type: "discuss_both_views", q: "Some believe more academic subjects (chemistry, physics, history) should be taught in schools, while others believe practical subjects (mechanics, cooking) are more beneficial. Discuss both views." },
  { type: "advantages_disadvantages", q: "More and more people choose to work from home rather than commute. Do the advantages outweigh the disadvantages?" },
  { type: "opinion", q: "Homework is not necessary for students' development. Do you agree or disagree?" },
  { type: "problem_solution", q: "Traffic congestion in big cities is a serious problem. What are the causes and what measures could reduce it?" },
  { type: "discuss_both_views", q: "Some say schools should be socially responsible for encouraging children to avoid junk food; others believe parents should take this responsibility. Discuss both views." },
  { type: "opinion", q: "Famous people deserve to have their private lives respected by the media. To what extent do you agree or disagree?" },
  { type: "direct_question", q: "Scientists predict that in the future, cars will be driven by computers. What are the reasons behind this? Is it a positive or negative development?" },
  { type: "discuss_both_views", q: "Some believe success in life comes from taking risks or chances. Others believe it comes from careful planning. In your opinion, where does success come from?" },
  { type: "problem_solution", q: "Plastic waste is polluting oceans worldwide. What are the main causes and what can governments and individuals do?" },
  { type: "opinion", q: "Without capital punishment, our lives are less secure and violent crime increases. Capital punishment is essential to control violence. To what extent do you agree or disagree?" },
  { type: "discuss_both_views", q: "Some say women should be given equal chances to work and excel in careers; others believe a woman's role should be limited to home and children. Which view do you agree with?" },
  { type: "opinion", q: "Scientific research is most effective when done by private companies. To what extent do you agree or disagree?" },
  { type: "discuss_both_views", q: "Having more money and less free time is better than earning less money and having more free time. Discuss both views and give your opinion." },
  { type: "problem_solution", q: "Many languages are dying out around the world. Why is this happening and what can be done to prevent it?" },
  { type: "opinion", q: "It is important to give children the freedom to act independently and make their own decisions from an early age. To what extent do you agree or disagree?" },
  { type: "advantages_disadvantages", q: "Online shopping is becoming more popular than shopping in physical stores. Do the advantages outweigh the disadvantages?" },
  { type: "discuss_both_views", q: "Some believe museums and art galleries should be free; others think they should charge admission. Discuss both views and give your opinion." },
  { type: "opinion", q: "Farmers should be protected by tariffs on imported food. Such policies are necessary and should be implemented wherever possible. To what extent do you agree?" },
  { type: "problem_solution", q: "Many young people are leaving rural areas to live in cities. What problems does this cause and what solutions can you suggest?" },
  { type: "discuss_both_views", q: "Some prefer to live in small towns; others prefer big cities. Discuss both lifestyles and give your opinion." },
  { type: "opinion", q: "People should be at least 21 years old before they are allowed to drive a car. To what extent do you agree or disagree?" },
  { type: "direct_question", q: "More people now read books on electronic devices rather than printed books. Why is this happening? Is it a positive or negative development?" },
  { type: "discuss_both_views", q: "Some believe English should be the global language; others think every country should preserve its own. Discuss both views." },
  { type: "problem_solution", q: "Many cities suffer from a shortage of affordable housing. What causes this and how can governments solve it?" },
  { type: "opinion", q: "Some modern artists receive huge sums for what they create, while others struggle to survive. Governments should take steps to resolve this unfair situation. To what extent do you agree or disagree?" },
  { type: "advantages_disadvantages", q: "Cashless payment systems are replacing physical money in many countries. Do the advantages outweigh the disadvantages?" },
  { type: "discuss_both_views", q: "Some think team sports like football are more beneficial; others think individual sports like swimming are better. Discuss both views." },
  { type: "opinion", q: "Open plan offices offer a better working environment for staff than normal offices. To what extent do you agree or disagree?" },
  { type: "problem_solution", q: "Childhood obesity is rising rapidly worldwide. What are the causes and what can be done to address this issue?" },
  { type: "discuss_both_views", q: "Some believe space exploration costs are far too high for the benefits; others argue space programs should continue regardless of cost. Discuss both sides and give your opinion." },
  { type: "opinion", q: "Advances in health and biology over the last 100 years have transformed how we live and postponed death. There is no better time to be alive than now. To what extent do you agree?" },
  { type: "direct_question", q: "Many young adults today live with their parents longer than past generations. Why is this happening? Is it a positive or negative trend?" },
  { type: "discuss_both_views", q: "Some say art (painting, music, poetry) can be made by everyone; others believe only those with special ability can make it. Discuss both views." },
  { type: "opinion", q: "It is more important to have a good family than to have friends, and family can compensate for the absence of friendship. To what extent do you agree or disagree?" },
  { type: "problem_solution", q: "Many students lose interest in learning by the time they reach high school. Why is this happening and what can teachers do?" },
  { type: "discuss_both_views", q: "Some believe students benefit from having the same teacher for several years; others think they benefit more from new teachers each year. Discuss both views." },
  { type: "advantages_disadvantages", q: "Many universities now offer fully online degrees. Do the advantages outweigh the disadvantages?" },
  { type: "opinion", q: "Fatherhood ought to be emphasised as much as motherhood. The idea that women are solely responsible for raising children is unfair. To what extent do you agree?" },
  { type: "problem_solution", q: "Wild animal populations are decreasing rapidly. What are the main causes and what can be done?" },
  { type: "discuss_both_views", q: "Some believe it is better to have the same job throughout life; others think people should change jobs every few years. Discuss both views." },
  { type: "opinion", q: "Companies should only hire people from their own country. To what extent do you agree or disagree?" },
  { type: "direct_question", q: "More people rely on credit cards rather than cash. Why is this happening? Is it a positive or negative development?" },
  { type: "discuss_both_views", q: "In some countries police don't carry guns. Some think armed police give security; others think armed police reduce crime. What is your opinion?" },
  { type: "problem_solution", q: "Many young people feel lonely despite being constantly connected online. What are the causes and what can be done?" },
  { type: "opinion", q: "Traditional handwriting is becoming unnecessary in the digital age. To what extent do you agree?" },
  { type: "discuss_both_views", q: "Some think parents should make important life decisions for their children; others believe children should choose for themselves. Discuss both views." },
  { type: "problem_solution", q: "The gap between rich and poor is widening in many countries. What are the causes and what measures could reduce it?" },
  { type: "opinion", q: "Paying high taxes is the best way to reduce inequality. To what extent do you agree?" },
  { type: "advantages_disadvantages", q: "In many countries, women are entitled to maternity leave during the first months after birth. Do the advantages of maternity leave outweigh the disadvantages?" },
  { type: "problem_solution", q: "Children today find it difficult to pay attention or concentrate on school study. What are the reasons and how can we solve this problem?" },
  { type: "discuss_both_views", q: "Some believe parents are the best teachers for children; others believe schools play the most important role. Discuss both views." },
  { type: "direct_question", q: "Some governments tax unhealthy foods to reduce consumption. Why do they do this? Do you think it is effective?" },
  { type: "opinion", q: "Many students take a gap year before starting university to travel or gain work experience. Is this a good idea or a waste of time?" },
  { type: "discuss_both_views", q: "Some believe vegetarianism is the future of food; others argue meat consumption is essential. Discuss both views." },
  { type: "problem_solution", q: "Domestic violence is a serious problem in many societies. What are the causes and what measures can governments take?" },
  { type: "opinion", q: "Art classes are as important as math and science in schools. To what extent do you agree or disagree?" },
  { type: "advantages_disadvantages", q: "Self-driving cars will likely replace human drivers in the future. What are the advantages and disadvantages?" },
  { type: "discuss_both_views", q: "Some say the news should focus on positive stories; others think reporting bad news is necessary. Discuss both views." },
  { type: "opinion", q: "History should be a compulsory subject in every school. To what extent do you agree?" },
  { type: "problem_solution", q: "Many elderly people feel isolated in modern societies. Why is this happening and what can be done?" },
  { type: "direct_question", q: "People in many countries eat more processed food than ever. Why is this happening and what are the effects?" },
  { type: "discuss_both_views", q: "Some say money is the most important factor when choosing a career; others believe job satisfaction matters more. Discuss both views." },
  { type: "opinion", q: "Learning a foreign language at school should be optional rather than compulsory. To what extent do you agree?" },
  { type: "problem_solution", q: "Counterfeit products are widely sold in many countries. What problems does this cause and what can be done?" },
  { type: "advantages_disadvantages", q: "Most people now get their news from social media rather than traditional sources. Do the disadvantages outweigh the advantages?" },
  { type: "discuss_both_views", q: "Animal testing for medical research is necessary, but others believe it is cruel. Discuss both views and give your opinion." },
  { type: "opinion", q: "Governments should spend more money on public services than on the arts. To what extent do you agree?" },
  { type: "direct_question", q: "Some couples today are choosing not to have children. Why is this becoming more common? Is it a positive or negative trend?" },
  { type: "discuss_both_views", q: "Some believe children learn best through play; others think structured lessons are more effective. Discuss both views." },
  { type: "problem_solution", q: "Many people work long hours and suffer chronic stress. What are the causes and what solutions would you suggest?" },
  { type: "opinion", q: "Single-sex schools are more effective than co-educational schools. To what extent do you agree or disagree?" },
  { type: "direct_question", q: "Many young people pursue careers as content creators or influencers. Why is this popular? Is it a positive or negative trend?" },
  { type: "discuss_both_views", q: "Some say retirement age should be raised; others believe people should retire earlier. Discuss both views." },
  { type: "advantages_disadvantages", q: "Many products today are designed to last a short time, pushing repeat purchases. Do the disadvantages outweigh the advantages?" },
  { type: "opinion", q: "Fast-food restaurants are responsible for the rise of unhealthy diets in many countries. To what extent do you agree or disagree?" },
  { type: "direct_question", q: "Some countries are banning single-use plastics. Why is this happening? Do you think it is effective?" },
];

const ESSAY_TYPE_LABELS: Record<string, { label: string; color: string; tip: string }> = {
  opinion:                    { label: "Opinion Essay",              color: "bg-blue-100 text-blue-700", tip: "Give a CLEAR opinion. Support with 2 reasons + examples." },
  discuss_both_views:         { label: "Discuss Both Views",         color: "bg-blue-100 text-blue-700",    tip: "Discuss BOTH sides fairly. State your opinion in the introduction AND conclusion." },
  problem_solution:           { label: "Problem & Solution",         color: "bg-amber-100 text-amber-700",  tip: "Name specific problems, then give realistic solutions. Avoid vague answers." },
  advantages_disadvantages:   { label: "Advantages & Disadvantages", color: "bg-blue-100 text-blue-700", tip: "Compare advantages and disadvantages. Give your opinion at the end." },
  direct_question:            { label: "Direct Question",            color: "bg-pink-100 text-pink-700",    tip: "Answer ALL parts of the question directly. Don't just give one side." },
};

const BAND_DESCRIPTIONS: Record<string, { label: string; desc: string }> = {
  "9.0": { label: "Expert",       desc: "Fully operational command of English. No errors." },
  "8.5": { label: "Very Good+",   desc: "Highly accurate. Minor errors only. Near-native." },
  "8.0": { label: "Very Good",    desc: "Fully competent with occasional inaccuracies. Very few errors." },
  "7.5": { label: "Good+",        desc: "Operates effectively. Good range with some errors under pressure." },
  "7.0": { label: "Good",         desc: "Handles complex language well. Some inaccuracies in less common situations." },
  "6.5": { label: "Competent+",   desc: "Effective basic competence. Errors occur in complex language." },
  "6.0": { label: "Competent",    desc: "Generally effective in familiar situations. Frequent errors in complex language." },
  "5.5": { label: "Modest+",      desc: "Partial command. Makes notable errors, but basic meaning is clear." },
  "5.0": { label: "Modest",       desc: "Partial command. Significant errors. Can handle general meaning." },
};

function WritingSkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 py-2">
        <div className="w-8 h-8 rounded-full bg-blue-100 animate-pulse flex items-center justify-center">
          <span className="text-blue-600 text-sm">🎓</span>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse font-medium">
          IELTS Sensei is analysing your essay…
        </p>
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}

function TimerDisplay({ seconds, limit }: { seconds: number; limit: number }) {
  const remaining = limit - seconds;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isWarning = remaining <= 300;
  const isOver = remaining <= 0;

  return (
    <div className={`flex items-center gap-2 text-sm font-mono font-bold px-3 py-1.5 rounded-lg border ${
      isOver    ? "text-red-500 border-red-200 bg-red-50" :
      isWarning ? "text-amber-500 border-amber-200 bg-amber-50" :
                  "text-blue-600 border-blue-200 bg-blue-50"
    }`}>
      <Timer className="w-3.5 h-3.5" />
      {isOver ? "TIME UP" : `${mins}:${secs.toString().padStart(2, "0")}`}
    </div>
  );
}

// ─── Chart image upload component ──────────────────────────────────────────
function ChartUpload({
  preview,
  onFileSelect,
  onRemove,
}: {
  preview: string | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) onFileSelect(file);
    else toast.error("Please drop an image file (PNG, JPG, etc.)");
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = "";
  }

  if (preview) {
    return (
      <div className="relative rounded-xl border overflow-hidden bg-muted/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="Chart" className="w-full max-h-80 object-contain" />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/90 border flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" />
        </button>
        <div className="absolute bottom-2 left-2">
          <span className="text-xs bg-background/90 border px-2 py-0.5 rounded-full font-medium">
            ✓ Chart uploaded — Sensei will analyse it
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
        dragging
          ? "border-blue-400 bg-blue-50 dark:bg-blue-950"
          : "border-border hover:border-blue-300 hover:bg-muted/30"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
        <BarChart3 className="w-5 h-5 text-blue-600" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">Upload your chart or diagram</p>
        <p className="text-xs text-muted-foreground mt-1">
          Drag &amp; drop or click — PNG, JPG, GIF supported
        </p>
      </div>
      <Button type="button" variant="outline" size="sm" className="gap-1.5 pointer-events-none">
        <ImagePlus className="w-3.5 h-3.5" /> Choose image
      </Button>
    </div>
  );
}

export default function WritingPage() {
  const [moduleType, setModuleType] = useState<"academic" | "general">("academic");
  const [taskType, setTaskType] = useState<"task1" | "task2">("task2");
  const [question, setQuestion] = useState("");
  const [isGeneratedQuestion, setIsGeneratedQuestion] = useState(false);
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WritingResult | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerStartedRef = useRef(false);
  const [showBandGuide, setShowBandGuide] = useState(false);
  const [chartFile, setChartFile] = useState<File | null>(null);
  const [chartPreview, setChartPreview] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeLimit = taskType === "task1" ? 1200 : 2400;

  const minWords = taskType === "task1" ? 150 : 250;
  const wc = wordCount(essay);

  // ── LocalStorage draft persistence ──────────────────────────────────────────
  type Draft = { question: string; essay: string; moduleType: string; taskType: string };
  const draft = useLocalDraft<Draft>("ielts-writing-draft");

  // Restore draft on mount (only if no result yet)
  useEffect(() => {
    const saved = draft.load();
    if (saved && saved.essay && !result) {
      if (saved.moduleType) setModuleType(saved.moduleType as "academic" | "general");
      if (saved.taskType)   setTaskType(saved.taskType as "task1" | "task2");
      if (saved.question)   setQuestion(saved.question);
      if (saved.essay)      setEssay(saved.essay);
      toast.info("Draft restored from your last session");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save on every change
  useEffect(() => {
    if (essay || question) {
      draft.save({ question, essay, moduleType, taskType });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [essay, question, moduleType, taskType]);

  function startTimer() {
    if (timerActive || timerStartedRef.current) return;
    timerStartedRef.current = true;
    setTimerActive(true);
    timerRef.current = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
  }

  function toggleTimer() {
    if (timerActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimerActive(false);
    } else {
      timerStartedRef.current = true;
      setTimerActive(true);
      timerRef.current = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
    }
  }

  // Auto-start timer on first keystroke in essay box
  function handleEssayChange(val: string) {
    setEssay(val);
    if (val.length > 0 && !timerStartedRef.current) startTimer();
  }

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (timerSeconds < timeLimit || !timerActive) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    const t = setTimeout(() => {
      setTimerActive(false);
      toast.warning("Time is up! Submit your essay now.");
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerSeconds, timeLimit]);

  const handleChartSelect = useCallback((file: File) => {
    setChartFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setChartPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleChartRemove = useCallback(() => {
    setChartFile(null);
    setChartPreview(null);
  }, []);

  function pickRandomQuestion() {
    setIsGeneratedQuestion(true);
    if (taskType === "task2") {
      const q = TASK2_QUESTIONS[Math.floor(Math.random() * TASK2_QUESTIONS.length)];
      setQuestion(q.q);
    } else if (moduleType === "general") {
      const q = GT_TASK1_QUESTIONS[Math.floor(Math.random() * GT_TASK1_QUESTIONS.length)];
      setQuestion(q.q);
    } else {
      const practice = TASK1_PRACTICE[Math.floor(Math.random() * TASK1_PRACTICE.length)];
      setQuestion(practice.question);
      // Store as SVG File (will be auto-converted to PNG on submit)
      const blob = new Blob([practice.svg], { type: "image/svg+xml" });
      const file = new File([blob], "practice-chart.svg", { type: "image/svg+xml" });
      setChartFile(file);
      // Show SVG as preview — use encodeURIComponent to handle non-ASCII chars (e.g. CO₂)
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(practice.svg)}`;
      setChartPreview(svgDataUrl);
      toast.success(`Loaded: ${practice.chartLabel} — ready!`);
    }
  }

  // ── SVG → PNG conversion (Gemini does NOT support SVG) ──────────────────────
  async function svgToPngBase64(svgFile: File): Promise<{ base64: string; mimeType: string }> {
    const svgText = await svgFile.text();
    return new Promise((resolve, reject) => {
      const img = new Image();
      const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 760;
        canvas.height = img.naturalHeight || 420;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        const dataUrl = canvas.toDataURL("image/png");
        // dataUrl = "data:image/png;base64,XXXX..."
        const base64 = dataUrl.split(",")[1];
        resolve({ base64, mimeType: "image/png" });
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("SVG render failed")); };
      img.src = url;
    });
  }

  async function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
    // Gemini only supports: image/jpeg, image/png, image/gif, image/webp
    if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
      return svgToPngBase64(file);
    }
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return { base64: btoa(binary), mimeType: file.type || "image/jpeg" };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) { toast.error("Please enter the question first"); return; }
    if (!essay.trim()) { toast.error("Please write your answer first"); return; }
    if (wc < minWords) {
      toast.warning(`Your essay is only ${wc} words. IELTS requires at least ${minWords} words. Add more content before submitting.`);
      return;
    }

    setLoading(true);
    setResult(null);
    if (timerActive) { if (timerRef.current) clearInterval(timerRef.current); setTimerActive(false); }

    try {
      let imageBase64: string | undefined;
      let imageMimeType: string | undefined;

      // Convert chart image to base64 — SVG is auto-converted to PNG
      if (chartFile) {
        const { base64, mimeType } = await fileToBase64(chartFile);
        imageBase64 = base64;
        imageMimeType = mimeType;
      }

      const res = await fetch("/api/writing/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskType, moduleType, question, essay, imageBase64, imageMimeType }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Scoring failed. Please try again."); return; }
      setResult(data.result);
      draft.clear(); // answered successfully — wipe draft
      setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch {
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setEssay("");
    setTimerSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    timerStartedRef.current = false;
    setChartFile(null);
    setChartPreview(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "28px 32px 48px" }}>
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>

    {/* Back button */}
    <div style={{ marginBottom: "16px" }}>
      <a href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "13.5px", fontWeight: 500, textDecoration: "none" }}>
        ← Dashboard
      </a>
    </div>

    {/* ── Header card ── */}
    <div style={{
      background: "#ffffff", borderRadius: "8px",
      border: "1px solid #e2e8f0", borderLeft: "4px solid #dc2626",
      padding: "20px 24px", marginBottom: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px",
    }}>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
          IELTS Academic
        </p>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
          Writing Practice
        </h1>
        <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>
          Paste or type your answer and get instant examiner-grade feedback
        </p>
      </div>
      <button
        onClick={() => setShowBandGuide(!showBandGuide)}
        style={{ fontSize: "12px", color: "#dc2626", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600, flexShrink: 0, marginTop: "2px" }}
      >
        Band guide {showBandGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
    </div>

    <div className="space-y-5">

      {/* Band guide */}
      {showBandGuide && (
        <div className="border rounded-xl p-4 bg-muted/30 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">IELTS Band Descriptions</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(BAND_DESCRIPTIONS).map(([band, { label, desc }]) => (
              <div key={band} className="text-xs bg-card border rounded-lg p-2">
                <span className="font-mono font-bold text-sm">{band}</span>
                <span className="text-muted-foreground ml-1.5">{label}</span>
                <p className="text-muted-foreground mt-0.5 leading-tight">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module selector: Academic / General Training */}
      <div className="flex items-center gap-2" style={{ background: "#f1f5f9", borderRadius: "6px", padding: "3px", width: "fit-content" }}>
        {(["academic", "general"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setModuleType(m);
              setResult(null);
              setEssay("");
              setQuestion("");
              setIsGeneratedQuestion(false);
              setTimerSeconds(0);
              if (timerRef.current) clearInterval(timerRef.current);
              setTimerActive(false);
              timerStartedRef.current = false;
              setChartFile(null);
              setChartPreview(null);
            }}
            style={{
              padding: "6px 16px", borderRadius: "5px",
              background: moduleType === m ? "#ffffff" : "transparent",
              color: moduleType === m ? "#0f172a" : "#64748b",
              fontSize: "13px", fontWeight: 500, border: "none", cursor: "pointer",
              boxShadow: moduleType === m ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.15s",
            }}
          >
            {m === "academic" ? "Academic" : "General Training"}
          </button>
        ))}
      </div>

      <Tabs
        value={taskType}
        onValueChange={(v) => {
          setTaskType(v as "task1" | "task2");
          setResult(null);
          setEssay("");
          setQuestion("");
          setIsGeneratedQuestion(false);
          setTimerSeconds(0);
          if (timerRef.current) clearInterval(timerRef.current);
          setTimerActive(false);
          timerStartedRef.current = false; // fix: reset so auto-start fires again on next keystroke
          setChartFile(null);
          setChartPreview(null);
        }}
      >
        <TabsList className="flex border-b border-gray-200 bg-transparent h-auto p-0 rounded-none gap-0">
          <TabsTrigger value="task2" className="px-5 py-2.5 text-sm rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 font-medium bg-transparent">Task 2 — Essay</TabsTrigger>
          <TabsTrigger value="task1" className="px-5 py-2.5 text-sm rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 font-medium bg-transparent">
            {moduleType === "general" && taskType === "task1" ? "Task 1 — Letter" : "Task 1 — Academic Report"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={taskType} className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ── Exam info bar: always visible ── */}
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border bg-muted/40">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {taskType === "task1"
                    ? (moduleType === "general" ? "Task 1 · General Training · Letter" : "Task 1 · Academic")
                    : "Task 2 · Essay"}
                </span>
                <span>⏱ {taskType === "task1" ? "20 min" : "40 min"}</span>
                <span>📝 Min {taskType === "task1" ? "150" : "250"} words</span>
                {taskType === "task1" && (
                  <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Scored on Task Achievement, CC, LR, GRA</span>
                )}
                {taskType === "task2" && (
                  <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Scored on Task Response, CC, LR, GRA</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {timerActive && <TimerDisplay seconds={timerSeconds} limit={timeLimit} />}
                <Button
                  type="button"
                  variant={timerActive ? "outline" : "default"}
                  size="sm"
                  onClick={toggleTimer}
                  className={`gap-1.5 h-7 text-xs ${!timerActive ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                >
                  <Timer className="w-3 h-3" />
                  {timerActive ? "Pause" : timerSeconds > 0 ? "Resume" : "Start Timer"}
                </Button>
              </div>
            </div>

            {/* Question */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <label className="text-sm font-medium">
                  {taskType === "task1" ? "Question / task instructions" : "Essay question"}
                </label>
                <div className="flex items-center gap-2 shrink-0">
                  {/* Clear button — only shown when a generated question is loaded */}
                  {isGeneratedQuestion && question && (
                    <button
                      type="button"
                      onClick={() => { setIsGeneratedQuestion(false); setQuestion(""); setChartFile(null); setChartPreview(null); }}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
                      style={{
                        background: "rgba(239,68,68,0.08)",
                        color: "#ef4444",
                        border: "1px solid rgba(239,68,68,0.18)",
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0">
                        <line x1="1" y1="1" x2="7" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                        <line x1="7" y1="1" x2="1" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={pickRandomQuestion}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Shuffle className="w-3 h-3" />
                    {taskType === "task1" && moduleType === "academic" ? "Practice question + chart" : "Practice question"}
                  </button>
                </div>
              </div>
              <Textarea
                value={question}
                onChange={(e) => {
                  setIsGeneratedQuestion(false);
                  setQuestion(e.target.value);
                }}
                readOnly={isGeneratedQuestion}
                placeholder={
                  taskType === "task1"
                    ? (moduleType === "general"
                        ? "Paste the letter task instructions here, e.g. 'You recently stayed at a hotel... Write a letter to the hotel manager...'"
                        : "Paste the task instructions here, e.g. 'The graph below shows... Summarise the information by selecting and reporting the main features...'")
                    : "Paste the essay question here, or click 'Practice question' for a sample..."
                }
                className={`resize-none min-h-[100px] text-sm ${isGeneratedQuestion ? "bg-muted/50 cursor-default select-text" : ""}`}
              />
            </div>

            {/* Task 1: Chart / diagram upload — Academic only */}
            {taskType === "task1" && moduleType === "academic" && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                  Chart or diagram
                  <span className="text-xs text-muted-foreground font-normal">(optional but recommended)</span>
                </label>
                <ChartUpload
                  preview={chartPreview}
                  onFileSelect={handleChartSelect}
                  onRemove={handleChartRemove}
                />
              </div>
            )}

            {/* GT Task 1: Letter format tips */}
            {taskType === "task1" && moduleType === "general" && (
              <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-xs text-blue-800">
                <span className="font-semibold">Letter format guide: </span>
                Formal: Dear Sir/Madam → Yours faithfully | Semi-formal: Dear Mr Smith → Yours sincerely | Informal: Dear John → Best wishes
              </div>
            )}

            {/* Essay / report / letter */}
            <EssayEditor
              value={essay}
              onChange={handleEssayChange}
              minWords={minWords}
              label={taskType === "task1" ? (moduleType === "general" ? "Your letter" : "Your report") : "Your essay"}
              placeholder={
                taskType === "task1" && moduleType === "general"
                  ? "Write your letter here… (timer starts automatically)"
                  : `Write your ${taskType === "task1" ? "report" : "essay"} here… (timer starts automatically)`
              }
            />

            {/* Submit */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none sm:min-w-[200px] gap-2 text-white text-base font-bold py-5"
                style={{
                  background: "#dc2626",
                  boxShadow: "0 4px 0 #1d4ed8, 0 6px 20px rgba(37,99,235,0.35)",
                  transition: "transform 0.1s, box-shadow 0.1s",
                }}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Scoring…</>
                ) : (
                  <><FileText className="w-4 h-4" /> Get AI Feedback</>
                )}
              </Button>

              {result && (
                <>
                  <Button type="button" variant="outline" onClick={() => {
                    setResult(null);
                    setTimerSeconds(0);
                    if (timerRef.current) clearInterval(timerRef.current);
                    setTimerActive(false);
                    timerStartedRef.current = false;
                    setEssay("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }} className="gap-2">
                    <RefreshCw className="w-4 h-4" /> Try same question again
                  </Button>
                  <Button type="button" variant="outline" onClick={handleReset} className="gap-2">
                    <RotateCcw className="w-4 h-4" /> New question
                  </Button>
                </>
              )}
            </div>
          </form>
        </TabsContent>
      </Tabs>

      {/* Loading */}
      {loading && <WritingSkeletonLoader />}

      {/* Results */}
      {result && !loading && (
        <div id="results" className="space-y-4 pt-2">
          {result.essay_type && ESSAY_TYPE_LABELS[result.essay_type] && (
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`text-xs ${ESSAY_TYPE_LABELS[result.essay_type].color} border-0`}>
                {ESSAY_TYPE_LABELS[result.essay_type].label}
              </Badge>
              <span className="text-xs text-muted-foreground">
                💡 {ESSAY_TYPE_LABELS[result.essay_type].tip}
              </span>
            </div>
          )}

          {taskType === "task1" && result.has_overview === false && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
              ⚠️ <strong>No overview detected.</strong> Task 1 requires an overview paragraph (what the chart shows overall). This caps your Task Achievement score at 5.0.
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Your Results</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Band context chip */}
          {result.scores.overall && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground">Your band:</span>
              <span className="text-sm font-mono font-bold">
                {result.scores.overall.toFixed(1)}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground font-medium">
                {result.scores.overall >= 8.5 ? "Very Good+" :
                 result.scores.overall >= 8   ? "Very Good" :
                 result.scores.overall >= 7.5 ? "Good+" :
                 result.scores.overall >= 7   ? "Good" :
                 result.scores.overall >= 6.5 ? "Competent+" :
                 result.scores.overall >= 6   ? "Competent" :
                 result.scores.overall >= 5.5 ? "Modest+" :
                 result.scores.overall >= 5   ? "Modest" : "Limited"}
              </span>
              <span className="text-xs text-muted-foreground">
                {result.scores.overall >= 7 ? "✅ Above average for most university entry" :
                 result.scores.overall >= 6 ? "📚 Near university entry level" :
                 "💪 Keep practising — you're making progress"}
              </span>
            </div>
          )}

          <ScoreCard result={result} taskType={taskType} />
          {result.scores.overall && (
            <ShareScoreCard
              band={result.scores.overall}
              mode="Writing"
              detail={taskType === "task2" ? "Task 2 Essay" : moduleType === "general" ? "Task 1 Letter" : "Task 1 Report"}
            />
          )}
          <CorrectionsView result={result} />
          <BandRewrite result={result} />
        </div>
      )}
    </div>
    </div>
    </div>
  );
}
