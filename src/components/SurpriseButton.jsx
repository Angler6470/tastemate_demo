import React from 'react';
import { useLang } from '../context/LanguageContext';

// Fun, stylish prompts for the Surprise Me button
const surprisePrompts = [
  'Give me something cheesy and bold!',
  'I want a crunchy snack with a kick.',
  'Surprise me with a vegetarian delight!',
  'What’s your cheesiest menu item?',
  'I’m craving something spicy and fresh.',
  'Suggest a tangy treat!',
  'What’s a must-try for Taco Tuesday?',
  'Hit me with a late-night snack idea.',
  'What’s your most popular dish?',
  'I want something creamy and mild.'
];

// SurpriseButton component: triggers a random suggestion
export default function SurpriseButton({ onSurprise, disabled }) {
  const { t } = useLang();
  const handleClick = () => {
    if (disabled) return;
    const prompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
    if (onSurprise) onSurprise(prompt);
  };
  return (
    <button
      type="button"
      className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full transition-transform active:scale-95"
      onClick={handleClick}
      disabled={disabled}
      title="Insert a fun random prompt"
    >
      {/* Dice emoji for surprise, translated */}
      {t('surprise')}
    </button>
  );
}