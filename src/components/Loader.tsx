import { Loader2 } from 'lucide-react';

interface LoaderProps {
  message?: string;
}

export function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 border-2 border-gray-700 mb-6">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
        <p className="text-xl text-gray-300 font-medium">{message}</p>
        <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
      </div>
    </div>
  );
}
