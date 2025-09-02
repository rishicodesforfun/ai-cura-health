"use client";

import { useState, useEffect } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Lock, AlertCircle, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { generateToken, setAuthToken } from "@/lib/jwt";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in by verifying JWT
    const token = localStorage.getItem('aicura_jwt_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("aicura_users") || "[]");
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        setIsSubmitting(false);
        // Generate JWT token
        const token = generateToken({
          id: user.id,
          email: user.email,
          name: user.name
        });
        
        // Store JWT token
        setAuthToken(token);
        
        // Also store current user session for convenience
        const currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          gender: user.gender,
          weight: user.weight,
          height: user.height
        };
        localStorage.setItem("aicura_current_user", JSON.stringify(currentUser));
        
        setIsLoggedIn(true);
        window.location.href = "/";
      } else {
        setIsSubmitting(false);
        setError("Invalid email or password");
      }
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("aicura_jwt_token");
    localStorage.removeItem("aicura_current_user");
    setIsLoggedIn(false);
    window.location.reload();
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 mb-6">
              You are already logged in. Redirecting to your dashboard...
            </p>
            <Button onClick={() => window.location.href = "/"} className="w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Neural Network Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="#00ff88" />
            </linearGradient>
          </defs>
          
          {/* Neural network connections */}
          {[...Array(20)].map((_, i) => (
            <line
              key={i}
              x1={Math.random() * 1920}
              y1={Math.random() * 1080}
              x2={Math.random() * 1920}
              y2={Math.random() * 1080}
              stroke="url(#neonGradient)"
              strokeWidth="0.5"
              opacity="0.3"
              className="animate-pulse"
              style={{
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
          
          {/* Glowing nodes */}
          {[...Array(15)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1920}
              cy={Math.random() * 1080}
              r="2"
              fill="#00ffff"
              className="animate-pulse"
              style={{
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* AICURA Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-green-400 rounded-2xl mb-4 shadow-2xl">
              <span className="text-3xl font-bold text-black">AI</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">AICURA</h1>
            <p className="text-cyan-300 text-sm">Intelligent Preliminary Disease Identification</p>
          </div>

          {/* Glassmorphism Login Card */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-300 text-sm">Enter your credentials to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-500/20 border-red-500/30">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-white">{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200 text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200 text-sm font-medium">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <button
                type="button"
                className="text-cyan-300 hover:text-cyan-200 text-sm transition-colors"
                onClick={() => window.location.href = "/signup"}
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-cyan-300 text-sm font-medium mb-1">Demo Account</h4>
                <p className="text-gray-400 text-xs">
                  Create an account to start using AICURA. Your health data helps improve our AI models.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Made with Dyad */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Login;