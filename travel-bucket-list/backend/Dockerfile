# Use the latest Node.js LTS (Long Term Support) version as the base image
FROM node:21-alpine3.18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies defined in package.json
RUN npm install

# Copy the rest of the application's source code to the working directory
COPY . .

# Command to run the application with increased heap size limit
CMD ["node", "--max-old-space-size=4096", "server.js"]
