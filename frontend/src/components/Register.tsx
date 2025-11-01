import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Lock, User, Sparkles, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../contexts/AuthContext";
import { AnimatedBackground } from "./AnimatedBackground";

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export function Register({ onSwitchToLogin }: RegisterProps) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    if (!displayName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, displayName);
    } catch (err: any) {
      setError(err.message || "Failed to create an account");
    } finally {
      setLoading(false);
    }
  }

  const passwordStrength = password.length >= 6 ? "Strong" : password.length >= 3 ? "Medium" : password.length > 0 ? "Weak" : "";

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-8">
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

          {/* Register Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative backdrop-blur-xl bg-slate-800/60 rounded-3xl p-8 border border-slate-700/30 shadow-2xl overflow-hidden"
          >
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-2xl mb-6 text-white">Create Account</h2>

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
                {/* Name Input */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="John Doe"
                      className="pl-12 h-12 bg-slate-900/50 border-slate-700/50 focus:border-cyan-500/50 rounded-xl text-white placeholder:text-slate-500"
                      disabled={loading}
                    />
                  </div>
                </div>

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
                  {passwordStrength && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ 
                            width: passwordStrength === "Weak" ? "33%" : passwordStrength === "Medium" ? "66%" : "100%",
                          }}
                          className={`h-full ${
                            passwordStrength === "Weak" ? "bg-red-500" : 
                            passwordStrength === "Medium" ? "bg-yellow-500" : 
                            "bg-green-500"
                          }`}
                        />
                      </div>
                      <span className={`text-xs ${
                        passwordStrength === "Weak" ? "text-red-400" : 
                        passwordStrength === "Medium" ? "text-yellow-400" : 
                        "text-green-400"
                      }`}>
                        {passwordStrength}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-12 h-12 bg-slate-900/50 border-slate-700/50 focus:border-cyan-500/50 rounded-xl text-white placeholder:text-slate-500"
                      disabled={loading}
                    />
                    {confirmPassword && password === confirmPassword && (
                      <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 hover:from-cyan-600 hover:via-teal-600 hover:to-cyan-700 text-white rounded-xl shadow-lg neon-glow-cyan transition-all duration-300 disabled:opacity-50 group"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? "Creating Account..." : "Create Account"}
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
                  <span className="px-4 bg-slate-800/60 text-slate-400">Already have an account?</span>
                </div>
              </div>

              {/* Login Link */}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="w-full p-3 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:bg-slate-900/30"
              >
                Sign In Instead
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
