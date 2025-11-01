import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../contexts/AuthContext";
import { AnimatedBackground } from "./AnimatedBackground";

interface LoginProps {
  onSwitchToRegister: () => void;
}

export function Login({ onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div 
              className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-2xl neon-glow-cyan"
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
              <Sparkles className="w-10 h-10 text-white" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent" />
            </motion.div>
            
            <h1 className="text-4xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300">
              Dr. Athena
            </h1>
            <p className="text-slate-400">AI Medical Intelligence</p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative backdrop-blur-xl bg-slate-800/60 rounded-3xl p-8 border border-slate-700/30 shadow-2xl overflow-hidden"
          >
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-2xl mb-6 text-white">Welcome Back</h2>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-12 h-12 bg-slate-900/50 border-slate-700/50 focus:border-cyan-500/50 rounded-xl text-white placeholder:text-slate-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-12 h-12 bg-slate-900/50 border-slate-700/50 focus:border-cyan-500/50 rounded-xl text-white placeholder:text-slate-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 hover:from-cyan-600 hover:via-teal-600 hover:to-cyan-700 text-white rounded-xl shadow-lg neon-glow-cyan transition-all duration-300 disabled:opacity-50 group"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? "Signing in..." : "Sign In"}
                    {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </span>
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-800/60 text-slate-400">New to Dr. Athena?</span>
                </div>
              </div>

              {/* Register Link */}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="w-full p-3 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:bg-slate-900/30"
              >
                Create an Account
              </button>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-slate-500 text-sm mt-6"
          >
            Secure authentication powered by Firebase
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
