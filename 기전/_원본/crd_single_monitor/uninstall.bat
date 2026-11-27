@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0crd_monitor.ps1" -Uninstall
pause
