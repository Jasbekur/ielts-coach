"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { PartSelector } from "@/components/speaking/PartSelector";
import { Recorder } from "@/components/speaking/Recorder";
import { SpeakingTimer } from "@/components/speaking/SpeakingTimer";
import { BandScoreRing } from "@/components/shared/BandScoreRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { SpeakingPart, SpeakingResult } from "@/types/ielts";
import {
  Mic, RefreshCw, Loader2, Shuffle, ChevronRight, ArrowLeft,
  CheckCircle2, PencilLine, Trophy, Zap, ClipboardList, Sparkles, Copy, Check,
} from "lucide-react";
import { formatBand, roundBand } from "@/lib/utils/band-score";
import confetti from "canvas-confetti";

// ─── Cue Card Bank (50 real IELTS Part 2 cards) ───────────────────────────────
interface CueCardData {
  category: string;
  topic: string;
  bullets: string[];
  followUp: string;
}

const CUE_CARDS: CueCardData[] = [
  // PEOPLE
  { category: "People", topic: "Describe a person who has had a great influence on your life.", bullets: ["who this person is", "how long you have known them", "what qualities they have"], followUp: "and explain why this person has been so influential to you." },
  { category: "People", topic: "Describe a famous person you admire.", bullets: ["who this person is", "what they are famous for", "how you first heard about them"], followUp: "and explain why you admire them so much." },
  { category: "People", topic: "Describe a teacher who had a positive impact on you.", bullets: ["what subject they taught", "what they were like as a person", "what they did that was special"], followUp: "and explain how they changed the way you think or learn." },
  { category: "People", topic: "Describe a friend who is very important to you.", bullets: ["how you met this friend", "what you do together", "what kind of person they are"], followUp: "and explain why this friendship is so important to you." },
  { category: "People", topic: "Describe an elderly person you know and respect.", bullets: ["who this person is", "how you know them", "what they are like"], followUp: "and explain why you respect this person." },
  { category: "People", topic: "Describe a person you know who is very creative.", bullets: ["who this person is", "what they do that is creative", "how long they have been doing it"], followUp: "and explain how their creativity has inspired you." },
  { category: "People", topic: "Describe someone you know who is a good leader.", bullets: ["who this person is", "what kind of leadership they demonstrate", "in what situation you have seen them lead"], followUp: "and explain what makes them an effective leader." },
  { category: "People", topic: "Describe a person from history you would like to meet.", bullets: ["who this person is", "when and where they lived", "what they are famous for"], followUp: "and explain what you would like to ask or learn from them." },

  // PLACES
  { category: "Places", topic: "Describe a place you enjoyed visiting as a child.", bullets: ["where this place was", "who took you there", "what you did there"], followUp: "and explain why you remember this place so fondly." },
  { category: "Places", topic: "Describe a city or town you would like to visit in the future.", bullets: ["where this place is", "why you want to visit it", "what you plan to do there"], followUp: "and explain what makes this place so appealing to you." },
  { category: "Places", topic: "Describe a park or outdoor area you enjoy visiting.", bullets: ["where it is located", "what the place looks like", "what you usually do there"], followUp: "and explain why you enjoy spending time in this place." },
  { category: "Places", topic: "Describe a building you find particularly impressive.", bullets: ["what the building is and where it is", "what it looks like", "why you visited or saw it"], followUp: "and explain why you find this building impressive." },
  { category: "Places", topic: "Describe a restaurant or café you particularly enjoy.", bullets: ["where it is and what type of food it serves", "what it looks like inside", "who you usually go there with"], followUp: "and explain why you recommend this place to others." },
  { category: "Places", topic: "Describe a foreign country you would like to visit.", bullets: ["which country it is", "what you know about it", "what you would do there"], followUp: "and explain why this country interests you so much." },
  { category: "Places", topic: "Describe a place in your city where you like to relax.", bullets: ["where this place is", "what it looks like", "when you usually go there"], followUp: "and explain why this place helps you relax." },
  { category: "Places", topic: "Describe a museum or gallery you have visited.", bullets: ["where the museum is", "what type of exhibits it has", "when you visited"], followUp: "and explain what you found most interesting about it." },

  // OBJECTS
  { category: "Objects", topic: "Describe a gift you received that made you very happy.", bullets: ["what the gift was", "who gave it to you and when", "why it was given to you"], followUp: "and explain why this gift made you so happy." },
  { category: "Objects", topic: "Describe a book that you have read and enjoyed.", bullets: ["what the book is called", "what it is about", "why you chose to read it"], followUp: "and explain why you would recommend this book to others." },
  { category: "Objects", topic: "Describe a piece of technology you find very useful.", bullets: ["what this technology is", "how long you have been using it", "how often you use it"], followUp: "and explain why you think this technology is so important." },
  { category: "Objects", topic: "Describe something you own that is very important to you.", bullets: ["what this object is", "where and when you got it", "how often you use or see it"], followUp: "and explain why this object means so much to you." },
  { category: "Objects", topic: "Describe a photograph that is special to you.", bullets: ["what the photo shows", "when and where it was taken", "who took it"], followUp: "and explain why this photograph is so meaningful to you." },
  { category: "Objects", topic: "Describe a piece of clothing you particularly like.", bullets: ["what the item of clothing is", "where you got it", "when you usually wear it"], followUp: "and explain why this piece of clothing is special to you." },
  { category: "Objects", topic: "Describe a piece of music or a song you enjoy.", bullets: ["what the song or piece of music is called", "when you first heard it", "what kind of music it is"], followUp: "and explain why this music is important or meaningful to you." },
  { category: "Objects", topic: "Describe a vehicle or form of transport you would like to own.", bullets: ["what it is", "what it looks like", "how much it costs approximately"], followUp: "and explain why you would like to own this." },

  // EVENTS & EXPERIENCES
  { category: "Experiences", topic: "Describe a memorable journey or trip you have taken.", bullets: ["where you went", "who you went with", "what you did there"], followUp: "and explain why this journey was so memorable." },
  { category: "Experiences", topic: "Describe a time when you achieved something you were proud of.", bullets: ["what you achieved", "when and where this happened", "how you prepared or worked for it"], followUp: "and explain why this achievement made you so proud." },
  { category: "Experiences", topic: "Describe a time when you helped someone.", bullets: ["who you helped", "what the situation was", "how you helped them"], followUp: "and explain how you felt after helping this person." },
  { category: "Experiences", topic: "Describe a time when you had to make an important decision.", bullets: ["what decision you had to make", "how long you spent thinking about it", "who you discussed it with"], followUp: "and explain whether you think you made the right decision." },
  { category: "Experiences", topic: "Describe a celebration or festival that is important in your culture.", bullets: ["what the festival is called", "when it takes place", "how people celebrate it"], followUp: "and explain why this festival is so special to you or your community." },
  { category: "Experiences", topic: "Describe a time when you learned something new and challenging.", bullets: ["what you learned", "how you learned it", "how long it took to learn"], followUp: "and explain how learning this has helped you." },
  { category: "Experiences", topic: "Describe a time when you were surprised.", bullets: ["what happened", "when and where it happened", "who was involved"], followUp: "and explain how you felt and what you did as a result." },
  { category: "Experiences", topic: "Describe a difficult challenge you have faced.", bullets: ["what the challenge was", "when you faced it", "how you dealt with it"], followUp: "and explain what you learned from overcoming this challenge." },
  { category: "Experiences", topic: "Describe a time when you visited a new place for the first time.", bullets: ["where you went", "why you went there", "what you saw and did"], followUp: "and explain how you felt about visiting this new place." },
  { category: "Experiences", topic: "Describe an occasion when you were late for something important.", bullets: ["what event or appointment you were late for", "why you were late", "what happened as a result"], followUp: "and explain how this experience affected you." },

  // ACTIVITIES & HOBBIES
  { category: "Activities", topic: "Describe a sport or physical activity you enjoy doing.", bullets: ["what the sport or activity is", "how long you have been doing it", "how often you do it"], followUp: "and explain why you enjoy this sport or activity." },
  { category: "Activities", topic: "Describe a hobby you have that you are passionate about.", bullets: ["what the hobby is", "when and how you started doing it", "how much time you spend on it"], followUp: "and explain why this hobby is so important to you." },
  { category: "Activities", topic: "Describe a skill you would like to learn in the future.", bullets: ["what the skill is", "why you want to learn it", "how you plan to learn it"], followUp: "and explain how this skill would improve your life." },
  { category: "Activities", topic: "Describe something you enjoy cooking or eating.", bullets: ["what the food is", "when you usually eat or cook it", "how it is prepared"], followUp: "and explain why you enjoy this food so much." },
  { category: "Activities", topic: "Describe a film or TV show you have enjoyed recently.", bullets: ["what the film or show is called", "what it is about", "when and how you watched it"], followUp: "and explain why you enjoyed it and would recommend it." },
  { category: "Activities", topic: "Describe an activity you enjoy doing outdoors.", bullets: ["what the activity is", "where you usually do it", "who you do it with"], followUp: "and explain why you prefer doing this activity outdoors." },

  // SOCIAL & ABSTRACT
  { category: "Social", topic: "Describe a tradition in your family that you enjoy.", bullets: ["what the tradition is", "how long your family has followed it", "how it is carried out"], followUp: "and explain why this tradition is important to your family." },
  { category: "Social", topic: "Describe an important conversation you have had.", bullets: ["who you spoke with", "what the conversation was about", "when and where it took place"], followUp: "and explain why this conversation was so important to you." },
  { category: "Social", topic: "Describe a piece of advice you received that was very helpful.", bullets: ["who gave you the advice", "what the advice was", "when you received it"], followUp: "and explain how following this advice helped you." },
  { category: "Social", topic: "Describe a time when you worked as part of a team.", bullets: ["what the task or project was", "who was in your team", "what your role was"], followUp: "and explain what you learned from working with others on this." },

  // AMBITIONS & FUTURE
  { category: "Future", topic: "Describe a job or career you would like to have in the future.", bullets: ["what the job is", "what skills or qualifications it requires", "why you are interested in it"], followUp: "and explain what steps you are taking to achieve this goal." },
  { category: "Future", topic: "Describe something you would like to change about your hometown.", bullets: ["what you would change", "why you think this change is needed", "how the change could be made"], followUp: "and explain how this change would benefit the people who live there." },
  { category: "Future", topic: "Describe an ambition you have not yet achieved.", bullets: ["what the ambition is", "why you have this ambition", "what obstacles you have faced"], followUp: "and explain what you are doing to try to achieve it." },
  { category: "Future", topic: "Describe a country you would most like to live in (other than your own).", bullets: ["which country it is", "what you know about it", "what your life there might be like"], followUp: "and explain why you would choose to live in this country." },
  { category: "Future", topic: "Describe an invention from the last 100 years that has changed the world.", bullets: ["what the invention is", "when and by whom it was invented", "how it works"], followUp: "and explain why you think this invention has had such a big impact." },
];

