import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ProgressBar';
import { useQuiz } from '../context/QuizContext';
import { generateFeedback } from '../services/aiService';

export function QuizScreen() {
  const {
    state,
    setAnswer,
    setCurrentIndex,
    calculateScore,
    setFeedback,
    setScreen,
  } = useQuiz();

  const currentQuestion = state.questions[state.currentIndex];
  const isLastQuestion = state.currentIndex === state.questions.length - 1;
  const isFirstQuestion = state.currentIndex === 0;
  const hasAnsweredCurrent = state.answers[state.currentIndex] !== null;

  const handleSelectAnswer = (answerIndex: number) => {
    setAnswer(state.currentIndex, answerIndex);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex(state.currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentIndex(state.currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const allAnswered = state.answers.every((answer) => answer !== null);
    if (!allAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setScreen('loading');
    const score = calculateScore();

    try {
      const feedback = await generateFeedback(score, state.questions.length);
      setFeedback(feedback);
      setScreen('result');
    } catch (error) {
      alert('Failed to generate feedback. Please try again.');
      setScreen('quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">{state.topic}</h1>
            <span className="text-sm text-gray-400 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
              {state.answers.filter((a) => a !== null).length} /{' '}
              {state.questions.length} answered
            </span>
          </div>
          <ProgressBar
            current={state.currentIndex}
            total={state.questions.length}
          />
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={state.answers[state.currentIndex]}
          onSelectAnswer={handleSelectAnswer}
        />

        <div className="flex gap-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex-1" />

          {!isLastQuestion ? (
            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/20"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg shadow-green-500/20"
            >
              <Check className="w-5 h-5" />
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
