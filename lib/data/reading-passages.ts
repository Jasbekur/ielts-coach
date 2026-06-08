// ─── IELTS Academic Reading – 3 Passages, 40 Questions ──────────────────────
// Passage 1 : Q 1 – 13  (easier, factual)
// Passage 2 : Q 14 – 26  (medium, descriptive / analytical)
// Passage 3 : Q 27 – 40  (harder, argumentative)
// Total time : 60 minutes

// Forward import — reading-test-sets.ts uses `import type` from this file
// so there is no circular runtime dependency.
import { testSet2Passages, testSet3Passages } from "./reading-test-sets";
import {
  testSet4Passages, testSet5Passages, testSet6Passages,
  testSet7Passages, testSet8Passages,
} from "./reading-test-sets-4-8";
import {
  testSet9Passages, testSet10Passages, testSet11Passages,
  testSet12Passages, testSet13Passages,
} from "./reading-test-sets-9-13";

export type QuestionType =
  | "tfng"                // True / False / Not Given
  | "ynng"                // Yes / No / Not Given
  | "mcq"                 // Multiple Choice
  | "short_answer"        // Short Answer (≤ N words from passage)
  | "sentence_completion" // Complete the sentence (words from passage)
  | "matching_heading"    // Match heading to paragraph
  | "matching_paragraph"  // Which paragraph contains…
  | "summary_completion"; // Fill gap in summary (word bank or open)

// ── Question interfaces ───────────────────────────────────────────────────────
export interface TFNGQuestion {
  type: "tfng";
  number: number;
  text: string;
  answer: "TRUE" | "FALSE" | "NOT GIVEN";
}
export interface YNNGQuestion {
  type: "ynng";
  number: number;
  text: string;
  answer: "YES" | "NO" | "NOT GIVEN";
}
export interface MCQOption { letter: string; text: string }
export interface MCQQuestion {
  type: "mcq";
  number: number;
  text: string;
  options: MCQOption[];
  answer: string;
}
export interface ShortAnswerQuestion {
  type: "short_answer";
  number: number;
  text: string;
  answer: string;
  acceptableAnswers: string[];
  maxWords: number;
}
export interface SentenceCompletionQuestion {
  type: "sentence_completion";
  number: number;
  prefix: string;
  suffix: string;
  answer: string;
  acceptableAnswers: string[];
  maxWords: number;
}
export interface MatchingHeadingQuestion {
  type: "matching_heading";
  number: number;
  paragraph: string;
  answer: string;
}
export interface MatchingParagraphQuestion {
  type: "matching_paragraph";
  number: number;
  text: string;
  answer: string;
}
export interface SummaryCompletionQuestion {
  type: "summary_completion";
  number: number;
  prefix: string;
  suffix: string;
  answer: string;
  acceptableAnswers: string[];
  wordBank?: string[];
  maxWords: number;
}

export type ReadingQuestion =
  | TFNGQuestion
  | YNNGQuestion
  | MCQQuestion
  | ShortAnswerQuestion
  | SentenceCompletionQuestion
  | MatchingHeadingQuestion
  | MatchingParagraphQuestion
  | SummaryCompletionQuestion;

// ── Passage interface ─────────────────────────────────────────────────────────
export interface ReadingPassage {
  id: number;
  title: string;
  subtitle: string;
  topic: string;
  paragraphs: { label: string; text: string }[];
  questionGroups: QuestionGroup[];
}

export interface QuestionGroup {
  instructions: string;
  context?: string;
  headingOptions?: string[];
  wordBank?: string[];
  questions: ReadingQuestion[];
}

