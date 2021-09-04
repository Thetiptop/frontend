# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14.17.5 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install --legacy-peer-deps

# Generate the build of the application
# npm run build --prod
RUN npm run prerender

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
#COPY --from=build /usr/local/app/dist/thetiptop/ /usr/share/nginx/html
COPY --from=build /usr/local/app/dist/thetiptop/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80
