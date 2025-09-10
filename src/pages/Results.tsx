"use client";

import { useState, useEffect } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  AlertTriangle, 
  Pill, 
  Calendar, 
  ExternalLink,
  User,
  Clock,
  TrendingUp,
  Video,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { showSuccess } from "@/utils/toast";
import DiseasePredictorComponent from "@/components/DiseasePredictor";

interface DiagnosisResult {
  name: string;
  confidence: number;
  description: string;
  symptoms: string[];
  recommendations: string[];
  severity: "low" | "medium" | "high";
}

const Results = () => {
  const [results, setResults] = useState<DiagnosisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [useMLModel, setUseMLModel] = useState(false);
  const [userSymptoms, setUserSymptoms] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [userHeight, setUserHeight] = useState("");
  const { toast } = useToast();

  const handleBack = () => {
    // Navigate back to the form page
    window.location.href = "/";
  };

  const handleBookConsultation = () => {
    // Navigate to video call page
    window.location.href = "/video-call";
  };

  useEffect(() => {
    // Get the last submitted health record
    const storedRecords = localStorage.getItem("aicura_health_records");
    const userData = JSON.parse(localStorage.getItem("aicura_users") || "[]");
    
    if (storedRecords) {
      const records = JSON.parse(storedRecords);
      if (records.length > 0) {
        const lastRecord = records[records.length - 1];
        setUserSymptoms(lastRecord.symptoms);
        
        // Get user information
        const user = userData.find((u: any) => u.id === lastRecord.userId);
        if (user) {
          setUserAge(user.age || "");
          setUserGender(user.gender || "");
          setUserWeight(user.weight || "");
          setUserHeight(user.height || "");
        }
        
        // Use the Gemini model for better analysis
        setUseMLModel(true);
        return;
      }
    }
    
    // Fallback to mock data if no records found
    setTimeout(() => {
      const mockResults: DiagnosisResult[] = [
        {
          name: "Common Cold",
          confidence: 85,
          description: "The common cold is a viral infection of your nose and throat (upper respiratory tract). It's usually harmless, although it might not feel that way. Many types of viruses can cause a common cold.",
          symptoms: ["runny nose", "sneezing", "sore throat", "cough"],
          recommendations: [
            "Rest and stay hydrated",
            "Over-the-counter pain relievers",
            "Steam inhalation",
            "Consult doctor if symptoms worsen"
          ],
          severity: "low"
        },
        {
          name: "Seasonal Allergy",
          confidence: 72,
          description: "Seasonal allergies, also known as hay fever, are reactions to allergens that are typically present only during certain times of the year, usually when outdoor molds release their spores or trees, grasses, and weeds release pollen.",
          symptoms: ["sneezing", "itchy eyes", "runny nose", "watery eyes"],
          recommendations: [
            "Avoid allergens when possible",
            "Use air purifiers",
            "Take medications as prescribed",
            "Monitor symptoms"
          ],
          severity: "medium"
        }
      ];
      setResults(mockResults);
      setLoading(false);
    }, 2000);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "low": return "Low";
      case "medium": return "Medium";
      case "high": return "High";
      default: return "Unknown";
    }
  };

  if (useMLModel && userSymptoms) {
    return (
      <DiseasePredictorComponent 
        userSymptoms={userSymptoms}
        onBack={handleBack}
        age={userAge}
        gender={userGender}
        weight={userWeight}
        height={userHeight}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Analyzing Your Symptoms...</h2>
          <p className="text-gray-600">Our AI is processing your information to provide the most accurate results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Form
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AIcura Results</h1>
              <p className="text-gray-600">Based on your symptom analysis</p>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-l-4 border-l-cyan-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
                Analysis Complete
              </CardTitle>
              <CardDescription>
                Our AI has analyzed your symptoms and identified potential conditions. 
                Please review these results carefully and consult a healthcare professional.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Diagnosis Results */}
        <div className="max-w-4xl mx-auto space-y-6">
          {results.map((result, index) => (
            <Card key={index} className="shadow-lg border-cyan-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{result.name}</CardTitle>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-sm">
                        Confidence: {result.confidence}%
                      </Badge>
                      <Badge className={getSeverityColor(result.severity)}>
                        Severity: {getSeverityText(result.severity)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                    <TabsTrigger value="recommendations">Actions</TabsTrigger>
                    <TabsTrigger value="next">Next Steps</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-4">
                    <div className="prose max-w-none">
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-gray-700 mb-4">{result.description}</p>
                      
                      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-cyan-600 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-cyan-800 mb-1">Important Note</h5>
                            <p className="text-sm text-cyan-700">
                              This is a preliminary analysis only. Please consult a qualified healthcare professional for proper diagnosis and treatment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="symptoms" className="mt-4">
                    <div>
                      <h4 className="font-medium mb-3">Associated Symptoms</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {result.symptoms.map((symptom, symIndex) => (
                          <Card key={symIndex} className="border border-gray-200">
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                <span className="font-medium">{symptom}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="recommendations" className="mt-4">
                    <div>
                      <h4 className="font-medium mb-3">Recommended Actions</h4>
                      <div className="space-y-3">
                        {result.recommendations.map((action, actionIndex) => (
                          <div key={actionIndex} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                              {actionIndex + 1}
                            </div>
                            <p className="text-gray-700">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="next" className="mt-4">
                    <div>
                      <h4 className="font-medium mb-3">Next Steps</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                            1
                          </div>
                          <p className="text-gray-700">Monitor your symptoms for changes</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                            2
                          </div>
                          <p className="text-gray-700">Get adequate rest and stay hydrated</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                            3
                          </div>
                          <p className="text-gray-700">Consult a healthcare professional for proper evaluation</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                            4
                          </div>
                          <p className="text-gray-700">Seek immediate medical attention if symptoms worsen</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <Button 
                          onClick={handleBookConsultation}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Book Online Doctor Consultation
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Appointment
                        </Button>
                        <Button variant="outline" className="w-full">
                          <User className="h-4 w-4 mr-2" />
                          Find Nearby Healthcare Facilities
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto mt-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 mb-1">Medical Disclaimer</h4>
                  <p className="text-sm text-red-700">
                    AIcura provides preliminary health information only and is not a substitute for professional medical advice, diagnosis, or treatment. 
                    Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Results;