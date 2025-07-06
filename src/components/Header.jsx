import React, { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';

export default function Header() {
  // 🌗 Theme toggle state: initialize from localStorage
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  // 🌐 Language state/context
  const { lang, setLang } = useLang();

  // Apply dark mode class to <html> tag on change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="flex justify-end items-center gap-2 w-full">
      <div className="flex items-center space-x-2">
        {/* 🌓 Theme toggle button */}
        <button
          onClick={() => setDark(!dark)}
          className="text-xl hover:scale-105 transition"
          aria-label="Toggle dark mode"
        >
          {dark ? '🌞' : '🌙'}
        </button>

        {/* 🇺🇸 English Flag Button */}
        <button
          onClick={() => setLang('en')}
          className={`text-xl hover:scale-105 transition ${lang === 'en' ? 'opacity-100' : 'opacity-50'}`}
          aria-label="Switch to English"
        >
          🇺🇸
        </button>

        {/* 🇲🇽 Spanish Flag Button */}
        <button
          onClick={() => setLang('es')}
          className={`text-xl hover:scale-105 transition ${lang === 'es' ? 'opacity-100' : 'opacity-50'}`}
          aria-label="Switch to Spanish"
        >
          🇲🇽
        </button>
      </div>
    </div>
  );
}
