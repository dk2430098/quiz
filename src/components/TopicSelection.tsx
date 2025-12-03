import { Brain, TrendingUp, Heart } from 'lucide-react';

interface TopicSelectionProps {
  onSelectTopic: (topic: string) => void;
}

const topics = [
  {
    id: 'AI Basics',
    name: 'AI Basics',
    description: 'Test your knowledge of artificial intelligence fundamentals',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'Tech Trends',
    name: 'Tech Trends',
    description: 'Explore the latest developments in technology',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'Wellness',
    name: 'Wellness',
    description: 'Learn about health and well-being practices',
    icon: Heart,
    color: 'from-green-500 to-emerald-500',
  },
];

export function TopicSelection({ onSelectTopic }: TopicSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {topics.map((topic) => {
        const Icon = topic.icon;
        return (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="group bg-gray-800 rounded-2xl p-8 border-2 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left"
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${topic.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{topic.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {topic.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
