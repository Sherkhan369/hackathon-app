#!/bin/bash

# Quick Test Script for Frontend-Backend Integration
# Run this to verify the integration is working

echo "🧪 Testing Frontend-Backend Integration..."
echo ""

# Check if backend is accessible
echo "1️⃣ Checking backend API..."
curl -s -o /dev/null -w "%{http_code}" https://hackathon-app-frox.vercel.app/api/ > /tmp/status.txt
STATUS=$(cat /tmp/status.txt)

if [ "$STATUS" = "200" ]; then
    echo "   ✅ Backend is accessible"
else
    echo "   ❌ Backend returned status: $STATUS"
fi

echo ""
echo "2️⃣ Checking frontend files..."

if [ -f "frontend/index.html" ]; then
    echo "   ✅ index.html exists"
else
    echo "   ❌ index.html not found"
fi

if [ -f "frontend/app.js" ]; then
    echo "   ✅ app.js exists"
else
    echo "   ❌ app.js not found"
fi

if [ -f "frontend/style.css" ]; then
    echo "   ✅ style.css exists"
else
    echo "   ❌ style.css not found"
fi

echo ""
echo "3️⃣ Checking integration points..."

# Check for API_BASE
if grep -q "API_BASE.*hackathon-app-frox" frontend/app.js; then
    echo "   ✅ API_BASE configured"
else
    echo "   ❌ API_BASE not found"
fi

# Check for apiCall function
if grep -q "async function apiCall" frontend/app.js; then
    echo "   ✅ apiCall function exists"
else
    echo "   ❌ apiCall function not found"
fi

# Check for authentication functions
if grep -q "async function handleLogin" frontend/app.js; then
    echo "   ✅ handleLogin function exists"
else
    echo "   ❌ handleLogin function not found"
fi

# Check for route protection
if grep -q "PROTECTED_PAGES" frontend/app.js; then
    echo "   ✅ Route protection implemented"
else
    echo "   ❌ Route protection not found"
fi

echo ""
echo "4️⃣ Checking seed script..."

if [ -f "backend/seed-users.js" ]; then
    echo "   ✅ seed-users.js exists"
else
    echo "   ❌ seed-users.js not found"
fi

echo ""
echo "📋 Next Steps:"
echo "   1. Run: cd backend && node ../seed-users.js"
echo "   2. Open: frontend/index.html in browser"
echo "   3. Login with: ayesha@helphub.ai / password123"
echo ""
echo "✅ Integration verification complete!"
