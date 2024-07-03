@echo off
for /R %%i IN (*.wav) do speexenc.exe --vbr "%%~fi" "spx/%%~ni.spx"
REM echo "%%~fi", "spx/%%~ni.spx"
REM 