# Stage 1: Build the Angular application
FROM node:18-alpine AS build
 
WORKDIR /app
 
COPY package.json package-lock.json ./
RUN npm install
 
COPY . .
 
RUN npm run build --configuration=production
 
# Stage 2: Serve the application with Nginx
FROM nginx:alpine
 
COPY --from=build /app/dist/ecommerce/usr/share/nginx/html
 
# Optional: Configure Nginx for routing, e.g., for deep linking
COPY nginx.conf /etc/nginx/conf.d/default.conf
 
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]
