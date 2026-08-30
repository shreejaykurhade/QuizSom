# QuizSom

### Source-grounded assessments that turn mistakes into practice

QuizSom started with a simple frustration: creating a good college quiz takes time, but getting a score at the end still does not tell a student what to do next.

We built QuizSom as a complete learning loop. Faculty upload their own PDFs, presentations, or notes. Gemini helps turn that material into verifiable questions. Students take the assessment in a controlled room, receive topic-level feedback, open the exact source page behind an answer, and generate fresh practice for the topics they struggled with.

QuizSom is not designed to let an AI freely invent a quiz. The model works inside a source-grounded pipeline, and its output is checked again by deterministic server code before it reaches a student.

> Built for **KJSSE CSI Gemini Hackday 2.0** by Team Metamax.

## What QuizSom solves

Most assessment tools stop at a percentage. Generic AI quiz generators have another problem: they can produce convincing questions that are not actually present in the syllabus.

QuizSom connects the pieces that are normally separated:

- Faculty material becomes a page-aware knowledge base.
- Gemini generates questions from that approved material.
- The server verifies every cited answer against the original page.
- Students take timed faculty exams or relaxed peer Battlegrounds.
- Incorrect and unanswered questions become weak-topic signals.
- Weak topics become new PDF-grounded practice rounds.
- Every result can lead to another focused learning cycle.

```text
Material → Assessment → Performance → Weak topics → Practice → Improved mastery
```

## Architecture

The diagram is intentionally laid out as a wide, presentation-friendly flow so it can be used in a 16:9 hackathon slide as well as rendered directly on GitHub.

```mermaid
%%{init: {"theme": "base", "themeVariables": {"primaryColor": "#eef2ff", "primaryTextColor": "#172554", "primaryBorderColor": "#6366f1", "lineColor": "#64748b", "secondaryColor": "#ecfdf5", "tertiaryColor": "#fff7ed"}, "flowchart": {"curve": "basis", "nodeSpacing": 28, "rankSpacing": 46}}}%%
flowchart LR
    subgraph INPUT[1 · Faculty knowledge]
        A[PDF / PPTX / DOCX / TXT]
        B[Firebase identity]
    end
    subgraph INDEX[2 · Page-aware RAG index]
        C[Text extraction and cleaning]
        D[Page-safe ~350 word chunks]
        E[Title + page + section metadata]
        F[Gemini semantic embeddings]
    end
    subgraph AI[3 · Gemini intelligence layer]
        G[Grounded quiz synthesis]
        H[Hybrid study-chat retrieval]
        I[Weak-topic remediation]
        J[Structured JSON + evidence IDs]
    end
    subgraph VERIFY[4 · Deterministic verification]
        K[Excerpt exists on cited page]
        L[Correct answer exists in excerpt]
        M[Reject unsupported output]
    end
    subgraph EXPERIENCE[5 · Learning experience]
        N[Faculty live assessment]
        O[Student Battleground]
        P[Results + exact PDF page]
        Q[Adaptive practice loop]
    end
    subgraph PLATFORM[Platform]
        R[(MongoDB Atlas)]
        S[(GridFS originals)]
        T[Vercel / Next.js APIs]
    end

    A --> C --> D --> E --> F
    B --> T
    E --> R
    A --> S
    F --> G
    F --> H
    F --> I
    G --> J --> K --> L --> M
    M --> N
    M --> O
    H --> P
    N --> P
    O --> P
    P --> Q --> I
    R <--> T
    S <--> T
```

## End-to-end flow

### 1. A faculty member uploads course material

QuizSom accepts PDF, PPTX, DOCX, and TXT files. The original file is stored in MongoDB GridFS so it remains available across Vercel deployments and serverless instances.

PDFs are extracted one page at a time. PPTX files are extracted slide by slide. Durable page markers are kept throughout processing, which means a chunk never silently mixes content from two PDF pages.

### 2. The material becomes a RAG index

The extracted text is cleaned to remove common document noise such as repeated headers, page numbers, URLs, author lines, encoding artifacts, and decorative bullet characters.

QuizSom then builds focused chunks of roughly 350 words. Each chunk keeps:

- Document and owner ID
- Document title
- Exact page or slide number
- Detected section title
- Chunk content and index
- Token estimate
- Gemini embedding and indexing metadata

This metadata is important. A retrieved passage is not just anonymous text; it always knows where it came from.

### 3. Gemini creates a grounded assessment

Gemini receives labeled source blocks rather than an unstructured document dump:

