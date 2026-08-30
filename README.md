# QuizSom — College AI Internal Assessment Platform

<div align="center">
  <img src="public/logo.png" alt="QuizSom Logo" width="120" />
  <h3>AI-Grounded Internal Assessments & Controlled Classroom Examination Platform</h3>
  <p>Powered by <strong>Google Gemini Flash</strong> for zero-hallucination syllabus grounding and authoritative server-side proctoring.</p>
</div>

---

## 🌟 Overview

**QuizSom** is a modern, production-grade assessment platform designed for universities and colleges. Instructors can upload course syllabi or module PDFs, automatically generate syllabus-grounded multiple-choice assessments with exact textbook citations, conduct synchronized live examinations with authoritative 2-strike proctoring, and turn grading into actionable pedagogical analytics.

---

## 🚀 Key Features

### 1. 📚 Gemini Flash Source Grounding (Zero Hallucination)
- Upload syllabus documents (PDF, DOCX, TXT) or choose from pre-loaded course modules (e.g. CS301 Database Management Systems).
- Every question is strictly verified with exact textbook citations (`DBMS Module 2 · Page 3 · Section 3`).
- Single-question targeted AI regeneration and inline QA review.

### 2. 🛡️ Controlled Examination & 2-Strike Proctoring
- **Full-Screen Enforcement**:
  - **Strike 1**: Instant in-browser warning modal.
  - **Strike 2**: Authoritative server-side auto-submission and attempt lock.
- **Server-Authoritative Clock**: Prevents client clock tampering by synchronizing against server timestamps.
- **Randomized Question & Option Permutations**: Prevents shoulder surfing with stable option ID evaluation.

### 3. 📡 Live Exam Command Center
- Real-time room telemetry stream for instructors.
- Live examinee status indicators (Active, Warned, Auto-Submitted, Completed).

### 4. 📊 Class Analytics & Deterministic Leaderboards
- Class performance histogram, topic mastery matrix with Gemini pedagogical feedback, and full audit logs.
- Deterministic academic ranking: Primary score DESC → Server completion duration ASC → Submission timestamp ASC.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens & Plus Jakarta Sans typography
- **AI Kernel**: Google Gemini Flash API (`@google/generative-ai`)
- **Icons**: Lucide React

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Madxfury/QuizSom.git
cd QuizSom
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Google Gemini API key:
```bash
cp .env.example .env.local
```
Add your key inside `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🎓 Pre-Seeded Demo Routes

- **Landing Page**: `/`
- **Faculty Login & Dashboard**: `/teacher/login` (1-Click Demo Login)
- **AI Assessment Creator**: `/teacher/create`
- **Live Room Monitor**: `/teacher/rooms/DEMO26`
- **Class Analytics**: `/teacher/results/assess_dbms_ia01`
- **Student Exam Portal**: `/student` (Room Code: `DEMO26`)

---

## 📄 License
MIT License
