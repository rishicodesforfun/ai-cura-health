// Mock API service for AIcura Health Assistant
// In production, replace with actual Firebase/FastAPI endpoints

interface SymptomAnalysisRequest {
  name: string;
  age: string;
  gender: string;
  weight?: string;
  symptoms: string;
  image?: File;
}

interface DiagnosisResult {
  condition: string;
  confidence: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
  medications: string[];
  consultationNeeded: boolean;
}

// Mock Gemini API integration
export class GeminiAPIService {
  private apiKey: string;
  
  constructor(apiKey: string = 'demo-key') {
    this.apiKey = apiKey;
  }

  async analyzeSymptoms(request: SymptomAnalysisRequest): Promise<DiagnosisResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    // In production, this would call the actual Gemini API
    // For now, we'll use intelligent mock responses based on symptoms
    return this.generateMockDiagnosis(request);
  }

  private generateMockDiagnosis(request: SymptomAnalysisRequest): DiagnosisResult {
    const symptoms = request.symptoms.toLowerCase();
    
    // Comprehensive symptom analysis
    if (symptoms.includes('chest pain') || symptoms.includes('heart')) {
      return {
        condition: 'Possible Cardiac Event',
        confidence: 65,
        description: 'Chest pain requires immediate medical attention to rule out cardiac events. Symptoms could indicate various conditions from muscle strain to serious cardiac issues.',
        severity: 'high',
        recommendations: [
          'Seek immediate medical attention',
          'Do not drive yourself to hospital',
          'Call emergency services if severe',
          'Avoid physical exertion'
        ],
        medications: [
          'Do not take medications without medical supervision',
          'Aspirin only if prescribed by emergency services'
        ],
        consultationNeeded: true
      };
    }

    if (symptoms.includes('fever') && symptoms.includes('cough')) {
      return {
        condition: 'Upper Respiratory Infection',
        confidence: 80,
        description: 'A combination of fever and cough typically indicates a respiratory infection, which could be viral or bacterial in nature.',
        severity: 'medium',
        recommendations: [
          'Get plenty of rest and stay hydrated',
          'Monitor temperature regularly',
          'Use humidifier or steam inhalation',
          'Isolate to prevent spread if infectious'
        ],
        medications: [
          'Acetaminophen for fever reduction',
          'Cough suppressants for dry cough',
          'Throat lozenges for comfort'
        ],
        consultationNeeded: true
      };
    }

    if (symptoms.includes('headache') && symptoms.includes('nausea')) {
      return {
        condition: 'Migraine or Tension Headache',
        confidence: 75,
        description: 'Headache with nausea can indicate migraine, tension headache, or other neurological conditions. Pattern and triggers are important for diagnosis.',
        severity: 'medium',
        recommendations: [
          'Rest in a dark, quiet environment',
          'Apply cold compress to head',
          'Avoid known triggers',
          'Stay hydrated'
        ],
        medications: [
          'Over-the-counter pain relievers',
          'Anti-nausea medication if needed',
          'Avoid excessive medication use'
        ],
        consultationNeeded: false
      };
    }

    if (symptoms.includes('rash') || symptoms.includes('skin')) {
      return {
        condition: 'Dermatological Condition',
        confidence: 70,
        description: 'Skin conditions can range from allergic reactions to infections. Visual examination and detailed history are crucial for proper diagnosis.',
        severity: 'low',
        recommendations: [
          'Keep affected area clean and dry',
          'Avoid scratching or irritating the area',
          'Note any triggers or new products used',
          'Take photos to track progression'
        ],
        medications: [
          'Topical antihistamines for itching',
          'Moisturizers for dry skin',
          'Avoid harsh soaps or chemicals'
        ],
        consultationNeeded: false
      };
    }

    if (symptoms.includes('stomach') || symptoms.includes('abdominal')) {
      return {
        condition: 'Gastrointestinal Issue',
        confidence: 68,
        description: 'Abdominal symptoms can indicate various conditions from dietary issues to more serious gastrointestinal problems.',
        severity: 'medium',
        recommendations: [
          'Follow BRAT diet (Bananas, Rice, Applesauce, Toast)',
          'Stay hydrated with clear fluids',
          'Avoid dairy and fatty foods temporarily',
          'Monitor symptoms for worsening'
        ],
        medications: [
          'Anti-diarrheal medications if needed',
          'Probiotics for gut health',
          'Electrolyte replacement solutions'
        ],
        consultationNeeded: false
      };
    }

    // Default response for unspecific symptoms
    return {
      condition: 'General Health Concern',
      confidence: 55,
      description: 'Based on the symptoms described, a comprehensive medical evaluation would be beneficial to determine the underlying cause and appropriate treatment.',
      severity: 'low',
      recommendations: [
        'Monitor symptoms and keep a symptom diary',
        'Maintain healthy lifestyle habits',
        'Get adequate rest and nutrition',
        'Follow up if symptoms persist or worsen'
      ],
      medications: [
        'Over-the-counter medications as appropriate for specific symptoms',
        'Consult pharmacist for recommendations'
      ],
      consultationNeeded: true
    };
  }
}

// Placeholder for future custom model integration
export function processWithCustomModel(symptoms: SymptomAnalysisRequest): Promise<DiagnosisResult> {
  // This function will be implemented when replacing Gemini with custom model
  console.log('Custom model processing not yet implemented');
  throw new Error('Custom model not yet integrated');
}

// Export singleton instance
export const geminiService = new GeminiAPIService();

// User management (mock)
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  medicalHistory?: string[];
  allergies?: string[];
}

export class UserService {
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    // Mock implementation - in production, fetch from Firebase/database
    const mockProfile: UserProfile = {
      id: userId,
      name: 'Demo User',
      email: 'demo@aicura.com',
      age: 30,
      gender: 'prefer-not-to-say',
      medicalHistory: [],
      allergies: []
    };
    return mockProfile;
  }

  static async updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
    // Mock implementation - in production, update in Firebase/database
    console.log('Updating user profile:', userId, profile);
  }
}