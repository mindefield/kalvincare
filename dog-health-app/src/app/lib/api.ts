const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Breed detection endpoint
  detectBreed: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      const response = await fetch(`${API_URL}/api/breed/detect`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Breed detection error:', error);
      throw error;
    }
  },

  // Health analysis endpoint
  analyzeHealth: async (data: {
    breed: string;
    age: number;
    weight: number;
    activityLevel: string;
    healthConditions: string[];
  }) => {
    try {
      const response = await fetch(`${API_URL}/api/health/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Health analysis error:', error);
      throw error;
    }
  },

  // Lead capture endpoint
  captureLead: async (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    try {
      const response = await fetch(`${API_URL}/api/lead/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lead capture error:', error);
      throw error;
    }
  },
}; 