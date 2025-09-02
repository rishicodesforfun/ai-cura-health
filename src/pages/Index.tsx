"use client";

import { useState, useEffect } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, User, Calendar, Weight, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    symptoms: "",
    image: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem("aicura_current_user");
    setIsLoggedIn(!!userData);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Check if user is logged in
    if (!isLoggedIn) {
      toast({
        title: "Please Sign In",
        description: "You need to create an account to save your health records.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem("aicura_current_user") || "{}");
    
    // Create health record
    const healthRecord = {
      id: Date.now().toString(),
      userId: currentUser.id,
      name: formData.name || currentUser.name,
      age: formData.age || currentUser.age,
      gender: formData.gender || currentUser.gender,
      weight: formData.weight || currentUser.weight,
      symptoms: formData.symptoms,
      image: formData.image,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingRecords = JSON.parse(localStorage.getItem("aicura_health_records") || "[]");
    existingRecords.push(healthRecord);
    localStorage.setItem("aicura_health_records", JSON.stringify(existingRecords));

    // Simulate AI processing
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to results page
      window.location.href = "/results";
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AIcura</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Intelligent Preliminary Disease Identification System - Get instant health insights based on your symptoms
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/history"}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              History
            </Button>
            {!isLoggedIn ? (
              <Button 
                onClick={() => window.location.href = "/signup"}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Sign Up
              </Button>
            ) : (
              <Button 
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("aicura_current_user");
                  setIsLoggedIn(false);
                  window.location.reload();
                }}
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>

        {!isLoggedIn && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <p className="text-blue-800">
                  Create an account to save your health history and get better diagnoses over time!
                </p>
                <Button onClick={() => window.location.href = "/signup"} size="sm">
                  Sign Up Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-blue-600" />
                Health Information Form
              </CardTitle>
              <CardDescription>
                Please provide your information and symptoms for preliminary analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter your weight in kg"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                    />
                  </div>
                </div>

                {/* Symptom Input */}
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptom Description</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Please describe your symptoms in detail. Include duration, severity, and any other relevant information..."
                    value={formData.symptoms}
                    onChange={(e) => handleInputChange("symptoms", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image (Optional - for skin conditions)</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                    </div>
                    {formData.image && (
                      <div className="text-sm text-green-600">
                        ✓ {formData.image.name}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload an image if you have skin-related symptoms for more accurate analysis
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">Important Disclaimer</h4>
                      <p className="text-sm text-yellow-700">
                        This system is intended to be an informational tool and is not a substitute for professional medical diagnosis, advice, or treatment. 
                        Please consult a qualified doctor for any health concerns.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Analyzing Symptoms...
                    </div>
                  ) : (
                    "Get Preliminary Diagnosis"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">How AIcura Helps You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Immediate Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get quick AI-driven analysis of your symptoms without delay
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Health History Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Save your health records and track symptom patterns over time
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data-Driven Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Your data helps train better AI models for more accurate diagnoses
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;