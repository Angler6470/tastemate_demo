
#!/bin/sh
# TasteMate Replit start script
# Handles both development and production modes

# Check if we're in deployment mode (production)
if [ "$NODE_ENV" = "production" ] || [ -n "$REPL_DEPLOYMENT" ]; then
  echo "Running in production mode"
  
  # Install dependencies and fix vulnerabilities
  cd backend && npm install && npm audit fix && cd ..
  npm install && npm audit fix
  
  # Build the frontend
  npm run build
  
  # Start only the backend server in production
  cd backend && PORT=3001 npm start
else
  echo "Running in development mode"
  
  # Install dependencies for backend and frontend
  cd backend && npm install && cd ..
  npm install

  # Install concurrently if not present (for running both servers together)
  if ! npx --no-install concurrently --version >/dev/null 2>&1; then
    npm install --save-dev concurrently
  fi

  # Start both frontend and backend concurrently
  npx concurrently "cd backend && PORT=3001 npm start" "npm run dev -- --port 5173 --host 0.0.0.0"
fi
