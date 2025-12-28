"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, User, Calendar, Weight, AlertTriangle, Info, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { removeAuthToken } from "@/lib/jwt";
import HealthInfoModal from "@/components/HealthInfoModal";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    symptoms: "",
    image: null as string | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [forSelf, setForSelf] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHealthInfoSubmit = (isForSelf: boolean) => {
    setForSelf(isForSelf);
    setShowHealthModal(false);
    processSubmission(isForSelf);
  };

  const processSubmission = (isForSelf: boolean) => {
    setIsSubmitting(true);
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem("aicura_current_user") || "{}");
    
    // Create health record
    const healthRecord = {
      id: Date.now().toString(),
      userId: isForSelf ? (currentUser.id || "guest") : "anonymous",
      name: formData.name || (currentUser.name || "Guest User"),
      age: formData.age || "",
      gender: formData.gender || "",
      weight: formData.weight || "",
      height: formData.height || "",
      symptoms: formData.symptoms,
      image: formData.image,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingRecords = JSON.parse(localStorage.getItem("aicura_health_records") || "[]");
    existingRecords.push(healthRecord);
    localStorage.setItem("aicura_health_records", JSON.stringify(existingRecords));

    // Navigate to results page
    navigate("/results");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.symptoms.trim()) {
      toast({
        title: "Symptoms Required",
        description: "Please describe your symptoms in detail for analysis.",
        variant: "destructive",
      });
      return;
    }

    setShowHealthModal(true);
  };

  const handleLogout = () => {
    removeAuthToken();
    localStorage.removeItem("aicura_current_user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
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
              onClick={() => navigate("/history")}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              History
            </Button>
            <Button 
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="max-w-4xl mx-auto mb-8 bg-cyan-50 border-cyan-200">
          <Info className="h-4 w-4 text-cyan-600" />
          <AlertDescription className="text-cyan-800">
            <strong>How it works:</strong> Describe your symptoms in detail for the most accurate analysis. 
            Our AI model will compare your symptoms against a database of known conditions to provide preliminary insights.
          </AlertDescription>
        </Alert>

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-cyan-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-cyan-600" />
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
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Height in cm"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Weight in kg"
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
                    placeholder="Please describe your symptoms in detail. Include duration, severity, and any other relevant information. Example: 'I've had a headache for 3 days, accompanied by fever and nausea...'"
                    value={formData.symptoms}
                    onChange={(e) => handleInputChange("symptoms", e.target.value)}
                    rows={6}
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
                      <div className="text-sm text-cyan-600">
                        ✓ Image Uploaded
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload an image if you have skin-related symptoms for more accurate analysis
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-cyan-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-cyan-800 mb-1">Important Disclaimer</h4>
                      <p className="text-sm text-cyan-700">
                        This system is intended to be an informational tool and is not a substitute for professional medical diagnosis, advice, or treatment. 
                        Please consult a qualified doctor for any health concerns.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600" 
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
            <Card className="border-cyan-200">
              <CardHeader>
                <CardTitle className="text-lg">Immediate Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get quick AI-driven analysis of your symptoms without delay
                </p>
              </CardContent>
            </Card>
            <Card className="border-cyan-200">
              <CardHeader>
                <CardTitle className="text-lg">Health History Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Save your health records and track symptom patterns over time
                </p>
              </CardContent>
            </Card>
            <Card className="border-cyan-200">
              <CardHeader>
                <CardTitle className="text-lg">Video Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Connect with doctors via video call for expert advice
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-cyan-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-cyan-600" />
                  Video Consultation
                </CardTitle>
                <CardDescription>
                  Connect with a doctor for live video consultation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/video-call")}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  Start Video Call
                </Button>
              </CardContent>
            </Card>
            <Card className="border-cyan-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cyan-600" />
                  Health History
                </CardTitle>
                <CardDescription>
                  View your past health records and symptom history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/history")}
                  variant="outline"
                  className="w-full"
                >
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Health Info Modal */}
      <HealthInfoModal
        isOpen={showHealthModal}
        onClose={() => setShowHealthModal(false)}
        onSubmit={handleHealthInfoSubmit}
      />
    </div>
  );
};

export default Index;