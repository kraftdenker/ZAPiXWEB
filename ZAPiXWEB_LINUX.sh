#!/bin/bash
# AM20210106
clear
echo "   _____ _____ _____     _______ _____     _______   _____ _____  ______ "
echo "  / ____|  __ |_   _|   / |_   _/ ____|   / |  __ \ / ____|  __ \|  ____|"
echo " | (___ | |__) || |    / /  | || |       / /| |__) | |    | |  | | |__   "
echo "  \___ \|  ___/ | |   / /   | || |      / / |  ___/| |    | |  | |  __|  "
echo "  ____) | |    _| |_ / /   _| || |____ / /  | |    | |____| |__| | |     "
echo " |_____/|_|   |_____/_/   |_____\_____/_/   |_|     \_____|_____/|_|     "
echo "                                     Z A P i X W E B - WHATSAPP EXTRACTOR"
echo " PASTE the clipboard into browser javascript console."
echo " CHROME: F12 (Developer Mode) - > Console -> <CTRL+V>+<ENTER>"
echo " EDGE: F12 (Developer Mode) - > Console -> <CTRL+V>+<ENTER>"
echo " FIREFOX: F12 (Developer Mode) - > Console -> First type 'allow paste'+<ENTER> -> <CTRL+V> click 'Run'."
xsel -b < SPIZAPiXWEB.js
xclip -sel c < SPIZAPiXWEB.js