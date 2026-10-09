@echo off
chcp 65001 >nul
title GitHub Token bilan yuklash
color 0B
echo ================================================================
echo   🔑 GITHUB PERSONAL ACCESS TOKEN (PAT) ORQALI YUKLASH
echo ================================================================
echo.
echo GitHub profilingiz: sarvarziyodullayev664-cyber
echo.
echo Agar sizda GitHub Token bo'lsa (https://github.com/settings/tokens dan olingan):
set /p TOKEN="GitHub Tokeningizni kiriting va Enter bosing: "

if "%TOKEN%"=="" (
    echo Token kiritilmadi!
    pause
    exit /b
)

echo.
echo Kodlar yuklanmoqda...
git branch -M main
git remote set-url origin https://%TOKEN%@github.com/sarvarziyodullayev664-cyber/portfolio.git
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [MUVAFFAQIYATLI] Barcha kodlar yuklandi!
    echo Havola: https://github.com/sarvarziyodullayev664-cyber/portfolio
) else (
    echo.
    echo Xatolik yuz berdi. Iltimos token va ombor nomini tekshiring.
)
pause
