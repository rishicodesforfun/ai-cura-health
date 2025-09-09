"use client";

import { useState, useEffect } from "react";
import diseasePredictor from "@/lib/disease-predictor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  AlertTriangle, 
  Calendar,
  User,
  TrendingUp,
  CheckCircle,
  Info
} from "lucide-react";

interface PredictionResult {
  disease: string;
  confidence: number;
  description: string;
  severity: string;
}

interface DiseasePredictorProps {
  userSymptoms: string;
  onBack: () => void;
}

const DiseasePredictorComponent = ({ userSymptoms, onBack }: DiseasePredictorProps) => {
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Process user symptoms and get predictions
    const processSymptoms = () => {
      // Simple tokenization of symptoms
      const symptomsArray = userSymptoms
        .toLowerCase()
        .split(/[,\.\n]/)
        .flatMap(sentence => sentence.split(" "))
        .filter(word => word.length > 2)
        .map(word => word.replace(/[^a-zA-Z_]/g, ""));
      
      // Get all possible symptoms from our model
      const allSymptoms = diseasePredictor.getAllSymptoms();
      
      // Match user symptoms with known symptoms
      const matchedSymptoms = symptomsArray.filter(symptom => 
        allSymptoms.some(knownSymptom => 
          knownSymptom.toLowerCase().includes(symptom) || 
          symptom.includes(knownSymptom.toLowerCase())
        )
      );
      
      // Get predictions
      const predictions = diseasePredictor.predict(matchedSymptoms);
      setResults(predictions);
      setLoading(false);
    };

    // Simulate processing time
    const timer = setTimeout(processSymptoms, 2000);
    return () => clearTimeout(timer);
  }, [userSymptoms]);

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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "medium": return <Info className="h-4 w-4 text-yellow-600" />;
      case "high": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getReassuringMessage = (severity: string) => {
    switch (severity) {
      case "low": return "This condition is typically mild and often resolves on its own.";
      case "medium": return "This condition may require some attention but is usually manageable.";
      case "high": return "This condition requires medical attention. Please consult a doctor soon.";
      default: return "Please consult a healthcare professional for proper evaluation.";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Analyzing Your Symptoms...</h2>
          <p className="text-gray-600">Our AI is processing your information to provide the most accurate results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
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
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
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
            <Card key={index} className="shadow-lg border-purple-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      {getSeverityIcon(result.severity)}
                      {result.disease}
                    </CardTitle>
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
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-gray-700 mb-4">{result.description}</p>
                  </div>
                  
                  {/* Reassuring message based on severity */}
                  <div className={`rounded-lg p-4 ${
                    result.severity === 'low' ? 'bg-green-50 border border-green-200' :
                    result.severity === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                    'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-start gap-2">
                      {getSeverityIcon(result.severity)}
                      <div>
                        <h5 className="font-medium mb-1">
                          {result.severity === 'low' ? 'Mild Condition' :
                           result.severity === 'medium' ? 'Moderate Condition' :
                           'Serious Condition'}
                        </h5>
                        <p className="text-sm">
                          {getReassuringMessage(result.severity)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Online Doctor Consultation
                    </Button>
                    <Button variant="outline" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Find Nearby Healthcare Facilities
                    </Button>
                  </div>
                </div>
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
      </div>
    </div>
  );
};

export default DiseasePredictorComponent;