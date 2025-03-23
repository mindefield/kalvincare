export interface Breed {
  name: string;
  confidence: number;
  group?: string;
  temperament?: string[];
  size?: 'small' | 'medium' | 'large';
  exerciseNeeds?: 'low' | 'moderate' | 'high';
}

export interface DogHealthData {
  age: number;
  weight: number;
  height?: number;
  gender: 'male' | 'female';
  activityLevel: 'low' | 'moderate' | 'high';
  diet: string;
  healthIssues?: string;
}

export interface HealthReport {
  breeds: Breed[];
  healthData: DogHealthData;
  weightStatus: 'underweight' | 'ideal' | 'overweight';
  activityRecommendations: string[];
  dietRecommendations: string[];
  overallHealthScore: number;
  alerts: string[];
}

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  dogBreed?: string;
  createdAt: Date;
} 