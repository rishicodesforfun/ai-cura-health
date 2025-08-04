import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Brain, 
  User, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Stethoscope,
  FileText,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SymptomData {
  name: string;
  age: string;
  gender: string;
  weight: string;
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

const SymptomChecker = () => {
  const [formData, setFormData] = useState<SymptomData>({
    name: '',
    age: '',
    gender: '',
    weight: '',
    symptoms: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: keyof SymptomData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      toast({
        title: "Image Uploaded",
        description: "Image has been attached to your health check.",
      });
    }
  };

  const mockAnalyzeSymptoms = async (data: SymptomData): Promise<DiagnosisResult> => {
    // Simulate API call to Gemini
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock response based on symptoms
    const symptoms = data.symptoms.toLowerCase();
    
    if (symptoms.includes('fever') || symptoms.includes('headache')) {
      return {
        condition: 'Viral Upper Respiratory Infection',
        confidence: 75,
        description: 'A common viral infection affecting the upper respiratory tract, often characterized by fever, headache, and respiratory symptoms.',
        severity: 'medium',
        recommendations: [
          'Get plenty of rest',
          'Stay hydrated with fluids',
          'Use over-the-counter pain relievers as needed',
          'Monitor symptoms for worsening'
        ],
        medications: [
          'Acetaminophen (Tylenol) for fever',
          'Ibuprofen for pain and inflammation',
          'Throat lozenges for comfort'
        ],
        consultationNeeded: true
      };
    } else if (symptoms.includes('cough') || symptoms.includes('sore throat')) {
      return {
        condition: 'Common Cold',
        confidence: 85,
        description: 'A mild viral infection of the upper respiratory tract, typically self-limiting and resolving within 7-10 days.',
        severity: 'low',
        recommendations: [
          'Rest and stay hydrated',
          'Use a humidifier or steam inhalation',
          'Gargle with warm salt water',
          'Avoid smoking and irritants'
        ],
        medications: [
          'Cough drops or lozenges',
          'Decongestants if needed',
          'Honey for cough relief'
        ],
        consultationNeeded: false
      };
    } else {
      return {
        condition: 'General Health Assessment',
        confidence: 60,
        description: 'Based on the symptoms provided, a general health evaluation is recommended for proper diagnosis.',
        severity: 'low',
        recommendations: [
          'Monitor symptoms closely',
          'Maintain healthy lifestyle habits',
          'Consult healthcare provider if symptoms persist',
          'Keep a symptom diary'
        ],
        medications: [
          'Over-the-counter medications as appropriate',
          'Natural remedies and rest'
        ],
        consultationNeeded: true
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.gender || !formData.symptoms) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const diagnosis = await mockAnalyzeSymptoms(formData);
      setResult(diagnosis);
      
      // Save to localStorage (in real app, this would go to database)
      const history = JSON.parse(localStorage.getItem('aicura-history') || '[]');
      history.unshift({
        id: Date.now(),
        date: new Date().toISOString(),
        symptoms: formData.symptoms,
        result: diagnosis
      });
      localStorage.setItem('aicura-history', JSON.stringify(history.slice(0, 10))); // Keep last 10
      
      toast({
        title: "Analysis Complete",
        description: "Your health assessment is ready.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'high': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="health-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Health Assessment
          </CardTitle>
          <CardDescription>
            Provide your symptoms and basic information for an AI-powered preliminary health assessment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Age in years"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Weight in kg"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </div>
            </div>

            {/* Symptoms Description */}
            <div className="space-y-2">
              <Label htmlFor="symptoms">Describe Your Symptoms *</Label>
              <Textarea
                id="symptoms"
                placeholder="Please describe your symptoms in detail. Include when they started, severity, and any factors that make them better or worse..."
                value={formData.symptoms}
                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                className="min-h-32"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Upload Image (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload an image for skin-related issues or visible symptoms
                </p>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image')?.click()}
                >
                  Choose File
                </Button>
                {formData.image && (
                  <p className="text-sm text-success mt-2">
                    ✓ {formData.image.name} uploaded
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="medical"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Analyze Symptoms
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="health-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Health Assessment Results
            </CardTitle>
            <CardDescription>
              Preliminary AI analysis based on your symptoms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Result */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{result.condition}</h3>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(result.severity)}>
                    {result.severity.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">
                    {result.confidence}% confidence
                  </Badge>
                </div>
              </div>
              
              <p className="text-muted-foreground">{result.description}</p>
              
              {result.consultationNeeded && (
                <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <span className="text-sm font-medium text-warning">
                    Professional medical consultation recommended
                  </span>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="font-medium">Recommendations</h4>
              <div className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medications */}
            <div className="space-y-3">
              <h4 className="font-medium">Suggested Medications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.medications.map((med, index) => (
                  <div key={index} className="p-3 bg-secondary/10 rounded-lg">
                    <p className="text-sm font-medium">{med}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button variant="medical" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Find Nearby Pharmacy
              </Button>
              <Button variant="outline" className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Book Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomChecker;