import React from 'react';
import { useLang } from '../context/LanguageContext';
import SpiceSlider from './SpiceSlider';

export default function ChatBox({ input, setInput, spiceLevel, setSpiceLevel, messages, loading }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-1 max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-2 rounded w-full">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={msg.role === 'user' ? 'font-semibold text-teal-600' : 'font-semibold text-orange-600'}>
              {msg.role === 'user' ? 'You: ' : 'TasteMate: '}
            </span>
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-orange-400">TasteMate is thinking...</div>}
      </div>
      <div className="flex gap-2 items-center w-full">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t('inputPlaceholder')}
          className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 min-w-0"
          disabled={loading}
        />
      </div>
      <div className="mt-2 w-full">
        <SpiceSlider value={spiceLevel} setValue={setSpiceLevel} />
      </div>
    </div>
  );
}
