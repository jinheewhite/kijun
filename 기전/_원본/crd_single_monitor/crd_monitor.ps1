# 크롬 원격 데스크톱 접속 중에는 "PC 화면만"(고른 모니터 1대), 접속이 끊기면 다시 "확장"으로 되돌립니다.
#   설치: install.bat 실행 (설치 중에 원격으로 볼 모니터를 고름)
#   모니터 다시 고르기: choose_monitor.bat  /  제거: uninstall.bat 실행
param([switch]$Install, [switch]$Uninstall, [switch]$Choose)

$AppName  = 'CRD_SingleMonitor'
$AppDir   = Join-Path $env:LOCALAPPDATA $AppName
$Target   = Join-Path $AppDir 'crd_monitor.ps1'
$Shortcut = Join-Path ([Environment]::GetFolderPath('Startup')) "$AppName.lnk"
$PsExe    = Join-Path $env:windir 'System32\WindowsPowerShell\v1.0\powershell.exe'

# 크롬 원격 데스크톱이 연결되어 있는 동안에만 실행되는 프로세스 이름
$CrdSessionProcess = 'remoting_desktop'

Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public static class CrdTopology {
    [DllImport("user32.dll")]
    public static extern int SetDisplayConfig(uint numPathArrayElements, IntPtr pathArray,
                                              uint numModeInfoArrayElements, IntPtr modeInfoArray,
                                              uint flags);
}
"@

# Win+P 메뉴와 같은 동작: 0x1 = PC 화면만, 0x4 = 확장  (0x80 = 적용)
function Set-Topology([uint32]$Topology) {
    return ([CrdTopology]::SetDisplayConfig(0, [IntPtr]::Zero, 0, [IntPtr]::Zero, (0x80 -bor $Topology)) -eq 0)
}

# ---- 원격으로 볼 모니터 고르기 : 고른 모니터를 주 모니터로 정한다 ("PC 화면만" 은 주 모니터를 남김) ----
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public static class CrdPrimary {
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct DEVMODE {
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 32)] public string dmDeviceName;
        public short dmSpecVersion, dmDriverVersion, dmSize, dmDriverExtra;
        public int dmFields;
        public int dmPositionX, dmPositionY;
        public int dmDisplayOrientation, dmDisplayFixedOutput;
        public short dmColor, dmDuplex, dmYResolution, dmTTOption, dmCollate;
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 32)] public string dmFormName;
        public short dmLogPixels;
        public int dmBitsPerPel, dmPelsWidth, dmPelsHeight, dmDisplayFlags, dmDisplayFrequency;
        public int dmICMMethod, dmICMIntent, dmMediaType, dmDitherType, dmReserved1, dmReserved2, dmPanningWidth, dmPanningHeight;
    }
    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    static extern bool EnumDisplaySettings(string dev, int mode, ref DEVMODE dm);
    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    static extern int ChangeDisplaySettingsEx(string dev, ref DEVMODE dm, IntPtr hwnd, uint flags, IntPtr lParam);
    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    static extern int ChangeDisplaySettingsEx(string dev, IntPtr dm, IntPtr hwnd, uint flags, IntPtr lParam);

    // 0 = 성공. 고른 모니터를 (0,0) 으로 옮기고 다른 모니터도 같은 만큼 옮긴 뒤 한꺼번에 적용
    public static int SetPrimary(string target, string[] devices) {
        DEVMODE t = new DEVMODE(); t.dmSize = (short)Marshal.SizeOf(typeof(DEVMODE));
        if (!EnumDisplaySettings(target, -1, ref t)) return -100;
        int ox = t.dmPositionX, oy = t.dmPositionY;
        string[] order = new string[devices.Length];
        int k = 0; order[k++] = target;
        foreach (string d in devices) if (d != target) order[k++] = d;
        foreach (string d in order) {
            DEVMODE m = new DEVMODE(); m.dmSize = (short)Marshal.SizeOf(typeof(DEVMODE));
            if (!EnumDisplaySettings(d, -1, ref m)) return -101;
            m.dmFields = 0x20;  // DM_POSITION
            m.dmPositionX -= ox; m.dmPositionY -= oy;
            uint flags = 0x01 | 0x10000000;            // CDS_UPDATEREGISTRY | CDS_NORESET
            if (d == target) flags |= 0x10;           // CDS_SET_PRIMARY
            int r = ChangeDisplaySettingsEx(d, ref m, IntPtr.Zero, flags, IntPtr.Zero);
            if (r != 0) return r;
        }
        return ChangeDisplaySettingsEx(null, IntPtr.Zero, IntPtr.Zero, 0, IntPtr.Zero);
    }
}
"@

