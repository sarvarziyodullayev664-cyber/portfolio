@echo off
title Sarvar Ziyodullayev - Global Online Hosting & Tunnel
echo ================================================================
echo   🚀 SARVAR ZIYODULLAYEV - 3D PORTFOLIO ONLINE HOSTING
echo ================================================================
echo 1. Mahalliy FastAPI serveri fonda ishga tushirilmoqda...
start /b python run_server.py

timeout /t 2 /nobreak >nul

echo 2. Cloudflare Global HTTPS Tunneli ulanmoqda...
echo Dunyoning istalgan nuqtasidan (telefon yoki kompyuter) kirish mumkin!
echo.
.\cloudflared.exe tunnel --url http://localhost:8080
pause
