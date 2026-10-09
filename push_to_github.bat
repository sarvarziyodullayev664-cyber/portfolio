@echo off
chcp 65001 >nul
title GitHub Загрузка / Yuklash - Sarvar Ziyodullayev
color 0A
echo ================================================================
echo   🚀 SARVAR ZIYODULLAYEV - PORTFOLIO GITHUB
echo   Репозиторий: https://github.com/sarvarziyodullayev664-cyber/portfolio
echo ================================================================
echo.
echo [RU] Загрузка файлов проекта в GitHub...
echo      Если откроется окно в браузере, нажмите "Sign in" или "Authorize".
echo.
echo [UZ] Fayllar GitHub-ga yuklanmoqda...
echo      Brauzer oynasi ochilsa, "Sign in" yoki "Authorize" tugmasini bosing.
echo ================================================================
echo.

git branch -M main
git remote set-url origin https://github.com/sarvarziyodullayev664-cyber/portfolio.git

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo   [УСПЕШНО / MUVAFFAQIYATLI]
    echo   Все файлы успешно загружены на ваш GitHub!
    echo   Barcha fayllar GitHub profilingizga muvaffaqiyatli yuklandi!
    echo.
    echo   Ссылка / Havola:
    echo   https://github.com/sarvarziyodullayev664-cyber/portfolio
    echo ================================================================
) else (
    echo.
    echo ================================================================
    echo   [ОШИБКА / XATOLIK]
    echo   Пожалуйста, проверьте подключение к интернету и авторизацию.
    echo ================================================================
)

echo.
pause
