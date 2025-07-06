import React from 'react';
import { useLang } from '../context/LanguageContext';

// SendButton component: submits the user's craving
export default function SendButton() {
  const { t } = useLang();
  return (
    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full">
      {/* Envelope emoji for send, translated */}
      {t('send')}
    </button>
  );
}