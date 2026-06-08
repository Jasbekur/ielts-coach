// IELTS Academic Reading – Test Sets 9–13
// Generated from IELTS_10_Full_Reading_Tests.md

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

// ══════════════ TEST SET 9 ══════════════
const set9Passage1: ReadingPassage = {
  id: 1,
  title: "The History Of Cartography",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Maps are among the oldest human artefacts, predating writing in some cultures by thousands of years. The human impulse to represent spatial relationships graphically — to make sense of the world by reducing it to a manipulable image — has produced an extraordinary diversity of cartographic traditions across different cultures and historical periods. While modern cartography is governed by mathematical principles of projection and measurement that aim at accuracy and objectivity, maps throughout history have as often reflected the cosmological beliefs, power relationships, and cultural priorities of their makers as the geographical reality of the spaces they purported to represent." },
    { label: "B", text: "Some of the earliest known maps — carved on clay tablets in ancient Babylon around 2300 BCE — depict a world centred on the Euphrates River, with Babylon at the geographical and cosmological centre. The deliberate placement of one's own civilisation at the centre of the known world — a practice known as geomacrism — is found in cartographic traditions across cultures, from medieval European mappae mundi, which placed Jerusalem at the centre, to early Chinese world maps, which positioned the Middle Kingdom (China's own name for itself) at the geographical heart. These maps were not merely inaccurate representations of physical geography; they were cosmological statements about the relative importance of places and peoples." },
    { label: "C", text: "Greek scholars made the most significant advances towards scientifically grounded cartography in the ancient world. Eratosthenes, the chief librarian of Alexandria in the third century BCE, calculated the circumference of the Earth with remarkable accuracy using the angular difference in shadow length between two locations on the summer solstice, arriving at an estimate within approximately one to two percent of the actual value. Ptolemy, writing in the second century CE, produced a systematic mathematical framework for map projection that would influence cartography until the Renaissance, including the concept of longitude and latitude as a coordinate grid and the identification of the problem of representing a spherical surface on a flat plane." },
    { label: "D", text: "The Age of Exploration from the fifteenth to seventeenth centuries produced both the greatest advances in geographical knowledge and some of the most politically consequential maps in history. Portuguese and Spanish maritime exploration, driven by commercial and imperial ambitions, required increasingly accurate charts of coastlines, ocean currents, and navigation hazards. The resulting portolan charts — produced from magnetic compass bearings and distance estimates by experienced navigators — achieved remarkable accuracy for coastal geography well before any formal surveying methodology existed. The maps produced in this period were state secrets of the highest order; Portugal famously maintained a padrao, or master map, to which navigational intelligence was continuously added and from which copies were strictly controlled." },
    { label: "E", text: "The colonial period produced maps that were not merely records of geographical discovery but instruments of imperial power. Mapping a territory was intimately connected with claiming it: naming geographical features after European monarchs and explorers, erasing the existing names used by indigenous peoples, drawing administrative boundaries without regard for existing cultural and ecological territories, and representing vast unexplored regions as terra nullius — empty land, available for appropriation — were all practices embedded in the maps of empire. The critical cartography tradition in contemporary geography has developed extensive tools for analysing the power relationships encoded in maps, demonstrating that cartographic representation is never a neutral technical exercise but always involves choices about what is made visible and what is suppressed." },
    { label: "F", text: "Modern Geographic Information Systems (GIS) have transformed cartography from a manual craft into a computational science. GIS platforms enable the storage, analysis, and visualisation of spatial data at unprecedented scales, supporting applications from precision agriculture and urban planning to epidemiology and military logistics. The democratisation of mapping through freely available platforms such as Google Maps and OpenStreetMap has distributed cartographic power more broadly than at any previous point in history — while also raising new questions about the governance of spatial data, the surveillance implications of pervasive location tracking, and the persistence of biases in how different communities are represented in commercial mapping products." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "TRUE / FALSE / NOT GIVEN",
      questions: [
        { type: "tfng", number: 1, text: "The oldest known maps predate the development of writing in some civilisations.", answer: "TRUE" },
        { type: "tfng", number: 2, text: "Medieval European mappae mundi typically placed Rome at the centre of the world.", answer: "FALSE" },
        { type: "tfng", number: 3, text: "Eratosthenes calculated the Earth's circumference to within approximately one to two percent of the actual value.", answer: "TRUE" },
        { type: "tfng", number: 4, text: "Portolan charts were produced using advanced mathematical surveying techniques.", answer: "FALSE" },
        { type: "tfng", number: 5, text: "Critical cartography studies the power relationships encoded in how maps are made.", answer: "TRUE" },
      ] as TFNGQuestion[],
    },
    {
      instructions: "SHORT ANSWER",
      questions: [
        {
          type: "sentence_completion", number: 6,
          prefix: "What term describes the practice of placing one's own civilisation at the centre of a world map?", suffix: "",
          answer: "geomacrism", acceptableAnswers: ["geomacrism"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 7,
          prefix: "What did Portugal maintain as a master map to which navigational intelligence was continuously added?", suffix: "",
          answer: "padrao", acceptableAnswers: ["padrao"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 8,
          prefix: "What Latin term was used on colonial maps to describe territory classified as empty and available for appropriation?", suffix: "",
          answer: "terra nullius", acceptableAnswers: ["terra nullius"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 9,
          prefix: "What type of information system has transformed modern cartography into a computational science?", suffix: "",
          answer: "Geographic Information Systems (GIS)", acceptableAnswers: ["Geographic Information Systems (GIS)"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 10, text: "What does the passage say about Ptolemy's cartographic contribution?",
          options: [
            { letter: "A", text: "He discovered that the Earth was spherical" },
            { letter: "B", text: "He created the first map to accurately depict the coastlines of Europe" },
            { letter: "C", text: "He developed a mathematical framework using latitude and longitude that influenced cartography until the Renaissance" },
            { letter: "D", text: "He was the first to calculate the circumference of the Earth" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 11, text: "Why were maps produced during the Age of Exploration considered state secrets?",
          options: [
            { letter: "A", text: "They contained information about undiscovered civilisations" },
            { letter: "B", text: "They were inaccurate and governments did not want rivals to know this" },
            { letter: "C", text: "They contained commercially and strategically valuable navigational intelligence" },
            { letter: "D", text: "They showed the true locations of gold deposits in newly discovered territories" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 12, text: "What argument does the critical cartography tradition make about colonial maps?",
          options: [
            { letter: "A", text: "Colonial maps were the most geographically accurate maps ever produced" },
            { letter: "B", text: "Maps were instruments of imperial power that encoded choices about what to make visible" },
            { letter: "C", text: "Colonial cartographers worked in collaboration with indigenous communities" },
            { letter: "D", text: "The inaccuracies of colonial maps prevented effective governance of colonies" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 13, text: "According to the passage, what concern does the democratisation of mapping through GIS raise?",
          options: [
            { letter: "A", text: "The technology is too complex for ordinary citizens to use" },
            { letter: "B", text: "GIS platforms are too expensive for governments in developing countries" },
            { letter: "C", text: "Issues including surveillance implications of location tracking and biases in community representation" },
            { letter: "D", text: "Maps produced through GIS are less accurate than traditional cartographic methods" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set9Passage2: ReadingPassage = {
  id: 2,
  title: "Supply Chain Management In The Global Economy",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Supply chain management (SCM) — the coordination of all activities involved in producing and delivering a product or service from raw material sourcing through production, storage, and distribution to the final customer — has evolved from a relatively narrow operational function into a strategic discipline central to competitive advantage in the global economy. The supply chain crises of the COVID-19 pandemic period, which produced empty shelves, months-long delivery delays, and dramatic price increases across multiple sectors, brought the subject to public attention in unprecedented ways and accelerated a fundamental reassessment of the trade-offs between efficiency, resilience, and sustainability that lie at the heart of modern supply chain design." },
    { label: "B", text: "The dominant philosophy governing global supply chains for the four decades preceding the pandemic was lean supply chain management, inspired by the Toyota Production System developed in post-war Japan. Lean principles — including just-in-time inventory management, waste elimination, continuous improvement (kaizen), and the minimisation of buffer stocks throughout the supply chain — produced significant efficiency gains and cost reductions by synchronising supply precisely to demand. The globalisation of production from the 1980s onwards, driven by falling trade barriers and dramatically reduced transportation costs, allowed companies to source components and manufacture products wherever production costs were lowest, creating supply chains of extraordinary geographic complexity." },
    { label: "C", text: "The fragility of these hyper-efficient, geographically dispersed supply chains became starkly apparent during the pandemic. The sudden closure of Chinese factories in early 2020, followed by cascading disruptions to shipping, port operations, and logistics networks worldwide, revealed that a philosophy optimised for efficiency had left many supply chains with minimal resilience to disruption. Companies with single-source strategies — relying on one supplier for critical components — found themselves unable to source alternatives quickly when that supplier was disrupted. Semiconductor shortages, triggered initially by a surge in electronics demand and the closure of key fabrication facilities, rippled through automobile, consumer electronics, medical device, and many other industries, demonstrating the systemic interconnections of modern manufacturing." },
    { label: "D", text: "The post-pandemic reassessment of supply chain strategy has centred on the concept of resilience — the capacity to withstand, adapt to, and recover rapidly from disruptions. Approaches to building resilience include nearshoring and reshoring (relocating production or sourcing closer to home markets to reduce dependence on distant suppliers and long logistics chains), multi-sourcing (developing relationships with multiple suppliers for critical components rather than relying on a single source), and strategic inventory investment (maintaining higher safety stock for critical items despite its cost). Geopolitical tensions, particularly between the United States and China in technology supply chains, have added a political dimension to these decisions, with governments actively intervening to support the domestic development of strategic industrial capacities." },
    { label: "E", text: "Environmental sustainability has emerged as a third dimension of supply chain performance alongside efficiency and resilience. Supply chains account for the majority of corporate carbon emissions — an estimated 80 percent for most manufacturing companies — and a significant proportion of other environmental impacts including water use, land use change, deforestation, and chemical pollution. Scope 3 emissions — the greenhouse gas emissions generated throughout a company's upstream supply chain and downstream product use — are the most significant and the most difficult to measure and manage, as they require companies to understand and influence the environmental practices of suppliers often many tiers removed. Regulatory requirements for supply chain emissions disclosure and due diligence on environmental and human rights standards are increasing rapidly, particularly in the European Union." },
    { label: "F", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 14, text: "The writer claims that supply chain management became publicly prominent during the COVID-19 pandemic.", answer: "YES" },
        { type: "ynng", number: 15, text: "Lean supply chain management was inspired by principles developed in American automobile manufacturing.", answer: "NO" },
        { type: "ynng", number: 16, text: "The writer implies that just-in-time inventory strategies reduced companies' resilience to disruptions.", answer: "YES" },
        { type: "ynng", number: 17, text: "The writer states that semiconductor shortages only affected the automobile industry during the pandemic.", answer: "NO" },
        { type: "ynng", number: 18, text: "Nearshoring involves moving production closer to home markets to reduce dependence on distant suppliers.", answer: "YES" },
        { type: "ynng", number: 19, text: "The writer argues that environmental sustainability in supply chains is fully achievable within current regulatory frameworks.", answer: "NOT GIVEN" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "SENTENCE COMPLETION",
      questions: [
        {
          type: "sentence_completion", number: 20,
          prefix: "The Toyota Production System inspired an approach to supply chains based on", suffix: "principles that minimised buffer stocks.",
          answer: "lean", acceptableAnswers: ["lean"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 21,
          prefix: "Companies with", suffix: "strategies found themselves unable to source alternatives when their sole supplier was disrupted.",
          answer: "single-source", acceptableAnswers: ["single-source"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 22,
          prefix: "", suffix: "emissions refer to greenhouse gases generated throughout a company's upstream supply chain and downstream product use.",
          answer: "scope 3", acceptableAnswers: ["scope 3"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 23,
          prefix: "Building supply chain resilience through developing relationships with multiple suppliers is known as", suffix: ".",
          answer: "multi-sourcing", acceptableAnswers: ["multi-sourcing"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 24, text: "What is described as the dominant supply chain philosophy in the decades before the COVID-19 pandemic?",
          options: [
            { letter: "A", text: "Resilient supply chain management focused on risk reduction" },
            { letter: "B", text: "Lean supply chain management based on just-in-time principles" },
            { letter: "C", text: "Sustainable supply chain management prioritising environmental impact" },
            { letter: "D", text: "Distributed supply chain management spreading risk across many suppliers" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 25, text: "According to the passage, what demonstrated the systemic interconnections of modern manufacturing?",
          options: [
            { letter: "A", text: "The collapse of global shipping companies" },
            { letter: "B", text: "The inability to source consumer electronics outside of China" },
            { letter: "C", text: "Semiconductor shortages rippling across multiple industries" },
            { letter: "D", text: "The failure of government industrial policies in the United States" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 26, text: "Why are Scope 3 emissions described as the most difficult to manage?",
          options: [
            { letter: "A", text: "They are produced directly by a company's own factories" },
            { letter: "B", text: "There is no scientific method for measuring greenhouse gas emissions" },
            { letter: "C", text: "They require influencing the environmental practices of suppliers several tiers removed" },
            { letter: "D", text: "Regulatory bodies have not yet defined what constitutes Scope 3 emissions" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set9Passage3: ReadingPassage = {
  id: 3,
  title: "The Sociology Of Education: Reproduction And Resistance",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "**Paragraph A** Education is commonly understood in popular discourse as the great equaliser — a mechanism through which talent and effort, regardless of social origin, are translated into achievement and mobility. Sociology of education, as an academic discipline, has spent much of the past half-century problematising and complicating this view. From diverse theoretical perspectives — including structural functionalism, critical theory, and various strands of post-structuralism — sociological research has consistently found that educational systems tend to reproduce social inequalities as much as they challenge them, sorting students along lines of class, race, and gender in ways that reflect and reinforce the social structures within which schools operate." },
    { label: "B", text: "**Paragraph B** The concept of cultural capital, developed by French sociologist Pierre Bourdieu, has been among the most influential analytical frameworks in the sociology of education. Bourdieu argued that educational institutions operate through a \"misrecognition\" of what is in fact culturally arbitrary knowledge and skill as universally valuable intellectual merit. The curriculum, pedagogical styles, and assessment practices of dominant educational institutions reflect and reward the cultural dispositions, linguistic practices, and knowledge forms most familiar to the children of professional and educated middle-class families — dispositions that Bourdieu termed habitus. Students from working-class backgrounds, whose habitus has been formed in different cultural conditions, encounter the school as a foreign environment whose implicit rules are less legible to them, producing systematic disadvantage that appears as individual failure rather than structural inequality." },
    { label: "C", text: "**Paragraph C** Basil Bernstein's work on language codes offered a related but distinct analysis of how linguistic differences shaped educational experience and outcomes. Bernstein identified an \"elaborated code\" — a linguistic register characterised by explicit, context-independent meaning, formal grammar, and the ability to abstract from specific contexts — as the mode of communication preferred and rewarded in educational settings. In contrast, \"restricted code\" — implicit, context-dependent communication relying on shared assumptions — was more typical of working-class family interaction but less valued in formal educational contexts. Bernstein was careful to stress that restricted code was not linguistically inferior, but it was institutionally disadvantaged in a system that implicitly required mastery of elaborated code for academic success." },
    { label: "D", text: "**Paragraph D** The \"hidden curriculum\" — the implicit values, norms, and dispositions transmitted through schooling beyond its formal academic content — has been a central theme in critical sociology of education. Schools teach not only mathematics and literature but also punctuality, deference to authority, the normalisation of surveillance and assessment, and the acceptance of differential reward based on individual performance. Samuel Bowles and Herbert Gintis argued in their influential but contested \"correspondence theory\" that the hidden curriculum mirrors the social relations of production in capitalist economies, preparing working-class students for compliant wage labour while preparing middle-class students for supervisory and professional roles. Critics have argued that this analysis is overly deterministic and understates the degree to which students, teachers, and communities resist and subvert the socialising functions of schooling." },
    { label: "E", text: "**Paragraph E** Paul Willis's ethnographic study of working-class boys in an English industrial town, published as \"Learning to Labour\" in 1977, remains one of the most cited works in the sociology of education precisely because it captured the complexity that mechanistic reproduction theories missed. Willis found that a group of working-class boys — \"the lads\" — actively rejected the academic values of their school, developing an oppositional counter-culture that celebrated manual labour, masculine toughness, and resistance to authority. This resistance was not simply irrational self-sabotage; it reflected a sophisticated, if partially misguided, reading of the economic landscape in which academic credentials seemed irrelevant to the working-class futures their families exemplified. The tragedy, in Willis's analysis, was that this resistance led the boys directly into the manual jobs for which they were rebelling — unknowingly participating in their own class reproduction." },
    { label: "F", text: "**Paragraph F** Contemporary sociology of education increasingly attends to the intersections of class, race, and gender in shaping educational experience and outcomes. The concept of intersectionality, developed by legal scholar Kimberlé Crenshaw and subsequently adopted across the social sciences, directs attention to how multiple social positions interact and compound in their effects rather than operating separately. Research on the educational experiences of Black girls, for example, reveals forms of disadvantage that are neither reducible to their race nor to their gender separately, but emerge from their specific intersectional position within educational institutions and their surrounding social structures. Addressing educational inequality, on this view, requires not merely adjusting individual policies targeting single axes of disadvantage but understanding and reforming the complex, interlocking structures through which inequality is produced." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "Match the correct heading (i–viii) to paragraphs A–F.",
      headingOptions: [
        "I. How language practices in education disadvantage some students while appearing neutral",
        "II. Why working-class resistance can paradoxically reinforce class reproduction",
        "III. How multiple social identities combine to create complex forms of educational disadvantage",
        "IV. Why educational systems tend to reproduce rather than challenge social inequalities",
        "V. The implicit social norms that schooling transmits beyond academic content",
        "VI. How cultural knowledge learned at home shapes academic success or failure",
        "VII. Evidence that teachers deliberately discriminate against working-class students",
        "VIII. Why educational achievement is becoming more equal across social classes",
      ],
      questions: [
        { type: "matching_heading", number: 27, paragraph: "A", answer: "IV" },
        { type: "matching_heading", number: 28, paragraph: "B", answer: "VI" },
        { type: "matching_heading", number: 29, paragraph: "C", answer: "I" },
        { type: "matching_heading", number: 30, paragraph: "D", answer: "V" },
        { type: "matching_heading", number: 31, paragraph: "E", answer: "II" },
        { type: "matching_heading", number: 32, paragraph: "F", answer: "III" },
      ] as MatchingHeadingQuestion[],
    },
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 33, text: "The writer implies that Bourdieu believed schools treated culturally specific knowledge as if it were universal merit.", answer: "YES" },
        { type: "ynng", number: 34, text: "Bernstein argued that restricted code was linguistically inferior to elaborated code.", answer: "NO" },
        { type: "ynng", number: 35, text: "The writer presents Bowles and Gintis's correspondence theory as universally accepted by sociologists.", answer: "NO" },
        { type: "ynng", number: 36, text: "Willis found that working-class boys' rejection of academic values led them into the manual jobs they thought they were resisting.", answer: "YES" },
        { type: "ynng", number: 37, text: "The writer claims that intersectionality was first developed by a sociologist rather than a legal scholar.", answer: "NO" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 38, text: "What does Bourdieu's concept of \"habitus\" refer to?",
          options: [
            { letter: "A", text: "The formal curriculum taught in educational institutions" },
            { letter: "B", text: "The cultural dispositions and ways of being formed by one's social environment" },
            { letter: "C", text: "The assessment methods used to evaluate student performance" },
            { letter: "D", text: "The institutional rules that govern school behaviour" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 39, text: "What is the \"hidden curriculum\" as described in the passage?",
          options: [
            { letter: "A", text: "The academic subjects that are taught only to high-achieving students" },
            { letter: "B", text: "The secret selection processes used by elite schools" },
            { letter: "C", text: "The implicit values, norms, and dispositions transmitted through schooling beyond formal content" },
            { letter: "D", text: "The informal lessons taught by teachers outside the official classroom" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 40, text: "What is described as the \"tragedy\" in Willis's study of \"the lads\"?",
          options: [
            { letter: "A", text: "The boys failed all their academic examinations" },
            { letter: "B", text: "Their resistance against school led directly to the manual working-class futures they thought they were resisting" },
            { letter: "C", text: "The school expelled all the resistant students at the end of the study" },
            { letter: "D", text: "The boys were unable to find employment of any kind" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

export const testSet9Passages: ReadingPassage[] = [
  set9Passage1,
  set9Passage2,
  set9Passage3,
];

// ══════════════ TEST SET 10 ══════════════
const set10Passage1: ReadingPassage = {
  id: 1,
  title: "Rainforests: Biodiversity And Function",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Tropical rainforests, found primarily in a band around the equator in South America, Central Africa, and Southeast Asia, represent less than six percent of the Earth's land surface yet contain an estimated 50 to 80 percent of all terrestrial species. This extraordinary concentration of biodiversity has made rainforests the focus of intense scientific study and conservation concern — particularly as deforestation driven by agriculture, logging, and infrastructure development has reduced tropical forest cover by an estimated 17 percent of the Amazon alone in the past five decades, with accelerating rates in other regions." },
    { label: "B", text: "The biological richness of tropical rainforests is sustained by a combination of favourable abiotic conditions and millions of years of evolutionary diversification. Near the equator, consistent solar radiation throughout the year enables continuous plant growth rather than the seasonally constrained growing season characteristic of temperate and boreal forests. High rainfall, typically between 2,000 and 4,000 millimetres annually, maintains the moisture levels essential for the dense, multi-layered forest structure. The combination of stability and productivity has allowed evolutionary processes to generate extraordinary species diversity over timescales that have not been available in regions repeatedly disrupted by glaciation." },
    { label: "C", text: "The structure of tropical rainforests is typically described in terms of vertical layers. The emergent layer consists of the tallest trees, rising to 60 metres or more, whose crowns project above the main canopy and are exposed to direct sunlight and wind. The canopy layer, at 30–45 metres, forms a dense, continuous roof of foliage that intercepts most of the incoming solar radiation, creating the characteristic dim, humid conditions of the forest interior. Below the canopy, the understorey contains smaller trees and tall shrubs adapted to low light conditions; at ground level, the forest floor receives minimal direct sunlight and supports relatively sparse vegetation but hosts an immense diversity of decomposers, fungi, and invertebrates processing the organic matter that falls from above." },
    { label: "D", text: "The ecological services provided by tropical rainforests extend far beyond their boundaries. They are among the most important carbon sinks on the planet: the Amazon basin alone stores an estimated 150 to 200 billion tonnes of carbon in its vegetation and soils, and healthy tropical forests absorb approximately 1.5 billion tonnes of CO₂ from the atmosphere annually. They regulate regional and global water cycles through a process called transpiration — the release of water vapour from vegetation — which generates rainfall not only within the forest itself but in agricultural regions hundreds or thousands of kilometres downwind through \"flying rivers\" of moisture-laden air. Rainforests also moderate local temperatures, protect watersheds from erosion and flooding, and provide the evolutionary raw material for pharmaceutical compounds, with a significant proportion of modern medicines having been derived from rainforest species." },
    { label: "E", text: "Forest degradation through selective logging, edge effects, and fragmentation compromises these ecological functions even without complete deforestation. Research has found that fragmented forest patches lose species at rates far exceeding what their reduced size would predict, as species that depend on large continuous territories — including many large mammals and birds — cannot persist in small isolated remnants. Edge effects — the penetration of hot, dry air from surrounding cleared land into the forest — alter microclimatic conditions in areas extending hundreds of metres from the forest boundary, reducing species diversity and increasing fire susceptibility even in nominally protected forest." },
    { label: "F", text: "Conservation strategies for tropical rainforests have evolved considerably over recent decades. Early approaches focused primarily on establishing protected areas — national parks and wildlife reserves — with restricted or forbidden human use. Experience has shown that protected areas alone are insufficient without addressing the economic pressures that drive deforestation, particularly for the rural and indigenous communities who live in and around forest areas. Payment for Ecosystem Services schemes, in which the communities and governments of forest-rich countries receive financial compensation for maintaining forest cover, have shown promise in some contexts. Programmes such as REDD+ (Reducing Emissions from Deforestation and Forest Degradation) attempt to channel international climate finance towards forest conservation by assigning an economic value to the carbon stored in standing forest." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "TRUE / FALSE / NOT GIVEN",
      questions: [
        { type: "tfng", number: 1, text: "Tropical rainforests occupy less than 6 percent of the Earth's land surface.", answer: "TRUE" },
        { type: "tfng", number: 2, text: "The Amazon rainforest has lost approximately 17 percent of its forest cover in the last 50 years.", answer: "TRUE" },
        { type: "tfng", number: 3, text: "Consistent solar radiation in equatorial regions allows tropical plants to grow throughout the year.", answer: "TRUE" },
        { type: "tfng", number: 4, text: "The canopy layer of the rainforest receives more direct sunlight than the emergent layer.", answer: "FALSE" },
        { type: "tfng", number: 5, text: "Forest fragmentation leads to species loss at rates greater than the size reduction alone would predict.", answer: "TRUE" },
        { type: "tfng", number: 6, text: "REDD+ programmes assign economic value to the carbon stored in standing forests.", answer: "TRUE" },
      ] as TFNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 10, text: "What role do \"flying rivers\" play in rainforest ecology?",
          options: [
            { letter: "A", text: "They describe the underground water channels that sustain root systems" },
            { letter: "B", text: "They carry moisture-laden air from the forest to bring rainfall to distant agricultural regions" },
            { letter: "C", text: "They refer to the flood dynamics of rivers that flow through forest areas" },
            { letter: "D", text: "They describe the canopy-level water transport systems of tall trees" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 11, text: "What does research show about the impact of edge effects on forest?",
          options: [
            { letter: "A", text: "Edge effects only affect the outermost trees in a forest fragment" },
            { letter: "B", text: "They alter microclimatic conditions extending hundreds of metres from the forest boundary" },
            { letter: "C", text: "Edge effects increase biodiversity by introducing new species from surrounding areas" },
            { letter: "D", text: "They are only significant in forests reduced to less than 100 hectares" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 12, text: "Why have protected areas alone proven insufficient for rainforest conservation?",
          options: [
            { letter: "A", text: "Protected areas are too expensive for developing countries to establish" },
            { letter: "B", text: "They fail to address the economic pressures driving deforestation for local communities" },
            { letter: "C", text: "National governments refuse to enforce their own protected area legislation" },
            { letter: "D", text: "Wildlife moves outside protected area boundaries into unprotected forest" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 13, text: "What is the estimated annual CO₂ absorption of healthy tropical forests?",
          options: [
            { letter: "A", text: "150 to 200 billion tonnes" },
            { letter: "B", text: "2,000 to 4,000 million tonnes" },
            { letter: "C", text: "Approximately 1.5 billion tonnes" },
            { letter: "D", text: "17 percent of annual global emissions" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set10Passage2: ReadingPassage = {
  id: 2,
  title: "Agile And Traditional Project Management",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Project management — the discipline of planning, executing, and controlling temporary undertakings to achieve specific objectives within defined constraints of time, cost, and quality — has undergone a fundamental methodological revolution over the past two decades. The dominance of sequential, plan-driven approaches epitomised by the Waterfall methodology has given way, at least in software development and knowledge-intensive industries, to iterative, adaptive approaches collectively described as Agile. The debate between these paradigms has generated extensive practitioner literature, a substantial body of empirical research, and competing certifications representing a multi-billion dollar training and consulting industry. At its heart, it is a debate about how to manage the inherent uncertainty and complexity of knowledge work." },
    { label: "B", text: "The Waterfall model, formalised by Winston Royce in a 1970 paper (in which Royce actually presented it as fundamentally flawed, a nuance frequently lost in subsequent accounts), organises project work into sequential phases: requirements, design, implementation, testing, and deployment. Each phase is completed before the next begins, and the baseline plan established at the project's outset is maintained as the guide for execution. This approach offers predictability, clear accountability, and ease of contractual definition — all valuable in contexts where requirements are genuinely stable and the technology is well understood. It was adapted from established engineering disciplines where these conditions frequently held." },
    { label: "C", text: "In software development, however, the assumption of stable requirements proved unrealistic. End users frequently did not know what they wanted until they saw a working system; technology capabilities changed faster than multi-year project plans could accommodate; market conditions shifted between project initiation and delivery. The consequence was a persistent pattern of large software projects delivering late, over budget, and with functionality that did not match user needs. The Standish Group's annual CHAOS reports, tracking large IT project outcomes from the 1990s onwards, repeatedly found that the majority of large projects experienced significant cost and schedule overruns, and a substantial minority were cancelled before completion." },
    { label: "D", text: "The Agile Manifesto, signed in 2001 by seventeen software development practitioners, articulated a set of values and principles that represented a direct response to these failures. Agile methods — including Scrum, Extreme Programming (XP), and Kanban — share a commitment to iterative delivery in short cycles (typically two to four weeks, called sprints in Scrum), continuous collaboration with end users, small self-organising teams, responsiveness to changing requirements, and working software over comprehensive documentation. Rather than planning in detail at the outset, Agile teams plan incrementally, using empirical feedback from each iteration to inform subsequent planning. This approach accepts uncertainty as inherent rather than attempting to eliminate it through upfront planning." },
    { label: "E", text: "The adoption of Agile beyond software development — into marketing, HR, product development, and even hardware engineering — has been substantial but contested. The underlying philosophy of Agile — short feedback cycles, iterative improvement, and adaptive planning — is applicable in principle to many kinds of work. However, contexts characterised by high regulatory requirements, large physical production runs, or interdependencies with non-Agile organisations present implementation challenges that pure Agile frameworks are poorly designed to address. Scaled Agile frameworks, including SAFe (Scaled Agile Framework) and LeSS (Large-Scale Scrum), have attempted to extend Agile principles to large, complex, multi-team programmes, with mixed results documented in both practitioner and academic literature." },
    { label: "F", text: "Project management research consistently finds that neither Agile nor traditional methods are universally superior; the appropriate choice depends on the characteristics of the project, including the stability of requirements, the degree of technical novelty, the size and distribution of the team, the regulatory environment, and the client's capacity and willingness to engage in ongoing collaboration. Hybrid approaches — combining Agile's iterative development cycles with the planning, governance, and reporting structures of traditional project management — are becoming increasingly prevalent, reflecting the pragmatic recognition that most real-world projects involve both areas of uncertainty requiring adaptive approaches and areas of stability amenable to plan-driven execution." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 14, text: "The writer claims that Waterfall methodology was originally presented as fundamentally flawed by its author.", answer: "YES" },
        { type: "ynng", number: 15, text: "The writer implies that Waterfall is an appropriate methodology for projects with stable requirements and well-understood technology.", answer: "YES" },
        { type: "ynng", number: 16, text: "The CHAOS reports found that the majority of large IT projects were completed on time and within budget.", answer: "NO" },
        { type: "ynng", number: 17, text: "The Agile Manifesto was signed by software practitioners in response to persistent software project failures.", answer: "YES" },
        { type: "ynng", number: 18, text: "The writer argues that Agile methodology should replace traditional project management in all industries.", answer: "NO" },
        { type: "ynng", number: 19, text: "The writer acknowledges that neither Agile nor traditional methods are universally superior.", answer: "YES" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "SENTENCE COMPLETION",
      questions: [
        {
          type: "sentence_completion", number: 20,
          prefix: "In Scrum, iterative development cycles of two to four weeks are called", suffix: ".",
          answer: "sprints", acceptableAnswers: ["sprints"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 21,
          prefix: "Agile methods accept uncertainty as", suffix: "to the work rather than attempting to eliminate it through planning.",
          answer: "inherent", acceptableAnswers: ["inherent"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 22,
          prefix: "SAFe and LeSS are described as", suffix: "Agile frameworks designed for large, multi-team programmes.",
          answer: "scaled", acceptableAnswers: ["scaled"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 23,
          prefix: "Hybrid project management approaches combine Agile's iterative cycles with the", suffix: "structures of traditional methods.",
          answer: "governance / planning", acceptableAnswers: ["governance / planning"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 24, text: "What was a major cause of large software project failures under Waterfall methodology?",
          options: [
            { letter: "A", text: "The method required too many separate teams working simultaneously" },
            { letter: "B", text: "Requirements were assumed to be stable but frequently changed during development" },
            { letter: "C", text: "Waterfall was designed for hardware engineering and never adapted for software" },
            { letter: "D", text: "The method generated too much documentation for teams to manage effectively" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 25, text: "What values did the Agile Manifesto prioritise, according to the passage?",
          options: [
            { letter: "A", text: "Comprehensive documentation and formal project plans" },
            { letter: "B", text: "Single large deliveries at the end of lengthy development cycles" },
            { letter: "C", text: "Working software, user collaboration, and responsiveness to change" },
            { letter: "D", text: "Predictability, clear contracts, and stable requirements" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 26, text: "What challenge does the passage identify for applying Agile in non-software contexts?",
          options: [
            { letter: "A", text: "Agile practitioners refuse to work in non-technology industries" },
            { letter: "B", text: "Agile teams are always too small for large physical production projects" },
            { letter: "C", text: "High regulatory requirements and physical production interdependencies create implementation challenges" },
            { letter: "D", text: "Agile methods produce lower quality outcomes than traditional methods in regulated industries" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set10Passage3: ReadingPassage = {
  id: 3,
  title: "Behavioural Genetics: Genes, Environment, And Human Traits",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "**Paragraph A** Behavioural genetics — the scientific discipline that investigates the relative contributions of genetic and environmental factors to variation in human psychological traits and behaviours — has generated findings of enormous scientific importance and considerable public controversy over its century-long history. By comparing the resemblance of identical twins (who share essentially all their DNA) to that of fraternal twins (who share approximately half their genetic material on average), and by comparing biological and adoptive family resemblances, behavioural geneticists have developed powerful methods for estimating the heritability of complex traits — the proportion of variation in a trait that is attributable to genetic differences between individuals in a particular population at a particular time." },
    { label: "B", text: "**Paragraph B** The \"three laws of behavioural genetics,\" proposed by Eric Turkheimer in 2000, represent a pithy summary of the most robust empirical findings in the field. The first law states that all human psychological traits show significant heritability — no behavioural trait has been found to be completely uninfluenced by genetics. The second law states that the effect of being raised in the same family is smaller than the effect of genes — shared family environment explains less of the variation in most psychological traits than do genetic differences. The third law states that a substantial portion of the variation in complex traits is not explained by either genes or shared family environment — what geneticists call \"non-shared environment\" — the unique experiences of individuals that are not shared even with their siblings in the same family." },
    { label: "C", text: "**Paragraph C** The finding that shared family environment has smaller effects than expected has been one of the most counter-intuitive and controversial in all of behavioural genetics. Common intuition holds that parenting style, family socioeconomic status, and the cultural environment of the home should be powerful determinants of children's psychological development. Decades of twin and adoption studies have found that, for most personality traits, cognitive abilities, and psychopathology measures, the resemblance of adoptive siblings — unrelated individuals raised in the same home — is approximately zero in adulthood. This finding suggests that being raised in the same home does not, in itself, produce psychological similarity. The interpretation of this finding remains contested: some researchers argue it demonstrates the limits of parental influence on personality; others argue that shared environment effects are poorly measured in current study designs or that they manifest on specific outcomes not captured in standard trait measures." },
    { label: "D", text: "**Paragraph D** Molecular genetics has transformed behavioural genetics since the 2000s. Genome-Wide Association Studies (GWAS) — which scan the entire genome of large samples of individuals looking for genetic variants associated with specific traits — have found that complex psychological traits are influenced by thousands of genetic variants, each of individually tiny effect. Intelligence, for example, has been found to be associated with thousands of common genetic variants, none of which individually explains more than a fraction of a percent of variance. The additive effects of all identified variants can be combined into a polygenic score, which predicts a moderate proportion of population variance in the trait but remains far from deterministic at the individual level." },
    { label: "E", text: "**Paragraph E** Gene-environment interaction — the phenomenon in which genetic variants have different effects in different environments — has emerged as an important complexity beyond simple heritability estimates. A classic demonstration involves the genetic disorder phenylketonuria (PKU): individuals who carry the PKU gene variant will develop severe intellectual disability if they consume phenylalanine in their diet, but are unaffected if identified at birth and placed on a phenylalanine-restricted diet. This case illustrates a more general principle: genetic predispositions are not fixed destinies but potentials that interact with specific environmental conditions. Similarly, research has found that some genetic variants associated with increased risk of depression have their effects substantially amplified by childhood adversity, demonstrating that genetic risk is not independent of the social conditions in which development occurs." },
    { label: "F", text: "**Paragraph F** The ethical and political implications of behavioural genetics have been contested throughout its history, shaped by its association with eugenic movements of the early twentieth century that sought to improve human populations by restricting reproduction of those deemed genetically inferior — a project that produced profound harms, most infamously in Nazi Germany. Contemporary behavioural genetics maintains a firm methodological distinction between descriptive heritability estimates and normative prescriptions about what policies should be pursued: the demonstration that a trait is heritable does not imply that it is fixed, that it is desirable or undesirable, or that any social policy regarding it is justified. Maintaining this distinction requires ongoing vigilance, as misapplications of genetic findings in public discourse — biological determinism, genetic essentialism, and attempts to use polygenic scores for consequential social decisions — continue to occur." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "Match the correct heading (i–viii) to paragraphs A–F.",
      headingOptions: [
        "I. The ethical legacy of genetic research and the risks of misapplication",
        "II. The surprising finding that growing up in the same home has limited effects on personality similarity",
        "III. How genetic research methods use twin comparisons to estimate the role of genes",
        "IV. How genetic variants combine with environmental conditions rather than operating independently",
        "V. Three empirical generalisations that summarise robust findings in the field",
        "VI. Why polygenic scores can predict traits at the population level but not the individual level",
        "VII. The discovery of thousands of tiny genetic effects on complex psychological traits",
        "VIII. Why identical twins always develop identical personalities and traits",
      ],
      questions: [
        { type: "matching_heading", number: 27, paragraph: "A", answer: "III" },
        { type: "matching_heading", number: 28, paragraph: "B", answer: "V" },
        { type: "matching_heading", number: 29, paragraph: "C", answer: "II" },
        { type: "matching_heading", number: 30, paragraph: "D", answer: "VII" },
        { type: "matching_heading", number: 31, paragraph: "E", answer: "IV" },
        { type: "matching_heading", number: 32, paragraph: "F", answer: "I" },
      ] as MatchingHeadingQuestion[],
    },
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 33, text: "The writer states that no psychological trait studied so far has been found to be completely uninfluenced by genes.", answer: "YES" },
        { type: "ynng", number: 34, text: "The writer implies that adoptive siblings raised in the same home develop highly similar adult personalities.", answer: "NO" },
        { type: "ynng", number: 35, text: "The writer claims that polygenic scores can fully predict intelligence at the individual level.", answer: "NO" },
        { type: "ynng", number: 36, text: "The PKU example demonstrates that genetic predispositions can be significantly modified by environmental conditions.", answer: "YES" },
        { type: "ynng", number: 37, text: "The writer argues that high heritability of a trait justifies social policies restricting reproduction.", answer: "NO" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 38, text: "What does the second of Turkheimer's three laws state?",
          options: [
            { letter: "A", text: "All psychological traits show significant heritability" },
            { letter: "B", text: "Genes explain more variance in psychological traits than shared family environment does" },
            { letter: "C", text: "Non-shared environment accounts for more variance than shared environment and genes combined" },
            { letter: "D", text: "Shared family environment is the most powerful predictor of adult personality" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 39, text: "What have GWAS studies found about the genetics of complex psychological traits?",
          options: [
            { letter: "A", text: "A single major gene explains most variance in traits like intelligence" },
            { letter: "B", text: "Psychological traits are influenced by thousands of variants each with a tiny individual effect" },
            { letter: "C", text: "Genetic variants only influence psychological traits in combination with early childhood trauma" },
            { letter: "D", text: "Most complex traits are not significantly heritable according to molecular genetics" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 40, text: "What methodological distinction does the passage say contemporary behavioural genetics maintains?",
          options: [
            { letter: "A", text: "The distinction between intelligence and personality as separate genetic constructs" },
            { letter: "B", text: "The distinction between descriptive findings about heritability and normative prescriptions about policy" },
            { letter: "C", text: "The distinction between genetic effects in childhood and genetic effects in adulthood" },
            { letter: "D", text: "The distinction between shared and non-shared environmental effects" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

export const testSet10Passages: ReadingPassage[] = [
  set10Passage1,
  set10Passage2,
  set10Passage3,
];

// ══════════════ TEST SET 11 ══════════════
const set11Passage1: ReadingPassage = {
  id: 1,
  title: "The Development Of Writing Systems",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Writing — the systematic visual representation of language — is one of the most consequential technological innovations in human history. Unlike spoken language, which has existed for at least several hundred thousand years, writing is comparatively recent: the oldest confirmed writing systems date from approximately 5,000 years ago, emerging independently in at least two and possibly four different locations. The development of writing transformed human society by enabling communication across distance and time, supporting the administrative complexity of early states, preserving knowledge beyond the limits of individual memory, and creating the conditions for the cumulative intellectual progress that literacy and literature make possible." },
    { label: "B", text: "The oldest confirmed writing system is Sumerian cuneiform, which emerged in Mesopotamia (modern-day Iraq) around 3400–3200 BCE. Cuneiform began as a system for recording commercial transactions — tracking the allocation of grain, livestock, and goods in the complex redistributive economies of Sumerian city-states. Early cuneiform signs were pictographic, representing objects through simplified pictures, but the system evolved rapidly towards a more abstract representation based on wedge-shaped marks impressed into clay tablets with a stylus made from a reed. By the third millennium BCE, cuneiform had developed the capacity to represent the full grammar and vocabulary of the Sumerian language, and was subsequently adapted to write Akkadian, Babylonian, Assyrian, Hittite, and several other languages of the ancient Near East." },
    { label: "C", text: "Egyptian hieroglyphics, which developed around the same period as cuneiform though probably independently, represent a different solution to the challenges of writing. The hieroglyphic system combined logograms (signs representing whole words or morphemes), phonograms (signs representing sounds), and determinatives (signs that indicated the semantic category of a word without representing any sound). This complex mixed system, typically inscribed on stone monuments, papyrus, and wooden tablets, was used continuously for over 3,500 years. The knowledge of how to read hieroglyphics was lost after the closure of the last pagan temples in the fourth century CE and was only recovered in the nineteenth century following the decipherment of the Rosetta Stone — a bilingual inscription in hieroglyphics and Greek — by Jean-François Champollion in 1822." },
    { label: "D", text: "The earliest form of Chinese writing, found inscribed on oracle bones and tortoise shells used in Shang dynasty divination practices around 1200 BCE, shares broad structural features with modern Chinese characters but differs substantially in the specific forms of most signs. The Chinese writing system is unique among major world writing systems in having maintained a continuous tradition of use over approximately 3,000 years, and in having spread to influence the writing systems of Japanese, Korean, and Vietnamese without those languages being related to Chinese." },
    { label: "E", text: "The Phoenician alphabet, developed around 1050 BCE, was a radical simplification of earlier Semitic consonantal writing systems and became one of the most historically significant innovations in writing history. By representing only consonants (with no signs for vowel sounds), the Phoenician script reduced the number of signs required to write a language from hundreds (as in syllabic systems) to approximately 22 — a simplification that made writing far more learnable and accessible than earlier systems. The Phoenician alphabet was adapted by the Greeks, who added vowel signs to create a truly phonemic alphabet, and then transmitted to Rome, ultimately producing the Latin script from which most European writing systems descend." },
    { label: "F", text: "The history of writing reveals both the diversity of human approaches to representing language and the contingent, historically specific conditions under which literacy has been distributed within societies. In most pre-industrial civilisations, literacy was a restricted, specialist skill confined to professional scribes, administrators, priests, and elites. The democratisation of literacy — its extension to broad populations — was a gradual process driven by the spread of more learnable writing systems, cheaper writing materials (paper replacing clay and stone), and eventually the printing press and compulsory public education." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "TRUE / FALSE / NOT GIVEN",
      questions: [
        { type: "tfng", number: 1, text: "Writing systems emerged independently in at least two different locations around 5,000 years ago.", answer: "TRUE" },
        { type: "tfng", number: 2, text: "Early Sumerian cuneiform was originally developed to record poetry and religious texts.", answer: "FALSE" },
        { type: "tfng", number: 3, text: "The Egyptian hieroglyphic system used only phonograms and contained no logograms.", answer: "FALSE" },
        { type: "tfng", number: 4, text: "Knowledge of how to read hieroglyphics was lost after the fourth century CE and rediscovered in the nineteenth century.", answer: "TRUE" },
        { type: "tfng", number: 5, text: "The Chinese writing system has been in continuous use for approximately 3,000 years.", answer: "TRUE" },
        { type: "tfng", number: 6, text: "The Phoenician alphabet included signs for both consonants and vowels.", answer: "FALSE" },
      ] as TFNGQuestion[],
    },
    {
      instructions: "SENTENCE COMPLETION",
      questions: [
        {
          type: "sentence_completion", number: 7,
          prefix: "Cuneiform signs were made by pressing a", suffix: "made from a reed into clay tablets.",
          answer: "stylus", acceptableAnswers: ["stylus"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 8,
          prefix: "Jean-François Champollion deciphered hieroglyphics using a", suffix: "inscription in both hieroglyphics and Greek.",
          answer: "bilingual", acceptableAnswers: ["bilingual"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 9,
          prefix: "The Chinese writing system influenced the writing systems of", suffix: ", Korean, and Vietnamese.",
          answer: "Japanese", acceptableAnswers: ["Japanese"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 10,
          prefix: "The Greeks adapted the Phoenician alphabet by adding", suffix: "signs, creating a fully phonemic alphabet.",
          answer: "vowel", acceptableAnswers: ["vowel"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 11, text: "What made the Phoenician alphabet easier to learn than earlier writing systems?",
          options: [
            { letter: "A", text: "It used pictures rather than abstract symbols" },
            { letter: "B", text: "It was developed specifically for commercial use" },
            { letter: "C", text: "It reduced the number of required signs from hundreds to approximately 22" },
            { letter: "D", text: "It was the first system to represent the full vocabulary of a language" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 12, text: "How did cuneiform develop over time?",
          options: [
            { letter: "A", text: "It became increasingly pictographic as more objects needed to be represented" },
            { letter: "B", text: "It evolved from pictographic to abstract wedge-shaped marks representing sounds and grammar" },
            { letter: "C", text: "It was gradually replaced by the Phoenician alphabet in Mesopotamia" },
            { letter: "D", text: "It remained unchanged from its original form throughout its history of use" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 13, text: "According to the passage, what drove the democratisation of literacy in human societies?",
          options: [
            { letter: "A", text: "Government decisions to make education free for all citizens" },
            { letter: "B", text: "The development of the printing press alone" },
            { letter: "C", text: "More learnable writing systems, cheaper materials, and eventually mass education" },
            { letter: "D", text: "The simplification of languages to match available writing systems" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set11Passage2: ReadingPassage = {
  id: 2,
  title: "Entrepreneurship, Innovation, And Economic Growth",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Entrepreneurship — the process of creating new value through the identification of market opportunities, the mobilisation of resources, and the assumption of risk — has been recognised by economists as a central driver of innovation and economic growth since at least the eighteenth century. Richard Cantillon, often credited as the first systematic economist, identified the entrepreneur as a key economic actor who bears the uncertainty of market transactions. Joseph Schumpeter, in the twentieth century, gave the concept its most influential formulation, arguing that entrepreneurs are the engine of economic change through \"creative destruction\" — the continuous process by which innovation displaces existing products, services, and technologies, freeing resources for new combinations." },
    { label: "B", text: "Schumpeter distinguished between two models of innovation: entrepreneurial innovation, driven by individual visionaries who introduce radical new products or processes that disrupt existing industries; and large-firm innovation, in which established corporations use their scale, R&D budgets, and market position to generate incremental improvements to existing technologies. In his early work, Schumpeter emphasised individual entrepreneurship; in his later work, observing the growing dominance of large corporations in the twentieth-century economy, he suggested that systematic corporate R&D might be replacing heroic individual entrepreneurship as the primary engine of innovation. This tension — between the agility and disruptive potential of new ventures and the resources and systematic capabilities of established firms — remains a central theme in contemporary innovation research." },
    { label: "C", text: "The innovation ecosystem — the network of actors, institutions, resources, and interactions that collectively support entrepreneurial activity in a given location — has become an increasingly important unit of analysis. Silicon Valley remains the most studied and most emulated innovation ecosystem in the world, combining an unusually dense concentration of venture capital, world-class research universities (particularly Stanford and UC Berkeley), established technology firms providing experienced talent and spin-off activity, a culture that normalises and even celebrates entrepreneurial risk-taking and failure, and an international talent pipeline attracted by reputation and opportunity. Research has found that these ecosystem factors are mutually reinforcing: venture capital flows toward proven ecosystems, which attracts talent, which generates new startups, which either succeed and become anchors for further activity or fail and release experienced people to found new ventures." },
    { label: "D", text: "Not all entrepreneurship is innovative in the Schumpeterian sense. Research distinguishes between high-growth entrepreneurship — new ventures that introduce genuine novelty, scale rapidly, and generate significant employment and economic value — and necessity entrepreneurship — self-employment or micro-business activity undertaken because formal employment alternatives are unavailable. In many developing economies, the majority of entrepreneurial activity is of the necessity variety: small traders, street vendors, and informal service providers whose activities reflect labour market failure rather than innovation-driven opportunity. The conflation of these very different types of entrepreneurial activity in policy discourse — in which promoting \"entrepreneurship\" is presented as a universal solution to unemployment and economic stagnation — often obscures more than it reveals." },
    { label: "E", text: "Social entrepreneurship — the application of entrepreneurial methods to the pursuit of social or environmental objectives rather than commercial profit — has attracted growing attention in both practice and research. Social enterprises, including cooperatives, community interest companies, and benefit corporations, attempt to generate social value while maintaining financial sustainability. Research on social enterprise performance has found that the dual mission — balancing social impact with financial viability — creates distinctive governance and management challenges, as organisations must navigate the potential tensions between commercial imperatives and social mission without drifting towards either pure charity or pure commercial behaviour." },
    { label: "F", text: "The relationship between entrepreneurship and inequality is complex. Schumpeter's creative destruction creates both new opportunities and significant disruption — the wealth generated by successful innovation is highly concentrated among founders and early investors, while the employees and communities whose livelihoods depend on disrupted industries may face painful transitions. Policy interventions designed to spread the benefits of entrepreneurial dynamism more widely — through education, access to capital for under-represented groups, social safety nets that enable risk-taking, and active management of industrial transitions — remain essential if the efficiency gains from innovation are to be accompanied by broadly shared prosperity." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 14, text: "The writer implies that Schumpeter's later work suggested large corporations might be replacing individual entrepreneurs as the main source of innovation.", answer: "YES" },
        { type: "ynng", number: 15, text: "Silicon Valley's success is described as dependent primarily on its geographic location near the Pacific Ocean.", answer: "NO" },
        { type: "ynng", number: 16, text: "The writer suggests that necessity entrepreneurship in developing economies reflects innovation-driven opportunity.", answer: "NO" },
        { type: "ynng", number: 17, text: "The writer argues that social enterprises face governance challenges arising from their dual mission.", answer: "YES" },
        { type: "ynng", number: 18, text: "The writer claims that the benefits of entrepreneurial innovation are always distributed equally across society.", answer: "NO" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 23, text: "What was Richard Cantillon's contribution to entrepreneurship theory?",
          options: [
            { letter: "A", text: "He identified entrepreneurs as the primary cause of economic inequality" },
            { letter: "B", text: "He identified entrepreneurs as economic actors who bear market uncertainty" },
            { letter: "C", text: "He argued that corporate R&D was more important than individual entrepreneurship" },
            { letter: "D", text: "He developed the theory of creative destruction" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 24, text: "What does the passage say distinguishes high-growth entrepreneurship from necessity entrepreneurship?",
          options: [
            { letter: "A", text: "High-growth entrepreneurs always have university qualifications" },
            { letter: "B", text: "Necessity entrepreneurs receive more government support" },
            { letter: "C", text: "High-growth ventures introduce genuine novelty and scale significantly" },
            { letter: "D", text: "Only high-growth entrepreneurs create any economic value" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 25, text: "According to the passage, what makes Silicon Valley's ecosystem self-reinforcing?",
          options: [
            { letter: "A", text: "Government subsidies that reduce the risk of venture capital investment" },
            { letter: "B", text: "The valley's position on an international time zone boundary" },
            { letter: "C", text: "Mutual reinforcement among capital, talent, startups, and the activity generated by both successes and failures" },
            { letter: "D", text: "The concentration of major technology companies that prevent new entrants from competing" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 26, text: "What does the passage suggest is needed to ensure entrepreneurial dynamism benefits society broadly?",
          options: [
            { letter: "A", text: "Eliminating all regulation of new business formation" },
            { letter: "B", text: "Restricting the profits that individual founders can earn" },
            { letter: "C", text: "Policies including education, access to capital, social safety nets, and active transition management" },
            { letter: "D", text: "Moving innovation ecosystems from expensive cities to lower-cost regions" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set11Passage3: ReadingPassage = {
  id: 3,
  title: "Urban Agriculture And Food System Resilience",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "**Paragraph A** Urban agriculture — the cultivation of food within cities and their immediate peripheries — is not a new phenomenon. Throughout history, cities have commonly incorporated market gardens, livestock keeping, and food cultivation within and around their boundaries, and the romanticised notion of the city as a purely consumer of rural food production is largely a product of the industrial era. What is new, however, is the scale of contemporary interest in urban food production as a response to food security concerns, environmental sustainability imperatives, and the perceived social and health benefits of reconnecting urban populations with the production of their food. From community allotments in European cities to vertical farming operations in Singapore and aquaponic systems in urban warehouses, a diverse and rapidly expanding range of urban food production practices is attracting significant investment, policy attention, and research." },
    { label: "B", text: "**Paragraph B** The most commonly cited rationale for urban agriculture in industrialised countries relates to food system resilience — the capacity of food systems to absorb and recover from disruptions. Conventional food supply chains for major cities are characterised by significant geographical concentration of production, long and complex logistics chains, heavy dependence on fossil fuel-intensive transportation, and vulnerability to disruptions including extreme weather events, fuel price shocks, and global supply chain crises of the kind experienced during the COVID-19 pandemic. Urban and peri-urban food production reduces these dependencies by bringing at least a portion of food production closer to consumption, though the extent to which urban production can meaningfully substitute for rural production at scale remains contested." },
    { label: "C", text: "**Paragraph C** Vertical farming — indoor production systems using hydroponic or aeroponic growing techniques, artificial lighting, climate control, and stacked growing layers to maximise yield per unit of land area — has attracted substantial private investment as a putative solution to food production challenges. Proponents emphasise dramatically higher yields per land area compared to conventional agriculture, elimination of weather variability, massive reductions in water use (typically 90 to 95 percent compared to field cultivation), and freedom from pesticide use. The technology is particularly suited to high-value, short-shelf-life crops including leafy greens, herbs, and strawberries that are expensive to transport, prone to spoilage, and responsive to precise environmental control." },
    { label: "D", text: "**Paragraph D** Critics of vertical farming point to its current economic and energetic limitations. The electricity required for artificial lighting and climate control is substantial — accounting for 25 to 30 percent of production costs in most operations — and offsets much of the environmental benefit if that electricity is generated from fossil fuel sources. The economics of vertical farming have been challenging: several high-profile vertical farming companies including AeroFarms and AppHarvest filed for bankruptcy in 2023, reflecting the difficulty of competing with field-grown produce on price at anything other than premium market segments. Advocates respond that capital costs are declining rapidly, that renewable energy is making the electricity equation increasingly favourable, and that the true price of conventional agriculture does not reflect its environmental externalities." },
    { label: "E", text: "**Paragraph E** Aquaponics — the integration of fish aquaculture with hydroponic plant cultivation in a recirculating water system — represents an approach to urban food production with a compelling ecological logic. Nutrient-rich water from fish tanks fertilises plant growth; plants extract the nutrients, cleaning the water, which is then returned to the fish tanks. This closed-loop system dramatically reduces water use and eliminates the need for synthetic fertilisers, while producing both plant and animal protein from the same system. Urban aquaponic installations range from small community systems in former industrial buildings to substantial commercial operations producing significant quantities of fish and vegetables. The main barriers to wider adoption include high capital costs, technical complexity, and the regulatory frameworks governing fish production and food safety that were designed for conventional aquaculture operations." },
    { label: "F", text: "**Paragraph F** The most thoroughly documented benefits of urban agriculture may be social and health-related rather than purely economic or logistical. Research on community gardens and urban growing programmes consistently finds positive associations with mental health, physical activity, community cohesion, and dietary quality — particularly among participants from low-income communities with limited access to fresh produce. Food desert communities — urban areas characterised by poor access to affordable fresh food — have been the target of several urban agriculture interventions, with evidence suggesting that community-level food production can meaningfully improve both food access and community agency. These social benefits may in fact provide the strongest justification for public support of urban agriculture, even if its contribution to aggregate urban food supply remains modest." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "MATCHING INFORMATION",
      questions: [
        { type: "matching_paragraph", number: 27, text: "Evidence that the social and health benefits of urban farming may be its most well-documented advantage", answer: "F" },
        { type: "matching_paragraph", number: 28, text: "A description of an approach combining fish farming and plant cultivation in a shared water system", answer: "E" },
        { type: "matching_paragraph", number: 29, text: "An argument that resilience against supply chain disruption is a primary rationale for urban food production", answer: "B" },
        { type: "matching_paragraph", number: 30, text: "The observation that cities have historically contained food production, which is not a purely modern development", answer: "A" },
        { type: "matching_paragraph", number: 31, text: "A list of the specific crop types most suited to vertical farming technology", answer: "C" },
        { type: "matching_paragraph", number: 32, text: "Financial difficulties experienced by major vertical farming companies", answer: "D" },
        { type: "matching_paragraph", number: 33, text: "Barriers preventing the wider adoption of one specific urban food production system", answer: "E" },
      ] as MatchingParagraphQuestion[],
    },
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 34, text: "The writer implies that food supply chains for major cities are currently highly vulnerable to disruption.", answer: "YES" },
        { type: "ynng", number: 35, text: "Vertical farming uses approximately 90 to 95 percent less water than conventional field cultivation.", answer: "YES" },
        { type: "ynng", number: 36, text: "The writer argues that vertical farming is currently economically competitive with conventional field agriculture for most crops.", answer: "NO" },
        { type: "ynng", number: 37, text: "Aquaponic systems eliminate the need for synthetic fertilisers by using fish waste to nourish plants.", answer: "YES" },
        { type: "ynng", number: 38, text: "The writer suggests that the most compelling case for public support of urban agriculture rests on economic productivity.", answer: "NO" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 39, text: "What does the passage say about the environmental benefits of vertical farming?",
          options: [
            { letter: "A", text: "They are completely undermined by the use of pesticides in indoor environments" },
            { letter: "B", text: "They may be offset if the electricity required is generated from fossil fuels" },
            { letter: "C", text: "They are greater than those of any other form of agriculture" },
            { letter: "D", text: "They have been fully quantified and proven to exceed conventional agriculture" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 40, text: "According to the passage, what does research on community gardens suggest?",
          options: [
            { letter: "A", text: "Community gardens can replace supermarkets as the primary source of food for urban residents" },
            { letter: "B", text: "Gardens are only effective in communities that already have good access to fresh food" },
            { letter: "C", text: "Gardens are associated with positive outcomes for mental health, community cohesion, and diet quality" },
            { letter: "D", text: "The economic value of community gardens consistently exceeds their social benefits" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

export const testSet11Passages: ReadingPassage[] = [
  set11Passage1,
  set11Passage2,
  set11Passage3,
];

// ══════════════ TEST SET 12 ══════════════
const set12Passage1: ReadingPassage = {
  id: 1,
  title: "Tides, Lunar Cycles, And Coastal Ecosystems",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Tides — the periodic rise and fall of sea levels caused primarily by the gravitational pull of the Moon and, to a lesser extent, the Sun — are among the most regular and predictable phenomena in the natural world. Their effects extend far beyond the twice-daily exposure and inundation of coastal zones: tides drive nutrient mixing in coastal waters, maintain the ecological conditions of intertidal habitats, influence the breeding cycles of many marine and coastal species, and generate energy that human civilisations are increasingly seeking to harness." },
    { label: "B", text: "The mechanism of tidal generation is rooted in differential gravitational attraction. The Moon's gravity pulls more strongly on the side of the Earth facing the Moon than on the far side, creating a bulge of elevated sea level on the near side. Simultaneously, inertial effects produce a corresponding bulge on the far side. As the Earth rotates beneath these two bulges, coastal locations experience two high tides and two low tides in approximately 24 hours and 50 minutes — slightly longer than a day because the Moon is also orbiting the Earth, requiring each point to \"catch up\" to the Moon's new position. The Sun's gravitational influence, though much greater in absolute terms, is diluted by its greater distance and produces tidal effects approximately 46 percent as strong as the Moon's." },
    { label: "C", text: "Tidal range — the vertical difference between high and low tide — varies enormously by location, from less than half a metre in enclosed seas such as the Mediterranean and Baltic, to over 16 metres in the Bay of Fundy in Nova Scotia, Canada, which holds the record for the world's highest tidal range. This variation is explained by a combination of the natural resonance frequency of different water bodies, the geometry of coastlines and sea floors, and the degree to which standing waves in ocean basins amplify or diminish tidal oscillations. The Bay of Fundy's exceptional range reflects a near-perfect match between the natural resonance frequency of the bay and the period of the tidal forcing — a phenomenon analogous to pushing a child's swing at its natural frequency." },
    { label: "D", text: "Spring tides — which occur at new moon and full moon when the Sun, Moon, and Earth are approximately aligned — produce the highest high tides and lowest low tides of each lunar cycle, as the gravitational influences of Moon and Sun act in combination. Neap tides, occurring at the quarter moon phases when the Sun and Moon are approximately at right angles to each other, produce smaller tidal ranges as the gravitational influences partially cancel. This two-week cycle of spring and neap tides overlays the daily tidal cycle to produce the complex tidal patterns observed at any given location." },
    { label: "E", text: "Intertidal zones — the areas of coastline exposed at low tide and submerged at high tide — are among the most biologically productive and ecologically demanding environments on Earth. Organisms living in these zones must tolerate extreme fluctuations in temperature, salinity, desiccation, and wave exposure across the tidal cycle. The zonation of intertidal communities — in which different species occupy distinct horizontal bands at different heights on the shore, reflecting their different tolerances of exposure — is one of the most striking patterns in ecology. Many intertidal species time reproductive and feeding activities to the tidal cycle with extraordinary precision; the grunion, a small fish of the California coast, spawns at the highest point of spring tides, burying its eggs in sand that will not be disturbed until the next spring tide two weeks later." },
    { label: "F", text: "Tidal energy — the extraction of electricity from the kinetic or potential energy of tidal flows — represents a renewable energy resource with predictable, reliable output characteristics that distinguish it from the intermittent generation profiles of wind and solar power. Tidal barrages, which trap water at high tide and release it through turbines as the tide falls, have been operated since 1966 at La Rance in France. More recent tidal stream generators, which extract energy from the kinetic energy of flowing tidal currents without impounding water, offer smaller ecological footprints and are being deployed at increasing scale in high-current locations including the Pentland Firth between Scotland and the Orkney Islands." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "TRUE / FALSE / NOT GIVEN",
      questions: [
        { type: "tfng", number: 1, text: "The Sun's tidal effect on the Earth is approximately 46 percent as strong as the Moon's.", answer: "TRUE" },
        { type: "tfng", number: 2, text: "The Mediterranean Sea has one of the highest tidal ranges of any body of water.", answer: "FALSE" },
        { type: "tfng", number: 3, text: "The Bay of Fundy's exceptional tidal range is explained by the resonance between the bay's natural frequency and tidal forcing.", answer: "TRUE" },
        { type: "tfng", number: 4, text: "Spring tides occur when the Moon is in its quarter phases.", answer: "FALSE" },
        { type: "tfng", number: 5, text: "The grunion spawns at the highest point of spring tides so that its eggs will not be disturbed for two weeks.", answer: "TRUE" },
        { type: "tfng", number: 6, text: "Tidal barrages produce less reliable electricity generation than wind and solar power.", answer: "FALSE" },
      ] as TFNGQuestion[],
    },
    {
      instructions: "SENTENCE COMPLETION",
      questions: [
        {
          type: "sentence_completion", number: 7,
          prefix: "Each coastal location experiences two high tides every 24 hours and", suffix: "minutes because the Moon is also orbiting the Earth.",
          answer: "50", acceptableAnswers: ["50"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 8,
          prefix: "The Bay of Fundy in Nova Scotia, Canada has a tidal range exceeding", suffix: "metres.",
          answer: "16", acceptableAnswers: ["16"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 9,
          prefix: "The biological bands of different species at different heights on a shore are known as the", suffix: "of intertidal communities.",
          answer: "zonation", acceptableAnswers: ["zonation"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 10,
          prefix: "Tidal stream generators extract energy from", suffix: "tidal currents without impounding water.",
          answer: "kinetic / flowing", acceptableAnswers: ["kinetic / flowing"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 11, text: "Why do two tidal bulges occur simultaneously on opposite sides of the Earth?",
          options: [
            { letter: "A", text: "The Moon's gravity creates a bulge on the near side while the Sun creates one on the far side" },
            { letter: "B", text: "The Moon creates a near-side bulge through gravity while inertial effects create a far-side bulge" },
            { letter: "C", text: "The Earth's rotation creates bulges at both poles simultaneously" },
            { letter: "D", text: "Two tidal bulges occur because the Moon completes two orbits per day" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 12, text: "What happens during neap tides?",
          options: [
            { letter: "A", text: "The Moon and Sun align to produce the highest possible tidal range" },
            { letter: "B", text: "The Moon and Sun are at right angles, producing smaller tidal ranges" },
            { letter: "C", text: "The Moon's gravity is temporarily reduced due to its distance from Earth" },
            { letter: "D", text: "Tidal ranges are greatest at coastal locations with resonant water bodies" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 13, text: "What advantage do tidal stream generators have over tidal barrages?",
          options: [
            { letter: "A", text: "They produce more electricity per unit of water flow" },
            { letter: "B", text: "They can be deployed in any coastal location regardless of tidal range" },
            { letter: "C", text: "They have a smaller ecological footprint as they do not impound water" },
            { letter: "D", text: "They have been in commercial operation since the 1960s" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set12Passage2: ReadingPassage = {
  id: 2,
  title: "Conflict Resolution In Organisations",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Conflict — the experience of incompatible goals, values, interests, or perceptions between individuals or groups — is not an aberration in organisational life but an inherent feature of it. Wherever people with different perspectives, responsibilities, and interests must work together, disagreement is inevitable. The critical variable is not whether conflict occurs but how it is managed: research consistently finds that unresolved or poorly managed conflict produces serious costs including reduced productivity, talent attrition, psychological harm, and — in extreme cases — legal liability. Well-managed conflict, by contrast, can surface important information, challenge complacent assumptions, and drive creative problem-solving in ways that ultimately improve organisational performance." },
    { label: "B", text: "The most widely used framework for understanding conflict management styles was developed by Kenneth Thomas and Ralph Kilmann in the 1970s, based on two dimensions: the degree to which a party attempts to satisfy their own concerns (assertiveness) and the degree to which they attempt to satisfy the other party's concerns (cooperativeness). Five styles emerge from this two-dimensional space. The competing style (high assertiveness, low cooperativeness) pursues one's own goals at others' expense. The accommodating style (low assertiveness, high cooperativeness) satisfies the other party at the expense of one's own interests. The avoiding style (low on both dimensions) withdraws from conflict without resolution. The compromising style (moderate on both) finds the midpoint between positions but may not fully satisfy either party. The collaborating style (high on both) seeks integrative solutions that fully satisfy both parties' core interests." },
    { label: "C", text: "Research on conflict outcomes consistently favours collaborative and, where appropriate, compromising styles for most organisational contexts. Avoiding tends to allow conflicts to fester and escalate. Competing may produce short-term compliance but damages trust and relationship quality, particularly when used by those in power positions against subordinates. Accommodating, while sometimes appropriate for preserving relationships in low-stakes situations, can create resentment when used habitually and signal that one party's concerns are systematically disregarded. However, no style is universally appropriate: competing is warranted in situations requiring a quick, decisive response to a genuine emergency, and accommodating may be genuinely appropriate when the other party has expertise or genuine authority that the accommodating party lacks." },
    { label: "D", text: "The distinction between task conflict and relationship conflict is important for understanding when conflict is potentially productive. Task conflict — disagreement about the content, goals, or methods of work — has been found in research to be associated with better decision quality in groups when it is managed constructively, as it prevents groupthink and forces consideration of multiple perspectives. Relationship conflict — interpersonal friction, dislike, and tension — is consistently associated with worse outcomes including reduced group performance, lower satisfaction, and higher turnover. The challenge for managers is that task conflict easily spills over into relationship conflict when it is poorly managed, and the two are often difficult for participants to disentangle in the heat of a dispute." },
    { label: "E", text: "Formal dispute resolution mechanisms — including grievance procedures, mediation, and in some jurisdictions mandatory arbitration — provide structured processes for addressing conflicts that cannot be resolved through informal means. Workplace mediation, in which a neutral third party facilitates dialogue between disputing parties without imposing a resolution, has become an increasingly important tool for managing disputes before they reach the level of formal legal proceedings. Research indicates that mediation achieves resolution in a high proportion of cases, produces outcomes perceived as fair by both parties more often than adjudicated outcomes, and preserves working relationships more effectively than litigation." },
    { label: "F", text: "Organisational culture plays a crucial but often unacknowledged role in conflict dynamics. Cultures characterised by psychological safety — the shared belief that it is safe to speak up, raise concerns, and challenge ideas — tend to experience more productive conflict: disagreements are surfaced and addressed early, before they solidify into interpersonal animosity or organisational dysfunction. Cultures characterised by fear, blame, and political manoeuvring tend to drive conflict underground, where it accumulates unresolved until it erupts in ways that are much more damaging and costly to address. The management of conflict is therefore not merely a matter of individual skills and formal processes but a function of the broader organisational environment in which conflict occurs." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 14, text: "The writer argues that conflict in organisations is a natural and inevitable feature of working life.", answer: "YES" },
        { type: "ynng", number: 15, text: "The Thomas-Kilmann framework measures conflict styles along dimensions of assertiveness and cooperativeness.", answer: "YES" },
        { type: "ynng", number: 16, text: "The writer implies that the avoiding style always produces the best long-term outcomes in organisational disputes.", answer: "NO" },
        { type: "ynng", number: 17, text: "Task conflict has been found in research to be associated with better decision quality when managed constructively.", answer: "YES" },
        { type: "ynng", number: 18, text: "The writer states that mediation always produces better outcomes than adjudicated court proceedings.", answer: "NOT GIVEN" },
        { type: "ynng", number: 19, text: "The writer suggests that psychological safety in organisational culture helps conflict be resolved more constructively.", answer: "YES" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "Match each conflict management style (20–23) with its description (A–F).",
      questions: [
        { type: "matching_paragraph", number: 20, text: "Competing", answer: "D" },
        { type: "matching_paragraph", number: 21, text: "Accommodating", answer: "B" },
        { type: "matching_paragraph", number: 22, text: "Avoiding", answer: "E" },
        { type: "matching_paragraph", number: 23, text: "Collaborating", answer: "A" },
      ] as MatchingParagraphQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 24, text: "According to the passage, what is the main risk of using the accommodating style habitually?",
          options: [
            { letter: "A", text: "It may lead to physical altercations in highly competitive environments" },
            { letter: "B", text: "It can create resentment and signal that one party's concerns are systematically ignored" },
            { letter: "C", text: "It always leads to poor quality decisions being made" },
            { letter: "D", text: "It is seen as a sign of weakness that makes future conflicts more likely" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 25, text: "What does research suggest about the relationship between task conflict and relationship conflict?",
          options: [
            { letter: "A", text: "They are completely separate and never influence each other" },
            { letter: "B", text: "Relationship conflict improves decision quality while task conflict reduces it" },
            { letter: "C", text: "Task conflict can spill over into relationship conflict if poorly managed" },
            { letter: "D", text: "Both types of conflict are equally damaging to organisational performance" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 26, text: "Why does workplace mediation tend to preserve working relationships better than litigation?",
          options: [
            { letter: "A", text: "Mediators are legally trained and impose binding, enforceable decisions" },
            { letter: "B", text: "Litigation is always expensive while mediation is always free" },
            { letter: "C", text: "Mediation facilitates dialogue without imposing a resolution, producing outcomes both parties view as fair" },
            { letter: "D", text: "Legal proceedings always take longer than mediation processes" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set12Passage3: ReadingPassage = {
  id: 3,
  title: "The Economics Of Climate Change",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "**Paragraph A** The economics of climate change presents some of the most distinctive and challenging features in all of applied economics. Climate change involves externalities of global scale and multigenerational duration; it requires cooperation among sovereign states with radically different historical emissions, present circumstances, and future vulnerabilities; it demands the redistribution of costs and benefits across populations separated by vast distances and centuries of time; and it confronts decision-makers with the challenge of acting on projections whose uncertainty, while manageable in aggregate, is substantial at the regional and sectoral levels on which actual decisions are made. The economic analysis of climate change is not, therefore, merely a technical exercise in cost-benefit accounting but a profoundly value-laden undertaking whose conclusions are inseparable from the ethical frameworks brought to bear." },
    { label: "B", text: "**Paragraph B** The fundamental economic problem of climate change is the negative externality of greenhouse gas emissions: the costs of emission — in disrupted climate, reduced agricultural productivity, sea level rise, extreme weather, and public health impacts — are borne overwhelmingly by parties other than those who emit. Without policy intervention to internalise these external costs, market agents will emit at levels far exceeding the social optimum. The two principal policy instruments for internalising the carbon externality are the carbon tax — a price placed directly on each unit of greenhouse gas emitted, providing a continuous incentive to reduce emissions — and emissions trading systems (ETS, or cap-and-trade) — in which governments set a cap on total emissions, issue tradeable permits, and allow markets to determine the price of emissions." },
    { label: "C", text: "**Paragraph C** The choice between carbon taxes and cap-and-trade involves genuine trade-offs. Carbon taxes provide price certainty — emitters know in advance what a unit of emission costs, facilitating investment decisions — but provide no guarantee about the actual quantity of emissions reduction achieved. Cap-and-trade provides quantity certainty — the total emissions cap is fixed — but produces volatile prices as the equilibrium permit price fluctuates with economic conditions, energy prices, and technology costs. The EU Emissions Trading System (EU ETS), the world's largest carbon market, has experienced significant price volatility since its establishment in 2005, and its price collapsed during the 2008-2009 financial crisis and subsequent recession as industrial activity fell, demonstrating the sensitivity of permit prices to macroeconomic conditions." },
    { label: "D", text: "**Paragraph D** The Stern Review on the Economics of Climate Change, commissioned by the UK government and published in 2006, made the influential argument that climate change is \"the greatest market failure the world has ever seen\" and that the benefits of strong, early action on climate substantially outweigh the costs. The Review used a very low discount rate — the rate at which future costs and benefits are discounted relative to present values — effectively giving near-equal weight to the welfare of future generations as to present ones, which produced large estimates of the economic damages of unmitigated climate change and correspondingly large estimates of the benefits of mitigation." },
    { label: "E", text: "**Paragraph E** The discount rate debate is among the most contested methodological questions in climate economics. Conventional economic practice uses relatively high discount rates (3 to 7 percent per annum) reflecting observed market rates of return. Applied to climate change, this approach discounts the welfare of people living 100 years from now to near zero in present value terms, effectively treating their suffering as economically negligible from today's perspective. Critics including Stern argue that this is ethically indefensible when applied to the wellbeing of future people who will bear the consequences of present emission decisions. Supporters of higher discount rates respond that economic growth will make future generations richer and better equipped to adapt, and that discounting at market rates reflects genuine preferences about temporal trade-offs." },
    { label: "F", text: "**Paragraph F** The economics of climate adaptation — adjusting to the climate change that cannot now be avoided — has received growing attention as the inadequacy of current mitigation commitments has become apparent. Adaptation includes investments in flood defences, drought-resistant agriculture, early warning systems, heat-resilient urban infrastructure, and managed retreat from areas that cannot be protected. Economic analysis of adaptation faces significant challenges: the costs and benefits of adaptation are highly location-specific, adaptation decisions involve complex interactions between public and private actors, and the optimal mix of adaptation and mitigation depends on uncertain future climate trajectories. A growing strand of research focuses on the \"loss and damage\" question — the costs imposed by climate change that exceed the capacity of adaptation to manage — and on the implications of these residual losses for international climate finance and liability." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "Match the correct heading (i–viii) to paragraphs A–F. There are more headings than paragraphs.",
      headingOptions: [
        "I. The market failure at the heart of the climate change problem and two policy solutions",
        "II. Evidence that carbon markets have achieved their emissions reduction targets",
        "III. An argument that the costs of inaction on climate significantly outweigh the costs of action",
        "IV. Why applying standard economic discount rates to climate change may be ethically problematic",
        "V. The trade-offs between the two main mechanisms for pricing carbon emissions",
        "VI. The particular features that make the economics of climate change uniquely challenging",
        "VII. Investments needed to adjust to unavoidable climate impacts and the limits of this approach",
        "VIII. Why developing countries should receive more financial assistance for climate mitigation",
      ],
      questions: [
        { type: "matching_heading", number: 27, paragraph: "A", answer: "VI" },
        { type: "matching_heading", number: 28, paragraph: "B", answer: "I" },
        { type: "matching_heading", number: 29, paragraph: "C", answer: "V" },
        { type: "matching_heading", number: 30, paragraph: "D", answer: "III" },
        { type: "matching_heading", number: 31, paragraph: "E", answer: "IV" },
        { type: "matching_heading", number: 32, paragraph: "F", answer: "VII" },
      ] as MatchingHeadingQuestion[],
    },
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 33, text: "The writer implies that climate change economics involves unavoidable value judgments, not just technical calculation.", answer: "YES" },
        { type: "ynng", number: 34, text: "Cap-and-trade systems guarantee a specific quantity of emissions reduction through the permit cap.", answer: "YES" },
        { type: "ynng", number: 35, text: "The EU ETS price collapsed during the 2008–2009 financial crisis due to declining industrial activity.", answer: "YES" },
        { type: "ynng", number: 36, text: "The writer states that Stern's low discount rate approach has been accepted as correct by all economists.", answer: "NO" },
        { type: "ynng", number: 37, text: "The writer suggests that adaptation investments can fully compensate for all costs imposed by climate change.", answer: "NO" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 38, text: "What advantage does a carbon tax have over cap-and-trade, according to the passage?",
          options: [
            { letter: "A", text: "It guarantees a specific total quantity of emissions reduction" },
            { letter: "B", text: "It provides price certainty that facilitates investment planning" },
            { letter: "C", text: "It avoids the volatility problems experienced in emissions trading systems" },
            { letter: "D", text: "It is always more economically efficient than market-based solutions" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 39, text: "What is the main ethical argument against applying high discount rates to climate change?",
          options: [
            { letter: "A", text: "High discount rates make climate action too expensive for developing countries" },
            { letter: "B", text: "High discount rates favour investment in fossil fuels rather than renewables" },
            { letter: "C", text: "High discount rates effectively assign near-zero economic value to future generations' wellbeing" },
            { letter: "D", text: "High discount rates underestimate the current economic damage from extreme weather" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 40, text: "According to the passage, what does the \"loss and damage\" question concern?",
          options: [
            { letter: "A", text: "The financial compensation owed by developed countries for historical emissions" },
            { letter: "B", text: "The climate costs that exceed what adaptation measures can manage" },
            { letter: "C", text: "The economic damage caused by carbon pricing to fossil fuel industries" },
            { letter: "D", text: "The losses suffered by insurance companies from extreme weather events" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

export const testSet12Passages: ReadingPassage[] = [
  set12Passage1,
  set12Passage2,
  set12Passage3,
];

// ══════════════ TEST SET 13 ══════════════
const set13Passage1: ReadingPassage = {
  id: 1,
  title: "The History Of Medicine",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "The history of medicine is the history of humanity's attempt to understand, prevent, and treat disease — an endeavour shaped as much by the cultural, philosophical, and economic contexts of different eras as by the accumulation of empirical knowledge. The story is neither a linear march of progress nor a simple account of the displacement of superstition by science; rather, it is a complex interaction of accurate observation, theoretical framework, experimental method, and the slow, uneven translation of knowledge into effective practice." },
    { label: "B", text: "Ancient medicine drew on both empirical observation and explanatory frameworks that integrated disease into cosmological and religious worldviews. Egyptian medicine, documented in papyri dating from around 1600 BCE, combined rational clinical observation — systematic examination, prognosis, and prescribed treatments — with magical and religious invocations, reflecting a worldview in which disease was understood as having both natural and supernatural dimensions. Ancient Greek medicine, particularly in the tradition associated with Hippocrates of Cos (c. 460–370 BCE), represented a significant shift towards naturalistic explanation. Hippocratic medicine attributed disease to imbalances among four bodily humours — blood, phlegm, yellow bile, and black bile — a framework that, while entirely incorrect, provided a coherent theoretical basis for clinical observation and prognosis and proved remarkably durable in European medicine for nearly two millennia." },
    { label: "C", text: "The humoral framework was elaborated and systematised by Galen of Pergamon (129–c. 216 CE), whose synthesis of Greek medical knowledge dominated European and Islamic medicine through the medieval period. Galen's authority was so great that questioning his anatomical and physiological claims — even when direct observation contradicted them — was intellectually dangerous. The revolution in medical knowledge that began with Andreas Vesalius's anatomical work in the sixteenth century — based on systematic dissection rather than deference to ancient texts — began the slow process of replacing textual authority with empirical investigation as the foundation of medical knowledge." },
    { label: "D", text: "The development of the germ theory of disease in the nineteenth century represents perhaps the single most transformative intellectual revolution in the history of medicine. The proposition — established through the work of Louis Pasteur, Robert Koch, and their contemporaries — that specific infectious diseases are caused by specific microorganisms, rather than by miasma (bad air), imbalanced humours, or moral failure, provided the foundation for entirely new approaches to disease prevention and treatment. Koch's postulates — a set of criteria for establishing that a specific microorganism causes a specific disease — provided methodological rigour that transformed bacteriology into a reliable science. The development of vaccines against specific pathogens and the discovery of antibiotics in the twentieth century — penicillin by Alexander Fleming in 1928 — translated germ theory into interventions of extraordinary effectiveness." },
    { label: "E", text: "The twentieth century saw the construction of systematic evidence-based medicine, moving beyond individual clinical experience towards the rigorous testing of interventions in randomised controlled trials (RCTs). The first major RCT in medicine is commonly attributed to a 1948 British trial of streptomycin for tuberculosis, designed by Austin Bradford Hill. The RCT framework — in which patients are randomly assigned to treatment and control groups to eliminate selection bias — has become the gold standard for evaluating medical interventions, and its adoption has transformed medical practice by revealing that many treatments assumed to be effective were in fact useless or harmful." },
    { label: "F", text: "Contemporary medicine faces a distinctive set of challenges that differ fundamentally from the infectious disease problems that drove most of medical history's landmark advances. Non-communicable diseases — cardiovascular disease, cancer, type 2 diabetes, chronic respiratory conditions — now account for the majority of global mortality and morbidity, and their management requires not only effective clinical treatment but population-level interventions addressing diet, physical activity, tobacco, alcohol, and the environmental and social determinants of health. Antimicrobial resistance — the emergence of bacterial strains resistant to available antibiotics — threatens to reverse the gains of the antibiotic era and is regarded by public health authorities as one of the most serious threats to global health security." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "TRUE / FALSE / NOT GIVEN",
      questions: [
        { type: "tfng", number: 1, text: "Egyptian medical texts from around 1600 BCE combined rational clinical observation with magical practices.", answer: "TRUE" },
        { type: "tfng", number: 2, text: "The humoral theory correctly identified the main biological causes of infectious disease.", answer: "FALSE" },
        { type: "tfng", number: 3, text: "Vesalius's anatomical work was based on systematic dissection rather than ancient texts.", answer: "TRUE" },
        { type: "tfng", number: 4, text: "Robert Koch and Louis Pasteur worked together in the same laboratory throughout their careers.", answer: "NOT GIVEN" },
        { type: "tfng", number: 5, text: "The first major RCT in medicine tested streptomycin as a treatment for tuberculosis.", answer: "TRUE" },
      ] as TFNGQuestion[],
    },
    {
      instructions: "SHORT ANSWER",
      questions: [
        {
          type: "sentence_completion", number: 6,
          prefix: "What set of principles did Koch develop to establish that a specific microorganism causes a specific disease?", suffix: "",
          answer: "Koch's postulates", acceptableAnswers: ["Koch's postulates"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 7,
          prefix: "What was the name given to the bad air theory that germ theory replaced as an explanation for infectious disease?", suffix: "",
          answer: "miasma", acceptableAnswers: ["miasma"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 8,
          prefix: "What medical advance did Alexander Fleming make in 1928?", suffix: "",
          answer: "penicillin", acceptableAnswers: ["penicillin"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 9,
          prefix: "What type of intervention is needed alongside clinical treatment to address non-communicable diseases at scale?", suffix: "",
          answer: "population-level interventions", acceptableAnswers: ["population-level interventions"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 10, text: "Why does the passage describe the history of medicine as neither a \"linear march of progress\" nor a displacement of superstition by science?",
          options: [
            { letter: "A", text: "Because scientific progress in medicine has been consistently slow" },
            { letter: "B", text: "Because the development of medical knowledge involves complex interactions between many factors beyond simple empirical accumulation" },
            { letter: "C", text: "Because ancient medicine contained no useful or accurate medical knowledge" },
            { letter: "D", text: "Because most medical progress happened in the twentieth century alone" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 11, text: "What was significant about the Hippocratic framework, despite its inaccuracy?",
          options: [
            { letter: "A", text: "It correctly identified the role of bacteria in causing disease" },
            { letter: "B", text: "It combined rational clinical observation with supernatural explanations" },
            { letter: "C", text: "It provided a coherent theoretical basis for clinical practice that proved durable for nearly two millennia" },
            { letter: "D", text: "It was the first medical system to use controlled experiments" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 12, text: "Why did the challenge to Galen's authority begin only in the sixteenth century?",
          options: [
            { letter: "A", text: "Dissection of human bodies was technically impossible before that time" },
            { letter: "B", text: "His authority was so great that questioning him was intellectually dangerous before systematic dissection began" },
            { letter: "C", text: "Galen's works were only translated into European languages in the sixteenth century" },
            { letter: "D", text: "Medieval Islamic scholars had already corrected all of Galen's errors by the sixteenth century" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 13, text: "What is described as a major contemporary medical challenge that differs from historical problems?",
          options: [
            { letter: "A", text: "The elimination of all known bacterial infections" },
            { letter: "B", text: "The emergence of antimicrobial resistance threatening the antibiotic era's gains" },
            { letter: "C", text: "The lack of sufficient trained physicians in most countries" },
            { letter: "D", text: "The failure of RCTs to produce reliable evidence about new treatments" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set13Passage2: ReadingPassage = {
  id: 2,
  title: "Knowledge Management In Organisations",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Knowledge — an organisation's accumulated understanding of customers, processes, technologies, and competitive environments — has been widely recognised since the 1990s as one of the most critical sources of sustainable competitive advantage in knowledge-intensive industries. Knowledge management (KM) — the systematic effort to capture, store, share, and apply organisational knowledge — emerged as a distinct management discipline in response to the recognition that vast quantities of strategically valuable knowledge were being lost through employee turnover, poorly documented processes, and the failure to learn systematically from experience. Despite substantial investment and attention, KM remains one of the most difficult management challenges to execute well." },
    { label: "B", text: "Ikujiro Nonaka's distinction between explicit and tacit knowledge is foundational to most KM frameworks. Explicit knowledge is articulable and easily transferred through documents, databases, and formal processes: procedures, specifications, financial models, customer records, and systematised best practices. Tacit knowledge — knowledge embedded in the skills, judgements, intuitions, and practical expertise of experienced practitioners — is far more valuable but profoundly difficult to transfer. Polanyi's formulation that \"we know more than we can tell\" captures the essential challenge: much of the most important organisational knowledge cannot be fully articulated or documented, residing instead in the embodied competence of skilled workers whose expertise may take decades to develop." },
    { label: "C", text: "Nonaka and Takeuchi's SECI model describes four modes of knowledge conversion. Socialisation involves the transfer of tacit knowledge between individuals through shared experience and practice — the apprenticeship model of skill development. Externalisation involves the conversion of tacit knowledge into explicit form through the articulation of metaphors, models, and concepts. Combination involves the integration and reorganisation of explicit knowledge from multiple sources. Internalisation involves the absorption of explicit knowledge back into the tacit knowledge of individuals through practice. The spiral of organisational knowledge creation moves through these four modes in a continuous cycle, with each full cycle producing knowledge at a higher level of organisational complexity." },
    { label: "D", text: "Communities of practice — informal groups of practitioners who share expertise, develop knowledge collaboratively, and maintain a shared repertoire of best practices — have been identified as among the most effective vehicles for tacit knowledge sharing in organisational settings. Unlike formal training programmes or documentation systems, communities of practice operate through the kind of situated learning and shared problem-solving through which tacit knowledge is most naturally transmitted. Research by Wenger and colleagues found that communities of practice in organisations including insurance companies, technology firms, and government agencies significantly improved knowledge sharing, problem resolution speed, and innovation. The challenge for management is that communities of practice are organic, self-organising structures that may wither if subjected to excessive formal direction or instrumentalised as compliance mechanisms." },
    { label: "E", text: "Information technology has played a central, if often disappointing, role in KM initiatives. Early KM efforts in the 1990s often focused heavily on technology — deploying knowledge management systems, intranets, expert directories, and document repositories with the expectation that providing the infrastructure for knowledge sharing would be sufficient to generate the behaviour change required. Many of these investments failed to achieve their objectives because they addressed the supply of knowledge infrastructure without adequately addressing the demand for it — the cultural, motivational, and relational factors that determine whether people actually seek out, contribute to, and use shared knowledge resources. Subsequent research and practice has emphasised the primacy of culture and incentives in KM: technology is a necessary but insufficient condition for effective knowledge sharing." },
    { label: "F", text: "Knowledge retention — the challenge of preserving organisational knowledge as experienced employees retire, resign, or are made redundant — has become an increasingly urgent concern in many industries facing demographic ageing of their workforces. Structured approaches to knowledge transfer, including mentoring programmes, succession planning, and deliberate knowledge capture projects, can mitigate but not eliminate the knowledge loss associated with workforce transitions. The tacit nature of much expert knowledge means that no documentation or succession programme can fully substitute for the years of practice and experience through which genuine expertise is developed." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 14, text: "The writer implies that tacit knowledge is more strategically valuable than explicit knowledge.", answer: "YES" },
        { type: "ynng", number: 15, text: "Polanyi's concept captures the idea that humans can articulate all of the knowledge they possess.", answer: "NO" },
        { type: "ynng", number: 16, text: "The SECI model describes socialisation as the transfer of tacit knowledge through shared experience and practice.", answer: "YES" },
        { type: "ynng", number: 17, text: "The writer states that communities of practice always perform better when subjected to strong formal management direction.", answer: "NO" },
        { type: "ynng", number: 18, text: "Research suggests that early KM technology investments failed primarily because of technical limitations of the software.", answer: "NO" },
        { type: "ynng", number: 19, text: "The writer argues that technology is a sufficient condition for effective organisational knowledge sharing.", answer: "NO" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "SENTENCE COMPLETION",
      questions: [
        {
          type: "sentence_completion", number: 20,
          prefix: "Explicit knowledge can be transferred through documents, databases, and", suffix: "processes.",
          answer: "formal", acceptableAnswers: ["formal"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 21,
          prefix: "Communities of practice operate through", suffix: "learning and shared problem-solving, making them effective for tacit knowledge sharing.",
          answer: "situated", acceptableAnswers: ["situated"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 22,
          prefix: "KM investments often failed because they addressed the supply of knowledge infrastructure without adequately addressing the", suffix: "for it.",
          answer: "demand", acceptableAnswers: ["demand"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 23,
          prefix: "No documentation or succession programme can fully substitute for the", suffix: "through which genuine expertise is developed.",
          answer: "years of practice and experience", acceptableAnswers: ["years of practice and experience"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 24, text: "What does Nonaka and Takeuchi's \"externalisation\" mode of knowledge conversion involve?",
          options: [
            { letter: "A", text: "Storing explicit knowledge in digital databases" },
            { letter: "B", text: "Converting tacit knowledge into explicit form through articulation" },
            { letter: "C", text: "Absorbing explicit knowledge back into individual tacit practice" },
            { letter: "D", text: "Transferring tacit knowledge between individuals through direct experience" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 25, text: "According to the passage, why do communities of practice risk withering when subjected to excessive formal direction?",
          options: [
            { letter: "A", text: "They require expensive resources that formal management provides" },
            { letter: "B", text: "They are organic, self-organising structures not designed for institutional control" },
            { letter: "C", text: "Their members resent authority and will leave if overseen by managers" },
            { letter: "D", text: "Formal direction always leads to the production of low-quality knowledge" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 26, text: "What does the passage identify as the most important factor in effective knowledge management?",
          options: [
            { letter: "A", text: "Investment in high-quality information technology infrastructure" },
            { letter: "B", text: "The formal appointment of a Chief Knowledge Officer" },
            { letter: "C", text: "Cultural and motivational factors that drive knowledge-seeking and sharing behaviour" },
            { letter: "D", text: "The systematic documentation of all expert knowledge before employees retire" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set13Passage3: ReadingPassage = {
  id: 3,
  title: "Theories Of Justice: From Rawls To Capability Approaches",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "**Paragraph A** Justice — the right ordering of social institutions, the fair distribution of benefits and burdens, and the just treatment of individuals by governments and each other — is among the oldest and most contested questions in political philosophy. The twentieth and twenty-first centuries have seen a remarkable flowering of systematic theorising about justice, provoked in part by the challenge of providing philosophical foundations for the welfare state and human rights regimes that emerged after the Second World War, and in part by deepening awareness of the scale and persistence of inequality within and between societies. The major theories of justice developed in this period — including Rawlsian liberal egalitarianism, libertarianism, communitarianism, and the capabilities approach — differ not only in their conclusions but in their fundamental assumptions about human nature, the purpose of social institutions, and the moral status of choice, circumstance, and community." },
    { label: "B", text: "**Paragraph B** John Rawls's \"A Theory of Justice\" (1971) is widely regarded as the most influential work of political philosophy of the twentieth century. Rawls argued that just social institutions are those that rational individuals would choose from behind a \"veil of ignorance\" — a hypothetical original position in which they do not know their place in society, their class, their gender, their natural talents, or their conception of the good. This device was designed to model the conditions of fairness by eliminating the influence of morally arbitrary factors — the accident of birth — on principles of social organisation. From the original position, Rawls argued, rational individuals would select two principles: first, equal basic liberties for all (liberty principle); second, social and economic inequalities are permissible only if they are to the greatest benefit of the least advantaged members of society (the difference principle) and attached to positions open to all under conditions of fair equality of opportunity." },
    { label: "C", text: "**Paragraph C** Rawls's difference principle represents a philosophically sophisticated defence of redistribution. It does not require equality of outcome — inequalities that incentivise socially productive activity and that benefit the worst-off are permitted — but it does require that the institutional structure of society be structured to maximise the position of the least advantaged, rather than merely to aggregate welfare or maximise economic efficiency. This is a demanding requirement that would, if implemented, require significantly more redistribution than exists in most contemporary societies. Rawls himself acknowledged that his theory was an ideal theory of justice — a description of what fully just institutions would look like — rather than a political programme or transitional justice framework." },
    { label: "D", text: "**Paragraph D** Robert Nozick's libertarian response to Rawls, presented in \"Anarchy, State, and Utopia\" (1974), offered a sharply contrasting account. Nozick argued that individuals have inviolable rights — derived from self-ownership and the right to the fruits of one's labour — and that any redistribution of legitimately acquired holdings, however well-intentioned, violates these rights. On Nozick's account, the only just state is a minimal state limited to the protection of individual rights; taxation for redistributive purposes is morally equivalent to forced labour, as it takes from individuals what they have rightfully earned. Nozick's account privileges historical entitlement — what individuals are entitled to depends on how their holdings were acquired and transferred — rather than end-state patterns of distribution." },
    { label: "E", text: "**Paragraph E** Communitarian critics — including Michael Sandel and Alasdair MacIntyre — challenged both Rawls and Nozick for their methodological individualism: the assumption that individuals are separable from, and prior to, the social communities and practices that constitute their identities. The Rawlsian \"unencumbered self\" of the original position — stripped of all particularities of community, tradition, and commitment — does not accurately describe real human beings, whose identities, conceptions of the good, and moral commitments are constituted by the communities and practices in which they are embedded. On the communitarian view, justice cannot be theorised at an abstract level independent of the particular goods, practices, and self-understandings of specific communities." },
    { label: "F", text: "**Paragraph F** The capabilities approach, developed principally by Amartya Sen and Martha Nussbaum, represents a different departure from standard liberal theories. Rather than focusing on the distribution of primary goods (Rawls) or rights to entitlements (Nozick), the capabilities approach asks what people are actually able to do and to be. A capability is a real freedom — the genuine ability to achieve a functioning or form of life if one chooses. The approach holds that justice requires ensuring that all people have access to a threshold level of a set of central human capabilities, including bodily health and integrity, emotional development, practical reason, affiliation with others, and participation in political and social life. The capabilities approach has been particularly influential in development economics and international human rights, as it provides a more sensitive account of human welfare than income-based measures, capturing dimensions of human flourishing that GDP and income distribution measures miss." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "Match the correct heading (i–viii) to paragraphs A–F.",
      headingOptions: [
        "I. A rights-based argument that taxation for redistribution is unjust",
        "II. An account of justice based on what people can genuinely do and be",
        "III. The conditions under which inequalities may be considered just",
        "IV. Why abstract liberal theories fail to capture the communal nature of human identity",
        "V. The foundational thought experiment designed to produce fair principles of social organisation",
        "VI. An overview of the major competing traditions in twentieth-century political philosophy",
        "VII. Evidence that inequality in modern societies has been significantly reduced by welfare states",
        "VIII. Why ideal theories of justice are irrelevant to practical political reform",
      ],
      questions: [
        { type: "matching_heading", number: 27, paragraph: "A", answer: "VI" },
        { type: "matching_heading", number: 28, paragraph: "B", answer: "V" },
        { type: "matching_heading", number: 29, paragraph: "C", answer: "III" },
        { type: "matching_heading", number: 30, paragraph: "D", answer: "I" },
        { type: "matching_heading", number: 31, paragraph: "E", answer: "IV" },
        { type: "matching_heading", number: 32, paragraph: "F", answer: "II" },
      ] as MatchingHeadingQuestion[],
    },
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 33, text: "The writer states that Rawls's veil of ignorance was designed to eliminate the influence of morally arbitrary birth circumstances on principles of justice.", answer: "YES" },
        { type: "ynng", number: 34, text: "The writer implies that Rawls's difference principle requires absolute equality of economic outcomes.", answer: "NO" },
        { type: "ynng", number: 35, text: "Nozick argued that taxation for redistribution is morally equivalent to forced labour.", answer: "YES" },
        { type: "ynng", number: 36, text: "Communitarian critics argue that abstract individual rights theories adequately describe real human identities.", answer: "NO" },
        { type: "ynng", number: 37, text: "The capabilities approach has been particularly influential in development economics and international human rights.", answer: "YES" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 38, text: "What two principles does Rawls argue rational individuals would select from behind the veil of ignorance?",
          options: [
            { letter: "A", text: "Maximum economic growth and equal political representation" },
            { letter: "B", text: "Equal basic liberties and inequalities permitted only if they benefit the least advantaged" },
            { letter: "C", text: "Individual property rights and minimal state interference in private decisions" },
            { letter: "D", text: "Community solidarity and equal distribution of all social goods" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 39, text: "What does Nozick's concept of historical entitlement mean for the justice of a distribution?",
          options: [
            { letter: "A", text: "Justice requires that all distributions reflect the historical contributions of each member of society" },
            { letter: "B", text: "A distribution is just if the holdings within it were acquired and transferred through legitimate means" },
            { letter: "C", text: "Historical circumstances justify current inequalities regardless of how holdings were acquired" },
            { letter: "D", text: "Justice requires compensating groups for historical injustices regardless of current holdings" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 40, text: "According to the passage, what advantage does the capabilities approach have over income-based measures of human welfare?",
          options: [
            { letter: "A", text: "It is cheaper to calculate than GDP or income distribution statistics" },
            { letter: "B", text: "It better captures dimensions of human flourishing beyond income, such as health and participation" },
            { letter: "C", text: "It has been formally adopted as the official measure of welfare by the United Nations" },
            { letter: "D", text: "It eliminates the need for redistribution by focusing on individual freedoms rather than outcomes" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

export const testSet13Passages: ReadingPassage[] = [
  set13Passage1,
  set13Passage2,
  set13Passage3,
];
