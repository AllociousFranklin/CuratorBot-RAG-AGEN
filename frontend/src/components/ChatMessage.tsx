import { motion } from "motion/react";
import { Sparkles, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex gap-4 mb-6 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <motion.div 
        className={`relative w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
          isUser 
            ? "bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 shadow-lg shadow-purple-500/30" 
            : "bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600 neon-glow-cyan"
        }`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Sparkles className="w-5 h-5 text-white" />
        )}
        {/* Glass overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
        
        {/* Animated ring for bot */}
        {!isUser && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>
      
      {/* Message bubble */}
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[75%]`}>
        <motion.div
          className={`relative px-5 py-3 rounded-3xl backdrop-blur-xl border shadow-xl ${
            isUser
              ? "bg-gradient-to-br from-purple-500/90 via-blue-500/90 to-purple-600/90 text-white border-purple-400/30 rounded-br-md shadow-purple-500/20"
              : "bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border-white/30 dark:border-slate-700/30 rounded-bl-md"
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {/* Inner glow for user messages */}
          {isUser && (
            <div className="absolute inset-0 rounded-3xl rounded-br-md bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          )}
          
          {/* Glass effect for bot messages */}
          {!isUser && (
            <div className="absolute inset-0 rounded-3xl rounded-bl-md bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent pointer-events-none" />
          )}
          
          <p className="whitespace-pre-wrap break-words leading-relaxed relative z-10">
            {message}
          </p>
          
          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
        
        <motion.span 
          className="text-xs text-slate-500 dark:text-slate-400 mt-2 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </motion.span>
      </div>
    </motion.div>
  );
}
