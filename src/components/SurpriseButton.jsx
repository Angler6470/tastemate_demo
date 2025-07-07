import React, { useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import menu from '../data/menu.json'; // Example: import menu.json from data

export default function SurpriseButton({ onSurprise, disabled, loading }) {
  const { t } = useLang();
  const lastIndex = useRef(null);

  const randomSurprise = () => {
    if (menu.length > 1) {
      let index;
      do {
        index = Math.floor(Math.random() * menu.length);
      } while (index === lastIndex.current);
      lastIndex.current = index;
      return menu[index];
    }
    return menu[0];
  };

  return (
    <button
      onClick={() => onSurprise(randomSurprise())}
      aria-label={t('Click to get a surprise food suggestion')}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full"
      disabled={disabled}
    >
      {loading ? '🔄' : t('surprise')}
    </button>
  );
}