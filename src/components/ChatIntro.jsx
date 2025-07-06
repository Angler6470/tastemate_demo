import React from 'react';
import { useLang } from '../context/LanguageContext';

// ChatIntro component: displays a friendly greeting and a sample suggestion
export default function ChatIntro() {
  const { t } = useLang();
  return (
    <div className="text-sm">
      {/* Greeting and sample suggestion, translated */}
      {t('welcome')} <br />
      <span className="font-medium">{t('sample')}</span>
    </div>
  );
}
