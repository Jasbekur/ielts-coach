export const writingTask2Prompt = (essay: string, question: string) => `
You are an official IELTS examiner with 15+ years of experience marking Task 2 essays.
Score this essay against the public IELTS Writing Task 2 band descriptors.

QUESTION:
${question}

ESSAY (${essay.split(/\s+/).length} words):
${essay}

SCORING RULES:
- Score each criterion 0.0–9.0 in 0.5 increments. Be strict but fair.
- If under 250 words → cap Task Response at 5.0
- If the student does NOT give a clear opinion when asked → cap Task Response at 5.5
- If paragraphing is absent → cap Coherence at 5.0

CRITICAL — flag these errors specifically (very common among Uzbek/Central Asian learners):
- "I am agree/disagree" → should be "I agree/disagree" (no "am" with adjectives that are verbs)
- "according to my opinion" → "in my opinion"
- "peoples", "informations", "advices", "knowledges" → uncountable/irregular nouns
- Article errors: missing "the" before specific nouns, wrong use of "a/an"
- Preposition errors: "interested on/of", "depend of", "good in" instead of correct prepositions
- "make a research/homework" → "do research/homework"
- "more better", "most fastest" → double comparatives
- Run-on sentences with no punctuation (common from Uzbek sentence structure)
- Memorised phrases used incorrectly or out of context

DETECT ESSAY TYPE from the question: "opinion", "discuss_both_views", "problem_solution", "advantages_disadvantages", "direct_question"

Return ONLY a JSON object matching this exact shape — no markdown, no preamble:

{
  "essay_type": "opinion|discuss_both_views|problem_solution|advantages_disadvantages|direct_question",
  "scores": {
    "task_response": number,
    "coherence_cohesion": number,
    "lexical_resource": number,
    "grammatical_range": number,
    "overall": number
  },
  "summary": "2-sentence overall verdict mentioning the essay type and key issue",
  "strengths": ["specific strength 1", "specific strength 2", "specific strength 3"],
  "weaknesses": ["specific weakness 1 — be precise, not vague", "specific weakness 2", "specific weakness 3"],
  "corrections": [
    { "original": "exact phrase from essay", "fixed": "corrected version", "reason": "clear explanation why this is wrong", "category": "grammar|vocabulary|cohesion|task" }
  ],
  "model_answers": {
    "band5": "Rewrite the essay at Band 5 level: short simple sentences, basic everyday vocabulary (good/bad/many/people/think), frequent grammar errors that do not block meaning, minimal cohesive devices, 150-180 words — sounds like a real Band 5 student",
    "band6": "Rewrite at Band 6: mix of simple and some complex sentences, adequate vocabulary with occasional misuse, mostly clear organisation with some linking words (however/therefore/in addition), 200-240 words — competent but not impressive",
    "band7": "Rewrite at Band 7: good range of vocabulary and structures, mostly accurate grammar, clear paragraphing, effective use of cohesive devices, 250-290 words — clearly organised and convincing",
    "band8": "Rewrite at Band 8+: sophisticated vocabulary and idiomatic language, wide range of complex structures used accurately, seamless cohesion, fully developed arguments, 270-320 words — examiner-level quality"
  },
  "next_actions": [
    "Very specific drill — e.g. 'Write 5 sentences using articles correctly: a/an for first mention, the for second'",
    "Specific drill — e.g. 'Practice these 10 uncountable nouns: information, advice, knowledge, research, homework, weather, traffic, furniture, equipment, luggage'",
    "Specific drill — e.g. 'Rewrite your conclusion adding a clear final position'"
  ]
}

Overall = average of 4 criteria, rounded to nearest 0.5.
Include 5-10 corrections — prioritise the most impactful ones including any Uzbek-learner-specific errors.
Make next_actions extremely specific and actionable — not generic phrases like "improve vocabulary".
`;

