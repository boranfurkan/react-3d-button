#!/bin/bash
# Quick Start Script for React 3D Button

echo "🚀 React 3D Button - Quick Start"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the react-3d-button directory"
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🔨 Step 2: Building the package..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build package"
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "📝 Next steps:"
echo "1. Update package.json with your GitHub username"
echo "2. Create GitHub repository: https://github.com/new"
echo "3. Push to GitHub:"
echo "   git remote add origin https://github.com/boranfurkan/react-3d-button.git"
echo "   git push -u origin main"
echo "4. Publish to NPM:"
echo "   npm login"
echo "   npm publish"
echo ""
echo "📖 See PUBLISHING.md for detailed instructions"
echo ""
