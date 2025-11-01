import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export function MedicalDisclaimer() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-6xl mx-auto px-4 py-3"
    >
      <motion.div 
        className="relative backdrop-blur-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-400/30 dark:border-amber-500/20 rounded-2xl p-4 shadow-lg overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 to-transparent pointer-events-none" />
        
        {/* Animated shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <div className="flex items-start gap-3 relative z-10">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          </motion.div>
          <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-semibold">Medical Disclaimer:</span> This chatbot provides general medical information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified healthcare provider.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
