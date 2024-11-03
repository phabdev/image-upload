FROM node:20-slim

WORKDIR /app

# Install dependencies first (caching layer)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Create upload and data directories
RUN mkdir -p uploads data

EXPOSE 3000
EXPOSE 5173

CMD ["npm", "run", "server"]