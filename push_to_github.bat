@echo off
chcp 65001 >nul
title GitHub-ga yuklash - Sarvar Ziyodullayev
color 0A
echo ================================================================
echo   🚀 SARVAR ZIYODULLAYEV - PORTFOLIO GITHUB-GA YUKLASH
echo   Profil: https://github.com/sarvarziyodullayev664-cyber
echo   Ombor:  https://github.com/sarvarziyodullayev664-cyber/portfolio
echo ================================================================
echo.

git branch -M main
git remote set-url origin https://github.com/sarvarziyodullayev664-cyber/portfolio.git

echo Kodlar GitHub-ga yuklanmoqda (Push)...
echo Agar GitHub brauzer oynasi ochilsa, "Sign in" yoki "Authorize" tugmasini bosing.
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo   [MUVAFFAQIYATLI] Barcha kodlar GitHub profilingizga yuklandi!
    echo   Tekshirish uchun havola:
    echo   https://github.com/sarvarziyodullayev664-cyber/portfolio
    echo ================================================================
) else (
    echo.
    echo ================================================================
    echo   [DIQQAT] Agar "Repository not found" xatosi chiqsa:
    echo   Brauzeringizda https://github.com/new sahifasida "portfolio"
    echo   nomli ombor (Create repository) yaratilganiga ishonch hosil qiling!
    echo ================================================================
)

echo.
pause
