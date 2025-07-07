
import React from 'react';
import { useLang } from '../context/LanguageContext';

// ChatIntro component: displays welcome message from translations
export default function ChatIntro() {
  const { t } = useLang();
  
  return (
    <div className="text-center text-gray-600 dark:text-gray-300 text-sm mb-2 sm:mb-4 px-2 sm:px-4">
      {t('welcome')}
    </div>
  );
}