// ─── Part 1 & 3 Topic Banks ───────────────────────────────────────────────────
interface TopicSet { topic: string; emoji: string; questions: string[]; }

const PART1_TOPICS: TopicSet[] = [
  { topic: "Hometown & Home", emoji: "🏡", questions: ["Where are you from originally? Tell me a little about your hometown.", "Do you enjoy living there? What do you like most about it?", "Has your hometown changed much in recent years? How?", "What is your hometown famous for?", "Would you like to continue living there in the future, or move somewhere else?"] },
  { topic: "Work & Study", emoji: "📚", questions: ["Do you work or are you a student? Tell me what you do.", "What do you enjoy most about your work or studies?", "Do you prefer working or studying alone, or with other people? Why?", "Is your current job or subject what you originally planned to do?", "What are your plans for the future in terms of career or study?"] },
  { topic: "Free Time & Hobbies", emoji: "🎯", questions: ["What do you usually do in your free time?", "How do you typically spend your weekends?", "Do you prefer indoor or outdoor activities? Why?", "Has your hobby changed compared to when you were younger?", "Do you feel you have enough free time, or are you too busy?"] },
  { topic: "Technology", emoji: "📱", questions: ["How often do you use the internet? What do you mainly use it for?", "Do you think smartphones have changed people's lives? In what ways?", "Do you prefer reading books or reading on a screen? Why?", "Which apps do you use most often on your phone?", "Do you think children use technology too much these days?"] },
  { topic: "Food & Cooking", emoji: "🍜", questions: ["What is your favourite food? Why do you like it?", "Do you prefer eating at home or eating out? Why?", "Can you cook? Do you enjoy cooking?", "Is there any food from other countries that you enjoy?", "Has your diet changed compared to when you were a child?"] },
  { topic: "Travel & Transport", emoji: "✈️", questions: ["How do you usually travel around your city?", "Have you ever visited another country? Where did you go?", "Where would you most like to visit in the future? Why?", "Do you prefer travelling by train, bus, or plane? Why?", "Do you think people travel more now than they did in the past?"] },
  { topic: "Health & Sport", emoji: "🏃", questions: ["Do you do any sport or exercise regularly? What do you do?", "How do you try to stay healthy in your daily life?", "Do you think people in your country are generally healthy?", "What sport is most popular where you live?", "Did you do more sport when you were a child than you do now?"] },
  { topic: "Shopping", emoji: "🛍️", questions: ["Do you enjoy shopping? Why or why not?", "Do you prefer shopping online or in a physical shop? Why?", "How often do you go shopping for clothes or other items?", "What was the last significant thing you bought?", "Do you think people buy too many things they don't really need?"] },
  { topic: "Nature & Weather", emoji: "🌿", questions: ["What kind of weather do you like best? Why?", "Do you enjoy spending time in nature? What do you do there?", "How does the weather in your country affect people's daily lives?", "Have you noticed any changes in the climate in recent years?", "Would you rather live in a hot country or a cold country? Why?"] },
  { topic: "Art & Music", emoji: "🎵", questions: ["Are you interested in art? Do you visit museums or galleries?", "Do you listen to music? What kind of music do you enjoy?", "Do you play any musical instruments? Would you like to learn one?", "What traditional customs or arts from your culture do you enjoy?", "Do you think art and music should be taught in schools? Why?"] },
  { topic: "Friends & Family", emoji: "👨‍👩‍👧", questions: ["Do you have a large family or a small family?", "How often do you spend time with your family?", "How do you usually keep in touch with your friends?", "Are your friends mostly from school, work, or somewhere else?", "Is it easy to make new friends where you live?"] },
  { topic: "Daily Routine", emoji: "⏰", questions: ["What time do you usually wake up? Do you consider yourself a morning person?", "What do you typically eat for breakfast?", "How do you get to work or school each day?", "What do you usually do in the evenings after work or study?", "Is your daily routine during the week different from your weekends?"] },
];

