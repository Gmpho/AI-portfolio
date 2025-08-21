'use client';

import React, { useState } from 'react';

const ChatBotModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-110"
        >
          {/* You can use an icon here, e.g., from lucide-react */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-80 h-96 bg-card border rounded-lg shadow-xl flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-card-foreground">AI Career Coach</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Chat messages will go here */}
            <p className="text-sm text-muted-foreground">How can I help you?</p>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Ask a question..."
              className="w-full p-2 border rounded-md bg-background"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotModal;