```text
[DOCUMENT: Database Management Systems | PAGE: 12 | SECTION: Third Normal Form]
<cleaned course material from that page>
```

The generation prompt requires Gemini to:

- Use only the supplied material.
- Avoid outside facts and unsupported inference.
- Produce exactly four options with one correct answer.
- Use plausible distractors related to the source.
- Return structured JSON.
- Include a verbatim excerpt from the same cited page.
- Ensure that the excerpt contains the complete correct answer.
- Skip a question when valid evidence is unavailable.

Quiz generation uses a low temperature (`0.15`) to favor consistency over creativity.

### 4. The server checks Gemini's work

Gemini output is treated as a draft, not as unquestionable truth.

For every generated question, QuizSom verifies that:

1. The cited document exists.
2. The cited page exists.
3. The returned excerpt appears on that page.
4. The complete correct option appears in the excerpt.
5. The correct option also appears in the original page chunk.

Questions that fail verification are removed. If nothing can be verified, the API returns a clear error instead of publishing an unsupported quiz.

### 5. The assessment becomes a live room

Faculty can review generated questions and publish an assessment. QuizSom creates a room code and handles timing, question assignment, option randomization, scoring, integrity events, and ranking on the server.

Students can also create relaxed Battleground rooms from their own material. Battlegrounds use the same question and result engine without formal-exam fullscreen enforcement.

### 6. A result becomes a learning plan

After submission, QuizSom calculates performance by topic, not only by total score. Incorrect and unanswered questions identify the concepts that need more work.

The result page includes a **Practice topic** action. Selecting it creates a new Gemini-generated Battleground round from the original assessment PDFs. Those questions go through the same citation verification process.

The student can complete the new round, receive a new weakness report, and repeat the cycle until the topic improves.

## How RAG works in QuizSom

RAG stands for Retrieval-Augmented Generation. Instead of asking Gemini to remember an entire textbook inside every prompt, QuizSom retrieves the evidence most relevant to the current question.

### Hybrid retrieval

Student study chat combines two complementary signals:

```text
retrieval score = 55% semantic similarity + 45% keyword overlap
```

- **Semantic similarity** uses Gemini embeddings to find passages with similar meaning even when the wording differs.
- **Keyword overlap** protects exact academic terminology, abbreviations, formulas, and protocol names.

QuizSom ranks the best chunks, extracts the strongest evidence sentences, and sends at most four compact passages to Gemini. This keeps unrelated chapters out of the active context window.

Gemini must return short answer points plus the evidence IDs it used:

```json
{
  "answer": ["A concise, source-supported point"],
  "evidenceIds": [0]
}
```

Those IDs are mapped back to the original document, page, section, excerpt, and PDF preview.

If the evidence does not answer the question, the model is instructed to return an empty answer. QuizSom then tells the student that the assigned notes do not state the answer clearly enough instead of guessing.

## Gemini integration

Gemini is used as several focused capabilities rather than one generic chatbot.

| Capability | Gemini's role | Application guardrail |
| --- | --- | --- |
| Assessment generation | Synthesizes MCQs from selected course material | Exact-answer and citation verification |
| Study chat | Converts retrieved evidence into short explanations | Evidence-only prompt, evidence IDs, abstention |
| Semantic embeddings | Represents chunks and questions by meaning | Combined with keyword retrieval |
| Weak-topic practice | Generates varied remediation questions for one weak topic | Original PDFs, low temperature, citation verification |
| Battleground topic mode | Creates conceptual peer-challenge questions | Structured JSON and server-side scoring |

The application currently tries its configured Gemini Flash model candidates and falls back to a local extractive question engine if live generation is unavailable.

## Optimizations and hallucination controls

We describe QuizSom as **hallucination-resistant**, not magically hallucination-free. The safeguards are layered:

### Context quality

- Page-aware PDF and slide extraction
- Chunks that do not cross page boundaries
- Approximately 350 words per chunk
- Document, page, and section metadata inside embedding input
- Text cleaning before indexing or generation

### Retrieval quality

- Gemini semantic embeddings
- Exact keyword overlap
- Weighted hybrid scoring
- Top-evidence selection
- Sentence-level evidence compression
- Access restricted to material assigned to the authenticated student

### Generation stability

- Low temperature (`0.1` for chat and `0.15` for assessment generation)
- JSON response mode
- Explicit output schemas
- Evidence IDs instead of untraceable prose
- Topic-specific remediation prompts
- Bounded source context to control latency and token use

### Post-generation verification

