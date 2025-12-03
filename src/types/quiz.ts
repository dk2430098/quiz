export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuizState {
  topic: string;
  questions: Question[];
  answers: (number | null)[];
  currentIndex: number;
  score: number;
  feedback: string;
}

export type Screen = 'topic' | 'loading' | 'quiz' | 'result';
