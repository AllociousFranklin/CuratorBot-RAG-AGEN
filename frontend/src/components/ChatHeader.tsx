import { Button } from "./ui/button";
import { LogOut, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";

export function ChatHeader() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative border-b border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/40 dark:bg-black/40 px-6 py-4 shadow-lg"
    >
      {/* Gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
        <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg neon-glow-cyan"
            animate={{
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.3)",
                "0 0 40px rgba(6, 182, 212, 0.5)",
                "0 0 20px rgba(6, 182, 212, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-6 h-6 text-white" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent" />
          </motion.div>
          <div>
            <motion.h1 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Dr. Athena
            </motion.h1>
            <motion.p 
              className="text-xs text-slate-400 tracking-wider"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentUser?.displayName || "AI Medical Intelligence"}
            </motion.p>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          {currentUser && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-sm">
                  {currentUser.displayName?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm text-slate-200 leading-none">{currentUser.displayName}</p>
                <p className="text-xs text-slate-400">{currentUser.email}</p>
              </div>
            </motion.div>
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="relative rounded-xl hover:bg-white/60 dark:hover:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all duration-300 group overflow-hidden"
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 group-hover:translate-x-full transition-transform duration-1000" />
              
              <LogOut className="w-5 h-5 text-slate-300 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
