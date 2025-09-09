import { GoogleGenerativeAI } from "@google/generative-ai";

interface SymptomAnalysis {
  conditions: Array<{
    name: string;
    confidence: number;
    description: string;
    severity: 'low' | 'medium' | 'high';
    symptoms: string[];
    recommendations: string[];
  }>;
  summary: string;
  nextSteps: string[];
}

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async analyzeSymptoms(
    symptoms: string,
    age?: string,
    gender?: string,
    weight?: string,
    height?: string
  ): Promise<SymptomAnalysis> {
    try {
      // Create a comprehensive prompt for Gemini
      const prompt = `
You are an AI medical assistant providing preliminary health analysis. Based on the provided information, analyze the symptoms and provide potential conditions with confidence levels.

Patient Information:
- Age: ${age || 'Not provided'}
- Gender: ${gender || 'Not provided'}
- Weight: ${weight || 'Not provided'} kg
- Height: ${height || 'Not provided'} cm

Symptoms: ${symptoms}

Please provide a JSON response with the following structure:
{
  "conditions": [
    {
      "name": "Condition Name",
      "confidence": 85,
      "description": "Brief description of the condition",
      "severity": "low|medium|high",
      "symptoms": ["symptom1", "symptom2"],
      "recommendations": ["recommendation1", "recommendation2"]
    }
  ],
  "summary": "A brief summary of the analysis",
  "nextSteps": ["Step 1", "Step 2", "Step 3"]
}

Guidelines:
1. Provide 3-5 potential conditions based on the symptoms
2. Confidence should be between 60-95%
3. Severity should be realistic based on symptoms
4. Recommendations should be practical and safe
5. Be conservative in your analysis - avoid alarming predictions
6. Include common conditions that match the symptoms
7. Always emphasize that this is preliminary analysis and not a substitute for professional medical advice

Important: Always include a disclaimer that this is not medical advice and the user should consult a healthcare professional.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse the JSON response
      try {
        const analysis = JSON.parse(text);
        return this.validateAndCleanAnalysis(analysis);
      } catch (parseError) {
        console.error("Failed to parse Gemini response:", parseError);
        // Fallback to a basic analysis
        return this.getFallbackAnalysis(symptoms);
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      // Fallback to basic analysis
      return this.getFallbackAnalysis(symptoms);
    }
  }

  private validateAndCleanAnalysis(analysis: any): SymptomAnalysis {
    // Ensure the response has the expected structure
    const defaultAnalysis: SymptomAnalysis = {
      conditions: [],
      summary: "Unable to provide detailed analysis at this time.",
      nextSteps: ["Consult a healthcare professional for proper evaluation."]
    };

    try {
      // Validate and clean conditions
      if (Array.isArray(analysis.conditions)) {
        analysis.conditions = analysis.conditions.map((condition: any) => ({
          name: condition.name || "Unknown Condition",
          confidence: Math.min(95, Math.max(60, condition.confidence || 50)),
          description: condition.description || "No description available",
          severity: this.validateSeverity(condition.severity),
          symptoms: Array.isArray(condition.symptoms) ? condition.symptoms : [],
          recommendations: Array.isArray(condition.recommendations) ? condition.recommendations : ["Consult a healthcare professional"]
        }));
      }

      // Validate summary
      if (typeof analysis.summary !== 'string') {
        analysis.summary = "Analysis completed. Please review the results below.";
      }

      // Validate nextSteps
      if (!Array.isArray(analysis.nextSteps)) {
        analysis.nextSteps = ["Consult a healthcare professional for proper evaluation."];
      }

      return analysis;
    } catch (error) {
      console.error("Error validating analysis:", error);
      return defaultAnalysis;
    }
  }

  private validateSeverity(severity: any): 'low' | 'medium' | 'high' {
    const validSeverities = ['low', 'medium', 'high'];
    return validSeverities.includes(severity) ? severity : 'medium';
  }

  private getFallbackAnalysis(symptoms: string): SymptomAnalysis {
    // Basic fallback analysis based on common symptoms
    const lowerSymptoms = symptoms.toLowerCase();
    
    let conditions = [];
    
    if (lowerSymptoms.includes('headache') || lowerSymptoms.includes('head')) {
      conditions.push({
        name: "Tension Headache",
        confidence: 75,
        description: "A common type of headache that causes mild to moderate pain and pressure around the forehead, back of the eyes and neck.",
        severity: "low",
        symptoms: ["headache", "pressure", "discomfort"],
        recommendations: ["Rest in a quiet, dark room", "Apply a warm or cold compress", "Stay hydrated", "Consider over-the-counter pain relievers"]
      });
    }
    
    if (lowerSymptoms.includes('fever') || lowerSymptoms.includes('temperature')) {
      conditions.push({
        name: "Viral Infection",
        confidence: 70,
        description: "A common viral infection that can cause fever, fatigue, and other symptoms.",
        severity: "medium",
        symptoms: ["fever", "fatigue", "body aches"],
        recommendations: ["Rest and stay hydrated", "Monitor temperature", "Use fever-reducing medication if needed", "Consult doctor if fever persists"]
      });
    }
    
    if (lowerSymptoms.includes('cough') || lowerSymptoms.includes('throat')) {
      conditions.push({
        name: "Upper Respiratory Infection",
        confidence: 65,
        description: "An infection of the nose, sinuses, throat, or large airways.",
        severity: "low",
        symptoms: ["cough", "sore throat", "congestion"],
        recommendations: ["Stay hydrated", "Use throat lozenges", "Use saline nasal spray", "Rest as needed"]
      });
    }
    
    if (conditions.length === 0) {
      conditions.push({
        name: "General Discomfort",
        confidence: 60,
        description: "General symptoms that may indicate various mild conditions.",
        severity: "low",
        symptoms: ["discomfort", "fatigue"],
        recommendations: ["Monitor symptoms", "Get adequate rest", "Stay hydrated", "Consult healthcare provider if symptoms worsen"]
      });
    }

    return {
      conditions,
      summary: "Preliminary analysis based on your symptoms. This is not a medical diagnosis.",
      nextSteps: [
        "Monitor your symptoms for changes",
        "Get adequate rest and stay hydrated",
        "Consult a healthcare professional for proper evaluation",
        "Seek immediate medical attention if symptoms worsen"
      ]
    };
  }
}

// Create a singleton instance with a fallback API key
const apiKey = typeof window !== 'undefined' && (window as any).NEXT_PUBLIC_GEMINI_API_KEY 
  ? (window as any).NEXT_PUBLIC_GEMINI_API_KEY 
  : 'demo-key';

const geminiService = new GeminiService(apiKey);

export default geminiService;