const PART3_TOPICS: TopicSet[] = [
  { topic: "Technology & Society", emoji: "💻", questions: ["How has technology changed the way people communicate in your country?", "Do you think people rely too much on technology today? Why?", "What are the main advantages and disadvantages of social media?", "How do you think technology will change education in the next 20 years?", "Should governments have more control over how technology companies use people's data?"] },
  { topic: "Education", emoji: "🎓", questions: ["What qualities do you think a good teacher should have?", "Do you think a university education is necessary for success in life? Why?", "How has education changed in your country over the last generation?", "Should children learn a foreign language from a very young age? Why?", "What do you think is more important — academic knowledge or practical skills?"] },
  { topic: "Environment & Climate", emoji: "🌍", questions: ["What role should governments play in protecting the environment?", "Do you think individuals or large companies are more responsible for environmental problems?", "What lifestyle changes could ordinary people make to help the environment?", "Is it too late to prevent serious climate change, in your view?", "How can we balance economic development with protecting the natural environment?"] },
  { topic: "Work & Economy", emoji: "💼", questions: ["Do you think it is better to work for yourself or for an employer? Why?", "How has the nature of work changed over the last few decades?", "What skills do you think will be most important in the workplace of the future?", "Should employees have the right to work from home permanently?", "Is it fair that some people earn significantly more money than others? Why?"] },
  { topic: "Society & Values", emoji: "🤝", questions: ["Do you think traditional values are still important in modern society?", "How important is it for young people to maintain close relationships with older generations?", "What are the main causes of stress in modern life, and how can people deal with it?", "Do you think people today are more individualistic and less community-minded than in the past?", "How has the role of women in society changed over the last 50 years in your country?"] },
  { topic: "Cities & Urbanisation", emoji: "🏙️", questions: ["What are the main advantages and disadvantages of living in a big city?", "Why do so many people continue to move from rural areas to cities?", "How can governments make cities more liveable for their residents?", "What problems do rapidly growing cities typically face?", "Do you think the future of cities lies in so-called 'smart cities'? Why?"] },
  { topic: "Health & Medicine", emoji: "🏥", questions: ["Who do you think is more responsible for people's health — individuals or governments?", "Why do you think so many people today lead unhealthy lifestyles?", "How has medical technology improved people's quality of life in recent years?", "Do you think healthcare should be completely free for everyone?", "How do you think artificial intelligence will change medicine in the future?"] },
  { topic: "Tourism & Travel", emoji: "🗺️", questions: ["Is tourism always beneficial for a country, or can it cause problems?", "How has international tourism changed over the last few decades?", "What are the main negative effects of mass tourism on local communities?", "Should governments limit the number of tourists allowed to visit certain places?", "Do you think tourism helps promote understanding between different cultures?"] },
  { topic: "Media & Communication", emoji: "📺", questions: ["How has the internet changed the way people get their news?", "Do you think social media has made it easier or harder to know what is true?", "Should governments be allowed to restrict what people post online?", "How do you think the role of traditional newspapers will change in the future?", "What responsibilities do journalists and media organisations have to the public?"] },
  { topic: "Globalisation & Culture", emoji: "🌐", questions: ["What are the main benefits of globalisation for ordinary people?", "Do you think globalisation is causing local cultures and traditions to disappear?", "Should countries try to protect their local industries from foreign competition?", "How has the spread of English as a global language affected other languages?", "In your view, does globalisation lead to greater equality between countries, or greater inequality?"] },
];

// Real IELTS: Part 1 = 4–5 min, Part 2 = up to 2 min, Part 3 = 4–5 min
const PART_LIMITS: Record<SpeakingPart, number> = { 1: 300, 2: 120, 3: 300 };
const PART_MIN:   Record<SpeakingPart, number> = { 1:  60, 2:  60, 3:  60 };

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SpeakingSkeletonLoader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full rounded-xl" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  );
}

