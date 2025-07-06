
import React from 'react';
import { useLang } from '../context/LanguageContext';
import config from '../data/config.json';

// ChatIntro component: displays welcome message from config
export default function ChatIntro() {
  const { t } = useLang();
  
  return (
    <div className="text-center text-gray-600 dark:text-gray-300 text-sm mb-4 px-4">
      {config.messages.welcome}
    </div>
  );
}
