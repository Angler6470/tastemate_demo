import React from 'react';
import { useLang } from '../context/LanguageContext';

// SpiceSlider component: allows users to select spice level
export default function SpiceSlider({ value, setValue }) {
  const { t } = useLang();
  const spiceLabels = ['None', 'Mild', 'Medium', 'Hot', 'Fire!'];

  return (
    <div className="flex flex-col items-center space-y-2 mb-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('spicePrompt')}
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min="0"
          max="4"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className="w-32 accent-red-500"
        />
        <span className="text-sm font-bold text-red-600 dark:text-red-400 min-w-[60px]">
          {spiceLabels[value]}
        </span>
      </div>
    </div>
  );
}