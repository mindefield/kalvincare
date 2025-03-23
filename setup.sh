#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting KalvinCare Application Setup...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Source nvm to ensure npm is available
source ~/.nvm/nvm.sh

# Install frontend dependencies
echo -e "${BLUE}Installing frontend dependencies...${NC}"
cd dog-health-app
npm install

# Install backend dependencies
echo -e "${BLUE}Installing backend dependencies...${NC}"
cd ../backend
npm install

# Start the frontend server
echo -e "${GREEN}Starting frontend server on port 3000...${NC}"
cd ../dog-health-app
npm run dev &

# Wait for frontend to start
sleep 5

# Start the backend server
echo -e "${GREEN}Starting backend server on port 9000...${NC}"
cd ../backend
npm run dev &

echo -e "${BLUE}Setup complete!${NC}"
echo -e "Frontend: http://localhost:3000"
echo -e "Backend: http://localhost:9000"
echo -e "Press Ctrl+C to stop all servers" 