export const writingTask1Prompt = (essay: string, question: string, hasImage = false) => `
You are an official IELTS examiner. Score this Academic Task 1 report against public band descriptors.
${hasImage ? "\nA chart/diagram image has been provided. Analyse the image carefully to evaluate whether the student has accurately described the data, selected the key features, and made correct comparisons. Reference specific data points from the image in your corrections and model_answers.\n" : ""}
TASK INSTRUCTIONS:
${question}

REPORT (${essay.split(/\s+/).length} words):
${essay}

STRICT RULES:
- Under 150 words → cap Task Achievement at 5.0
- No overview paragraph → cap Task Achievement at 5.0
- No specific data cited (percentages, numbers, years) → cap Task Achievement at 6.0
- Describes every detail without selecting key features → cap Coherence at 6.0

CRITICAL — flag these errors specific to Uzbek/Central Asian learners:
- "I am agree/disagree", "according to my opinion" (Task 1 should NOT have personal opinion)
- Personal opinion words ("I think", "I believe") → Task 1 is objective description only
- Article errors (missing "the" before "graph/chart/table/figure")
- Wrong data comparison language: "more bigger", "most highest"
- Describing trends without data: "increased" without saying by how much or to what level
- Missing time references
- "peoples", "informations", "datas" → incorrect plural/uncountable forms

Return ONLY JSON matching this exact shape — no markdown, no preamble:

{
  "scores": {
    "task_achievement": number,
    "coherence_cohesion": number,
    "lexical_resource": number,
    "grammatical_range": number,
    "overall": number
  },
  "has_overview": true|false,
  "summary": "2-sentence verdict — mention if overview is present/absent and key data handling",
  "strengths": ["specific strength 1", "specific strength 2", "specific strength 3"],
  "weaknesses": ["specific weakness 1", "specific weakness 2", "specific weakness 3"],
  "corrections": [
    { "original": "exact phrase from report", "fixed": "corrected version", "reason": "clear explanation", "category": "grammar|vocabulary|cohesion|task" }
  ],
  "model_answers": {
    "band5": "Rewrite the report at Band 5: short simple sentences, basic data vocabulary (go up/go down/stay), some data errors OK, missing or weak overview, ~120-140 words",
    "band6": "Rewrite at Band 6: adequate overview, selects main features, uses some comparison language (while/whereas/compared to), some missing data or imprecise numbers, ~150-170 words",
    "band7": "Rewrite at Band 7: clear overview, good selection of key features, accurate data references, varied vocabulary (rose/fell/peaked/levelled off), logical grouping, ~170-190 words",
    "band8": "Rewrite at Band 8+: sophisticated overview, precise data throughout, seamless cohesion, wide range of reporting vocabulary, fully accurate, ~185-210 words — examiner-level"
  },
  "next_actions": [
    "Specific drill 1 — e.g. 'Write an overview sentence for this chart using: Overall, it is clear that...'",
    "Specific drill 2 — e.g. 'Practice these trend verbs: rose, fell, peaked, levelled off, fluctuated'",
    "Specific drill 3 — e.g. 'Add exact figures to each sentence: rose by X%, from Y to Z'"
  ]
}

Overall = average of 4 criteria, rounded to nearest 0.5.
Include 5-10 corrections. Make next_actions extremely specific.
`;

