import axios from 'axios';
import { Breed, DogHealthData, HealthReport } from '../types';

// TODO: Replace with actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function detectBreed(imageFile: File): Promise<Breed[]> {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post(`${API_BASE_URL}/detect-breed`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.breeds;
  } catch (error) {
    console.error('Error detecting breed:', error);
    throw new Error('Failed to detect breed. Please try again.');
  }
}

export async function generateHealthReport(
  breeds: Breed[],
  healthData: DogHealthData
): Promise<HealthReport> {
  try {
    const response = await axios.post(`${API_BASE_URL}/health-report`, {
      breeds,
      healthData,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating health report:', error);
    throw new Error('Failed to generate health report. Please try again.');
  }
}

export async function submitLead(leadData: Omit<LeadData, 'createdAt'>): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/submit-lead`, leadData);
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw new Error('Failed to submit lead. Please try again.');
  }
} 