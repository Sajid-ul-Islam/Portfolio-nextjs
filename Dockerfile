FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set production environment and disable Next.js telemetry
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN npm run build

# Hugging Face Spaces route traffic to port 7860 by default
EXPOSE 7860
ENV PORT=7860
ENV HOSTNAME="0.0.0.0"

# Start the server
CMD ["npm", "start"]