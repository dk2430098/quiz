import { QuizProvider, useQuiz } from './context/QuizContext';
import { TopicScreen } from './screens/TopicScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultScreen } from './screens/ResultScreen';
import { Loader } from './components/Loader';

function AppContent() {
  const { screen } = useQuiz();

  switch (screen) {
    case 'topic':
      return <TopicScreen />;
    case 'loading':
      return <Loader message="Generating questions..." />;
    case 'quiz':
      return <QuizScreen />;
    case 'result':
      return <ResultScreen />;
    default:
      return <TopicScreen />;
  }
}

function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}

export default App;
