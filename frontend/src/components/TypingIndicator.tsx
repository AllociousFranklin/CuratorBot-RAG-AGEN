import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex gap-4 mb-6"
    >
      {/* Avatar */}
      <motion.div 
        className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600 flex items-center justify-center shrink-0 neon-glow-cyan"
        animate={{
          boxShadow: [
            "0 0 20px rgba(6, 182, 212, 0.3)",
            "0 0 40px rgba(6, 182, 212, 0.5)",
            "0 0 20px rgba(6, 182, 212, 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="w-5 h-5 text-white" />
        {/* Glass overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
        
        {/* Animated ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Typing bubble */}
      <motion.div
        className="relative px-6 py-4 rounded-3xl rounded-bl-md backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border border-white/30 dark:border-slate-700/30 shadow-xl"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glass effect */}
        <div className="absolute inset-0 rounded-3xl rounded-bl-md bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent pointer-events-none" />
        
        <div className="flex gap-2 relative z-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
                y: [0, -4, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Subtle shimmer */}
        <motion.div
          className="absolute inset-0 rounded-3xl rounded-bl-md bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