// ════════════════════════════════════════════════════════════════════════════════
// PASSAGE 1  The Origins and Global Spread of Coffee  (Q 1–13)
// ════════════════════════════════════════════════════════════════════════════════
const passage1: ReadingPassage = {
  id: 1,
  title: "The Origins and Global Spread of Coffee",
  subtitle: "",
  topic: "History / Culture",
  paragraphs: [
    {
      label: "A",
      text: "Few beverages have shaped human civilisation as profoundly as coffee. According to the most widely repeated legend, the stimulating properties of the coffee plant were first noticed in the ninth century by an Ethiopian goat herder named Kaldi, who observed that his animals became unusually energetic after consuming the red berries of a wild shrub. Whether or not Kaldi existed, it is well established that coffee plants are indigenous to the highland forests of Ethiopia, where local populations consumed the raw beans — ground and mixed with fat — as a portable energy source long before any brewing technique was developed. The transition from chewing beans to infusing them in hot water appears to have occurred gradually, and the earliest credible written records of brewed coffee as a drink date from fifteenth-century Yemen.",
    },
    {
      label: "B",
      text: "It was in Yemen that coffee was first cultivated deliberately, most likely by Sufi monks who valued the drink's ability to sustain alertness during prolonged nocturnal prayers. The port city of Al-Makha — known to Europeans as Mocha — became the principal hub for exporting coffee beans to the wider world, and for a time Yemeni authorities jealously guarded their monopoly by prohibiting the export of fertile seeds or living plants. Coffee beans were briefly roasted or boiled before export to prevent germination, a policy that reflected both the political and economic value attached to controlling the trade. Despite these precautions, the monopoly eventually collapsed in the early seventeenth century.",
    },
    {
      label: "C",
      text: "Coffeehouses, known as qahveh khaneh in Persia and Arabia, emerged as distinctive social institutions across the Middle East from the early sixteenth century onwards. These establishments offered a public space where men gathered to play chess, exchange news, listen to music, and debate ideas. They were sometimes referred to as mekteb-i irfan — schools of the wise — in acknowledgment of the intellectual exchange they facilitated. However, coffeehouses also attracted the suspicion of authorities who feared they could become centres of political dissent. In 1511, the governor of Mecca, Khair Beg, ordered coffeehouses to be closed on the grounds that drinking coffee was contrary to Islamic law, though the ban was swiftly overturned by the Ottoman Sultan.",
    },
    {
      label: "D",
      text: "Coffee reached Europe in the seventeenth century, carried initially by Venetian merchants who had encountered it in Ottoman trade ports. The first European coffeehouse is believed to have opened in Venice in 1645, and the idea spread rapidly to England, France, and Austria. In London alone, more than three hundred coffeehouses were operating by 1675. They became known colloquially as 'penny universities' because for the price of a penny — the cost of a cup of coffee and admission — a customer could sit for as long as he wished, reading newspapers and conversing with educated strangers. Several institutions that remain prominent today trace their origins to London's coffeehouses: Lloyd's of London, the insurance and financial market, began as Edward Lloyd's coffeehouse on Tower Street.",
    },
    {
      label: "E",
      text: "Opposition to the coffeehouse did not disappear with the Ottoman ban. In 1675, King Charles II of England issued a royal proclamation ordering coffeehouses to be shut down, citing concerns that they had become venues for the circulation of seditious political rumours and for conspiracy against the Crown. The response from London merchants and professionals was immediate and furious; so intense was the backlash that the King was forced to revoke the proclamation just eleven days after it was issued. In the same decade, a pamphlet titled 'The Women's Petition Against Coffee' argued that men were neglecting their domestic responsibilities by spending too much time in coffeehouses, though this document was almost certainly written by men as a satirical exercise rather than a genuine expression of female grievance.",
    },
    {
      label: "F",
      text: "The breaking of Yemen's monopoly was achieved through several routes. Dutch traders successfully smuggled fertile coffee plants out of the port of Mocha in the 1690s and established plantations in Java, in what is now Indonesia, making the Netherlands the first European colonial power to grow coffee at scale outside of Arabia. The French subsequently introduced coffee cultivation to the Caribbean island of Martinique, from which it spread throughout Central and South America. By the mid-nineteenth century, Brazil had overtaken all other producers to become the world's dominant supplier, a position it still holds today, accounting for approximately one third of total global output.",
    },
    {
      label: "G",
      text: "Today, coffee is one of the most economically significant agricultural commodities in the world, second only to crude oil in terms of global trade value according to some estimates, though this ranking is disputed by economists who note the difficulty of making consistent comparisons across commodity categories. More than two billion cups are consumed daily across the globe, and the industry supports the livelihoods of an estimated 125 million people in producing countries. In recent decades, what commentators call the 'third wave' coffee movement has emerged in Europe, North America, and parts of Asia, emphasising the provenance, varietal characteristics, and artisanal preparation of coffee in much the same way that fine wine culture focuses on terroir and production method.",
    },
  ],
  questionGroups: [
    {
      instructions:
        "Do the following statements agree with the information given in the reading passage?\n\nWrite  TRUE  if the statement agrees with the information\nWrite  FALSE  if the statement contradicts the information\nWrite  NOT GIVEN  if there is no information on this",
      questions: [
        {
          type: "tfng",
          number: 1,
          text: "According to legend, a goat herder named Kaldi was the first person to notice the stimulating effects of coffee.",
          answer: "TRUE",
        },
        {
          type: "tfng",
          number: 2,
          text: "Coffee was originally consumed in Ethiopia as a brewed drink made with hot water.",
          answer: "FALSE",
        },
        {
          type: "tfng",
          number: 3,
          text: "Sufi monks in Yemen used coffee to help them stay awake during night-time religious practice.",
          answer: "TRUE",
        },
        {
          type: "tfng",
          number: 4,
          text: "The authorities in Yemen prevented the export of fertile coffee plants in order to protect their commercial monopoly.",
          answer: "TRUE",
        },
        {
          type: "tfng",
          number: 5,
          text: "The 1511 ban on coffeehouses in Mecca was upheld by the Ottoman Sultan.",
          answer: "FALSE",
        },
        {
          type: "tfng",
          number: 6,
          text: "King Charles II successfully enforced his 1675 proclamation to close English coffeehouses.",
          answer: "FALSE",
        },
        {
          type: "tfng",
          number: 7,
          text: "Brazil currently produces approximately one third of the world's coffee.",
          answer: "TRUE",
        },
      ] as TFNGQuestion[],
    },
    {
      instructions:
        "Choose the correct letter, A, B, C or D.\nWrite the correct letter in boxes 8–10.",
      questions: [
        {
          type: "mcq",
          number: 8,
          text: "Why were Middle Eastern coffeehouses sometimes called 'schools of the wise'?",
          options: [
            { letter: "A", text: "They were used as formal venues for religious education." },
            { letter: "B", text: "They were places where intellectual discussion and debate took place." },
            { letter: "C", text: "They charged students a fee to access educational materials." },
            { letter: "D", text: "They employed scholars to teach customers about history and culture." },
          ],
          answer: "B",
        },
        {
          type: "mcq",
          number: 9,
          text: "According to paragraph D, why were London coffeehouses known as 'penny universities'?",
          options: [
            { letter: "A", text: "University students received a significant discount on their coffee." },
            { letter: "B", text: "For a small payment, anyone could sit and engage in educated conversation." },
            { letter: "C", text: "Professional academics held regular public lectures in the coffeehouses." },
            { letter: "D", text: "The coffeehouses offered formal educational programmes to young men." },
          ],
          answer: "B",
        },
        {
          type: "mcq",
          number: 10,
          text: "According to paragraph F, how did the Dutch acquire fertile coffee plants?",
          options: [
            { letter: "A", text: "They purchased them legally from Yemeni traders at a high price." },
            { letter: "B", text: "They were given the plants as a diplomatic gift from the Ottoman Empire." },
            { letter: "C", text: "They removed them without authorisation from the port of Mocha." },
            { letter: "D", text: "They cultivated their own variety independently in Indonesia." },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
    {
      instructions:
        "Answer the questions below.\nChoose NO MORE THAN THREE WORDS from the passage for each answer.\nWrite your answers in boxes 11–13.",
      questions: [
        {
          type: "short_answer",
          number: 11,
          text: "What name did European traders use for the Yemeni port city that was the main centre for coffee exports?",
          answer: "Mocha",
          acceptableAnswers: ["mocha", "al-makha"],
          maxWords: 3,
        },
        {
          type: "short_answer",
          number: 12,
          text: "Which present-day financial and insurance institution has its origins in a London coffeehouse?",
          answer: "Lloyd's of London",
          acceptableAnswers: ["lloyd's of london", "lloyd's", "lloyds of london"],
          maxWords: 3,
        },
        {
          type: "short_answer",
          number: 13,
          text: "What term does the passage use to describe the modern coffee movement that focuses on the origins and artisanal preparation of coffee?",
          answer: "third wave",
          acceptableAnswers: ["third wave", "the third wave", "third wave coffee"],
          maxWords: 3,
        },
      ] as ShortAnswerQuestion[],
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// PASSAGE 2  Light Pollution and Its Consequences  (Q 14–26)
// ════════════════════════════════════════════════════════════════════════════════
const passage2: ReadingPassage = {
  id: 2,
  title: "Light Pollution and Its Consequences",
  subtitle: "",
  topic: "Environment / Science",
  paragraphs: [
    {
      label: "A",
      text: "For most of human history, the night sky was an unobstructed spectacle of stars visible to anyone who looked upward. That is no longer the case for much of the world's population. A comprehensive survey published in the journal Science Advances in 2016 determined that approximately 80 percent of the global population now lives under skies so contaminated by artificial light that the Milky Way is invisible to them. In Europe and North America the figure is higher still, with 99 percent of residents unable to experience a truly dark night sky. Light pollution — defined as the excessive, misdirected, or obtrusive use of artificial light at night — has grown in tandem with urbanisation and electrification, and its consequences extend far beyond an impaired view of the cosmos.",
    },
    {
      label: "B",
      text: "The most immediate ecological victims of light pollution are insects, particularly those that are active after dark. Moths and other nocturnal insects are drawn irresistibly to artificial light sources in a behaviour that scientists call positive phototaxis. Rather than fulfilling their normal ecological roles — pollinating plants, dispersing seeds, or serving as prey for bats and birds — vast numbers of insects circle artificial lights until they die of exhaustion or are consumed by opportunistic predators gathering near the light source. Studies conducted in the United Kingdom estimated that a single illuminated streetlamp can attract and kill thousands of insects per night during peak summer months. Because insects occupy a foundational position in most terrestrial food chains, this systematic attrition has cascading consequences for the wider ecosystem.",
    },
    {
      label: "C",
      text: "Migratory birds represent another group profoundly affected by artificial light at night. For millions of years, birds navigating during nocturnal migration relied on celestial cues — principally the stars and the moon — to maintain their bearing. Artificial light interferes with this ancient guidance system, drawing birds towards illuminated urban centres where they become disoriented and vulnerable to fatal collisions with glass buildings. The problem is particularly acute in North America, where it has been estimated that between 100 million and one billion birds die annually from building collisions, with a significant proportion of these fatalities occurring during migration. In response, several major cities including Chicago, New York, and Toronto have introduced voluntary or mandatory lighting programmes that dim or extinguish non-essential building lights during the peak migration periods of spring and autumn.",
    },
    {
      label: "D",
      text: "Marine environments are not immune. Sea turtle hatchlings, emerging from nests on sandy beaches, instinctively orient themselves by moving towards the brightest point on the horizon — which under natural conditions is the sea surface reflecting moonlight and starlight. Bright artificial lighting on or near beaches reverses this orientation, drawing hatchlings inland where they die of dehydration or are predated before reaching the water. The state of Florida, home to some of the most important loggerhead and leatherback turtle nesting beaches in the world, has introduced legally enforceable regulations requiring beachfront properties to use shielded, low-wavelength lighting that is less disruptive to hatchling orientation behaviour.",
    },
    {
      label: "E",
      text: "The consequences of light pollution for human health have attracted growing research attention over the past two decades. The human body regulates its sleep-wake cycle through the circadian rhythm — an internal biological clock synchronised primarily by the cycle of light and darkness. Exposure to artificial light at night, particularly the blue-spectrum light emitted by LED streetlamps and digital screens, suppresses the production of melatonin, the hormone that signals the onset of sleep. Chronic disruption of melatonin production has been linked in epidemiological studies to elevated risks of type 2 diabetes, cardiovascular disease, depression, and certain cancers. The World Health Organisation has classified night-shift work — which involves regular nocturnal light exposure — as a probable carcinogen, citing the same mechanism.",
    },
    {
      label: "F",
      text: "Responses to light pollution have come from both civil society and government. The International Dark Sky Association, founded in 1988, works to designate areas as International Dark Sky Places, providing a framework for local authorities to reduce light pollution through better engineering standards and public awareness. In the United Kingdom, Exmoor National Park became one of the first protected areas in Europe to receive International Dark Sky Reserve status. At the engineering level, the transition to LED streetlighting initially worsened light pollution in some respects, since early LED units emitted large amounts of blue-spectrum light. More recent adoption of warm-spectrum LED technology has partially addressed this problem. Local governments in several countries have also experimented with lighting curfews — switching off or dimming streetlights between midnight and dawn — as a means of reducing both light pollution and energy consumption simultaneously.",
    },
  ],
  questionGroups: [
    {
      instructions:
        "Reading Passage 2 has six paragraphs, A–F.\nChoose the correct heading for each of paragraphs B–F from the list of headings below.\nWrite the correct number, i–ix, in boxes 14–18 on your answer sheet.",
      headingOptions: [
        "i.    The fatal attraction of artificial light for nocturnal insects",
        "ii.   Technological and regulatory strategies to reduce light pollution",
        "iii.  The disorientation of annually migrating animals by urban illumination",
        "iv.   Threats to human health from disrupted hormonal cycles",
        "v.    The scale of artificial light contamination of the night sky",
        "vi.   How a vulnerable marine species is harmed during a critical life stage",
        "vii.  The economic cost of excessive artificial lighting",
        "viii. Evidence that light pollution harms the vision of urban residents",
        "ix.   Legal consequences for those who violate light pollution regulations",
      ],
      questions: [
        { type: "matching_heading", number: 14, paragraph: "B", answer: "i" },
        { type: "matching_heading", number: 15, paragraph: "C", answer: "iii" },
        { type: "matching_heading", number: 16, paragraph: "D", answer: "vi" },
        { type: "matching_heading", number: 17, paragraph: "E", answer: "iv" },
        { type: "matching_heading", number: 18, paragraph: "F", answer: "ii" },
      ] as MatchingHeadingQuestion[],
    },
    {
      instructions:
        "Complete the summary below.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.\nWrite your answers in boxes 19–22 on your answer sheet.",
      context:
        "A 2016 study in Science Advances found that around one third of the world's population cannot see the ___19___ due to light pollution. Sea turtle hatchlings are instinctively drawn inland by ___20___ on beaches, leading to high mortality rates. The human body's internal timekeeping mechanism, known as the ___21___, is disrupted by artificial light at night. One engineering development that has partially improved the situation is the adoption of ___22___ LED technology, which produces less biologically harmful light than earlier designs.",
      questions: [
        {
          type: "summary_completion",
          number: 19,
          prefix: "cannot see the",
          suffix: "due to light pollution.",
          answer: "Milky Way",
          acceptableAnswers: ["milky way", "the milky way"],
          maxWords: 2,
        },
        {
          type: "summary_completion",
          number: 20,
          prefix: "hatchlings are instinctively drawn inland by",
          suffix: "on beaches",
          answer: "artificial lighting",
          acceptableAnswers: ["artificial lighting", "bright lighting", "artificial light", "beachfront lighting"],
          maxWords: 2,
        },
        {
          type: "summary_completion",
          number: 21,
          prefix: "internal timekeeping mechanism, known as the",
          suffix: ", is disrupted",
          answer: "circadian rhythm",
          acceptableAnswers: ["circadian rhythm"],
          maxWords: 2,
        },
        {
          type: "summary_completion",
          number: 22,
          prefix: "adoption of",
          suffix: "LED technology",
          answer: "warm-spectrum",
          acceptableAnswers: ["warm-spectrum", "warm spectrum"],
          maxWords: 2,
        },
      ] as SummaryCompletionQuestion[],
    },
    {
      instructions:
        "The reading passage contains a number of pieces of information.\nWhich paragraph (A–F) contains the following information?\nWrite the correct letter, A–F, in boxes 23–26 on your answer sheet.",
      questions: [
        {
          type: "matching_paragraph",
          number: 23,
          text: "A reference to a specific estimate of annual bird deaths in North America",
          answer: "C",
        },
        {
          type: "matching_paragraph",
          number: 24,
          text: "A mention of legally binding rules to protect a specific animal species",
          answer: "D",
        },
        {
          type: "matching_paragraph",
          number: 25,
          text: "A reference to a classification made by an international health body",
          answer: "E",
        },
        {
          type: "matching_paragraph",
          number: 26,
          text: "A description of a type of insect behaviour that draws them towards light sources",
          answer: "B",
        },
      ] as MatchingParagraphQuestion[],
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// PASSAGE 3  Universal Basic Income: Arguments and Evidence  (Q 27–40)
// ════════════════════════════════════════════════════════════════════════════════
const passage3: ReadingPassage = {
  id: 3,
  title: "Universal Basic Income: Arguments and Evidence",
  subtitle: "",
  topic: "Economics / Social Policy",
  paragraphs: [
    {
      label: "A",
      text: "Universal basic income (UBI) — a policy under which every adult citizen receives a regular, unconditional cash payment from the state regardless of their employment status or existing wealth — is not a new idea. The moral case for a guaranteed citizen's income was articulated as early as 1797 by the American pamphleteer Thomas Paine, who argued in Agrarian Justice that all landowners owed a ground rent to the community and that this should be redistributed as a universal payment. The economist Milton Friedman proposed a related mechanism — the negative income tax — in the 1960s as a streamlined alternative to the welfare state. Decades later, a convergence of economic anxieties and technological disruption has brought UBI back to the centre of serious policy debate.",
    },
    {
      label: "B",
      text: "The most frequently cited contemporary argument for UBI concerns the automation of labour. A widely discussed 2013 study by economists Carl Benedikt Frey and Michael Osborne at the University of Oxford estimated that approximately 47 percent of US jobs were at high risk of being automated within the following two decades. Subsequent studies using different methodologies produced lower estimates, but the broad consensus among economists is that automation poses a significant and accelerating threat to employment in both manufacturing and service sectors. Proponents of UBI argue that a universal income floor would cushion workers against displacement, enabling retraining without the immediate threat of poverty, and would provide some security to the millions already working in precarious, low-hour gig economy positions.",
    },
    {
      label: "C",
      text: "Evidence from pilot programmes has offered some empirical support for UBI, though critics note that small-scale experiments may not translate reliably to national implementation. In Finland, a two-year government experiment from 2017 to 2019 provided 2,000 randomly selected unemployed people with a monthly payment of €560, unconditionally and without means testing. Participants reported significantly improved wellbeing and mental health compared to the control group, and, counter to critics' predictions, their employment rates were slightly higher than those of the control group by the end of the study. GiveDirectly, an international organisation operating in Kenya, has run one of the longest-running UBI experiments in the world, providing unconditional cash transfers to entire villages over periods of up to twelve years. Findings suggest that recipients invest in productive assets, launch small businesses, and reduce household food insecurity. In the United States, the SEED programme in Stockton, California provided 125 residents with $500 per month for two years from 2019; full-time employment among recipients rose from 28 percent to 40 percent during the trial period.",
    },
    {
      label: "D",
      text: "Critics of UBI focus first and most forcefully on cost. A genuinely universal payment to all adults — as opposed to targeted payments to those in need — would require astronomical levels of public expenditure. Estimates for the United Kingdom, for example, suggest that providing even a relatively modest UBI equivalent to current minimum wage levels would cost well in excess of the entire existing welfare budget, necessitating either substantial tax increases or the elimination of existing targeted benefits. The latter route is particularly contentious: replacing means-tested welfare with a flat universal payment could leave the most vulnerable citizens — those with disabilities, chronic illnesses, or dependent children — significantly worse off, despite the apparent simplicity and universality of the scheme.",
    },
    {
      label: "E",
      text: "A second line of criticism concerns the effect of unconditional income on the incentive to work. Classical economic theory predicts that providing income without any work requirement will reduce labour supply, particularly at the lower end of the wage spectrum where the relative value of the unconditional payment is greatest. The empirical evidence, however, is more ambiguous. While some UBI recipients do reduce their working hours, research consistently finds that they tend to do so in order to pursue education, training, or caregiving responsibilities rather than simply to withdraw from productive activity. Sceptics counter that short-term pilot studies cannot reliably predict the longer-term cultural and behavioural effects of permanently decoupling income from employment at a societal scale.",
    },
    {
      label: "F",
      text: "Some advocates have sought to reframe UBI not as a welfare measure but as a social dividend — a share of the collectively produced wealth that modern technological economies generate. Under this framing, the massive productivity gains delivered by automation are not the private property of technology companies alone but rather the inheritance of all citizens, who are entitled to a portion of the returns. Prominent technology entrepreneurs including Bill Gates and Elon Musk have endorsed variations of this argument, with Gates advocating for a robot tax — a levy on companies that replace workers with machines — whose revenues would fund a universal dividend. Proponents of degrowth economics also see UBI as compatible with a transition away from consumption-driven economic growth.",
    },
    {
      label: "G",
      text: "Despite the volume of debate and the accumulation of pilot evidence, no country has yet implemented UBI at a national scale. The political barriers remain formidable. On the political left, trade unions and welfare advocates fear that UBI could be used as a pretext to dismantle hard-won targeted entitlements, leaving vulnerable groups exposed. On the right, concerns about cost, work ethic, and fiscal responsibility continue to outweigh the appeal of simplification. What appears increasingly clear, however, is that as automation continues to accelerate and the nature of work continues to evolve, the question of how societies should distribute the proceeds of technological progress will become impossible to ignore. Whether UBI proves to be the answer to that question remains genuinely uncertain.",
    },
  ],
  questionGroups: [
    {
      instructions:
        "Choose the correct letter, A, B, C or D.\nWrite the correct letter in boxes 27–30 on your answer sheet.",
      questions: [
        {
          type: "mcq",
          number: 27,
          text: "According to paragraph A, why has interest in universal basic income revived in recent years?",
          options: [
            { letter: "A", text: "Governments have recognised the failure of all existing welfare systems." },
            { letter: "B", text: "A combination of economic anxieties and technology-driven changes has renewed debate." },
            { letter: "C", text: "An international organisation has formally recommended UBI to member states." },
            { letter: "D", text: "Economists have proved that earlier objections to UBI were mistaken." },
          ],
          answer: "B",
        },
        {
          type: "mcq",
          number: 28,
          text: "What does paragraph C say about the employment outcomes in the Finnish UBI pilot study?",
          options: [
            { letter: "A", text: "Participants consistently stopped looking for work." },
            { letter: "B", text: "Employment rates among participants were identical to the control group." },
            { letter: "C", text: "Participants were somewhat more likely to be employed than those in the control group." },
            { letter: "D", text: "All participants found full-time employment by the end of the study." },
          ],
          answer: "C",
        },
        {
          type: "mcq",
          number: 29,
          text: "According to paragraph D, why might replacing means-tested welfare with UBI harm the most vulnerable people?",
          options: [
            { letter: "A", text: "Universal payments would be taxed at a higher rate than targeted benefits." },
            { letter: "B", text: "A flat payment could provide less support than the targeted help they currently receive." },
            { letter: "C", text: "Vulnerable people are unlikely to spend unconditional payments wisely." },
            { letter: "D", text: "Administrative systems are not capable of delivering payments to disabled people." },
          ],
          answer: "B",
        },
        {
          type: "mcq",
          number: 30,
          text: "According to paragraph F, how do some advocates justify UBI as a 'social dividend'?",
          options: [
            { letter: "A", text: "They argue it compensates citizens for the taxes they have already paid." },
            { letter: "B", text: "They claim it would eliminate the need for any other form of taxation." },
            { letter: "C", text: "They contend that citizens deserve a share of the wealth generated by collective technological progress." },
            { letter: "D", text: "They suggest it would be funded entirely by international financial institutions." },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
    {
      instructions:
        "Do the following statements agree with the views of the writer?\n\nWrite  YES  if the statement agrees with the writer's views\nWrite  NO  if the statement contradicts the writer's views\nWrite  NOT GIVEN  if it is impossible to say what the writer thinks about this",
      questions: [
        {
          type: "ynng",
          number: 31,
          text: "The writer believes that all UBI pilot studies have produced uniformly positive results.",
          answer: "NO",
        },
        {
          type: "ynng",
          number: 32,
          text: "The writer suggests that pilot programmes may not be a reliable guide to the effects of UBI at national scale.",
          answer: "YES",
        },
        {
          type: "ynng",
          number: 33,
          text: "The writer is confident that UBI will be adopted nationally by at least one country within the next decade.",
          answer: "NOT GIVEN",
        },
        {
          type: "ynng",
          number: 34,
          text: "The writer implies that both left-wing and right-wing political groups have concerns about implementing UBI.",
          answer: "YES",
        },
        {
          type: "ynng",
          number: 35,
          text: "The writer concludes that UBI is clearly the most effective solution to the challenges posed by automation.",
          answer: "NO",
        },
      ] as YNNGQuestion[],
    },
    {
      instructions:
        "Complete the sentences below.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.\nWrite your answers in boxes 36–40 on your answer sheet.",
      questions: [
        {
          type: "sentence_completion",
          number: 36,
          prefix: "Universal basic income was advocated as early as 1797 by the American writer Thomas",
          suffix: ", who believed citizens were owed a share of the nation's land wealth.",
          answer: "Paine",
          acceptableAnswers: ["paine"],
          maxWords: 2,
        },
        {
          type: "sentence_completion",
          number: 37,
          prefix: "A 2013 Oxford University study estimated that around",
          suffix: "of US jobs were at significant risk from automation.",
          answer: "47 percent",
          acceptableAnswers: ["47 percent", "47%"],
          maxWords: 2,
        },
        {
          type: "sentence_completion",
          number: 38,
          prefix: "Research suggests that when UBI recipients reduce their working hours, it is typically to pursue education, training, or",
          suffix: "responsibilities, rather than simply to stop working.",
          answer: "caregiving",
          acceptableAnswers: ["caregiving"],
          maxWords: 2,
        },
        {
          type: "sentence_completion",
          number: 39,
          prefix: "Bill Gates has proposed a",
          suffix: "— a charge on companies that use machines to replace human workers — to fund a universal dividend.",
          answer: "robot tax",
          acceptableAnswers: ["robot tax"],
          maxWords: 2,
        },
        {
          type: "sentence_completion",
          number: 40,
          prefix: "The writer argues that as automation accelerates, the question of how to distribute the",
          suffix: "of technological progress will become increasingly difficult for societies to avoid.",
          answer: "proceeds",
          acceptableAnswers: ["proceeds"],
          maxWords: 2,
        },
      ] as SentenceCompletionQuestion[],
    },
  ],
};

// ── Exports ────────────────────────────────────────────────────────────────────
export const READING_PASSAGES: ReadingPassage[] = [passage1, passage2, passage3];

export const TOTAL_QUESTIONS = 40;
export const EXAM_DURATION_SECONDS = 60 * 60; // 60 minutes

/** Map raw score (0–40) to IELTS band — Cambridge official Academic Reading conversion table */
export function rawScoreToBand(correct: number): number {
  if (correct >= 39) return 9.0;
  if (correct >= 37) return 8.5;
  if (correct >= 35) return 8.0;
  if (correct >= 33) return 7.5;
  if (correct >= 30) return 7.0;
  if (correct >= 27) return 6.5;
  if (correct >= 23) return 6.0;
  if (correct >= 19) return 5.5;
  if (correct >= 15) return 5.0;
  if (correct >= 12) return 4.5;
  if (correct >= 8)  return 4.0;
  if (correct >= 6)  return 3.5;
  if (correct >= 4)  return 3.0;
  if (correct >= 2)  return 2.5;
  if (correct >= 1)  return 2.0;
  return 0;
}

/** Normalise a student text answer for lenient comparison */
export function normaliseAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Score one answer against the correct answer set */
export function checkAnswer(question: ReadingQuestion, studentAnswer: string): boolean {
  const s = normaliseAnswer(studentAnswer);
  if (!s) return false;

  switch (question.type) {
    case "tfng":
    case "ynng":
      return s === question.answer.toLowerCase();
    case "mcq":
      return s === question.answer.toLowerCase();
    case "matching_heading":
      return s === question.answer.toLowerCase();
    case "matching_paragraph":
      return s === question.answer.toLowerCase();
    case "short_answer":
    case "sentence_completion":
    case "summary_completion":
      return question.acceptableAnswers.some(a => normaliseAnswer(a) === s);
  }
}

/** Collect all 40 questions across all passages in a flat list */
export function allQuestions(): ReadingQuestion[] {
  return READING_PASSAGES.flatMap(p =>
    p.questionGroups.flatMap(g => g.questions)
  );
}

export const READING_TEST_SETS: ReadingPassage[][] = [
  READING_PASSAGES,
  testSet2Passages,
  testSet3Passages,
  testSet4Passages,
  testSet5Passages,
  testSet6Passages,
  testSet7Passages,
  testSet8Passages,
  testSet9Passages,
  testSet10Passages,
  testSet11Passages,
  testSet12Passages,
  testSet13Passages,
];
