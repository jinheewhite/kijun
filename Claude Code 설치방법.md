# Claude Code 설치 방법 (Windows · WinGet)

목표: Claude Code를 설치하고, **어느 폴더에서든** `claude` 로 실행하기

> 필요한 것: Windows 10/11, 유료 Claude 계정(Pro · Max 등)

---

## 1단계. 설치하기

1. 시작 메뉴 → **PowerShell** 실행
2. 아래 명령을 붙여넣고 Enter
   ```powershell
   winget install Anthropic.ClaudeCode
   ```
3. 약관 동의를 물으면 `Y` 입력 → "설치 성공"이 나올 때까지 기다리기

## 2단계. 어느 폴더에서든 실행되는지 확인하기

1. PowerShell 창을 **닫고 새로 열기** (새 창이어야 `claude` 명령이 인식됨)
2. 아래 명령 입력
   ```powershell
   claude --version
   ```
   - 버전 번호가 나오면 ✅ 끝. 이제 어느 폴더에서든 실행됨
   - `claude` 를 찾을 수 없다고 나오면 → 아래 **[안 될 때]** 로

---

## 사용하기

- **탐색기에서**: 작업할 폴더 빈 곳 우클릭 → **터미널에서 열기** → `claude` 입력
- **PowerShell에서**: 폴더로 이동 후 실행
  ```powershell
  cd "I:\내 드라이브\앱만들고놀기\kijun"
  claude
  ```
- 처음 실행할 때 브라우저가 열리면 Claude 계정으로 로그인

---

## [안 될 때] 어느 폴더에서든 실행되게 경로(PATH) 추가

새 창에서도 `claude` 를 못 찾으면, PowerShell에 아래 두 줄을 붙여넣고 창을 다시 열기:

```powershell
$links = "$env:LOCALAPPDATA\Microsoft\WinGet\Links"
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";$links", "User")
```

그래도 안 되면 PC를 한 번 재시작한 뒤 `claude --version` 다시 확인.

| 증상 | 해결 |
| --- | --- |
| `winget` 을 찾을 수 없음 | Microsoft Store에서 **앱 설치 관리자(App Installer)** 설치/업데이트 |
| `claude` 를 찾을 수 없음 | 새 창 열기 → 그래도 안 되면 위 PATH 추가 |

## 업데이트 · 삭제

WinGet으로 설치하면 자동 업데이트가 안 되므로 가끔 직접 업데이트 (Claude Code를 끈 상태에서):

```powershell
winget upgrade Anthropic.ClaudeCode
```

삭제:

```powershell
winget uninstall Anthropic.ClaudeCode
```
