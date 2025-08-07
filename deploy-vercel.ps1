# SafeHaven Security Systems - Vercel Deployment Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SafeHaven Security Systems - Vercel Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Step 1: Building shared package..." -ForegroundColor Yellow
Set-Location "shared"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to build shared package" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "Step 2: Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location "..\frontend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to install frontend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "Step 3: Building frontend..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to build frontend" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "Step 4: Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "Note: You may need to run 'vercel login' first if not already logged in" -ForegroundColor Gray
vercel --prod

Write-Host ""
Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to continue"
