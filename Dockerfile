# Use the official Node.js image as the base image
FROM node:18 AS development

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code into the container
COPY . .

# Expose the port on which your Nest.js application is running (replace 3000 with the appropriate port)
EXPOSE 3000

# Start the Nest.js application in watch mode
CMD ["npm", "run", "start:dev"]
