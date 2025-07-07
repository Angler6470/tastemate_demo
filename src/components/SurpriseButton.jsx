import React from 'react';
import { useLang } from '../context/LanguageContext';

// SurpriseButton component: generates a surprise food prompt
export default function SurpriseButton({ onSurprise, disabled, loading }) {
  const { t } = useLang();

  return (
    <button
      onClick={onSurprise}
      aria-label={t('Click to get a surprise food suggestion')}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full"
      disabled={disabled}
    >
      {loading ? '🔄' : t('surprise')}
    </button>
  );
}