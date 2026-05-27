"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { PartSelector } from "@/components/speaking/PartSelector";
import { Recorder } from "@/components/speaking/Recorder";
import { CueCard } from "@/components/speaking/CueCard";
import { SpeakingTimer } from "@/components/speaking/SpeakingTimer";
import { BandScoreRing } from "@/components/shared/BandScoreRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SpeakingPart, SpeakingResult, CueCard as CueCardType } from "@/types/ielts";
import { Mic, RefreshCw, Loader2, Shuffle, ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

// ─── Topic Banks ──────────────────────────────────────────────────────────────
interface TopicSet {
  topic: string;
  emoji: string;
  questions: string[];
}

const PART1_TOPICS: TopicSet[] = [
  {
    topic: "Hometown & Home",
    emoji: "🏡",
    questions: [
      "Where are you from originally? Tell me a little about your hometown.",
      "Do you enjoy living there? What do you like most about it?",
      "Has your hometown changed much in recent years? How?",
      "What is your hometown famous for?",
      "Would you like to continue living there in the future, or move somewhere else?",
    ],
  },
  {
    topic: "Work & Study",
    emoji: "📚",
    questions: [
      "Do you work or are you a student? Tell me what you do.",
      "What do you enjoy most about your work or studies?",
      "Do you prefer working or studying alone, or with other people? Why?",
      "Is your current job or subject what you originally planned to do?",
      "What are your plans for the future in terms of career or study?",
    ],
  },
  {
    topic: "Free Time & Hobbies",
    emoji: "🎯",
    questions: [
      "What do you usually do in your free time?",
      "How do you typically spend your weekends?",
      "Do you prefer indoor or outdoor activities? Why?",
      "Has your hobby changed compared to when you were younger?",
      "Do you feel you have enough free time, or are you too busy?",
    ],
  },
  {
    topic: "Technology",
    emoji: "📱",
    questions: [
      "How often do you use the internet? What do you mainly use it for?",
      "Do you think smartphones have changed people's lives? In what ways?",
      "Do you prefer reading books or reading on a screen? Why?",
      "Which apps do you use most often on your phone?",
      "Do you think children use technology too much these days?",
    ],
  },
  {
    topic: "Food & Cooking",
    emoji: "🍜",
    questions: [
      "What is your favourite food? Why do you like it?",
      "Do you prefer eating at home or eating out? Why?",
      "Can you cook? Do you enjoy cooking?",
      "Is there any food from other countries that you enjoy?",
      "Has your diet changed compared to when you were a child?",
    ],
  },
  {
    topic: "Travel & Transport",
    emoji: "✈️",
    questions: [
      "How do you usually travel around your city?",
      "Have you ever visited another country? Where did you go?",
      "Where would you most like to visit in the future? Why?",
      "Do you prefer travelling by train, bus, or plane? Why?",
      "Do you think people travel more now than they did in the past?",
    ],
  },
  {
    topic: "Health & Sport",
    emoji: "🏃",
    questions: [
      "Do you do any sport or exercise regularly? What do you do?",
      "How do you try to stay healthy in your daily life?",
      "Do you think people in your country are generally healthy?",
      "What sport is most popular where you live?",
      "Did you do more sport when you were a child than you do now?",
    ],
  },
  {
    topic: "Shopping",
    emoji: "🛍️",
    questions: [
      "Do you enjoy shopping? Why or why not?",
      "Do you prefer shopping online or in a physical shop? Why?",
      "How often do you go shopping for clothes or other items?",
      "What was the last significant thing you bought?",
      "Do you think people buy too many things they don't really need?",
    ],
  },
  {
    topic: "Nature & Weather",
    emoji: "🌿",
    questions: [
      "What kind of weather do you like best? Why?",
      "Do you enjoy spending time in nature? What do you do there?",
      "How does the weather in your country affect people's daily lives?",
      "Have you noticed any changes in the climate in recent years?",
      "Would you rather live in a hot country or a cold country? Why?",
    ],
  },
  {
    topic: "Art & Music",
    emoji: "🎵",
    questions: [
      "Are you interested in art? Do you visit museums or galleries?",
      "Do you listen to music? What kind of music do you enjoy?",
      "Do you play any musical instruments? Would you like to learn one?",
      "What traditional customs or arts from your culture do you enjoy?",
      "Do you think art and music should be taught in schools? Why?",
    ],
  },
  {
    topic: "Friends & Family",
    emoji: "👨‍👩‍👧",
    questions: [
      "Do you have a large family or a small family?",
      "How often do you spend time with your family?",
      "How do you usually keep in touch with your friends?",
      "Are your friends mostly from school, work, or somewhere else?",
      "Is it easy to make new friends where you live?",
    ],
  },
  {
    topic: "Daily Routine",
    emoji: "⏰",
    questions: [
      "What time do you usually wake up? Do you consider yourself a morning person?",
      "What do you typically eat for breakfast?",
      "How do you get to work or school each day?",
      "What do you usually do in the evenings after work or study?",
      "Is your daily routine during the week different from your weekends?",
    ],
  },
];

const PART3_TOPICS: TopicSet[] = [
  {
    topic: "Technology & Society",
    emoji: "💻",
    questions: [
      "How has technology changed the way people communicate in your country?",
      "Do you think people rely too much on technology today? Why?",
      "What are the main advantages and disadvantages of social media?",
      "How do you think technology will change education in the next 20 years?",
      "Should governments have more control over how technology companies use people's data?",
    ],
  },
  {
    topic: "Education",
    emoji: "🎓",
    questions: [
      "What qualities do you think a good teacher should have?",
      "Do you think a university education is necessary for success in life? Why?",
      "How has education changed in your country over the last generation?",
      "Should children learn a foreign language from a very young age? Why?",
      "What do you think is more important — academic knowledge or practical skills?",
    ],
  },
  {
    topic: "Environment & Climate",
    emoji: "🌍",
    questions: [
      "What role should governments play in protecting the environment?",
      "Do you think individuals or large companies are more responsible for environmental problems?",
      "What lifestyle changes could ordinary people make to help the environment?",
      "Is it too late to prevent serious climate change, in your view?",
      "How can we balance economic development with protecting the natural environment?",
    ],
  },
  {
    topic: "Work & Economy",
    emoji: "💼",
    questions: [
      "Do you think it is better to work for yourself or for an employer? Why?",
      "How has the nature of work changed over the last few decades?",
      "What skills do you think will be most important in the workplace of the future?",
      "Should employees have the right to work from home permanently?",
      "Is it fair that some people earn significantly more money than others? Why?",
    ],
  },
  {
    topic: "Society & Values",
    emoji: "🤝",
    questions: [
      "Do you think traditional values are still important in modern society?",
      "How important is it for young people to maintain close relationships with older generations?",
      "What are the main causes of stress in modern life, and how can people deal with it?",
      "Do you think people today are more individualistic and less community-minded than in the past?",
      "How has the role of women in society changed over the last 50 years in your country?",
    ],
  },
  {
    topic: "Cities & Urbanisation",
    emoji: "🏙️",
    questions: [
      "What are the main advantages and disadvantages of living in a big city?",
      "Why do so many people continue to move from rural areas to cities?",
      "How can governments make cities more liveable for their residents?",
      "What problems do rapidly growing cities typically face?",
      "Do you think the future of cities lies in so-called 'smart cities'? Why?",
    ],
  },
  {
    topic: "Health & Medicine",
    emoji: "🏥",
    questions: [
      "Who do you think is more responsible for people's health — individuals or governments?",
      "Why do you think so many people today lead unhealthy lifestyles?",
      "How has medical technology improved people's quality of life in recent years?",
      "Do you think healthcare should be completely free for everyone?",
      "How do you think artificial intelligence will change medicine in the future?",
    ],
  },
  {
    topic: "Tourism & Travel",
    emoji: "🗺️",
    questions: [
      "Is tourism always beneficial for a country, or can it cause problems?",
      "How has international tourism changed over the last few decades?",
      "What are the main negative effects of mass tourism on local communities?",
      "Should governments limit the number of tourists allowed to visit certain places?",
      "Do you think tourism helps promote understanding between different cultures?",
    ],
  },
  {
    topic: "Media & Communication",
    emoji: "📺",
    questions: [
      "How has the internet changed the way people get their news?",
      "Do you think social media has made it easier or harder to know what is true?",
      "Should governments be allowed to restrict what people post online?",
      "How do you think the role of traditional newspapers will change in the future?",
      "What responsibilities do journalists and media organisations have to the public?",
    ],
  },
  {
    topic: "Globalisation & Culture",
    emoji: "🌐",
    questions: [
      "What are the main benefits of globalisation for ordinary people?",
      "Do you think globalisation is causing local cultures and traditions to disappear?",
      "Should countries try to protect their local industries from foreign competition?",
      "How has the spread of English as a global language affected other languages?",
      "In your view, does globalisation lead to greater equality between countries, or greater inequality?",
    ],
  },
];

const PART_LIMITS: Record<SpeakingPart, number> = { 1: 35, 2: 120, 3: 60 };
const PART_MIN: Record<SpeakingPart, number> = { 1: 10, 2: 60, 3: 15 };

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SpeakingSkeletonLoader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full rounded-xl" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}

// ─── Topic Picker ─────────────────────────────────────────────────────────────
function TopicPicker({
  topics,
  onSelect,
  onRandom,
  part,
}: {
  topics: TopicSet[];
  onSelect: (idx: number) => void;
  onRandom: () => void;
  part: SpeakingPart;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">
            {part === 1 ? "Choose a topic for your interview" : "Choose a discussion theme"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {part === 1
              ? "The examiner will ask you 5 questions about this topic"
              : "Discuss 5 deep questions on this theme"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onRandom} className="gap-1.5 shrink-0">
          <Shuffle className="w-3.5 h-3.5" /> Random
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {topics.map((t, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="flex items-center gap-2.5 p-3 rounded-xl border bg-card hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all text-left group"
          >
            <span className="text-xl shrink-0">{t.emoji}</span>
            <span className="text-xs font-medium text-foreground group-hover:text-violet-700 dark:group-hover:text-violet-300 leading-tight">
              {t.topic}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Results View ─────────────────────────────────────────────────────────────
function SpeakingResultView({ result }: { result: SpeakingResult }) {
  const criteria = [
    { key: "fluency_coherence", label: "Fluency & Coherence", value: result.scores.fluency_coherence },
    { key: "lexical_resource", label: "Lexical Resource", value: result.scores.lexical_resource },
    { key: "grammatical_range", label: "Grammar & Accuracy", value: result.scores.grammatical_range },
    { key: "pronunciation", label: "Pronunciation", value: result.scores.pronunciation },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <BandScoreRing band={result.scores.overall} size={130} />
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Overall Band</p>
                <p className="text-2xl font-mono font-bold">{result.scores.overall.toFixed(1)}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
              <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
                <span>{result.word_count} words</span>
                <span>{Math.round(result.duration_seconds)}s spoken</span>
                {result.words_per_minute && <span>~{Math.round(result.words_per_minute)} wpm</span>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Criterion Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {criteria.map(({ key, label, value }) => (
              <BandScoreRing key={key} band={value} size={80} strokeWidth={7} label={label} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground leading-relaxed font-mono whitespace-pre-wrap">{result.transcript}</p>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-600">✓ Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-emerald-500 shrink-0">•</span>{s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">✗ Weaknesses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-red-500 shrink-0">•</span>{w}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {result.pronunciation_issues.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pronunciation Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.pronunciation_issues.map((p, i) => (
              <div key={i} className="text-sm border rounded-md p-3 bg-card">
                <span className="font-mono font-semibold text-amber-600">&ldquo;{p.word}&rdquo;</span>
                <span className="text-muted-foreground mx-1.5">—</span>
                <span className="text-muted-foreground">{p.issue}</span>
                <p className="text-emerald-600 text-xs mt-1.5 font-medium">✓ Fix: {p.fix}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {result.grammar_issues.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Grammar Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.grammar_issues.map((g, i) => (
              <div key={i} className="text-sm border rounded-md p-3 bg-card">
                <div className="line-through text-red-500 text-sm">&ldquo;{g.said}&rdquo;</div>
                <div className="text-emerald-600 font-medium text-sm mt-1">&ldquo;{g.should_be}&rdquo;</div>
                <p className="text-xs text-muted-foreground mt-1.5">{g.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {result.vocabulary_suggestions && result.vocabulary_suggestions.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Vocabulary Upgrades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.vocabulary_suggestions.map((v, i) => (
              <div key={i} className="text-sm border rounded-md p-3 bg-card flex gap-3 items-start">
                <div className="flex-1">
                  <span className="text-muted-foreground line-through">{v.basic_word}</span>
                  <span className="mx-2 text-muted-foreground">→</span>
                  <span className="text-violet-600 font-semibold">{v.better_word}</span>
                  <p className="text-xs text-muted-foreground mt-1 italic">&ldquo;{v.example}&rdquo;</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="border-violet-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-violet-600">✦ Band 8+ Model Answer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">{result.model_answer}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Next Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {result.next_actions.map((action, i) => (
            <div key={i} className="flex gap-2.5 text-sm">
              <span className="font-mono font-bold text-violet-500 shrink-0">{i + 1}.</span>
              <span className="text-foreground">{action}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SpeakingPage() {
  const [part, setPart] = useState<SpeakingPart>(1);

  // Topic-based state (Part 1 & 3)
  const [selectedTopicIdx, setSelectedTopicIdx] = useState<number | null>(null);
  const [questionInSet, setQuestionInSet] = useState(0); // 0–4 within selected topic
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]); // indices done

  // Part 2 state
  const [cueCard, setCueCard] = useState<CueCardType | null>(null);
  const [loadingCueCard, setLoadingCueCard] = useState(false);
  const [prepTimeLeft, setPrepTimeLeft] = useState(60);
  const [prepActive, setPrepActive] = useState(false);
  const [recordingEnabled, setRecordingEnabled] = useState(false);

  // Shared state
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeakingResult | null>(null);

  const prepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const topics = part === 1 ? PART1_TOPICS : PART3_TOPICS;
  const currentTopicSet = selectedTopicIdx !== null ? topics[selectedTopicIdx] : null;
  const currentQuestion =
    part === 2
      ? cueCard?.topic || ""
      : currentTopicSet?.questions[questionInSet] ?? "";

  const totalQsInSet = currentTopicSet?.questions.length ?? 0;
  const isLastQuestion = questionInSet === totalQsInSet - 1;

  // Load cue card for Part 2
  useEffect(() => {
    if (part !== 2 || cueCard) return;
    let cancelled = false;
    async function loadCard() {
      try {
        setLoadingCueCard(true);
        const r = await fetch("/api/speaking/cue-card");
        const data = await r.json();
        if (!cancelled && data.topic) setCueCard(data);
      } catch {
        if (!cancelled) toast.error("Failed to load cue card");
      } finally {
        if (!cancelled) setLoadingCueCard(false);
      }
    }
    loadCard();
    return () => { cancelled = true; };
  }, [part, cueCard]);

  function resetForNewPart(p: SpeakingPart) {
    setPart(p);
    setSelectedTopicIdx(null);
    setQuestionInSet(0);
    setCompletedQuestions([]);
    setResult(null);
    setAudioBlob(null);
    setRecordingEnabled(p !== 2);
    setCueCard(null);
    setPrepActive(false);
    setPrepTimeLeft(60);
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
  }

  function selectTopic(idx: number) {
    setSelectedTopicIdx(idx);
    setQuestionInSet(0);
    setCompletedQuestions([]);
    setResult(null);
    setAudioBlob(null);
  }

  function selectRandomTopic() {
    const idx = Math.floor(Math.random() * topics.length);
    selectTopic(idx);
  }

  function handleNextQuestion() {
    setCompletedQuestions((prev) => [...prev, questionInSet]);
    setQuestionInSet((prev) => prev + 1);
    setResult(null);
    setAudioBlob(null);
  }

  function handleChangeTopic() {
    setSelectedTopicIdx(null);
    setQuestionInSet(0);
    setCompletedQuestions([]);
    setResult(null);
    setAudioBlob(null);
  }

  function handleReset() {
    setResult(null);
    setAudioBlob(null);
    setRecordingEnabled(part !== 2);
    setPrepActive(false);
    setPrepTimeLeft(60);
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
  }

  function fetchNewCueCard() {
    setCueCard(null);
    setAudioBlob(null);
    setResult(null);
    setRecordingEnabled(false);
    setPrepActive(false);
    setPrepTimeLeft(60);
  }

  function startPrep() {
    setPrepActive(true);
    setPrepTimeLeft(60);
    setRecordingEnabled(false);
    prepTimerRef.current = setInterval(() => {
      setPrepTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(prepTimerRef.current!);
          setRecordingEnabled(true);
          setPrepActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function handleScore() {
    if (!audioBlob) { toast.error("No recording found"); return; }
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("part", String(part));
      formData.append("question", currentQuestion);
      const res = await fetch("/api/speaking/score", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Scoring failed"); return; }
      setResult(data.result);
      if (data.result.scores.overall >= 7) {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#8b5cf6", "#10b981", "#f59e0b"] });
      }
      setTimeout(() => {
        document.getElementById("speaking-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Speaking Practice</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Record your answer and get instant examiner feedback
        </p>
      </div>

      {/* Part selector */}
      <PartSelector selected={part} onChange={resetForNewPart} />

      {/* ── Part 1 & 3: Topic Picker or Interview Flow ── */}
      {part !== 2 && (
        <>
          {selectedTopicIdx === null ? (
            /* Topic picker */
            <Card>
              <CardContent className="pt-5 pb-5">
                <TopicPicker
                  topics={topics}
                  onSelect={selectTopic}
                  onRandom={selectRandomTopic}
                  part={part}
                />
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Topic header + progress */}
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{currentTopicSet!.emoji}</span>
                        <span className="font-semibold text-sm">{currentTopicSet!.topic}</span>
                        <Badge variant="outline" className="text-xs ml-auto">
                          Q{questionInSet + 1} / {totalQsInSet}
                        </Badge>
                      </div>
                      {/* Progress dots */}
                      <div className="flex gap-1.5 mb-4">
                        {currentTopicSet!.questions.map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              completedQuestions.includes(i)
                                ? "bg-emerald-500"
                                : i === questionInSet
                                ? "bg-violet-500"
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      {/* Current question */}
                      <p className="font-medium text-base leading-relaxed">{currentQuestion}</p>
                    </div>
                  </div>
                  {/* Change topic link */}
                  {!result && !loading && (
                    <button
                      onClick={handleChangeTopic}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" /> Change topic
                    </button>
                  )}
                </CardContent>
              </Card>

              {/* Recorder */}
              {!result && (
                <Card>
                  <CardContent className="pt-6 pb-6">
                    <Recorder
                      limitSeconds={PART_LIMITS[part]}
                      minSeconds={PART_MIN[part]}
                      onRecordingComplete={(blob) => setAudioBlob(blob)}
                      disabled={loading}
                      label={
                        part === 1
                          ? "Answer in 20–30 seconds"
                          : "Answer in 40–60 seconds"
                      }
                    />
                  </CardContent>
                </Card>
              )}

              {/* Submit */}
              {audioBlob && !result && (
                <Button
                  onClick={handleScore}
                  disabled={loading}
                  className="w-full gap-2 bg-violet-500 hover:bg-violet-600 text-white"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Scoring your answer…</>
                  ) : (
                    <><Mic className="w-4 h-4" /> Get Band Score</>
                  )}
                </Button>
              )}

              {/* After result: Next question or finish */}
              {result && !loading && (
                <div className="flex flex-col sm:flex-row gap-2">
                  {!isLastQuestion ? (
                    <Button
                      onClick={handleNextQuestion}
                      className="flex-1 gap-2 bg-violet-500 hover:bg-violet-600 text-white"
                    >
                      Next Question <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleChangeTopic}
                      className="flex-1 gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Topic Complete — Try Another
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RefreshCw className="w-4 h-4" /> Re-record
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* ── Part 2: Cue Card Flow ── */}
      {part === 2 && (
        <>
          <Card>
            <CardContent className="pt-5 pb-5">
              {loadingCueCard ? (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              ) : cueCard ? (
                <div className="space-y-3">
                  <CueCard
                    cueCard={cueCard}
                    prepTimeLeft={prepActive ? prepTimeLeft : undefined}
                    isPrep={prepActive}
                  />
                  {!prepActive && !recordingEnabled && !result && (
                    <button
                      onClick={fetchNewCueCard}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Shuffle className="w-3 h-3" /> Get a different topic
                    </button>
                  )}
                </div>
              ) : null}
            </CardContent>
          </Card>

          {cueCard && !prepActive && !recordingEnabled && !result && (
            <Button onClick={startPrep} className="w-full gap-2 bg-violet-500 hover:bg-violet-600 text-white">
              ✏️ Start 1-minute preparation time
            </Button>
          )}
          {prepActive && (
            <SpeakingTimer elapsed={60 - prepTimeLeft} limit={60} label="Preparation time (make notes)" warning={10} />
          )}

          {recordingEnabled && !result && (
            <Card>
              <CardContent className="pt-6 pb-6">
                <Recorder
                  limitSeconds={PART_LIMITS[2]}
                  minSeconds={PART_MIN[2]}
                  onRecordingComplete={(blob) => setAudioBlob(blob)}
                  disabled={loading}
                  label="Speak for 1–2 minutes"
                />
              </CardContent>
            </Card>
          )}

          {audioBlob && !result && (
            <Button
              onClick={handleScore}
              disabled={loading}
              className="w-full gap-2 bg-violet-500 hover:bg-violet-600 text-white"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Scoring your answer…</>
              ) : (
                <><Mic className="w-4 h-4" /> Get Band Score</>
              )}
            </Button>
          )}

          {result && (
            <Button variant="outline" onClick={handleReset} className="w-full gap-2">
              <RefreshCw className="w-4 h-4" /> Try another topic
            </Button>
          )}
        </>
      )}

      {/* Skeleton while loading */}
      {loading && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 animate-pulse flex items-center justify-center shrink-0">
              <span className="text-sm">🎓</span>
            </div>
            <p className="text-sm text-muted-foreground animate-pulse font-medium">
              IELTS Sensei is analysing your speaking…
            </p>
          </div>
          <SpeakingSkeletonLoader />
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div id="speaking-results" className="pt-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Your Results</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <SpeakingResultView result={result} />
        </div>
      )}
    </div>
  );
}
