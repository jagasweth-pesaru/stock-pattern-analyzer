# Step 1: Build the frontend app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy source files
COPY . .

# Install dependencies and build
RUN npm install && npm run build

# Step 2: Serve the app using Nginx
FROM nginx:stable-alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default Nginx config and use custom one
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
