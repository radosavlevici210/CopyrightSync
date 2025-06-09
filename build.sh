
#!/bin/bash

# Neural AI Universal Protection Policy - Build Script
# Copyright © 2025 Ervin Remus Radosavlevici
# All rights reserved under international copyright law.
# Contact: ervin210@icloud.com
# Eco-Copyright Owner: Ervin Remus Radosavlevici

echo "🚀 Starting optimized Netlify build process..."
echo "Copyright © 2025 Ervin Remus Radosavlevici"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist

# Install dependencies with optimization
echo "📦 Installing dependencies..."
npm ci --production=false

# Build the project
echo "🔨 Building project..."
npm run build

# Copy Netlify configuration files
echo "📋 Copying Netlify configuration..."
cp _redirects dist/
cp netlify.toml dist/

# Create functions directory
echo "⚡ Setting up serverless functions..."
mkdir -p dist/.netlify/functions
cp netlify/functions/api.js dist/.netlify/functions/

# Add copyright notice to build
echo "© 2025 Ervin Remus Radosavlevici - Eco-Copyright Owner" > dist/COPYRIGHT.txt

echo "✅ Netlify build optimization completed successfully!"
echo "🌱 Environmental consciousness: Optimized for energy efficiency"
