# Use node:alpine to build the React app
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

ENV HOST 0.0.0.0

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the React app
RUN npm run build

# Use nginx:alpine as the base image for serving the app
FROM nginx:alpine

# Copy the built files to Nginx's html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
