# Use a Node.js base image
FROM node:20

# Create and change to the app directory
WORKDIR /app

# Copy package.json, package-lock.json, and the .next directory
COPY package*.json ./
COPY .next/ .next/

# Install production dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
