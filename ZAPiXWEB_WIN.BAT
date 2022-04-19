@echo off
rem AM20210106
cls
:::   _____ _____ _____     _______ _____     _______   _____ _____  ______ 
:::  / ____|  __ |_   _|   / |_   _/ ____|   / |  __ \ / ____|  __ \|  ____|
::: | (___ | |__) || |    / /  | || |       / /| |__) | |    | |  | | |__   
:::  \___ \|  ___/ | |   / /   | || |      / / |  ___/| |    | |  | |  __|  
:::  ____) | |    _| |_ / /   _| || |____ / /  | |    | |____| |__| | |     
::: |_____/|_|   |_____/_/   |_____\_____/_/   |_|     \_____|_____/|_|     
:::                                     Z A P i X W E B - WHATSAPP EXTRACTOR
::: PASTE the clipboard into browser javascript console.
::: CHROME: F12 (Developer Mode) - > Console -> <CTRL+V>+<ENTER>
::: EDGE: F12 (Developer Mode) - > Console -> <CTRL+V>+<ENTER>
::: FIREFOX: F12 (Developer Mode) - > Console -> First type "allow paste"+<ENTER> -> click "Run" -> <CTRL+V> -> click "Run".
for /f "delims=: tokens=*" %%A in ('findstr /b ::: "%~f0"') do @echo(%%A
clip<SPIZAPiXWEB.js
pause