function Select-RemoteMonitor {
    Add-Type -AssemblyName System.Windows.Forms, System.Drawing
    $screens = [System.Windows.Forms.Screen]::AllScreens
    if ($screens.Count -lt 2) {
        Write-Host '모니터가 1대라서 고를 것이 없습니다.'
        return
    }
    Write-Host ''
    Write-Host '모니터를 선택하세요.' -ForegroundColor Cyan
    Write-Host '  모니터마다 단추가 뜹니다. 원격으로 볼 모니터에서 [이 모니터로 원격 보기] 를 누르세요.'

    $script:chosen = $null
    $ctx = New-Object System.Windows.Forms.ApplicationContext
    $forms = @()
    $n = 0
    foreach ($s in $screens) {
        $n++
        $f = New-Object System.Windows.Forms.Form
        $f.FormBorderStyle = 'None'; $f.StartPosition = 'Manual'; $f.TopMost = $true; $f.ShowInTaskbar = $false
        $f.BackColor = [System.Drawing.Color]::FromArgb(30, 34, 44)
        $w = 640; $h = 360
        $f.Bounds = New-Object System.Drawing.Rectangle(($s.Bounds.X + [int](($s.Bounds.Width - $w) / 2)), ($s.Bounds.Y + [int](($s.Bounds.Height - $h) / 2)), $w, $h)

        $t = New-Object System.Windows.Forms.Label
        $t.Text = "모니터를 선택하세요`n`n$n 번 모니터 · $($s.Bounds.Width)×$($s.Bounds.Height)" + $(if ($s.Primary) { ' · 지금 주 모니터' } else { '' })
        $t.ForeColor = [System.Drawing.Color]::White
        $t.Font = New-Object System.Drawing.Font('Malgun Gothic', 18, [System.Drawing.FontStyle]::Bold)
        $t.TextAlign = 'MiddleCenter'; $t.SetBounds(20, 20, $w - 40, 160)
        $f.Controls.Add($t)

        $b = New-Object System.Windows.Forms.Button
        $b.Text = '이 모니터로 원격 보기'
        $b.Font = New-Object System.Drawing.Font('Malgun Gothic', 16, [System.Drawing.FontStyle]::Bold)
        $b.BackColor = [System.Drawing.Color]::FromArgb(46, 125, 230); $b.ForeColor = [System.Drawing.Color]::White
        $b.FlatStyle = 'Flat'; $b.SetBounds(120, 200, $w - 240, 70)
        $b.Tag = $s.DeviceName
        $b.Add_Click({ param($sender, $e) $script:chosen = $sender.Tag; foreach ($x in $forms) { $x.Close() }; $ctx.ExitThread() })
        $f.Controls.Add($b)

        $c = New-Object System.Windows.Forms.Button
        $c.Text = '취소'
        $c.Font = New-Object System.Drawing.Font('Malgun Gothic', 11)
        $c.ForeColor = [System.Drawing.Color]::White; $c.FlatStyle = 'Flat'; $c.SetBounds(($w - 120) / 2, 290, 120, 40)
        $c.Add_Click({ foreach ($x in $forms) { $x.Close() }; $ctx.ExitThread() })
        $f.Controls.Add($c)

        $forms += $f
    }
    foreach ($f in $forms) { $f.Show() }
    [System.Windows.Forms.Application]::Run($ctx)

    if (-not $script:chosen) {
        Write-Host '모니터를 고르지 않았습니다. 지금 주 모니터를 그대로 씁니다. (나중에 choose_monitor.bat 으로 고를 수 있습니다)' -ForegroundColor Yellow
        return
    }
    $cur = ($screens | Where-Object { $_.Primary }).DeviceName
    if ($script:chosen -eq $cur) {
        Write-Host "고른 모니터가 이미 주 모니터입니다. 원격으로 접속하면 이 모니터만 남습니다." -ForegroundColor Green
        return
    }
    $r = [CrdPrimary]::SetPrimary($script:chosen, [string[]]($screens | ForEach-Object { $_.DeviceName }))
    if ($r -eq 0) {
        Write-Host "고른 모니터를 주 모니터로 바꿨습니다. 원격으로 접속하면 이 모니터만 남습니다." -ForegroundColor Green
    } else {
        Write-Host "주 모니터를 바꾸지 못했습니다(코드 $r). 윈도우 설정 → 시스템 → 디스플레이에서 그 모니터를 고르고 [주 디스플레이로 만들기] 를 체크해 주세요." -ForegroundColor Red
    }
}

