"use client";

import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Lock, AlertCircle } from "lucide-react";
import { generateToken, setAuthToken } from "@/lib/jwt";
import { initializeUsers, addUser, getDefaultCredentials } from "@/lib/auth";

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Store user data in localStorage for demo purposes
      const userData = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      addUser(userData);
      
      // Generate JWT token for the new user
      const token = generateToken({
        id: userData.id,
        email: userData.email,
        name: userData.name
      });
      
      // Store JWT token
      setAuthToken(token);
      
      // Also store current user session for convenience
      const currentUser = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      };
      localStorage.setItem("aicura_current_user", JSON.stringify(currentUser));
    }, 2000);
  };

  const useDefaultCredentials = () => {
    const defaultCreds = getDefaultCredentials();
    setFormData(prev => ({
      ...prev,
      email: defaultCreds.email,
      password: defaultCreds.password,
      confirmPassword: defaultCreds.password,
      name: "Demo User"
    }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-cyan-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
            <p className="text-gray-600 mb-6">
              Your AIcura account has been successfully created. You're now logged in and will be redirected to your dashboard.
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
      {/* Dynamic Background with Particles and Light Trails */}
      <div className="absolute inset-0 z-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Light Trails */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
          <defs>
            <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="neonGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          
          {/* Swirling light trails */}
          {[...Array(25)].map((_, i) => {
            const startX = Math.random() * 1920;
            const startY = Math.random() * 1080;
            const endX = Math.random() * 1920;
            const endY = Math.random() * 1080;
            const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 400;
            const midY = (startY + endY) / 2 + (Math.random() - 0.5) * 400;
            
            return (
              <path
                key={i}
                d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
                stroke={i % 2 === 0 ? "url(#neonGradient1)" : "url(#neonGradient2)"}
                strokeWidth="0.5"
                fill="none"
                opacity="0.3"
                className="animate-pulse"
                style={{
                  animationDuration: `${3 + Math.random() * 5}s`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            );
          })}
          
          {/* Glowing nodes */}
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1920}
              cy={Math.random() * 1080}
              r="1.5"
              fill="#06b6d4"
              className="animate-pulse"
              style={{
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl mb-4 shadow-2xl animate-pulse">
              <span className="text-3xl font-bold text-black">AI</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">AICURA</h1>
            <p className="text-cyan-300 text-sm font-light">Intelligent Preliminary Disease Identification</p>
          </div>

          {/* Glassmorphism Panel */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">Create Account</h2>
              <p className="text-gray-300 text-sm">Sign up to save your health records and track your symptoms over time</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-500/20 border-red-500/30">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-white">{error}</AlertDescription>
                </Alert>
              )}

              {/* Personal Information */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200 text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200 text-sm font-medium">Email Address</Label>
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200 text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-200 text-sm font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>

              {/* Demo Credentials */}
              <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-200 text-sm font-medium">Quick Demo</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={useDefaultCredentials}
                    className="text-cyan-300 hover:text-cyan-200 text-xs"
                  >
                    Use Demo
                  </Button>
                </div>
                <div className="text-xs text-cyan-300 space-y-1">
                  <div>Uses: john@example.com / password123</div>
                  <div>Creates a demo account instantly</div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <button
              type="button"
              className="text-cyan-300 hover:text-cyan-200 text-sm transition-colors"
              onClick={() => window.location.href = "/login"}
            >
              Already have an account? Sign In
            </button>
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

export default Signup;