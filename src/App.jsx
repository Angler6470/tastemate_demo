import React, { Suspense, lazy, useState } from 'react';

// Lazy load all main components
const Header = lazy(() => import('./components/Header'));
const PromoCarousel = lazy(() => import('./components/PromoCarousel'));
const ChatIntro = lazy(() => import('./components/ChatIntro'));
const FlavorShortcuts = lazy(() => import('./components/FlavorShortcuts'));
const SurpriseButton = lazy(() => import('./components/SurpriseButton'));
const SendButton = lazy(() => import('./components/SendButton'));
const AdminRoute = lazy(() => import('./admin/AdminRoute'));
const ChatBox = lazy(() => import('./components/ChatBox'));
import { LanguageProvider } from './context/LanguageContext.jsx';

// Main App component: wraps all UI components for the TasteMate app
export default function App() {
  // State for chat input and loading, to pass to SendButton/SurpriseButton
  const [input, setInput] = useState('');
  const [spiceLevel, setSpiceLevel] = useState(0);
  const [loading, setLoading] = useState(false);
  const [surpriseLoading, setSurpriseLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  // Handler for sending chat
  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { role: 'user', content: input }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, spiceLevel })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { role: 'bot', content: data.answer }]);
    } catch (e) {
      setMessages(msgs => [...msgs, { role: 'bot', content: 'Sorry, there was an error.' }]);
    }
    setLoading(false);
    setInput('');
  };

  // Handler for SurpriseButton to set input using OpenAI API
  const handleSurprise = async () => {
    setSurpriseLoading(true);
    try {
      const res = await fetch('/api/chat/surprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (data && data.prompt) setInput(data.prompt);
      else setInput('Surprise me with something tasty!');
    } catch (e) {
      setInput('Surprise me with something tasty!');
    }
    setSurpriseLoading(false);
  };

  // Handler for hotkey click to get a fun prompt from OpenAI and auto-send
  const handleFlavorClick = async (flavor) => {
    setLoading(true);
    try {
      // First, get the creative prompt
      const res = await fetch('/api/chat/flavor-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flavor })
      });
      const data = await res.json();
      const prompt = data && data.prompt ? data.prompt : `I'm craving something with ${flavor}!`;
      
      // Set the input and add user message
      setInput(prompt);
      setMessages(msgs => [...msgs, { role: 'user', content: prompt }]);
      
      // Automatically send the request to get menu recommendation
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, spiceLevel })
      });
      const chatData = await chatRes.json();
      setMessages(msgs => [...msgs, { role: 'bot', content: chatData.answer }]);
      
      // Clear the input after sending
      setInput('');
    } catch (e) {
      const fallbackPrompt = `I'm craving something with ${flavor}!`;
      setInput(fallbackPrompt);
      setMessages(msgs => [...msgs, { role: 'user', content: fallbackPrompt }]);
      setMessages(msgs => [...msgs, { role: 'bot', content: 'Sorry, there was an error connecting to the server.' }]);
    }
    setLoading(false);
  };

  return (
    // Wrap the app in LanguageProvider to provide language context
    <LanguageProvider>
      {/* Add a route for /admin (simple conditional for demo) */}
      {window.location.pathname === '/admin' ? (
        <Suspense fallback={<div>Loading admin...</div>}>
          <AdminRoute />
        </Suspense>
      ) : (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 space-y-4 mx-auto min-h-screen flex flex-col justify-center">
          {/* Header with theme and language controls */}
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            {/* Logo section */}
            <div className="flex flex-col items-center p-0.5">
              <img
                src="/images/logo.png"
                alt="TasteMate Logo"
                className="w-28 h-28 mb-2 transition-transform fast-spin"
                loading="lazy"
              />
            </div>
            {/* Promo carousel for featured dishes */}
            <PromoCarousel />
            {/* Chat intro message */}
            <ChatIntro />
            {/* Chat box with OpenAI integration */}
            <ChatBox
              input={input}
              setInput={setInput}
              spiceLevel={spiceLevel}
              setSpiceLevel={setSpiceLevel}
              messages={messages}
              loading={loading}
            />
            <FlavorShortcuts onFlavorClick={handleFlavorClick} />
            {/* Action buttons at the very end, below hotkeys */}
            <div className="flex flex-col items-center space-y-2 mt-2">
              <div className="flex gap-2 justify-center">
                <Suspense fallback={null}>
                  <SurpriseButton onSurprise={handleSurprise} disabled={loading || surpriseLoading} loading={surpriseLoading} />
                  <button
                    onClick={handleSend}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full"
                    disabled={loading}
                  >
                    Send
                  </button>
                </Suspense>
              </div>
            </div>
          </Suspense>
        </div>
      )}
    </LanguageProvider>
  );
}