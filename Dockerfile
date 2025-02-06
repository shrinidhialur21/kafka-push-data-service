FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json if available (not needed in your case but good practice)
COPY package*.json ./

# Install dependencies (assuming you will add a package.json later for kafkajs)
RUN npm install kafkajs

# Copy the producer script
COPY index.js ./

# Expose necessary ports (Kafka uses 9092, but it's not needed here as it's a producer)
# EXPOSE 9092  # Uncomment if needed for debugging

# Set the command to run the producer script
CMD ["node", "index.js"]

