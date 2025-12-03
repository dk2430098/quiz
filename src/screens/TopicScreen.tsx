import { Sparkles } from 'lucide-react';
import { TopicSelection } from '../components/TopicSelection';
import { useQuiz } from '../context/QuizContext';
import { generateQuestions } from '../services/aiService';

export function TopicScreen() {
  const { setTopic, setQuestions, setScreen } = useQuiz();

  const handleSelectTopic = async (topic: string) => {
    setTopic(topic);
    setScreen('loading');

    try {
      const questions = await generateQuestions(topic);
      setQuestions(questions);
      setScreen('quiz');
    } catch (error) {
      alert('Failed to generate questions. Please try again.');
      setScreen('topic');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            AI Knowledge Quiz
          </h1>
          <p className="text-xl text-gray-400">
            Choose a topic to test your knowledge
          </p>
        </div>

        <TopicSelection onSelectTopic={handleSelectTopic} />
      </div>
    </div>
  );
}
