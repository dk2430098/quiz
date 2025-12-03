import { Trophy, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export function ResultScreen() {
  const { state, resetQuiz } = useQuiz();

  const percentage = (state.score / state.questions.length) * 100;

  const getScoreColor = () => {
    if (percentage === 100) return 'from-yellow-500 to-orange-500';
    if (percentage >= 80) return 'from-green-500 to-emerald-500';
    if (percentage >= 60) return 'from-blue-500 to-cyan-500';
    if (percentage >= 40) return 'from-purple-500 to-pink-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${getScoreColor()} mb-6 animate-pulse`}
          >
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Quiz Complete!</h1>
          <p className="text-xl text-gray-400">{state.topic}</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8">
          <div className="text-center mb-8">
            <div className="text-7xl font-bold text-white mb-2">
              {state.score}/{state.questions.length}
            </div>
            <div className="text-2xl font-medium text-gray-400">
              {percentage.toFixed(0)}% Correct
            </div>
          </div>

          <div className="h-4 bg-gray-700 rounded-full overflow-hidden mb-8">
            <div
              className={`h-full bg-gradient-to-r ${getScoreColor()} transition-all duration-1000 ease-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
            <p className="text-lg text-gray-300 leading-relaxed">
              {state.feedback}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Answer Summary
          </h3>
          <div className="space-y-3">
            {state.questions.map((question, index) => {
              const isCorrect = state.answers[index] === question.correctIndex;
              return (
                <div
                  key={question.id}
                  className="flex items-center justify-between bg-gray-750 rounded-lg p-4 border border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <XCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="text-gray-300 font-medium">
                      Question {index + 1}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={resetQuiz}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/20"
        >
          <RotateCcw className="w-6 h-6" />
          Try Another Quiz
        </button>
      </div>
    </div>
  );
}
