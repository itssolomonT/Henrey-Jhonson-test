@echo off
echo ========================================
echo SafeHaven Security Systems - Vercel Deployment
echo ========================================

echo.
echo Step 1: Building shared package...
cd shared
call npm run build
if %errorlevel% neq 0 (
    echo Error: Failed to build shared package
    pause
    exit /b 1
)

echo.
echo Step 2: Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Step 3: Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Failed to build frontend
    pause
    exit /b 1
)

echo.
echo Step 4: Deploying to Vercel...
echo Note: You may need to run 'vercel login' first if not already logged in
vercel --prod

echo.
echo Deployment complete!
echo.
pause
