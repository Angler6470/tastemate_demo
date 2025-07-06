
import React from 'react';
import { useLang } from '../context/LanguageContext';

// ChatIntro component: now displays nothing (removed greeting and sample)
export default function ChatIntro() {
  const { t } = useLang();
  return null;
}
