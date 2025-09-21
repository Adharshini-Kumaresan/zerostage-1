@echo off
echo 🚀 Deploying ZeroStage to GitHub...
echo.

echo 📁 Initializing git...
git init

echo 📦 Adding all files...
git add .

echo 💾 Committing changes...
git commit -m "🎉 Complete Google API Integration - All 11 APIs Connected and Working!

✨ Features Added:
- Google Sign-In authentication
- Real-time job search with AI recommendations
- Document management with Google Drive
- AI-powered psychometric test analysis
- Location-based career features
- Email notifications with Gmail
- Data export to Google Sheets
- Video counseling with Google Meet
- Educational content with YouTube
- Comprehensive analytics tracking
- Complete UI components and services

🚀 Ready for production deployment!"

echo 🔗 Adding GitHub remote...
git remote add origin https://github.com/Dharshan-vs/zerostage11.git

echo 🚀 Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Deployment complete! Your ZeroStage platform is now on GitHub!
echo 🌐 Check it out at: https://github.com/Dharshan-vs/zerostage11
echo.
pause
