#!/bin/bash
# AM20210106
clear
echo " ______         _____ _______   ____          ________ ____              "
echo "|___  /   /\   |  __ \_   _\ \ / /\ \        / /  ____|  _ \             "
echo "   / /   /  \  | |__) || |  \ V /  \ \  /\  / /| |__  | |_) |            "
echo "  / /   / /\ \ |  ___/ | |   > <    \ \/  \/ / |  __| |  _ <             "
echo " / /__ / ____ \| |    _| |_ / . \    \  /\  /  | |____| |_) |            "
echo "/_____/_/    \_\_|   |_____/_/ \_\    \/  \/   |______|____/             "
echo "                                     Z A P i X W E B - WHATSAPP EXTRACTOR"
echo " PASTE the clipboard into browser javascript console."
echo " CHROME: F12 (Developer Mode) - > Console -> <CTRL+V>+<ENTER>"
echo " EDGE: F12 (Developer Mode) - > Console -> <CTRL+V>+<ENTER>"
echo " FIREFOX: F12 (Developer Mode) - > Console -> First type 'allow paste'+<ENTER> -> <CTRL+V> click 'Run'."
xsel -b < SPIZAPiXWEB.js
xclip -sel c < SPIZAPiXWEB.js
