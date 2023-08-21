$hWnd=(Get-Process -ErrorAction Ignore 'Chrome').Where({ $_.MainWindowTitle }, 'First').MainWindowHandle
if(-not $hWnd){Start-Process -FilePath 'C:\Program Files\Google\Chrome\Application\chrome.exe'}
$type = Add-Type -PassThru -NameSpace Util -Name SetFgWin -MemberDefinition @'
[DllImport("user32.dll", SetLastError=true)]
public static extern bool SetForegroundWindow(IntPtr hWnd);
[DllImport("user32.dll", SetLastError=true)]
public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
[DllImport("user32.dll", SetLastError=true)]
public static extern bool IsIconic(IntPtr hWnd);
'@
$null = $type::SetForegroundWindow($hWnd)
if ($type::IsIconic($hwnd)) {$type::ShowWindow($hwnd, 9)}
[void][System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms')
[System.Windows.Forms.SendKeys]::SendWait("^+{a}")
Start-Sleep 3
[System.Windows.Forms.SendKeys]::SendWait("web.whatsapp.com{ENTER}")  
$baseUrl="https://raw.githubusercontent.com/kraftdenker/ZAPiXWEB/main"
(Invoke-WebRequest "$baseUrl/SPIZAPiXWEB.js" -ContentType "text/javascript; charset=UTF-8").content|Set-Clipboard
[System.Windows.Forms.SendKeys]::SendWait("{F12}")  
Start-Sleep 1
[System.Windows.Forms.SendKeys]::SendWait("{ESC}")  
Start-Sleep 1
[System.Windows.Forms.SendKeys]::SendWait("{TAB}")  
Start-Sleep 1
[System.Windows.Forms.SendKeys]::SendWait("^{v}")
Start-Sleep 1  
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")  
