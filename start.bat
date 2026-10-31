@echo off
cd /d "%~dp0"

echo Avvio del backend (basicApis/app.py)...
start "Backend API" cmd /k python basicApis\app.py

echo Avvio del frontend (basicApis_fe)...
cd basicApis_fe
npm run dev
