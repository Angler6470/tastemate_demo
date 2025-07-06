import React from 'react';
import { useLang } from '../context/LanguageContext';

// InputBox component: handles user text input
export default function InputBox({ value, onChange, onKeyPress, disabled }) {
  const { t } = useLang();

  return (
    <input
      type="text"
      placeholder={t('inputPlaceholder')}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      disabled={disabled}
    />
  );
}