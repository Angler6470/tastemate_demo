import React from 'react';
import { useLang } from '../context/LanguageContext';

// InputBox component: user types their craving here
export default function InputBox() {
  const { t } = useLang();
  return (
    <input
      type="text"
      placeholder={t('inputPlaceholder')}
      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
    />
  );
}
