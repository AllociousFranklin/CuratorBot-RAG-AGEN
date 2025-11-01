import { motion } from "motion/react";
import { Sparkles, Pill, Activity, Dna } from "lucide-react";

export function WelcomeScreen() {
  const features = [
    { icon: Pill, label: "Medication Insights", gradient: "from-cyan-500 to-teal-500" },
    { icon: Activity, label: "Symptom Analysis", gradient: "from-teal-500 to-emerald-500" },
    { icon: Dna, label: "Health Intelligence", gradient: "from-emerald-500 to-cyan-500" },
  ];

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl px-4">
        {/* Main logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100 
          }}
          className="relative inline-block mb-8"
        >
          <motion.div 
            className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-2xl neon-glow-cyan"
            animate={{
              boxShadow: [
                "0 0 30px rgba(6, 182, 212, 0.4)",
                "0 0 60px rgba(6, 182, 212, 0.6)",
                "0 0 30px rgba(6, 182, 212, 0.4)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-12 h-12 text-white" />
            
            {/* Glass overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent" />
          </motion.div>

          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                marginLeft: "-6px",
                marginTop: "-6px",
              }}
              animate={{
                x: [
                  Math.cos((i * 120 * Math.PI) / 180) * 60,
                  Math.cos(((i * 120 + 360) * Math.PI) / 180) * 60,
                ],
                y: [
                  Math.sin((i * 120 * Math.PI) / 180) * 60,
                  Math.sin(((i * 120 + 360) * Math.PI) / 180) * 60,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 dark:from-cyan-400 dark:via-teal-400 dark:to-cyan-300"
        >
          Welcome to Dr. Athena
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed"
        >
          Your advanced AI medical intelligence assistant. Ask evidence-based medical questions and receive professional insights powered by cutting-edge technology.
        </motion.p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.5 + index * 0.1, 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="relative backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 rounded-2xl p-6 border border-white/30 dark:border-slate-700/30 shadow-lg overflow-hidden group cursor-pointer"
            >
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent pointer-events-none" />
              
              {/* Hover shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {feature.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pulse indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <motion.div
            className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Start typing below to begin
          </span>
        </motion.div>
      </div>
    </div>
  );
}
