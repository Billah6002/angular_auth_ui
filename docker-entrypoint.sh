#!/bin/sh
# docker-entrypoint.sh - Generate env.js from environment variables

# Set default API URL if not provided
API_URL=${API_URL:-http://localhost:8080/api/Auth}

# Generate env.js
cat > /usr/share/nginx/html/env.js <<EOF
window.__env = window.__env || {};
window.__env.apiUrl = '${API_URL}';
EOF

echo "Generated env.js with API_URL=${API_URL}"

# Start nginx
exec nginx -g 'daemon off;'
