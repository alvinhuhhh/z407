## BUILD
FROM node:lts-alpine AS build
# Check node version
RUN node --version
# Create working directory within Docker
WORKDIR /home/app
# Copy source files
COPY . .
# Install dependencies
RUN npm ci
# Compile and build
RUN npm run build

## RUN
FROM nginx:mainline
# Copy nginx.conf to /etc
COPY nginx.conf /etc/nginx/nginx.conf
# Copy built files to nginx share directory
COPY --from=build /home/app/dist/z407 /usr/share/nginx/html

EXPOSE 3000