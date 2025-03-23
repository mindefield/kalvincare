export interface Breed {
  name: string;
  confidence: number;
  temperament?: string[];
}

export interface DogHealthData {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'low' | 'medium' | 'high';
  diet: string;
  healthIssues: string[];
}

export interface HealthReport {
  weightStatus: string;
  activityRecommendations: string[];
  overallHealthScore: number;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  dogBreed: string;
  createdAt: Date;
} 