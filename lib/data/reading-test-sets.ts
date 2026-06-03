// ─── IELTS Academic Reading – Test Sets 2 & 3 ────────────────────────────────
// Each test set has exactly 3 passages covering Q1–40.

import type {
  ReadingPassage,
  TFNGQuestion,
  YNNGQuestion,
  MCQQuestion,
  ShortAnswerQuestion,
  SentenceCompletionQuestion,
  MatchingHeadingQuestion,
  MatchingParagraphQuestion,
  SummaryCompletionQuestion,
} from "./reading-passages";

// ════════════════════════════════════════════════════════════════════════════════
// TEST SET 2 — Passage 1  The Science of Sleep  (Q 1–13)
// ════════════════════════════════════════════════════════════════════════════════
const set2Passage1: ReadingPassage = {
  id: 1,
  title: "The Science of Sleep",
  subtitle: "",
  topic: "Biology / Health",
  paragraphs: [
    {
      label: "A",
      text: "Sleep is not simply a passive state of rest but a biological necessity essential for the survival of all mammals, birds, and many other species. Humans spend approximately one third of their lives asleep, yet until relatively recently, science had little understanding of why. The concept of the circadian rhythm — an internal biological clock that regulates the timing of sleep and wakefulness over a roughly 24-hour cycle — was first identified in the twentieth century. Researchers discovered that this rhythm is controlled by a tiny region of the brain called the suprachiasmatic nucleus, which responds to light signals received through the eyes and coordinates physiological processes accordingly.",
    },
    {
      label: "B",
      text: "Sleep is not uniform. It is divided into two broad categories: non-rapid eye movement (NREM) sleep and rapid eye movement (REM) sleep. NREM sleep itself comprises three distinct stages. Stage 1 is a light transitional state; Stage 2 involves slowing brain waves and the consolidation of newly acquired information; Stage 3 — sometimes called slow-wave or deep sleep — is characterised by distinctive delta waves and is the phase most associated with physical restoration, immune function, and the release of growth hormone. REM sleep, which typically occupies around 20–25 percent of total sleep time, is the stage during which most dreaming occurs. Although the body's muscles become temporarily paralysed during REM, brain activity surges to levels comparable to wakefulness.",
    },
    {
      label: "C",
      text: "The consequences of sleep deprivation are wide-ranging and serious. Cognitively, even a single night of fewer than six hours of sleep impairs attention, working memory, and decision-making to a degree comparable to moderate alcohol intoxication. Chronic sleep restriction is associated with elevated levels of cortisol — the body's primary stress hormone — which in turn suppresses immune function and increases susceptibility to infection. At the metabolic level, inadequate sleep disrupts the balance of hormones that regulate appetite, increasing levels of ghrelin (which stimulates hunger) and decreasing leptin (which signals satiety), a mechanism that may partly explain the association between short sleep duration and obesity.",
    },
    {
      label: "D",
      text: "The relationship between age and sleep is particularly striking during adolescence. Unlike younger children and adults, teenagers experience a natural biological shift in their circadian phase: the timing of melatonin secretion — the hormone that triggers sleepiness — shifts later, making it physiologically difficult for adolescents to fall asleep before 11 pm and to wake early. This delayed phase is not a matter of laziness or poor discipline; it is a genuine hormonal phenomenon documented across cultures and species. The mismatch between this biological reality and conventional school start times, typically between 7 and 9 am, has prompted growing debate. Research studies in the United States and United Kingdom have suggested that delaying school start times may improve academic performance, mental health, and attendance rates in teenagers.",
    },
    {
      label: "E",
      text: "Despite its critical importance, sleep has been under sustained assault from multiple directions in modern societies. Exposure to blue-spectrum light emitted by smartphones, tablets, and computer screens in the hours before bed suppresses melatonin production and delays sleep onset, sometimes by as much as 90 minutes. Caffeine — the world's most widely consumed psychoactive substance — functions by blocking adenosine receptors; adenosine is a chemical that accumulates in the brain during wakefulness and generates the sensation of sleepiness. Work patterns, including irregular shift schedules and always-on professional cultures, further erode sleep quality. In response, researchers have begun exploring chronotherapy — an approach that adjusts the timing of medical treatments, meals, and daily routines to align with an individual's biological rhythms — as a way of mitigating the health consequences of circadian disruption.",
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
          text: "The circadian rhythm was first identified in the twentieth century.",
          answer: "TRUE",
        },
        {
          type: "tfng",
          number: 2,
          text: "During REM sleep, the body's muscles are completely relaxed.",
          answer: "TRUE",
        },
        {
          type: "tfng",
          number: 3,
          text: "People who sleep fewer than six hours per night always develop serious illness.",
          answer: "NOT GIVEN",
        },
        {
          type: "tfng",
          number: 4,
          text: "Adolescents experience a natural biological shift that makes them stay awake later.",
          answer: "TRUE",
        },
        {
          type: "tfng",
          number: 5,
          text: "All schools in the study changed their start times as a result of the research findings.",
          answer: "NOT GIVEN",
        },
        {
          type: "tfng",
          number: 6,
          text: "Blue light from electronic screens can interfere with melatonin production.",
          answer: "TRUE",
        },
      ] as TFNGQuestion[],
    },
    {
      instructions:
        "Choose the correct letter, A, B, C or D.\nWrite the correct letter in boxes 7–10 on your answer sheet.",
      questions: [
        {
          type: "mcq",
          number: 7,
          text: "What does the passage say about NREM Stage 3?",
          options: [
            { letter: "A", text: "It is the stage during which most dreaming occurs." },
            { letter: "B", text: "It involves the slowing of brain waves and memory consolidation." },
            { letter: "C", text: "It is characterised by rapidly moving eyes." },
            { letter: "D", text: "It is the phase most associated with physical restoration." },
          ],
          answer: "D",
        },
        {
          type: "mcq",
          number: 8,
          text: "Why does the author mention adolescent melatonin shifts?",
          options: [
            { letter: "A", text: "To argue that teenagers need less sleep than adults." },
            { letter: "B", text: "To explain why teenagers naturally prefer later sleep times." },
            { letter: "C", text: "To criticise parents for allowing poor sleep habits." },
            { letter: "D", text: "To suggest that melatonin supplements can solve sleep problems." },
          ],
          answer: "B",
        },
        {
          type: "mcq",
          number: 9,
          text: "What is chronotherapy?",
          options: [
            { letter: "A", text: "A treatment that adjusts the timing of sleep to align with biological rhythms." },
            { letter: "B", text: "A drug therapy that increases melatonin production." },
            { letter: "C", text: "A type of cognitive behavioural therapy for insomnia." },
            { letter: "D", text: "A medical procedure to correct circadian rhythm disorders." },
          ],
          answer: "A",
        },
        {
          type: "mcq",
          number: 10,
          text: "According to the passage, what is the main cause of modern sleep disruption?",
          options: [
            { letter: "A", text: "Increasing levels of stress in the workplace." },
            { letter: "B", text: "Declining melatonin levels due to ageing." },
            { letter: "C", text: "Artificial light and changing social patterns." },
            { letter: "D", text: "Genetic changes in human biology over recent decades." },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
    {
      instructions:
        "Complete the sentences below.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.\nWrite your answers in boxes 11–13 on your answer sheet.",
      questions: [
        {
          type: "sentence_completion",
          number: 11,
          prefix: "The body's internal clock that regulates sleep is called the",
          suffix: ".",
          answer: "circadian rhythm",
          acceptableAnswers: ["circadian rhythm"],
          maxWords: 2,
        },
        {
          type: "sentence_completion",
          number: 12,
          prefix: "In NREM Stage 3, brain activity produces distinctive",
          suffix: "waves.",
          answer: "delta",
          acceptableAnswers: ["delta", "slow delta"],
          maxWords: 2,
        },
        {
          type: "sentence_completion",
          number: 13,
          prefix: "Research suggests that delaying school",
          suffix: "may improve academic performance in teenagers.",
          answer: "start times",
          acceptableAnswers: ["start times", "start time"],
          maxWords: 2,
        },
      ] as SentenceCompletionQuestion[],
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// TEST SET 2 — Passage 2  The Rise of Urban Farming  (Q 14–26)
// ════════════════════════════════════════════════════════════════════════════════
const set2Passage2: ReadingPassage = {
  id: 2,
  title: "The Rise of Urban Farming",
  subtitle: "",
  topic: "Environment / Technology",
  paragraphs: [
    {
      label: "A",
      text: "Urban farming — the practice of growing food within or immediately around cities — has undergone a dramatic transformation from niche hobby to global movement. Cities such as Singapore, Tokyo, and New York are now home to multi-storey vertical farms where crops are stacked in climate-controlled indoor environments, illuminated by artificial light and irrigated by precisely calibrated water systems. The global urban farming market, valued at several billion dollars, has attracted significant investment from technology companies and government agencies alike. Proponents argue that as the world's urban population continues to grow — projected to reach 68 percent of all humans by 2050 — cultivating food closer to where it is consumed is not merely desirable but essential.",
    },
    {
      label: "B",
      text: "One of the most compelling arguments for urban farming centres on food security. By shortening the distance between farm and consumer, urban agriculture dramatically reduces food miles — the distance food travels from production to plate — thereby cutting greenhouse gas emissions from transportation and reducing dependence on complex international supply chains. The economic shocks and logistical disruptions caused by events such as the COVID-19 pandemic highlighted how vulnerable conventional food systems can be. Local urban food chains, by contrast, demonstrated considerably greater resilience when global supply was interrupted, providing a degree of food self-sufficiency that national governments have since taken more seriously.",
    },
    {
      label: "C",
      text: "Technology has been central to the rapid expansion of urban farming. LED grow lights, engineered to produce specific light spectra optimal for plant photosynthesis, have dramatically reduced energy consumption compared to earlier high-pressure sodium systems. Hydroponics — growing plants in nutrient-rich water rather than soil — and aeroponics, in which plant roots are suspended in air and periodically misted with nutrients, allow crops to be grown without traditional soil and using as little as 90 percent less water than conventional field agriculture. The integration of Internet of Things (IoT) sensors enables real-time monitoring of temperature, humidity, nutrient levels, and plant health, allowing operators to optimise conditions and predict yields with a precision unimaginable in outdoor farming.",
    },
    {
      label: "D",
      text: "Beyond food production, urban farming has demonstrated significant social and community benefits. Community gardens in cities such as Detroit — long associated with industrial decline and urban vacancy — have been credited with reducing crime, building social cohesion, and providing a sense of purpose and belonging to residents in economically marginalised neighbourhoods. Research published in health and environmental journals suggests that regular engagement with urban green spaces, including community gardens, is associated with reduced symptoms of stress, anxiety, and depression. For many urban residents, particularly those from low-income backgrounds, community gardens provide not only fresh produce but also a meaningful connection to the natural environment that city life typically denies.",
    },
    {
      label: "E",
      text: "Despite these advantages, urban farming faces significant challenges that limit its capacity to replace conventional agriculture at scale. The energy costs of indoor vertical farms — which require continuous artificial lighting and climate control — remain substantially higher than outdoor farming, and the carbon footprint of electricity-intensive operations can, in some cases, exceed that of importing food over long distances. Soil contamination in urban areas, a legacy of industrial activity, poses serious health risks for outdoor urban farming in many cities, requiring expensive remediation before food crops can safely be grown in the ground. Questions about economic viability also persist: most urban farms remain dependent on premium pricing and niche markets rather than competing with conventional agriculture on cost.",
    },
  ],
  questionGroups: [
    {
      instructions:
        "Do the following statements agree with the views of the writer?\n\nWrite  YES  if the statement agrees with the writer's views\nWrite  NO  if the statement contradicts the writer's views\nWrite  NOT GIVEN  if it is impossible to say what the writer thinks about this",
      questions: [
        {
          type: "ynng",
          number: 14,
          text: "Urban farming is a viable long-term solution to global food insecurity.",
          answer: "NO",
        },
        {
          type: "ynng",
          number: 15,
          text: "Reducing food miles is an important advantage of growing food in cities.",
          answer: "YES",
        },
        {
          type: "ynng",
          number: 16,
          text: "LED lighting technology has made vertical farming economically competitive with conventional agriculture.",
          answer: "NO",
        },
        {
          type: "ynng",
          number: 17,
          text: "Community gardens have a positive effect on the mental well-being of urban residents.",
          answer: "YES",
        },
        {
          type: "ynng",
          number: 18,
          text: "Governments should provide more financial support for urban farming initiatives.",
          answer: "NOT GIVEN",
        },
      ] as YNNGQuestion[],
    },
    {
      instructions:
        "Reading Passage 2 has five paragraphs, A–E.\nChoose the correct heading for each paragraph from the list of headings below.\nWrite the correct number, i–viii, in boxes 19–23 on your answer sheet.",
      headingOptions: [
        "i.   The environmental case for city-grown produce",
        "ii.  Obstacles to widespread adoption",
        "iii. A new approach to growing food in cities",
        "iv.  Social dimensions of urban agriculture",
        "v.   Technological innovations enabling indoor cultivation",
        "vi.  The role of urban farming in national economies",
        "vii. How data and automation are transforming food production",
        "viii. Government policies supporting local agriculture",
      ],
      questions: [
        { type: "matching_heading", number: 19, paragraph: "A", answer: "iii" },
        { type: "matching_heading", number: 20, paragraph: "B", answer: "i" },
        { type: "matching_heading", number: 21, paragraph: "C", answer: "v" },
        { type: "matching_heading", number: 22, paragraph: "D", answer: "iv" },
        { type: "matching_heading", number: 23, paragraph: "E", answer: "ii" },
      ] as MatchingHeadingQuestion[],
    },
    {
      instructions:
        "Complete the summary below.\nChoose your answers from the word bank and write them in boxes 24–26 on your answer sheet.",
      context:
        "Urban farming uses techniques such as ___24___ and aeroponics to grow crops without traditional ___25___. While these methods improve food chain ___26___, the high cost of electricity remains a significant barrier.",
      wordBank: ["energy", "contamination", "hydroponics", "resilience", "vertical", "sensors", "community", "aeroponics", "soil"],
      questions: [
        {
          type: "summary_completion",
          number: 24,
          prefix: "techniques such as",
          suffix: "and aeroponics to grow crops without traditional",
          answer: "hydroponics",
          acceptableAnswers: ["hydroponics"],
          wordBank: ["energy", "contamination", "hydroponics", "resilience", "vertical", "sensors", "community", "aeroponics", "soil"],
          maxWords: 1,
        },
        {
          type: "summary_completion",
          number: 25,
          prefix: "to grow crops without traditional",
          suffix: ". While these methods improve",
          answer: "soil",
          acceptableAnswers: ["soil"],
          wordBank: ["energy", "contamination", "hydroponics", "resilience", "vertical", "sensors", "community", "aeroponics", "soil"],
          maxWords: 1,
        },
        {
          type: "summary_completion",
          number: 26,
          prefix: "While these methods improve food chain",
          suffix: ", the high cost of electricity remains a significant barrier.",
          answer: "resilience",
          acceptableAnswers: ["resilience"],
          wordBank: ["energy", "contamination", "hydroponics", "resilience", "vertical", "sensors", "community", "aeroponics", "soil"],
          maxWords: 1,
        },
      ] as SummaryCompletionQuestion[],
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// TEST SET 2 — Passage 3  Geoengineering: Hope or Hazard?  (Q 27–40)
// ════════════════════════════════════════════════════════════════════════════════
const set2Passage3: ReadingPassage = {
  id: 3,
  title: "Geoengineering: Hope or Hazard?",
  subtitle: "",
  topic: "Science / Environment",
  paragraphs: [
    {
      label: "A",
      text: "As the pace of climate change accelerates and conventional mitigation strategies — principally the reduction of greenhouse gas emissions — have failed to keep pace with the problem, a growing number of scientists, governments, and technology entrepreneurs have turned their attention to geoengineering: the deliberate, large-scale manipulation of Earth's systems to counteract climate change. Geoengineering proposals are typically divided into two broad categories. Solar radiation management (SRM) encompasses techniques designed to reflect sunlight away from the Earth, thereby reducing surface temperatures without addressing the underlying accumulation of atmospheric carbon dioxide. Carbon dioxide removal (CDR), by contrast, aims to actively extract carbon dioxide from the atmosphere and store it in geological formations, oceans, or biological sinks.",
    },
    {
      label: "B",
      text: "Among the most discussed SRM proposals is stratospheric aerosol injection (SAI), which involves releasing large quantities of reflective particles — most likely sulphur dioxide — into the stratosphere, roughly 15 to 25 kilometres above Earth's surface. The concept draws inspiration from natural volcanic eruptions: the 1991 eruption of Mount Pinatubo in the Philippines injected approximately 20 million tonnes of sulphur dioxide into the stratosphere, causing a measurable global temperature reduction of around 0.5 degrees Celsius for nearly two years. Proponents of SAI argue that it could be implemented relatively cheaply and quickly compared to other climate interventions, potentially at a cost of a few billion dollars per year — orders of magnitude less than the economic damage projected under unchecked warming scenarios.",
    },
    {
      label: "C",
      text: "However, the risks associated with SRM are substantial and poorly understood. Regional rainfall patterns could be severely disrupted, with some modelling studies suggesting that stratospheric aerosol injection could reduce monsoon precipitation in South and East Asia, with potentially devastating consequences for agriculture and water supply in densely populated regions. A further critical concern is the so-called termination shock: if SAI were deployed and then abruptly discontinued — due to geopolitical conflict, economic crisis, or loss of political will — the planet could experience a rapid and extreme warming event as the masking effect of the aerosols disappeared, potentially at a rate several times faster than current climate change. The governance of SRM also presents profound challenges, as no existing international framework has clear authority to regulate activities that could alter weather patterns across national boundaries.",
    },
    {
      label: "D",
      text: "CDR methods are generally regarded as safer than SRM, though they face their own considerable challenges. Direct air capture (DAC) technology, which uses chemical processes to draw carbon dioxide directly from the atmosphere, is currently extremely energy-intensive and prohibitively expensive, with costs of over $300 per tonne of carbon dioxide captured. Enhanced weathering — accelerating the natural geological process by which silicate rocks absorb carbon dioxide — and bioenergy with carbon capture and storage (BECCS), which involves growing biomass, burning it for energy, and capturing the resulting emissions underground, are both being investigated as potentially more cost-effective alternatives. Critics note, however, that deploying CDR at the scale needed to make a meaningful difference would require vast land and energy resources.",
    },
    {
      label: "E",
      text: "Perhaps the most fundamental objection to geoengineering research is the moral hazard argument: the concern that the mere existence of a technological 'safety net', however speculative, may reduce the political and social urgency to make the deep cuts in fossil fuel emissions that are genuinely necessary to address climate change. If governments and corporations believe that geoengineering will ultimately rescue the situation, critics argue, the incentive to undertake the economically and politically painful transition away from fossil fuels will be correspondingly weakened. Proponents counter that, given the pace at which emissions reductions are actually occurring, responsible research into backup options is not only justified but ethically imperative.",
    },
    {
      label: "F",
      text: "At present, geoengineering remains confined to small-scale field experiments and computer modelling studies. The most prominent of these was the Stratospheric Controlled Perturbation Experiment (SCoPEx), initiated by researchers at Harvard University, which proposed releasing a small amount of calcium carbonate into the stratosphere to study its optical and chemical properties. The experiment attracted significant public controversy and was ultimately suspended following objections from indigenous communities and environmental groups. The episode highlighted the absence of any clear international governance framework for even small-scale geoengineering research, prompting growing calls from scientists and policy experts for an international treaty governing research and deployment.",
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
          text: "What does the Pinatubo eruption illustrate?",
          options: [
            { letter: "A", text: "That volcanic eruptions are a major cause of climate change." },
            { letter: "B", text: "That natural events can temporarily reduce global temperatures." },
            { letter: "C", text: "That sulphur dioxide causes permanent damage to the atmosphere." },
            { letter: "D", text: "That stratospheric aerosols increase rainfall." },
          ],
          answer: "B",
        },
        {
          type: "mcq",
          number: 28,
          text: "What is 'termination shock'?",
          options: [
            { letter: "A", text: "The initial cooling effect caused by injecting aerosols into the stratosphere." },
            { letter: "B", text: "The political crisis that might arise from international geoengineering disputes." },
            { letter: "C", text: "A rapid warming that would occur if geoengineering were suddenly stopped." },
            { letter: "D", text: "The damaging side effects of direct air capture technology." },
          ],
          answer: "C",
        },
        {
          type: "mcq",
          number: 29,
          text: "What concern does the moral hazard argument raise?",
          options: [
            { letter: "A", text: "That pursuing geoengineering may reduce motivation to reduce emissions." },
            { letter: "B", text: "That geoengineering technologies are too expensive to be practical." },
            { letter: "C", text: "That geoengineering will only benefit wealthy nations." },
            { letter: "D", text: "That public opposition will prevent geoengineering from being deployed." },
          ],
          answer: "A",
        },
        {
          type: "mcq",
          number: 30,
          text: "What does the passage suggest about current geoengineering activities?",
          options: [
            { letter: "A", text: "They are already being deployed at a large scale by several governments." },
            { letter: "B", text: "They have been banned under international law." },
            { letter: "C", text: "They are focused primarily on ocean-based carbon removal." },
            { letter: "D", text: "They are limited to small experimental trials." },
          ],
          answer: "D",
        },
      ] as MCQQuestion[],
    },
    {
      instructions:
        "The reading passage has six paragraphs, A–F.\nWhich paragraph contains the following information?\nWrite the correct letter, A–F, in boxes 31–36 on your answer sheet.",
      questions: [
        {
          type: "matching_paragraph",
          number: 31,
          text: "A comparison between a natural event and a proposed technological intervention.",
          answer: "B",
        },
        {
          type: "matching_paragraph",
          number: 32,
          text: "An argument that geoengineering could undermine existing climate efforts.",
          answer: "E",
        },
        {
          type: "matching_paragraph",
          number: 33,
          text: "A description of the two broad categories of geoengineering.",
          answer: "A",
        },
        {
          type: "matching_paragraph",
          number: 34,
          text: "Reference to a specific experiment that generated public controversy.",
          answer: "F",
        },
        {
          type: "matching_paragraph",
          number: 35,
          text: "An explanation of risks related to disrupted weather systems.",
          answer: "C",
        },
        {
          type: "matching_paragraph",
          number: 36,
          text: "Mention of techniques that remove rather than reflect carbon.",
          answer: "D",
        },
      ] as MatchingParagraphQuestion[],
    },
    {
      instructions:
        "Answer the questions below.\nChoose NO MORE THAN THREE WORDS from the passage for each answer.\nWrite your answers in boxes 37–40 on your answer sheet.",
      questions: [
        {
          type: "short_answer",
          number: 37,
          text: "What term describes the category of geoengineering techniques designed to reflect sunlight?",
          answer: "solar radiation management",
          acceptableAnswers: ["solar radiation management", "SRM"],
          maxWords: 3,
        },
        {
          type: "short_answer",
          number: 38,
          text: "What natural event in 1991 demonstrated that aerosols can cool the atmosphere?",
          answer: "Mount Pinatubo",
          acceptableAnswers: ["Mount Pinatubo", "Pinatubo eruption", "the Pinatubo eruption"],
          maxWords: 3,
        },
        {
          type: "short_answer",
          number: 39,
          text: "What serious risk arises if stratospheric aerosol injection is abruptly discontinued?",
          answer: "termination shock",
          acceptableAnswers: ["termination shock"],
          maxWords: 3,
        },
        {
          type: "short_answer",
          number: 40,
          text: "What does the abbreviation BECCS stand for in the context of carbon removal?",
          answer: "bioenergy with carbon capture",
          acceptableAnswers: ["bioenergy with carbon capture", "bioenergy carbon capture"],
          maxWords: 3,
        },
      ] as ShortAnswerQuestion[],
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// TEST SET 3 — Passage 1  The History and Technology of Paper  (Q 1–13)
// ════════════════════════════════════════════════════════════════════════════════
const set3Passage1: ReadingPassage = {
  id: 1,
  title: "The History and Technology of Paper",
  subtitle: "",
  topic: "History / Technology",
  paragraphs: [
    {
      label: "A",
      text: "Paper is so deeply embedded in civilisation that it is easy to forget it had to be invented. The credit is traditionally given to Cai Lun, a Chinese court official who, around 105 AD, refined a process for producing a thin, flexible writing surface from beaten plant fibres suspended in water. Before his innovation, Chinese scholars had long relied on more cumbersome media: strips of bamboo bound together and heavy silk cloth. These materials were either too bulky for extended texts or too expensive for everyday use. Cai Lun's contribution was not only to develop a practical and inexpensive product but also to popularise it through official channels. The knowledge of papermaking gradually spread westward along the ancient Silk Road trade network, reaching Central Asia by the sixth century and the Islamic world by the eighth.",
    },
    {
      label: "B",
      text: "In the Islamic world, papermaking underwent significant technological development. Muslim craftsmen introduced water-powered paper mills — a substantial improvement over the hand-beating methods inherited from China — and began producing paper from linen and cotton rags, which yielded a stronger and more durable product than the bark and bamboo fibres used in the East. These improvements made manuscripts easier to preserve and disseminate, facilitating the remarkable flourishing of scholarship in cities such as Baghdad, Samarkand, and Córdoba. Paper entered Europe primarily through Islamic-controlled Spain in the twelfth century, and the first European paper mills are recorded in Italy and France during the thirteenth and fourteenth centuries.",
    },
    {
      label: "C",
      text: "The pivotal moment in European papermaking history came with Johannes Gutenberg's invention of the moveable-type printing press in around 1440. Before the printing press, books were hand-copied by scribes, and production was slow, expensive, and limited to ecclesiastical and aristocratic contexts. The printing press made the mass reproduction of texts possible for the first time, but it also dramatically increased demand for paper: a single print run could consume quantities of paper that would have taken a scriptorium months to produce. The surge in demand for paper prompted standardisation of paper sizes and qualities, as well as innovations in production efficiency. By the sixteenth and seventeenth centuries, paper had become a ubiquitous commodity in European commercial and intellectual life.",
    },
    {
      label: "D",
      text: "The next revolutionary transformation came with the Industrial Revolution. The traditional method of making paper from rags was increasingly unable to meet the exponentially growing demand. The solution was found in wood pulp: wood, treated with chemical processes to break down its fibres, produced a cheap and abundant raw material for paper. The Fourdrinier machine, patented in 1803, used a continuous moving belt to form a sheet of paper from pulped fibres, allowing paper to be produced in a continuous roll rather than individual sheets, and at speeds unimaginable to earlier craftsmen. Mass production made paper not only affordable but essential — for newspapers, packaging, bureaucratic records, and, eventually, the explosion of consumer goods in the twentieth century.",
    },
    {
      label: "E",
      text: "Today, the global paper industry produces approximately 400 million tonnes of paper and cardboard annually. Recycling rates have improved substantially in many countries, with over 70 percent of paper used in some European nations now recovered and reprocessed. Yet the widely anticipated 'paperless office', heralded since the 1970s as the inevitable consequence of digital technology, has so far failed to materialise in the way its proponents predicted. Despite the proliferation of emails, electronic documents, and digital communication, global paper consumption actually rose steadily throughout the latter decades of the twentieth century and remains stubbornly high. The relationship between digital technology and paper use is more complex than simple substitution: digital systems can generate demand for paper just as readily as they replace it.",
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
          text: "Cai Lun invented paper by accident during another experiment.",
          answer: "NOT GIVEN",
        },
        {
          type: "tfng",
          number: 2,
          text: "Before paper, Chinese scholars used bamboo strips as a writing surface.",
          answer: "TRUE",
        },
        {
          type: "tfng",
          number: 3,
          text: "The Islamic world contributed to improvements in papermaking technology.",
          answer: "TRUE",
        },
        {
          type: "tfng",
          number: 4,
          text: "Gutenberg's printing press reduced the demand for paper.",
          answer: "FALSE",
        },
        {
          type: "tfng",
          number: 5,
          text: "The Fourdrinier machine made it possible to produce paper from wood pulp.",
          answer: "TRUE",
        },
        {
          type: "tfng",
          number: 6,
          text: "The introduction of computers has led to a significant reduction in global paper consumption.",
          answer: "FALSE",
        },
        {
          type: "tfng",
          number: 7,
          text: "Paper is currently the most widely recycled material in the world.",
          answer: "NOT GIVEN",
        },
      ] as TFNGQuestion[],
    },
    {
      instructions:
        "Choose the correct letter, A, B, C or D.\nWrite the correct letter in boxes 8–10 on your answer sheet.",
      questions: [
        {
          type: "mcq",
          number: 8,
          text: "Why was linen used by Islamic papermakers?",
          options: [
            { letter: "A", text: "It was cheaper than bamboo and more widely available." },
            { letter: "B", text: "It produced stronger, more durable paper than bark." },
            { letter: "C", text: "It was required by religious authorities for manuscript production." },
            { letter: "D", text: "It allowed paper mills to operate without water power." },
          ],
          answer: "B",
        },
        {
          type: "mcq",
          number: 9,
          text: "What was the significance of the Fourdrinier machine?",
          options: [
            { letter: "A", text: "It was the first machine to produce paper from wood pulp." },
            { letter: "B", text: "It reduced the cost of chemical treatment for wood fibres." },
            { letter: "C", text: "It enabled continuous, high-speed paper production on an industrial scale." },
            { letter: "D", text: "It standardised paper sizes for use in printing presses." },
          ],
          answer: "C",
        },
        {
          type: "mcq",
          number: 10,
          text: "What does the passage suggest about the 'paperless office'?",
          options: [
            { letter: "A", text: "It will eventually be achieved once digital technology improves further." },
            { letter: "B", text: "It has been successfully implemented in several European countries." },
            { letter: "C", text: "It was a concept that was never taken seriously by technology experts." },
            { letter: "D", text: "It has not resulted in the reduction in paper use that was predicted." },
          ],
          answer: "D",
        },
      ] as MCQQuestion[],
    },
    {
      instructions:
        "Complete the sentences below.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.\nWrite your answers in boxes 11–13 on your answer sheet.",
      questions: [
        {
          type: "sentence_completion",
          number: 11,
          prefix: "Paper spread from China to the Islamic world along the ancient trade network known as the",
          suffix: ".",
          answer: "Silk Road",
          acceptableAnswers: ["Silk Road", "the Silk Road"],
          maxWords: 2,
        },
        {
          type: "sentence_completion",
          number: 12,
          prefix: "The invention that dramatically increased demand for paper in Europe was Gutenberg's",
          suffix: ".",
          answer: "printing press",
          acceptableAnswers: ["printing press"],
          maxWords: 2,
        },
        {
          type: "sentence_completion",
          number: 13,
          prefix: "The main raw material used to make paper in modern industrial production is",
          suffix: ".",
          answer: "wood pulp",
          acceptableAnswers: ["wood pulp", "wood"],
          maxWords: 2,
        },
      ] as SentenceCompletionQuestion[],
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// TEST SET 3 — Passage 2  Coral Reefs Under Pressure  (Q 14–26)
// ════════════════════════════════════════════════════════════════════════════════
const set3Passage2: ReadingPassage = {
  id: 2,
  title: "Coral Reefs Under Pressure",
  subtitle: "",
  topic: "Environment / Biology",
  paragraphs: [
    {
      label: "A",
      text: "Coral reefs cover less than one percent of the ocean floor, yet they support an extraordinary proportion of marine biodiversity: it is estimated that around 25 percent of all marine species depend on reefs at some point in their life cycle, earning them the unofficial title of 'the rainforests of the sea'. Beyond their ecological significance, coral reefs provide economic and social benefits to an estimated 500 million people worldwide, including coastal protection, tourism revenue, and food security for communities in tropical regions. Entire national economies — particularly those of small island states in the Caribbean and Pacific — depend substantially on healthy reefs for their survival.",
    },
    {
      label: "B",
      text: "The greatest acute threat to coral reefs is thermal stress caused by rising ocean temperatures. Corals are colonial animals that live in a symbiotic relationship with photosynthetic algae called zooxanthellae, which reside within coral tissue and provide the coral with up to 90 percent of its energy through photosynthesis. When water temperatures rise even slightly above normal seasonal ranges — by as little as one degree Celsius sustained over several weeks — corals expel their zooxanthellae in a stress response, causing the distinctive bleached white appearance known as coral bleaching. Without their algal partners, corals can survive for a limited period but soon begin to starve and die. The 1998 El Niño event caused the most widespread global bleaching episode on record at that time, damaging reefs across the Indian Ocean, the Pacific, and the Caribbean. The Great Barrier Reef has since experienced multiple severe bleaching events, with successive events in 2016, 2017, 2020, and 2022 killing or damaging large sections of the reef.",
    },
    {
      label: "C",
      text: "While rising temperatures represent the most immediate danger, reefs face a complex web of additional threats. Ocean acidification — the reduction in seawater pH caused by the absorption of atmospheric carbon dioxide — weakens the calcium carbonate structures that corals build, making them more susceptible to physical damage and inhibiting growth. Outbreaks of the crown-of-thorns starfish, a natural predator of coral polyps, have caused widespread destruction on the Great Barrier Reef and elsewhere, with warming temperatures thought to be contributing to more frequent and severe outbreaks. Coastal development, including dredging, land reclamation, and agricultural runoff carrying fertilisers and pesticides, degrades water quality and smothers coral. Overfishing removes the herbivorous fish that control algal growth on reefs, allowing algae to outcompete and smother recovering coral.",
    },
    {
      label: "D",
      text: "In response to the ongoing crisis, scientists and conservation organisations have developed a range of restoration techniques. Coral gardening — the cultivation of coral fragments on underwater nursery structures before transplanting them onto degraded reef areas — has been practised with some success by organisations such as the Coral Restoration Foundation in Florida. More ambitious approaches include assisted evolution, which involves selectively breeding or genetically modifying coral strains for heat tolerance, and coral IVF, a technique in which eggs and sperm are collected from spawning corals and reared in controlled laboratory conditions before being seeded onto degraded reefs. These methods remain experimental and expensive, and their ability to restore reefs at the scale needed remains to be demonstrated.",
    },
    {
      label: "E",
      text: "At the policy level, the debate over how to protect coral reefs reflects broader tensions in environmental governance. Marine Protected Areas (MPAs) — designated zones where fishing and other extractive activities are restricted — have shown mixed results: MPAs can enhance reef resilience to some local threats but offer no protection against the global stressors of temperature rise and acidification. The Paris Agreement on climate change, which commits signatory nations to limiting global warming to well below 2 degrees Celsius above pre-industrial levels, is widely recognised as the single most important policy framework for reef survival, since modelling suggests that most reefs would not survive a 2-degree scenario and virtually none would survive 3 degrees. The challenge, as many marine scientists emphasise, is that protecting reefs ultimately requires both urgent global action on emissions and targeted local conservation efforts — one without the other is insufficient.",
    },
  ],
  questionGroups: [
    {
      instructions:
        "Do the following statements agree with the views of the writer?\n\nWrite  YES  if the statement agrees with the writer's views\nWrite  NO  if the statement contradicts the writer's views\nWrite  NOT GIVEN  if it is impossible to say what the writer thinks about this",
      questions: [
        {
          type: "ynng",
          number: 14,
          text: "Coral reefs are home to the majority of the world's marine species.",
          answer: "NO",
        },
        {
          type: "ynng",
          number: 15,
          text: "Rising sea temperatures are the primary cause of coral bleaching.",
          answer: "YES",
        },
        {
          type: "ynng",
          number: 16,
          text: "Coral restoration programmes have already reversed the decline of the Great Barrier Reef.",
          answer: "NOT GIVEN",
        },
        {
          type: "ynng",
          number: 17,
          text: "Marine Protected Areas are always effective in protecting coral from bleaching.",
          answer: "NO",
        },
        {
          type: "ynng",
          number: 18,
          text: "Both global climate action and local conservation measures are necessary to protect coral reefs.",
          answer: "YES",
        },
      ] as YNNGQuestion[],
    },
    {
      instructions:
        "Reading Passage 2 has five paragraphs, A–E.\nChoose the correct heading for each paragraph from the list of headings below.\nWrite the correct number, i–viii, in boxes 19–23 on your answer sheet.",
      headingOptions: [
        "i.   The economic and ecological importance of reefs",
        "ii.  How rising temperatures damage coral",
        "iii. Innovative scientific approaches to reef recovery",
        "iv.  Why fishing bans alone cannot save coral",
        "v.   The multiple threats facing reef systems",
        "vi.  International agreements and their limitations",
        "vii. Local communities and reef conservation",
        "viii. Policy debates around reef protection",
      ],
      questions: [
        { type: "matching_heading", number: 19, paragraph: "A", answer: "i" },
        { type: "matching_heading", number: 20, paragraph: "B", answer: "ii" },
        { type: "matching_heading", number: 21, paragraph: "C", answer: "v" },
        { type: "matching_heading", number: 22, paragraph: "D", answer: "iii" },
        { type: "matching_heading", number: 23, paragraph: "E", answer: "viii" },
      ] as MatchingHeadingQuestion[],
    },
    {
      instructions:
        "Answer the questions below.\nChoose NO MORE THAN THREE WORDS from the passage for each answer.\nWrite your answers in boxes 24–26 on your answer sheet.",
      questions: [
        {
          type: "short_answer",
          number: 24,
          text: "What are the symbiotic organisms that live within coral tissue called?",
          answer: "zooxanthellae",
          acceptableAnswers: ["zooxanthellae"],
          maxWords: 3,
        },
        {
          type: "short_answer",
          number: 25,
          text: "What major climate event in 1998 caused widespread global coral bleaching?",
          answer: "El Niño",
          acceptableAnswers: ["El Niño", "El Nino", "El Niño event"],
          maxWords: 3,
        },
        {
          type: "short_answer",
          number: 26,
          text: "What is the name of the process where scientists grow coral fragments on underwater structures?",
          answer: "coral gardening",
          acceptableAnswers: ["coral gardening"],
          maxWords: 3,
        },
      ] as ShortAnswerQuestion[],
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// TEST SET 3 — Passage 3  The Sharing Economy  (Q 27–40)
// ════════════════════════════════════════════════════════════════════════════════
const set3Passage3: ReadingPassage = {
  id: 3,
  title: "The Sharing Economy",
  subtitle: "",
  topic: "Economics / Society",
  paragraphs: [
    {
      label: "A",
      text: "The sharing economy — also called collaborative consumption — refers to economic systems built around the peer-to-peer sharing of assets, goods, and services, typically facilitated through digital platforms. Companies such as Airbnb, which allows homeowners to rent spare rooms or entire properties to travellers, Uber, which connects private drivers with passengers, and TaskRabbit, which matches people needing small jobs done with local workers, are among the most prominent examples. The sector has grown with remarkable speed: global revenues from sharing-economy platforms were estimated at $335 billion by 2025, and the model has disrupted industries from hospitality and transportation to finance and household services. Advocates argue that the sharing economy represents a fundamental reimagining of consumption, enabling people to earn money from underused assets and access goods and services more efficiently.",
    },
    {
      label: "B",
      text: "For consumers, the appeal of sharing economy platforms is primarily economic. Renting a room through Airbnb is typically cheaper than staying in a hotel; sharing a car journey through a ride-hailing app costs less than a traditional taxi. At a broader level, proponents argue that sharing economy models make more efficient use of existing assets: a privately owned car sits unused for approximately 95 percent of its lifetime; a spare bedroom generates no value unless rented. By making underused resources available to others, collaborative consumption potentially reduces the need to manufacture new goods, which its advocates argue has significant environmental benefits. The shift from ownership to access as the dominant model of consumption, some economists suggest, represents a structural change in how modern economies function.",
    },
    {
      label: "C",
      text: "For the individuals who earn income through sharing economy platforms, the picture is more complex. Proponents emphasise the flexibility that platform-based work offers: workers can choose when, where, and how much they work, free from the constraints of conventional employment. For parents, students, or those with multiple jobs, this flexibility can be genuinely valuable. Critics, however, point out that this flexibility comes at a significant cost. Gig workers typically lack the employment protections and benefits that conventional employees receive: paid holidays, sick pay, pension contributions, and protection against unfair dismissal. The structural precarity of gig work — income insecurity, algorithmic management, and the constant threat of deactivation — represents a serious challenge to worker well-being, particularly for those who rely on platform income as their primary source of livelihood.",
    },
    {
      label: "D",
      text: "The rapid growth of sharing economy platforms has generated significant conflict with established industries. The taxi industry in cities from London to New York to Sydney has waged fierce legal and lobbying battles against ride-hailing companies, arguing that they operate outside the regulatory frameworks — licensing requirements, safety inspections, insurance obligations — that govern conventional taxi services. The hotel industry has similarly challenged short-term rental platforms on the grounds that they circumvent the health, safety, and planning regulations that conventional accommodation providers must meet. In several cities and countries, sharing economy platforms have been subject to legal challenges, temporary bans, or forced modifications to their operating models as a result of these disputes.",
    },
    {
      label: "E",
      text: "Labour rights have emerged as the most contentious legal battleground for the sharing economy. The central question is whether platform workers should be classified as employees — entitled to the full range of employment rights and protections — or as independent contractors, who bear their own costs and risks but are not covered by employment law. In 2019, California passed Assembly Bill 5 (AB5), a landmark law that required companies to reclassify many gig workers as employees rather than contractors, triggering fierce opposition from Uber, Lyft, and other platform companies, who spent over $200 million on a ballot measure to exempt themselves from its provisions. Similar legal disputes have played out in courts across Europe, with some national courts ruling that platform workers must be treated as employees.",
    },
    {
      label: "F",
      text: "The environmental credentials of the sharing economy, once largely accepted at face value, have attracted growing scepticism. Research has suggested that services like Uber may actually increase total vehicle miles travelled, as drivers cruise empty between fares and customers substitute platform rides for journeys they might otherwise have made by public transport or bicycle. The rebound effect — the phenomenon whereby efficiency gains lead to increased overall consumption rather than reduced use — appears to affect sharing platforms as much as other technologies. Studies of Airbnb's impact on housing markets in cities such as New York and Barcelona have raised concerns that the platform has reduced the supply of long-term rental housing, driving up rents and displacing residents. The environmental and social reality of the sharing economy, the evidence increasingly suggests, is more complicated than early optimism implied.",
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
          text: "What does the term 'sharing economy' primarily describe?",
          options: [
            { letter: "A", text: "A system in which governments distribute resources equally among citizens." },
            { letter: "B", text: "Peer-to-peer platforms that enable people to rent or share assets." },
            { letter: "C", text: "Technology companies that offer free products to reduce consumption." },
            { letter: "D", text: "A form of cooperative business ownership popular in the technology sector." },
          ],
          answer: "B",
        },
        {
          type: "mcq",
          number: 28,
          text: "What is the 'rebound effect' mentioned in the passage?",
          options: [
            { letter: "A", text: "The legal backlash experienced by sharing economy companies from regulators." },
            { letter: "B", text: "The recovery of share prices for platform companies after initial losses." },
            { letter: "C", text: "The return to traditional consumption patterns after sharing economy services fail." },
            { letter: "D", text: "The phenomenon where efficiency gains lead to increased overall consumption." },
          ],
          answer: "D",
        },
        {
          type: "mcq",
          number: 29,
          text: "What was California's AB5 law designed to do?",
          options: [
            { letter: "A", text: "Reclassify gig workers as employees entitled to benefits." },
            { letter: "B", text: "Ban ride-hailing companies from operating in California." },
            { letter: "C", text: "Reduce the number of vehicles on Californian roads." },
            { letter: "D", text: "Exempt technology companies from standard labour laws." },
          ],
          answer: "A",
        },
        {
          type: "mcq",
          number: 30,
          text: "What does the passage suggest about the environmental impact of sharing platforms?",
          options: [
            { letter: "A", text: "They have significantly reduced carbon emissions in most cities." },
            { letter: "B", text: "They have no measurable effect on environmental outcomes." },
            { letter: "C", text: "The actual environmental benefit is more uncertain than commonly claimed." },
            { letter: "D", text: "They are responsible for a substantial increase in global pollution." },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
    {
      instructions:
        "The reading passage has six paragraphs, A–F.\nWhich paragraph contains the following information?\nWrite the correct letter, A–F, in boxes 31–36 on your answer sheet.",
      questions: [
        {
          type: "matching_paragraph",
          number: 31,
          text: "Evidence that challenges the environmental credentials of sharing platforms.",
          answer: "F",
        },
        {
          type: "matching_paragraph",
          number: 32,
          text: "A description of how workers in the sharing economy are legally classified.",
          answer: "E",
        },
        {
          type: "matching_paragraph",
          number: 33,
          text: "An explanation of what the sharing economy is and its projected growth.",
          answer: "A",
        },
        {
          type: "matching_paragraph",
          number: 34,
          text: "Difficulties experienced by established industries due to sharing platforms.",
          answer: "D",
        },
        {
          type: "matching_paragraph",
          number: 35,
          text: "Arguments about the advantages for people who earn money through sharing platforms.",
          answer: "C",
        },
        {
          type: "matching_paragraph",
          number: 36,
          text: "The environmental argument for using shared rather than individually owned assets.",
          answer: "B",
        },
      ] as MatchingParagraphQuestion[],
    },
    {
      instructions:
        "Complete the summary below.\nChoose your answers from the word bank and write them in boxes 37–40 on your answer sheet.",
      context:
        "In the sharing economy, ___37___ access goods and services without long-term ___38___. While workers value the ___39___ of gig work, critics point to employment ___40___ as a major concern.",
      wordBank: ["platforms", "precarity", "ownership", "regulation", "assets", "flexibility", "contractors", "consumers", "rebound"],
      questions: [
        {
          type: "summary_completion",
          number: 37,
          prefix: "In the sharing economy,",
          suffix: "access goods and services without long-term",
          answer: "consumers",
          acceptableAnswers: ["consumers"],
          wordBank: ["platforms", "precarity", "ownership", "regulation", "assets", "flexibility", "contractors", "consumers", "rebound"],
          maxWords: 1,
        },
        {
          type: "summary_completion",
          number: 38,
          prefix: "access goods and services without long-term",
          suffix: ". While workers value the",
          answer: "ownership",
          acceptableAnswers: ["ownership"],
          wordBank: ["platforms", "precarity", "ownership", "regulation", "assets", "flexibility", "contractors", "consumers", "rebound"],
          maxWords: 1,
        },
        {
          type: "summary_completion",
          number: 39,
          prefix: "While workers value the",
          suffix: "of gig work, critics point to employment",
          answer: "flexibility",
          acceptableAnswers: ["flexibility"],
          wordBank: ["platforms", "precarity", "ownership", "regulation", "assets", "flexibility", "contractors", "consumers", "rebound"],
          maxWords: 1,
        },
        {
          type: "summary_completion",
          number: 40,
          prefix: "critics point to employment",
          suffix: "as a major concern.",
          answer: "precarity",
          acceptableAnswers: ["precarity"],
          wordBank: ["platforms", "precarity", "ownership", "regulation", "assets", "flexibility", "contractors", "consumers", "rebound"],
          maxWords: 1,
        },
      ] as SummaryCompletionQuestion[],
    },
  ],
};

// ── Exports ────────────────────────────────────────────────────────────────────
export const testSet2Passages: ReadingPassage[] = [set2Passage1, set2Passage2, set2Passage3];
export const testSet3Passages: ReadingPassage[] = [set3Passage1, set3Passage2, set3Passage3];

