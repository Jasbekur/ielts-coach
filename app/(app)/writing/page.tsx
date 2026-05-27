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
import { Loader2, FileText, RotateCcw, Timer, ChevronDown, ChevronUp, Shuffle, ImagePlus, X, BarChart3 } from "lucide-react";
import confetti from "canvas-confetti";
import { wordCount } from "@/lib/utils/word-count";

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

// ─── Task 1 practice questions WITH matching SVG charts ────────────────────
const TASK1_PRACTICE: { question: string; chartLabel: string; svg: string }[] = [
  {
    question: "The graph below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chartLabel: "Line Graph",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="420" style="font-family:Arial,sans-serif;background:#fff;">
<text x="380" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#222">Percentage of Households: Owned vs Rented Accommodation</text>
<text x="380" y="40" text-anchor="middle" font-size="11" fill="#555">England and Wales, 1918–2011</text>
<line x1="80" y1="60" x2="80" y2="360" stroke="#888" stroke-width="1.5"/>
<line x1="80" y1="360" x2="740" y2="360" stroke="#888" stroke-width="1.5"/>
<line x1="80" y1="360" x2="740" y2="360" stroke="#eee" stroke-width="1"/>
<line x1="80" y1="300" x2="740" y2="300" stroke="#eee" stroke-width="1"/>
<line x1="80" y1="240" x2="740" y2="240" stroke="#eee" stroke-width="1"/>
<line x1="80" y1="180" x2="740" y2="180" stroke="#eee" stroke-width="1"/>
<line x1="80" y1="120" x2="740" y2="120" stroke="#eee" stroke-width="1"/>
<line x1="80" y1="60" x2="740" y2="60" stroke="#eee" stroke-width="1"/>
<text x="72" y="364" text-anchor="end" font-size="10" fill="#555">0%</text>
<text x="72" y="304" text-anchor="end" font-size="10" fill="#555">20%</text>
<text x="72" y="244" text-anchor="end" font-size="10" fill="#555">40%</text>
<text x="72" y="184" text-anchor="end" font-size="10" fill="#555">60%</text>
<text x="72" y="124" text-anchor="end" font-size="10" fill="#555">80%</text>
<text x="72" y="64" text-anchor="end" font-size="10" fill="#555">100%</text>
<text x="80" y="378" text-anchor="middle" font-size="10" fill="#555">1918</text>
<text x="162" y="378" text-anchor="middle" font-size="10" fill="#555">1939</text>
<text x="245" y="378" text-anchor="middle" font-size="10" fill="#555">1953</text>
<text x="328" y="378" text-anchor="middle" font-size="10" fill="#555">1961</text>
<text x="410" y="378" text-anchor="middle" font-size="10" fill="#555">1971</text>
<text x="493" y="378" text-anchor="middle" font-size="10" fill="#555">1981</text>
<text x="575" y="378" text-anchor="middle" font-size="10" fill="#555">1991</text>
<text x="658" y="378" text-anchor="middle" font-size="10" fill="#555">2001</text>
<text x="740" y="378" text-anchor="middle" font-size="10" fill="#555">2011</text>
<polyline points="80,291 162,264 245,246 328,231 410,210 493,186 575,156 658,150 740,165" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linejoin="round"/>
<polyline points="80,129 162,156 245,174 328,189 410,210 493,234 575,264 658,270 740,255" fill="none" stroke="#ea580c" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="80" cy="291" r="4" fill="#2563eb"/><circle cx="162" cy="264" r="4" fill="#2563eb"/><circle cx="245" cy="246" r="4" fill="#2563eb"/><circle cx="328" cy="231" r="4" fill="#2563eb"/><circle cx="410" cy="210" r="4" fill="#2563eb"/><circle cx="493" cy="186" r="4" fill="#2563eb"/><circle cx="575" cy="156" r="4" fill="#2563eb"/><circle cx="658" cy="150" r="4" fill="#2563eb"/><circle cx="740" cy="165" r="4" fill="#2563eb"/>
<circle cx="80" cy="129" r="4" fill="#ea580c"/><circle cx="162" cy="156" r="4" fill="#ea580c"/><circle cx="245" cy="174" r="4" fill="#ea580c"/><circle cx="328" cy="189" r="4" fill="#ea580c"/><circle cx="410" cy="210" r="4" fill="#ea580c"/><circle cx="493" cy="234" r="4" fill="#ea580c"/><circle cx="575" cy="264" r="4" fill="#ea580c"/><circle cx="658" cy="270" r="4" fill="#ea580c"/><circle cx="740" cy="255" r="4" fill="#ea580c"/>
<rect x="220" y="396" width="18" height="4" fill="#2563eb"/><text x="244" y="401" font-size="11" fill="#333">Owned</text>
<rect x="360" y="396" width="18" height="4" fill="#ea580c"/><text x="384" y="401" font-size="11" fill="#333">Rented</text>
</svg>`,
  },
  {
    question: "The bar chart below shows the number of university graduates in Canada from 1992 to 2007. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chartLabel: "Bar Chart",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="420" style="font-family:Arial,sans-serif;background:#fff;">
<text x="380" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#222">Number of University Graduates in Canada</text>
<text x="380" y="40" text-anchor="middle" font-size="11" fill="#555">1992–2007 (in thousands)</text>
<line x1="90" y1="55" x2="90" y2="340" stroke="#888" stroke-width="1.5"/>
<line x1="90" y1="340" x2="730" y2="340" stroke="#888" stroke-width="1.5"/>
<line x1="90" y1="340" x2="730" y2="340" stroke="#eee" stroke-width="1"/>
<line x1="90" y1="282" x2="730" y2="282" stroke="#eee" stroke-width="1"/>
<line x1="90" y1="224" x2="730" y2="224" stroke="#eee" stroke-width="1"/>
<line x1="90" y1="166" x2="730" y2="166" stroke="#eee" stroke-width="1"/>
<line x1="90" y1="108" x2="730" y2="108" stroke="#eee" stroke-width="1"/>
<line x1="90" y1="55" x2="730" y2="55" stroke="#eee" stroke-width="1"/>
<text x="82" y="344" text-anchor="end" font-size="10" fill="#555">0</text>
<text x="82" y="286" text-anchor="end" font-size="10" fill="#555">50</text>
<text x="82" y="228" text-anchor="end" font-size="10" fill="#555">100</text>
<text x="82" y="170" text-anchor="end" font-size="10" fill="#555">150</text>
<text x="82" y="112" text-anchor="end" font-size="10" fill="#555">200</text>
<text x="82" y="59" text-anchor="end" font-size="10" fill="#555">250</text>
<rect x="110" y="186" width="50" height="154" fill="#7c3aed" opacity="0.85"/><text x="135" y="360" text-anchor="middle" font-size="10" fill="#555">1992</text><text x="135" y="182" text-anchor="middle" font-size="9" fill="#fff">162</text>
<rect x="187" y="181" width="50" height="159" fill="#7c3aed" opacity="0.85"/><text x="212" y="360" text-anchor="middle" font-size="10" fill="#555">1993</text><text x="212" y="177" text-anchor="middle" font-size="9" fill="#fff">165</text>
<rect x="264" y="175" width="50" height="165" fill="#7c3aed" opacity="0.85"/><text x="289" y="360" text-anchor="middle" font-size="10" fill="#555">1995</text><text x="289" y="171" text-anchor="middle" font-size="9" fill="#fff">170</text>
<rect x="341" y="168" width="50" height="172" fill="#7c3aed" opacity="0.85"/><text x="366" y="360" text-anchor="middle" font-size="10" fill="#555">1997</text><text x="366" y="164" text-anchor="middle" font-size="9" fill="#fff">176</text>
<rect x="418" y="158" width="50" height="182" fill="#7c3aed" opacity="0.85"/><text x="443" y="360" text-anchor="middle" font-size="10" fill="#555">1999</text><text x="443" y="154" text-anchor="middle" font-size="9" fill="#fff">185</text>
<rect x="495" y="142" width="50" height="198" fill="#7c3aed" opacity="0.85"/><text x="520" y="360" text-anchor="middle" font-size="10" fill="#555">2001</text><text x="520" y="138" text-anchor="middle" font-size="9" fill="#fff">198</text>
<rect x="572" y="117" width="50" height="223" fill="#7c3aed" opacity="0.85"/><text x="597" y="360" text-anchor="middle" font-size="10" fill="#555">2004</text><text x="597" y="113" text-anchor="middle" font-size="9" fill="#fff">218</text>
<rect x="649" y="92" width="50" height="248" fill="#7c3aed" opacity="0.85"/><text x="674" y="360" text-anchor="middle" font-size="10" fill="#555">2007</text><text x="674" y="88" text-anchor="middle" font-size="9" fill="#fff">240</text>
<text x="20" y="200" text-anchor="middle" font-size="10" fill="#555" transform="rotate(-90,20,200)">Graduates (thousands)</text>
</svg>`,
  },
  {
    question: "The pie charts below compare water usage in San Diego (USA) and Sydney (Australia). Summarise the information by selecting and reporting the main features.",
    chartLabel: "Pie Charts",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="420" style="font-family:Arial,sans-serif;background:#fff;">
<text x="380" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#222">Water Usage: San Diego (USA) vs Sydney (Australia)</text>
<text x="190" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">San Diego</text>
<text x="570" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">Sydney</text>
<!-- San Diego pie: Residential 39%, Industry 27%, Agriculture 28%, Other 6% -->
<path d="M190,220 L190,100 A120,120 0 0,1 280,285 Z" fill="#2563eb"/>
<path d="M190,220 L280,285 A120,120 0 0,1 117,259 Z" fill="#16a34a"/>
<path d="M190,220 L117,259 A120,120 0 0,1 170,98 Z" fill="#ca8a04"/>
<path d="M190,220 L170,98 A120,120 0 0,1 190,100 Z" fill="#dc2626"/>
<!-- SD labels -->
<text x="245" y="178" font-size="10" fill="#fff" font-weight="bold">39%</text>
<text x="218" y="278" font-size="10" fill="#fff" font-weight="bold">27%</text>
<text x="122" y="188" font-size="10" fill="#fff" font-weight="bold">28%</text>
<text x="168" y="116" font-size="10" fill="#fff" font-weight="bold">6%</text>
<!-- Sydney pie: Residential 65%, Industry 10%, Agriculture 20%, Other 5% -->
<path d="M570,220 L570,100 A120,120 0 1,1 451,265 Z" fill="#2563eb"/>
<path d="M570,220 L451,265 A120,120 0 0,1 430,220 Z" fill="#16a34a"/>
<path d="M570,220 L430,220 A120,120 0 0,1 506,95 Z" fill="#ca8a04"/>
<path d="M570,220 L506,95 A120,120 0 0,1 570,100 Z" fill="#dc2626"/>
<!-- Sydney labels -->
<text x="532" y="148" font-size="10" fill="#fff" font-weight="bold">65%</text>
<text x="444" y="248" font-size="10" fill="#fff" font-weight="bold">10%</text>
<text x="462" y="185" font-size="10" fill="#fff" font-weight="bold">20%</text>
<text x="526" y="106" font-size="10" fill="#fff" font-weight="bold">5%</text>
<!-- Legend -->
<rect x="180" y="368" width="14" height="14" fill="#2563eb"/><text x="200" y="380" font-size="11" fill="#333">Residential</text>
<rect x="290" y="368" width="14" height="14" fill="#16a34a"/><text x="310" y="380" font-size="11" fill="#333">Industry</text>
<rect x="380" y="368" width="14" height="14" fill="#ca8a04"/><text x="400" y="380" font-size="11" fill="#333">Agriculture</text>
<rect x="486" y="368" width="14" height="14" fill="#dc2626"/><text x="506" y="380" font-size="11" fill="#333">Other</text>
</svg>`,
  },
  {
    question: "The table below gives information about the underground railway systems in six cities. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chartLabel: "Table",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="380" style="font-family:Arial,sans-serif;background:#fff;">
<text x="380" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#222">Underground Railway Systems in Six Cities</text>
<!-- Header row -->
<rect x="40" y="50" width="680" height="38" fill="#7c3aed"/>
<text x="130" y="74" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">City</text>
<text x="270" y="74" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">Date opened</text>
<text x="420" y="74" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">Route (km)</text>
<text x="580" y="74" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">Passengers/yr (m)</text>
<!-- Rows -->
<rect x="40" y="88" width="680" height="36" fill="#f5f3ff"/>
<rect x="40" y="124" width="680" height="36" fill="#fff"/>
<rect x="40" y="160" width="680" height="36" fill="#f5f3ff"/>
<rect x="40" y="196" width="680" height="36" fill="#fff"/>
<rect x="40" y="232" width="680" height="36" fill="#f5f3ff"/>
<rect x="40" y="268" width="680" height="36" fill="#fff"/>
<!-- Row data -->
<text x="130" y="111" text-anchor="middle" font-size="11" fill="#222">London</text><text x="270" y="111" text-anchor="middle" font-size="11" fill="#222">1863</text><text x="420" y="111" text-anchor="middle" font-size="11" fill="#222">394</text><text x="580" y="111" text-anchor="middle" font-size="11" fill="#222">775</text>
<text x="130" y="147" text-anchor="middle" font-size="11" fill="#222">Paris</text><text x="270" y="147" text-anchor="middle" font-size="11" fill="#222">1900</text><text x="420" y="147" text-anchor="middle" font-size="11" fill="#222">199</text><text x="580" y="147" text-anchor="middle" font-size="11" fill="#222">1,191</text>
<text x="130" y="183" text-anchor="middle" font-size="11" fill="#222">Tokyo</text><text x="270" y="183" text-anchor="middle" font-size="11" fill="#222">1927</text><text x="420" y="183" text-anchor="middle" font-size="11" fill="#222">155</text><text x="580" y="183" text-anchor="middle" font-size="11" fill="#222">1,927</text>
<text x="130" y="219" text-anchor="middle" font-size="11" fill="#222">Washington DC</text><text x="270" y="219" text-anchor="middle" font-size="11" fill="#222">1976</text><text x="420" y="219" text-anchor="middle" font-size="11" fill="#222">126</text><text x="580" y="219" text-anchor="middle" font-size="11" fill="#222">144</text>
<text x="130" y="255" text-anchor="middle" font-size="11" fill="#222">Kyoto</text><text x="270" y="255" text-anchor="middle" font-size="11" fill="#222">1981</text><text x="420" y="255" text-anchor="middle" font-size="11" fill="#222">11</text><text x="580" y="255" text-anchor="middle" font-size="11" fill="#222">45</text>
<text x="130" y="291" text-anchor="middle" font-size="11" fill="#222">Los Angeles</text><text x="270" y="291" text-anchor="middle" font-size="11" fill="#222">2001</text><text x="420" y="291" text-anchor="middle" font-size="11" fill="#222">28</text><text x="580" y="291" text-anchor="middle" font-size="11" fill="#222">50</text>
<!-- Grid lines -->
<line x1="40" y1="50" x2="720" y2="50" stroke="#ccc" stroke-width="1"/>
<line x1="40" y1="88" x2="720" y2="88" stroke="#ccc" stroke-width="1"/>
<line x1="40" y1="124" x2="720" y2="124" stroke="#ccc" stroke-width="1"/>
<line x1="40" y1="160" x2="720" y2="160" stroke="#ccc" stroke-width="1"/>
<line x1="40" y1="196" x2="720" y2="196" stroke="#ccc" stroke-width="1"/>
<line x1="40" y1="232" x2="720" y2="232" stroke="#ccc" stroke-width="1"/>
<line x1="40" y1="268" x2="720" y2="268" stroke="#ccc" stroke-width="1"/>
<line x1="40" y1="304" x2="720" y2="304" stroke="#ccc" stroke-width="1"/>
<line x1="40" y1="50" x2="40" y2="304" stroke="#ccc" stroke-width="1"/>
<line x1="200" y1="50" x2="200" y2="304" stroke="#ccc" stroke-width="1"/>
<line x1="340" y1="50" x2="340" y2="304" stroke="#ccc" stroke-width="1"/>
<line x1="490" y1="50" x2="490" y2="304" stroke="#ccc" stroke-width="1"/>
<line x1="720" y1="50" x2="720" y2="304" stroke="#ccc" stroke-width="1"/>
</svg>`,
  },
  {
    question: "The bar chart below shows CO₂ emissions per person (in tonnes) in five countries in 1990, 2000, and 2015. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chartLabel: "Grouped Bar Chart",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="420" style="font-family:Arial,sans-serif;background:#fff;">
<text x="380" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#222">CO₂ Emissions Per Person (tonnes) — Five Countries</text>
<text x="380" y="40" text-anchor="middle" font-size="11" fill="#555">1990, 2000, and 2015</text>
<line x1="80" y1="55" x2="80" y2="340" stroke="#888" stroke-width="1.5"/>
<line x1="80" y1="340" x2="740" y2="340" stroke="#888" stroke-width="1.5"/>
<line x1="80" y1="340" x2="740" y2="340" stroke="#eee" stroke-width="1"/>
<line x1="80" y1="286" x2="740" y2="286" stroke="#eee" stroke-width="1"/>
<line x1="80" y1="232" x2="740" y2="232" stroke="#eee" stroke-width="1"/>
<line x1="80" y1="178" x2="740" y2="178" stroke="#eee" stroke-width="1"/>
<line x1="80" y1="124" x2="740" y2="124" stroke="#eee" stroke-width="1"/>
<line x1="80" y1="70" x2="740" y2="70" stroke="#eee" stroke-width="1"/>
<text x="72" y="344" text-anchor="end" font-size="10" fill="#555">0</text>
<text x="72" y="290" text-anchor="end" font-size="10" fill="#555">5</text>
<text x="72" y="236" text-anchor="end" font-size="10" fill="#555">10</text>
<text x="72" y="182" text-anchor="end" font-size="10" fill="#555">15</text>
<text x="72" y="128" text-anchor="end" font-size="10" fill="#555">20</text>
<text x="72" y="74" text-anchor="end" font-size="10" fill="#555">25</text>
<!-- USA: 19.3, 20.6, 16.5 → bars at x=100 -->
<rect x="95" y="133" width="22" height="207" fill="#2563eb" opacity="0.9"/>
<rect x="119" y="118" width="22" height="222" fill="#16a34a" opacity="0.9"/>
<rect x="143" y="163" width="22" height="177" fill="#dc2626" opacity="0.9"/>
<text x="133" y="358" text-anchor="middle" font-size="10" fill="#555">USA</text>
<!-- Australia: 15.4, 17.2, 15.8 -->
<rect x="215" y="174" width="22" height="166" fill="#2563eb" opacity="0.9"/>
<rect x="239" y="155" width="22" height="185" fill="#16a34a" opacity="0.9"/>
<rect x="263" y="170" width="22" height="170" fill="#dc2626" opacity="0.9"/>
<text x="253" y="358" text-anchor="middle" font-size="10" fill="#555">Australia</text>
<!-- UK: 9.8, 9.2, 6.5 -->
<rect x="335" y="234" width="22" height="106" fill="#2563eb" opacity="0.9"/>
<rect x="359" y="241" width="22" height="99" fill="#16a34a" opacity="0.9"/>
<rect x="383" y="270" width="22" height="70" fill="#dc2626" opacity="0.9"/>
<text x="373" y="358" text-anchor="middle" font-size="10" fill="#555">UK</text>
<!-- China: 2.2, 2.9, 7.6 -->
<rect x="455" y="316" width="22" height="24" fill="#2563eb" opacity="0.9"/>
<rect x="479" y="309" width="22" height="31" fill="#16a34a" opacity="0.9"/>
<rect x="503" y="258" width="22" height="82" fill="#dc2626" opacity="0.9"/>
<text x="493" y="358" text-anchor="middle" font-size="10" fill="#555">China</text>
<!-- India: 0.8, 1.1, 1.9 -->
<rect x="575" y="331" width="22" height="9" fill="#2563eb" opacity="0.9"/>
<rect x="599" y="328" width="22" height="12" fill="#16a34a" opacity="0.9"/>
<rect x="623" y="319" width="22" height="21" fill="#dc2626" opacity="0.9"/>
<text x="613" y="358" text-anchor="middle" font-size="10" fill="#555">India</text>
<!-- Legend -->
<rect x="200" y="374" width="14" height="10" fill="#2563eb" opacity="0.9"/><text x="220" y="383" font-size="11" fill="#333">1990</text>
<rect x="290" y="374" width="14" height="10" fill="#16a34a" opacity="0.9"/><text x="310" y="383" font-size="11" fill="#333">2000</text>
<rect x="380" y="374" width="14" height="10" fill="#dc2626" opacity="0.9"/><text x="400" y="383" font-size="11" fill="#333">2015</text>
<text x="18" y="200" text-anchor="middle" font-size="10" fill="#555" transform="rotate(-90,18,200)">Tonnes per person</text>
</svg>`,
  },
];

const ESSAY_TYPE_LABELS: Record<string, { label: string; color: string; tip: string }> = {
  opinion:                    { label: "Opinion Essay",              color: "bg-violet-100 text-violet-700", tip: "Give a CLEAR opinion. Support with 2 reasons + examples." },
  discuss_both_views:         { label: "Discuss Both Views",         color: "bg-blue-100 text-blue-700",    tip: "Discuss BOTH sides fairly. State your opinion in the introduction AND conclusion." },
  problem_solution:           { label: "Problem & Solution",         color: "bg-amber-100 text-amber-700",  tip: "Name specific problems, then give realistic solutions. Avoid vague answers." },
  advantages_disadvantages:   { label: "Advantages & Disadvantages", color: "bg-emerald-100 text-emerald-700", tip: "Compare advantages and disadvantages. Give your opinion at the end." },
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
        <div className="w-8 h-8 rounded-full bg-violet-100 animate-pulse flex items-center justify-center">
          <span className="text-violet-500 text-sm">🎓</span>
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
                  "text-emerald-600 border-emerald-200 bg-emerald-50"
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
          ? "border-violet-400 bg-violet-50 dark:bg-violet-950"
          : "border-border hover:border-violet-300 hover:bg-muted/30"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
      <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
        <BarChart3 className="w-5 h-5 text-violet-500" />
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
  const [taskType, setTaskType] = useState<"task1" | "task2">("task2");
  const [question, setQuestion] = useState("");
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

  function startTimer() {
    if (timerActive || timerStartedRef.current) return;
    timerStartedRef.current = true;
    setTimerActive(true);
    timerRef.current = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
  }

  function toggleTimer() {
    if (timerActive) {
      clearInterval(timerRef.current!);
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
    if (val.length === 1) startTimer(); // first character typed
  }

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (timerSeconds < timeLimit || !timerActive) return;
    clearInterval(timerRef.current!);
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
    if (taskType === "task2") {
      const q = TASK2_QUESTIONS[Math.floor(Math.random() * TASK2_QUESTIONS.length)];
      setQuestion(q.q);
    } else {
      const practice = TASK1_PRACTICE[Math.floor(Math.random() * TASK1_PRACTICE.length)];
      setQuestion(practice.question);
      // Store as SVG File (will be auto-converted to PNG on submit)
      const blob = new Blob([practice.svg], { type: "image/svg+xml" });
      const file = new File([blob], "practice-chart.svg", { type: "image/svg+xml" });
      setChartFile(file);
      // Show SVG as preview (browser renders SVG fine in <img>)
      const svgDataUrl = `data:image/svg+xml;base64,${btoa(practice.svg)}`;
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
      toast.warning(`Your essay is only ${wc} words. IELTS requires at least ${minWords} words. Submit anyway?`);
    }

    setLoading(true);
    setResult(null);
    if (timerActive) { clearInterval(timerRef.current!); setTimerActive(false); }

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
        body: JSON.stringify({ taskType, question, essay, imageBase64, imageMimeType }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Scoring failed. Please try again."); return; }
      setResult(data.result);
      if (data.result.scores.overall >= 7) {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#8b5cf6", "#10b981", "#f59e0b"] });
      }
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
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Writing Practice</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Paste or type your answer and get instant examiner-grade feedback
          </p>
        </div>
        <button
          onClick={() => setShowBandGuide(!showBandGuide)}
          className="text-xs text-violet-500 hover:text-violet-600 flex items-center gap-1 shrink-0 mt-1"
        >
          Band guide {showBandGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

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

      <Tabs
        value={taskType}
        onValueChange={(v) => {
          setTaskType(v as "task1" | "task2");
          setResult(null);
          setEssay("");
          setQuestion("");
          setTimerSeconds(0);
          if (timerRef.current) clearInterval(timerRef.current);
          setTimerActive(false);
          setChartFile(null);
          setChartPreview(null);
        }}
      >
        <TabsList className="grid grid-cols-2 w-full max-w-xs">
          <TabsTrigger value="task2">Task 2 — Essay</TabsTrigger>
          <TabsTrigger value="task1">Task 1 — Report</TabsTrigger>
        </TabsList>

        <TabsContent value={taskType} className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ── Exam info bar: always visible ── */}
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border bg-muted/40">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {taskType === "task1" ? "Task 1 · Academic Report" : "Task 2 · Essay"}
                </span>
                <span>⏱ {taskType === "task1" ? "20 minutes" : "40 minutes"}</span>
                <span>📝 Min {taskType === "task1" ? "150" : "250"} words</span>
              </div>
              <div className="flex items-center gap-2">
                {timerActive && <TimerDisplay seconds={timerSeconds} limit={timeLimit} />}
                <Button
                  type="button"
                  variant={timerActive ? "outline" : "default"}
                  size="sm"
                  onClick={toggleTimer}
                  className={`gap-1.5 h-7 text-xs ${!timerActive ? "bg-violet-500 hover:bg-violet-600 text-white" : ""}`}
                >
                  <Timer className="w-3 h-3" />
                  {timerActive ? "Pause" : timerSeconds > 0 ? "Resume" : "Start Timer"}
                </Button>
              </div>
            </div>

            {/* Question */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  {taskType === "task1" ? "Question / task instructions" : "Essay question"}
                </label>
                <button
                  type="button"
                  onClick={pickRandomQuestion}
                  className="flex items-center gap-1 text-xs text-violet-500 hover:text-violet-600 transition-colors"
                >
                  <Shuffle className="w-3 h-3" />
                  {taskType === "task1" ? "Practice question + chart" : "Practice question"}
                </button>
              </div>
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={
                  taskType === "task1"
                    ? "Paste the task instructions here, e.g. 'The graph below shows... Summarise the information by selecting and reporting the main features...'"
                    : "Paste the essay question here, or click 'Practice question' for a sample..."
                }
                className="resize-none min-h-[100px] text-sm"
              />
            </div>

            {/* Task 1: Chart / diagram upload */}
            {taskType === "task1" && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-violet-500" />
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

            {/* Essay / report */}
            <EssayEditor
              value={essay}
              onChange={handleEssayChange}
              minWords={minWords}
              label={taskType === "task1" ? "Your report" : "Your essay"}
              placeholder={`Write your ${taskType === "task1" ? "report" : "essay"} here… (timer starts automatically)`}
            />

            {/* Submit */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none sm:min-w-[180px] gap-2 bg-violet-500 hover:bg-violet-600 text-white"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Scoring…</>
                ) : (
                  <><FileText className="w-4 h-4" /> Get Band Score</>
                )}
              </Button>

              {result && (
                <Button type="button" variant="outline" onClick={handleReset} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> New attempt
                </Button>
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

          <ScoreCard result={result} taskType={taskType} />
          <CorrectionsView result={result} />
          <BandRewrite result={result} />
        </div>
      )}
    </div>
  );
}
