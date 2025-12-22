#!/bin/bash

echo "🔍 Testing OAuth Endpoints"
echo "========================"

echo ""
echo "1. Testing OAuth redirect endpoint..."
response=$(curl -s -i http://localhost:3000/auth/google)
echo "$response" | head -5

echo ""
echo "2. Testing callback endpoint (should return error)..."
response=$(curl -s -i "http://localhost:3000/auth/google/callback?code=test&state=test")
echo "$response" | head -3

echo ""
echo "3. Testing logout endpoint..."
response=$(curl -s -i -X POST http://localhost:3000/auth/logout)
echo "$response" | head -3

echo ""
echo "4. Testing protected users endpoint (should require auth)..."
response=$(curl -s -i http://localhost:3000/api/users/list)
echo "$response" | head -3

echo ""
echo "✅ Endpoint tests completed"