@echo off
rem AM20210106
cls
::: ______         _____ _______   ____          ________ ____     
:::|___  /   /\   |  __ \_   _\ \ / /\ \        / /  ____|  _ \      
:::   / /   /  \  | |__) || |  \ V /  \ \  /\  / /| |__  | |_) |    
:::  / /   / /\ \ |  ___/ | |   > <    \ \/  \/ / |  __| |  _ <    
::: / /__ / ____ \| |    _| |_ / . \    \  /\  /  | |____| |_) |  
:::/_____/_/    \_\_|   |_____/_/ \_\    \/  \/   |______|____/ 
:::                                     Z A P i X W E B - WHATSAPP EXTRACTOR
::: PASTE the clipboard into browser javascript console.
::: CHROME: F12 (Developer Mode) - > Console -> <CTRL+V>+<ENTER>
::: EDGE: F12 (Developer Mode) - > Console -> <CTRL+V>+<ENTER>
::: FIREFOX: F12 (Developer Mode) - > Console -> First type "allow paste"+<ENTER> -> click "Run" -> <CTRL+V> -> click "Run".
for /f "delims=: tokens=*" %%A in ('findstr /b ::: "%~f0"') do @echo(%%A
clip<SPIZAPiXWEB.js
pause