// ─── Topic Picker (Part 1 & 3) ────────────────────────────────────────────────
function TopicPicker({ topics, onSelect, onRandom, part }: {
  topics: TopicSet[]; onSelect: (idx: number) => void; onRandom: () => void; part: SpeakingPart;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">{part === 1 ? "Choose a topic for your interview" : "Choose a discussion theme"}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{part === 1 ? "Practice 4–5 questions on this topic (real exam covers 3–4 different topics)" : "Discuss 4–6 in-depth analytical questions (aim for 2–3 min per answer)"}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onRandom} className="gap-1.5 shrink-0">
          <Shuffle className="w-3.5 h-3.5" /> Random
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {topics.map((t, i) => (
          <button key={i} onClick={() => onSelect(i)}
            className="flex items-center gap-2.5 p-3 rounded-xl border bg-card hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all text-left group">
            <span className="text-xl shrink-0">{t.emoji}</span>
            <span className="text-xs font-medium text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-300 leading-tight">{t.topic}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Cue Card Picker (Part 2) ─────────────────────────────────────────────────
function CueCardPicker({ onSelect, onRandom }: {
  onSelect: (card: CueCardData) => void;
  onRandom: () => void;
}) {
  const categories = [...new Set(CUE_CARDS.map(c => c.category))];
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All" ? CUE_CARDS : CUE_CARDS.filter(c => c.category === activeCategory);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">Choose a cue card topic</p>
          <p className="text-xs text-muted-foreground mt-0.5">You will have 1 minute to prepare, then speak for 1–2 minutes</p>
        </div>
        <Button variant="outline" size="sm" onClick={onRandom} className="gap-1.5 shrink-0">
          <Shuffle className="w-3.5 h-3.5" /> Random
        </Button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["All", ...categories].map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1 rounded-full border transition-all ${
              activeCategory === cat ? "bg-blue-600 text-white border-blue-600" : "border-border text-muted-foreground hover:border-blue-300 hover:text-foreground"
            }`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-2 max-h-96 overflow-y-auto pr-1">
        {filtered.map((card, i) => (
          <button key={i} onClick={() => onSelect(card)}
            className="text-left p-3 rounded-xl border bg-card hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all">
            <p className="text-xs font-medium text-foreground leading-snug">{card.topic}</p>
            <p className="text-xs text-muted-foreground mt-0.5 italic">and {card.followUp.replace("and ", "")}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Cue Card Display ─────────────────────────────────────────────────────────
function CueCardDisplay({ card, prepTimeLeft, isPrep, notes, onNotesChange }: {
  card: CueCardData;
  prepTimeLeft?: number;
  isPrep?: boolean;
  notes: string;
  onNotesChange: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <Badge variant="outline" className="text-xs text-blue-600 border-blue-300 shrink-0">{card.category}</Badge>
          {isPrep && prepTimeLeft !== undefined && (
            <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-blue-600 shrink-0">
              <PencilLine className="w-3.5 h-3.5" />
              {prepTimeLeft}s left
            </div>
          )}
        </div>
        <p className="font-semibold text-base text-foreground leading-snug mb-4">{card.topic}</p>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">You should say:</p>
        <ul className="space-y-1.5 mb-4">
          {card.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="text-blue-400 font-bold shrink-0 mt-0.5">•</span>
              {b}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground italic border-t pt-3">{card.followUp}</p>
      </div>
      {isPrep && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <PencilLine className="w-3.5 h-3.5 text-blue-600" />
            <p className="text-sm font-medium">Preparation notes</p>
            <span className="text-xs text-muted-foreground">(use this 1 minute to plan your answer)</span>
          </div>
          <Textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Jot down key points, examples, vocabulary...&#10;• Who / What / When / Where&#10;• Why it's memorable&#10;• Key vocabulary to use"
            className="min-h-[140px] resize-none font-mono text-sm leading-relaxed bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 placeholder:text-amber-400"
          />
          <p className="text-xs text-muted-foreground">These notes are for your eyes only — not submitted or scored.</p>
        </div>
      )}
      {!isPrep && notes.trim() && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <PencilLine className="w-3 h-3" /> Your prep notes
          </p>
          <div className="text-sm font-mono leading-relaxed bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2.5 text-foreground whitespace-pre-wrap">
            {notes}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared band-picker helpers ───────────────────────────────────────────────
type BandKey = "band5" | "band6" | "band7" | "band8";

const BAND_TABS = [
  { key: "band5" as BandKey, label: "Band 5", activeBg: "bg-red-500",     activeRing: "ring-red-300",     descColor: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300",     desc: "Simple sentences, basic vocabulary — a solid first step" },
  { key: "band6" as BandKey, label: "Band 6", activeBg: "bg-amber-500",   activeRing: "ring-amber-300",   descColor: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",   desc: "Adequate structure, reasonable vocabulary — clear and competent" },
  { key: "band7" as BandKey, label: "Band 7", activeBg: "bg-blue-500", activeRing: "ring-blue-300", descColor: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300", desc: "Good range, mostly accurate — well organised and convincing" },
  { key: "band8" as BandKey, label: "Band 8+", activeBg: "bg-blue-600", activeRing: "ring-blue-300", descColor: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300", desc: "Sophisticated, idiomatic, natural — examiner-level quality" },
] as const;

function getDefaultBand(score: number): BandKey {
  if (score <= 5.0) return "band5";
  if (score <= 6.0) return "band6";
  if (score <= 7.0) return "band7";
  return "band8";
}

function SpeakingModelAnswer({ result }: { result: SpeakingResult }) {
  const hasMultiBand = !!result.model_answers;
  const defaultBand = getDefaultBand(result.scores.overall);
  const [selected, setSelected] = useState<BandKey>(defaultBand);
  const [copied, setCopied] = useState(false);

  const text = hasMultiBand
    ? result.model_answers![selected]
    : (result.model_answer ?? "");

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tab = BAND_TABS.find(t => t.key === selected)!;

  return (
    <Card className="border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-blue-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Model Answer
          </CardTitle>
          <button onClick={copy} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            {copied ? <Check className="w-3.5 h-3.5 text-blue-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {hasMultiBand ? (
          <>
            {/* Band selector */}
            <div className="flex flex-wrap gap-2">
              {BAND_TABS.map(t => {
                const isSelected = selected === t.key;
                const isDefault  = t.key === defaultBand;
                return (
                  <button
                    key={t.key}
                    onClick={() => setSelected(t.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      isSelected
                        ? `${t.activeBg} text-white border-transparent shadow-sm`
                        : "bg-background border-border text-muted-foreground hover:border-blue-300 hover:text-foreground"
                    }`}
                  >
                    {t.label}
                    {isDefault && (
                      <span className={`text-[10px] font-normal ${isSelected ? "text-white/80" : "text-emerald-600"}`}>
                        ← your level
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desc chip */}
            <div className={`text-xs rounded-lg px-3 py-2 border ${tab.descColor}`}>
              <span className="font-semibold">{tab.label}:</span> {tab.desc}
            </div>
          </>
        ) : null}

        {/* Answer text */}
        <p className="text-sm leading-relaxed text-foreground">{text}</p>

        {/* Nudge to see Band 8 */}
        {hasMultiBand && selected !== "band8" && (
          <p className="text-xs text-muted-foreground border-t pt-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-400 shrink-0" />
            Compare with{" "}
            <button onClick={() => setSelected("band8")} className="text-blue-600 hover:underline font-medium">
              Band 8+ answer
            </button>{" "}
            to see how far you can stretch.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Practice Results View ────────────────────────────────────────────────────
function SpeakingResultView({ result }: { result: SpeakingResult }) {
  const criteria = [
    { key: "fluency_coherence",  label: "Fluency & Coherence",  value: result.scores.fluency_coherence },
    { key: "lexical_resource",   label: "Lexical Resource",     value: result.scores.lexical_resource },
    { key: "grammatical_range",  label: "Grammar & Accuracy",   value: result.scores.grammatical_range },
    { key: "pronunciation",      label: "Pronunciation",        value: result.scores.pronunciation },
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
                <p className="text-2xl font-mono font-bold">{formatBand(result.scores.overall)}</p>
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
            {criteria.map(({ key, label, value }) => <BandScoreRing key={key} band={value} size={80} strokeWidth={7} label={label} />)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your Transcript</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-foreground leading-relaxed font-mono whitespace-pre-wrap">{result.transcript}</p></CardContent>
      </Card>
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-emerald-600">✓ Strengths</CardTitle></CardHeader>
          <CardContent><ul className="space-y-1.5">{result.strengths.map((s, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-emerald-500 shrink-0">•</span>{s}</li>)}</ul></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-red-600">✗ Weaknesses</CardTitle></CardHeader>
          <CardContent><ul className="space-y-1.5">{result.weaknesses.map((w, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-red-500 shrink-0">•</span>{w}</li>)}</ul></CardContent>
        </Card>
      </div>
      {result.pronunciation_issues.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pronunciation Issues</CardTitle></CardHeader>
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
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Grammar Issues</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {result.grammar_issues.map((g, i) => (
              <div key={i} className="text-sm border rounded-md p-3 bg-card">
                <div className="line-through text-red-500">&ldquo;{g.said}&rdquo;</div>
                <div className="text-emerald-600 font-medium mt-1">&ldquo;{g.should_be}&rdquo;</div>
                <p className="text-xs text-muted-foreground mt-1.5">{g.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      {result.vocabulary_suggestions && result.vocabulary_suggestions.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Vocabulary Upgrades</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {result.vocabulary_suggestions.map((v, i) => (
              <div key={i} className="text-sm border rounded-md p-3 bg-card">
                <span className="text-muted-foreground line-through">{v.basic_word}</span>
                <span className="mx-2 text-muted-foreground">→</span>
                <span className="text-emerald-600 font-semibold">{v.better_word}</span>
                <p className="text-xs text-muted-foreground mt-1 italic">&ldquo;{v.example}&rdquo;</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      <SpeakingModelAnswer result={result} />
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Next Actions</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {result.next_actions.map((action, i) => (
            <div key={i} className="flex gap-2.5 text-sm">
              <span className="font-mono font-bold text-blue-600 shrink-0">{i + 1}.</span>
              <span className="text-foreground">{action}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Mock Results View ────────────────────────────────────────────────────────
interface MockResultsData {
  part1: SpeakingResult[];
  part2: SpeakingResult;
  part3: SpeakingResult[];
}

function MockResultsView({ results, onRetry }: { results: MockResultsData; onRetry: () => void }) {
  const [expandedPart, setExpandedPart] = useState<number | null>(null);

  const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const p1Avg = avg(results.part1.map(r => r.scores.overall));
  const p2Score = results.part2.scores.overall;
  const p3Avg = avg(results.part3.map(r => r.scores.overall));
  const overallBand = roundBand(avg([p1Avg, p2Score, p3Avg]));

  const p1Band = roundBand(p1Avg);
  const p2Band = roundBand(p2Score);
  const p3Band = roundBand(p3Avg);

  const allResults = [...results.part1, results.part2, ...results.part3];
  const fluency  = roundBand(avg(allResults.map(r => r.scores.fluency_coherence)));
  const lexical  = roundBand(avg(allResults.map(r => r.scores.lexical_resource)));
  const grammar  = roundBand(avg(allResults.map(r => r.scores.grammatical_range)));
  const pronun   = roundBand(avg(allResults.map(r => r.scores.pronunciation)));

  // Deduplicated strengths/weaknesses
  const allStrengths = [...new Set(allResults.flatMap(r => r.strengths))].slice(0, 5);
  const allWeaknesses = [...new Set(allResults.flatMap(r => r.weaknesses))].slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-emerald-50/50 to-background dark:from-emerald-950/30">
        <CardContent className="pt-6">
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5" />
              Full Mock Test Complete
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <BandScoreRing band={overallBand} size={140} />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm text-muted-foreground">Overall Mock Band Score</p>
              <p className="text-5xl font-mono font-bold text-emerald-600">{formatBand(overallBand)}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Averaged across all {allResults.length} answers in your full IELTS Speaking mock test
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Part breakdown */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Part 1", sublabel: "Interview", band: p1Band, count: results.part1.length },
          { label: "Part 2", sublabel: "Cue Card", band: p2Band, count: 1 },
          { label: "Part 3", sublabel: "Discussion", band: p3Band, count: results.part3.length },
        ].map(({ label, sublabel, band, count }) => (
          <Card key={label} className="text-center">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
              <p className="text-2xl font-mono font-bold">{formatBand(band)}</p>
              <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
              <p className="text-xs text-muted-foreground opacity-60">{count} answer{count > 1 ? "s" : ""}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Criteria */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Overall Criterion Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <BandScoreRing band={fluency} size={80} strokeWidth={7} label="Fluency & Coherence" />
            <BandScoreRing band={lexical} size={80} strokeWidth={7} label="Lexical Resource" />
            <BandScoreRing band={grammar} size={80} strokeWidth={7} label="Grammar & Accuracy" />
            <BandScoreRing band={pronun}  size={80} strokeWidth={7} label="Pronunciation" />
          </div>
        </CardContent>
      </Card>

      {/* Strengths / Weaknesses */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-emerald-600">✓ Key Strengths</CardTitle></CardHeader>
          <CardContent><ul className="space-y-1.5">{allStrengths.map((s, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-emerald-500 shrink-0">•</span>{s}</li>)}</ul></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-red-600">✗ Areas to Improve</CardTitle></CardHeader>
          <CardContent><ul className="space-y-1.5">{allWeaknesses.map((w, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-red-500 shrink-0">•</span>{w}</li>)}</ul></CardContent>
        </Card>
      </div>

      {/* Question-by-question breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Question-by-Question Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {results.part1.map((r, i) => (
              <div key={`p1-${i}`} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Badge variant="outline" className="text-xs shrink-0 w-14 justify-center">P1 · Q{i + 1}</Badge>
                  <p className="text-xs text-muted-foreground truncate hidden sm:block">{r.transcript?.slice(0, 70)}…</p>
                </div>
                <span className="font-mono font-semibold text-sm text-emerald-600 shrink-0 ml-3">{formatBand(r.scores.overall)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2 border-b border-border/40">
              <div className="flex items-center gap-2.5 min-w-0">
                <Badge variant="outline" className="text-xs shrink-0 w-14 justify-center border-blue-300 text-emerald-600">P2</Badge>
                <p className="text-xs text-muted-foreground truncate hidden sm:block">{results.part2.transcript?.slice(0, 70)}…</p>
              </div>
              <span className="font-mono font-semibold text-sm text-emerald-600 shrink-0 ml-3">{formatBand(results.part2.scores.overall)}</span>
            </div>
            {results.part3.map((r, i) => (
              <div key={`p3-${i}`} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Badge variant="outline" className="text-xs shrink-0 w-14 justify-center">P3 · Q{i + 1}</Badge>
                  <p className="text-xs text-muted-foreground truncate hidden sm:block">{r.transcript?.slice(0, 70)}…</p>
                </div>
                <span className="font-mono font-semibold text-sm text-emerald-600 shrink-0 ml-3">{formatBand(r.scores.overall)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expandable detailed feedback per part */}
      {[
        { label: "Part 1 — Detailed Feedback", results: results.part1, partNum: 1 },
        { label: "Part 2 — Detailed Feedback", results: [results.part2], partNum: 2 },
        { label: "Part 3 — Detailed Feedback", results: results.part3, partNum: 3 },
      ].map(({ label, results: partResults, partNum }) => (
        <Card key={partNum}>
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setExpandedPart(expandedPart === partNum ? null : partNum)}
          >
            <span className="text-sm font-medium">{label}</span>
            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedPart === partNum ? "rotate-90" : ""}`} />
          </button>
          {expandedPart === partNum && (
            <CardContent className="pt-0 space-y-6">
              {partResults.map((r, i) => (
                <div key={i} className="space-y-3">
                  {partResults.length > 1 && (
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b pb-2">
                      Question {i + 1} · Band {formatBand(r.scores.overall)}
                    </p>
                  )}
                  <p className="text-sm font-mono leading-relaxed text-foreground bg-muted/40 rounded-lg p-3">{r.transcript}</p>
                  {r.grammar_issues.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">Grammar Issues</p>
                      {r.grammar_issues.slice(0, 2).map((g, j) => (
                        <div key={j} className="text-xs border rounded-md p-2 bg-card">
                          <span className="line-through text-red-500">{g.said}</span>
                          <span className="mx-2">→</span>
                          <span className="text-emerald-600 font-medium">{g.should_be}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {r.vocabulary_suggestions && r.vocabulary_suggestions.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Vocabulary Upgrades</p>
                      {r.vocabulary_suggestions.slice(0, 2).map((v, j) => (
                        <div key={j} className="text-xs border rounded-md p-2 bg-card flex gap-2">
                          <span className="text-muted-foreground line-through">{v.basic_word}</span>
                          <span>→</span>
                          <span className="text-emerald-600 font-semibold">{v.better_word}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      ))}

      <Button onClick={onRetry} className="w-full gap-2 text-white text-base py-6" style={{ background: "#2563eb" }}>
        <ClipboardList className="w-5 h-5" /> Take Another Mock Test
      </Button>
    </div>
  );
}

// ─── Mock Step Progress Bar ───────────────────────────────────────────────────
function MockProgressBar({ phase, p1Done, p2Done, p3Done }: {
  phase: string; p1Done: number; p2Done: boolean; p3Done: number;
}) {
  const steps = [
    { label: "Part 1", sublabel: "Interview", done: p1Done >= 5, active: phase === "p1" },
    { label: "Part 2", sublabel: "Cue Card",  done: p2Done,      active: phase === "p2" },
    { label: "Part 3", sublabel: "Discussion",done: p3Done >= 5, active: phase === "p3" },
  ];

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className={`flex-1 flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl transition-all ${
            step.active
              ? "bg-blue-100 dark:bg-blue-900/40"
              : step.done
              ? "bg-blue-50 dark:bg-blue-950/30"
              : "bg-muted/40"
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step.done
                ? "bg-blue-500 text-white"
                : step.active
                ? "bg-blue-600 text-white"
                : "bg-muted text-muted-foreground"
            }`}>
              {step.done ? "✓" : i + 1}
            </div>
            <p className={`text-xs font-semibold ${step.active ? "text-blue-700 dark:text-blue-300" : step.done ? "text-blue-600" : "text-muted-foreground"}`}>{step.label}</p>
            <p className="text-xs text-muted-foreground hidden sm:block">{step.sublabel}</p>
          </div>
          {i < steps.length - 1 && <div className="h-px w-3 bg-border shrink-0" />}
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SpeakingPage() {
  // ── Mode ──────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<"practice" | "mock">("practice");

  // ── Practice: Part 1 & 3 ──────────────────────────────────────────────────
  const [part, setPart] = useState<SpeakingPart>(1);
  const [selectedTopicIdx, setSelectedTopicIdx] = useState<number | null>(null);
  const [questionInSet, setQuestionInSet] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  // ── Practice: Part 2 ──────────────────────────────────────────────────────
  const [selectedCard, setSelectedCard] = useState<CueCardData | null>(null);
  const [prepNotes, setPrepNotes] = useState("");
  const [prepTimeLeft, setPrepTimeLeft] = useState(60);
  const [prepActive, setPrepActive] = useState(false);
  const [recordingEnabled, setRecordingEnabled] = useState(false);

  // ── Practice: Shared ──────────────────────────────────────────────────────
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeakingResult | null>(null);
  const prepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Mock Test State ───────────────────────────────────────────────────────
  type MockPhase = "intro" | "p1" | "p2" | "p3" | "scoring" | "results";
  const [mockPhase, setMockPhase] = useState<MockPhase>("intro");
  const [mockP1Topic, setMockP1Topic] = useState<TopicSet | null>(null);
  const [mockP3Topic, setMockP3Topic] = useState<TopicSet | null>(null);
  const [mockCueCard, setMockCueCard] = useState<CueCardData | null>(null);
  const [mockQIdx, setMockQIdx]   = useState(0);

  const [mockRecordings, setMockRecordings] = useState<{ part: 1 | 2 | 3; question: string; blob: Blob }[]>([]);
  const [mockAudioBlob, setMockAudioBlob]   = useState<Blob | null>(null);

  // Part 2 prep in mock
  const [mockPrepActive, setMockPrepActive]           = useState(false);
  const [mockPrepTimeLeft, setMockPrepTimeLeft]       = useState(60);
  const [mockPrepNotes, setMockPrepNotes]             = useState("");
  const [mockRecordingEnabled, setMockRecordingEnabled] = useState(false);

  const [mockResults, setMockResults] = useState<MockResultsData | null>(null);
  const [mockScoringProgress, setMockScoringProgress] = useState(0);
  const [mockTotalToScore, setMockTotalToScore]       = useState(11);

  const mockPrepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Practice derived values ───────────────────────────────────────────────
  const topics = part === 1 ? PART1_TOPICS : PART3_TOPICS;
  const currentTopicSet = selectedTopicIdx !== null ? topics[selectedTopicIdx] : null;
  const currentQuestion =
    part === 2
      ? selectedCard ? `${selectedCard.topic} You should say: ${selectedCard.bullets.join(", ")}. ${selectedCard.followUp}` : ""
      : currentTopicSet?.questions[questionInSet] ?? "";
  const totalQsInSet = currentTopicSet?.questions.length ?? 0;
  const isLastQuestion = questionInSet === totalQsInSet - 1;

  // ── Practice functions ────────────────────────────────────────────────────
  function resetForNewPart(p: SpeakingPart) {
    setPart(p);
    setSelectedTopicIdx(null); setQuestionInSet(0); setCompletedQuestions([]);
    setSelectedCard(null); setPrepNotes(""); setPrepActive(false); setPrepTimeLeft(60); setRecordingEnabled(false);
    setResult(null); setAudioBlob(null);
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
  }

  function selectTopic(idx: number) { setSelectedTopicIdx(idx); setQuestionInSet(0); setCompletedQuestions([]); setResult(null); setAudioBlob(null); }
  function selectRandomTopic() { selectTopic(Math.floor(Math.random() * topics.length)); }
  function handleNextQuestion() { setCompletedQuestions(p => [...p, questionInSet]); setQuestionInSet(p => p + 1); setResult(null); setAudioBlob(null); }
  function handleChangeTopic() { setSelectedTopicIdx(null); setQuestionInSet(0); setCompletedQuestions([]); setResult(null); setAudioBlob(null); }

  function selectCueCard(card: CueCardData) {
    setSelectedCard(card); setPrepNotes(""); setPrepActive(false); setRecordingEnabled(false); setResult(null); setAudioBlob(null); setPrepTimeLeft(60);
  }
  function selectRandomCard() { selectCueCard(CUE_CARDS[Math.floor(Math.random() * CUE_CARDS.length)]); }

  function playDing() {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      // Two-tone ding: high then slightly lower
      osc.frequency.setValueAtTime(1047, ctx.currentTime);       // C6
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.18); // A5
      gain.gain.setValueAtTime(0.55, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.1);
    } catch { /* ignore */ }
  }

  function startPrep() {
    const startAt = Date.now();
    const TOTAL = 60;
    setPrepActive(true); setPrepTimeLeft(TOTAL); setRecordingEnabled(false);
    prepTimerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startAt) / 1000);
      const remaining = Math.max(0, TOTAL - elapsed);
      setPrepTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(prepTimerRef.current!);
        playDing();
        setRecordingEnabled(true);
        setPrepActive(false);
      }
    }, 200); // poll every 200 ms so wall-clock drift is minimal
  }

  function handleReset() {
    setResult(null); setAudioBlob(null);
    if (part === 2) { setRecordingEnabled(false); setPrepActive(false); setPrepTimeLeft(60); setPrepNotes(""); }
    else { setRecordingEnabled(true); }
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
  }

  async function handleScore() {
    if (!audioBlob) { toast.error("No recording found"); return; }
    setLoading(true); setResult(null);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("part", String(part));
      formData.append("question", currentQuestion);
      const res = await fetch("/api/speaking/score", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Scoring failed"); return; }
      setResult(data.result);
      if (data.result.scores.overall >= 7) confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#8b5cf6", "#10b981", "#f59e0b"] });
      setTimeout(() => document.getElementById("speaking-results")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch { toast.error("Network error. Please try again."); }
    finally { setLoading(false); }
  }

  // ── Mock Test functions ───────────────────────────────────────────────────
  function startMockTest() {
    const p1 = PART1_TOPICS[Math.floor(Math.random() * PART1_TOPICS.length)];
    const p3 = PART3_TOPICS[Math.floor(Math.random() * PART3_TOPICS.length)];
    const card = CUE_CARDS[Math.floor(Math.random() * CUE_CARDS.length)];
    setMockP1Topic(p1);
    setMockP3Topic(p3);
    setMockCueCard(card);
    setMockQIdx(0);
    setMockRecordings([]);
    setMockAudioBlob(null);
    setMockPrepActive(false);
    setMockPrepTimeLeft(60);
    setMockPrepNotes("");
    setMockRecordingEnabled(false);
    setMockResults(null);
    setMockScoringProgress(0);
    setMockPhase("p1");
    if (mockPrepTimerRef.current) clearInterval(mockPrepTimerRef.current);
  }

  function mockSaveAndNext(recordings: typeof mockRecordings) {
    if (!mockAudioBlob) return;
    const blob = mockAudioBlob;
    setMockAudioBlob(null);

    if (mockPhase === "p1") {
      const question = mockP1Topic!.questions[mockQIdx];
      const updated = [...recordings, { part: 1 as const, question, blob }];
      setMockRecordings(updated);
      if (mockQIdx < 4) {
        setMockQIdx(mockQIdx + 1);
      } else {
        setMockQIdx(0);
        setMockPhase("p2");
      }
    } else if (mockPhase === "p2") {
      const question = `${mockCueCard!.topic} You should say: ${mockCueCard!.bullets.join(", ")}. ${mockCueCard!.followUp}`;
      const updated = [...recordings, { part: 2 as const, question, blob }];
      setMockRecordings(updated);
      setMockQIdx(0);
      setMockPrepActive(false);
      setMockPrepTimeLeft(60);
      setMockPrepNotes("");
      setMockRecordingEnabled(false);
      if (mockPrepTimerRef.current) clearInterval(mockPrepTimerRef.current);
      setMockPhase("p3");
    } else if (mockPhase === "p3") {
      const question = mockP3Topic!.questions[mockQIdx];
      const updated = [...recordings, { part: 3 as const, question, blob }];
      setMockRecordings(updated);
      if (mockQIdx < 4) {
        setMockQIdx(mockQIdx + 1);
      } else {
        // All done — submit
        submitMockTest(updated);
      }
    }
  }

  function startMockPrep() {
    const startAt = Date.now();
    const TOTAL = 60;
    setMockPrepActive(true);
    setMockPrepTimeLeft(TOTAL);
    setMockRecordingEnabled(false);
    mockPrepTimerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startAt) / 1000);
      const remaining = Math.max(0, TOTAL - elapsed);
      setMockPrepTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(mockPrepTimerRef.current!);
        playDing();
        setMockRecordingEnabled(true);
        setMockPrepActive(false);
      }
    }, 200);
  }

  async function submitMockTest(allRecordings: typeof mockRecordings) {
    const total = allRecordings.length;
    setMockTotalToScore(total);
    setMockScoringProgress(0);
    setMockPhase("scoring");

    let completed = 0;

    const scoreOne = async (r: typeof allRecordings[0]) => {
      const formData = new FormData();
      formData.append("audio", r.blob, "recording.webm");
      formData.append("part", String(r.part));
      formData.append("question", r.question);
      const res = await fetch("/api/speaking/score", { method: "POST", body: formData });
      const data = await res.json();
      completed++;
      setMockScoringProgress(completed);
      if (!res.ok) throw new Error(data.error ?? "scoring failed");
      return { part: r.part as 1 | 2 | 3, result: data.result as SpeakingResult };
    };

    const settled = await Promise.allSettled(allRecordings.map(scoreOne));

    const succeeded = settled
      .filter((s): s is PromiseFulfilledResult<{ part: 1|2|3; result: SpeakingResult }> => s.status === "fulfilled")
      .map(s => s.value);

    const part1Results = succeeded.filter(s => s.part === 1).map(s => s.result);
    const part2Result  = succeeded.find(s => s.part === 2)?.result;
    const part3Results = succeeded.filter(s => s.part === 3).map(s => s.result);

    if (!part2Result || part1Results.length === 0 || part3Results.length === 0) {
      toast.error("Some answers could not be scored. Please try the mock test again.");
      setMockPhase("intro");
      return;
    }

    const results: MockResultsData = { part1: part1Results, part2: part2Result, part3: part3Results };
    setMockResults(results);
    setMockPhase("results");

    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const overall = avg([
      avg(part1Results.map(r => r.scores.overall)),
      part2Result.scores.overall,
      avg(part3Results.map(r => r.scores.overall)),
    ]);
    if (overall >= 7) confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 }, colors: ["#8b5cf6", "#10b981", "#f59e0b", "#3b82f6"] });
    setTimeout(() => document.getElementById("mock-results-top")?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  // Derived: how many P1/P3 answers saved so far
  const p1Saved = mockRecordings.filter(r => r.part === 1).length;
  const p2Saved = mockRecordings.some(r => r.part === 2);
  const p3Saved = mockRecordings.filter(r => r.part === 3).length;

  // ── Render ────────────────────────────────────────────────────────────────
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
      border: "1px solid #e2e8f0", borderLeft: "4px solid #2563eb",
      padding: "20px 24px", marginBottom: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    }}>
      <p style={{ fontSize: "11px", fontWeight: 600, color: "#2563eb", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
        IELTS Academic
      </p>
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
        Speaking Practice
      </h1>
      <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>
        3 parts · Practice individually or take a full mock · AI band score
      </p>
    </div>

    <div className="space-y-6">

      {/* ── Mode Selector ── */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={() => setMode("practice")}
          style={{ padding: "10px 20px", borderRadius: "6px", cursor: "pointer",
            border: mode === "practice" ? "2px solid #2563eb" : "1px solid #e2e8f0",
            background: mode === "practice" ? "#eff6ff" : "#ffffff",
            color: mode === "practice" ? "#2563eb" : "#64748b",
            fontSize: "13.5px", fontWeight: 600,
            display: "flex", alignItems: "center", gap: "8px", transition: "all 0.15s",
          }}
        >
          ▷ Practice
          <span style={{ fontSize: "11px", fontWeight: 400, color: "#94a3b8" }}>Choose parts · replay anytime</span>
        </button>
        <button
          onClick={() => { setMode("mock"); if (mockPhase === "intro") setMockPhase("intro"); }}
          style={{ padding: "10px 20px", borderRadius: "6px", cursor: "pointer",
            border: mode === "mock" ? "2px solid #2563eb" : "1px solid #e2e8f0",
            background: mode === "mock" ? "#eff6ff" : "#ffffff",
            color: mode === "mock" ? "#2563eb" : "#64748b",
            fontSize: "13.5px", fontWeight: 600,
            display: "flex", alignItems: "center", gap: "8px", transition: "all 0.15s",
          }}
        >
          📋 Full Mock Test
          <span style={{ fontSize: "11px", fontWeight: 400, color: "#94a3b8" }}>~15 min</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          PRACTICE MODE
      ══════════════════════════════════════════════════════════════════════ */}
      {mode === "practice" && (
        <>
          <PartSelector selected={part} onChange={resetForNewPart} />

          {/* ── PART 1 & 3 ── */}
          {part !== 2 && (
            <>
              {selectedTopicIdx === null ? (
                <Card><CardContent className="pt-5 pb-5">
                  <TopicPicker topics={topics} onSelect={selectTopic} onRandom={selectRandomTopic} part={part} />
                </CardContent></Card>
              ) : (
                <>
                  <Card><CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{currentTopicSet!.emoji}</span>
                          <span className="font-semibold text-sm">{currentTopicSet!.topic}</span>
                          <Badge variant="outline" className="text-xs ml-auto">Q{questionInSet + 1} / {totalQsInSet}</Badge>
                        </div>
                        <div className="flex gap-1.5 mb-4">
                          {currentTopicSet!.questions.map((_, i) => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${completedQuestions.includes(i) ? "bg-blue-500" : i === questionInSet ? "bg-blue-400" : "bg-muted"}`} />
                          ))}
                        </div>
                        <p className="font-medium text-base leading-relaxed">{currentTopicSet!.questions[questionInSet]}</p>
                      </div>
                    </div>
                    {!result && !loading && (
                      <button onClick={handleChangeTopic} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Change topic
                      </button>
                    )}
                  </CardContent></Card>

                  {!result && (
                    <Card><CardContent className="pt-5 pb-6">
                      {/* Mic permission notice */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 mb-4">
                        <Mic className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Your browser will ask for <strong>microphone access</strong> when you click Record. Allow it to continue.</span>
                      </div>
                      <Recorder limitSeconds={PART_LIMITS[part]} minSeconds={PART_MIN[part]} onRecordingComplete={setAudioBlob} disabled={loading}
                        label={part === 1 ? "Answer in 20–35 seconds" : "Discuss in depth — aim for 1–2 minutes"} />
                    </CardContent></Card>
                  )}

                  {audioBlob && !result && (
                    <Button onClick={handleScore} disabled={loading} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Scoring…</> : <><Mic className="w-4 h-4" /> Get Band Score</>}
                    </Button>
                  )}

                  {result && !loading && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      {!isLastQuestion ? (
                        <Button onClick={handleNextQuestion} className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                          Next Question <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button onClick={handleChangeTopic} className="flex-1 gap-2 bg-blue-500 hover:bg-blue-600 text-white">
                          <CheckCircle2 className="w-4 h-4" /> Topic Complete — Try Another
                        </Button>
                      )}
                      <Button variant="outline" onClick={handleReset} className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Try again
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* ── PART 2 ── */}
          {part === 2 && (
            <>
              {!selectedCard && (
                <Card><CardContent className="pt-5 pb-5">
                  <CueCardPicker onSelect={selectCueCard} onRandom={selectRandomCard} />
                </CardContent></Card>
              )}

              {selectedCard && (
                <>
                  <Card>
                    <CardContent className="pt-5 pb-5">
                      <CueCardDisplay
                        card={selectedCard}
                        prepTimeLeft={prepActive ? prepTimeLeft : undefined}
                        isPrep={prepActive}
                        notes={prepNotes}
                        onNotesChange={setPrepNotes}
                      />
                      {!prepActive && !recordingEnabled && !result && !audioBlob && (
                        <button onClick={() => { setSelectedCard(null); setPrepNotes(""); }}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-4 transition-colors">
                          <ArrowLeft className="w-3 h-3" /> Choose a different card
                        </button>
                      )}
                    </CardContent>
                  </Card>

                  {!prepActive && !recordingEnabled && !result && (
                    <Button onClick={startPrep} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                      ✏️ Start 1-minute preparation time
                    </Button>
                  )}

                  {prepActive && (
                    <SpeakingTimer elapsed={60 - prepTimeLeft} limit={60} label="Make notes and plan your answer" warning={10} />
                  )}

                  {recordingEnabled && !result && (
                    <Card><CardContent className="pt-5 pb-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 mb-4">
                        <Mic className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Preparation time is over — speak for <strong>1–2 minutes</strong>. The examiner may ask 1–2 follow-up questions after.</span>
                      </div>
                      <Recorder limitSeconds={PART_LIMITS[2]} minSeconds={PART_MIN[2]} onRecordingComplete={setAudioBlob} disabled={loading}
                        label="Speak for 1–2 minutes" autoStart={recordingEnabled} />
                    </CardContent></Card>
                  )}

                  {audioBlob && !result && (
                    <Button onClick={handleScore} disabled={loading} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Scoring…</> : <><Mic className="w-4 h-4" /> Get Band Score</>}
                    </Button>
                  )}

                  {result && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={() => { setSelectedCard(null); setPrepNotes(""); setResult(null); setAudioBlob(null); setRecordingEnabled(false); setPrepTimeLeft(60); }}
                        className="flex-1 gap-2 bg-blue-500 hover:bg-blue-600 text-white">
                        <CheckCircle2 className="w-4 h-4" /> Try Another Card
                      </Button>
                      <Button variant="outline" onClick={handleReset} className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Try again
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Practice loading */}
          {loading && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 animate-pulse flex items-center justify-center shrink-0">
                  <span className="text-sm">🎓</span>
                </div>
                <p className="text-sm text-muted-foreground animate-pulse font-medium">IELTS Sensei is analysing your speaking…</p>
              </div>
              <SpeakingSkeletonLoader />
            </div>
          )}

          {/* Practice results */}
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
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MOCK TEST MODE
      ══════════════════════════════════════════════════════════════════════ */}
      {mode === "mock" && (
        <>
          {/* ── Intro ── */}
          {mockPhase === "intro" && (
            <Card className="border-2 border-dashed border-blue-200 dark:border-blue-800">
              <CardContent className="pt-8 pb-8 text-center space-y-6">
                <div>
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Full IELTS Speaking Mock Test</h2>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Complete all 3 parts of the real IELTS Speaking test back-to-back.
                    No feedback between questions — just like the real exam.
                    Get one comprehensive report at the very end.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto text-center">
                  <div className="p-3 rounded-xl bg-muted/60">
                    <p className="text-2xl mb-1">🎙️</p>
                    <p className="text-xs font-semibold">Part 1</p>
                    <p className="text-xs text-muted-foreground">5 interview questions</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/60">
                    <p className="text-2xl mb-1">📋</p>
                    <p className="text-xs font-semibold">Part 2</p>
                    <p className="text-xs text-muted-foreground">1 cue card + 1 min prep</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/60">
                    <p className="text-2xl mb-1">💬</p>
                    <p className="text-xs font-semibold">Part 3</p>
                    <p className="text-xs text-muted-foreground">5 discussion questions</p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 max-w-sm mx-auto">
                  ⚡ Topics &amp; cue card are randomly selected. This uses <strong>11 scoring credits</strong> from your daily limit.
                </div>

                <Button onClick={startMockTest} size="lg" className="gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 text-base">
                  <ClipboardList className="w-5 h-5" /> Start Full Mock Test
                </Button>
              </CardContent>
            </Card>
          )}

          {/* ── Progress bar (shown during p1/p2/p3) ── */}
          {(mockPhase === "p1" || mockPhase === "p2" || mockPhase === "p3") && (
            <MockProgressBar phase={mockPhase} p1Done={p1Saved} p2Done={p2Saved} p3Done={p3Saved} />
          )}

          {/* ── Part 1 ── */}
          {mockPhase === "p1" && mockP1Topic && (
            <>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue-600 text-white text-xs">Part 1 · Interview</Badge>
                    <span className="text-xl">{mockP1Topic.emoji}</span>
                    <span className="font-semibold text-sm flex-1">{mockP1Topic.topic}</span>
                    <Badge variant="outline" className="text-xs shrink-0">Q{mockQIdx + 1} / 5</Badge>
                  </div>
                  <div className="flex gap-1.5 mb-4">
                    {mockP1Topic.questions.map((_, i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
                        i < mockQIdx ? "bg-blue-500" : i === mockQIdx ? "bg-blue-600" : "bg-muted"
                      }`} />
                    ))}
                  </div>
                  <p className="font-medium text-base leading-relaxed">{mockP1Topic.questions[mockQIdx]}</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                    No feedback until the end of the full test
                  </p>
                </CardContent>
              </Card>

              <Card><CardContent className="pt-6 pb-6">
                <Recorder
                  limitSeconds={PART_LIMITS[1]}
                  minSeconds={PART_MIN[1]}
                  onRecordingComplete={setMockAudioBlob}
                  disabled={false}
                  label="Answer in 20–35 seconds"
                  key={`mock-p1-${mockQIdx}`}
                />
              </CardContent></Card>

              {mockAudioBlob && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => mockSaveAndNext(mockRecordings)}
                    className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {mockQIdx < 4 ? (
                      <><CheckCircle2 className="w-4 h-4" /> Save &amp; Next Question <ChevronRight className="w-4 h-4" /></>
                    ) : (
                      <><CheckCircle2 className="w-4 h-4" /> Save &amp; Continue to Part 2 <ChevronRight className="w-4 h-4" /></>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setMockAudioBlob(null)} className="gap-2">
                    <RefreshCw className="w-4 h-4" /> Re-record
                  </Button>
                </div>
              )}
            </>
          )}

          {/* ── Part 2 ── */}
          {mockPhase === "p2" && mockCueCard && (
            <>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue-600 text-white text-xs">Part 2 · Cue Card</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">1 min prep + 2 min talk</span>
                  </div>
                  <CueCardDisplay
                    card={mockCueCard}
                    prepTimeLeft={mockPrepActive ? mockPrepTimeLeft : undefined}
                    isPrep={mockPrepActive}
                    notes={mockPrepNotes}
                    onNotesChange={setMockPrepNotes}
                  />
                  {!mockPrepActive && !mockRecordingEnabled && (
                    <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                      No feedback until the end of the full test
                    </p>
                  )}
                </CardContent>
              </Card>

              {!mockPrepActive && !mockRecordingEnabled && !mockAudioBlob && (
                <Button onClick={startMockPrep} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  ✏️ Start 1-minute preparation time
                </Button>
              )}

              {mockPrepActive && (
                <SpeakingTimer elapsed={60 - mockPrepTimeLeft} limit={60} label="Make notes and plan your answer" warning={10} />
              )}

              {mockRecordingEnabled && !mockAudioBlob && (
                <Card><CardContent className="pt-6 pb-6">
                  <Recorder
                    limitSeconds={PART_LIMITS[2]}
                    minSeconds={PART_MIN[2]}
                    onRecordingComplete={setMockAudioBlob}
                    disabled={false}
                    label="Speak for 1–2 minutes"
                    autoStart={mockRecordingEnabled}
                    key="mock-p2"
                  />
                </CardContent></Card>
              )}

              {mockAudioBlob && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => mockSaveAndNext(mockRecordings)}
                    className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Save &amp; Continue to Part 3 <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={() => { setMockAudioBlob(null); setMockRecordingEnabled(true); }} className="gap-2">
                    <RefreshCw className="w-4 h-4" /> Re-record
                  </Button>
                </div>
              )}
            </>
          )}

          {/* ── Part 3 ── */}
          {mockPhase === "p3" && mockP3Topic && (
            <>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue-600 text-white text-xs">Part 3 · Discussion</Badge>
                    <span className="text-xl">{mockP3Topic.emoji}</span>
                    <span className="font-semibold text-sm flex-1">{mockP3Topic.topic}</span>
                    <Badge variant="outline" className="text-xs shrink-0">Q{mockQIdx + 1} / 5</Badge>
                  </div>
                  <div className="flex gap-1.5 mb-4">
                    {mockP3Topic.questions.map((_, i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
                        i < mockQIdx ? "bg-blue-500" : i === mockQIdx ? "bg-blue-600" : "bg-muted"
                      }`} />
                    ))}
                  </div>
                  <p className="font-medium text-base leading-relaxed">{mockP3Topic.questions[mockQIdx]}</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                    {mockQIdx < 4 ? "No feedback until the end of the full test" : "Last question — submit for your full results!"}
                  </p>
                </CardContent>
              </Card>

              <Card><CardContent className="pt-6 pb-6">
                <Recorder
                  limitSeconds={PART_LIMITS[3]}
                  minSeconds={PART_MIN[3]}
                  onRecordingComplete={setMockAudioBlob}
                  disabled={false}
                  label="Discuss in depth — aim for 1–2 minutes"
                  key={`mock-p3-${mockQIdx}`}
                />
              </CardContent></Card>

              {mockAudioBlob && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => mockSaveAndNext(mockRecordings)}
                    className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {mockQIdx < 4 ? (
                      <><CheckCircle2 className="w-4 h-4" /> Save &amp; Next Question <ChevronRight className="w-4 h-4" /></>
                    ) : (
                      <><Trophy className="w-4 h-4" /> Submit Full Test &amp; Get Results</>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setMockAudioBlob(null)} className="gap-2">
                    <RefreshCw className="w-4 h-4" /> Re-record
                  </Button>
                </div>
              )}
            </>
          )}

          {/* ── Scoring ── */}
          {mockPhase === "scoring" && (
            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="pt-10 pb-10 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto">
                  <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Analysing your complete mock test…</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Scoring {mockScoringProgress} / {mockTotalToScore} answers
                  </p>
                </div>
                <div className="w-full max-w-xs mx-auto bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${mockTotalToScore > 0 ? (mockScoringProgress / mockTotalToScore) * 100 : 0}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  🎓 IELTS Sensei is reviewing all {mockTotalToScore} recordings — please wait
                </p>
              </CardContent>
            </Card>
          )}

          {/* ── Results ── */}
          {mockPhase === "results" && mockResults && (
            <div id="mock-results-top" className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Mock Test Results</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <MockResultsView results={mockResults} onRetry={startMockTest} />
            </div>
          )}
        </>
      )}
    </div>
    </div>
    </div>
  );
}
