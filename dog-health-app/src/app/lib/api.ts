const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

export const api = {
  // Breed detection endpoint
  detectBreed: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await fetch(`${API_URL}/api/breed/detect`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to detect breed');
    }
    
    return response.json();
  },

  // Health analysis endpoint
  analyzeHealth: async (data: {
    breed: string;
    age: number;
    weight: number;
    activityLevel: string;
    healthConditions: string[];
  }) => {
    const response = await fetch(`${API_URL}/api/health/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to analyze health');
    }
    
    return response.json();
  },

  // Lead capture endpoint
  captureLead: async (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    const response = await fetch(`${API_URL}/api/lead/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to capture lead');
    }
    
    return response.json();
  },
}; 