if ($Choose) {
    Select-RemoteMonitor
    exit
}

function Stop-OtherCopies {
    Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" -ErrorAction SilentlyContinue |
        Where-Object { $_.ProcessId -ne $PID -and $_.CommandLine -like '*crd_monitor.ps1*' } |
        ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}

if ($Install) {
    Stop-OtherCopies
    New-Item -ItemType Directory -Force -Path $AppDir | Out-Null
    if ($PSCommandPath -ne $Target) { Copy-Item -LiteralPath $PSCommandPath -Destination $Target -Force }
    Unblock-File -LiteralPath $Target -ErrorAction SilentlyContinue

    $lnkArgs = "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$Target`""
    $lnk = (New-Object -ComObject WScript.Shell).CreateShortcut($Shortcut)
    $lnk.TargetPath  = $PsExe
    $lnk.Arguments   = $lnkArgs
    $lnk.WindowStyle = 7
    $lnk.Save()

    Select-RemoteMonitor
    Start-Process -FilePath $PsExe -ArgumentList $lnkArgs -WindowStyle Hidden
    Write-Host ''
    Write-Host '설치 완료: 지금부터 자동으로 동작하고, 컴퓨터를 켤 때마다 자동 실행됩니다.' -ForegroundColor Green
    Write-Host '  - 원격 접속 시  : 고른 모니터 1대만'
    Write-Host '  - 접속 끊기면   : 확장(모니터 2대)으로 복구'
    Write-Host ''
    Write-Host '이어서 "기본 앱" 설정 화면이 열립니다. 웹 브라우저를 Chrome으로 선택해 주세요.' -ForegroundColor Cyan
    Write-Host '  (크롬이 기본 브라우저가 아니면 원격 데스크톱 설치파일 다운로드가 멈추는 경우가 있습니다)'
    Start-Process 'ms-settings:defaultapps'
    exit
}

if ($Uninstall) {
    Stop-OtherCopies
    Remove-Item -LiteralPath $Shortcut -Force -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $AppDir -Recurse -Force -ErrorAction SilentlyContinue
    [void](Set-Topology 0x4)
    Write-Host ''
    Write-Host '제거 완료: 자동 전환을 껐고, 모니터를 확장 모드로 되돌렸습니다.' -ForegroundColor Yellow
    exit
}

# ---- 감시 모드 (로그인 시 백그라운드로 실행) ----
$createdNew = $false
$mutex = New-Object System.Threading.Mutex($true, "Local\$AppName", [ref]$createdNew)
if (-not $createdNew) { exit }   # 이미 실행 중이면 종료

$singleApplied = $false
while ($true) {
    $connected = [bool](Get-Process -Name $CrdSessionProcess -ErrorAction SilentlyContinue)
    $locked    = [bool](Get-Process -Name 'LogonUI' -ErrorAction SilentlyContinue)

    if (-not $locked) {
        if ($connected -and -not $singleApplied) {
            Start-Sleep -Seconds 2
            if (Set-Topology 0x1) { $singleApplied = $true }      # PC 화면만
        }
        elseif (-not $connected -and $singleApplied) {
            if (Set-Topology 0x4) { $singleApplied = $false }     # 확장
        }
    }
    Start-Sleep -Seconds 3
}
