# This Dockerfile is used to build a Docker image for the gg-forum-api application.

# Choose image
FROM node:20-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json file to the working directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .
