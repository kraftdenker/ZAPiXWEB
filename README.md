# ZAPiXWEB
     ______         _____ _______   ____          ________ ____     
    |___  /   /\   |  __ \_   _\ \ / /\ \        / /  ____|  _ \      
       / /   /  \  | |__) || |  \ V /  \ \  /\  / /| |__  | |_) |    
      / /   / /\ \ |  ___/ | |   > <    \ \/  \/ / |  __| |  _ <    
     / /__ / ____ \| |    _| |_ / . \    \  /\  /  | |____| |_) |  
    /_____/_/    \_\_|   |_____/_/ \_\    \/  \/   |______|____/ 
	          			      	        ZAPiX Web
W H A T S A P P W E B   E X T R A C T O R						

Author: alberto.magno@gmail.com (https://github.com/kraftdenker)  

LICENSE GNU General Public License v3.0 

Illegal use of this product will be subject to legal proceedings.

Implementation of technique described in paper:
Soares, A. (2022). WhatsApp Web Client Live Forensics Technique. In Proceedings of the 8th International Conference on Information Systems Security and Privacy - ICISSP, ISBN 978-989-758-553-1, pages 629-636. DOI: 10.5220/0011006400003120
https://doi.org/10.5220/0011006400003120

ZAPiXWEB WhatsApp Extractor - 4 CHROME, FIREFOX, EDGE, OPERA, WhatsApp Desktop App (ELECTRON version deprecated by Meta in JUN/2023) 
(It also works offline for Browser extractions. It just works online for DesktopApp)

Script for WhatsApp Web Client Live Forensics
Script Name: SPIZAPIXWEB.js

Description: A script that extracts throught Whatsapp WEB data records.
This live acquisition technique allows automated extraction of messages, attachments,
contacts, and account data, even if in a disconnected computer, from WhatsApp Web sessions opened in web
browsers. The technique extracts, in line with forensics procedures, digital data that can be loaded in forensic
tools for analysis. 

WhatsApp Desktop  - Electron (Electron version deprecated by Meta in JUN/23) (For this whatsapp version, it only works online): 
------------------------------------------------------------------------------

-Locate running whatsapp app dir with taskmanager->details->whatsapp->(rightclick)->File location (similar to C:\Program Files\WindowsApps\5319275A.WhatsAppDesktop_2.2228.14.0_x64__cv1g1gvanyjgm\app)

-CLOSE APPLICATION. RESTART application with this command line in the app directory: 
C:\Program Files\WindowsApps\5319275A.WhatsAppDesktop_2.2228.14.0_x64__cv1g1gvanyjgm\app>WhatsApp.exe --remote-debugging-port=9222 --disable-web-security --expose-internals-for-testing --allow-sandbox-debugging --debug-devtools --disable-file-system --enable-logging  --unlimited-quota-for-files --enable-experimental-web-platform-features --allow-file-access-from-files

-Open a browser (Chrome, Edge, etc...) into debug inspector
 ex:
 
 Chrome, type into address bar: chrome://inspect
 
 Edge, type into address bar: edge://inspect
     
- Wait for remote sites location, click inspect in WhatsApp Desktop program.

- Copy/Paste ZAPiXWEB script

- Attention: User needs to explict type the file names to the zip file and to the hash file when asked. After extration, no hashfile is automatically generate. So, the user needs to click 'Last digest' to generate hash file.

-------------
- ChangeLog decribed into .js source file.
-------------
Using these following foss modules into export script:

	AXIOS - https://github.com/axios/axios/
	JSZIP - https://raw.github.com/Stuk/jszip/
	FILESSAVER - https://github.com/eligrey/FileSaver.js/
	WA-AUTOMATE-NODEJS - https://github.com/open-wa/wa-automate-nodejs/blob/master/src/lib/wapi.js
	
Using the following module for import into UFED:

	SIMPLEJSON - https://github.com/simplejson/simplejson

USAGE: 
First of all, if online, you must scroll through the conversations of greatest interest "going
up" with the scroll bar until the date of interest. It will download locally the message attachments.
Copy and paste all SPIZAPiXWEB.js code into browser console + ENTER. 
(For Copy you can execute shell scripts for each specific O.S. that copy code to transfer-area: ZAPiXWEB_WIN.bat,ZAPiXWEB_iOS.sh, ZAPiXWEB_LINUX.sh)

Choose options at webinterface on left corner of the screen.

In Firefox console, you have to manually type "allow paste" into the console to enable pasting.

IMPORTING to UFED:
Install plugin ZAPiXWEB_UFED_PLUGIN.tplug to UFED and execute choosing project with ZIP contaning exported data.
In installation process, "simplejson" directory must be in the same directory of the plugin's file.

See ZAPiXWEB_MANUAL.PDF for detailed instructions.