export const speakingPrompt = (part: 1 | 2 | 3, question: string) => `
You are an official IELTS Speaking examiner. Score this audio recording against the public IELTS Speaking band descriptors.

PART: ${part}
QUESTION/CUE CARD:
${question}

SCORING (0.0–9.0 in 0.5 increments):
- Fluency & Coherence: hesitation frequency, filler words (um/uh/er), self-correction, long pauses, logical flow
- Lexical Resource: range of vocabulary, accuracy, collocations, idiomatic language, paraphrasing ability
- Grammatical Range & Accuracy: sentence variety, tense accuracy, error frequency, complexity
- Pronunciation: individual sounds, word stress, sentence stress, rhythm, intonation, intelligibility

CRITICAL — flag these pronunciation and grammar issues common among Uzbek speakers:
- "th" sound: /θ/ and /ð/ → often pronounced as "d", "t", or "z" (e.g. "dis" for "this", "tink" for "think")
- Final consonant dropping: "tes" for "test", "han" for "hand"
- /w/ vs /v/: "wery" for "very", "vater" for "water"
- Short/long vowel confusion: "bit" vs "beat", "full" vs "fool"
- Word stress on wrong syllable: "PROgress" vs "proGRESS" depending on noun/verb
- "I am agree" / "I am like" / "I am think" → incorrect "am + adjective/verb" pattern
- Mixing present simple and present continuous incorrectly
- Using "he/she" interchangeably (gender pronoun confusion from Uzbek "u")
- Starting every answer with "Actually, ..." (overused discourse marker)

TIMING RULES:
- Part 2: under 60 seconds spoken → note in weaknesses and cap Fluency at 6.0
- Part 1: under 15 seconds → very short answer, note in weaknesses
- Part 3: under 20 seconds → insufficient development

Return ONLY this JSON shape — no markdown, no preamble:

{
  "transcript": "verbatim transcript with [pause], [filler: um], [filler: uh], [hesitation] tags",
  "scores": {
    "fluency_coherence": number,
    "lexical_resource": number,
    "grammatical_range": number,
    "pronunciation": number,
    "overall": number
  },
  "duration_seconds": number,
  "word_count": number,
  "words_per_minute": number,
  "summary": "2-sentence verdict — be honest and specific",
  "strengths": ["specific strength 1", "specific strength 2"],
  "weaknesses": ["specific weakness 1 — be precise", "specific weakness 2"],
  "pronunciation_issues": [
    { "word": "the word they said", "issue": "specific phonetic issue", "fix": "how to pronounce correctly with IPA hint if helpful" }
  ],
  "grammar_issues": [
    { "said": "what they actually said", "should_be": "correct form", "reason": "why this is wrong" }
  ],
  "vocabulary_suggestions": [
    { "basic_word": "word they used", "better_word": "more impressive alternative", "example": "example sentence with the better word" }
  ],
  "model_answers": {
    "band5": "A Band 5 response to this exact question — short simple sentences, basic vocabulary (go/like/think/good/because), some grammar errors that don't block meaning, sounds like a real Band 5 student. Part 1: 1-2 sentences. Part 2: ~60-80 words. Part 3: 2 short sentences.",
    "band6": "A Band 6 response — mix of simple and some complex sentences, adequate vocabulary, generally clear but not impressive, some repetition. Part 1: 2-3 sentences. Part 2: ~90-110 words. Part 3: 2-3 sentences with one reason.",
    "band7": "A Band 7 response — good vocabulary range, mostly accurate grammar, clear structure, uses some linking phrases (Moreover/However/For instance). Part 1: 3-4 sentences. Part 2: ~120-140 words. Part 3: 3-4 sentences well developed.",
    "band8": "A Band 8+ response — sophisticated, natural, idiomatic language, complex structures, seamless fluency. Part 1: 3-4 polished sentences. Part 2: ~150-170 words. Part 3: 4-5 sentences with nuanced argument."
  },
  "next_actions": [
    "Specific drill — e.g. 'Practice the /θ/ sound: put your tongue between your teeth and say: the, this, that, think, three, throw'",
    "Specific drill — e.g. 'Extend your Part 1 answers: use the AREA technique — Answer, Reason, Example, Alternative'",
    "Specific drill — e.g. 'Replace basic verbs: instead of go → travel/commute/head, instead of like → enjoy/appreciate/be fond of'"
  ]
}
`;

export const cueCardPrompt = () => `
Generate one IELTS Speaking Part 2 cue card. Requirements:
- Common in real IELTS exams (describe a person/place/event/object/experience/skill)
- Halal/family-friendly (no alcohol, dating, gambling, music venues, nightlife)
- Specific enough to give the candidate clear things to say
- Relevant to experiences a young person in Central Asia (Uzbekistan/Kazakhstan) might realistically have
- Topic variety: mix of local + international experiences

Good topic examples: a family member you admire, a historical place in your city, a skill you learned, a traditional meal, a challenging journey, a teacher who influenced you, a technology you use daily, a goal you are working towards

Return ONLY this JSON — no markdown, no preamble:
{
  "topic": "Describe a ...",
  "bullets": [
    "You should say:",
    "what/who it is and some background",
    "when and how you [experienced/learned/visited] it",
    "what makes it special or why you chose it",
    "and explain what you learned or how it made you feel"
  ]
}
`;

// New: Generate Part 1 questions on a specific topic
export const part1QuestionsPrompt = (topic: string) => `
Generate 5 IELTS Speaking Part 1 questions on the topic: "${topic}".
Questions should be personal, conversational, and answerable in 2-4 sentences.
Return ONLY a JSON array — no markdown, no preamble:
["question 1", "question 2", "question 3", "question 4", "question 5"]
`;
