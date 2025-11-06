#!/bin/bash

# Metro Boom Site Deployment Script

set -e

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Stop existing containers
echo -e "${BLUE}🛑 Stopping existing containers...${NC}"
docker-compose down || true

# Build the Docker image
echo -e "${BLUE}🔨 Building Docker image...${NC}"
docker-compose build --no-cache

# Start the containers
echo -e "${BLUE}🚀 Starting containers...${NC}"
docker-compose up -d

# Wait for the service to be ready
echo -e "${BLUE}⏳ Waiting for service to be ready...${NC}"
sleep 5

# Check if the service is running
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}🌐 Site is now running at http://localhost${NC}"
else
    echo -e "${RED}❌ Deployment failed. Check logs with: docker-compose logs${NC}"
    exit 1
fi

# Show logs
echo -e "${BLUE}📋 Container logs:${NC}"
docker-compose logs --tail=20
