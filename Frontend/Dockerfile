FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the application
RUN ng build

# Expose the port
EXPOSE 4200

# Start the Angular development server
CMD ng serve --host 0.0.0.0
