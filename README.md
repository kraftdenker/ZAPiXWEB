# ZAPiXWEB

     _|_|_|   _|_|_|     |_|_|	
    _|        _|  _|       _|	
      _|_|    _|_|_|       _|	
         _|   _|           _|	
    _|_|_|    _|         _|_|_|	
	                      ZAPiX Web
W H A T S A P P W E B   E X T R A C T O R						

Author: alberto.magno@gmail.com (https://github.com/kraftdenker)  

LICENSE GNU General Public License v3.0 

Implementation of technique described in paper:
Soares, A. (2022). WhatsApp Web Client Live Forensics Technique. In Proceedings of the 8th International Conference on Information Systems Security and Privacy - ICISSP, ISBN 978-989-758-553-1, pages 629-636. DOI: 10.5220/0011006400003120
https://doi.org/10.5220/0011006400003120

ZAPiXWEB WhatsApp Extractor - 4 CHROME (TESTED), FIREFOX (TESTED), EDGE (TESTED), OPERA 
(It also works offline)

Script for WhatsApp Web Client Live Forensics
Script Name: SPIZAPIXWEB.js
Version: 1.5
Revised Date: 02/21/22

Description: A script that extracts throught Whatsapp WEB data records.
This live acquisition technique allows automated extraction of messages, attachments,
contacts, and account data, even if in a disconnected computer, from WhatsApp Web sessions opened in web
browsers. The technique extracts, in line with forensics procedures, digital data that can be loaded in forensic
tools for analysis. 

URL: https://github.com/kraftdenker/ZAPiXWEB

--
- ChangeLog -
v1 		- [05-18-21]: Wrote original code
v1.2	- [09-27-21]: Command to extract one or more chats.
v1.3	- [10-08-21]: Correct chat extraction
v1.4	- [12-03-21]: Change extraction to full support multiple devices
v1.5	- [02-21-22]: Hash, new decryption code (using vendor module ligsignal)

Using this foss modules into export script:
	AXIOS - https://github.com/axios/axios/
	JSZIP - https://raw.github.com/Stuk/jszip/
	FILESSAVER - https://github.com/eligrey/FileSaver.js/
	WA-AUTOMATE-NODEJS - https://github.com/open-wa/wa-automate-nodejs/blob/master/src/lib/wapi.js
Using this foos module into import script:
	SIMPLEJSON - https://github.com/simplejson/simplejson

USAGE: 
Copy and paste all SPIZAPiXWEB.js code into browser console + ENTER. 
(For Copy you can execute shell scripts for each specific O.S. that copy code to transfer-area: ZAPiXWEB_WIN.bat,ZAPiXWEB_iOS.sh, ZAPiXWEB_LINUX.sh)
Choose opetions at webinterface on left corner of the screen.
In Firefox console, you have to manually type "allow paste" into the console to enable pasting.

IMPORTING to UFED:
Install plugin ZAPiXWEB_UFED_PLUGIN.tplug to UFED and execute choosing project with ZIP contaning exported data.
In instalation process, "simplejson" directory must be in the same directory of the plugin's file.

See ZAPiXWEB_MANUAL.PDF for detailed instructions.

