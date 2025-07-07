import React, { useRef } from 'react';
import { useLang } from '../context/LanguageContext';

// Subtle, less vibrant gradients for each flavor
const hotkeyColor = 'bg-[#AFF0ED] text-gray-900';
const flavorGradients = {
  Sweet: hotkeyColor,
  Savory: hotkeyColor,
  Spicy: hotkeyColor,
  Tangy: hotkeyColor,
  Creamy: hotkeyColor,
  Smoky: hotkeyColor,
  Fresh: hotkeyColor,
  Vegetarian: hotkeyColor,
  Cheesy: hotkeyColor,
  Crunchy: hotkeyColor,
};

// Emoji icons for each flavor (use fire for Spicy)
const flavorIcons = {
  Sweet: '🍬',
  Savory: '🍖',
  Spicy: '🔥', // fire for spicy
  Tangy: '🍋',
  Creamy: '🥛',
  Smoky: '💨',
  Fresh: '🥗',
  Vegetarian: '🥦',
  Cheesy: '🧀',
  Crunchy: '🥨',
};

// FlavorShortcuts component: renders quick-select buttons for flavors
export default function FlavorShortcuts({ onFlavorClick }) {
  const { t } = useLang();
  // Get the array of flavor keys from the translation file
  const flavorKeys = t('flavors');
  // If the translation returns a string, fallback to default keys
  const keys = Array.isArray(flavorKeys) ? flavorKeys : Object.keys(flavorGradients);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 w-full px-1 sm:px-0">
      {keys.map(flavor => {
        const btnRef = useRef();
        return (
          <button
            key={flavor}
            ref={btnRef}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-sm transition-colors ${flavorGradients[flavor] || 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
            aria-label={`Select ${flavor} flavor`}
            onMouseDown={e => {
              btnRef.current?.classList.add('shortcut-animate');
            }}
            onAnimationEnd={e => {
              btnRef.current?.classList.remove('shortcut-animate');
            }}
            onMouseEnter={e => {
              btnRef.current?.classList.add('shortcut-animate');
            }}
            onClick={() => onFlavorClick && onFlavorClick(flavor)}
          >
            <span className="text-sm sm:text-lg" aria-hidden="true">{flavorIcons[flavor] || '🍽️'}</span>
            {flavor}
          </button>
        );
      })}
    </div>
  );
}
