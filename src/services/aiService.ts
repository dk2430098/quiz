import { Question } from '../types/quiz';

const QUESTION_TEMPLATES: Record<string, Array<{
  question: string;
  options: string[];
  correctIndex: number;
}>> = {
  'AI Basics': [
    {
      question: 'What does AI stand for?',
      options: ['Artificial Intelligence', 'Automated Information', 'Advanced Integration', 'Algorithmic Innovation'],
      correctIndex: 0,
    },
    {
      question: 'Which of the following is a subset of AI?',
      options: ['Blockchain', 'Machine Learning', 'Cloud Computing', 'Quantum Computing'],
      correctIndex: 1,
    },
    {
      question: 'What is the primary goal of supervised learning?',
      options: ['Find patterns without labels', 'Learn from labeled data', 'Generate new content', 'Process natural language'],
      correctIndex: 1,
    },
    {
      question: 'Which technology enables computers to understand human language?',
      options: ['Computer Vision', 'Natural Language Processing', 'Robotics', 'Neural Networks'],
      correctIndex: 1,
    },
    {
      question: 'What is a neural network inspired by?',
      options: ['Computer architecture', 'Mathematical functions', 'Human brain', 'Quantum mechanics'],
      correctIndex: 2,
    },
    {
      question: 'What type of AI can generate images from text descriptions?',
      options: ['Classification AI', 'Generative AI', 'Regression AI', 'Clustering AI'],
      correctIndex: 1,
    },
    {
      question: 'Which algorithm is commonly used for decision-making in AI?',
      options: ['Bubble Sort', 'Decision Tree', 'Binary Search', 'Quick Sort'],
      correctIndex: 1,
    },
    {
      question: 'What is the Turing Test designed to evaluate?',
      options: ['Processing speed', 'Machine intelligence', 'Memory capacity', 'Power efficiency'],
      correctIndex: 1,
    },
  ],
  'Tech Trends': [
    {
      question: 'What does IoT stand for?',
      options: ['Internet of Things', 'Integration of Technology', 'Interface of Tools', 'Innovation of Tech'],
      correctIndex: 0,
    },
    {
      question: 'Which technology uses distributed ledger systems?',
      options: ['Cloud Computing', 'Blockchain', 'Virtual Reality', 'Artificial Intelligence'],
      correctIndex: 1,
    },
    {
      question: 'What is 5G primarily known for?',
      options: ['Better graphics', 'Faster internet speed', 'Longer battery life', 'Cheaper devices'],
      correctIndex: 1,
    },
    {
      question: 'Which company developed the React framework?',
      options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
      correctIndex: 1,
    },
    {
      question: 'What does API stand for?',
      options: ['Application Programming Interface', 'Advanced Protocol Integration', 'Automated Program Interaction', 'Application Process Integration'],
      correctIndex: 0,
    },
    {
      question: 'Which cloud service model provides virtualized computing resources?',
      options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
      correctIndex: 2,
    },
    {
      question: 'What is the main purpose of Docker?',
      options: ['Version control', 'Containerization', 'Database management', 'UI design'],
      correctIndex: 1,
    },
    {
      question: 'Which protocol is used for secure web communication?',
      options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
      correctIndex: 2,
    },
  ],
  'Wellness': [
    {
      question: 'How many hours of sleep do adults typically need?',
      options: ['4-5 hours', '5-6 hours', '7-9 hours', '10-12 hours'],
      correctIndex: 2,
    },
    {
      question: 'What is the recommended daily water intake for adults?',
      options: ['2-3 cups', '4-5 cups', '6-7 cups', '8-10 cups'],
      correctIndex: 3,
    },
    {
      question: 'Which vitamin is primarily obtained from sunlight?',
      options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'],
      correctIndex: 3,
    },
    {
      question: 'What is the recommended duration of moderate exercise per week?',
      options: ['30 minutes', '75 minutes', '150 minutes', '300 minutes'],
      correctIndex: 2,
    },
    {
      question: 'Which practice is known to reduce stress and improve focus?',
      options: ['Multitasking', 'Meditation', 'Social media browsing', 'Late-night work'],
      correctIndex: 1,
    },
    {
      question: 'What is the ideal room temperature for sleep?',
      options: ['80-85°F', '75-78°F', '68-72°F', '60-65°F'],
      correctIndex: 2,
    },
    {
      question: 'Which nutrient is essential for muscle repair?',
      options: ['Carbohydrates', 'Protein', 'Fat', 'Fiber'],
      correctIndex: 1,
    },
    {
      question: 'How often should adults get a comprehensive health checkup?',
      options: ['Every month', 'Every 6 months', 'Every year', 'Every 5 years'],
      correctIndex: 2,
    },
  ],
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function simulateAIDelay(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500 + Math.random() * 1000);
  });
}

async function parseJSONWithRetry<T>(
  jsonString: string,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const cleaned = jsonString.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '');
      return JSON.parse(cleaned) as T;
    } catch (error) {
      if (i === maxRetries - 1) {
        throw new Error('Failed to parse JSON after retries');
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error('Failed to parse JSON');
}

export async function generateQuestions(topic: string): Promise<Question[]> {
  await simulateAIDelay();

  const templates = QUESTION_TEMPLATES[topic] || QUESTION_TEMPLATES['AI Basics'];
  const selectedQuestions = shuffleArray(templates).slice(0, 5);

  const questions: Question[] = selectedQuestions.map((q, index) => ({
    id: index + 1,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
  }));

  const mockResponse = JSON.stringify({ questions });

  try {
    const parsed = await parseJSONWithRetry<{ questions: Question[] }>(mockResponse);
    return parsed.questions;
  } catch (error) {
    throw new Error('Failed to generate questions. Please try again.');
  }
}

export async function generateFeedback(
  score: number,
  total: number
): Promise<string> {
  await simulateAIDelay();

  const percentage = (score / total) * 100;
  let feedback: string;

  if (percentage === 100) {
    feedback = 'Perfect score! You have an excellent understanding of this topic. Your knowledge is impressive!';
  } else if (percentage >= 80) {
    feedback = 'Great job! You demonstrated strong knowledge with only a few minor gaps. Keep up the excellent work!';
  } else if (percentage >= 60) {
    feedback = 'Good effort! You have a solid foundation, but there is room for improvement. Review the areas you missed and try again.';
  } else if (percentage >= 40) {
    feedback = 'Fair attempt! You got some questions right, but there are significant gaps in your understanding. Consider studying the topic more thoroughly.';
  } else {
    feedback = "Don't be discouraged! Learning is a journey. Take some time to review the material and try the quiz again. You'll do better next time!";
  }

  const mockResponse = JSON.stringify({ feedback });

  try {
    const parsed = await parseJSONWithRetry<{ feedback: string }>(mockResponse);
    return parsed.feedback;
  } catch (error) {
    return 'Thank you for taking the quiz! Keep learning and improving.';
  }
}
