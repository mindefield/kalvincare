# KalvinCare - Dog Health & Behavior Analysis App

A full-stack application that uses AI to analyze dog health and behavior through image uploads and health data.

## Features

- 🐕 AI-powered breed detection from photos
- 📊 Comprehensive health data collection
- 📈 Personalized health reports
- 🎯 Activity and diet recommendations
- 🔒 Secure lead capture system
- 📱 Responsive design for all devices

## Technical Stack

### Frontend
- **Framework**: Next.js 15.2.3 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Form Handling**: React Hook Form with Yup validation
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **AI Services**: TensorFlow.js for breed detection
- **Authentication**: JWT

## Algorithms & AI Models

### Breed Detection
- Utilizes TensorFlow.js with a pre-trained model for dog breed classification
- Supports 120+ dog breeds with confidence scoring
- Image preprocessing pipeline for optimal detection accuracy
- Multi-breed detection for mixed breeds

### Health Analysis
- Weight status calculation using breed-specific standards
- Activity level recommendations based on:
  - Breed characteristics
  - Age and weight
  - Current activity level
- Health score computation considering:
  - Weight status
  - Activity level
  - Age appropriateness
  - Breed-specific health concerns

### Recommendation Engine
- Personalized activity recommendations
- Diet suggestions based on:
  - Breed requirements
  - Age and weight
  - Activity level
- Health alerts for potential concerns

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (optional, for production)
- Git

## Project Structure

```
kalvincare/
├── backend/           # Express.js backend
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── types/    # TypeScript types
│   │   └── config/   # Configuration files
│   └── uploads/      # Image upload directory
└── dog-health-app/   # Next.js frontend
    ├── src/
    │   ├── app/      # Next.js app directory
    │   ├── components/
    │   └── types/
    └── public/       # Static assets
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kalvincare
```

### 2. Install Node.js and npm

If you don't have Node.js installed, install it using nvm (Node Version Manager):

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell configuration
source ~/.bashrc  # or source ~/.zshrc for Zsh

# Install Node.js
nvm install 18
nvm use 18

# Verify installation
node --version
npm --version
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create uploads directory
mkdir uploads

# Create .env file
cp .env.example .env

# Start the backend server
npm run dev
```

The backend will run on http://localhost:9000

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd ../dog-health-app

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will run on http://localhost:3000 (or the next available port if 3000 is in use)

## API Documentation

Once the backend is running, you can access the API documentation at:
http://localhost:9000/api-docs

### Available Endpoints

1. Breed Detection
   - POST /api/breed/detect
   - Accepts image file upload
   - Returns detected breeds with confidence scores

2. Health Analysis
   - POST /api/health/analyze
   - Accepts breed and health data
   - Returns health report and recommendations

3. Lead Capture
   - POST /api/lead/capture
   - Accepts user contact information
   - Stores lead data for follow-up

## Development

### Backend Development

```bash
cd backend
npm run dev
```

The backend uses:
- Express.js
- TypeScript
- Swagger for API documentation
- Multer for file uploads

### Frontend Development

```bash
cd dog-health-app
npm run dev
```

The frontend uses:
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Headless UI
- React Hook Form

## Production Deployment

### Backend Deployment

1. Build the TypeScript code:
```bash
cd backend
npm run build
```

2. Start the production server:
```bash
npm start
```

### Frontend Deployment

1. Build the Next.js application:
```bash
cd dog-health-app
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

### Backend (.env)

```env
PORT=9000
MONGODB_URI=your_mongodb_uri  # Optional
NODE_ENV=development
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:9000
```

## Troubleshooting

1. Port Conflicts
   - If port 3000 is in use, Next.js will automatically try the next available port
   - Check the console output for the correct port number

2. MongoDB Connection
   - MongoDB is optional for development
   - The app will work without MongoDB in development mode
   - For production, set up MongoDB and provide the connection URI

3. Image Upload Issues
   - Ensure the uploads directory exists in the backend
   - Check file size limits (max 5MB)
   - Verify file types (JPG, JPEG, PNG)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

Copyright © 2024 KalvinCare. All rights reserved.

This software and associated documentation files (the "Software") are proprietary and confidential. The Software is protected by copyright law and international treaties.

No part of the Software may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of KalvinCare.

Unauthorized copying, modification, distribution, public display, or public performance of the Software is strictly prohibited.

## Acknowledgments

- Dog breed detection model based on Stanford Dogs Dataset
- Health metrics based on veterinary guidelines
- UI components from Headless UI and Heroicons 