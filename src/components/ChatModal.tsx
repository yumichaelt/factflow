
'use client';

import React, { useState } from 'react';

interface ChatModalProps {
  fact: {
    fact: string;
  };
  onClose: () => void;
}

export default function ChatModal({ fact, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState([
    { from: 'ai', text: `Here's a fun fact: ${fact.fact} What would you like to know more about?` },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { from: 'user', text: input.trim() }];
      setMessages(newMessages);
      setInput('');
      setIsLoading(true);

      // Add a placeholder for the AI response
      setMessages(prev => [...prev, { from: 'ai', text: '' }]);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fact: fact.fact, message: input.trim() }),
        });

        if (response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let done = false;

          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            const chunk = decoder.decode(value, { stream: true });
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage.from === 'ai') {
                const updatedMessages = [...prev];
                updatedMessages[prev.length - 1] = {
                  ...lastMessage,
                  text: lastMessage.text + chunk,
                };
                return updatedMessages;
              }
              return prev;
            });
          }
        } else {
          setMessages(prev => [...prev, { from: 'ai', text: 'Error: No response body' }]);
        }

      } catch (error) {
        setMessages(prev => [...prev, { from: 'ai', text: 'An unexpected error occurred.' }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-2xl flex flex-col h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Deeper Dive</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-700 rounded-md">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg ${msg.from === 'user' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1].from === 'user' && (
            <div className="text-left">
              <div className="inline-block p-3 rounded-lg bg-gray-600">
                Thinking...
              </div>
            </div>
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask a follow-up question..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
