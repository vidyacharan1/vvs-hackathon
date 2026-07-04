@echo off
pushd \\wsl.localhost\Ubuntu\home\hp\arogyam
if errorlevel 1 goto err
call npx.cmd next dev --port 3000
popd
goto end
:err
echo Make sure WSL is running. Try: wsl --set-default Ubuntu
pause
:end
