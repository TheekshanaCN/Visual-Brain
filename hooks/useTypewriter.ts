'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PLACEHOLDERS = [
  "Ask Visual Brain anything...",
  "Paste your messy notes here...",
  "Summarize this article...",
  "Create a roadmap for learning React...",
  "Brainstorm marketing ideas...",
  "Explain quantum computing..."
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
