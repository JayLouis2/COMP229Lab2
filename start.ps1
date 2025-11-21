# Quick Start Script for Portfolio Application
# Run this from the portfolio directory

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Portfolio Application Quick Start" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists in root
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if node_modules exists in client
if (-not (Test-Path "client/node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location client
    npm install
    Set-Location ..
}

Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Green
Write-Host ""
Write-Host "Backend will run on: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend will run on: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

# Start backend in background
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start" -PassThru

# Wait a bit for backend to start
Start-Sleep -Seconds 2

# Start frontend in background
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\client'; npm run dev" -PassThru

Write-Host ""
Write-Host "Servers started!" -ForegroundColor Green
Write-Host "Backend PID: $($backend.Id)" -ForegroundColor Gray
Write-Host "Frontend PID: $($frontend.Id)" -ForegroundColor Gray
Write-Host ""
Write-Host "To stop servers, close the terminal windows or press Ctrl+C" -ForegroundColor Yellow
