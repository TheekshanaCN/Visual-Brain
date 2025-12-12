'use client';

import { useState, useEffect } from 'react';

const PLACEHOLDERS = [
"Tell About Your Idea ....",
"EX: AI-powered Todo App",
"Explain Your Next Unicorn ....",
"EX: SaaS to automate Telegram shops",
"Pitch Your Next Big Thing ....",
"EX: SaaS For Hotel Management",
"Describe Your Million-Dollar Idea ....",
"EX: Personalized Fitness Bot",
"Share Your Startup Vision ....",
"EX: Platform to manage freelance clients",
"Outline Your Next Innovation ....",
"EX: AI code review assistant",
"Bring Your Idea to Life",
"EX: Subscription-based e-learning platform",
"Sketch Your Idea in Words",
"EX: Chrome extension to track productivity",
];

export function useTypewriter(placeholders: string[] = PLACEHOLDERS) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentPlaceholder = placeholders[currentIndex];
      
      if (!isDeleting) {
        if (currentText.length < currentPlaceholder.length) {
          setCurrentText(currentPlaceholder.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentPlaceholder.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % placeholders.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, placeholders]);

  return currentText;
}
