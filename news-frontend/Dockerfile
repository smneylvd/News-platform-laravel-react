# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:18

WORKDIR /app

#Environment variables.
#ENV PATH /app/node_modules/.bin:$PATH

# Copy the package.json and package-lock.json to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

CMD ["npm", "start"]