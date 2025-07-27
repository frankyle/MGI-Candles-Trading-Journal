import React from 'react';

const emotionsList = ['Confident', 'Fearful', 'Revengeful', 'Calm', 'Anxious'];

const EmotionSelector = ({ emotions, onToggle }) => (
  <div>
    <label className="block text-gray-700 mb-2 font-semibold" htmlFor="emotion-selector">
      Emotions:
    </label>
    <div id="emotion-selector" className="flex flex-wrap gap-4">
      {emotionsList.map((emotion) => (
        <label
          key={emotion}
          className="flex items-center space-x-2 text-sm cursor-pointer select-none"
        >
          <input
            type="checkbox"
            checked={emotions.includes(emotion)}
            onChange={() => onToggle(emotion)}
            className="accent-indigo-600"
            aria-checked={emotions.includes(emotion)}
          />
          <span>{emotion}</span>
        </label>
      ))}
    </div>
  </div>
);

export default EmotionSelector;
