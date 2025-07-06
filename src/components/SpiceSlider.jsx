import React from 'react';
import { useLang } from '../context/LanguageContext';

// SpiceSlider component: allows users to select spice level
export default function SpiceSlider({ value, setValue }) {
  const { t } = useLang();
  const spiceLabels = ['None', 'Mild', 'Medium', 'Hot', 'Fire!'];
  const spiceColors = ['#38bdf8', '#fdba74', '#fb923c', '#ea580c', '#b91c1c'];
  const spiceEmojis = ['❄️', '🌶️', '🔥', '🌋', '💀'];

  return (
    <div className="flex flex-col items-center space-y-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('spicePrompt')}
      </label>
      <div className="flex items-center space-x-3 w-full">
        <span className="text-lg">{spiceEmojis[0]}</span>
        <input
          type="range"
          min="0"
          max="4"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer slider-color-${value}`}
          style={{
            background: `linear-gradient(to right, ${spiceColors[value]} 0%, ${spiceColors[value]} ${(value / 4) * 100}%, #e5e7eb ${(value / 4) * 100}%, #e5e7eb 100%)`
          }}
        />
        <span className="text-lg">{spiceEmojis[4]}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-lg">{spiceEmojis[value]}</span>
        <span 
          className={`text-sm font-bold min-w-[60px] transition-all duration-300 ${
            value > 0 ? `spice-glow-${value}` : ''
          }`}
          style={{ color: spiceColors[value] }}
        >
          {spiceLabels[value]}
        </span>
      </div>
    </div>
  );
}