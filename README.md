# 📘 AI-Assisted Knowledge Quiz (Web Application)

### SDE Intern Assignment – Problem Statement 2

**Live Demo:** [https://quiz-2fzcgmqq1-deepak-kumars-projects-fcc2a798.vercel.app](https://quiz-2fzcgmqq1-deepak-kumars-projects-fcc2a798.vercel.app)
**GitHub Repository:** [https://github.com/dk2430098/quiz](https://github.com/dk2430098/quiz)

---

## 🚀 1. Overview

This project is a fully interactive **AI-Assisted Knowledge Quiz Web App** built using **React + TypeScript + Vite** for the SDE Intern Assignment (Problem Statement 2).

The application:

- Generates quiz questions using AI
- Shows questions one-by-one
- Tracks progress
- Calculates score
- Generates personalized AI feedback
- Provides a clean and modern UI/UX

---

## 🎯 2. Features

### ✔ Topic Selection

Choose topics like:

- AI Basics
- Wellness
- Tech Trends
- Productivity

### ✔ AI-Generated Questions

The AI generates:

- Exactly **5 MCQs**
- 4 options each
- A `correctIndex` field

### ✔ Loader + Retry Logic

- Shows loading animation during AI calls
- Retries if AI returns malformed JSON
- Displays error message if needed

### ✔ Quiz Navigation

- Previous/Next buttons
- Progress bar
- Option highlighting
- State stored globally

### ✔ Personalized AI Feedback

After score calculation:

- AI generates a short feedback message
- JSON-only enforced

### ✔ Modern, Responsive Design

- Dark UI theme
- Clean layout
- Smooth transitions

---

## 🧠 3. AI Prompts Used

### **Prompt for Generating MCQs**

```
You are an AI quiz generator. Generate exactly 5 MCQs for the topic {{topic}}.
Output ONLY valid JSON in this schema:

{
  "questions": [
    {
      "id": 1,
      "question": "string",
      "options": ["A","B","C","D"],
      "correctIndex": 0
    }
  ]
}

Rules:
- No text outside JSON
- No markdown
- No trailing commas
- correctIndex must be between 0-3
- If JSON is invalid, regenerate strictly using the schema
```

### **Prompt for Personalized Feedback**

```
You are an AI feedback generator. Based on the user's score, output ONLY valid JSON:

{
  "feedback": "string"
}

Feedback must be short (2–3 sentences).
Score: {{score}}
Total: {{total}}
Return only JSON.
```

### **Retry Prompt (If JSON fails)**

```
Your previous output was invalid JSON. Regenerate the response strictly following the required schema. Output ONLY valid JSON.
```

---

## 🏗 4. Architecture & Code Structure

```
src/
  components/
    Loader.tsx
    TopicSelection.tsx
    QuestionCard.tsx
    ProgressBar.tsx
  screens/
    TopicScreen.tsx
    QuizScreen.tsx
    ResultScreen.tsx
  services/
    aiService.ts
  context/
    QuizContext.tsx
  types.ts
  App.tsx
  main.tsx
```

### Tech Stack

- React
- TypeScript
- Vite
- Context API for global state
- Modular components
- AI integration-ready service

---

## 🎨 5. UI/UX Highlights

- Modern dark theme
- Responsive layout
- Clear typography
- Easy navigation
- Intuitive progress indicator
- Professional design suitable for production

---

## 🧪 6. How to Run Locally

### Clone the repository

```
git clone https://github.com/dk2430098/quiz
cd quiz
```

### Install dependencies

```
npm install
```

### Start development server

```
npm run dev
```

### Build for production

```
npm run build
```

### Preview build

```
npm run preview
```

---

## 📸 7. Screenshots (Add below after capturing)

- Topic Selection
- Loading Screen
- Quiz Screen
- Result + Feedback Screen

---

## 🐞 8. Known Issues

- AI may produce invalid JSON occasionally
- Retry logic handles most cases, but not all
- Only predefined topics supported
- No backend or database

---

## 🚀 9. Future Improvements

- Add multiple difficulty levels
- Add timed quizzes
- Save quiz history
- Add login/auth
- More animations
- Add explanations for answers

---

## ⭐ 10. Final Notes

This project demonstrates:

- Strong React + TypeScript fundamentals
- Clean architecture & reusable components
- Context-based global state management
- Prompt engineering skills
- AI-powered dynamic content
- Smooth user experience

Fully aligned with **SDE Intern Assignment – Problem Statement 2**.
