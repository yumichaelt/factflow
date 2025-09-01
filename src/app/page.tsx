'use client';

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/client';

import ChatModal from '@/components/ChatModal'; // Assuming you have this component

export default function Home() {
  const [randomFact, setRandomFact] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchRandomFact = async () => {
      const supabase = createClient();
      const { data: facts, error } = await supabase.from('facts').select('*');

      if (facts && facts.length > 0) {
        const randomIndex = Math.floor(Math.random() * facts.length);
        setRandomFact(facts[randomIndex]);
      }
    };

    fetchRandomFact();
  }, []);

  const handleLearnMore = () => {
    if (randomFact) {
      setIsChatOpen(true);
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <main className="flex-grow container mx-auto p-4 sm:p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Today's Fun Fact</h2>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <p className="text-lg">
              {randomFact ? randomFact.fact : 'Loading your daily fact...'}
            </p>
          </div>
          {randomFact && (
            <button
              onClick={handleLearnMore}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Learn More
            </button>
          )}
        </div>
      </main>
      <Footer />

      {isChatOpen && randomFact && (
        <ChatModal
          fact={randomFact}
          onClose={handleCloseChat}
        />
      )}
    </>
  );
}
