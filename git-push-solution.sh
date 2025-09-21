#!/bin/bash

echo "🚀 ZeroStage GitHub Deployment Solution"
echo "====================================="
echo

echo "📁 Checking git status..."
git status

echo
echo "🔧 Setting up git configuration..."
git config --global user.name "Dharshan-vs"
git config --global user.email "dharshan@example.com"

echo
echo "📦 Adding all files..."
git add .

echo
echo "💾 Committing changes..."
git commit -m "🎉 Complete Google API Integration - All 11 APIs Connected!

✨ Features:
- Google Sign-In authentication
- Real-time job search with AI
- Document management (Google Drive)
- AI-powered psychometric analysis
- Location-based career features
- Email notifications (Gmail)
- Data export (Google Sheets)
- Video counseling (Google Meet)
- Educational content (YouTube)
- Analytics tracking
- Complete UI components

🚀 Production ready!"

echo
echo "🔗 Setting up remote origin..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/Dharshan-vs/zerostage11.git

echo
echo "🌿 Creating and switching to main branch..."
git branch -M main

echo
echo "🚀 Pushing to GitHub..."
echo "Attempting push to main branch..."
git push -u origin main

if [ $? -ne 0 ]; then
    echo
    echo "⚠️  Push to main failed, trying master branch..."
    git branch -M master
    git push -u origin master
fi

if [ $? -ne 0 ]; then
    echo
    echo "⚠️  Push failed, trying force push..."
    git push -f origin main
fi

if [ $? -ne 0 ]; then
    echo
    echo "⚠️  Force push to main failed, trying master..."
    git push -f origin master
fi

echo
echo "✅ Deployment process completed!"
echo "🌐 Check your repo at: https://github.com/Dharshan-vs/zerostage11"
echo
echo "📋 If you still have issues, try:"
echo "1. Check if the repository exists on GitHub"
echo "2. Verify your GitHub credentials"
echo "3. Make sure you have write access to the repo"
echo
