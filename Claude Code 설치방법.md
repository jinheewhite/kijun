# Claude Code 설치 방법 (Windows)

> 공식 문서: https://code.claude.com/docs/en/setup (2026-11 기준 정리)

## 준비물
- Windows 10 (1809 이상) / Windows 11, 메모리 4GB 이상, 인터넷
- **유료 계정**(Pro · Max · Team 등) — 무료 플랜으로는 Claude Code를 쓸 수 없음
- (권장) [Git for Windows](https://git-scm.com/downloads/win) — 깃허브 커밋·푸시에도 필요

---

## ✅ 추천: WinGet으로 설치 (이 방법이 잘 됨)
1. 시작 메뉴에서 **PowerShell** 또는 **명령 프롬프트** 실행
2. 아래 한 줄을 붙여넣고 Enter
   ```powershell
   winget install Anthropic.ClaudeCode
   ```
   - 처음 쓰면 원본 약관 동의(`Y`)를 물어볼 수 있음 → `Y` 입력
3. 설치가 끝나면 **창을 닫고 새 창**을 열어 확인
   ```powershell
   claude --version
   ```
   버전 번호(예: `2.1.211 (Claude Code)`)가 나오면 성공
4. 작업할 폴더로 이동해서 실행 → 브라우저가 뜨면 로그인
   ```powershell
   cd "I:\내 드라이브\앱만들고놀기\kijun"
   claude
   ```

> ⚠️ WinGet으로 설치하면 **자동 업데이트가 안 됨**. 가끔 아래 명령으로 업데이트:
> ```powershell
> winget upgrade Anthropic.ClaudeCode
> ```
> (Claude Code가 실행 중이면 업데이트가 실패할 수 있으니 끄고 실행)

---

## 다른 방법
- **데스크톱 앱** (터미널 없이): https://claude.com/download 에서 설치 → 로그인 → 상단 **Code** 탭
- **PowerShell 설치 스크립트** (잘 안 될 때가 있음): `irm https://claude.ai/install.ps1 | iex`
- **npm** (Node.js 22 이상): `npm install -g @anthropic-ai/claude-code`

---

## 자주 겪는 문제
| 증상 | 해결 |
| --- | --- |
| `claude` 를 찾을 수 없다고 나옴 | 창을 닫고 **새 터미널**을 열어 다시 시도 (PATH 반영) |
| `winget` 을 찾을 수 없다고 나옴 | Microsoft Store에서 **앱 설치 관리자(App Installer)** 설치/업데이트 |
| 설치가 잘 됐는지 자세히 보고 싶음 | `claude doctor` |

## 업데이트 · 삭제 (WinGet 설치 기준)
- 업데이트: `winget upgrade Anthropic.ClaudeCode`
- 삭제: `winget uninstall Anthropic.ClaudeCode`
