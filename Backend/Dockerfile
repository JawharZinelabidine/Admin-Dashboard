FROM node:18

# Update and install necessary packages
RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs 

# Create the working directory

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install app dependencies including bcrypt
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variables
ENV PORT=8080

# Generate Prisma Client
RUN npx prisma generate

# Expose the app's port
EXPOSE 8080

# Start the application
CMD ["node", "app.js"]