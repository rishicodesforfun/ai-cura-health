
export interface Condition {
  name: string;
  confidence?: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  recommendations?: string[];
}

export interface SymptomAnalysis {
  conditions: Condition[];
  summary: string;
  nextSteps: string[];
}

export interface Symptom {
  name: string;
  index: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  age?: string;
  gender?: string;
  weight?: string;
  height?: string;
}

export interface JWTPayload {
  id: string;
  email: string;
  name: string;
  exp: number; // expiration time (in seconds)
}
