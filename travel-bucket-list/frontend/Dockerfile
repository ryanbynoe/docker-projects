# Use the latest Node.js 14 LTS as the base image
FROM node:21-alpine3.18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's source code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Serve the application using serve, a static file serving package
CMD ["npx", "serve", "-s", "build"]
