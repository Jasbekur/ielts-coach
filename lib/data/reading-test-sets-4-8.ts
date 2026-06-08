// IELTS Academic Reading – Test Sets 4–8
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

// ══════════════ TEST SET 4 ══════════════
const set4Passage1: ReadingPassage = {
  id: 1,
  title: "The History Of Glass",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Glass is one of the oldest and most versatile materials produced by human civilisation. In its natural form — obsidian, a volcanic glass produced when silica-rich lava cools rapidly — it was used by prehistoric peoples to make cutting tools and arrowheads tens of thousands of years before the development of any manufacturing technique. The first manufactured glass objects — small beads and amulets — appear in the archaeological record of ancient Egypt and Mesopotamia around 3500 BCE, representing one of the most enduring technological achievements of the ancient world." },
    { label: "B", text: "The precise origins of glassmaking remain a matter of scholarly debate. A popular legend, recorded by the Roman author Pliny the Elder in the first century CE, attributes the discovery of glass to Phoenician merchants who, camping on a beach, used blocks of natron (a naturally occurring form of sodium carbonate) to support their cooking pots over a fire of sand. Allegedly, the heat fused the natron and sand to produce a flow of molten glass. While this story is almost certainly apocryphal — campfires do not produce temperatures high enough to melt silica — it reflects early Roman interest in understanding a material that had by then become commercially significant." },
    { label: "C", text: "The most important technical advance in the history of glassmaking was the invention of glassblowing, developed in the Syro-Palestinian region around the first century BCE. Prior to this innovation, glass vessels were made by laboriously winding molten glass around a clay core, which was then removed once the glass had cooled. Glassblowing — the technique of inflating a gather of molten glass at the end of a metal pipe by blowing air through it — was dramatically faster, more flexible, and capable of producing thinner, more uniform vessels. Its adoption spread rapidly across the Roman Empire, making glass containers affordable enough for widespread domestic use for the first time." },
    { label: "D", text: "The fall of the Western Roman Empire in the fifth century CE led to a significant contraction in glass production across Europe. Glassmaking knowledge and skill became concentrated in the Byzantine Empire and later in the Islamic world, where craftsmen developed new decorative techniques including enamelling, gilding, and the intricate cutting of glass into elaborate geometric patterns. Islamic glass of the ninth to thirteenth centuries, produced in workshops in Syria, Iran, and Egypt, is regarded by historians of art and technology as among the finest ever made." },
    { label: "E", text: "Venice emerged as the dominant centre of European glass production in the medieval period, and the Venetian glassmaking industry — eventually concentrated on the island of Murano after 1291, when the authorities ordered furnaces moved there to reduce the fire risk in the city — maintained a near-monopoly on high-quality glass production for over three centuries. The secrets of Murano's techniques were so jealously guarded that glassworkers were prohibited from leaving the republic; those who attempted to emigrate and share their knowledge faced severe penalties. Despite these precautions, knowledge eventually spread to northern Europe, where the development of lead crystal glass — particularly associated with English craftsman George Ravenscroft in the 1670s — produced a material of exceptional clarity and brilliance." },
    { label: "F", text: "The industrial revolution transformed glass production as decisively as it transformed most other materials industries. The development of continuous glass production processes in the nineteenth and early twentieth centuries — culminating in the float glass process invented by Alastair Pilkington in 1959, in which molten glass is floated across a bath of molten tin to produce a perfectly flat, distortion-free sheet — made flat glass available at scale and low cost for the first time. This transformation enabled the glass-fronted architecture of the modern era and made glass a standard component of consumer products from automobiles to electronic screens." },
    { label: "G", text: "Today, glass science has moved far beyond the conventional silica-based materials of history. Advanced glass formulations including borosilicate glass (used in laboratory equipment and cookware for its resistance to thermal shock), chemically strengthened glass (used in smartphone screens), and glass ceramics (used in cookware and aerospace applications for their ability to withstand extreme temperature changes) represent the cutting edge of materials science. Optical fibres — glass strands so pure that light can travel through them for tens of kilometres with minimal loss — have become the backbone of global telecommunications infrastructure, carrying the majority of the world's internet traffic." },
    { label: "H", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      questions: [
        { type: "tfng", number: 1, text: "Prehistoric humans used naturally occurring glass to manufacture weapons and tools.", answer: "TRUE" },
        { type: "tfng", number: 2, text: "Pliny the Elder claimed to have personally witnessed the discovery of glassblowing.", answer: "FALSE" },
        { type: "tfng", number: 3, text: "Glassblowing was invented in the Syro-Palestinian region in approximately the first century BCE.", answer: "TRUE" },
        { type: "tfng", number: 4, text: "The decline of Rome caused glassmaking skills to be lost entirely in the European world.", answer: "FALSE" },
        { type: "tfng", number: 5, text: "Venetian authorities moved glassworking furnaces to Murano in order to protect trade secrets.", answer: "FALSE" },
        { type: "tfng", number: 6, text: "The float glass process was invented by Alastair Pilkington in the twentieth century.", answer: "TRUE" },
      ] as TFNGQuestion[],
    },
    {
      instructions: "Complete the sentences using NO MORE THAN THREE WORDS from the passage.",
      questions: [
        {
          type: "sentence_completion", number: 7,
          prefix: "Before glassblowing, glass vessels were shaped by winding molten glass around a", suffix: ".",
          answer: "clay core", acceptableAnswers: ["clay core"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 8,
          prefix: "Islamic glass craftsmen developed decorative techniques including enamelling, gilding, and the", suffix: "of glass.",
          answer: "intricate cutting", acceptableAnswers: ["intricate cutting"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 9,
          prefix: "George Ravenscroft is associated with the development of", suffix: "glass in England in the 1670s.",
          answer: "lead crystal", acceptableAnswers: ["lead crystal"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 10,
          prefix: "Optical fibres are made from glass so pure that light can travel through them for tens of kilometres with minimal", suffix: ".",
          answer: "loss", acceptableAnswers: ["loss"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "Choose the correct letter: A, B, C, or D.",
      questions: [
        {
          type: "mcq", number: 11, text: "What does the passage say about Pliny's legend of glass discovery?",
          options: [
            { letter: "A", text: "It is supported by modern archaeological evidence" },
            { letter: "B", text: "It is almost certainly a fictional account as campfires cannot melt silica" },
            { letter: "C", text: "It accurately describes Phoenician glassmaking techniques" },
            { letter: "D", text: "It was disproved by experiments conducted in the first century CE" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 12, text: "Why was the invention of glassblowing considered a major advance?",
          options: [
            { letter: "A", text: "It reduced the temperature needed to work with glass" },
            { letter: "B", text: "It allowed coloured glass to be produced for the first time" },
            { letter: "C", text: "It was faster and produced thinner, more uniform vessels at lower cost" },
            { letter: "D", text: "It enabled the production of flat glass for windows" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 13, text: "According to the passage, why was glass manufacture moved to Murano?",
          options: [
            { letter: "A", text: "The island had superior raw materials for glassmaking" },
            { letter: "B", text: "The authorities wanted to reduce the risk of fire in the city" },
            { letter: "C", text: "Murano craftsmen had more advanced skills than city workers" },
            { letter: "D", text: "The island offered better trade routes to the rest of Europe" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set4Passage2: ReadingPassage = {
  id: 2,
  title: "Leadership Styles And Organisational Performance",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "The study of leadership has occupied management researchers for well over a century, yet agreement on what constitutes effective leadership remains elusive. This is partly because leadership effectiveness is context-dependent — the qualities and behaviours that produce outstanding results in one setting may be counterproductive in another — and partly because the outcomes by which leadership is measured are themselves complex, multidimensional, and sometimes contradictory. Leaders who maximise short-term financial performance may undermine the trust, culture, and employee wellbeing that sustain long-term organisational health." },
    { label: "B", text: "Among the most widely cited frameworks in leadership research is the distinction between transactional and transformational leadership, developed principally by James MacGregor Burns in 1978 and subsequently extended by Bernard Bass. Transactional leadership operates through a system of exchange: the leader clarifies expectations, sets goals, and distributes rewards and punishments based on follower performance. This approach ensures compliance and can be highly effective in stable, predictable environments where the primary requirement is efficient execution of defined tasks. Transformational leadership, by contrast, involves inspiring followers to transcend their immediate self-interests and commit to a collective vision. Transformational leaders communicate an aspirational future, challenge followers to question assumptions, foster individual development, and build emotional connections between the team's work and broader purpose. Research by Bass and his colleagues found that transformational leadership consistently produced higher levels of follower motivation, satisfaction, and performance than transactional approaches across a wide range of organisational contexts." },
    { label: "C", text: "Servant leadership, a concept introduced by Robert Greenleaf in 1970, represents a philosophically distinct approach that inverts the conventional power relationship between leader and follower. Rather than directing followers in pursuit of organisational goals, the servant leader begins with a commitment to the growth and wellbeing of the people they lead, on the premise that organisations whose people are fully developed, trusted, and engaged will ultimately outperform those driven by command and control. Servant leadership is associated with high levels of follower trust, organisational citizenship behaviour — discretionary actions beyond the formal job description that contribute to organisational effectiveness — and ethical conduct. Critics note, however, that servant leadership may be difficult to practise in environments characterised by intense competitive pressure or short-term performance demands." },
    { label: "D", text: "Authentic leadership theory focuses on the congruence between a leader's internal values, beliefs, and emotions and their external behaviour. Authentic leaders are self-aware, transparent about their reasoning and uncertainties, balanced in their consideration of others' viewpoints, and guided by internalised ethical standards rather than external pressures. Research suggests that authentic leadership is strongly associated with follower trust, engagement, and psychological safety — the belief that it is safe to speak up, take risks, and admit errors without fear of punishment. In healthcare settings, where psychological safety is directly associated with patient safety, authentic leadership has attracted particular research and practical attention." },
    { label: "E", text: "Situational leadership, developed by Paul Hersey and Ken Blanchard in the 1970s, proposes that no single leadership style is universally effective; instead, leaders should adapt their approach to the development level of each individual follower in relation to a specific task. A follower who is enthusiastic but inexperienced in a particular area requires a directing style, providing clear instructions and close supervision. As competence develops, the leader can reduce task direction and increase relational support, moving towards a coaching style. Fully competent and committed followers can be delegated to with minimal oversight. The practical appeal of situational leadership lies in its emphasis on flexibility and individualised attention; the critique is that it may oversimplify the complex, dynamic nature of real leadership interactions." },
    { label: "F", text: "The field has increasingly recognised that leadership is not solely a property of individuals but an emergent quality of relationships, teams, and systems. Distributed leadership — the practice of spreading leadership functions across multiple individuals rather than concentrating them in a single positional authority — has gained significant research attention, particularly in educational, healthcare, and knowledge-intensive organisations. Evidence suggests that distributed leadership is associated with higher organisational adaptability, greater innovation, and more effective use of diverse expertise — outcomes that are difficult to achieve when leadership is centralised." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "Do the following statements reflect the claims of the writer?",
      questions: [
        { type: "ynng", number: 14, text: "The writer argues that effective leadership qualities are consistent across all organisational contexts.", answer: "NO" },
        { type: "ynng", number: 15, text: "Transactional leadership is described as being most effective in stable environments with defined tasks.", answer: "YES" },
        { type: "ynng", number: 16, text: "Bass found that transformational leaders consistently achieved better results than transactional leaders.", answer: "YES" },
        { type: "ynng", number: 17, text: "Servant leadership has been adopted as the dominant leadership model in most corporations.", answer: "NOT GIVEN" },
        { type: "ynng", number: 18, text: "Authentic leadership is associated with psychological safety in healthcare organisations.", answer: "YES" },
        { type: "ynng", number: 19, text: "Distributed leadership is described as superior to all other leadership styles.", answer: "NO" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "Match each leadership theory (Questions 20–23) with the correct description (A–F).",
      questions: [
        { type: "matching_paragraph", number: 20, text: "Transactional leadership", answer: "C" },
        { type: "matching_paragraph", number: 21, text: "Servant leadership", answer: "B" },
        { type: "matching_paragraph", number: 22, text: "Authentic leadership", answer: "E" },
        { type: "matching_paragraph", number: 23, text: "Situational leadership", answer: "A" },
      ] as MatchingParagraphQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 24, text: "What does the passage say about the measurement of leadership effectiveness?",
          options: [
            { letter: "A", text: "Short-term and long-term outcomes are always aligned" },
            { letter: "B", text: "Financial performance is the only valid measure of leadership" },
            { letter: "C", text: "Outcomes are complex and sometimes contradictory" },
            { letter: "D", text: "Leadership effectiveness can be precisely measured through follower surveys" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 25, text: "What criticism is made of servant leadership in the passage?",
          options: [
            { letter: "A", text: "It produces low levels of follower trust" },
            { letter: "B", text: "It may be difficult to apply in highly competitive or short-term performance environments" },
            { letter: "C", text: "It was disproved by subsequent research" },
            { letter: "D", text: "It applies only to non-profit organisations" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 26, text: "According to the passage, why is distributed leadership beneficial in knowledge-intensive organisations?",
          options: [
            { letter: "A", text: "It reduces the overall number of leaders needed" },
            { letter: "B", text: "It allows organisations to identify individual star performers" },
            { letter: "C", text: "It enables better use of diverse expertise and greater adaptability" },
            { letter: "D", text: "It simplifies communication between organisational levels" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set4Passage3: ReadingPassage = {
  id: 3,
  title: "The Neuroscience Of Creativity",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "**Paragraph A** Creativity — broadly defined as the ability to generate ideas, solutions, or products that are both novel and appropriate or valuable in context — has long been regarded as one of the most distinctively human cognitive capacities. Yet despite its cultural centrality and economic importance, creativity proved remarkably resistant to systematic scientific study for most of the twentieth century. Prevailing psychological frameworks emphasised measurable, replicable behaviours and were poorly suited to studying a phenomenon as elusive, variable, and subjectively assessed as creative production. The development of neuroimaging technologies — particularly functional magnetic resonance imaging (fMRI) — from the 1990s onwards has substantially changed this situation, enabling researchers to observe which brain regions are active during creative tasks and to begin constructing models of the neural architecture that supports creative thought." },
    { label: "B", text: "**Paragraph B** Early creativity research often equated the phenomenon with divergent thinking — the ability to generate many different ideas from a single starting point, as measured by tasks such as listing all possible uses for a brick. Divergent thinking, typically associated with the right hemisphere of the brain in popular imagination, was contrasted with convergent thinking — the analytical narrowing of possibilities to arrive at a single correct solution, associated with left-hemisphere processing. Neuroimaging research has substantially complicated and partially refuted this clean left-right dichotomy. Creative tasks typically recruit a distributed network of regions spanning both hemispheres, and the specific networks activated depend heavily on the nature of the task." },
    { label: "C", text: "**Paragraph C** Three large-scale neural networks have emerged as central to contemporary models of creative cognition. The default mode network (DMN), which is active during mind-wandering, daydreaming, and spontaneous internal thought, generates associative and imaginative content that forms the raw material of creative ideation. The executive control network (ECN), centred on the prefrontal cortex, evaluates, selects, and refines candidate ideas according to task-relevant criteria. The salience network detects and switches between internally and externally generated information, coordinating the interplay between the DMN and ECN. Unusually for brain networks that are typically anti-correlated — active in inverse relationship to each other — the DMN and ECN show higher co-activation in highly creative individuals, suggesting that the capacity to simultaneously generate and evaluate ideas is a neural marker of creative ability." },
    { label: "D", text: "**Paragraph D** The role of the prefrontal cortex (PFC) in creativity is complex and counterintuitive. The PFC is the seat of executive functions including working memory, planning, impulse inhibition, and rule-following — capacities that might seem antithetical to uninhibited creative thought. Consistent with this, some research has found that temporary suppression of PFC activity — through transcranial direct current stimulation or in individuals with certain types of frontal lobe damage — can produce improvements in specific creative tasks, apparently by removing inhibitory constraints. However, other research suggests that PFC involvement is essential for sustained, goal-directed creative work, and that the relationship between executive control and creativity is not one of opposition but of dynamic balance." },
    { label: "E", text: "**Paragraph E** The neuroscience of insight — the sudden, subjective experience of a solution appearing fully formed in consciousness after a period of incubation — has been a particularly rich area of investigation. Studies using EEG have captured a distinctive burst of high-frequency gamma oscillations in right temporal regions approximately 300 milliseconds before participants report an insight, associated with the sudden integration of previously unconnected neural representations. This neural signature of the \"aha moment\" has been linked to specific preceding conditions: mental relaxation, reduced visual input, and a shift in attention away from conscious problem-solving effort. These findings have practical implications: the common experience of insights occurring in the shower, during a walk, or upon waking may reflect genuine neural dynamics rather than mere coincidence." },
    { label: "F", text: "**Paragraph F** Individual differences in creative ability are substantially — though far from entirely — heritable. Twin studies estimate the heritability of creativity at approximately 20 to 50 percent, depending on the domain and the measure used, leaving substantial room for environmental influences including education, cultural context, openness to experience, and deliberate practice. Research consistently finds that high levels of domain-specific expertise are a precondition for exceptional creative production in most fields; the romantic notion of the untutored genius arriving at great creative work without prior knowledge is largely unsupported by empirical evidence. Expertise, however, can also create cognitive rigidity — the tendency to approach problems through established frameworks rather than genuinely novel perspectives — and the most creatively productive individuals appear to combine deep expertise with an unusual degree of cognitive flexibility and tolerance for ambiguity." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "Match the correct heading (i–ix) to each paragraph (A–F). There are more headings than paragraphs.",
      headingOptions: [
        "I. Why insights often arise in relaxed or distracted states",
        "II. The limits of the left-brain / right-brain creativity model",
        "III. How heredity and environment interact in creative ability",
        "IV. The definition and historical neglect of creativity research",
        "V. Inhibition and its ambiguous role in creative thinking",
        "VI. The three networks that underpin creative cognition",
        "VII. How economic factors shape creative production",
        "VIII. Why experts are always more creative than non-experts",
        "IX. The neural signature of the sudden moment of understanding",
      ],
      questions: [
        { type: "matching_heading", number: 27, paragraph: "A", answer: "IV" },
        { type: "matching_heading", number: 28, paragraph: "B", answer: "II" },
        { type: "matching_heading", number: 29, paragraph: "C", answer: "VI" },
        { type: "matching_heading", number: 30, paragraph: "D", answer: "V" },
        { type: "matching_heading", number: 31, paragraph: "E", answer: "IX" },
        { type: "matching_heading", number: 32, paragraph: "F", answer: "III" },
      ] as MatchingHeadingQuestion[],
    },
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 33, text: "The writer claims that neuroimaging technology has made creativity easier to study scientifically.", answer: "YES" },
        { type: "ynng", number: 34, text: "The DMN is primarily active when people focus on external tasks and problems.", answer: "NO" },
        { type: "ynng", number: 35, text: "Highly creative individuals show higher co-activation of the DMN and ECN than less creative people.", answer: "YES" },
        { type: "ynng", number: 36, text: "Research has conclusively established that suppressing the PFC always improves creative output.", answer: "NO" },
        { type: "ynng", number: 37, text: "Twin studies suggest that the majority of individual differences in creativity are explained by genetic factors.", answer: "NOT GIVEN" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 38, text: "What does the passage say about divergent thinking?",
          options: [
            { letter: "A", text: "It is the only reliable measure of human creativity" },
            { letter: "B", text: "It is exclusively controlled by the right hemisphere of the brain" },
            { letter: "C", text: "It was historically equated with creativity but neuroimaging research has complicated this" },
            { letter: "D", text: "It activates the executive control network more than any other creative task" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 39, text: "What conditions does the research suggest are associated with insight experiences?",
          options: [
            { letter: "A", text: "High levels of focused, intense concentration on the problem" },
            { letter: "B", text: "Engagement with the task through formal, structured analysis" },
            { letter: "C", text: "Mental relaxation, reduced visual input, and reduced conscious problem-solving effort" },
            { letter: "D", text: "High activation of the prefrontal cortex immediately before the insight" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 40, text: "What does the passage suggest about the relationship between expertise and creativity?",
          options: [
            { letter: "A", text: "Expertise is irrelevant to creative production in most domains" },
            { letter: "B", text: "Expertise always inhibits creativity by creating rigid cognitive patterns" },
            { letter: "C", text: "The most creative individuals combine deep expertise with cognitive flexibility" },
            { letter: "D", text: "Creative geniuses typically succeed without significant prior domain knowledge" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

export const testSet4Passages: ReadingPassage[] = [
  set4Passage1,
  set4Passage2,
  set4Passage3,
];

// ══════════════ TEST SET 5 ══════════════
const set5Passage1: ReadingPassage = {
  id: 1,
  title: "Desertification And Land Degradation",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Desertification — the process by which fertile land becomes desert, typically as a result of drought, deforestation, or inappropriate agricultural practices — is among the most serious environmental challenges facing human civilisation in the twenty-first century. The United Nations estimates that approximately one-quarter of the Earth's land surface is subject to desertification risk, and that the livelihoods of over one billion people in more than one hundred countries are threatened by land degradation. The human cost — in food insecurity, displacement, and conflict over diminishing productive land — has made desertification a central concern of international environmental policy." },
    { label: "B", text: "It is important to distinguish desertification from natural desert expansion. True deserts — regions receiving less than 250 millimetres of annual rainfall — have their own dynamic boundaries that shift over geological and historical timescales in response to long-term climatic patterns. Desertification, by contrast, refers specifically to land degradation in dryland areas — regions that receive between 250 and 800 millimetres of annual precipitation — where productive capacity is destroyed by human activity, often in combination with drought. This distinction is significant because it affects both the causal analysis and the potential for remediation: desertification, unlike natural climate change, has a substantial human component that can in principle be addressed." },
    { label: "C", text: "The primary human drivers of desertification are well established. Overgrazing — the degradation of vegetation through livestock densities that exceed the land's carrying capacity — removes protective plant cover, compacts soil through animal trampling, and exposes the underlying surface to wind and water erosion. Deforestation, driven by agricultural expansion and fuelwood collection, similarly removes vegetation that binds soil, regulates water infiltration, and moderates local temperature and humidity. Inappropriate irrigation practices — particularly the use of saline water or the over-irrigation of soils with poor drainage — can cause salinisation and waterlogging, rendering land permanently unproductive. Soil salinisation affects an estimated 20 percent of all irrigated agricultural land globally and is a significant cause of the collapse of ancient irrigated civilisations in the Middle East." },
    { label: "D", text: "Climate change acts as a threat multiplier, extending and intensifying droughts in already-vulnerable regions, shifting rainfall patterns, and increasing extreme weather events that accelerate erosion. The Sahel region of sub-Saharan Africa — a semi-arid zone extending across the continent between the Sahara Desert to the north and the wetter savanna regions to the south — has experienced particularly severe land degradation over the past half-century, driven by a combination of population growth, agricultural expansion, persistent drought, and policy failures. The resulting food insecurity contributed to famines that killed hundreds of thousands of people in the 1970s and 1980s and continues to generate chronic poverty and periodic humanitarian crises." },
    { label: "E", text: "Responses to desertification operate at multiple scales. At the community and landscape level, the most promising approaches combine traditional knowledge with scientific input. The Farmer Managed Natural Regeneration (FMNR) technique, pioneered in Niger by Australian agronomist Tony Rinaudo, involves systematically protecting and managing existing tree and shrub regrowth on agricultural land rather than clearing it. Studies have found that FMNR has restored productive vegetation across an estimated five million hectares in Niger alone, increasing crop yields, improving soil quality, and enhancing resilience to drought. The Great Green Wall initiative — an African Union-led programme to restore a mosaic of vegetation, farmland, and natural landscape across the entire width of the Sahel — represents the most ambitious land restoration programme in history, with the target of restoring 100 million hectares by 2030." },
    { label: "F", text: "International policy frameworks address desertification through the UN Convention to Combat Desertification (UNCCD), established in 1994 as one of the three \"Rio Conventions\" alongside the climate and biodiversity conventions. Implementation, however, has lagged significantly behind aspiration, reflecting the difficulty of mobilising sustained international finance for problems concentrated in the world's poorest countries and the governance challenges of programmes that depend on behaviour change at the farm and community level." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "TRUE / FALSE / NOT GIVEN",
      questions: [
        { type: "tfng", number: 1, text: "Over one billion people's livelihoods are threatened by land degradation according to the UN.", answer: "TRUE" },
        { type: "tfng", number: 2, text: "Natural desert expansion and desertification are caused by identical processes.", answer: "FALSE" },
        { type: "tfng", number: 3, text: "Salinisation affects approximately 20 percent of all irrigated agricultural land worldwide.", answer: "TRUE" },
        { type: "tfng", number: 4, text: "Climate change is described as making desertification problems in vulnerable regions worse.", answer: "TRUE" },
        { type: "tfng", number: 5, text: "The Great Green Wall programme is funded entirely by the United Nations.", answer: "NOT GIVEN" },
      ] as TFNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 10, text: "What is the key difference between natural desert expansion and desertification?",
          options: [
            { letter: "A", text: "Natural desert expansion affects more land area than desertification" },
            { letter: "B", text: "Desertification is primarily caused by human activity and can be addressed" },
            { letter: "C", text: "Desertification only occurs in regions with less than 250mm of rain" },
            { letter: "D", text: "Natural desert expansion is irreversible while desertification is not" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 11, text: "What does the passage say about FMNR in Niger?",
          options: [
            { letter: "A", text: "It was rejected by local farmers as incompatible with traditional practice" },
            { letter: "B", text: "It helped restore approximately five million hectares of productive land" },
            { letter: "C", text: "It required the complete removal of all existing livestock from the region" },
            { letter: "D", text: "It was more expensive to implement than alternative programmes" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 12, text: "Why does the passage suggest international policy implementation on desertification has been slow?",
          options: [
            { letter: "A", text: "The scientific evidence for desertification is disputed" },
            { letter: "B", text: "The affected countries refuse to participate in international agreements" },
            { letter: "C", text: "Funding challenges and governance difficulties at the farm level" },
            { letter: "D", text: "Desertification is less serious than climate change and biodiversity loss" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 13, text: "According to the passage, what caused famines in the Sahel in the 1970s and 1980s?",
          options: [
            { letter: "A", text: "Natural drought alone, without any human contribution" },
            { letter: "B", text: "A combination of population growth, agricultural expansion, drought, and policy failures" },
            { letter: "C", text: "The failure of the Great Green Wall to be implemented in time" },
            { letter: "D", text: "Over-reliance on international food aid which disrupted local farming" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set5Passage2: ReadingPassage = {
  id: 2,
  title: "The Psychology Of Colour In Marketing",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Colour is among the most powerful and immediately processed elements of visual communication, influencing human perception, emotion, and behaviour in ways that are both rapid and largely non-conscious. Marketing practitioners and brand managers have long sought to exploit this influence, using colour to signal product attributes, differentiate from competitors, and provoke desired emotional responses in consumers. The academic study of colour in marketing has generated a substantial body of research over the past four decades, revealing complex interactions between colour, context, and individual variation that complicate simplistic prescriptions about \"best\" colours for specific marketing goals." },
    { label: "B", text: "The foundational question in colour marketing research concerns the existence of universal colour-emotion associations — the idea that specific colours reliably produce consistent emotional or evaluative responses across individuals and cultures. Some associations appear genuinely widespread: research consistently finds that warm colours (red, orange, yellow) tend to increase arousal, perceived energy, and urgency, while cool colours (blue, green) are more typically associated with calm, trust, and reliability. However, the universality of these associations has been challenged by cross-cultural research demonstrating significant variation. White, for example, is associated with purity and weddings in many Western contexts but with mourning in parts of East Asia. Green carries associations with nature and environmental values in European and North American contexts but different resonances in other cultural settings. Marketers operating across multiple cultural contexts must therefore exercise considerable caution about assuming that colour associations identified in one market will transfer reliably to another." },
    { label: "C", text: "The concept of colour appropriateness — whether a colour seems \"right\" for a particular product category or brand personality — has emerged as arguably more important than colour-emotion associations in determining marketing effectiveness. Research by Labrecque and Milne found that brand colour choices that match consumer expectations for a product category tend to be evaluated more positively than those that deviate from category norms, unless the deviation is deliberately used as a differentiation strategy. A bank that uses red rather than the conventional blue or green must work harder to reassure consumers that it is trustworthy; it may attract attention precisely because of the unexpected choice, but the attention comes with an additional persuasion challenge." },
    { label: "D", text: "Colour has been found to affect not only evaluation but also behaviour. Research in retail environments has found that red price tags and promotional signals increase the perceived value of a discount and stimulate purchase urgency more effectively than other colours, consistent with red's associations with urgency and arousal. Blue and green are associated with longer dwell times and more exploratory behaviour in retail settings — useful for categories where extended browsing is beneficial but potentially counterproductive where speed and throughput matter. In digital environments, the colour of call-to-action buttons has been extensively tested; the results are highly context-dependent, and the repeatedly cited finding that orange buttons outperform all others has not been consistently replicated." },
    { label: "E", text: "Gender-related colour preferences are a persistent theme in marketing practice but a source of considerable academic controversy. The association of pink with femininity and blue with masculinity — now so naturalised in Western consumer culture that it is commonly assumed to be universal — is in fact historically recent, having emerged as a commercial convention in the mid-twentieth century rather than reflecting any universal biological tendency. Cross-cultural and historical evidence suggests that colour-gender associations are highly culturally constructed, yet marketing campaigns that exploit these associations remain commercially prevalent, which raises questions about the extent to which marketers are responding to, versus actively reproducing, culturally contingent gender norms." },
    { label: "F", text: "The relationship between colour and perceived quality is another practically important theme. Research has consistently found that colour affects sensory evaluation beyond visual aesthetics: wine tasters describe white wines dyed red with flavour descriptors appropriate to red wine, while the colour of packaging has been found to alter perceived taste intensity, freshness, and quality across a range of food products. These cross-modal effects — where visual stimuli from colour influence non-visual perceptions — suggest that colour is not merely a surface attribute of products and communications but an integral component of the consumer's holistic sensory and evaluative experience." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 14, text: "The writer claims that warm colours consistently increase arousal and perceived urgency across all cultures.", answer: "NOT GIVEN" },
        { type: "ynng", number: 15, text: "The writer suggests that the association of white with mourning in East Asia contradicts the idea of universal colour-emotion links.", answer: "YES" },
        { type: "ynng", number: 16, text: "Research by Labrecque and Milne found that brand colours matching category norms are always evaluated more positively.", answer: "NO" },
        { type: "ynng", number: 17, text: "The writer implies that the use of an unexpected colour can be used as a deliberate differentiation strategy.", answer: "YES" },
        { type: "ynng", number: 18, text: "The writer states that orange call-to-action buttons have been proven to perform best in all digital environments.", answer: "NO" },
        { type: "ynng", number: 19, text: "The writer argues that pink-blue gender associations reflect universal biological tendencies.", answer: "NO" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "SENTENCE COMPLETION",
      questions: [
        {
          type: "sentence_completion", number: 20,
          prefix: "The concept of colour", suffix: "refers to whether a colour seems appropriate for a particular product category.",
          answer: "appropriateness", acceptableAnswers: ["appropriateness"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 21,
          prefix: "In retail settings, blue and green are associated with longer", suffix: "times and more exploratory behaviour.",
          answer: "dwell", acceptableAnswers: ["dwell"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 22,
          prefix: "The pink-blue gender colour association in Western culture is described as historically", suffix: ", having emerged as a mid-twentieth century commercial convention.",
          answer: "recent", acceptableAnswers: ["recent"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 23,
          prefix: "The finding that colour affects non-visual sensory perceptions such as taste is described as a", suffix: "effect.",
          answer: "cross-modal", acceptableAnswers: ["cross-modal"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 24, text: "What does the passage say about the universality of colour-emotion associations?",
          options: [
            { letter: "A", text: "They are completely universal and apply across all cultures" },
            { letter: "B", text: "Some are widespread but cross-cultural research shows significant variation" },
            { letter: "C", text: "They have no basis in scientific research" },
            { letter: "D", text: "They only apply to Western consumers in developed markets" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 25, text: "What did research find about red price tags in retail environments?",
          options: [
            { letter: "A", text: "They reduced the time shoppers spent in stores" },
            { letter: "B", text: "They had no significant effect on purchasing behaviour" },
            { letter: "C", text: "They increased perceived discount value and purchase urgency" },
            { letter: "D", text: "They were preferred by male shoppers more than female shoppers" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 26, text: "According to the passage, what do the cross-modal colour effects on food suggest?",
          options: [
            { letter: "A", text: "Colour is only important for the visual packaging of products" },
            { letter: "B", text: "Consumers cannot distinguish genuine quality from colour-induced quality perceptions" },
            { letter: "C", text: "Colour is an integral part of the consumer's holistic sensory experience" },
            { letter: "D", text: "Food manufacturers should always use bright colours on packaging" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set5Passage3: ReadingPassage = {
  id: 3,
  title: "Democracy And Economic Development: A Contested Relationship",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "**Paragraph A** The relationship between democratic governance and economic development is one of the most intensely debated questions in comparative politics and development economics. Does democracy facilitate or hinder economic growth? Does economic development make democracy more likely to emerge and survive? These questions matter enormously for the billions of people living in countries navigating simultaneous political and economic transitions, and for the international community whose support and engagement is shaped by assumptions about how political systems and economic outcomes interact." },
    { label: "B", text: "**Paragraph B** The modernisation theory associated with W.W. Rostow and Seymour Martin Lipset, influential from the 1950s onwards, argued for a strongly positive relationship between economic development and democracy: as countries become richer, their citizens become better educated, more economically independent, and more demanding of political participation. Rising incomes, Lipset argued, were associated with the development of a sizeable middle class whose property rights, legal security, and civic participation demands are natural allies of democratic governance. This perspective generates the optimistic prediction that economic growth, wherever it occurs, will eventually tend to produce democratic politics." },
    { label: "C", text: "**Paragraph C** Subsequent empirical research has qualified this picture substantially. Cross-national statistical studies have found that while there is a correlation between higher income levels and democratic stability — wealthy democracies rarely revert to authoritarianism — the directional relationship between economic development and democratic transition is more ambiguous. Countries like Singapore and China have achieved extraordinary economic development under authoritarian governance, challenging the assumption that development inevitably produces democratisation. Research by Adam Przeworski and colleagues found that while economic development does not significantly increase the probability that authoritarian regimes will democratise, it does substantially increase the survival probability of democracies once established." },
    { label: "D", text: "**Paragraph D** The reverse question — whether democracy promotes economic growth — has generated an equally complex and contested literature. Theoretical arguments cut both ways. On one side, democratic institutions protect property rights, constrain arbitrary expropriation by rulers, reduce corruption, and create the institutional environment of rule of law and contract enforcement that many economists consider necessary for sustained investment and growth. On the other, democratic systems may generate pressures for redistribution, social spending, and regulatory protection that can impede the adoption of economically efficient policies; electoral cycles may encourage short-term fiscal populism at the expense of longer-term structural reforms; and political instability — which can accompany democratisation — may reduce investment and growth." },
    { label: "E", text: "**Paragraph E** Meta-analyses of the quantitative literature suggest that the effect of democracy on economic growth, while real, is modest and indirect rather than large and direct. Daron Acemoglu and colleagues, in a widely cited 2019 study using improved identification strategies to address the endogeneity problem — the difficulty of establishing causation when democracy and development are mutually influenced — found that democratisation raises GDP per capita by approximately 20 percent over the subsequent 25 years, largely through improvements in secondary education, healthcare, and institutional quality rather than through direct effects on capital accumulation." },
    { label: "F", text: "**Paragraph F** Inequality mediates the democracy-development relationship in important ways. Both very high and very low levels of inequality may undermine democratic quality: extreme inequality gives economic elites disproportionate political influence, potentially \"capturing\" democratic institutions to serve narrow interests; extreme poverty may reduce the informational and participatory capacity of citizens, creating conditions for political manipulation. The concept of \"substantive democracy\" — in which formal democratic procedures are accompanied by the material and educational conditions that enable meaningful participation — highlights that the quality of democratic governance depends not only on electoral rules and civil liberties but on the economic and social foundations that make these rights genuinely accessible." },
    { label: "G", text: "**Paragraph G** The emergence of a distinct form of political economy in several Asian states — sometimes described as developmental authoritarianism — has added further complexity. Countries including South Korea, Taiwan, and Singapore achieved exceptional rates of economic growth under authoritarian or semi-authoritarian governance before transitioning to democracy (in the cases of South Korea and Taiwan) or remaining non-democratic while maintaining high human development indicators (in the case of Singapore). Scholars debate whether these cases represent a genuinely replicable alternative development path or exceptional cases shaped by specific historical, geopolitical, and cultural conditions that cannot be generalised." },
    { label: "H", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "MATCHING INFORMATION",
      questions: [
        { type: "matching_paragraph", number: 27, text: "Evidence that economic development does not guarantee political democratisation", answer: "C" },
        { type: "matching_paragraph", number: 28, text: "An explanation of why democratic systems might slow economic growth", answer: "D" },
        { type: "matching_paragraph", number: 29, text: "A discussion of the conditions under which democracy can become merely formal rather than substantive", answer: "F" },
        { type: "matching_paragraph", number: 30, text: "The argument that economic wealth helps existing democracies survive", answer: "C" },
        { type: "matching_paragraph", number: 31, text: "A description of countries that achieved prosperity under non-democratic governance", answer: "G" },
        { type: "matching_paragraph", number: 32, text: "The proposal that rising income levels generate middle-class demands for democratic rights", answer: "B" },
        { type: "matching_paragraph", number: 33, text: "Findings from research using improved methods to estimate how democracy affects income per capita", answer: "E" },
      ] as MatchingParagraphQuestion[],
    },
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 34, text: "The writer claims that modernisation theory predicted economic growth would eventually produce democracy.", answer: "YES" },
        { type: "ynng", number: 35, text: "Research has found that wealthy democracies frequently revert to authoritarian governance.", answer: "NO" },
        { type: "ynng", number: 36, text: "The writer implies that the relationship between democracy and economic growth is fully settled in academic literature.", answer: "NO" },
        { type: "ynng", number: 37, text: "Acemoglu's 2019 study found that democratisation raises GDP per capita primarily through capital accumulation.", answer: "NO" },
        { type: "ynng", number: 38, text: "The writer suggests that extreme inequality can allow economic elites to capture democratic institutions.", answer: "YES" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 39, text: "What is the \"endogeneity problem\" as described in the passage?",
          options: [
            { letter: "A", text: "The difficulty of measuring GDP growth in democratising countries" },
            { letter: "B", text: "The problem of establishing causation when democracy and development mutually influence each other" },
            { letter: "C", text: "The tendency of authoritarian regimes to manipulate economic statistics" },
            { letter: "D", text: "The inability of cross-national studies to account for cultural differences" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 40, text: "How does the passage characterise the cases of South Korea and Taiwan?",
          options: [
            { letter: "A", text: "Countries that remained authoritarian and became economically successful" },
            { letter: "B", text: "Countries that achieved high growth under authoritarian governance and then democratised" },
            { letter: "C", text: "Countries that demonstrate democracy always precedes economic development" },
            { letter: "D", text: "Countries whose development was financed entirely by international aid" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

export const testSet5Passages: ReadingPassage[] = [
  set5Passage1,
  set5Passage2,
  set5Passage3,
];

// ══════════════ TEST SET 6 ══════════════
const set6Passage1: ReadingPassage = {
  id: 1,
  title: "Ocean Currents And Global Climate",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "The world's oceans are not static bodies of water but dynamic systems of continuous circulation, driven by differences in water temperature and salinity, by the rotation of the Earth, and by the energy of wind and tides. This oceanic circulation plays a fundamental role in regulating the Earth's climate, distributing heat from the tropics towards the poles, moderating temperatures in coastal regions, and supplying the moisture and nutrients that sustain marine and terrestrial ecosystems. Understanding how ocean currents function, and how they may be affected by a warming climate, has become one of the central concerns of contemporary climate science." },
    { label: "B", text: "Ocean currents operate on two principal levels. Surface currents, driven primarily by wind, affect approximately the upper 400 metres of the ocean and are strongly influenced by the Coriolis effect — the deflection of moving objects caused by the Earth's rotation, which causes currents to curve clockwise in the northern hemisphere and anti-clockwise in the southern hemisphere. This produces the large rotating current systems known as gyres, which dominate the circulation of the major ocean basins. Deep-water currents, by contrast, are driven by differences in water density caused by variations in temperature and salinity — a process known as thermohaline circulation. Cold, saltier water is denser and sinks, creating a slow but globally significant movement of water through the deep ocean that completes a full circulation cycle on timescales of roughly 1,000 years." },
    { label: "C", text: "The Atlantic Meridional Overturning Circulation (AMOC) is among the most climatically significant components of thermohaline circulation. In the North Atlantic, warm surface water transported northward from the tropics releases heat to the overlying atmosphere, warming the climate of Western Europe by an estimated 5–10 degrees Celsius relative to what it would otherwise be. As this surface water cools, it becomes denser and sinks to great depths near Greenland and the Nordic Seas, forming North Atlantic Deep Water that flows southward as a deep return current. This overturning circulation acts as a heat pump, and its continuation depends on the maintenance of sufficient salinity contrast between the tropics and the North Atlantic." },
    { label: "D", text: "Climate scientists have raised increasing concern that AMOC may be slowing due to the accelerating melting of the Greenland ice sheet. Freshwater from melting ice is less dense than saltwater and does not sink as readily; large inputs of freshwater to the North Atlantic could therefore weaken the density-driven sinking that drives AMOC. Palaeoclimatic evidence from ice cores and ocean sediments indicates that AMOC has been significantly weaker or has temporarily shut down during past cold periods, with dramatic consequences for Northern Hemisphere climate. Some modelling studies suggest that a substantial weakening of AMOC under current emissions trajectories is possible this century, which could partially offset warming in Western Europe while causing disruption to monsoon systems in the tropics." },
    { label: "E", text: "El Niño-Southern Oscillation (ENSO) is a periodic variation in sea surface temperatures in the central and eastern tropical Pacific Ocean that has major consequences for weather patterns globally. In a normal year, trade winds blow westward across the Pacific, pushing warm surface water towards Indonesia and Australia and allowing cold water to upwell along the South American coast, supporting highly productive fisheries. In El Niño years, the trade winds weaken or reverse, allowing warm water to spread eastward across the Pacific. This shift alters rainfall patterns, causing flooding in parts of South America, drought in Australia and Southeast Asia, and disrupted hurricane seasons in the Atlantic. La Niña events — the opposite phase, with strengthened trade winds and enhanced cold upwelling — produce complementary but opposite regional effects." },
    { label: "F", text: "The oceans absorb approximately 90 percent of the excess heat generated by climate change and roughly 25 to 30 percent of anthropogenic carbon dioxide emissions, substantially moderating the pace of surface warming and atmospheric CO₂ accumulation. However, this buffering function comes at a cost: heat absorption is causing ocean warming and thermal expansion that contributes to sea level rise, while CO₂ absorption drives ocean acidification — the lowering of seawater pH — which threatens the calcification processes of corals, molluscs, and many plankton species on which marine food webs depend." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "TRUE / FALSE / NOT GIVEN",
      questions: [
        { type: "tfng", number: 1, text: "Surface currents in the northern hemisphere are deflected clockwise due to the Coriolis effect.", answer: "TRUE" },
        { type: "tfng", number: 2, text: "A complete cycle of thermohaline circulation takes approximately 1,000 years.", answer: "TRUE" },
        { type: "tfng", number: 3, text: "AMOC warms Western Europe by an estimated 5–10 degrees Celsius.", answer: "TRUE" },
        { type: "tfng", number: 4, text: "Climate scientists believe AMOC will definitely shut down completely within this century.", answer: "FALSE" },
        { type: "tfng", number: 5, text: "El Niño years are associated with drought conditions in Australia and Southeast Asia.", answer: "TRUE" },
        { type: "tfng", number: 6, text: "The oceans absorb approximately half of all anthropogenic carbon dioxide emissions.", answer: "FALSE" },
      ] as TFNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 11, text: "What concern does the passage raise about melting of the Greenland ice sheet?",
          options: [
            { letter: "A", text: "It will cause immediate sea level rise that will flood coastal cities" },
            { letter: "B", text: "Freshwater input may weaken the density-driven sinking that drives AMOC" },
            { letter: "C", text: "It will increase the salinity of the North Atlantic, strengthening AMOC" },
            { letter: "D", text: "It will raise ocean temperatures, accelerating thermohaline circulation" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 12, text: "What happens during normal (non-El Niño) Pacific Ocean conditions?",
          options: [
            { letter: "A", text: "Warm water accumulates along the South American coast" },
            { letter: "B", text: "Trade winds push warm water toward South America" },
            { letter: "C", text: "Cold water upwells along the South American coast, supporting fisheries" },
            { letter: "D", text: "Rainfall patterns are disrupted across Southeast Asia" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 13, text: "According to the passage, why is the ocean's absorption of CO₂ a mixed benefit?",
          options: [
            { letter: "A", text: "It reduces the amount of CO₂ available for plant photosynthesis" },
            { letter: "B", text: "It causes ocean acidification that threatens marine organisms dependent on calcification" },
            { letter: "C", text: "It accelerates ocean warming and sea level rise" },
            { letter: "D", text: "It disrupts thermohaline circulation by changing water salinity" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set6Passage2: ReadingPassage = {
  id: 2,
  title: "Performance Appraisal In Contemporary Organisations",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Performance appraisal — the systematic evaluation of an employee's work performance, contribution, and development needs — is one of the most universally practised and most widely criticised human resource management processes. In theory, effective performance appraisal serves multiple important functions simultaneously: providing employees with clear feedback on their performance, supporting decisions about pay, promotion, and development, identifying organisational capability gaps, and building accountability for results. In practice, the gap between the theory and the experience of appraisal is often wide, and dissatisfaction with conventional appraisal systems has driven a substantial reconsideration of how performance should be evaluated and managed." },
    { label: "B", text: "Traditional annual appraisal systems, in which a manager rates an employee's performance against predefined criteria at year-end, have attracted sustained criticism on both psychometric and practical grounds. Psychometrically, research has found that performance ratings are heavily influenced by rater biases that have little to do with actual performance. The halo effect — the tendency for an overall positive or negative impression of an employee to influence ratings of specific performance dimensions — is one of the most consistently demonstrated biases in appraisal research. Recency bias causes raters to overweight recent events relative to performance over the full evaluation period. Leniency bias, in which most employees receive positive ratings regardless of actual performance, is widespread and substantially reduces the discriminant validity of rating systems. Idiosyncratic rater effects — whereby ratings reflect the rater's personal standards and tendencies as much as the ratee's performance — are estimated to account for more than half of the variance in performance ratings in some studies." },
    { label: "C", text: "On practical grounds, the annual appraisal cycle is poorly matched to the cadence of modern knowledge work, in which project timescales, team compositions, and performance requirements change rapidly. Feedback delivered months after the relevant behaviour has limited developmental utility. The formal, high-stakes nature of the appraisal conversation can create defensiveness in employees and discomfort in managers, and the administrative burden of completing appraisals is consistently cited as a source of manager dissatisfaction. Perhaps most fundamentally, the combination of evaluative and developmental functions in a single conversation creates an inherent tension: employees who know that the discussion will influence pay and promotion decisions have strong incentives to present themselves positively rather than engaging honestly with developmental feedback." },
    { label: "D", text: "Partly in response to these criticisms, a number of large organisations have moved away from annual ratings — most prominently General Electric, Accenture, and Deloitte in the mid-2010s — towards more frequent, informal, \"check-in\" conversations focused on current work priorities and forward-looking development rather than historical rating. These approaches emphasise feedback as a continuous process rather than a discrete annual event, aim to strengthen manager-employee dialogue, and in some cases eliminate or de-emphasise numerical performance ratings entirely. Advocates argue that more frequent feedback produces better learning and development outcomes and that separating developmental conversations from evaluative ones allows employees to be more open." },
    { label: "E", text: "The evidence base for these newer approaches remains limited and mixed. Without formal ratings, organisations face challenges in making defensible pay, promotion, and termination decisions, and there is a risk that the absence of structured evaluation processes leads to greater reliance on uncodified and potentially biased managerial judgment. Qualitative research suggests that the effectiveness of check-in-based approaches depends heavily on manager capability and willingness to engage in regular, substantive development conversations — a capability that is not uniformly distributed and that requires significant investment in manager training." },
    { label: "F", text: "Multisource feedback — the collection of performance information from multiple raters including peers, subordinates, and internal customers as well as the immediate manager — offers one partial response to the limitations of single-rater evaluation. By aggregating perspectives from those who observe different dimensions of an individual's work, multisource feedback can produce a more complete and less bias-prone picture of performance. However, its effectiveness as a developmental tool depends critically on the quality of the feedback culture: in organisations where honest critical feedback is not the norm, ratings from peers and subordinates may suffer from the same leniency bias as managerial ratings." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 14, text: "The writer argues that performance appraisal systems always fulfil their theoretical functions effectively.", answer: "NO" },
        { type: "ynng", number: 15, text: "The halo effect causes raters to base specific dimension ratings on their overall impression of the employee.", answer: "YES" },
        { type: "ynng", number: 16, text: "The writer implies that annual appraisal cycles are poorly suited to the pace of modern knowledge work.", answer: "YES" },
        { type: "ynng", number: 17, text: "All organisations that eliminated annual ratings subsequently improved their performance outcomes.", answer: "NOT GIVEN" },
        { type: "ynng", number: 18, text: "The writer suggests that the effectiveness of check-in approaches depends heavily on manager quality.", answer: "YES" },
        { type: "ynng", number: 19, text: "Multisource feedback always eliminates leniency bias in organisations that adopt it.", answer: "NO" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "SENTENCE COMPLETION",
      questions: [
        {
          type: "sentence_completion", number: 20,
          prefix: "The tendency to overweight recent events in performance ratings is known as", suffix: "bias.",
          answer: "recency", acceptableAnswers: ["recency"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 21,
          prefix: "The combination of", suffix: "and developmental functions in the same conversation creates an inherent tension in appraisal.",
          answer: "evaluative", acceptableAnswers: ["evaluative"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 22,
          prefix: "Organisations without formal ratings risk relying more heavily on", suffix: "managerial judgment.",
          answer: "uncodified", acceptableAnswers: ["uncodified"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 23,
          prefix: "For multisource feedback to work well as a developmental tool, organisations need a strong", suffix: "culture.",
          answer: "feedback", acceptableAnswers: ["feedback"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 24, text: "What does the passage say about idiosyncratic rater effects?",
          options: [
            { letter: "A", text: "They are caused by insufficient manager training" },
            { letter: "B", text: "They may account for more than half of the variance in performance ratings" },
            { letter: "C", text: "They only affect junior employees in large organisations" },
            { letter: "D", text: "They can be eliminated by using standardised rating forms" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 25, text: "What challenge do organisations face when they eliminate formal performance ratings?",
          options: [
            { letter: "A", text: "Employees lose motivation without formal grades" },
            { letter: "B", text: "It becomes difficult to make defensible decisions about pay and promotion" },
            { letter: "C", text: "Government regulations require formal ratings in most countries" },
            { letter: "D", text: "Managers become overloaded with additional administrative work" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 26, text: "According to the passage, what are the potential benefits of more frequent check-in conversations?",
          options: [
            { letter: "A", text: "They are cheaper to administer than annual appraisal systems" },
            { letter: "B", text: "They are preferred by all employees regardless of their performance level" },
            { letter: "C", text: "They allow employees to be more open by separating development from evaluation" },
            { letter: "D", text: "They have been proven to consistently outperform annual ratings in all studies" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set6Passage3: ReadingPassage = {
  id: 3,
  title: "The Philosophy Of Mind: Consciousness And Its Hard Problem",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "**Paragraph A** Consciousness — the subjective, first-person experience of being aware: seeing colours, feeling pain, tasting coffee, experiencing the redness of red — is perhaps the most profound and least understood phenomenon in all of science and philosophy. The \"hard problem\" of consciousness, a phrase coined by philosopher David Chalmers in 1995, refers to the challenge of explaining why physical processes in the brain give rise to subjective experience at all. This is distinguished from what Chalmers calls the \"easy problems\" — explaining how the brain processes sensory information, integrates inputs, controls behaviour, and produces verbal reports about internal states. These easy problems are scientifically tractable; they can in principle be solved by understanding the functional mechanisms of the brain. The hard problem, by contrast, involves explaining why any of this processing is accompanied by inner experience — why there is \"something it is like\" to be a conscious organism." },
    { label: "B", text: "**Paragraph B** The dominant framework in twentieth-century philosophy of mind was physicalism — the view that mental states are ultimately physical states, fully explicable in terms of brain processes. Physicalism comes in several varieties. Type identity theory holds that mental state types are identical to brain state types: pain, for example, just is the firing of C-fibre neurons. Functionalism, more influential in cognitive science, holds that mental states are defined by their functional roles — their causal relationships to sensory inputs, behavioural outputs, and other mental states — rather than by any particular physical substrate. On a functionalist view, a silicon-based computer could in principle be conscious if it implemented the right functional organisation." },
    { label: "C", text: "**Paragraph C** The hard problem poses a fundamental challenge to both identity theory and functionalism. Even if we could produce a complete map of every neural process associated with seeing red, we would still face the question of why these processes are experienced as the subjective redness of red rather than simply processing without any accompanying inner quality. Critics of functionalism argue that a computer implementing the same functional organisation as a human brain would be a \"philosophical zombie\" — functionally identical to a conscious being but lacking any inner experience. The zombie thought experiment is controversial, and many philosophers dispute whether such a being is genuinely conceivable; but it has been enormously influential in clarifying what is distinctive and difficult about the problem." },
    { label: "D", text: "**Paragraph D** Integrated Information Theory (IIT), developed by neuroscientist Giulio Tononi, represents one of the most formally developed attempts to address the hard problem within a scientific framework. IIT proposes that consciousness is identical to integrated information — defined technically as the degree to which a system generates more information as a unified whole than the sum of its parts, measured by a quantity called phi (Φ). On this view, any system with sufficiently high phi is conscious to some degree, regardless of whether it is biological; conversely, systems with low or no integration — such as a simple grid of individually connected transistors — would have minimal or no consciousness even if very complex. IIT generates specific, testable predictions about which physical systems are conscious, and some of its predictions have been confirmed in experimental neuroscience, though the theory remains highly contested." },
    { label: "E", text: "**Paragraph E** Panpsychism — the view that consciousness or proto-conscious properties are fundamental features of all matter, not a property that emerges from sufficiently complex physical organisation — has enjoyed a remarkable revival in academic philosophy of mind over the past two decades after a long period of marginalisation. Proponents argue that panpsychism avoids the hard problem by denying that consciousness needs to be explained as emerging from non-conscious matter; if proto-conscious properties are present at the most fundamental levels of reality, then complex consciousness in biological organisms represents a combination and elaboration of these properties rather than their mysterious generation from nothing. Critics respond with the \"combination problem\": even if elementary particles have some form of proto-conscious properties, it is unclear how these combine to produce the unified, rich phenomenal consciousness of human experience." },
    { label: "F", text: "**Paragraph F** The practical implications of consciousness research extend well beyond academic philosophy. Questions about which entities are morally considerable — whose experiences matter morally and who can be harmed — depend in part on which entities are conscious. As artificial intelligence systems develop increasingly sophisticated behavioural capacities, the question of whether they are or could become conscious has moved from science fiction to urgent bioethical inquiry. Advances in anaesthesia monitoring, the assessment of consciousness in patients with disorders of consciousness (including those in vegetative states), and debates about animal welfare all involve empirical and conceptual questions about the nature and distribution of consciousness that philosophy of mind and neuroscience are only beginning to address." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "Match the correct heading (i–viii) to paragraphs A–F.",
      headingOptions: [
        "I. A mathematical theory that attempts to quantify conscious experience",
        "II. Why the problem of consciousness remains fundamentally different from other scientific questions",
        "III. The ethical and practical stakes of understanding consciousness",
        "IV. The argument that conscious properties are present throughout all matter",
        "V. Two versions of the view that mind and brain are identical",
        "VI. Why functional accounts of mind fail to solve the core problem",
        "VII. Evidence that consciousness evolved independently in multiple species",
        "VIII. The difference between tractable and intractable questions in consciousness research",
      ],
      questions: [
        { type: "matching_heading", number: 27, paragraph: "A", answer: "VIII" },
        { type: "matching_heading", number: 28, paragraph: "B", answer: "V" },
        { type: "matching_heading", number: 29, paragraph: "C", answer: "VI" },
        { type: "matching_heading", number: 30, paragraph: "D", answer: "I" },
        { type: "matching_heading", number: 31, paragraph: "E", answer: "IV" },
        { type: "matching_heading", number: 32, paragraph: "F", answer: "III" },
      ] as MatchingHeadingQuestion[],
    },
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 33, text: "The writer states that Chalmers coined the phrase \"hard problem of consciousness\" in 1995.", answer: "YES" },
        { type: "ynng", number: 34, text: "The writer implies that the easy problems of consciousness have been fully solved by neuroscience.", answer: "NOT GIVEN" },
        { type: "ynng", number: 35, text: "Functionalism allows for the possibility that a non-biological system could be conscious.", answer: "YES" },
        { type: "ynng", number: 36, text: "The writer states that Integrated Information Theory has been accepted as the correct account of consciousness.", answer: "NO" },
        { type: "ynng", number: 37, text: "The writer suggests that panpsychism avoids the hard problem by proposing that consciousness is always present in some form.", answer: "YES" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 38, text: "What does the philosophical zombie thought experiment illustrate?",
          options: [
            { letter: "A", text: "The possibility that other humans may lack consciousness" },
            { letter: "B", text: "That functional equivalence does not necessarily entail the presence of inner experience" },
            { letter: "C", text: "That biological systems are always more conscious than digital ones" },
            { letter: "D", text: "That pain and other sensations are not genuine mental states" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 39, text: "What is the \"combination problem\" for panpsychism?",
          options: [
            { letter: "A", text: "It is unclear how panpsychism can be tested experimentally" },
            { letter: "B", text: "Panpsychism cannot explain why matter becomes conscious at all" },
            { letter: "C", text: "It is unclear how proto-conscious properties of elementary particles combine to produce unified human consciousness" },
            { letter: "D", text: "Panpsychism predicts that all physical objects are equally conscious" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 40, text: "According to the passage, why have questions about AI consciousness become practically urgent?",
          options: [
            { letter: "A", text: "AI systems have already been shown to be conscious" },
            { letter: "B", text: "As AI develops sophisticated behaviours, questions about whether it can be morally harmed become relevant" },
            { letter: "C", text: "AI systems are now being used to treat patients with disorders of consciousness" },
            { letter: "D", text: "Governments need to determine whether AI systems should have voting rights" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

export const testSet6Passages: ReadingPassage[] = [
  set6Passage1,
  set6Passage2,
  set6Passage3,
];

// ══════════════ TEST SET 7 ══════════════
const set7Passage1: ReadingPassage = {
  id: 1,
  title: "The Silk Road",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "The Silk Road — the network of ancient trade routes connecting China to the Mediterranean world across Central Asia — was not a single road in any conventional sense but a shifting web of overland and maritime paths along which goods, people, ideas, and diseases moved over more than a millennium. At its height, from approximately the second century BCE to the fifteenth century CE, it constituted the world's most important channel of transcontinental exchange, linking the Han and Tang dynasties of China with the Parthian and Sasanian empires of Persia, the Byzantine Empire, and eventually the trading ports of the Mediterranean and the Indian Ocean world." },
    { label: "B", text: "The name \"Silk Road\" is a modern European coinage, attributed to German geographer Ferdinand von Richthofen, who used it in 1877 to describe the routes along which Chinese silk was traded westward. The term's emphasis on a single commodity is misleading; silk was certainly among the most valued Chinese exports, prized in Rome and Constantinople for both its beauty and its rarity, but the routes carried an enormously diverse array of goods. Westward-flowing commodities included not only silk but porcelain, spices, jade, bronze, and paper. Eastward-flowing goods included glass, wool textiles, gold and silver, horses — crucially important to Chinese military power — and later cotton and enslaved people. The exchange was not merely commercial but profoundly cultural." },
    { label: "C", text: "Buddhism provides perhaps the most dramatic example of cultural transmission along the Silk Road. Originating in the Indian subcontinent in the fifth or fourth century BCE, Buddhism spread northward and eastward along the trade routes, reaching Central Asia by the second century BCE and China by the first century CE, where it would profoundly reshape Chinese civilisation over the following centuries. Merchants, monks, and missionaries travelled together along the routes, and Buddhist monasteries along the way served simultaneously as waypoints for weary travellers and as centres of learning, translation, and artistic production. The Dunhuang caves in northwest China — sealed in the eleventh century and rediscovered in 1900 — preserved an extraordinary archive of Buddhist manuscripts, paintings, and artefacts spanning multiple languages and artistic traditions." },
    { label: "D", text: "The Islamic conquest of Central Asia in the seventh and eighth centuries transformed the political landscape of the Silk Road without ending it. Arab, Persian, and Sogdian merchants — the latter from the region of modern-day Uzbekistan and Tajikistan, who had dominated Central Asian trade for centuries — continued to operate along the routes, now often within a unified Islamic commercial and legal framework that facilitated long-distance trade through shared instruments of credit and contract. The subsequent Mongol conquest of the thirteenth century, disruptive in its military phase, produced an unanticipated commercial benefit: the Pax Mongolica — the relative peace imposed across the vast Mongol Empire — briefly opened the entirety of the overland route to safe and legally protected travel, enabling journeys such as that of Marco Polo from Venice to China in the 1270s." },
    { label: "E", text: "The decline of the Silk Road as a primary channel of Eurasian exchange was gradual and multi-causal. The fragmentation of the Mongol Empire restored political barriers and insecurity along the overland routes. The Ottoman consolidation of control over routes through the Middle East in the fifteenth century imposed commercial barriers for European merchants seeking direct access to Asian goods. Most decisively, the development of oceanic navigation — Portuguese and Spanish exploration of the sea routes around Africa to Asia from the late fifteenth century — provided European merchants with direct, competitively superior access to Asian trade goods without the cost, delay, and insecurity of overland transit. The Silk Road never disappeared entirely, but its commercial significance was progressively eclipsed by the oceanic trade systems that shaped the early modern world." },
    { label: "F", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "TRUE / FALSE / NOT GIVEN",
      questions: [
        { type: "tfng", number: 1, text: "The Silk Road was a single, clearly defined road connecting China to the Mediterranean.", answer: "FALSE" },
        { type: "tfng", number: 2, text: "Ferdinand von Richthofen introduced the term \"Silk Road\" in the nineteenth century.", answer: "TRUE" },
        { type: "tfng", number: 3, text: "Buddhism spread from India to China primarily through military conquest.", answer: "FALSE" },
        { type: "tfng", number: 4, text: "The Dunhuang caves were sealed in the eleventh century and rediscovered in 1900.", answer: "TRUE" },
        { type: "tfng", number: 5, text: "The Pax Mongolica temporarily made overland travel across Asia safer for merchants.", answer: "TRUE" },
        { type: "tfng", number: 6, text: "Portuguese and Spanish exploration of oceanic routes reduced the commercial importance of the Silk Road.", answer: "TRUE" },
      ] as TFNGQuestion[],
    },
    {
      instructions: "SENTENCE COMPLETION",
      questions: [
        {
          type: "sentence_completion", number: 7,
          prefix: "Horses were among the key eastward-flowing goods along the Silk Road, being", suffix: "to Chinese military power.",
          answer: "crucially important", acceptableAnswers: ["crucially important"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 8,
          prefix: "The Sogdian merchants who dominated Central Asian trade came from the region of modern-day", suffix: "and Tajikistan.",
          answer: "Uzbekistan", acceptableAnswers: ["Uzbekistan"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 9,
          prefix: "Buddhist", suffix: "along the Silk Road served as both rest stops for travellers and centres of learning.",
          answer: "monasteries", acceptableAnswers: ["monasteries"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 10,
          prefix: "The rise of", suffix: "navigation from the late fifteenth century gave European merchants direct sea access to Asian goods.",
          answer: "oceanic", acceptableAnswers: ["oceanic"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 11, text: "Why does the passage describe the name \"Silk Road\" as misleading?",
          options: [
            { letter: "A", text: "Silk was never actually traded along the route" },
            { letter: "B", text: "The route emphasises a single commodity but many diverse goods were traded" },
            { letter: "C", text: "The roads were named after German geographers, not Chinese merchants" },
            { letter: "D", text: "Silk was only a minor part of Chinese export trade" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 12, text: "What commercial advantage did the Pax Mongolica provide?",
          options: [
            { letter: "A", text: "It established a single universal currency across all Mongol-controlled territories" },
            { letter: "B", text: "It allowed the entirety of the overland route to be safely travelled for a period" },
            { letter: "C", text: "It permanently ended conflict between Central Asian merchant groups" },
            { letter: "D", text: "It gave Venetian merchants exclusive access to the Chinese market" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 13, text: "According to the passage, which factor was most decisive in the decline of the Silk Road?",
          options: [
            { letter: "A", text: "Ottoman military conquest of China" },
            { letter: "B", text: "The spread of disease along the overland routes" },
            { letter: "C", text: "The development of oceanic navigation providing a superior sea route" },
            { letter: "D", text: "The collapse of demand for Chinese silk in Europe" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set7Passage2: ReadingPassage = {
  id: 2,
  title: "Diversity, Equity And Inclusion In The Workplace",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Diversity, equity, and inclusion (DEI) — a cluster of organisational practices and values aimed at creating workplaces that are representative of and fair to people of all backgrounds, identities, and characteristics — has become one of the most prominent and contested areas of corporate strategy and human resources management. Proponents argue that diverse and inclusive organisations perform better, innovate more effectively, and are better positioned to serve diverse customer bases. Critics question whether DEI programmes as currently implemented achieve their stated goals, whether they cause unintended harms, and whether the framing of diversity as primarily a business performance issue is ethically adequate. The empirical and normative debates are both substantial." },
    { label: "B", text: "The business case for diversity has been influential in driving corporate DEI investment. McKinsey's \"Diversity Wins\" series, drawing on data from hundreds of large companies across multiple countries, has consistently found positive correlations between racial, ethnic, and gender diversity in corporate leadership and financial outperformance relative to industry peers. The theoretical mechanisms proposed for this relationship include the \"information advantage\" of diverse teams — their ability to draw on a wider range of perspectives and problem-solving approaches — and better alignment with increasingly diverse customer and employee populations. However, correlation studies cannot establish causation, and some researchers have challenged the robustness of the McKinsey findings, arguing that they may partly reflect the tendency of already high-performing companies to invest more in all aspects of talent management including diversity." },
    { label: "C", text: "Unconscious bias training — one of the most widely deployed DEI interventions — aims to make employees aware of the automatic, non-conscious cognitive processes that influence their judgments about people and to reduce the impact of these processes on hiring, evaluation, and promotion decisions. Despite its prevalence, the evidence for the effectiveness of unconscious bias training in actually changing behaviour or outcomes is weak. A comprehensive review by Kalev and Dobbin found that standalone awareness training not followed by structural changes produced no significant improvement in diversity outcomes, and in some cases was associated with negative reactions among participants who felt unfairly labelled or blamed. More effective approaches tend to combine awareness training with structural changes to the processes through which hiring and promotion decisions are made — including structured interviews, standardised evaluation criteria, and accountability mechanisms." },
    { label: "D", text: "Structural approaches to DEI seek to reduce the influence of bias by changing the systems and processes through which decisions are made rather than relying solely on changing individual attitudes. Blind application processes — removing names and demographic information from applications before the initial screening stage — have shown positive results in experimental settings for reducing bias in hiring. Mandatory diversity panels for senior appointments ensure that decision-making groups are diverse rather than homogeneous. Sponsorship programmes — in which senior leaders actively advocate for the advancement of high-potential employees from under-represented groups — have shown stronger effects on career advancement than mentoring programmes, which can remain entirely informal and non-committal." },
    { label: "E", text: "The concept of inclusion — creating environments in which all employees feel genuinely valued, heard, and able to contribute their full capabilities — is increasingly recognised as distinct from and complementary to diversity. A workforce can be demographically diverse without being genuinely inclusive: if employees from under-represented groups experience microaggressions, are excluded from informal networks, or feel unable to bring their authentic selves to work, the potential performance benefits of diversity may not materialise. Research by Bourke and Titus has found that employees who experience inclusion report higher levels of innovation, engagement, and commitment than those who do not, regardless of their demographic characteristics." },
    { label: "F", text: "Pay equity analysis — the systematic examination of whether employees in equivalent roles with equivalent qualifications and experience are paid equitably regardless of gender, race, or other characteristics — has become an important DEI accountability mechanism and is increasingly required or encouraged by legislation in various jurisdictions. Studies consistently find unexplained pay gaps in most organisations, though the size and causes of these gaps are contested. Ensuring pay equity requires not only correcting documented inequities but addressing the structural factors — occupational segregation, part-time and career break penalties, and negotiation norms — that generate them in the first place." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 14, text: "The writer claims that proponents of DEI believe diverse organisations perform better and innovate more.", answer: "YES" },
        { type: "ynng", number: 15, text: "The McKinsey \"Diversity Wins\" studies have been accepted by all researchers as proving that diversity causes financial outperformance.", answer: "NO" },
        { type: "ynng", number: 16, text: "The writer implies that unconscious bias training, when used alone, is generally ineffective at changing actual outcomes.", answer: "YES" },
        { type: "ynng", number: 17, text: "Blind application processes have shown positive results for reducing hiring bias in experimental settings.", answer: "YES" },
        { type: "ynng", number: 18, text: "The writer states that pay equity legislation is now mandatory in all countries.", answer: "NOT GIVEN" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 23, text: "What do critics of the McKinsey diversity studies argue?",
          options: [
            { letter: "A", text: "Diverse companies always perform worse than homogeneous ones" },
            { letter: "B", text: "The correlation may partly reflect high-performing companies investing more broadly in talent management" },
            { letter: "C", text: "The studies were conducted in too few countries to be reliable" },
            { letter: "D", text: "Gender diversity is the only type of diversity that affects financial performance" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 24, text: "What is described as the main difference between diversity and inclusion?",
          options: [
            { letter: "A", text: "Diversity is about hiring while inclusion concerns pay equity" },
            { letter: "B", text: "A workforce can be demographically diverse yet not genuinely inclusive in terms of employee experience" },
            { letter: "C", text: "Inclusion is only relevant to senior management levels" },
            { letter: "D", text: "Diversity measures are legally required while inclusion is voluntary" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 25, text: "According to the passage, which approach has shown stronger career advancement effects than mentoring?",
          options: [
            { letter: "A", text: "Unconscious bias training workshops" },
            { letter: "B", text: "Blind application processes" },
            { letter: "C", text: "Sponsorship programmes involving active senior advocacy" },
            { letter: "D", text: "Pay equity audits" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 26, text: "What does the passage suggest is necessary to address pay gaps fully?",
          options: [
            { letter: "A", text: "Making all salary information publicly visible within organisations" },
            { letter: "B", text: "Requiring government approval for all pay decisions" },
            { letter: "C", text: "Both correcting documented inequities and addressing structural factors that create them" },
            { letter: "D", text: "Eliminating bonus pay for all employees regardless of performance" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set7Passage3: ReadingPassage = {
  id: 3,
  title: "Cooperation, Competition, And Evolutionary Theory",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "**Paragraph A** The nature of competition and cooperation in biological evolution has been a central and contested theme since Darwin first articulated the theory of natural selection in 1859. The popular image of evolution as \"red in tooth and claw\" — a ceaseless competitive struggle in which only the fittest survive — captures an important aspect of evolutionary dynamics while profoundly misrepresenting others. Cooperative behaviour is in fact widespread across the biological world, from the cellular organisation of multicellular organisms to the intricate symbioses between species in complex ecosystems. Explaining how cooperation can evolve and persist in the face of competitive pressures has been one of the central problems of evolutionary biology for over half a century." },
    { label: "B", text: "**Paragraph B** The puzzle of cooperation is sharpest in relation to altruistic behaviour — actions that benefit others at a cost to the actor. Under a narrow reading of individual-level natural selection, altruism should not evolve: genes that code for costly helping behaviours would be less frequently represented in subsequent generations than genes coding for selfish equivalents. W.D. Hamilton's theory of inclusive fitness, developed in 1964, provided the first rigorous solution to this puzzle. Hamilton's rule states that altruism will be favoured by natural selection when the fitness cost to the actor (C) is less than the fitness benefit to the recipient (B) multiplied by the coefficient of genetic relatedness between them (r). In symbols: rB > C. This relationship explains why altruism evolves most readily between close genetic relatives — an insight formalised as kin selection." },
    { label: "C", text: "**Paragraph C** Kin selection explains cooperation among relatives but does not account for the widespread cooperation observed between genetically unrelated individuals. Reciprocal altruism, theorised by Robert Trivers in 1971, proposes that cooperation between non-kin can evolve if individuals repeatedly interact over time and if \"cheating\" — accepting benefits without reciprocating — can be detected and punished by withholding future cooperation. This mechanism, analogous to the logic of iterated game theory, can sustain stable cooperative arrangements between unrelated individuals as long as the probability of future interaction is sufficiently high and the benefit-cost ratio of cooperation is favourable. The classic game-theoretic formulation is the Prisoner's Dilemma, in which mutual defection is the Nash equilibrium of a single interaction but repeated play can produce the evolution of cooperative strategies such as Tit-for-Tat." },
    { label: "D", text: "**Paragraph D** Group selection — the idea that natural selection acts on groups of individuals as units rather than solely on individuals — has had a contested and fluctuating status in evolutionary biology. After being largely rejected in the 1960s in favour of gene-level and individual-level selection theories, group selection has experienced a partial revival under the framework of multilevel selection theory, which proposes that selection simultaneously occurs at multiple hierarchical levels: genes, individuals, and groups. Research has found that the conditions under which group selection can overcome individual-level selection are narrow but real: group-structured populations where competition primarily occurs between groups rather than within them can produce the evolution of group-beneficial traits that would not evolve under purely individual selection." },
    { label: "E", text: "**Paragraph E** Mutualism — cooperative relationships between different species in which both parties benefit — represents a particularly striking form of biological cooperation. The relationship between flowering plants and their pollinators, between gut bacteria and their vertebrate hosts, and between nitrogen-fixing bacteria and leguminous plants are all examples of mutualisms that have profoundly shaped the evolution of the species involved and the ecosystems they inhabit. Evolutionary biologists have proposed that many of the most fundamental transitions in the history of life — including the origin of eukaryotic cells through the endosymbiotic merger of ancestral bacteria, and the emergence of multicellularity — can be understood as the evolution of extreme cooperation at new levels of biological organisation." },
    { label: "F", text: "**Paragraph F** The evolution of human cooperation presents distinctive challenges and insights. Humans cooperate extensively with non-kin and at scales far exceeding anything observed in other animal species; cooperation in large anonymous groups — between individuals who will never meet again and who share no special genetic relationship — is a defining feature of human social life that has enabled the construction of extraordinarily complex civilisations. Evolutionary anthropologists debate whether standard biological mechanisms of kin selection and reciprocal altruism, perhaps extended by cultural transmission of cooperative norms, are sufficient to explain this scale of cooperation, or whether distinctively human psychological and cultural mechanisms — including norm enforcement, reputation, and shared intentionality — are required. This debate has significant implications for how human social behaviour, institutions, and moral psychology are understood." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "MATCHING INFORMATION",
      questions: [
        { type: "matching_paragraph", number: 27, text: "A description of how cooperation can evolve between genetically unrelated individuals through repeated interaction", answer: "C" },
        { type: "matching_paragraph", number: 28, text: "An argument that evolutionary theory does not reduce to simple competition", answer: "A" },
        { type: "matching_paragraph", number: 29, text: "The proposal that the evolution of extreme cooperation explains major transitions in life's history", answer: "E" },
        { type: "matching_paragraph", number: 30, text: "A mathematical condition under which helping behaviour will be favoured by natural selection", answer: "B" },
        { type: "matching_paragraph", number: 31, text: "A discussion of why human cooperation raises unique evolutionary questions", answer: "F" },
        { type: "matching_paragraph", number: 32, text: "The argument that selection can occur simultaneously at multiple biological levels", answer: "D" },
      ] as MatchingParagraphQuestion[],
    },
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 33, text: "The writer states that Hamilton developed inclusive fitness theory in 1964.", answer: "YES" },
        { type: "ynng", number: 34, text: "The writer implies that reciprocal altruism requires individuals to interact only once for cooperation to evolve.", answer: "NO" },
        { type: "ynng", number: 35, text: "The writer suggests that group selection was completely abandoned after the 1960s with no subsequent revival.", answer: "NO" },
        { type: "ynng", number: 36, text: "Mutualism is presented as a cooperative relationship that benefits both species involved.", answer: "YES" },
        { type: "ynng", number: 37, text: "The writer argues that standard biological mechanisms are sufficient to fully explain human cooperation.", answer: "NOT GIVEN" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 38, text: "What is Hamilton's rule, as described in the passage?",
          options: [
            { letter: "A", text: "Altruism evolves when the genetic benefit to the actor exceeds the cost to the recipient" },
            { letter: "B", text: "Altruism evolves when relatedness multiplied by recipient benefit exceeds the actor's cost" },
            { letter: "C", text: "Altruism evolves only between siblings who share identical genes" },
            { letter: "D", text: "Altruism cannot evolve under natural selection in any circumstances" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 39, text: "What does the Tit-for-Tat strategy illustrate in the context of the Prisoner's Dilemma?",
          options: [
            { letter: "A", text: "That cooperation always breaks down in competitive environments" },
            { letter: "B", text: "That repeated interaction can produce cooperation even between self-interested agents" },
            { letter: "C", text: "That defection is always the optimal strategy in evolutionary games" },
            { letter: "D", text: "That game theory cannot explain real biological cooperation" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 40, text: "According to the passage, what distinctive feature of human cooperation challenges purely biological explanations?",
          options: [
            { letter: "A", text: "Humans are the only species that ever cooperates with non-relatives" },
            { letter: "B", text: "Humans cooperate at very large scales with anonymous strangers who share no special genetic relationship" },
            { letter: "C", text: "Human cooperation always requires legal contracts to be enforced" },
            { letter: "D", text: "Human cooperation evolved more rapidly than cooperation in other species" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

export const testSet7Passages: ReadingPassage[] = [
  set7Passage1,
  set7Passage2,
  set7Passage3,
];

// ══════════════ TEST SET 8 ══════════════
const set8Passage1: ReadingPassage = {
  id: 1,
  title: "Volcanoes And Human Settlement",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "The relationship between human populations and volcanic landscapes has always been one of coexistence with risk. Volcanoes are among the most destructive forces in nature, capable of destroying entire cities and altering regional climates. Yet volcanic regions have consistently attracted dense human settlement throughout history, a paradox that reveals much about both human decision-making under risk and the genuine productive advantages of volcanic landscapes. Today, approximately 800 million people live within 100 kilometres of a volcano, making volcanic hazard management one of the most pressing challenges in disaster risk reduction." },
    { label: "B", text: "The primary appeal of volcanic regions for human settlement is the exceptional agricultural fertility of volcanic soils. Volcanic ash and lava weather to produce soils rich in phosphorus, potassium, calcium, and other mineral nutrients essential for plant growth. In tropical climates, where rainfall is sufficient to support intensive cultivation, volcanic soils produce some of the highest agricultural yields in the world. The slopes of Mount Merapi in Java, Indonesia — one of the world's most active and dangerous volcanoes — support population densities among the highest in rural Southeast Asia, sustained by the extraordinary productivity of the surrounding farmland. Java as a whole, whose soils were built partly by millennia of volcanic activity, has historically supported rice cultivation densities far exceeding those of neighbouring islands with different geological foundations." },
    { label: "C", text: "The ancient city of Pompeii, destroyed by the eruption of Mount Vesuvius in 79 CE, is perhaps the most famous example of volcanic catastrophe. Yet even before that eruption, Vesuvius had last erupted in recorded human experience around 1800 BCE — a gap of nearly two millennia during which the mountain appeared dormant and its surrounding landscape remained among the most agriculturally productive and densely settled in the Roman world. The failure to recognise Vesuvius as a volcanic threat was not ignorance but the entirely rational response of successive generations to a landscape that had provided nothing but abundance within living memory. After the 79 CE eruption, the region around Vesuvius was resettled within a generation, and remains one of the most densely populated areas of Europe today." },
    { label: "D", text: "Volcanic hazards take several distinct forms. Lava flows — streams of molten rock — are typically slow enough to be evacuated from but destroy everything in their path. Pyroclastic flows — fast-moving avalanches of superheated gas, ash, and rock fragments — are far more dangerous, travelling at speeds of up to several hundred kilometres per hour at temperatures exceeding 700 degrees Celsius, and responsible for the majority of volcano-related fatalities. Volcanic ash, though less immediately deadly, can collapse roofs under its weight, contaminate water supplies, disrupt aviation, and — in the case of very large eruptions — inject sufficient particles into the stratosphere to temporarily reduce global temperatures by reflecting solar radiation. The 1815 eruption of Mount Tambora in Indonesia produced the \"Year Without a Summer\" in 1816, when global temperatures dropped by an estimated half to one degree Celsius, causing widespread crop failures in Europe and North America." },
    { label: "E", text: "Volcano monitoring and early warning systems have improved dramatically over recent decades. Seismic monitoring detects the underground movements and pressure changes that typically precede eruptions. Satellite-based measurement of ground deformation can identify the swelling of volcanic edifices caused by rising magma. Gas sensors measure the increasing emission of sulphur dioxide — a reliable precursor of volcanic activity — from volcanic vents. These advances have enabled successful evacuations from major eruptions, including the 1991 eruption of Mount Pinatubo in the Philippines, where warnings allowed the evacuation of over 60,000 people from the immediate danger zone, saving thousands of lives." },
    { label: "F", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "TRUE / FALSE / NOT GIVEN",
      questions: [
        { type: "tfng", number: 1, text: "Approximately 800 million people currently live within 100 kilometres of a volcano.", answer: "TRUE" },
        { type: "tfng", number: 2, text: "Volcanic soils are less fertile than river delta soils in most parts of the world.", answer: "FALSE" },
        { type: "tfng", number: 3, text: "The slopes of Mount Merapi in Java support very high rural population densities.", answer: "TRUE" },
        { type: "tfng", number: 4, text: "Vesuvius erupted at least three times in the centuries before the 79 CE eruption that destroyed Pompeii.", answer: "FALSE" },
        { type: "tfng", number: 5, text: "Pyroclastic flows can travel at several hundred kilometres per hour.", answer: "TRUE" },
        { type: "tfng", number: 6, text: "More than 60,000 people were evacuated before the 1991 eruption of Mount Pinatubo.", answer: "TRUE" },
      ] as TFNGQuestion[],
    },
    {
      instructions: "SENTENCE COMPLETION",
      questions: [
        {
          type: "sentence_completion", number: 7,
          prefix: "Volcanic soils are rich in nutrients including phosphorus, potassium, and", suffix: ".",
          answer: "calcium", acceptableAnswers: ["calcium"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 8,
          prefix: "The Tambora eruption of 1815 caused what became known as the", suffix: "in 1816.",
          answer: "Year Without a Summer", acceptableAnswers: ["Year Without a Summer"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 9,
          prefix: "The emission of", suffix: "dioxide from volcanic vents is a reliable sign of coming volcanic activity.",
          answer: "sulphur", acceptableAnswers: ["sulphur"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 10,
          prefix: "Satellite-based technology can detect volcanic", suffix: "caused by rising magma below the surface.",
          answer: "ground deformation", acceptableAnswers: ["ground deformation"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 11, text: "Why does the passage say that people settled near Vesuvius despite its volcanic nature?",
          options: [
            { letter: "A", text: "They did not understand that volcanoes could erupt dangerously" },
            { letter: "B", text: "The mountain had appeared dormant for nearly two millennia and the land was highly productive" },
            { letter: "C", text: "The Roman government forced settlement in the region" },
            { letter: "D", text: "Ancient technology could predict when Vesuvius would be safe" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 12, text: "What does the passage say about lava flows compared to pyroclastic flows?",
          options: [
            { letter: "A", text: "Lava flows are more dangerous because they travel faster" },
            { letter: "B", text: "Lava flows cause most volcano-related deaths" },
            { letter: "C", text: "Pyroclastic flows are more deadly and travel at much higher speeds" },
            { letter: "D", text: "Both lava flows and pyroclastic flows travel at similar speeds" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 13, text: "According to the passage, how did the 1815 Tambora eruption affect global climate?",
          options: [
            { letter: "A", text: "It triggered a series of volcanic eruptions around the world" },
            { letter: "B", text: "It caused global temperatures to rise by cooling the oceans" },
            { letter: "C", text: "It injected particles that reduced global temperatures, causing widespread crop failure" },
            { letter: "D", text: "It permanently altered monsoon patterns in Asia" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set8Passage2: ReadingPassage = {
  id: 2,
  title: "The Art And Science Of Negotiation",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "Negotiation — the process by which two or more parties with different interests attempt to reach a mutually acceptable agreement — is one of the most fundamental and pervasive forms of human interaction, occurring in contexts ranging from international diplomacy and commercial deal-making to workplace disputes and household decisions. The study of negotiation has evolved from a purely practitioner-based craft tradition, transmitted through apprenticeship and experience, into a rich academic discipline drawing on economics, psychology, game theory, and communication research. The insights this research has produced challenge many assumptions embedded in conventional negotiation practice and offer evidence-based guidance on how agreements of higher quality can be reached more efficiently." },
    { label: "B", text: "The foundational conceptual contribution of the negotiation research tradition is the distinction between positional and interest-based bargaining, developed by Roger Fisher, William Ury, and Bruce Patton in their influential book \"Getting to Yes\" (1981). Positional bargaining — in which each party stakes out an opening position and makes concessions towards the other — tends to produce agreements anchored near the midpoint between opening positions, regardless of whether that midpoint corresponds to any genuine alignment of interests. Interest-based bargaining, by contrast, focuses on identifying the underlying needs, concerns, and values that drive each party's stated positions, in the expectation that this deeper understanding will reveal options that satisfy multiple interests simultaneously — outcomes that positional bargaining, focused on a single distributable dimension, may systematically miss." },
    { label: "C", text: "The concept of the Zone of Possible Agreement (ZOPA) describes the range within which mutually acceptable agreements exist. A ZOPA exists when one party's minimum acceptable outcome is better than the other party's maximum acceptable concession — in other words, when the parties' interests actually overlap. Understanding one's own Best Alternative to a Negotiated Agreement (BATNA) — the most favourable outcome achievable if negotiation fails — is critical to negotiation effectiveness: a strong BATNA provides leverage and resistance to pressure, while a weak BATNA creates pressure to accept unfavourable terms. Research suggests that many negotiators fail to adequately develop their BATNA before entering negotiations, leaving themselves vulnerable to anchoring effects and time pressure." },
    { label: "D", text: "Anchoring — the tendency for the first number or proposal introduced into a negotiation to disproportionately influence the final outcome — is among the most robust findings in negotiation research. Studies have found that first offers function as anchors even when they are transparently arbitrary, and that counter-offers tend to remain closer to the anchor than to the objective value of the item. This has practical implications: in negotiations where it is acceptable to make the first offer, doing so may provide a significant advantage; conversely, receiving an extreme first offer requires a deliberate counter-anchoring response rather than a simple rejection." },
    { label: "E", text: "Fairness norms play a complex and sometimes paradoxical role in negotiation. The ultimatum game — a classic behavioural economics experiment in which one party proposes how to split a sum of money and the second party can either accept or reject, with both receiving nothing if rejected — consistently finds that people reject offers they perceive as unfair even at material cost to themselves. This finding has challenged pure self-interest models of negotiation and established that the perceived fairness of outcomes and processes significantly influences whether agreements hold and whether relationships are sustained after negotiations conclude. Negotiators who achieve technically optimal agreements but leave counterparts feeling disrespected or exploited often find that agreement implementation is contested and future negotiations more difficult." },
    { label: "F", text: "Cultural variation in negotiation norms is substantial and practically important. High-context cultures, in which communication norms emphasise indirect expression, implicit understanding, and relationship maintenance, approach negotiation with very different expectations about pace, explicitness, and the role of personal relationships than low-context cultures, where directness, efficiency, and separation of business from personal relationship are the norm. Research on cross-cultural negotiation consistently finds that misunderstandings arising from differing communication styles are a major source of negotiation breakdown, and that cultural intelligence — the capacity to understand and adapt to cultural differences — is a critical skill for negotiators operating across cultural boundaries." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 14, text: "The writer claims that positional bargaining tends to produce agreements near the midpoint between opening positions.", answer: "YES" },
        { type: "ynng", number: 15, text: "Fisher, Ury, and Patton argue that interest-based bargaining always produces better outcomes than positional bargaining.", answer: "NOT GIVEN" },
        { type: "ynng", number: 16, text: "The writer implies that failing to develop a strong BATNA weakens a negotiator's position.", answer: "YES" },
        { type: "ynng", number: 17, text: "Research shows that anchoring effects disappear when negotiators are informed that the first offer is arbitrary.", answer: "NO" },
        { type: "ynng", number: 18, text: "The ultimatum game findings support the view that self-interest alone explains human negotiation behaviour.", answer: "NO" },
        { type: "ynng", number: 19, text: "The writer suggests that cross-cultural misunderstandings are a significant cause of negotiation breakdowns.", answer: "YES" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "SENTENCE COMPLETION",
      questions: [
        {
          type: "sentence_completion", number: 20,
          prefix: "The Zone of Possible Agreement exists when the parties'", suffix: "actually overlap.",
          answer: "interests", acceptableAnswers: ["interests"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 21,
          prefix: "The BATNA represents the best outcome a negotiator can achieve if the", suffix: "fails.",
          answer: "negotiation", acceptableAnswers: ["negotiation"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 22,
          prefix: "In cultures where communication is indirect and relational, negotiation proceeds with different expectations about", suffix: "and pace.",
          answer: "explicitness", acceptableAnswers: ["explicitness"], maxWords: 3,
        },
        {
          type: "sentence_completion", number: 23,
          prefix: "Negotiators who achieve technically good agreements while leaving counterparts feeling", suffix: "may face difficulty during implementation.",
          answer: "disrespected / exploited", acceptableAnswers: ["disrespected / exploited"], maxWords: 3,
        },
      ] as SentenceCompletionQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 24, text: "What does interest-based bargaining focus on, as described in the passage?",
          options: [
            { letter: "A", text: "Each party's opening position and the midpoint between them" },
            { letter: "B", text: "The underlying needs and values that drive each party's stated position" },
            { letter: "C", text: "Matching the highest offer possible against the lowest concession" },
            { letter: "D", text: "Ensuring that both parties make equal concessions" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 25, text: "What practical implication of anchoring is suggested in the passage?",
          options: [
            { letter: "A", text: "Always reject the first offer in any negotiation" },
            { letter: "B", text: "Making the first offer in appropriate circumstances can provide a significant advantage" },
            { letter: "C", text: "The first offer should always be set at the midpoint of the ZOPA" },
            { letter: "D", text: "Anchoring effects are most powerful in cross-cultural negotiations" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 26, text: "According to the passage, what does the ultimatum game demonstrate about human negotiation?",
          options: [
            { letter: "A", text: "People always prioritise maximising their financial outcome" },
            { letter: "B", text: "People reject unfair offers even at personal cost, showing fairness matters" },
            { letter: "C", text: "Equal splits are always preferred to unequal ones regardless of fairness perceptions" },
            { letter: "D", text: "People with higher incomes make more rational negotiation decisions" },
          ],
          answer: "B",
        },
      ] as MCQQuestion[],
    },
  ],
};

const set8Passage3: ReadingPassage = {
  id: 3,
  title: "Social Media, Misinformation, And Democratic Discourse",
  subtitle: "",
  topic: "IELTS Academic Reading",
  paragraphs: [
    { label: "A", text: "**Paragraph A** The emergence of social media as the dominant arena of public communication has transformed the conditions under which democratic discourse occurs, with consequences that are both liberating and deeply troubling. On one hand, digital platforms have dramatically lowered the barriers to political expression, enabling previously marginalised voices to participate in public conversation, coordinating social movements at speed and scale previously impossible, and circumventing traditional media gatekeepers whose filtering of public information could be self-serving or ideologically narrow. On the other, the same platforms have become the primary vectors for the rapid spread of misinformation, the intensification of political polarisation, and the manipulation of democratic opinion by state and non-state actors." },
    { label: "B", text: "**Paragraph B** The spread of misinformation on social media has been studied extensively since at least the 2016 US presidential election, which attracted unprecedented attention to the scale and political impact of online disinformation. Research by Vosoughi, Roy, and Aral, published in Science in 2018, found that false news stories on Twitter spread faster, farther, and more broadly than true stories across every category of information studied. False stories were 70 percent more likely to be retweeted than true ones, and reached their first 1,500 users approximately six times faster. The study found that these differences were driven primarily by human behaviour rather than bot activity — people, not automated accounts, were the primary spreaders of false information, apparently because false news tended to be more novel and emotionally engaging than accurate reporting." },
    { label: "C", text: "**Paragraph C** The algorithmic architecture of major social media platforms has been widely identified as a structural contributor to both misinformation spread and political polarisation. Platforms optimise for engagement — measured through likes, shares, comments, and time on site — which is disproportionately generated by content that provokes strong emotional responses, particularly outrage, fear, and moral indignation. This creates what researchers call a \"negativity bias amplification loop\": content that activates these emotions receives greater algorithmic distribution, which in turn generates more engagement, further reinforcing the platform's incentive to distribute emotionally provocative rather than accurate or nuanced content. Former insiders at major platforms have testified before legislative bodies about the deliberately engagement-maximising design of recommendation algorithms and their awareness of the associated societal harms." },
    { label: "D", text: "**Paragraph D** Filter bubbles and echo chambers — closely related but conceptually distinct phenomena — have been widely cited as additional consequences of algorithmic curation. A filter bubble, as conceptualised by Eli Pariser, refers to the personalised information environment created when algorithms select content based on a user's demonstrated preferences, progressively narrowing their exposure to confirming information. An echo chamber refers more specifically to a social environment in which like-minded individuals reinforce each other's views without exposure to challenging perspectives. Empirical research has found that the scale of filter bubble effects may be more modest than popular accounts suggest — many users' information diets remain broader than purely algorithmic curation would produce — but that even modest selective exposure effects can influence political attitudes, particularly in combination with motivated reasoning processes." },
    { label: "E", text: "**Paragraph E** State-sponsored disinformation campaigns — the systematic production and dissemination of false or misleading content by foreign governments or their proxies to influence the political outcomes of target states — have become an established feature of the contemporary information environment. The Internet Research Agency, a Russian state-sponsored organisation, conducted extensive social media operations targeting the 2016 US election, creating fake American personas across multiple platforms, purchasing political advertisements, and amplifying divisive content to inflame racial, religious, and political tensions. Similar operations have been documented in elections across Europe, Africa, Asia, and Latin America. The objective of these campaigns is typically less to persuade than to confuse, polarise, and undermine trust in democratic institutions and processes." },
    { label: "F", text: "**Paragraph F** Responses to the misinformation challenge have operated at multiple levels. Platform-level interventions include fact-checking labels attached to disputed content, reduced algorithmic amplification of content flagged as potentially false, deplatforming of accounts consistently spreading disinformation, and transparency requirements around political advertising. Civil society organisations have invested in media literacy education — teaching populations to evaluate sources, recognise manipulation techniques, and apply critical thinking to information they encounter online. At the regulatory level, the European Union's Digital Services Act, which entered into force in 2024, imposes significant obligations on large platforms to assess and mitigate systemic risks arising from their services, including misinformation risks. Each of these approaches faces challenges of scale, enforcement, and the risk of inadvertently suppressing legitimate political speech." },
    { label: "G", text: "---" },
  ],
  questionGroups: [
    {
      instructions: "Match the correct heading (i–viii) to paragraphs A–F. There are more headings than paragraphs.",
      headingOptions: [
        "I. Research evidence on the speed and spread of online false information",
        "II. Why platform profit motives create structural incentives favouring harmful content",
        "III. How foreign actors have used social media to undermine democratic elections",
        "IV. How personalised information environments narrow political perspectives",
        "V. A balanced overview of social media's effects on democratic participation",
        "VI. The full elimination of misinformation through regulatory enforcement",
        "VII. What governments, platforms, and civil society are doing to address misinformation",
        "VIII. The specific methods used to spread false information without detection",
      ],
      questions: [
        { type: "matching_heading", number: 27, paragraph: "A", answer: "V" },
        { type: "matching_heading", number: 28, paragraph: "B", answer: "I" },
        { type: "matching_heading", number: 29, paragraph: "C", answer: "II" },
        { type: "matching_heading", number: 30, paragraph: "D", answer: "IV" },
        { type: "matching_heading", number: 31, paragraph: "E", answer: "III" },
        { type: "matching_heading", number: 32, paragraph: "F", answer: "VII" },
      ] as MatchingHeadingQuestion[],
    },
    {
      instructions: "YES / NO / NOT GIVEN",
      questions: [
        { type: "ynng", number: 33, text: "The 2018 Vosoughi study found that bots were the primary spreaders of false news on Twitter.", answer: "NO" },
        { type: "ynng", number: 34, text: "The writer implies that engagement-maximising algorithms may deliberately prioritise false content over true content.", answer: "YES" },
        { type: "ynng", number: 35, text: "The writer suggests that filter bubble effects are more significant than most empirical research indicates.", answer: "NO" },
        { type: "ynng", number: 36, text: "The Internet Research Agency is described as creating fake online personas to influence US political discourse.", answer: "YES" },
        { type: "ynng", number: 37, text: "The writer argues that the EU's Digital Services Act has definitively solved the misinformation problem.", answer: "NO" },
      ] as YNNGQuestion[],
    },
    {
      instructions: "MULTIPLE CHOICE",
      questions: [
        {
          type: "mcq", number: 38, text: "What did the 2018 Vosoughi study find about false news compared to true news on Twitter?",
          options: [
            { letter: "A", text: "False news was shared equally often but by different demographics" },
            { letter: "B", text: "False news spread faster and farther primarily because of bot activity" },
            { letter: "C", text: "False news spread faster and reached more users, driven primarily by human behaviour" },
            { letter: "D", text: "True news spread more quickly once fact-checkers had verified it" },
          ],
          answer: "C",
        },
        {
          type: "mcq", number: 39, text: "According to the passage, what is the typical objective of state-sponsored disinformation campaigns?",
          options: [
            { letter: "A", text: "To directly elect specific candidates to political office" },
            { letter: "B", text: "To create confusion, polarisation, and undermine trust in democratic institutions" },
            { letter: "C", text: "To sell advertising space on social media platforms" },
            { letter: "D", text: "To improve the information quality available to target country citizens" },
          ],
          answer: "B",
        },
        {
          type: "mcq", number: 40, text: "What challenge does the passage identify with platform-level interventions against misinformation?",
          options: [
            { letter: "A", text: "Platforms cannot technically identify false information in real time" },
            { letter: "B", text: "Users always ignore fact-checking labels attached to disputed content" },
            { letter: "C", text: "They face the risk of inadvertently suppressing legitimate political speech" },
            { letter: "D", text: "They are opposed by all governments regardless of political orientation" },
          ],
          answer: "C",
        },
      ] as MCQQuestion[],
    },
  ],
};

export const testSet8Passages: ReadingPassage[] = [
  set8Passage1,
  set8Passage2,
  set8Passage3,
];