- Verbatim excerpt matching
- Exact page matching
- Complete correct-answer matching
- Unsupported-question rejection
- Safe extractive fallback
- Original source-page preview for human verification

### Serverless reliability

- Original files stored in MongoDB GridFS
- MongoDB persistence awaited before upload success is returned
- This prevents the first generation request from racing ahead of a newly uploaded document

## Context-loss strategy

Context loss is reduced by giving Gemini focused evidence instead of repeatedly sending every available document.

- Page boundaries preserve local meaning.
- Small chunks reduce topic mixing.
- Metadata prevents retrieved text from losing its source identity.
- Hybrid retrieval finds both conceptual and exact-term matches.
- Compact evidence keeps the prompt focused.
- Evidence IDs preserve the link between answer and source.
- Adaptive prompts narrow practice generation to one weak topic.

One honest limitation remains: full assessment generation currently applies a per-document character budget. Very long textbooks may have later sections underrepresented. A future version can use retrieval-first, chapter-balanced sampling before quiz generation.

## Assessment integrity

Gemini handles synthesis and explanation. Academic authority stays deterministic.

- Correct answers are removed from the live exam payload.
- Timers are based on server timestamps.
- Questions and options are randomized per attempt.
- Scoring and negative marking happen on the server.
- Rankings use score, completion duration, and submission time.
- Faculty assessments can record fullscreen exits, tab changes, hidden windows, blur events, paste attempts, and related integrity signals.
- The configured strike limit can trigger authoritative server-side submission.

## What makes QuizSom different

1. **It closes the loop.** A mistake becomes a new learning activity instead of a static red mark.
2. **It shows proof.** Students can open the exact source page behind an answer.
3. **It verifies model output.** Gemini drafts the question; the server checks the evidence.
4. **It separates intelligence from authority.** AI assists with synthesis, while code controls identity, access, timing, scoring, and ranking.
5. **It supports formal and social learning.** Faculty exams, personal remediation, study chat, and student Battlegrounds share one grounded material layer.
6. **It adapts to observed performance.** Practice topics come from actual incorrect and unanswered questions.

## Technology stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript
- **Interface:** React and Tailwind CSS
- **AI:** Google Gemini Flash and Gemini embeddings
- **Authentication:** Firebase Authentication
- **Database:** MongoDB Atlas
- **File storage:** MongoDB GridFS
- **Deployment:** Vercel
- **Document processing:** PDF extraction and Office Open XML extraction

## Local setup

### 1. Clone and install

```bash
git clone https://github.com/shreejaykurhade/QuizSom.git
cd QuizSom
npm install
```

### 2. Create `.env`

Use `.env.example` as the starting point. Never commit real credentials.

```env
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_web_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
FIREBASE_PROJECT_ID=your-project-id

MONGODB_URI=mongodb+srv://username:password@cluster.example.mongodb.net/quizsom
MONGODB_DB=quizsom
```

The deployed hostname must also be added to Firebase Authentication's authorized domains. MongoDB Atlas must allow connections from the deployment environment.

### 3. Start QuizSom

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Recommended hackathon demo

1. Sign in as faculty.
2. Upload a PDF or PPTX.
3. Show that it is indexed by page and chunk.
4. Generate a quiz with Gemini.
5. Open a generated question's citation and exact source page.
6. Publish a room and join as a student.
7. Intentionally answer one topic incorrectly.
8. Submit and show the topic-level result.
9. Select **Practice topic**.
10. Show the fresh PDF-grounded Battleground round.
11. Ask the study chat a question and open its cited source page.

## Judging-rubric alignment

- **Quality of Gemini integration:** generation, embeddings, evidence synthesis, and adaptive remediation are distinct, useful Gemini capabilities.
- **Problem and use-case clarity:** QuizSom addresses faculty workload, trustworthy assessment generation, examination integrity, feedback, and remediation.
- **Technical execution:** authenticated APIs, page-aware RAG, MongoDB persistence, GridFS uploads, deterministic scoring, and a deployed end-to-end workflow.
- **Innovation and creativity:** exact-page verification and the assessment-to-remediation loop turn a quiz into a personalized learning system.
- **Presentation and demonstration:** one connected story runs from a faculty document to a student's measurable improvement.

## Responsible claim

QuizSom does not claim that a language model can never hallucinate. It reduces the risk through constrained context, retrieval, low-temperature generation, structured output, deterministic citation checks, abstention, and visible human-verifiable evidence.

That distinction is central to the project: **Gemini provides intelligence, while QuizSom provides grounding, verification, and academic control.**
