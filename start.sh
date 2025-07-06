#!/bin/sh
# TasteMate Replit start script
# Installs dependencies and starts both backend and frontend servers

# Install dependencies for backend and frontend
cd backend && npm install && cd ..
npm install

# Install concurrently if not present (for running both servers together)
if ! npx --no-install concurrently --version >/dev/null 2>&1; then
  npm install --save-dev concurrently
fi

# Start backend and frontend together
npx concurrently "cd backend && npm start" "npm run dev"
