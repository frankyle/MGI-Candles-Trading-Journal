import React from 'react';

const emotionsList = ['Confident', 'Fearful', 'Revengeful', 'Calm', 'Anxious'];

const EmotionSelector = ({ emotions, onToggle }) => (
  <div>
    <label className="block text-gray-700 mb-2">Emotions:</label>
    <div className="flex flex-wrap gap-3">
      {emotionsList.map((emotion) => (
        <label key={emotion} className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={emotions.includes(emotion)}
            onChange={() => onToggle(emotion)}
          />
          <span>{emotion}</span>
        </label>
      ))}
    </div>
  </div>
);

export default EmotionSelector;
