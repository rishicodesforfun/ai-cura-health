"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, AlertCircle, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { generateToken, setAuthToken } from "@/lib/jwt";
import { initializeUsers, findUserByEmailAndPassword, getDefaultCredentials } from "@/lib/auth";

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
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize users if not exists
    initializeUsers();
    
    const token = localStorage.getItem('aicura_jwt_token');
    if (token) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [navigate]);

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
    
    setTimeout(() => {
      // Use the auth utility to find user
      const user = findUserByEmailAndPassword(formData.email, formData.password);
      
      if (user) {
        setIsSubmitting(false);
        const token = generateToken({
          id: user.id,
          email: user.email,
          name: user.name
        });
        
        setAuthToken(token);
        
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
        navigate("/");
      } else {
        setIsSubmitting(false);
        setError("Invalid email or password");
      }
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('aicura_jwt_token');
    localStorage.removeItem('aicura_current_user');
    setIsLoggedIn(false);
    navigate(0);
  };

  const useDefaultCredentials = () => {
    const defaultCreds = getDefaultCredentials();
    setFormData({
      email: defaultCreds.email,
      password: defaultCreds.password
    });
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center">
        <div className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-2xl font-bold text-cyan-600">✓</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">
            You are already logged in. Redirecting to your dashboard...
          </p>
          <Button onClick={() => window.location.href = "/"} className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Dynamic Background */}
      <AnimatedBackground />

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
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200"
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
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
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

              {/* Demo Credentials */}
              <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-200 text-sm font-medium">Demo Credentials</span>
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
                  <div>Email: john@example.com</div>
                  <div>Password: password123</div>
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
                onClick={() => navigate("/signup")}
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
    </div>
  );
};

export default Login;