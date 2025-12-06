"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

export default function InputSection() {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const placeholderText = useTypewriter();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [inputValue]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full flex justify-center px-4 pointer-events-none">
      <motion.div
        layout
        initial={{ width: "400px" }}
        animate={{ width: isFocused || inputValue ? "650px" : "400px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`pointer-events-auto relative flex items-end gap-2 p-2 rounded-3xl glass-premium shadow-premium transition-colors duration-300 ${isFocused ? "ring-2 ring-primary/20" : ""}`}
      >
        <div className="flex-shrink-0 p-5">
          <Sparkles className={`w-5 h-5 transition-colors ${isFocused ? "text-primary" : "text-muted-foreground"}`} />
        </div>

        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full max-h-[200px] py-3 bg-transparent border-none text-foreground
  focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
  outline-none ring-0 resize-none custom-scrollbar text-base z-10 relative"
            rows={1}
            style={{ minHeight: "48px" }}
          />


          {/* Typewriter Placeholder */}
          {!inputValue && (
            <div className="absolute top-3 left-0 pointer-events-none text-muted-foreground/60 truncate w-full">
              {placeholderText}
              <span className="animate-pulse">|</span>
            </div>
          )}
        </div>

        <button
          disabled={!inputValue.trim()}
          className={`flex-shrink-0 p-3 rounded-2xl transition-all duration-200
            ${inputValue.trim()
              ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg"
              : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}