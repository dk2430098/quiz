import { Question } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
      <div className="mb-8">
        <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
          Question {question.id}
        </span>
        <h2 className="text-2xl font-bold text-white mt-3 leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full text-left p-5 rounded-xl transition-all duration-200 border-2 ${
              selectedAnswer === index
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-[1.02]'
                : 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-650 hover:border-gray-500 hover:scale-[1.01]'
            }`}
          >
            <div className="flex items-center">
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-4 ${
                  selectedAnswer === index
                    ? 'bg-white text-blue-600'
                    : 'bg-gray-600 text-gray-300'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
