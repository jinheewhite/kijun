# Claude Code 설치 방법 (Windows)

> 공식 문서: https://code.claude.com/docs/en/setup (2026-11 기준 정리)

## 준비물
- Windows 10 (1809 이상) / Windows 11, 메모리 4GB 이상, 인터넷
- **유료 계정**(Pro · Max · Team 등) — 무료 플랜으로는 Claude Code를 쓸 수 없음
- (권장) [Git for Windows](https://git-scm.com/downloads/win) — 깃허브 커밋·푸시에도 필요

---

## 방법 1. 데스크톱 앱 (터미널이 낯설면)
1. https://claude.com/download 에서 Windows용 Claude 앱 설치
2. 앱 실행 → 로그인 → 상단 **Code** 탭에서 작업할 폴더를 열고 사용

## 방법 2. PowerShell로 설치 (터미널에서 `claude` 명령으로 쓰기)
1. 시작 메뉴에서 **PowerShell** 실행 (관리자 권한 필요 없음, 프롬프트가 `PS C:\...` 로 보이면 맞음)
2. 아래 한 줄을 붙여넣고 Enter
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
   - 다운로드 중에는 진행 표시가 없으니 끝날 때까지 기다리기
3. **새 PowerShell 창**을 열고 설치 확인
   ```powershell
   claude --version
   ```
   버전 번호(예: `2.1.211 (Claude Code)`)가 나오면 성공
4. 작업할 폴더로 이동해서 실행 → 브라우저가 뜨면 로그인
   ```powershell
   cd "I:\내 드라이브\앱만들고놀기\kijun"
   claude
   ```

> CMD(명령 프롬프트)에서 설치할 때는 대신 이 명령을 사용:
> ```bat
> curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
> ```

### 기타 설치 방법
- WinGet: `winget install Anthropic.ClaudeCode` (자동 업데이트 안 됨 → `winget upgrade Anthropic.ClaudeCode`)
- npm (Node.js 22 이상): `npm install -g @anthropic-ai/claude-code`

---

## 자주 겪는 문제
| 증상 | 해결 |
| --- | --- |
| `claude` 를 찾을 수 없다고 나옴 | 창을 닫고 **새 터미널**을 열어 다시 시도 (PATH 반영) |
| `'irm' is not recognized` | CMD에서 실행한 것 → PowerShell에서 실행하거나 위 CMD용 명령 사용 |
| `The token '&&' is not a valid...` | PowerShell에서 CMD용 명령을 쓴 것 → `irm ... \| iex` 명령 사용 |
| 설치가 잘 됐는지 자세히 보고 싶음 | `claude doctor` |

## 업데이트 · 삭제
- 업데이트: 자동으로 됨. 바로 하려면 `claude update`
- 삭제 (PowerShell):
  ```powershell
  Remove-Item -Path "$env:USERPROFILE\.local\bin\claude.exe" -Force
  Remove-Item -Path "$env:USERPROFILE\.local\share\claude" -Recurse -Force
  ```
