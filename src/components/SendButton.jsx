import React from 'react';
import { useLang } from '../context/LanguageContext';

// SendButton component: handles sending user input
export default function SendButton({ onClick, disabled }) {
  const { t } = useLang();

  return (
    <button
      onClick={onClick}
      className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full"
      disabled={disabled}
    >
      {t('send')}
    </button>
  );
}