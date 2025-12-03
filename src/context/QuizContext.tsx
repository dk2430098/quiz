import { createContext, useContext, useState, ReactNode } from 'react';
import { Question, QuizState, Screen } from '../types/quiz';

interface QuizContextType {
  state: QuizState;
  screen: Screen;
  setTopic: (topic: string) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (index: number, answer: number) => void;
  setCurrentIndex: (index: number) => void;
  calculateScore: () => number;
  setFeedback: (feedback: string) => void;
  setScreen: (screen: Screen) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialState: QuizState = {
  topic: '',
  questions: [],
  answers: [],
  currentIndex: 0,
  score: 0,
  feedback: '',
};

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>(initialState);
  const [screen, setScreen] = useState<Screen>('topic');

  const setTopic = (topic: string) => {
    setState((prev) => ({ ...prev, topic }));
  };

  const setQuestions = (questions: Question[]) => {
    setState((prev) => ({
      ...prev,
      questions,
      answers: new Array(questions.length).fill(null),
      currentIndex: 0,
    }));
  };

  const setAnswer = (index: number, answer: number) => {
    setState((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[index] = answer;
      return { ...prev, answers: newAnswers };
    });
  };

  const setCurrentIndex = (index: number) => {
    setState((prev) => ({ ...prev, currentIndex: index }));
  };

  const calculateScore = () => {
    let score = 0;
    state.questions.forEach((question, index) => {
      if (state.answers[index] === question.correctIndex) {
        score++;
      }
    });
    setState((prev) => ({ ...prev, score }));
    return score;
  };

  const setFeedback = (feedback: string) => {
    setState((prev) => ({ ...prev, feedback }));
  };

  const resetQuiz = () => {
    setState(initialState);
    setScreen('topic');
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        screen,
        setTopic,
        setQuestions,
        setAnswer,
        setCurrentIndex,
        calculateScore,
        setFeedback,
        setScreen,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
