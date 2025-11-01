import { useState, KeyboardEvent } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="relative border-t border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/40 dark:bg-black/40 px-4 py-4 shadow-2xl"
    >
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className={`relative flex items-end gap-3 p-2 rounded-3xl backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 border transition-all duration-300 ${
            isFocused 
              ? "border-cyan-400/50 shadow-lg shadow-cyan-500/20 neon-glow-cyan" 
              : "border-white/30 dark:border-slate-700/30 shadow-md"
          }`}
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.2 }}
        >
          {/* Glass overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent pointer-events-none" />
          
          <div className="flex-1 relative z-10">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask your medical question..."
              disabled={disabled}
              className="min-h-[52px] max-h-[200px] resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-300"
              rows={1}
            />
          </div>

          {/* Send button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10"
          >
            <Button
              onClick={handleSend}
              disabled={!message.trim() || disabled}
              size="icon"
              className="relative h-12 w-12 bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600 hover:from-cyan-600 hover:via-teal-600 hover:to-cyan-700 text-white rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg neon-glow-cyan overflow-hidden group"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Glass overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
              
              <AnimatePresence mode="wait">
                {disabled ? (
                  <motion.div
                    key="loading"
                    initial={{ rotate: 0, scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    exit={{ rotate: 360, scale: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>

        {/* Character count or hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          className="mt-2 px-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"
        >
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{message.length} characters</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
