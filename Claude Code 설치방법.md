# Claude Code 설치 (Windows)

PowerShell에서 실행

## 1단계. 설치

```powershell
winget install Anthropic.ClaudeCode
```

## 2단계. 어느 폴더에서든 실행되게 설정

```powershell
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";$env:LOCALAPPDATA\Microsoft\WinGet\Links", "User")
```

## 확인 (PowerShell 창을 새로 열고)

```powershell
claude --version
```

## 실행 (작업할 폴더에서)

```powershell
claude
```
