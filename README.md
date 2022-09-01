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

ZAPiXWEB WhatsApp Extractor - 4 CHROME (TESTED), FIREFOX (TESTED), EDGE (TESTED), OPERA 

(It also works offline)

Script for WhatsApp Web Client Live Forensics
Script Name: SPIZAPIXWEB.js

Description: A script that extracts throught Whatsapp WEB data records.
This live acquisition technique allows automated extraction of messages, attachments,
contacts, and account data, even if in a disconnected computer, from WhatsApp Web sessions opened in web
browsers. The technique extracts, in line with forensics procedures, digital data that can be loaded in forensic
tools for analysis. 

URL: https://github.com/kraftdenker/ZAPiXWEB

-------------
- ChangeLog decribed into .js source file.
-------------
Using this foss modules into export script:
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

