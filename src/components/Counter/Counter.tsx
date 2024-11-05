import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Counter Component</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(prev => prev - 1)}
          className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
          aria-label="Decrease count"
        >
          <Minus className="w-6 h-6" />
        </button>
        <span className="text-2xl font-bold" data-testid="count-value">{count}</span>
        <button
          onClick={() => setCount(prev => prev + 1)}
          className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
          aria-label="Increase count"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}