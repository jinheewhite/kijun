
(function () {
  // 이 페이지는 스스로를 다시 게시해서 수정·삭제를 저장한다. 원본 구조는 아래 HEAD + style#css + div#root + script#data + script#app.
  var CSS_TEXT = "\n/* Layout: field clipboard — title scrolls away, search + category chips stay pinned, one column of fold-out cards */\n:root {\n  --paper: #EEF3F0;\n  --card: #FFFFFF;\n  --ink: #16211D;\n  --muted: #56675F;\n  --line: #D3DDD8;\n  --chip: #E3EBE7;\n  --memo: #F4F7F5;\n  --accent: #1E6A55;\n  --accent-ink: #FFFFFF;\n  --mark: #FFE7A3;\n  --c-board: #1E6A55;\n  --c-laptop: #2D5B99;\n  --c-cabinet: #9A5C14;\n  --c-account: #67489B;\n  --c-windows: #1C6E8A;\n  --c-special: #8A4F7D;\n  --c-etc: #56675F;\n  --s-done: #23804F;\n  --s-temp: #B06E12;\n  --s-check: #B83A2E;\n  --s-routine: #56675F;\n  --s-info: #2D5B99;\n  --f-display: \"Do Hyeon\", \"IBM Plex Sans KR\", \"Apple SD Gothic Neo\", \"Malgun Gothic\", sans-serif;\n  --f-body: \"IBM Plex Sans KR\", \"Apple SD Gothic Neo\", \"Malgun Gothic\", \"Noto Sans KR\", sans-serif;\n  --f-mono: \"IBM Plex Mono\", ui-monospace, \"SFMono-Regular\", Menlo, Consolas, monospace;\n}\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme=\"light\"]) {\n    --paper: #101715; --card: #18211E; --ink: #E4EDE9; --muted: #98AAA2; --line: #2A3732;\n    --chip: #23302B; --memo: #1D2824; --accent: #5DBE9C; --accent-ink: #0C1613; --mark: #6B5418;\n    --c-board: #5DBE9C; --c-laptop: #84A9E6; --c-cabinet: #E0A55C; --c-account: #B79BE6; --c-windows: #6CC4E0; --c-special: #D99BC8; --c-etc: #98AAA2;\n    --s-done: #5CC88E; --s-temp: #E5A84B; --s-check: #F07C70; --s-routine: #98AAA2; --s-info: #84A9E6;\n    color-scheme: dark;\n  }\n}\n:root[data-theme=\"dark\"] {\n  --paper: #101715; --card: #18211E; --ink: #E4EDE9; --muted: #98AAA2; --line: #2A3732;\n  --chip: #23302B; --memo: #1D2824; --accent: #5DBE9C; --accent-ink: #0C1613; --mark: #6B5418;\n  --c-board: #5DBE9C; --c-laptop: #84A9E6; --c-cabinet: #E0A55C; --c-account: #B79BE6; --c-windows: #6CC4E0; --c-special: #D99BC8; --c-etc: #98AAA2;\n  --s-done: #5CC88E; --s-temp: #E5A84B; --s-check: #F07C70; --s-routine: #98AAA2; --s-info: #84A9E6;\n  color-scheme: dark;\n}\n\nbody {\n  background: var(--paper);\n  color: var(--ink);\n  font-family: var(--f-body);\n  font-size: 15px;\n  line-height: 1.6;\n  -webkit-text-size-adjust: 100%;\n}\nbody::before {\n  content: \"\"; position: fixed; inset: 0 0 auto;\n  height: env(safe-area-inset-top, 0px); z-index: 10; background: var(--paper);\n}\n.wrap {\n  max-width: 720px; margin: 0 auto;\n  padding-left: max(16px, env(safe-area-inset-left, 0px));\n  padding-right: max(16px, env(safe-area-inset-right, 0px));\n}\n\n/* Title block */\n.top .wrap { padding-block: 22px 6px; display: grid; gap: 6px; }\n.eyebrow { font-size: 12px; font-weight: 600; letter-spacing: .06em; color: var(--muted); margin: 0; }\nh1 {\n  font-family: var(--f-display); font-weight: 400; font-size: clamp(30px, 8vw, 40px);\n  line-height: 1.1; margin: 0; letter-spacing: -.01em; text-wrap: balance;\n}\n.lede { margin: 2px 0 0; color: var(--muted); font-size: 14px; max-width: 60ch; }\n\n/* Pinned search bar */\n.bar {\n  position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5;\n  background: var(--paper); border-bottom: 1px solid var(--line);\n}\n.bar .wrap { padding-block: 10px; display: grid; gap: 10px; }\n.search { position: relative; display: flex; align-items: center; }\n.search svg { position: absolute; left: 12px; width: 18px; height: 18px; color: var(--muted); pointer-events: none; }\n#q {\n  width: 100%; box-sizing: border-box;\n  font: 500 16px/1.2 var(--f-body); color: var(--ink);\n  background: var(--card); border: 1.5px solid var(--line); border-radius: 10px;\n  padding: 12px 42px 12px 38px; appearance: none; -webkit-appearance: none;\n}\n#q::placeholder { color: var(--muted); font-weight: 400; }\n#q:focus { outline: none; border-color: var(--accent); }\n#q::-webkit-search-cancel-button { display: none; }\n#clear {\n  position: absolute; right: 6px; width: 32px; height: 32px; border: 0; border-radius: 8px;\n  background: transparent; color: var(--muted); font-size: 20px; line-height: 1; cursor: pointer;\n}\n#clear:focus-visible { outline: 2px solid var(--accent); }\n\n.chips {\n  display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none;\n  margin: 0 -2px; padding: 2px; scroll-snap-type: x proximity;\n}\n.chips::-webkit-scrollbar { display: none; }\n.chip {\n  flex: none; scroll-snap-align: start;\n  display: inline-flex; align-items: center; gap: 6px;\n  font: 600 14px/1 var(--f-body); color: var(--ink);\n  background: var(--card); border: 1px solid var(--line); border-radius: 999px;\n  padding: 9px 13px; cursor: pointer; white-space: nowrap;\n}\n.chip .n { font: 500 12px/1 var(--f-mono); color: var(--muted); font-variant-numeric: tabular-nums; }\n.chip[aria-pressed=\"true\"] { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }\n.chip[aria-pressed=\"true\"] .n { color: var(--accent-ink); opacity: .8; }\n.chip:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n\n/* List */\nmain .wrap { padding-block: 14px 28px; display: grid; gap: 10px; }\n.summary-line { font-size: 13px; color: var(--muted); margin: 0 0 2px; }\n.summary-line b { color: var(--ink); font-weight: 600; }\n\n.entry {\n  background: var(--card); border: 1px solid var(--line); border-radius: 12px; min-width: 0;\n}\n.entry > summary {\n  list-style: none; cursor: pointer; padding: 14px 16px 14px;\n  display: grid; gap: 6px; border-radius: 12px;\n}\n.entry > summary::-webkit-details-marker { display: none; }\n.entry > summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n.meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; }\n.cat {\n  display: inline-flex; align-items: center; gap: 6px;\n  font-size: 12px; font-weight: 600; letter-spacing: .03em; color: var(--cc);\n}\n.cat::before { content: \"\"; width: 8px; height: 8px; border-radius: 2px; background: var(--cc); }\n.status {\n  display: inline-flex; align-items: center; gap: 5px;\n  font-size: 12px; font-weight: 600; color: var(--sc);\n  border: 1px solid currentColor; border-radius: 999px; padding: 1px 8px;\n}\n.status::before { content: \"\"; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }\n.date { font: 500 12px/1 var(--f-mono); color: var(--muted); font-variant-numeric: tabular-nums; display: inline-flex; align-items: center; gap: 6px; }\n.chev { width: 16px; height: 16px; color: var(--muted); transition: transform .18s ease; }\n.entry[open] .chev { transform: rotate(180deg); }\n.symptom { font-size: 17px; font-weight: 600; line-height: 1.45; margin: 0; text-wrap: pretty; overflow-wrap: anywhere; }\n.device { font-size: 13px; color: var(--muted); margin: 0; overflow-wrap: anywhere; }\n\n.body {\n  padding: 4px 16px 16px; display: grid; gap: 16px; min-width: 0;\n}\n.body::before { content: \"\"; display: block; border-top: 1px dashed var(--line); }\n.sec { display: grid; gap: 8px; min-width: 0; }\n.label { font-size: 12px; font-weight: 600; letter-spacing: .06em; color: var(--muted); margin: 0; }\n.prep { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }\n.prep li { background: var(--chip); border-radius: 6px; padding: 4px 9px; font-size: 14px; }\n.none { font-size: 14px; color: var(--muted); margin: 0; }\n\n.steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; counter-reset: s; }\n.steps li { counter-increment: s; display: grid; grid-template-columns: 26px minmax(0, 1fr); gap: 10px; align-items: start; }\n.steps li::before {\n  content: counter(s);\n  width: 24px; height: 24px; border-radius: 50%;\n  display: grid; place-items: center; margin-top: 1px;\n  font: 500 12px/1 var(--f-mono); color: var(--accent-ink); background: var(--accent);\n}\n.steps li span { overflow-wrap: anywhere; }\n\n.memo { list-style: none; margin: 0; padding: 10px 12px; background: var(--memo); border-radius: 8px; display: grid; gap: 6px; }\n.memo li { position: relative; padding-left: 14px; font-size: 14px; color: var(--ink); overflow-wrap: anywhere; }\n.memo li::before { content: \"\"; position: absolute; left: 0; top: .72em; width: 6px; height: 1.5px; background: var(--muted); }\n\n.secret {\n  display: flex; flex-wrap: wrap; align-items: center; gap: 8px;\n  font-size: 14px; padding: 9px 12px; border: 1px dashed var(--line); border-radius: 8px;\n}\n.secret svg { width: 16px; height: 16px; color: var(--muted); flex: none; }\n.secret .tag { font-size: 12px; font-weight: 600; color: var(--card); background: var(--ink); border-radius: 4px; padding: 2px 7px; }\n\ncode {\n  font: 500 13px/1.4 var(--f-mono); background: var(--chip); border-radius: 4px; padding: 1px 5px;\n  overflow-wrap: anywhere;\n}\nmark { background: var(--mark); color: inherit; border-radius: 2px; padding: 0 1px; }\n\n.empty {\n  background: var(--card); border: 1px dashed var(--line); border-radius: 12px;\n  padding: 22px 16px; text-align: left; display: grid; gap: 4px;\n}\n.empty b { font-size: 15px; }\n.empty span { font-size: 14px; color: var(--muted); }\n\nfooter .wrap { padding-block: 4px 32px; display: grid; gap: 4px; font-size: 13px; color: var(--muted); }\nfooter p { margin: 0; }\n\n.entry.imp { border: 1.5px solid var(--s-check); }\n.imp-badge { font-size: 12px; font-weight: 600; color: var(--card); background: var(--s-check); border-radius: 4px; padding: 1px 7px; }\n.keys {\n  display: flex; flex-wrap: wrap; align-items: center; gap: 6px;\n  margin: 2px 0 0; padding: 10px 12px; background: var(--memo); border-radius: 8px;\n}\n.keys .cap { width: 100%; font-size: 12px; font-weight: 600; letter-spacing: .04em; color: var(--muted); }\n.key {\n  min-width: 36px; height: 36px; box-sizing: border-box; display: grid; place-items: center;\n  border: 1.5px solid var(--ink); border-radius: 8px; background: var(--card);\n  font: 500 20px/1 var(--f-mono); box-shadow: 0 2px 0 var(--line);\n}\n.keys .sep { width: 10px; height: 1.5px; background: var(--muted); }\n\n.contact {\n  display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px;\n  padding: 12px; border: 1.5px solid var(--accent); border-radius: 10px;\n}\n.contact .who { width: 100%; font-size: 12px; font-weight: 600; letter-spacing: .04em; color: var(--muted); }\n.contact .num {\n  font: 500 22px/1.2 var(--f-mono); font-variant-numeric: tabular-nums;\n  user-select: all; -webkit-user-select: all;\n}\n.contact .ext { font-size: 15px; font-weight: 600; }\n.copy {\n  margin-left: auto; font: 600 13px/1 var(--f-body); color: var(--accent);\n  background: transparent; border: 1px solid var(--accent); border-radius: 8px;\n  padding: 9px 12px; cursor: pointer;\n}\n.copy:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n\n.pwgrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }\n.pwcol { display: grid; gap: 6px; align-content: start; min-width: 0; }\n.pwyear { font-size: 12px; font-weight: 600; letter-spacing: .04em; color: var(--c-cabinet); }\n.pw {\n  display: flex; align-items: baseline; justify-content: space-between; gap: 4px;\n  padding: 7px 8px; border: 1px solid var(--line); border-radius: 8px; background: var(--card);\n}\n.pw .cls { font-size: 12px; font-weight: 600; color: var(--muted); }\n.pw .code { font: 500 17px/1 var(--f-mono); font-variant-numeric: tabular-nums; letter-spacing: .02em; }\n.sheet { display: block; width: auto; max-width: 100%; height: auto; border: 1px solid var(--line); border-radius: 8px; }\n\n@media (prefers-reduced-motion: reduce) { .chev { transition: none; } }\n\n/* Edit / delete */\n.right { margin-left: auto; display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }\n.acts, .confirm { display: inline-flex; align-items: center; gap: 4px; }\n.act {\n  font: 600 12px/1 var(--f-body); color: var(--muted); background: var(--card);\n  border: 1px solid var(--line); border-radius: 6px; padding: 7px 10px; cursor: pointer;\n}\n.act:hover { color: var(--ink); border-color: var(--muted); }\n.act:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }\n.act.del { color: var(--s-check); }\n.confirm { font-size: 12px; font-weight: 600; color: var(--s-check); }\n.act.yes { background: var(--s-check); border-color: var(--s-check); color: var(--card); }\n\n.listhead { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 2px; }\n.listhead .summary-line { margin: 0; flex: 1 1 auto; }\n.add {\n  font: 600 13px/1 var(--f-body); color: var(--accent); background: transparent;\n  border: 1px dashed var(--accent); border-radius: 8px; padding: 9px 12px; cursor: pointer;\n}\n.add:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n\n.editor {\n  background: var(--card); border: 1.5px solid var(--accent); border-radius: 12px;\n  padding: 16px; display: grid; gap: 12px; min-width: 0;\n}\n.ed-title { font-size: 16px; font-weight: 600; margin: 0; }\n.editor label {\n  display: grid; gap: 4px; min-width: 0;\n  font-size: 12px; font-weight: 600; letter-spacing: .04em; color: var(--muted);\n}\n.editor label small { font-weight: 400; letter-spacing: 0; }\n.editor input[type=\"text\"], .editor input[type=\"date\"], .editor select, .editor textarea {\n  width: 100%; box-sizing: border-box; min-width: 0;\n  font: 400 16px/1.45 var(--f-body); letter-spacing: 0; color: var(--ink);\n  background: var(--paper); border: 1px solid var(--line); border-radius: 8px; padding: 9px 10px;\n}\n.editor textarea { resize: vertical; }\n.editor input:focus, .editor select:focus, .editor textarea:focus { outline: 2px solid var(--accent); outline-offset: 0; border-color: var(--accent); }\n.row2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }\n.row3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; }\n.editor .chk {\n  display: flex; align-items: center; gap: 8px;\n  font-size: 14px; font-weight: 500; letter-spacing: 0; color: var(--ink);\n}\n.chk input { width: 18px; height: 18px; margin: 0; accent-color: var(--accent); }\n.ed-err { margin: 0; font-size: 14px; color: var(--s-check); }\n.ed-acts { display: flex; gap: 8px; flex-wrap: wrap; }\n.btn {\n  font: 600 15px/1 var(--f-body); color: var(--ink); background: var(--card);\n  border: 1px solid var(--line); border-radius: 10px; padding: 12px 18px; cursor: pointer;\n}\n.btn.primary { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }\n.btn[disabled] { opacity: .6; cursor: default; }\n.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n.ed-note { margin: 0; font-size: 12px; color: var(--muted); }\n\n#toast {\n  position: fixed; left: 50%; transform: translateX(-50%); z-index: 20;\n  bottom: calc(16px + env(safe-area-inset-bottom, 0px));\n  max-width: calc(100% - 32px); box-sizing: border-box;\n  background: var(--ink); color: var(--paper); font-size: 14px; font-weight: 500;\n  padding: 10px 16px; border-radius: 10px; box-shadow: 0 4px 16px rgba(0, 0, 0, .18);\n}\n\n/* Tables (accounts, contacts) */\n.tbl { overflow-x: auto; border: 1px solid var(--line); border-radius: 8px; background: var(--card); }\n.tbl table { border-collapse: collapse; width: 100%; font-size: 14px; }\n.tbl th {\n  text-align: left; font-size: 12px; font-weight: 600; letter-spacing: .04em; color: var(--muted);\n  background: var(--memo); padding: 8px 10px; white-space: nowrap;\n}\n.tbl td { padding: 8px 10px; border-top: 1px solid var(--line); vertical-align: top; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }\n.tbl td:first-child { font-weight: 600; min-width: 7.5em; }\n.tbl td.wired { color: var(--s-check); font-weight: 600; }\n.tbl tfoot td { background: var(--memo); white-space: nowrap; }\n.tbl tfoot td:first-child { font-size: 12px; font-weight: 600; letter-spacing: .04em; color: var(--muted); }\n.tbl tfoot tr.first td { border-top: 2px solid var(--line); }\n.tbl tfoot .sub-name { font-weight: 600; }\n.tbl tfoot tr.co td { border-top: 1px solid var(--line); }\n.tbl tfoot tr.co.first td { border-top: 2px solid var(--line); }\n.tbl tfoot tr.ver td { border-top: 0; padding-top: 2px; }\n.tbl tfoot .ver-name { color: var(--muted); padding-left: 14px; position: relative; }\n.tbl tfoot .ver-name::before { content: \"\"; position: absolute; left: 2px; top: .7em; width: 7px; height: 1.5px; background: var(--muted); }\n.tbl tfoot .sub-n { font: 500 14px/1 var(--f-mono); font-variant-numeric: tabular-nums; margin-left: 10px; }\n.tbl tfoot tr.total td { border-top: 1.5px solid var(--ink); background: var(--chip); }\n.tbl tfoot tr.total td:first-child { color: var(--ink); font-size: 13px; }\n.tacts { display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap; }\n\n/* Classroom board table: compact grid, header row + first column (교실명) frozen (view and edit) */\n.tbl.grid { max-height: min(70vh, calc(100dvh - 170px)); overflow: auto; overscroll-behavior: contain; }\n.tbl.grid table { width: max-content; min-width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; }\n.tbl.grid th, .tbl.grid td { white-space: nowrap; padding: 6px 8px; }\n.tbl.grid thead th { position: sticky; top: 0; z-index: 2; background: var(--memo); box-shadow: inset 0 -1px 0 var(--line); }\n.tbl.grid thead th:first-child, .tbl.grid tbody td:first-child { position: sticky; left: 0; box-shadow: inset -1px 0 0 var(--line); }\n.tbl.grid thead th:first-child { z-index: 4; box-shadow: inset -1px 0 0 var(--line), inset 0 -1px 0 var(--line); }\n.tbl.grid tbody td:first-child { z-index: 1; background: var(--card); min-width: 0; font-weight: 600; }\n.tbl.grid tfoot td.flab { position: sticky; left: 0; z-index: 1; }\n.act.xl { color: var(--accent); border-color: var(--accent); }\n.act[disabled] { opacity: .6; cursor: default; }\n\n/* Visible passwords */\n.secret .slabel { flex: 1 1 10em; min-width: 0; overflow-wrap: anywhere; }\n.pwval {\n  font: 500 15px/1.3 var(--f-mono); letter-spacing: .02em; color: var(--ink);\n  background: var(--chip); border-radius: 6px; padding: 4px 8px;\n  user-select: all; -webkit-user-select: all; overflow-wrap: anywhere;\n}\n.secret .copy { margin-left: 0; padding: 7px 10px; }\n\n/* Reorder mode */\n.add.solid { background: var(--accent); color: var(--accent-ink); border-style: solid; }\n.add[disabled] { opacity: .6; cursor: default; }\n.orow {\n  display: flex; align-items: center; gap: 10px; min-width: 0;\n  background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px;\n}\n.orow.imp { border-color: var(--s-check); }\n.onum { flex: none; width: 1.6em; text-align: right; font: 500 13px/1 var(--f-mono); color: var(--muted); font-variant-numeric: tabular-nums; }\n.otext { flex: 1 1 auto; min-width: 0; display: grid; gap: 2px; }\n.otitle { font-size: 15px; font-weight: 600; line-height: 1.4; overflow-wrap: anywhere; }\n.obtns { flex: none; display: inline-flex; gap: 4px; }\n.obtns .act { font-size: 16px; min-width: 40px; min-height: 40px; padding: 0; color: var(--ink); }\n.act[disabled] { opacity: .3; cursor: default; }\n\n/* Download links */\n.links { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }\n.links li { display: grid; gap: 3px; }\n.links a {\n  display: flex; align-items: center; justify-content: space-between; gap: 10px;\n  padding: 11px 12px; border: 1.5px solid var(--accent); border-radius: 10px;\n  color: var(--accent); background: var(--card); font-weight: 600; font-size: 15px; text-decoration: none;\n}\n.links a:hover { background: var(--memo); }\n.links a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n.lnote { font-size: 13px; color: var(--muted); padding-left: 2px; overflow-wrap: anywhere; }\n\n/* Floating input button + light new-entry form */\n.fab {\n  position: fixed; z-index: 15;\n  right: calc(16px + env(safe-area-inset-right, 0px));\n  bottom: calc(20px + env(safe-area-inset-bottom, 0px));\n  font: 600 16px/1 var(--f-body); color: var(--accent-ink); background: var(--accent);\n  border: 0; border-radius: 999px; padding: 15px 20px; cursor: pointer;\n  box-shadow: 0 6px 18px rgba(0, 0, 0, .22);\n}\n.fab:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }\nmain .wrap { padding-bottom: 88px; }\n.more { border: 1px dashed var(--line); border-radius: 10px; }\n.more > summary { cursor: pointer; padding: 10px 12px; font-size: 14px; font-weight: 600; color: var(--accent); }\n.more-body { display: grid; gap: 12px; padding: 4px 12px 12px; }\n\n/* Table editing in place */\n.lhead { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }\n.tedit td { padding: 4px; }\n.tedit td:first-child { min-width: 0; }\n.tedit input {\n  width: 100%; min-width: 6.5em; box-sizing: border-box;\n  font: 400 15px/1.3 var(--f-body); color: var(--ink); background: var(--paper);\n  border: 1px solid var(--line); border-radius: 6px; padding: 7px 8px;\n}\n.tedit input:focus { outline: 2px solid var(--accent); outline-offset: 0; border-color: var(--accent); }\n.tedit .act.del { min-width: 34px; min-height: 34px; padding: 0; font-size: 16px; }\n\n/* List of titles (board) */\n.board { background: var(--card); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }\n.row {\n  display: grid; gap: 5px; width: 100%; box-sizing: border-box; min-width: 0;\n  text-align: left; font: inherit; color: inherit; background: transparent;\n  border: 0; border-top: 1px solid var(--line); padding: 13px 16px; cursor: pointer;\n}\n.row > * { min-width: 0; }\n.board > .row:first-child { border-top: 0; }\n.row:hover { background: var(--memo); }\n.row:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }\n.rtitle { font-size: 16px; font-weight: 600; line-height: 1.45; overflow-wrap: anywhere; text-wrap: pretty; }\n.rdev { font-size: 13px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.rsnip {\n  font-size: 13px; line-height: 1.5; background: var(--memo); border-radius: 6px; padding: 4px 8px;\n  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; overflow-wrap: anywhere;\n}\n.rgo { margin-left: auto; display: inline-flex; align-items: center; gap: 4px; }\n.rgo .go { width: 16px; height: 16px; color: var(--muted); }\n.clip { display: inline-flex; align-items: center; gap: 3px; font: 500 12px/1 var(--f-mono); color: var(--muted); font-variant-numeric: tabular-nums; }\n.clip svg { width: 14px; height: 14px; }\n\n/* One entry at a time */\n.backbar { display: flex; align-items: center; gap: 10px; }\n.back {\n  display: inline-flex; align-items: center; gap: 6px;\n  font: 600 14px/1.3 var(--f-body); color: var(--accent); background: var(--card);\n  border: 1px solid var(--line); border-radius: 8px; padding: 10px 14px; cursor: pointer;\n}\n.back svg { width: 16px; height: 16px; flex: none; }\n.back:hover { border-color: var(--accent); }\n.back:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n.back[disabled] { opacity: .45; cursor: default; border-color: var(--line); }\n.pos { margin-left: auto; font: 500 12px/1 var(--f-mono); color: var(--muted); font-variant-numeric: tabular-nums; }\n.article { background: var(--card); border: 1px solid var(--line); border-radius: 12px; min-width: 0; }\n.article.imp { border: 1.5px solid var(--s-check); }\n.ahead { padding: 16px 16px 14px; display: grid; gap: 8px; border-bottom: 1px dashed var(--line); }\n.article .symptom { font-size: 20px; line-height: 1.4; }\n.article .symptom:focus { outline: none; }\n.article .body { padding: 16px; }\n.article .body::before { content: none; }\n.pager { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }\n.pager .back { justify-content: center; text-align: center; }\n\n/* Attachments: view */\n.label small { font-weight: 400; letter-spacing: 0; }\n.files { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }\n.file {\n  display: flex; align-items: center; gap: 10px; min-width: 0;\n  padding: 10px 12px; border: 1px solid var(--line); border-radius: 10px; background: var(--card);\n}\n.ftype {\n  flex: none; min-width: 46px; box-sizing: border-box; text-align: center;\n  font: 500 11px/1 var(--f-mono); letter-spacing: .04em; color: var(--card); background: var(--ft, var(--muted));\n  border-radius: 5px; padding: 7px 6px;\n}\n.fname { flex: 1 1 auto; min-width: 0; display: grid; gap: 3px; }\n.fname b { font-size: 14px; font-weight: 600; overflow-wrap: anywhere; }\n.fname small { font-size: 12px; color: var(--muted); }\n.shot { margin: 0; display: grid; gap: 6px; }\n.shot img { display: block; max-width: 100%; height: auto; border: 1px solid var(--line); border-radius: 8px; background: var(--memo); }\n.shot figcaption { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--muted); min-width: 0; }\n.shot figcaption span { flex: 1 1 auto; min-width: 0; overflow-wrap: anywhere; }\n.get {\n  flex: none; font: 600 13px/1 var(--f-body); color: var(--accent); background: transparent;\n  border: 1px solid var(--accent); border-radius: 8px; padding: 9px 12px; cursor: pointer;\n}\n.get:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n.get[disabled] { opacity: .6; cursor: default; }\n\n/* Attachments: editor */\n.drop {\n  display: grid; gap: 10px; padding: 12px; min-width: 0;\n  border: 1.5px dashed var(--line); border-radius: 10px; background: var(--paper);\n}\n.drop:focus-visible, .drop.over { outline: none; border-color: var(--accent); background: var(--memo); }\n.dbtns { display: flex; align-items: center; gap: 8px 12px; flex-wrap: wrap; }\n.dhint { font-size: 13px; color: var(--muted); }\n.dhint b { color: var(--ink); font-weight: 600; }\n.atts { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }\n.atts:empty { display: none; }\n.att {\n  display: flex; align-items: center; gap: 10px; min-width: 0;\n  padding: 6px 6px 6px 8px; background: var(--card); border: 1px solid var(--line); border-radius: 8px;\n}\n.att img { flex: none; width: 52px; height: 38px; object-fit: cover; border-radius: 4px; background: var(--memo); }\n.att.err { border-color: var(--s-check); }\n.att.err .ast { color: var(--s-check); }\n.att .act.del { flex: none; min-width: 36px; min-height: 36px; padding: 0; font-size: 16px; }\n\n/* 비고 칸 바로 고치기 */\n.nbar { display: flex; align-items: center; gap: 6px 10px; flex-wrap: wrap; font-size: 13px; color: var(--muted); }\n.nbar b { color: var(--ink); font-weight: 600; }\n.nbar:empty { display: none; }\n.nbar .add { padding: 8px 12px; }\n.tbl td.notecell, .tbl.grid td.notecell { padding: 3px 4px; }\n.note-in {\n  width: 11em; box-sizing: border-box; margin: 0;\n  font: 400 13px/1.3 var(--f-body); color: var(--ink);\n  background: transparent; border: 1px dashed var(--line); border-radius: 6px; padding: 5px 7px;\n}\n.note-in::placeholder { color: var(--muted); opacity: .6; }\n.note-in:hover { border-color: var(--muted); }\n.note-in:focus { outline: none; border: 1.5px solid var(--accent); background: var(--card); }\n.note-in.dirty { border: 1.5px solid var(--s-temp); background: var(--mark); }\n@media (pointer: coarse) { .note-in { font-size: 16px; } }\n\n/* 전자칠판 표: 엑셀처럼 칸마다 선 */\n.tbl.grid td, .tbl.grid th { border-top: 0; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }\n.tbl.grid td.lastlog { max-width: 18em; }\n/* 긴 표(충전함·계정·연락처 등)도 엑셀처럼: 맨 윗줄·맨 왼쪽 열 고정, 칸마다 선 */\n.tbl.sheet { max-height: min(70vh, calc(100dvh - 170px)); overflow: auto; overscroll-behavior: contain; }\n.tbl.sheet table { border-collapse: separate; border-spacing: 0; }\n.tbl.sheet th, .tbl.sheet td { border-top: 0; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }\n.tbl.sheet th:last-child, .tbl.sheet td:last-child { border-right: 0; }\n.tbl.sheet thead th { position: sticky; top: 0; z-index: 2; background: var(--memo); }\n.tbl.sheet thead th:first-child, .tbl.sheet tbody td:first-child { position: sticky; left: 0; }\n.tbl.sheet thead th:first-child { z-index: 4; }\n.tbl.sheet tbody td:first-child { z-index: 1; background: var(--card); }\n/* 표 고치기: 칸 크기는 내용에 맞추고, 맨 윗줄·맨 왼쪽 열 고정 */\n.tbl.editing table { width: max-content; min-width: 0; }\n.tbl.editing { max-height: min(75vh, calc(100dvh - 140px)); }\n.tbl.editing td { padding: 0; background: var(--card); }\n.tbl.editing td input, .tbl.editing td:first-child input {\n  display: block; box-sizing: border-box; min-width: 0; margin: 0;\n  font: 400 13px/1.3 var(--f-body); color: var(--ink);\n  background: transparent; border: 0; border-radius: 0; padding: 6px 6px;\n}\n.tbl.editing td:first-child input { font-weight: 600; }\n.tbl.editing td input:focus { outline: 2px solid var(--accent); outline-offset: -2px; background: var(--card); }\n.tbl.editing td:last-child { border-right: 0; }\n.tbl.editing .act.del { min-width: 28px; min-height: 28px; margin: 2px; font-size: 14px; }\n@media (pointer: coarse) { .tbl.editing td input, .tbl.editing td:first-child input { font-size: 16px; } }\n\n/* 기종별 통계 */\n.stats { display: grid; gap: 6px; min-width: 0; }\n.stbl td.num, .stbl th.num { text-align: right; }\n.stbl td.num { font: 500 14px/1.2 var(--f-mono); font-variant-numeric: tabular-nums; }\n.stbl td:first-child { min-width: 0; }\n.stbl th, .stbl td { white-space: nowrap; overflow-wrap: normal; }\n.stbl tfoot td { font-weight: 600; }\n.stbl tfoot td.num { color: var(--ink); }\n.upg { font: 600 13px/1.2 var(--f-body); color: var(--ink); background: var(--card); border: 1px dashed var(--line); border-radius: 6px; padding: 4px 6px; }\n.upg:focus { outline: 2px solid var(--accent); outline-offset: 1px; }\n.upg.dirty { border: 1.5px solid var(--s-temp); background: var(--mark); }\n.upv { font-weight: 600; color: var(--muted); }\n.upv.yes { color: var(--s-done); }\n.sline { margin: 0; font-size: 13px; color: var(--muted); }\n\n/* 교실 이름·최근 기록 링크 */\n.roomlink {\n  font: inherit; font-weight: 600; color: var(--accent); background: none; border: 0; padding: 0; margin: 0; cursor: pointer;\n  text-align: left; text-decoration: underline; text-decoration-color: var(--line); text-underline-offset: 3px;\n}\n.roomlink:hover { text-decoration-color: var(--accent); }\n.roomlink:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 2px; }\n.roomlink.sub { display: flex; align-items: center; gap: 6px; width: 100%; font-weight: 400; color: var(--ink); text-decoration: none; min-width: 0; }\n.roomlink.sub .lt { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.roomlink .ld { font: 500 12px/1 var(--f-mono); color: var(--muted); font-variant-numeric: tabular-nums; }\n.tbl.grid tbody tr.band td, .tbl.grid tbody tr.band td:first-child,\n.tbl.sheet tbody tr.band td, .tbl.sheet tbody tr.band td:first-child { background: var(--chip); }\n.tbl.grid tbody tr.fstart td, .tbl.sheet tbody tr.fstart td { border-top: 2px solid var(--muted); }\n.tbl.grid tbody tr.sel td:first-child, .tbl.sheet tbody tr.sel td:first-child { box-shadow: inset 4px 0 0 var(--accent); }\n\n/* 오류·A/S 기록 */\n.kind { flex: none; font-size: 11px; font-weight: 600; line-height: 1.4; color: var(--kc); border: 1px solid currentColor; border-radius: 4px; padding: 0 6px; white-space: nowrap; }\n.logs { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }\n.log { display: flex; align-items: center; gap: 6px 8px; flex-wrap: wrap; padding: 8px 10px; background: var(--memo); border-radius: 8px; font-size: 14px; }\n.log .ld, .logrow .ld { font: 500 12px/1.4 var(--f-mono); color: var(--muted); font-variant-numeric: tabular-nums; }\n.log .lt { flex: 1 1 12em; min-width: 0; overflow-wrap: anywhere; }\n.log .act.del, .log .confirm { margin-left: auto; }\n.log .act.del { min-width: 30px; min-height: 30px; padding: 0; font-size: 15px; }\n.logrow {\n  width: 100%; box-sizing: border-box; display: flex; align-items: center; gap: 8px; min-width: 0;\n  font: inherit; font-size: 14px; color: var(--ink); text-align: left;\n  background: var(--memo); border: 0; border-radius: 8px; padding: 8px 10px; cursor: pointer;\n}\n.logrow:hover { background: var(--chip); }\n.logrow:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }\n.logrow .rn { flex: none; font-weight: 600; }\n.logrow .lt { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n\n/* 교실 관리 칸 */\n.room {\n  display: grid; gap: 12px; min-width: 0; padding: 14px;\n  background: var(--card); border: 1.5px solid var(--accent); border-radius: 12px; scroll-margin-top: 130px;\n}\n.rhead { display: flex; align-items: center; gap: 8px; }\n.rname { margin: 0; font-family: var(--f-display); font-size: 26px; line-height: 1.1; }\n.rname small { margin-left: 8px; font-family: var(--f-body); font-size: 13px; font-weight: 600; color: var(--muted); }\n.rhead .racts { margin-left: auto; display: inline-flex; gap: 6px; }\n.redit { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 8px; min-width: 0; }\n.redit .rf { display: grid; gap: 3px; min-width: 0; }\n.redit .rf.wide, .redit .ed-err, .redit .ed-acts { grid-column: 1 / -1; }\n.redit .rf span { font-size: 11px; font-weight: 600; letter-spacing: .04em; color: var(--muted); }\n.redit input {\n  width: 100%; box-sizing: border-box; min-width: 0; font: 600 15px/1.3 var(--f-body); color: var(--ink);\n  background: var(--paper); border: 1px solid var(--line); border-radius: 6px; padding: 7px 8px;\n}\n.redit input:focus { outline: 2px solid var(--accent); outline-offset: 0; border-color: var(--accent); }\n@media (pointer: coarse) { .redit input { font-size: 16px; } }\n.rinfo { margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 6px; }\n.rinfo div { min-width: 0; padding: 6px 8px; background: var(--memo); border-radius: 6px; }\n.rinfo dt { font-size: 11px; font-weight: 600; letter-spacing: .04em; color: var(--muted); }\n.rinfo dd { margin: 0; font-size: 14px; font-weight: 600; overflow-wrap: anywhere; }\n.logform { display: grid; gap: 8px; min-width: 0; }\n.logform .lrow { display: flex; flex-wrap: wrap; gap: 8px; }\n.logform input, .logform select {\n  box-sizing: border-box; min-width: 0; font: 400 16px/1.4 var(--f-body); color: var(--ink);\n  background: var(--paper); border: 1px solid var(--line); border-radius: 8px; padding: 9px 10px;\n}\n.logform .lrow input { flex: 1 1 10em; }\n.logform .lrow select { flex: 1 1 7em; }\n.logform input:focus, .logform select:focus { outline: 2px solid var(--accent); outline-offset: 0; border-color: var(--accent); }\n.logform .btn { justify-self: start; }\n\n\n@media print {\n  .top, .bar, footer, .fab, #toast, .backbar, .pager,\n  .acts, .tacts, .nbar, .ed-acts, .print,\n  .roomlink, .copy, .chev, button { display: none !important; }\n  main, .wrap, .article, .body, .sec { padding: 0 !important; margin: 0 !important; }\n  .article { border: none !important; box-shadow: none !important; }\n  body { background: #fff !important; }\n}\n";
  var APP_TEXT = "\n(function () {\n  // 이 페이지는 스스로를 다시 게시해서 수정·삭제를 저장한다. 원본 구조는 아래 HEAD + style#css + div#root + script#data + script#app.\n  var SKELETON = '<!doctype html><html><head><meta charset=utf8><meta name=viewport content=\"width=device-width,initial-scale=1,viewport-fit=cover\"><style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>';\n  var HEAD = '<title>디지털튜터 문제해결 매뉴얼</title>\\n' +\n    '<meta name=\"claude:viewport-fit-sides\" content=\"cover\">\\n' +\n    '<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\\n' +\n    '<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\\n' +\n    '<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Do+Hyeon&family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap\">\\n';\n\n  var CATS = [\n    { key: \"all\", label: \"전체\" },\n    { key: \"board\", label: \"전자칠판\" },\n    { key: \"special\", label: \"특수교실\" },\n    { key: \"laptop\", label: \"노트북\" },\n    { key: \"cabinet\", label: \"충전함\" },\n    { key: \"account\", label: \"계정·로그인\" },\n    { key: \"windows\", label: \"윈도우\" },\n    { key: \"etc\", label: \"기타\" }\n  ];\n  var CAT_LABEL = {}; CATS.forEach(function (c) { CAT_LABEL[c.key] = c.label; });\n  var STATUS = { done: \"해결\", temp: \"임시조치\", check: \"확인 필요\", routine: \"정기 점검\", info: \"안내\" };\n  var NEW = \"__new__\";\n\n  var SEARCH_SVG = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m20 20-4-4\"/></svg>';\n  var LOCK = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"/></svg>';\n  var CHEV = '<svg class=\"chev\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m6 9 6 6 6-6\"/></svg>';\n\n  var SHELL =\n    '<header class=\"top\"><div class=\"wrap\">' +\n      '<p class=\"eyebrow\">전주기전여자고등학교 · 디지털튜터</p>' +\n      '<h1>문제해결 매뉴얼</h1>' +\n    '</div></header>' +\n    '<div class=\"bar\"><div class=\"wrap\">' +\n      '<label class=\"search\" for=\"q\">' + SEARCH_SVG +\n        '<input id=\"q\" type=\"search\" enterkeyhint=\"search\" autocomplete=\"off\" placeholder=\"증상·기기·문구 검색 (예: 아하, 미러링)\" aria-label=\"매뉴얼 검색\">' +\n        '<button id=\"clear\" type=\"button\" aria-label=\"검색어 지우기\" hidden>×</button>' +\n      '</label>' +\n      '<div class=\"chips\" id=\"chips\" role=\"group\" aria-label=\"분류\"></div>' +\n    '</div></div>' +\n    '<main><div class=\"wrap\" id=\"list\"></div></main>' +\n    '<footer><div class=\"wrap\">' +\n      '<p id=\"stats\"></p>' +\n    '</div></footer>' +\n    '<button type=\"button\" id=\"fab\" class=\"fab\" hidden>+ 입력</button>' +\n    '<div id=\"toast\" role=\"status\" hidden></div>';\n\n  document.getElementById(\"root\").innerHTML = SHELL;\n\n  var STORE_KEY = \"dtm-entries\";\n  var ENTRIES = null;\n  try { ENTRIES = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { ENTRIES = null; }\n  if (!ENTRIES) { try { ENTRIES = JSON.parse(document.getElementById(\"data\").textContent) || []; } catch (e) { ENTRIES = []; } }\n\n  var listEl = document.getElementById(\"list\");\n  var chipsEl = document.getElementById(\"chips\");\n  var qEl = document.getElementById(\"q\");\n  var clearEl = document.getElementById(\"clear\");\n  var statsEl = document.getElementById(\"stats\");\n  var toastEl = document.getElementById(\"toast\");\n  var fabEl = document.getElementById(\"fab\");\n\n  var state = { cat: \"all\", q: \"\", canWrite: true, canDownload: true, editing: null, draft: null, confirmDel: null, saving: false,\n    openId: null, listY: 0, att: null, upl: {}, notes: {}, upg: {}, room: null, roomEdit: false, logDel: null, tableKeys: null };\n  var DL = {\n    save: function (o) {\n      try {\n        var url = URL.createObjectURL(o.data);\n        var a = document.createElement(\"a\");\n        a.href = url; a.download = o.filename;\n        document.body.appendChild(a); a.click(); a.remove();\n        setTimeout(function () { URL.revokeObjectURL(url); }, 2000);\n        return Promise.resolve();\n      } catch (e) { return Promise.reject(e); }\n    }\n  };\n  var ASSETS = true;\n\n  // 주소 끝 #분류 또는 #글아이디 로 바로 열기\n  try {\n    var h = (location.hash || \"\").replace(\"#\", \"\");\n    if (CAT_LABEL[h]) state.cat = h;\n    else if (h && findEntry(h)) state.openId = h;\n  } catch (e) {}\n\n  /* ---------- helpers ---------- */\n  function esc(s) {\n    return String(s == null ? \"\" : s).replace(/[&<>\"']/g, function (c) {\n      return { \"&\": \"&amp;\", \"<\": \"&lt;\", \">\": \"&gt;\", '\"': \"&quot;\", \"'\": \"&#39;\" }[c];\n    });\n  }\n  function terms() { return state.q.trim().toLowerCase().split(/\\s+/).filter(Boolean); }\n  // 한글·영문으로 따로 적힌 말도 같이 찾기 (예: 아하 ↔ AHA)\n  var ALIASES = {\n    \"아하\": [\"aha\"], \"aha\": [\"아하\"], \"안드로이드\": [\"android\"], \"android\": [\"안드로이드\"],\n    \"크롬\": [\"chrome\"], \"chrome\": [\"크롬\"], \"업그레이드\": [\"업데이트\"], \"업데이트\": [\"업그레이드\"],\n    \"탐투스\": [\"tamtus\"], \"tamtus\": [\"탐투스\"], \"패들렛\": [\"padlet\"], \"padlet\": [\"패들렛\"],\n    \"와이파이\": [\"wifi\", \"wi-fi\"], \"wifi\": [\"와이파이\"], \"비트라커\": [\"bitlocker\"], \"bitlocker\": [\"비트라커\"],\n    \"인튠\": [\"intune\"], \"intune\": [\"인튠\"], \"나이스\": [\"neis\"], \"neis\": [\"나이스\"],\n    \"앱코\": [\"abko\"], \"abko\": [\"앱코\"], \"패드뱅크\": [\"padbank\"], \"padbank\": [\"패드뱅크\"],\n    \"윈도우\": [\"windows\"], \"windows\": [\"윈도우\"], \"엘지\": [\"lg\"], \"lg\": [\"엘지\"], \"그램\": [\"gram\"],\n    \"충전기함\": [\"충전함\"], \"충전함\": [\"충전기함\"], \"비번\": [\"비밀번호\"], \"비밀번호\": [\"비번\"],\n    \"에이에스\": [\"a/s\"], \"as\": [\"a/s\"], \"프린트\": [\"프린터\"], \"프린터\": [\"프린트\"]\n  };\n  function expand(t) { return [t].concat(ALIASES[t] || []); }\n  function hl(raw, ts) {\n    raw = String(raw == null ? \"\" : raw);\n    if (!ts.length) return esc(raw);\n    var all = [];\n    ts.forEach(function (t) { all = all.concat(expand(t)); });\n    var re = new RegExp(\"(\" + all.map(function (t) { return t.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\"); }).join(\"|\") + \")\", \"gi\");\n    var out = \"\", last = 0, m;\n    while ((m = re.exec(raw)) !== null) {\n      if (m[0] === \"\") { re.lastIndex++; continue; }\n      out += esc(raw.slice(last, m.index)) + \"<mark>\" + esc(m[0]) + \"</mark>\";\n      last = m.index + m[0].length;\n    }\n    return out + esc(raw.slice(last));\n  }\n  function rich(raw, ts) {\n    return String(raw == null ? \"\" : raw).split(\"`\").map(function (part, i) {\n      var h = hl(part, ts);\n      return i % 2 ? \"<code>\" + h + \"</code>\" : h;\n    }).join(\"\");\n  }\n  function hay(e) {\n    return [CAT_LABEL[e.cat], STATUS[e.status], e.symptom, e.device, (e.prep || []).join(\" \"),\n      (e.steps || []).join(\" \"), (e.memo || []).join(\" \"),\n      (e.secrets || []).map(function (s) { return s.label + \" \" + (s.value || \"\"); }).join(\" \"),\n      (e.keywords || []).join(\" \"),\n      (e.attachments || []).map(function (a) { return a.name; }).join(\" \"),\n      (e.links || []).map(function (l) { return l.label + \" \" + (l.note || \"\"); }).join(\" \"),\n      e.important ? \"중요\" : \"\",\n      e.contact ? [e.contact.who, e.contact.num, e.contact.ext].join(\" \") : \"\",\n      e.codes ? e.codes.map(function (c) { return c.join(\" \"); }).join(\" \") : \"\",\n      e.table ? [(e.table.cols || []).join(\" \")].concat((e.table.rows || []).map(function (r) { return r.join(\" \"); })).join(\" \") : \"\",\n      e.table && e.table.logs ? logsText(e) : \"\",\n      e.checked].join(\" \").toLowerCase();\n  }\n  function matches(e, ts) {\n    var hs = hay(e);\n    return ts.every(function (t) { return expand(t).some(function (x) { return hs.indexOf(x) !== -1; }); });\n  }\n  function findEntry(id) {\n    for (var i = 0; i < ENTRIES.length; i++) if (ENTRIES[i].id === id) return ENTRIES[i];\n    return null;\n  }\n  function today() {\n    var d = new Date();\n    function p(n) { return (n < 10 ? \"0\" : \"\") + n; }\n    return d.getFullYear() + \"-\" + p(d.getMonth() + 1) + \"-\" + p(d.getDate());\n  }\n  function lines(s) { return String(s || \"\").split(/\\r?\\n/).map(function (x) { return x.trim(); }).filter(Boolean); }\n  function copyObj(o) { var r = {}; for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) r[k] = o[k]; return r; }\n\n  var toastTimer = null;\n  function toast(msg, sticky) {\n    toastEl.textContent = msg;\n    toastEl.hidden = false;\n    clearTimeout(toastTimer);\n    if (!sticky) toastTimer = setTimeout(function () { toastEl.hidden = true; }, 3200);\n  }\n\n  /* ---------- table totals (by company) + Excel export ---------- */\n  function company(v) {\n    var s = String(v == null ? \"\" : v).trim();\n    var l = s.toLowerCase();\n    if (!s) return \"미확인\";\n    if (l.indexOf(\"탐투스\") > -1 || l.indexOf(\"tamtus\") > -1) return \"탐투스\";\n    if (l.indexOf(\"이지보드\") > -1 || l.indexOf(\"ej board\") > -1 || l.indexOf(\"ejboard\") > -1) return \"이지보드\";\n    if (l.indexOf(\"이지\") > -1 || l.indexOf(\"ej\") > -1 || l.indexOf(\"easy\") > -1) return \"이지칠판\";\n    if (l.indexOf(\"아하\") > -1 || l.indexOf(\"aha\") > -1) return \"아하\";\n    return s;\n  }\n  function version(v) {\n    var s = String(v == null ? \"\" : v).trim();\n    if (!s) return \"미확인\";\n    if (s === \"없음\" || /^x$/i.test(s)) return \"안드로이드 없음\";\n    var m = s.match(/(\\d+)/);\n    if (/윈도우|windows/i.test(s)) return m ? \"윈도우 \" + m[1] : \"윈도우 (버전 미확인)\";\n    if (/^\\s*\\d/.test(s) || /안드로이드|android/i.test(s)) return m ? \"안드로이드 \" + m[1] : s;\n    return s;\n  }\n  function countBy(rows, keyOf) {\n    var m = {}, order = [];\n    rows.forEach(function (r) {\n      var c = keyOf(r);\n      if (!Object.prototype.hasOwnProperty.call(m, c)) { m[c] = 0; order.push(c); }\n      m[c]++;\n    });\n    order.sort(function (a, b) {\n      var ua = a === \"미확인\" ? 1 : 0, ub = b === \"미확인\" ? 1 : 0;\n      return ua - ub || m[b] - m[a];\n    });\n    return order.map(function (c) { return [c, m[c]]; });\n  }\n  function boardTotals(t) {\n    var cols = t.cols || [];\n    var kc = cols.indexOf(\"전자칠판\"), kv = cols.indexOf(\"안드로이드 버전\");\n    if (kv < 0) kv = cols.indexOf(\"안드로이드\");\n    var kw = cols.indexOf(\"윈도우\");\n    if (kc < 0) return null;\n    var all = t.rows || [];\n    var rows = all.filter(function (r) { return String(r[kc] || \"\").trim() !== \"없음\"; });\n    var companies = countBy(rows, function (r) { return company(r[kc]); }).map(function (p) {\n      var sub = rows.filter(function (r) { return company(r[kc]) === p[0]; });\n      var versions = kv > -1 ? countBy(sub, function (r) { return version(r[kv]); }).map(function (q) {\n        return [q[0] === \"미확인\" ? \"버전 미확인\" : q[0], q[1]];\n      }) : [];\n      return { name: p[0] === \"미확인\" ? \"기종 미확인\" : p[0], n: p[1], versions: versions };\n    });\n    var wins = [];\n    if (kw > -1) {\n      var wrows = rows.filter(function (r) { var w = String(r[kw] || \"\").trim(); return w && w !== \"없음\"; });\n      wins = countBy(wrows, function (r) { var w = String(r[kw]).trim(), n = w.match(/(\\d+)/); return n ? \"윈도우 \" + n[1] : w; });\n    }\n    return { companies: companies, wins: wins, total: rows.length, none: all.length - rows.length, withVersion: kv > -1 };\n  }\n  function totalsFoot(t, ncol, grid) {\n    var tot = boardTotals(t);\n    if (!tot) return \"\";\n    var lead = grid ? '<td class=\"flab\">' : \"<td>\";\n    var span = ncol > 1 ? ' colspan=\"' + (ncol - 1) + '\"' : \"\";\n    var label = tot.withVersion ? \"회사·버전별 소계\" : \"회사별 소계\";\n    var html = \"\";\n    tot.companies.forEach(function (c, i) {\n      html += '<tr class=\"co' + (i === 0 ? \" first\" : \"\") + '\">' + lead + (i === 0 ? label : \"\") + \"</td><td\" + span + \">\" +\n        '<span class=\"sub-name\">' + esc(c.name) + '</span><span class=\"sub-n\">' + c.n + \"대</span></td></tr>\";\n      c.versions.forEach(function (v) {\n        html += '<tr class=\"ver\">' + lead + '</td><td' + span + '><span class=\"ver-name\">' + esc(v[0]) + '</span><span class=\"sub-n\">' + v[1] + \"대</span></td></tr>\";\n      });\n    });\n    tot.wins.forEach(function (w, i) {\n      html += '<tr class=\"co' + (i === 0 ? \" first\" : \"\") + '\">' + lead + (i === 0 ? \"윈도우별\" : \"\") + \"</td><td\" + span + '><span class=\"sub-name\">' + esc(w[0]) + '</span><span class=\"sub-n\">' + w[1] + \"대</span></td></tr>\";\n    });\n    if (tot.none) html += '<tr class=\"co' + '\">' + lead + '</td><td' + span + '><span class=\"sub-name\">칠판 없는 교실</span><span class=\"sub-n\">' + tot.none + \"곳</span></td></tr>\";\n    return \"<tfoot>\" + html +\n      '<tr class=\"total\">' + lead + '전체</td><td' + span + '><span class=\"sub-name\">합계</span><span class=\"sub-n\">' + tot.total + \"대</span></td></tr>\" +\n      \"</tfoot>\";\n  }\n  var xlsxLoading = null;\n  function loadXlsx() {\n    if (window.XLSX) return Promise.resolve(window.XLSX);\n    if (xlsxLoading) return xlsxLoading;\n    xlsxLoading = new Promise(function (resolve, reject) {\n      var s = document.createElement(\"script\");\n      s.src = \"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js\";\n      s.onload = function () { if (window.XLSX) resolve(window.XLSX); else { xlsxLoading = null; reject(new Error(\"xlsx\")); } };\n      s.onerror = function () { xlsxLoading = null; reject(new Error(\"xlsx\")); };\n      document.head.appendChild(s);\n    });\n    return xlsxLoading;\n  }\n  function today8() { var d = new Date(); return d.getFullYear() + \"-\" + (\"0\" + (d.getMonth() + 1)).slice(-2) + \"-\" + (\"0\" + d.getDate()).slice(-2); }\n  // 엑셀 받기: 지금 표(저장 전 고친 비고·업그레이드 포함)로 만든다. 전자칠판 표는 원래 엑셀과 같은 모양.\n  function exportTable(e) {\n    var t = (state.tableEdit === e.id && state.tableDraft) ? (function () { var x = pendingTable(e); x.rows = state.tableDraft.map(function (r) { return r.slice(); }); return x; })() : pendingTable(e);\n    var cols = t.cols || [];\n    var board = isBoard(t);\n    var aoa = [], merges = [], widthUpTo = 0;\n    function str(v) { return v == null ? \"\" : String(v); }\n    if (board) {\n      var rows = (t.rows || []).filter(function (r) { return r.some(function (c) { return str(c).trim(); }); });\n      aoa.push([\"기전여고 전자칠판 현황\"]);\n      merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: cols.length } });\n      aoa.push([\"받은 날 \" + today8()]);\n      aoa.push([\"No.\"].concat(cols));\n      rows.forEach(function (r, i) { aoa.push([i + 1].concat(cols.map(function (_, j) { return str(r[j]); }))); });\n      aoa.push([\"계\", \"\", rows.length]);\n      merges.push({ s: { r: aoa.length - 1, c: 0 }, e: { r: aoa.length - 1, c: 1 } });\n      var st = boardStats(t, rows);\n      var sc = cols.length + 2;\n      var put = function (ri, arr) {\n        while (aoa.length <= ri) aoa.push([]);\n        var row = aoa[ri];\n        while (row.length < sc) row.push(\"\");\n        arr.forEach(function (v, k) { row[sc + k] = v; });\n      };\n      put(3, [\"회사\", \"안드로이드\", \"OPS\", \"대수\", \"업그레이드 가능\"]);\n      st.groups.forEach(function (x, k) { put(4 + k, [x.co, x.and, x.ops, x.n, upLabel((t.upgrade || {})[upKey(x.co, x.and)] || \"\")]); });\n      put(4 + st.groups.length, [\"계\", \"\", \"\", st.total, \"\"]);\n      var line = statsLine(st);\n      if (line) put(6 + st.groups.length, [line]);\n      widthUpTo = aoa.length;\n      var memo = (e.memo || []).filter(function (m) { return str(m).trim(); });\n      if (memo.length) {\n        aoa.push([]);\n        aoa.push([\"메모\"]);\n        memo.forEach(function (m, k) { aoa.push([k + 1, m]); });\n      }\n    } else {\n      if (cols.length) aoa.push(cols.slice());\n      (t.rows || []).forEach(function (r) { aoa.push(r.map(str)); });\n      widthUpTo = aoa.length;\n    }\n    return loadXlsx().then(function (X) {\n      var ws = X.utils.aoa_to_sheet(aoa);\n      var widths = [];\n      aoa.slice(board ? 2 : 0, widthUpTo).forEach(function (r) {\n        r.forEach(function (c, j) { var w = textEm(c) * 2 + 2; if (!widths[j] || w > widths[j]) widths[j] = Math.min(w, 40); });\n      });\n      ws[\"!cols\"] = widths.map(function (w) { return { wch: Math.max(w || 6, 6) }; });\n      if (merges.length) ws[\"!merges\"] = merges;\n      var wb = X.utils.book_new();\n      var sheet = String(t.title || \"목록\").replace(/[\\[\\]:*?\\/\\\\]/g, \" \").slice(0, 31) || \"목록\";\n      X.utils.book_append_sheet(wb, ws, sheet);\n      if (board || t.rooms) {\n        var logs = allLogs({ table: t });\n        if (logs.length) {\n          var la = [[\"날짜\", \"교실\", \"구분\", \"내용\"]].concat(logs.map(function (l) { return [l.d, l.room, l.k, l.t]; }));\n          var lw = X.utils.aoa_to_sheet(la);\n          lw[\"!cols\"] = [{ wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 60 }];\n          X.utils.book_append_sheet(wb, lw, board ? \"교실별 기록\" : \"반별 기록\");\n        }\n      }\n      var buf = X.write(wb, { bookType: \"xlsx\", type: \"array\" });\n      var base = board ? \"기전여고 전자칠판 현황\" : String(t.title || \"목록\").replace(/[\\\\\\/:*?\"<>|]/g, \" \").trim();\n      return DL.save({ filename: base + \"_\" + today8() + \".xlsx\", data: new Blob([buf]) });\n    });\n  }\n\n  /* ---------- read view ---------- */\n  function codeGrid(codes, ts) {\n    var years = {};\n    codes.forEach(function (c) { var y = String(c[0]).charAt(0); (years[y] = years[y] || []).push(c); });\n    return '<div class=\"sec\"><p class=\"label\">반별 비밀번호</p><div class=\"pwgrid\">' +\n      Object.keys(years).sort().map(function (y) {\n        return '<div class=\"pwcol\"><span class=\"pwyear\">' + esc(y) + \"학년</span>\" +\n          years[y].map(function (c) {\n            return '<div class=\"pw\"><span class=\"cls\">' + hl(c[0], ts) + '</span><span class=\"code\">' + hl(c[1], ts) + \"</span></div>\";\n          }).join(\"\") + \"</div>\";\n      }).join(\"\") + \"</div></div>\";\n  }\n\n  function linksHTML(links, ts) {\n    var ok = (links || []).filter(function (l) { return l && /^https?:\\/\\//i.test(l.url || \"\"); });\n    if (!ok.length) return \"\";\n    return '<div class=\"sec\"><p class=\"label\">다운로드·링크</p><ul class=\"links\">' + ok.map(function (l) {\n      return '<li><a href=\"' + esc(l.url) + '\" target=\"_blank\" rel=\"noopener noreferrer\"><span>' + rich(l.label || l.url, ts) + '</span><span aria-hidden=\"true\">↗</span></a>' +\n        (l.note ? '<span class=\"lnote\">' + rich(l.note, ts) + \"</span>\" : \"\") + \"</li>\";\n    }).join(\"\") + \"</ul></div>\";\n  }\n\n  /* ---------- attachments (files and pictures stored with this page) ---------- */\n  var CLIP = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m21 11-8.6 8.6a5 5 0 0 1-7-7l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9\"/></svg>';\n  var BACK = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15 18l-6-6 6-6\"/></svg>';\n  var GO = '<svg class=\"go\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m9 18 6-6-6-6\"/></svg>';\n  var IMG_TYPE = /^image\\/(png|jpeg|gif|webp)$/i;\n  // 바로 받을 수 있는 확장자. 나머지(한글 hwp 등)는 zip으로 묶어서 받는다.\n  var DL_EXT = { gif: 1, png: 1, jpg: 1, jpeg: 1, webp: 1, mp4: 1, webm: 1, txt: 1, json: 1, md: 1, docx: 1, pptx: 1, epub: 1, csv: 1, svg: 1, pdf: 1, xlsx: 1, zip: 1 };\n  var MB = 1048576;\n  var seq = 0;\n  function extOf(name) { var m = String(name || \"\").match(/\\.([A-Za-z0-9]{1,8})$/); return m ? m[1].toLowerCase() : \"\"; }\n  function baseOf(name) { return String(name || \"파일\").replace(/\\.[A-Za-z0-9]{1,8}$/, \"\") || \"파일\"; }\n  function fmtSize(n) {\n    n = +n || 0;\n    if (n < 1024) return n + \" B\";\n    if (n < MB) return Math.max(1, Math.round(n / 1024)) + \" KB\";\n    return (n / MB).toFixed(n < 10 * MB ? 1 : 0) + \" MB\";\n  }\n  function ftColor(name) {\n    var x = extOf(name);\n    if (/^(xlsx|xls|xlsm|csv)$/.test(x)) return \"var(--s-done)\";\n    if (/^(hwp|hwpx|docx|doc)$/.test(x)) return \"var(--c-laptop)\";\n    if (x === \"pdf\") return \"var(--s-check)\";\n    if (/^(pptx|ppt)$/.test(x)) return \"var(--c-cabinet)\";\n    if (/^(zip|7z|egg|alz)$/.test(x)) return \"var(--c-account)\";\n    return \"var(--muted)\";\n  }\n  function ftLabel(name) { var x = extOf(name); return x ? x.toUpperCase() : \"FILE\"; }\n  function stamp() {\n    var d = new Date();\n    function p(n) { return (n < 10 ? \"0\" : \"\") + n; }\n    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + \"_\" + p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds());\n  }\n  function attCount(e) { return (e.attachments || []).length + (e.image && e.image.src ? 1 : 0); }\n  function getBtn(e, a) {\n    if (!state.canDownload) return \"\";\n    return '<button type=\"button\" class=\"get\" data-act=\"get\" data-eid=\"' + esc(e.id) + '\" data-aid=\"' + esc(a.id) + '\">받기</button>';\n  }\n  function attachHTML(e, ts) {\n    var list = (e.attachments || []).filter(function (a) { return a && a.id; });\n    if (!list.length) return \"\";\n    var imgs = list.filter(function (a) { return a.kind === \"image\"; });\n    var files = list.filter(function (a) { return a.kind !== \"image\"; });\n    var html = '<div class=\"sec\"><p class=\"label\">첨부 파일 · 사진 ' + list.length + \"</p>\";\n    if (files.length) {\n      html += '<ul class=\"files\">' + files.map(function (a) {\n        var zip = !DL_EXT[extOf(a.name)];\n        return '<li class=\"file\"><span class=\"ftype\" style=\"--ft: ' + ftColor(a.name) + '\">' + esc(ftLabel(a.name)) + \"</span>\" +\n          '<span class=\"fname\"><b>' + hl(a.name, ts) + \"</b><small>\" + fmtSize(a.size) +\n          (zip && state.canDownload ? \" · zip\" : \"\") + \"</small></span>\" +\n          getBtn(e, a) + \"</li>\";\n      }).join(\"\") + \"</ul>\";\n    }\n    html += imgs.map(function (a) {\n      return '<figure class=\"shot\"><img src=\"data:' + esc(a.type || \"image/png\") + ';base64,' + a.data + '\" alt=\"' + esc(a.name) + '\" loading=\"lazy\">' +\n        \"<figcaption><span>\" + hl(a.name, ts) + \" · \" + fmtSize(a.size) + \"</span>\" + getBtn(e, a) + \"</figcaption></figure>\";\n    }).join(\"\");\n    return html + \"</div>\";\n  }\n\n  var zipLoading = null;\n  function loadZip() {\n    if (window.JSZip) return Promise.resolve(window.JSZip);\n    if (zipLoading) return zipLoading;\n    zipLoading = new Promise(function (resolve, reject) {\n      var s = document.createElement(\"script\");\n      s.src = \"https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js\";\n      s.onload = function () { if (window.JSZip) resolve(window.JSZip); else { zipLoading = null; reject(new Error(\"zip\")); } };\n      s.onerror = function () { zipLoading = null; reject(new Error(\"zip\")); };\n      document.head.appendChild(s);\n    });\n    return zipLoading;\n  }\n  function b64Blob(s, type) {\n    var bin = atob(String(s).replace(/\\s+/g, \"\"));\n    var u = new Uint8Array(bin.length);\n    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);\n    return new Blob([u], type ? { type: type } : undefined);\n  }\n  // 첨부는 글자(base64)로 바꿔 글 안에 함께 저장한다. 받을 때 원래 파일로 되돌린다.\n  function fileBlob(a) {\n    if (!a.data) return Promise.reject({ code: \"missing\" });\n    return Promise.resolve(b64Blob(a.data, a.type));\n  }\n  function saveAttachment(a) {\n    return fileBlob(a).then(function (blob) {\n      if (DL_EXT[extOf(a.name)]) return DL.save({ filename: a.name, data: blob });\n      return loadZip().then(function (Z) {\n        var z = new Z();\n        z.file(a.name, blob);\n        return z.generateAsync({ type: \"blob\" });\n      }).then(function (zb) { return DL.save({ filename: baseOf(a.name) + \".zip\", data: zb }); });\n    });\n  }\n  function toB64(f) {\n    return new Promise(function (resolve, reject) {\n      var r = new FileReader();\n      r.onload = function () { var s = String(r.result || \"\"); resolve(s.slice(s.indexOf(\",\") + 1)); };\n      r.onerror = function () { reject({ code: \"read_error\" }); };\n      r.readAsDataURL(f);\n    });\n  }\n  function upErr(code) {\n    if (code === \"too_large\") return \"파일이 너무 커서 올리지 못했어요.\";\n    if (code === \"quota_or_state\") return \"저장 공간이 꽉 차서 올리지 못했어요.\";\n    if (code === \"unsupported_type\") return \"이 형식은 올릴 수 없어요.\";\n    if (code === \"rate_limited\") return \"너무 빨리 올렸어요. 잠시 뒤 다시 올려 주세요.\";\n    if (code === \"read_error\") return \"파일을 읽지 못했어요.\";\n    if (code === \"not_granted\" || code === \"capability_disabled\" || code === \"capability_removed\") return \"이 화면에서는 파일을 올릴 수 없어요.\";\n    return \"올리지 못했어요. 빼고 다시 올려 주세요.\";\n  }\n  // 이번 입력 중에 올렸다가 뺀 파일만 지운다. 저장된 적 있는 파일은 예전 버전에서 쓰이므로 남겨 둔다.\n  function dropAsset(id) {\n    if (!id || !state.upl[id]) return;\n    delete state.upl[id];\n  }\n  function uploadOne(f, pasted) {\n    var type = String(f.type || \"\").toLowerCase();\n    var img = IMG_TYPE.test(type);\n    var name = f.name || \"\";\n    if (img && (!name || (pasted && /^image\\.\\w+$/i.test(name)))) name = \"캡처_\" + stamp() + \".\" + (type === \"image/jpeg\" ? \"jpg\" : type.split(\"/\")[1]);\n    if (!name) name = \"파일_\" + stamp();\n    var it = { key: \"k\" + (++seq), name: name, size: f.size || 0, type: type, kind: img ? \"image\" : \"file\", st: \"up\" };\n    if (img) { try { it.preview = URL.createObjectURL(f); } catch (e) {} }\n    if (!f.size) { it.st = \"err\"; it.msg = \"빈 파일이라 올릴 수 없어요.\"; }\n    else if (f.size > (img ? 20 : 15) * MB) { it.st = \"err\"; it.msg = (img ? \"20\" : \"15\") + \"MB보다 큰 파일은 올릴 수 없어요.\"; }\n    state.att.push(it);\n    drawAtt();\n    if (it.st === \"err\") return;\n    var job;\n    try { job = toB64(f); } catch (e) { job = Promise.reject(e); }\n    job.then(function (b64) {\n      it.id = \"a\" + Date.now().toString(36) + (++seq);\n      it.data = b64; it.st = \"ok\";\n      state.upl[it.id] = true;\n    }, function (err) {\n      it.st = \"err\"; it.msg = upErr(err && err.code);\n    }).then(drawAtt);\n  }\n  function addFiles(list, pasted) {\n    if (!state.editing || !state.att) return;\n    if (!ASSETS) { toast(\"이 화면에서는 파일을 올릴 수 없어요. 페이지를 새로 불러온 뒤 다시 해 보세요.\"); return; }\n    Array.prototype.forEach.call(list || [], function (f) { uploadOne(f, pasted); });\n  }\n  function attEditList() {\n    return (state.att || []).map(function (a) {\n      var thumb = a.kind === \"image\"\n        ? '<img src=\"' + esc(a.preview || (\"data:\" + (a.type || \"image/png\") + \";base64,\" + a.data)) + '\" alt=\"\">'\n        : '<span class=\"ftype\" style=\"--ft: ' + ftColor(a.name) + '\">' + esc(ftLabel(a.name)) + \"</span>\";\n      var st = a.st === \"up\" ? \"올리는 중…\" : a.st === \"err\" ? a.msg : fmtSize(a.size);\n      return '<li class=\"att' + (a.st === \"err\" ? \" err\" : \"\") + '\">' + thumb +\n        '<span class=\"fname\"><b>' + esc(a.name) + '</b><small class=\"ast\">' + esc(st) + \"</small></span>\" +\n        '<button type=\"button\" class=\"act del\" data-act=\"att-del\" data-key=\"' + esc(a.key) + '\" aria-label=\"' + esc(a.name) + ' 빼기\">×</button></li>';\n    }).join(\"\");\n  }\n  function drawAtt() {\n    var box = document.getElementById(\"f-atts\");\n    if (box) box.innerHTML = attEditList();\n  }\n  function startAtt(e) {\n    state.att = ((e && e.attachments) || []).map(function (a) {\n      var c = copyObj(a); c.key = \"k\" + (++seq); c.st = \"ok\"; return c;\n    });\n    state.upl = {};\n  }\n  function endAtt(discard) {\n    if (discard) Object.keys(state.upl).forEach(dropAsset);\n    (state.att || []).forEach(function (a) { if (a.preview) { try { URL.revokeObjectURL(a.preview); } catch (e) {} } });\n    state.att = null;\n    state.upl = {};\n  }\n\n  function tableCols(e) {\n    var t = e.table || {};\n    var n = (t.cols || []).length;\n    (state.tableEdit === e.id && state.tableDraft ? state.tableDraft : (t.rows || [])).forEach(function (r) { if (r.length > n) n = r.length; });\n    return n;\n  }\n  /* ---------- 전자칠판 표: 통계(표와 연결) · 교실 관리(오류·A/S 기록) ---------- */\n  var LOG_KINDS = [\"오류\", \"A/S\", \"점검\", \"조치 완료\", \"기타\"];\n  var LOG_COLOR = { \"오류\": \"var(--s-check)\", \"A/S\": \"var(--s-temp)\", \"점검\": \"var(--s-info)\", \"조치 완료\": \"var(--s-done)\", \"기타\": \"var(--s-routine)\" };\n  function isBoard(t) { return !!t && (t.cols || []).indexOf(\"전자칠판\") > -1; }\n  function colOf(cols, re) { for (var k = 0; k < cols.length; k++) if (re.test(String(cols[k]))) return k; return -1; }\n  function boardCols(cols) {\n    return {\n      co: cols.indexOf(\"전자칠판\"),\n      and: colOf(cols, /^(안드로이드|android)/i),\n      ops: colOf(cols, /^ops$/i),\n      hdmi: colOf(cols, /^hdmi/i),\n      win: cols.indexOf(\"윈도우\"),\n      wire: colOf(cols, /^(유선\\/무선|유무선)$/)\n    };\n  }\n  function roomKind(name) { return /^\\d+-\\d+$/.test(String(name || \"\").trim()) ? \"일반교실\" : \"특수교실\"; }\n  function cellv(r, k) { return k > -1 && r && r[k] != null ? String(r[k]).trim() : \"\"; }\n  function verNum(v) { var m = String(v).match(/\\d+(\\.\\d+)?/); return m ? parseFloat(m[0]) : 1e9; }\n  function upKey(co, an) { return co + \"|\" + an; }\n  function upSaved(e, k) { var u = (e.table && e.table.upgrade) || {}; return u[k] || \"\"; }\n  function upVal(e, k) { var p = state.upg[e.id]; return p && Object.prototype.hasOwnProperty.call(p, k) ? p[k] : upSaved(e, k); }\n  function upCount(eid) { return Object.keys(state.upg[eid] || {}).length; }\n  function upLabel(v) { return v === \"가\" ? \"가능\" : v === \"부\" ? \"불가\" : \"\"; }\n  function boardStats(t, rows) {\n    var c = boardCols(t.cols || []);\n    var g = {}, keys = [];\n    rows.forEach(function (r) {\n      var co = cellv(r, c.co);\n      if (!co || co === \"없음\") return;\n      var an = cellv(r, c.and), op = cellv(r, c.ops), k = co + \"|\" + an + \"|\" + op;\n      if (!g[k]) { g[k] = { co: co, and: an, ops: op, n: 0 }; keys.push(k); }\n      g[k].n++;\n    });\n    var groups = keys.map(function (k) { return g[k]; }).sort(function (a, b) {\n      return a.co.localeCompare(b.co, \"ko\") || verNum(a.and) - verNum(b.and) || a.ops.localeCompare(b.ops);\n    });\n    var total = 0;\n    groups.forEach(function (x) { total += x.n; });\n    var wins = {}, wk = [];\n    if (c.win > -1) rows.forEach(function (r) {\n      var w = cellv(r, c.win);\n      if (!w || w === \"없음\" || /^x$/i.test(w)) return;\n      var m = w.match(/(\\d+)/), lab = m ? \"윈도우 \" + m[1] : w;\n      if (!wins[lab]) { wins[lab] = 0; wk.push(lab); }\n      wins[lab]++;\n    });\n    wk.sort(function (a, b) { return verNum(b) - verNum(a); });\n    var named = rows.filter(function (r) { return cellv(r, 0); });\n    var gen = named.filter(function (r) { return roomKind(cellv(r, 0)) === \"일반교실\"; }).length;\n    return {\n      groups: groups, total: total, gen: gen, spec: named.length - gen,\n      wins: wk.map(function (k) { return [k, wins[k]]; }),\n      hdmi: c.hdmi > -1 ? rows.filter(function (r) { var v = cellv(r, c.hdmi); return v && !/^(x|없음)$/i.test(v); }).length : -1,\n      wired: c.wire > -1 ? rows.filter(function (r) { return cellv(r, c.wire) === \"유선\"; }).map(function (r) { return cellv(r, 0); }) : []\n    };\n  }\n  function statsLine(st) {\n    var bits = [\"일반교실 \" + st.gen + \"곳\", \"특수교실 \" + st.spec + \"곳\"].concat(st.wins.map(function (w) { return w[0] + \" \" + w[1] + \"대\"; }));\n    if (st.hdmi > -1) bits.push(\"HDMI로 PC·노트북 연결 \" + st.hdmi + \"곳\");\n    if (st.wired.length) bits.push(\"유선 연결 \" + st.wired.join(\", \"));\n    return bits.join(\" · \");\n  }\n  function statsHTML(e, rows, live) {\n    var st = boardStats(e.table, rows);\n    var canUp = state.canWrite && !live && !state.reorder;\n    var body = st.groups.map(function (x) {\n      var k = upKey(x.co, x.and), v = upVal(e, k), dirty = v !== upSaved(e, k);\n      var cell = canUp\n        ? '<select class=\"upg' + (dirty ? \" dirty\" : \"\") + '\" data-eid=\"' + esc(e.id) + '\" data-key=\"' + esc(k) + '\" aria-label=\"' + esc(x.co + \" \" + x.and) + ' 업그레이드 가능\">' +\n            [[\"\", \"–\"], [\"가\", \"가능\"], [\"부\", \"불가\"]].map(function (o) {\n              return '<option value=\"' + o[0] + '\"' + (o[0] === v ? \" selected\" : \"\") + \">\" + o[1] + \"</option>\";\n            }).join(\"\") + \"</select>\"\n        : '<span class=\"upv' + (v === \"가\" ? \" yes\" : \"\") + '\">' + esc(upLabel(v) || \"–\") + \"</span>\";\n      return \"<tr><td>\" + esc(x.co) + \"</td><td>\" + esc(x.and || \"–\") + \"</td><td>\" + esc(x.ops || \"–\") + '</td><td class=\"num\">' + x.n + \"</td><td>\" + cell + \"</td></tr>\";\n    }).join(\"\");\n    var line = statsLine(st);\n    return '<div class=\"stats\" id=\"stats-' + esc(e.id) + '\">' +\n      '<p class=\"label\">기종별 통계</p>' +\n      '<div class=\"tbl\"><table class=\"stbl\"><thead><tr><th>회사</th><th>안드로이드</th><th>OPS</th><th class=\"num\">대수</th><th>업그레이드</th></tr></thead>' +\n      \"<tbody>\" + body + \"</tbody>\" +\n      '<tfoot><tr><td colspan=\"3\">계</td><td class=\"num\">' + st.total + \"</td><td></td></tr></tfoot></table></div>\" +\n      (line ? '<p class=\"sline\">' + esc(line) + \"</p>\" : \"\") +\n    \"</div>\";\n  }\n\n  // 표 고치기 칸 너비: 열 내용 길이에 맞추고 비고 열만 넓게 (엑셀처럼)\n  function textEm(s) {\n    s = String(s == null ? \"\" : s);\n    var w = 0;\n    for (var k = 0; k < s.length; k++) w += s.charCodeAt(k) > 0x2e7f ? 1 : 0.6;\n    return w;\n  }\n  function colWidths(cols, rows, n) {\n    var out = [];\n    for (var j = 0; j < n; j++) {\n      var w = Math.min(textEm(cols[j] || \"\"), 6);\n      rows.forEach(function (r) { var x = textEm(r[j]); if (x > w) w = x; });\n      var note = cols[j] === \"비고\";\n      out.push(Math.min(note ? 22 : (w > 14 ? 26 : 12), Math.max(note ? 14 : 2.6, w + 1.4)));\n    }\n    return out;\n  }\n  // 줄이 많고 칸이 짧은 표는 엑셀처럼(머리줄·첫 열 고정) 보여 준다\n  function isSheet(t) {\n    var rows = (t && t.rows) || [];\n    if (rows.length < 10) return false;\n    for (var a = 0; a < rows.length; a++) for (var b = 0; b < rows[a].length; b++) if (String(rows[a][b] == null ? \"\" : rows[a][b]).length > 60) return false;\n    return true;\n  }\n  // 층 열이 있으면 짝수 층은 회색 줄, 층이 바뀌는 줄은 굵은 선\n  function floorBands(cols, rows) {\n    var k = cols.indexOf(\"층\");\n    if (k < 0) return null;\n    var prev = null, gray = true;\n    return rows.map(function (r, i) {\n      var f = cellv(r, k), c = [];\n      if (i === 0 || f !== prev) { gray = !gray; if (i > 0) c.push(\"fstart\"); }\n      if (gray) c.push(\"band\");\n      prev = f;\n      return c.join(\" \");\n    });\n  }\n  function cloneLogs(L) {\n    var o = {};\n    Object.keys(L || {}).forEach(function (k) { o[k] = (L[k] || []).map(copyObj); });\n    return o;\n  }\n  function roomLogs(e, room) {\n    var L = ((e.table && e.table.logs) || {})[room] || [];\n    return L.map(function (l, i) { return { room: room, i: i, d: l.d || \"\", k: l.k || \"기타\", t: l.t || \"\" }; })\n      .sort(function (a, b) { return a.d < b.d ? 1 : a.d > b.d ? -1 : b.i - a.i; });\n  }\n  function allLogs(e) {\n    var L = (e.table && e.table.logs) || {}, out = [];\n    Object.keys(L).forEach(function (room) { out = out.concat(roomLogs(e, room)); });\n    return out.sort(function (a, b) { return a.d < b.d ? 1 : a.d > b.d ? -1 : 0; });\n  }\n  function logsText(e) {\n    return allLogs(e).map(function (l) { return l.room + \" \" + l.k + \" \" + l.t; }).join(\" \");\n  }\n  function kindBadge(k) { return '<span class=\"kind\" style=\"--kc: ' + (LOG_COLOR[k] || \"var(--s-routine)\") + '\">' + esc(k) + \"</span>\"; }\n  // 기종에 맞는 A/S 연락처를 ‘업체·A/S 연락처 모음’ 표에서 찾는다\n  function asContact(co) {\n    var key = company(co);\n    if (!key || key === \"미확인\") return null;\n    for (var a = 0; a < ENTRIES.length; a++) {\n      var t = ENTRIES[a].table;\n      if (!t || (t.cols || []).indexOf(\"번호\") < 0) continue;\n      var nk = t.cols.indexOf(\"번호\");\n      for (var b = 0; b < (t.rows || []).length; b++) {\n        var r = t.rows[b], who = String(r[0] || \"\");\n        if (/A\\/S/i.test(who) && who.indexOf(key) > -1 && r[nk]) return { who: who, num: String(r[nk]) };\n      }\n    }\n    return null;\n  }\n  function recentHTML(e) {\n    var L = allLogs(e).slice(0, 5);\n    if (!L.length) return \"\";\n    return '<div class=\"sec\"><p class=\"label\">최근 기록</p><ul class=\"logs\">' +\n      L.map(function (l) {\n        return '<li><button type=\"button\" class=\"logrow\" data-act=\"room\" data-name=\"' + esc(l.room) + '\">' +\n          '<span class=\"ld\">' + esc(l.d) + \"</span>\" + kindBadge(l.k) + '<span class=\"rn\">' + esc(l.room) + '</span><span class=\"lt\">' + esc(l.t) + \"</span></button></li>\";\n      }).join(\"\") + \"</ul></div>\";\n  }\n  function roomHTML(e) {\n    var t = e.table, name = state.room, cols = t.cols || [];\n    var board = isBoard(t);\n    var row = null, ri = -1;\n    (t.rows || []).forEach(function (r, i) { if (!row && cellv(r, 0) === name) { row = r; ri = i; } });\n    var nc = cols.indexOf(\"비고\");\n    var info;\n    if (!row) {\n      info = '<p class=\"none\">표에 없습니다.</p>';\n    } else if (state.roomEdit && state.canWrite) {\n      // 이 줄만 고치기: 같은 열에 있는 값은 목록에서 고를 수 있다\n      info = '<form class=\"redit\" id=\"roomform\" novalidate>' + cols.map(function (h, j) {\n        var v = cellv(row, j);\n        if (j === nc) { var nv0 = noteVal(e.id, ri); if (nv0 !== undefined) v = nv0; }\n        var opts = {};\n        if (board && j > 0 && j !== nc) (t.rows || []).forEach(function (r) { var x = cellv(r, j); if (x) opts[x] = 1; });\n        var keys = Object.keys(opts).sort();\n        var dl = keys.length ? '<datalist id=\"re-dl-' + j + '\">' + keys.map(function (o) { return '<option value=\"' + esc(o) + '\">'; }).join(\"\") + \"</datalist>\" : \"\";\n        return '<label class=\"rf' + (j === nc ? \" wide\" : \"\") + '\" for=\"re-' + j + '\"><span>' + esc(h) + \"</span>\" +\n          '<input type=\"text\" id=\"re-' + j + '\" value=\"' + esc(v) + '\" autocomplete=\"off\"' + (dl ? ' list=\"re-dl-' + j + '\"' : \"\") + \"></label>\" + dl;\n      }).join(\"\") +\n        '<p class=\"ed-err\" id=\"re-err\" hidden></p>' +\n        '<div class=\"ed-acts\"><button type=\"submit\" class=\"btn primary\"' + (state.saving ? \" disabled\" : \"\") + \">\" + (state.saving ? \"저장 중…\" : \"저장\") + \"</button>\" +\n          '<button type=\"button\" class=\"btn\" data-act=\"room-edit-cancel\">취소</button></div>' +\n      \"</form>\";\n    } else {\n      info = '<dl class=\"rinfo\">' + (board ? \"<div><dt>구분</dt><dd>\" + roomKind(name) + \"</dd></div>\" : \"\") + cols.map(function (h, j) {\n        if (j === 0) return \"\";\n        var v = cellv(row, j);\n        if (j === nc) { var nv = noteVal(e.id, ri); if (nv !== undefined) v = nv; }\n        return \"<div><dt>\" + esc(h) + \"</dt><dd>\" + esc(v || \"–\") + \"</dd></div>\";\n      }).join(\"\") + \"</dl>\";\n    }\n    var as = !row ? null : board ? asContact(cellv(row, boardCols(cols).co)) : (e.contact && e.contact.num ? { who: e.contact.who || \"연락처\", num: e.contact.num } : null);\n    var asHtml = as\n      ? '<div class=\"contact\"><span class=\"who\">' + esc(as.who) + '</span><span class=\"num\">' + esc(as.num) + \"</span>\" +\n          '<button type=\"button\" class=\"copy\" data-copy=\"' + esc(as.num) + '\">번호 복사</button></div>'\n      : \"\";\n    var logs = roomLogs(e, name);\n    var list = logs.length\n      ? '<ul class=\"logs\">' + logs.map(function (l) {\n          var del = \"\";\n          if (state.canWrite) {\n            del = state.logDel === name + \"|\" + l.i\n              ? '<span class=\"confirm\">삭제할까요?<button type=\"button\" class=\"act yes\" data-act=\"log-del-yes\" data-i=\"' + l.i + '\">삭제</button>' +\n                  '<button type=\"button\" class=\"act\" data-act=\"log-del-no\">취소</button></span>'\n              : '<button type=\"button\" class=\"act del\" data-act=\"log-del\" data-i=\"' + l.i + '\" aria-label=\"이 기록 삭제\">×</button>';\n          }\n          return '<li class=\"log\"><span class=\"ld\">' + esc(l.d) + \"</span>\" + kindBadge(l.k) + '<span class=\"lt\">' + esc(l.t) + \"</span>\" + del + \"</li>\";\n        }).join(\"\") + \"</ul>\"\n      : '<p class=\"none\">아직 기록이 없습니다.</p>';\n    var form = state.canWrite\n      ? '<form class=\"logform\" id=\"logform\" novalidate>' +\n          '<div class=\"lrow\"><input type=\"date\" id=\"lg-d\" value=\"' + esc(today()) + '\" aria-label=\"날짜\">' +\n            '<select id=\"lg-k\" aria-label=\"구분\">' + LOG_KINDS.map(function (k) { return \"<option>\" + esc(k) + \"</option>\"; }).join(\"\") + \"</select></div>\" +\n          '<input type=\"text\" id=\"lg-t\" autocomplete=\"off\" placeholder=\"' + (board ? \"예: 화면이 안 켜짐 → A/S 접수\" : \"예: 3번 칸 충전 안 됨 → 케이블 교체\") + '\" aria-label=\"기록 내용\">' +\n          '<p class=\"ed-err\" id=\"lg-err\" hidden></p>' +\n          '<button type=\"submit\" class=\"btn primary\"' + (state.saving ? \" disabled\" : \"\") + \">\" + (state.saving ? \"저장 중…\" : \"기록 남기기\") + \"</button>\" +\n        \"</form>\"\n      : \"\";\n    return '<div class=\"room\" id=\"room-panel\">' +\n      '<div class=\"rhead\"><p class=\"rname\">' + esc(name) + \"<small>\" + esc(board ? \"교실 관리\" : (typeof t.rooms === \"string\" ? t.rooms : \"관리\")) + '</small></p><span class=\"racts\">' +\n        (row && state.canWrite && !state.roomEdit ? '<button type=\"button\" class=\"act\" data-act=\"room-edit\">정보 고치기</button>' : \"\") +\n        '<button type=\"button\" class=\"act\" data-act=\"room-close\">닫기</button></span></div>' +\n      info + asHtml +\n      '<div class=\"sec\"><p class=\"label\">오류·A/S 기록 ' + logs.length + \"건</p>\" + list + \"</div>\" + form +\n    \"</div>\";\n  }\n  // 저장하지 않은 비고·업그레이드 변경을 반영한 표 사본\n  function pendingTable(e) {\n    var t = copyObj(e.table || {});\n    var nc = (t.cols || []).indexOf(\"비고\");\n    t.rows = (t.rows || []).map(function (r, ri) {\n      var c = r.slice(), nv = noteVal(e.id, ri);\n      if (nv !== undefined && nc > -1) { while (c.length <= nc) c.push(\"\"); c[nc] = nv.trim(); }\n      return c;\n    });\n    var pu = state.upg[e.id];\n    if (pu) {\n      t.upgrade = copyObj(t.upgrade || {});\n      Object.keys(pu).forEach(function (k) { if (pu[k]) t.upgrade[k] = pu[k]; else delete t.upgrade[k]; });\n    }\n    return t;\n  }\n  function saveTable(e, t, msg) {\n    var n = copyObj(e);\n    n.table = t;\n    persist(ENTRIES.map(function (x) { return x.id === e.id ? n : x; }), msg);\n  }\n\n  function tableHTML(e, ts) {\n    var t = e.table;\n    var cols = t.cols || [];\n    var title = esc(t.title || \"목록\");\n    var grid = isBoard(t);\n    var sheet = grid || isSheet(t);\n    var rooms = grid || !!t.rooms;\n    if (state.tableEdit === e.id && state.tableDraft) {\n      var n = tableCols(e);\n      var wds = colWidths(cols, state.tableDraft, n);\n      var ebands = floorBands(cols, state.tableDraft);\n      return '<div class=\"sec\"><div class=\"lhead\"><p class=\"label\">' + title + \" · 고치는 중</p></div>\" +\n        '<div class=\"tbl sheet editing' + (grid ? \" grid\" : \"\") + '\"><table class=\"tedit\">' +\n        (cols.length ? \"<thead><tr>\" + cols.map(function (c) { return \"<th>\" + esc(c) + \"</th>\"; }).join(\"\") + \"<th></th></tr></thead>\" : \"\") +\n        \"<tbody>\" + state.tableDraft.map(function (r, i) {\n          var cells = \"\";\n          for (var j = 0; j < n; j++) {\n            cells += '<td><input type=\"text\" id=\"t-' + i + \"-\" + j + '\" value=\"' + esc(r[j] || \"\") + '\"' +\n              (wds ? ' style=\"width: ' + wds[j].toFixed(1) + 'em\"' : \"\") + ' autocomplete=\"off\" aria-label=\"' + esc(cols[j] || \"칸\") + '\"></td>';\n          }\n          return \"<tr\" + (ebands && ebands[i] ? ' class=\"' + ebands[i] + '\"' : \"\") + \">\" + cells + '<td><button type=\"button\" class=\"act del\" data-act=\"trow-del\" data-id=\"' + esc(e.id) + '\" data-row=\"' + i + '\" aria-label=\"이 줄 삭제\">×</button></td></tr>';\n        }).join(\"\") + \"</tbody></table></div>\" +\n        (grid ? statsHTML(e, state.tableDraft, true) : \"\") +\n        '<div class=\"ed-acts\">' +\n          '<button type=\"button\" class=\"add\" data-act=\"trow-add\" data-id=\"' + esc(e.id) + '\">+ 줄 추가</button>' +\n          '<button type=\"button\" class=\"btn primary\" data-act=\"tsave\" data-id=\"' + esc(e.id) + '\"' + (state.saving ? \" disabled\" : \"\") + \">\" + (state.saving ? \"저장 중…\" : \"표 저장\") + \"</button>\" +\n          '<button type=\"button\" class=\"btn\" data-act=\"tcancel\">취소</button>' +\n        \"</div></div>\";\n    }\n    var btn = state.canWrite && !state.reorder && !state.tableEdit\n      ? '<button type=\"button\" class=\"act\" data-act=\"tedit\" data-id=\"' + esc(e.id) + '\">표 고치기</button>' : \"\";\n    var xbtn = state.canDownload && !state.tableEdit\n      ? '<button type=\"button\" class=\"act xl\" data-act=\"xlsx\" data-id=\"' + esc(e.id) + '\">엑셀 받기</button>' : \"\";\n    // 비고 칸은 표 고치기 없이 바로 고친다 (여러 칸 고친 뒤 한 번에 저장)\n    var nc = cols.indexOf(\"비고\");\n    var noteOn = state.canWrite && !state.reorder && !state.tableEdit && nc > -1;\n    var barOn = state.canWrite && !state.reorder && !state.tableEdit && (nc > -1 || grid);\n    var nbar = barOn ? '<div class=\"nbar\" id=\"nbar-' + esc(e.id) + '\">' + nbarHTML(e) + \"</div>\" : \"\";\n    var head = cols.map(function (c) { return \"<th>\" + esc(c) + \"</th>\"; }).join(\"\") + (rooms ? \"<th>최근 기록</th>\" : \"\");\n    var bands = floorBands(cols, t.rows || []);\n    var body = (t.rows || []).map(function (r, i) {\n      var n = Math.max(r.length, noteOn ? nc + 1 : 0, rooms ? cols.length : 0);\n      var name = cellv(r, 0);\n      var cells = \"\";\n      for (var j = 0; j < n; j++) {\n        var c = r[j];\n        if (noteOn && j === nc) {\n          var dv = noteVal(e.id, i);\n          var v = dv === undefined ? (c == null ? \"\" : String(c)) : dv;\n          cells += '<td class=\"notecell\"><input type=\"text\" class=\"note-in' + (dv === undefined ? \"\" : \" dirty\") + '\"' +\n            ' id=\"n-' + esc(e.id) + \"-\" + i + '\" data-eid=\"' + esc(e.id) + '\" data-row=\"' + i + '\"' +\n            ' value=\"' + esc(v) + '\" placeholder=\"비고\" autocomplete=\"off\" enterkeyhint=\"next\"' +\n            ' aria-label=\"' + esc(name + \" 비고\") + '\"></td>';\n        } else if (rooms && j === 0) {\n          cells += '<td><button type=\"button\" class=\"roomlink\" data-act=\"room\" data-name=\"' + esc(name) + '\" title=\"' + esc(name) + ' 교실 관리\">' + rich(c, ts) + \"</button></td>\";\n        } else {\n          var wired = cols[j] === \"유선/무선\" && String(c || \"\").trim() === \"유선\";\n          cells += \"<td\" + (wired ? ' class=\"wired\"' : \"\") + \">\" + rich(c, ts) + \"</td>\";\n        }\n      }\n      if (rooms) {\n        var last = roomLogs(e, name)[0];\n        cells += '<td class=\"lastlog\">' + (last\n          ? '<button type=\"button\" class=\"roomlink sub\" data-act=\"room\" data-name=\"' + esc(name) + '\"><span class=\"ld\">' + esc(String(last.d).slice(5)) + \"</span>\" +\n              kindBadge(last.k) + '<span class=\"lt\">' + hl(last.t, ts) + \"</span></button>\"\n          : \"\") + \"</td>\";\n      }\n      var rc = ((bands && bands[i]) || \"\") + (rooms && state.room === name ? \" sel\" : \"\");\n      return \"<tr\" + (rc.trim() ? ' class=\"' + rc.trim() + '\"' : \"\") + \">\" + cells + \"</tr>\";\n    }).join(\"\");\n    return '<div class=\"sec\"><div class=\"lhead\"><p class=\"label\">' + title + \"</p>\" +\n      (btn || xbtn ? '<span class=\"tacts\">' + xbtn + btn + \"</span>\" : \"\") + \"</div>\" + nbar +\n      (rooms ? recentHTML(e) : \"\") +\n      '<div class=\"tbl' + (sheet ? \" sheet\" : \"\") + (grid ? \" grid\" : \"\") + '\"><table>' +\n      (cols.length ? \"<thead><tr>\" + head + \"</tr></thead>\" : \"\") +\n      \"<tbody>\" + body + \"</tbody></table></div>\" +\n      (grid ? statsHTML(e, t.rows || [], false) : \"\") +\n      (rooms && state.room ? roomHTML(e) : \"\") +\n    \"</div>\";\n  }\n  function noteVal(eid, i) {\n    var m = state.notes[eid];\n    return m && Object.prototype.hasOwnProperty.call(m, i) ? m[i] : undefined;\n  }\n  function noteCount(eid) { return Object.keys(state.notes[eid] || {}).length; }\n  function nbarHTML(e) {\n    var n = noteCount(e.id) + upCount(e.id);\n    if (!n) return \"\";\n    return \"<span><b>\" + n + \"곳</b>을 고쳤어요. 저장해야 반영됩니다.</span>\" +\n      '<button type=\"button\" class=\"add solid\" data-act=\"note-save\" data-id=\"' + esc(e.id) + '\"' + (state.saving ? \" disabled\" : \"\") + \">\" +\n        (state.saving ? \"저장 중…\" : \"저장\") + \"</button>\" +\n      '<button type=\"button\" class=\"add\" data-act=\"note-reset\" data-id=\"' + esc(e.id) + '\">되돌리기</button>';\n  }\n  function readTableDraft() {\n    if (!state.tableEdit || !state.tableDraft) return;\n    var e = findEntry(state.tableEdit);\n    if (!e) return;\n    var n = tableCols(e);\n    for (var i = 0; i < state.tableDraft.length; i++) {\n      for (var j = 0; j < n; j++) {\n        var el = document.getElementById(\"t-\" + i + \"-\" + j);\n        if (el && typeof el.value === \"string\") state.tableDraft[i][j] = el.value;\n      }\n    }\n  }\n\n  function acts(e) {\n    if (!state.canWrite || state.reorder) return \"\";\n    if (state.confirmDel === e.id) {\n      return '<span class=\"confirm\">삭제할까요?' +\n        '<button type=\"button\" class=\"act yes\" data-act=\"del-yes\" data-id=\"' + esc(e.id) + '\">삭제</button>' +\n        '<button type=\"button\" class=\"act\" data-act=\"del-no\">취소</button></span>';\n    }\n    return '<span class=\"acts\">' +\n      '<button type=\"button\" class=\"act\" data-act=\"edit\" data-id=\"' + esc(e.id) + '\">수정</button>' +\n      '<button type=\"button\" class=\"act del\" data-act=\"del\" data-id=\"' + esc(e.id) + '\">삭제</button></span>';\n  }\n\n  function badges(e) {\n    return (e.important ? '<span class=\"imp-badge\">중요</span>' : \"\") +\n      '<span class=\"cat\" style=\"--cc: var(--c-' + esc(e.cat) + ')\">' + esc(CAT_LABEL[e.cat] || \"기타\") + \"</span>\" +\n      '<span class=\"status\" style=\"--sc: var(--s-' + esc(e.status) + ')\">' + esc(STATUS[e.status] || \"해결\") + \"</span>\";\n  }\n  // 검색어가 제목이 아니라 본문에서 맞으면, 맞은 줄을 목록에 한 줄 보여 준다.\n  function snippet(e, ts) {\n    if (!ts.length) return \"\";\n    var head = (String(e.symptom || \"\") + \" \" + String(e.device || \"\")).toLowerCase();\n    var hit = function (s) { return ts.some(function (t) { return expand(t).some(function (x) { return s.indexOf(x) > -1; }); }); };\n    if (ts.every(function (t) { return expand(t).some(function (x) { return head.indexOf(x) > -1; }); })) return \"\";\n    var pool = [].concat(e.steps || [], e.memo || [], e.prep || [],\n      (e.attachments || []).map(function (a) { return \"첨부: \" + a.name; }),\n      (e.links || []).map(function (l) { return (l.label || \"\") + \" \" + (l.note || \"\"); }),\n      e.table ? (e.table.rows || []).map(function (r) { return r.filter(function (c) { return c; }).join(\" · \"); }) : [],\n      e.table && e.table.logs ? allLogs(e).map(function (l) { return \"기록 \" + l.d + \" \" + l.room + \" [\" + l.k + \"] \" + l.t; }) : [],\n      (e.secrets || []).map(function (s) { return s.label; }),\n      e.contact ? [(e.contact.who || \"\") + \" \" + (e.contact.num || \"\")] : []);\n    for (var i = 0; i < pool.length; i++) {\n      var s = String(pool[i] || \"\");\n      if (hit(s.toLowerCase())) return '<span class=\"rsnip\">' + rich(s, ts) + \"</span>\";\n    }\n    return \"\";\n  }\n  function rowHTML(e, ts) {\n    var n = attCount(e);\n    return '<button type=\"button\" class=\"row\" data-act=\"open\" data-id=\"' + esc(e.id) + '\">' +\n      '<span class=\"meta\">' + badges(e) +\n        (n ? '<span class=\"clip\" title=\"첨부 ' + n + '개\">' + CLIP + n + \"</span>\" : \"\") +\n        '<span class=\"rgo\"><span class=\"date\" title=\"확인일\">' + esc(e.checked) + \"</span>\" + GO + \"</span>\" +\n      \"</span>\" +\n      '<span class=\"rtitle\">' + rich(e.symptom, ts) + \"</span>\" +\n      (e.device ? '<span class=\"rdev\">' + rich(e.device, ts) + \"</span>\" : \"\") +\n      snippet(e, ts) +\n    \"</button>\";\n  }\n\n  function detailHTML(e, ts) {\n    var nav = visibleList(ts), i = nav.indexOf(e);\n    if (i < 0) { nav = ENTRIES; i = nav.indexOf(e); }\n    var prev = i > 0 ? nav[i - 1] : null;\n    var next = i > -1 && i < nav.length - 1 ? nav[i + 1] : null;\n    var navOn = !state.tableEdit;\n    var prep = (e.prep && e.prep.length)\n      ? '<div class=\"sec\"><p class=\"label\">준비물</p><ul class=\"prep\">' + e.prep.map(function (p) { return \"<li>\" + rich(p, ts) + \"</li>\"; }).join(\"\") + \"</ul></div>\"\n      : \"\";\n    var steps = (e.steps && e.steps.length) ? '<ol class=\"steps\">' + e.steps.map(function (s) { return \"<li><span>\" + rich(s, ts) + \"</span></li>\"; }).join(\"\") + \"</ol>\" : \"\";\n    if (e.keys && e.keys.length) {\n      steps += '<div class=\"keys\" aria-label=\"리모컨 볼륨 버튼 누르는 순서\"><span class=\"cap\">전원 버튼 쪽을 향해 리모컨 볼륨 버튼 순서대로</span>' +\n        e.keys.map(function (g) {\n          var caps = \"\";\n          for (var i = 0; i < g[1]; i++) caps += '<span class=\"key\">' + esc(g[0]) + \"</span>\";\n          return caps;\n        }).join('<span class=\"sep\" aria-hidden=\"true\"></span>') + \"</div>\";\n    }\n    steps = steps ? '<div class=\"sec\"><p class=\"label\">해결 순서</p>' + steps + \"</div>\" : \"\";\n    var memo = (e.memo && e.memo.length)\n      ? '<div class=\"sec\"><p class=\"label\">메모</p><ul class=\"memo\">' + e.memo.map(function (m) { return \"<li>\" + rich(m, ts) + \"</li>\"; }).join(\"\") + \"</ul></div>\"\n      : \"\";\n    var secret = e.secrets && e.secrets.length\n      ? '<div class=\"sec\"><p class=\"label\">보관 정보</p>' + e.secrets.map(function (s) {\n          return '<div class=\"secret\">' + LOCK + '<span class=\"slabel\">' + rich(s.label, ts) + \"</span>\" +\n            (s.value\n              ? '<span class=\"pwval\">' + hl(s.value, ts) + '</span><button type=\"button\" class=\"copy\" data-copy=\"' + esc(s.value) + '\">복사</button>'\n              : '<span class=\"tag\">별도 보관</span>') +\n            \"</div>\";\n        }).join(\"\") + \"</div>\"\n      : \"\";\n    var contact = e.contact && e.contact.num\n      ? '<div class=\"sec\"><p class=\"label\">연락처</p><div class=\"contact\">' +\n          '<span class=\"who\">' + rich(e.contact.who, ts) + \"</span>\" +\n          '<span class=\"num\">' + esc(e.contact.num) + \"</span>\" +\n          (e.contact.ext ? '<span class=\"ext\">' + rich(e.contact.ext, ts) + \"</span>\" : \"\") +\n          '<button type=\"button\" class=\"copy\" data-copy=\"' + esc(e.contact.num) + '\">번호 복사</button>' +\n        \"</div></div>\"\n      : \"\";\n    var image = e.image && e.image.src\n      ? '<div class=\"sec\"><p class=\"label\">' + esc(e.image.caption || \"첨부 사진\") + '</p><img class=\"sheet\" src=\"' + esc(e.image.src) + '\" alt=\"' + esc(e.image.caption || \"첨부 사진\") + '\" loading=\"lazy\"></div>'\n      : \"\";\n    var body = contact + prep + steps + attachHTML(e, ts) + linksHTML(e.links, ts) +\n      (e.codes && e.codes.length ? codeGrid(e.codes, ts) : \"\") +\n      (e.table && ((e.table.rows && e.table.rows.length) || state.tableEdit === e.id) ? tableHTML(e, ts) : \"\") +\n      image + memo + secret;\n    if (!body) body = '<p class=\"none\">적힌 내용이 없습니다.</p>';\n    var top = navOn\n      ? '<div class=\"backbar\"><button type=\"button\" class=\"back\" data-act=\"list\">' + BACK + \"목록</button>\" +\n          (i > -1 ? '<span class=\"pos\">' + (i + 1) + \" / \" + nav.length + \"</span>\" : \"\") + \"</div>\"\n      : \"\";\n    var art = '<article class=\"article' + (e.important ? \" imp\" : \"\") + '\" data-id=\"' + esc(e.id) + '\">' +\n      '<div class=\"ahead\">' +\n        '<div class=\"meta\">' + badges(e) +\n          '<span class=\"right\"><span class=\"date\" title=\"확인일\">' + esc(e.checked) + \"</span>\" +\n            '<button type=\"button\" class=\"act print\" data-act=\"print\">인쇄</button>' + acts(e) + \"</span>\" +\n        \"</div>\" +\n        '<h2 class=\"symptom\" tabindex=\"-1\">' + rich(e.symptom, ts) + \"</h2>\" +\n        (e.device ? '<p class=\"device\">' + rich(e.device, ts) + \"</p>\" : \"\") +\n      \"</div>\" +\n      '<div class=\"body\">' + body + \"</div>\" +\n    \"</article>\";\n    var pager = navOn\n      ? '<div class=\"pager\">' +\n          '<button type=\"button\" class=\"back\" data-act=\"go\"' + (prev ? ' data-id=\"' + esc(prev.id) + '\" title=\"' + esc(prev.symptom) + '\"' : \" disabled\") + \">‹ 이전 글</button>\" +\n          '<button type=\"button\" class=\"back\" data-act=\"list\">목록</button>' +\n          '<button type=\"button\" class=\"back\" data-act=\"go\"' + (next ? ' data-id=\"' + esc(next.id) + '\" title=\"' + esc(next.symptom) + '\"' : \" disabled\") + \">다음 글 ›</button>\" +\n        \"</div>\"\n      : \"\";\n    return top + art + pager;\n  }\n\n  /* ---------- editor ---------- */\n  function fromEntry(e) {\n    var c = e.contact || {};\n    return {\n      cat: e.cat || \"etc\", status: e.status || \"done\", imp: !!e.important,\n      symptom: e.symptom || \"\", device: e.device || \"\",\n      prep: (e.prep || []).join(\"\\n\"), steps: (e.steps || []).join(\"\\n\"), memo: (e.memo || []).join(\"\\n\"),\n      codes: (e.codes || []).map(function (x) { return x.join(\" \"); }).join(\"\\n\"),\n      table: e.table ? [(e.table.cols || []).join(\" | \")].concat((e.table.rows || []).map(function (r) { return r.join(\" | \"); })).join(\"\\n\") : \"\",\n      secrets: (e.secrets || []).map(function (s) { return s.value ? s.label + \" | \" + s.value : s.label; }).join(\"\\n\"),\n      links: (e.links || []).map(function (l) { return [l.label || \"\", l.url || \"\", l.note || \"\"].join(\" | \").replace(/( \\| )+$/, \"\"); }).join(\"\\n\"),\n      cname: c.who || \"\", cnum: c.num || \"\", cext: c.ext || \"\",\n      kw: (e.keywords || []).join(\", \"), checked: e.checked || today(), noimg: false\n    };\n  }\n  function blankEntry() {\n    return { id: NEW, cat: state.cat !== \"all\" ? state.cat : \"etc\", status: \"done\", symptom: \"\", steps: [], checked: today() };\n  }\n  function readForm() {\n    var f = document.getElementById(\"editor\");\n    if (!f) return null;\n    function v(id) { var el = document.getElementById(id); return el ? el.value : \"\"; }\n    function ck(id) { var el = document.getElementById(id); return el ? el.checked : false; }\n    return {\n      cat: v(\"f-cat\"), status: v(\"f-status\"), imp: ck(\"f-imp\"),\n      symptom: v(\"f-symptom\"), device: v(\"f-device\"),\n      prep: v(\"f-prep\"), steps: v(\"f-steps\"), memo: v(\"f-memo\"), codes: v(\"f-codes\"), table: v(\"f-table\"),\n      secrets: v(\"f-secrets\"), links: v(\"f-links\"), cname: v(\"f-cname\"), cnum: v(\"f-cnum\"), cext: v(\"f-cext\"),\n      kw: v(\"f-kw\"), checked: v(\"f-checked\"), noimg: ck(\"f-noimg\")\n    };\n  }\n  function opt(list, cur) {\n    return list.map(function (o) {\n      return '<option value=\"' + esc(o[0]) + '\"' + (o[0] === cur ? \" selected\" : \"\") + \">\" + esc(o[1]) + \"</option>\";\n    }).join(\"\");\n  }\n  function editorHTML(e) {\n    var d = state.draft || fromEntry(e);\n    var isNew = e.id === NEW;\n    var catOpts = CATS.filter(function (c) { return c.key !== \"all\"; }).map(function (c) { return [c.key, c.label]; });\n    var stOpts = Object.keys(STATUS).map(function (k) { return [k, STATUS[k]]; });\n    var hasCodes = !!(e.codes && e.codes.length);\n    var hasImg = !!(e.image && e.image.src);\n    var hasTable = !!e.table;\n    var basic =\n      '<div class=\"row2\">' +\n        '<label for=\"f-cat\">분류<select id=\"f-cat\">' + opt(catOpts, d.cat) + \"</select></label>\" +\n        '<label for=\"f-status\">상태<select id=\"f-status\">' + opt(stOpts, d.status) + \"</select></label>\" +\n      \"</div>\" +\n      '<label for=\"f-symptom\">제목 (증상)<input type=\"text\" id=\"f-symptom\" value=\"' + esc(d.symptom) + '\" placeholder=\"예: 3학년 2반 전자칠판 소리가 안 날 때\"></label>' +\n      '<label for=\"f-steps\">내용 · 해결 순서 <small>한 줄에 한 단계</small><textarea id=\"f-steps\" rows=\"7\">' + esc(d.steps) + \"</textarea></label>\" +\n      '<div class=\"sec\"><p class=\"label\">사진 · 파일 첨부</p>' +\n        (ASSETS\n          ? '<div class=\"drop\" id=\"f-drop\" tabindex=\"0\" aria-label=\"첨부 칸: 캡처한 그림을 붙여 넣거나 파일을 끌어다 놓으세요\">' +\n              '<div class=\"dbtns\"><button type=\"button\" class=\"add solid\" data-act=\"pick\">+ 파일 선택</button>' +\n                '<span class=\"dhint\">캡처 <b>Ctrl+V</b></span></div>' +\n              '<ul class=\"atts\" id=\"f-atts\">' + attEditList() + \"</ul>\" +\n              '<input type=\"file\" id=\"f-file\" multiple hidden>' +\n            \"</div>\"\n          : '<p class=\"none\">이 화면에서는 파일을 올릴 수 없어요. 페이지를 새로 불러온 뒤 다시 해 보세요.</p>' +\n            '<ul class=\"atts\" id=\"f-atts\">' + attEditList() + \"</ul>\") +\n      \"</div>\" +\n      '<label for=\"f-memo\">메모 <small>한 줄에 하나</small><textarea id=\"f-memo\" rows=\"3\">' + esc(d.memo) + \"</textarea></label>\";\n    var more =\n      '<label class=\"chk\" for=\"f-imp\"><input type=\"checkbox\" id=\"f-imp\"' + (d.imp ? \" checked\" : \"\") + \"> 중요 · 맨 위에 고정</label>\" +\n      '<label for=\"f-device\">기기·대상<input type=\"text\" id=\"f-device\" value=\"' + esc(d.device) + '\"></label>' +\n      '<label for=\"f-prep\">준비물 <small>한 줄에 하나</small><textarea id=\"f-prep\" rows=\"2\">' + esc(d.prep) + \"</textarea></label>\" +\n      '<label for=\"f-links\">다운로드·링크 <small>한 줄에 ‘이름 | 주소 | 설명’ · 주소는 https:// 로 시작</small><textarea id=\"f-links\" rows=\"2\">' + esc(d.links) + \"</textarea></label>\" +\n      (hasTable ? '<label for=\"f-table\">표 <small>첫 줄은 제목 줄, 칸은 | 로 구분</small><textarea id=\"f-table\" rows=\"10\">' + esc(d.table) + \"</textarea></label>\" : \"\") +\n      (hasCodes ? '<label for=\"f-codes\">반별 비밀번호 <small>한 줄에 ‘반 비밀번호’ (예: 101 1001)</small><textarea id=\"f-codes\" rows=\"9\">' + esc(d.codes) + \"</textarea></label>\" : \"\") +\n      '<label for=\"f-secrets\">보관 정보 <small>한 줄에 ‘이름 | 비밀번호’ · 비밀번호를 비우면 ‘별도 보관’</small><textarea id=\"f-secrets\" rows=\"2\">' + esc(d.secrets) + \"</textarea></label>\" +\n      '<div class=\"row3\">' +\n        '<label for=\"f-cname\">연락처 이름<input type=\"text\" id=\"f-cname\" value=\"' + esc(d.cname) + '\"></label>' +\n        '<label for=\"f-cnum\">전화번호<input type=\"text\" id=\"f-cnum\" inputmode=\"tel\" value=\"' + esc(d.cnum) + '\"></label>' +\n        '<label for=\"f-cext\">내선<input type=\"text\" id=\"f-cext\" value=\"' + esc(d.cext) + '\"></label>' +\n      \"</div>\" +\n      '<label for=\"f-kw\">검색어 <small>쉼표로 구분</small><input type=\"text\" id=\"f-kw\" value=\"' + esc(d.kw) + '\"></label>' +\n      '<label for=\"f-checked\">확인일<input type=\"date\" id=\"f-checked\" value=\"' + esc(d.checked) + '\"></label>' +\n      (hasImg ? '<label class=\"chk\" for=\"f-noimg\"><input type=\"checkbox\" id=\"f-noimg\"' + (d.noimg ? \" checked\" : \"\") + \"> 첨부 사진 빼기</label>\" : \"\");\n    return '<form class=\"editor\" id=\"editor\" data-id=\"' + esc(e.id) + '\" novalidate>' +\n      '<p class=\"ed-title\">' + (isNew ? \"새로 입력\" : \"항목 수정\") + \"</p>\" +\n      basic +\n      (isNew\n        ? '<details class=\"more\"><summary>기기·준비물·링크·연락처·비밀번호 더 넣기</summary><div class=\"more-body\">' + more + \"</div></details>\"\n        : more) +\n      '<p class=\"ed-err\" id=\"f-err\" hidden></p>' +\n      '<div class=\"ed-acts\">' +\n        '<button type=\"submit\" class=\"btn primary\"' + (state.saving ? \" disabled\" : \"\") + \">\" + (state.saving ? \"저장 중…\" : \"저장\") + \"</button>\" +\n        '<button type=\"button\" class=\"btn\" data-act=\"cancel\">취소</button>' +\n      \"</div>\" +\n    \"</form>\";\n  }\n  function parseCodes(text) {\n    return lines(text).map(function (l) { return l.split(/[\\s,\\t:]+/).filter(Boolean); })\n      .filter(function (p) { return p.length >= 2; })\n      .map(function (p) { return [p[0], p[1]]; });\n  }\n  function buildEntry(base, v) {\n    var n = copyObj(base);\n    if (n.id === NEW) n.id = \"e-\" + Date.now().toString(36);\n    n.cat = CAT_LABEL[v.cat] && v.cat !== \"all\" ? v.cat : \"etc\";\n    n.status = STATUS[v.status] ? v.status : \"done\";\n    if (v.imp) n.important = true; else delete n.important;\n    n.symptom = v.symptom.trim();\n    if (v.device.trim()) n.device = v.device.trim(); else delete n.device;\n    n.prep = lines(v.prep);\n    n.steps = lines(v.steps);\n    n.memo = lines(v.memo);\n    if (base.codes && base.codes.length) {\n      var codes = parseCodes(v.codes);\n      if (codes.length) n.codes = codes; else delete n.codes;\n    }\n    if (base.table) {\n      var tl = lines(v.table).map(function (l) { return l.split(\"|\").map(function (c) { return c.trim(); }); });\n      if (tl.length > 1) { n.table = copyObj(base.table); n.table.cols = tl[0]; n.table.rows = tl.slice(1); }\n      else if (tl.length === 1) { n.table = copyObj(base.table); n.table.cols = []; n.table.rows = tl; }\n      else delete n.table;\n    }\n    delete n.secret;\n    var secs = lines(v.secrets).map(function (l) {\n      var i = l.indexOf(\"|\");\n      return i < 0 ? { label: l, value: \"\" } : { label: l.slice(0, i).trim(), value: l.slice(i + 1).trim() };\n    }).filter(function (s) { return s.label || s.value; });\n    if (secs.length) n.secrets = secs; else delete n.secrets;\n    var lk = lines(v.links).map(function (l) {\n      var p = l.split(\"|\").map(function (x) { return x.trim(); });\n      var url = p.filter(function (x) { return /^https?:\\/\\//i.test(x); })[0] || \"\";\n      var rest = p.filter(function (x) { return x !== url; });\n      return { label: rest[0] || url, url: url, note: rest.slice(1).join(\" · \") };\n    }).filter(function (l) { return l.url; });\n    if (lk.length) n.links = lk; else delete n.links;\n    if (v.cnum.trim()) n.contact = { who: v.cname.trim(), num: v.cnum.trim(), ext: v.cext.trim() }; else delete n.contact;\n    var kw = v.kw.split(/[,，]/).map(function (x) { return x.trim(); }).filter(Boolean);\n    if (kw.length) n.keywords = kw; else delete n.keywords;\n    n.checked = /^\\d{4}-\\d{2}-\\d{2}$/.test(v.checked) ? v.checked : today();\n    if (v.noimg) delete n.image;\n    if (state.att) {\n      var att = state.att.filter(function (a) { return a.st === \"ok\" && a.id; }).map(function (a) {\n        return { id: a.id, name: a.name, size: a.size, type: a.type, kind: a.kind, data: a.data };\n      });\n      if (att.length) n.attachments = att; else delete n.attachments;\n    }\n    return n;\n  }\n\n  /* ---------- saving: regenerate the whole page and publish it ---------- */\n  function buildDoc(entries) {\n    var css = document.getElementById(\"css\").textContent;\n    var app = document.getElementById(\"app\").textContent;\n    var json = JSON.stringify(entries, null, 1).replace(/</g, \"\\\\u003c\");\n    return SKELETON + \"\\n\" + HEAD +\n      '<style id=\"css\">' + css + \"</style>\\n\" +\n      '<div id=\"root\"></div>\\n' +\n      '<script type=\"application/json\" id=\"data\">' + json + \"</scr\" + \"ipt>\\n\" +\n      '<script id=\"app\">' + app + \"</scr\" + \"ipt>\\n\" +\n      \"</body></html>\";\n  }\n  function persist(next, doneMsg, openAfter) {\n    if (state.saving) return;\n    state.saving = true;\n    try {\n      ENTRIES = next;\n      localStorage.setItem(STORE_KEY, JSON.stringify(ENTRIES));\n      state.openId = openAfter === undefined ? state.openId : openAfter;\n      state.editing = null; state.draft = null; state.confirmDel = null;\n      state.reorder = false; state.snapshot = null;\n      state.saving = false;\n      syncHash();\n      render();\n      toast(doneMsg);\n    } catch (e) {\n      state.saving = false;\n      toast(e && e.name === \"QuotaExceededError\" ? \"저장 공간이 꽉 차서 저장하지 못했습니다. 첨부 파일을 줄여 보세요.\" : \"저장하지 못했습니다. 잠시 후 다시 해 보세요.\");\n      render();\n    }\n  }\n\n  /* ---------- order ---------- */\n  function visibleList(ts) {\n    return ENTRIES.filter(function (e) { return matches(e, ts) && (state.cat === \"all\" || e.cat === state.cat); });\n  }\n  function orderRow(e, i, n) {\n    return '<div class=\"orow' + (e.important ? \" imp\" : \"\") + '\" data-id=\"' + esc(e.id) + '\">' +\n      '<span class=\"onum\">' + (i + 1) + \"</span>\" +\n      '<span class=\"otext\"><span class=\"cat\" style=\"--cc: var(--c-' + esc(e.cat) + ')\">' + esc(CAT_LABEL[e.cat] || \"기타\") + \"</span>\" +\n      '<span class=\"otitle\">' + esc(e.symptom) + \"</span></span>\" +\n      '<span class=\"obtns\">' +\n        '<button type=\"button\" class=\"act\" data-act=\"up\" data-id=\"' + esc(e.id) + '\" aria-label=\"위로\"' + (i === 0 ? \" disabled\" : \"\") + \">↑</button>\" +\n        '<button type=\"button\" class=\"act\" data-act=\"down\" data-id=\"' + esc(e.id) + '\" aria-label=\"아래로\"' + (i === n - 1 ? \" disabled\" : \"\") + \">↓</button>\" +\n      \"</span></div>\";\n  }\n  function moveEntry(id, dir) {\n    var vis = visibleList(terms());\n    var i = -1;\n    for (var k = 0; k < vis.length; k++) if (vis[k].id === id) i = k;\n    var j = i + dir;\n    if (i < 0 || j < 0 || j >= vis.length) return false;\n    var slots = vis.map(function (e) { return ENTRIES.indexOf(e); }).sort(function (a, b) { return a - b; });\n    var nv = vis.slice(); var t = nv[i]; nv[i] = nv[j]; nv[j] = t;\n    var next = ENTRIES.slice();\n    slots.forEach(function (s, k2) { next[s] = nv[k2]; });\n    ENTRIES = next;\n    return true;\n  }\n\n  /* ---------- render ---------- */\n  function render() {\n    if (state.editing && document.getElementById(\"editor\")) state.draft = readForm();\n    if (state.tableEdit) readTableDraft();\n    var ts = terms();\n    var hits = ENTRIES.filter(function (e) { return matches(e, ts); });\n    var counts = { all: hits.length };\n    CATS.forEach(function (c) { if (c.key !== \"all\") counts[c.key] = 0; });\n    hits.forEach(function (e) { counts[e.cat] = (counts[e.cat] || 0) + 1; });\n\n    chipsEl.innerHTML = CATS.map(function (c) {\n      return '<button type=\"button\" class=\"chip\" data-cat=\"' + c.key + '\" aria-pressed=\"' + (state.cat === c.key) + '\">' +\n        esc(c.label) + '<span class=\"n\">' + (counts[c.key] || 0) + \"</span></button>\";\n    }).join(\"\");\n\n    var editE = state.editing ? (state.editing === NEW ? blankEntry() : findEntry(state.editing)) : null;\n    if (state.editing && !editE) { state.editing = null; state.draft = null; endAtt(true); }\n    var openE = state.openId ? findEntry(state.openId) : null;\n    if (state.openId && !openE) state.openId = null;\n\n    if (editE) {\n      listEl.innerHTML = editorHTML(editE);\n    } else if (openE && !state.reorder) {\n      listEl.innerHTML = detailHTML(openE, ts);\n    } else {\n      listEl.innerHTML = listHTML(ts);\n    }\n    clearEl.hidden = !state.q;\n    fabEl.hidden = !(state.canWrite && !state.editing && !state.reorder && !state.tableEdit && !state.saving);\n  }\n\n  function listHTML(ts) {\n    var shown = visibleList(ts);\n\n    var line;\n    if (state.reorder) {\n      line = \"<b>순서 바꾸기</b> · ↑ ↓로 옮긴 뒤 ‘순서 저장’을 누르세요\";\n    } else if (ts.length) {\n      line = \"‘<b>\" + esc(state.q.trim()) + \"</b>’ 검색 결과 \" + shown.length + \"건\" +\n        (state.cat !== \"all\" ? \" · \" + esc(CAT_LABEL[state.cat]) : \"\");\n    } else {\n      line = (state.cat === \"all\" ? \"전체\" : esc(CAT_LABEL[state.cat])) + \" \" + shown.length + \"건\";\n    }\n    var tools = \"\";\n    if (state.canWrite && state.reorder) {\n      tools = '<button type=\"button\" class=\"add solid\" data-act=\"order-save\"' + (state.saving ? \" disabled\" : \"\") + \">\" + (state.saving ? \"저장 중…\" : \"순서 저장\") + \"</button>\" +\n        '<button type=\"button\" class=\"add\" data-act=\"order-cancel\">취소</button>';\n    } else if (state.canWrite && !state.editing) {\n      tools = '<button type=\"button\" class=\"add\" data-act=\"order\">순서 바꾸기</button>' +\n        '<button type=\"button\" class=\"add\" data-act=\"export\">페이지 내보내기</button>' +\n        '<button type=\"button\" class=\"add\" data-act=\"new\">+ 새 항목</button>';\n    }\n    var head = '<div class=\"listhead\"><p class=\"summary-line\">' + line + \"</p>\" + tools + \"</div>\";\n\n    var body = \"\";\n    if (shown.length) {\n      body = state.reorder\n        ? shown.map(function (e, i) { return orderRow(e, i, shown.length); }).join(\"\")\n        : '<div class=\"board\">' + shown.map(function (e) { return rowHTML(e, ts); }).join(\"\") + \"</div>\";\n    } else {\n      if (ts.length) {\n        body = '<div class=\"empty\"><b>맞는 항목이 없습니다.</b><span>기기 이름이나 화면에 뜬 문구 그대로 다시 찾아보세요.' +\n          (state.cat !== \"all\" ? \" ‘전체’ 분류에서도 확인해 보세요.\" : \"\") + \"</span></div>\";\n      } else {\n        body = '<div class=\"empty\"><b>' + esc(CAT_LABEL[state.cat]) + \" 항목이 아직 없습니다.</b><span>해결한 사례가 생기면 증상·준비물·해결 순서를 정리해 여기에 추가합니다.</span></div>\";\n      }\n    }\n    return head + body;\n  }\n\n  /* ---------- list ↔ one entry ---------- */\n  function syncHash() {\n    try {\n      var hh = state.openId || (state.cat !== \"all\" ? state.cat : \"\");\n      history.replaceState(null, \"\", hh ? \"#\" + hh : location.pathname + location.search);\n    } catch (e) {}\n  }\n  function toMainTop() {\n    try {\n      var bar = document.querySelector(\".bar\");\n      var y = listEl.getBoundingClientRect().top + window.pageYOffset - (bar ? bar.offsetHeight : 0);\n      if (window.pageYOffset > y) window.scrollTo(0, Math.max(0, y));\n    } catch (e) {}\n  }\n  function openEntry(id) {\n    if (!findEntry(id)) return;\n    if (!state.openId) state.listY = window.pageYOffset || 0;\n    state.openId = id; state.confirmDel = null; state.room = null; state.logDel = null; state.roomEdit = false;\n    syncHash();\n    render();\n    toMainTop();\n    var hd = listEl.querySelector(\".article .symptom\");\n    if (hd) { try { hd.focus({ preventScroll: true }); } catch (e) {} }\n  }\n  function showList() {\n    var was = state.openId;\n    if (Object.keys(state.notes).length || Object.keys(state.upg).length) toast(\"저장하지 않고 고친 칸이 있어요. 그 글로 돌아가 [저장]을 눌러 주세요.\");\n    state.room = null; state.logDel = null; state.roomEdit = false;\n    state.openId = null; state.confirmDel = null; state.tableEdit = null; state.tableDraft = null;\n    syncHash();\n    render();\n    try { window.scrollTo(0, state.listY || 0); } catch (e) {}\n    if (was) {\n      var sel = window.CSS && CSS.escape ? CSS.escape(was) : was;\n      var r = listEl.querySelector('.row[data-id=\"' + sel + '\"]');\n      if (r) { try { r.focus({ preventScroll: true }); } catch (e) {} }\n    }\n  }\n\n  function stats() {\n    var latest = ENTRIES.reduce(function (m, e) { return e.checked > m ? e.checked : m; }, \"\");\n    statsEl.textContent = \"전체 \" + ENTRIES.length + \"건\" + (latest ? \" · 마지막 확인 \" + latest : \"\");\n  }\n\n  /* ---------- events ---------- */\n  chipsEl.addEventListener(\"click\", function (ev) {\n    var b = ev.target.closest(\".chip\");\n    if (!b) return;\n    state.cat = b.getAttribute(\"data-cat\");\n    if (!state.editing && !state.tableEdit && state.openId) { state.openId = null; state.listY = 0; }\n    syncHash();\n    render();\n  });\n  qEl.addEventListener(\"input\", function () {\n    state.q = qEl.value;\n    if (!state.editing && !state.tableEdit && state.openId) { state.openId = null; state.listY = 0; syncHash(); }\n    render();\n  });\n  clearEl.addEventListener(\"click\", function () { qEl.value = \"\"; state.q = \"\"; render(); qEl.focus(); });\n\n  listEl.addEventListener(\"click\", function (ev) {\n    var cp = ev.target.closest && ev.target.closest(\".copy\");\n    if (cp) {\n      var num = cp.getAttribute(\"data-copy\");\n      var box = cp.parentNode.querySelector(\".num, .pwval\");\n      var selectNum = function () {\n        try {\n          var r = document.createRange(); r.selectNodeContents(box);\n          var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);\n          cp.textContent = \"번호 선택됨\";\n        } catch (e) {}\n      };\n      try {\n        navigator.clipboard.writeText(num).then(function () {\n          var was = cp.textContent;\n          cp.textContent = \"복사됨\";\n          setTimeout(function () { cp.textContent = was; }, 1600);\n        }, selectNum);\n      } catch (e) { selectNum(); }\n      return;\n    }\n    var a = ev.target.closest && ev.target.closest(\"[data-act]\");\n    if (!a) return;\n    ev.preventDefault();\n    if (state.saving) return;\n    var act = a.getAttribute(\"data-act\"), id = a.getAttribute(\"data-id\");\n    if (act === \"print\") { window.print(); return; }\n    if (act === \"note-reset\") { delete state.notes[id]; delete state.upg[id]; render(); return; }\n    if (act === \"note-save\") {\n      var se = findEntry(id);\n      if (!se || !se.table) return;\n      saveTable(se, pendingTable(se), \"고친 내용을 저장했습니다.\");\n      return;\n    }\n    if (act === \"room\") {\n      state.room = a.getAttribute(\"data-name\"); state.logDel = null; state.roomEdit = false;\n      render();\n      var rp = document.getElementById(\"room-panel\");\n      if (rp) { try { rp.scrollIntoView({ block: \"start\", behavior: \"smooth\" }); } catch (e) { rp.scrollIntoView(); } }\n      return;\n    }\n    if (act === \"room-close\") { state.room = null; state.logDel = null; state.roomEdit = false; render(); return; }\n    if (act === \"room-edit\") {\n      state.roomEdit = true; state.logDel = null; render();\n      var rf = document.getElementById(\"re-1\") || document.getElementById(\"re-0\");\n      if (rf) { try { rf.focus({ preventScroll: true }); } catch (e) {} }\n      return;\n    }\n    if (act === \"room-edit-cancel\") { state.roomEdit = false; render(); return; }\n    if (act === \"log-del\") { state.logDel = state.room + \"|\" + a.getAttribute(\"data-i\"); render(); return; }\n    if (act === \"log-del-no\") { state.logDel = null; render(); return; }\n    if (act === \"log-del-yes\") {\n      var le = findEntry(state.openId);\n      if (!le || !le.table || !state.room) return;\n      var lt = pendingTable(le);\n      lt.logs = cloneLogs(lt.logs);\n      var li = parseInt(a.getAttribute(\"data-i\"), 10);\n      if (lt.logs[state.room]) {\n        lt.logs[state.room].splice(li, 1);\n        if (!lt.logs[state.room].length) delete lt.logs[state.room];\n      }\n      state.logDel = null;\n      saveTable(le, lt, \"기록을 지웠습니다.\");\n      return;\n    }\n    if (act === \"open\") { openEntry(id); return; }\n    if (act === \"list\") { showList(); return; }\n    if (act === \"export\") {\n      DL.save({ filename: \"디지털튜터_문제해결_매뉴얼_\" + today8() + \".html\", data: new Blob([buildDoc(ENTRIES)], { type: \"text/html\" }) });\n      return;\n    }\n    if (act === \"go\") { if (id) openEntry(id); return; }\n    if (act === \"pick\") {\n      var fi = document.getElementById(\"f-file\");\n      if (fi) fi.click();\n      return;\n    }\n    if (act === \"att-del\") {\n      var key = a.getAttribute(\"data-key\");\n      state.att = (state.att || []).filter(function (x) {\n        if (x.key !== key) return true;\n        if (x.id) dropAsset(x.id);\n        if (x.preview) { try { URL.revokeObjectURL(x.preview); } catch (e) {} }\n        return false;\n      });\n      drawAtt();\n      return;\n    }\n    if (act === \"get\") {\n      var ge = findEntry(a.getAttribute(\"data-eid\"));\n      var aid = a.getAttribute(\"data-aid\");\n      var at = ge ? (ge.attachments || []).filter(function (x) { return x.id === aid; })[0] : null;\n      if (!at || !DL || a.disabled) return;\n      a.disabled = true;\n      var gwas = a.textContent;\n      a.textContent = \"준비 중…\";\n      saveAttachment(at).then(function () {\n        toast(\"‘\" + at.name + \"’ 파일을 저장했어요\");\n      }, function (err) {\n        var code = err && err.code;\n        if (code === \"declined\") return;\n        if (code === \"missing\") toast(\"파일을 찾을 수 없어요. 수정에서 다시 첨부해 주세요\");\n        else if (code === \"rate_limited\") toast(\"저장 창이 이미 열려 있어요. 잠시 뒤 다시 눌러 주세요\");\n        else if (code === \"rejected_extension\" || code === \"extension_not_enabled\") toast(\"이 화면에서는 이 형식의 파일을 받을 수 없어요\");\n        else if (code === \"unavailable\" || code === \"not_granted\" || code === \"capability_disabled\" || code === \"capability_removed\") {\n          toast(\"이 화면에서는 파일 저장을 할 수 없어요\");\n          DL = null; state.canDownload = false;\n        } else toast(\"파일을 받지 못했어요. 잠시 뒤 다시 눌러 주세요\");\n      }).then(function () {\n        a.disabled = false; a.textContent = gwas;\n        if (!state.canDownload) render();\n      });\n      return;\n    }\n    if (act === \"xlsx\") {\n      var xe = findEntry(id);\n      if (!xe || !xe.table || !DL || a.disabled) return;\n      a.disabled = true;\n      var wasTxt = a.textContent;\n      a.textContent = \"만드는 중…\";\n      exportTable(xe).then(function () {\n        toast(\"엑셀 파일을 저장했어요\");\n      }, function (err) {\n        var code = err && err.code;\n        if (code === \"declined\") return;\n        if (code === \"rate_limited\") toast(\"저장 창이 이미 열려 있어요. 잠시 뒤 다시 눌러 주세요\");\n        else if (code === \"unavailable\" || code === \"not_granted\" || code === \"capability_disabled\" || code === \"capability_removed\") {\n          toast(\"이 화면에서는 파일 저장을 할 수 없어요\");\n          DL = null; state.canDownload = false;\n        } else toast(\"엑셀 파일을 만들지 못했어요. 잠시 뒤 다시 눌러 주세요\");\n      }).then(function () {\n        a.disabled = false; a.textContent = wasTxt;\n        if (!state.canDownload) render();\n      });\n      return;\n    }\n    if (act === \"tedit\") {\n      var te = findEntry(id);\n      if (!te || !te.table) return;\n      state.tableEdit = id; state.editing = null; state.draft = null; state.confirmDel = null;\n      var tnc = (te.table.cols || []).indexOf(\"비고\");\n      state.tableDraft = (te.table.rows || []).map(function (r, ri) {\n        var c = r.slice(), nv = noteVal(id, ri);\n        if (nv !== undefined && tnc > -1) { while (c.length <= tnc) c.push(\"\"); c[tnc] = nv; }\n        return c;\n      });\n      delete state.notes[id];\n      state.tableKeys = state.tableDraft.map(function (r) { return cellv(r, 0); });\n      state.room = null;\n      render();\n      return;\n    } else if (act === \"tcancel\") {\n      state.tableEdit = null; state.tableDraft = null; state.tableKeys = null; render();\n      return;\n    } else if (act === \"trow-add\") {\n      readTableDraft();\n      var tn = tableCols(findEntry(id)) || 1;\n      var blank = []; for (var bi = 0; bi < tn; bi++) blank.push(\"\");\n      state.tableDraft.push(blank);\n      if (state.tableKeys) state.tableKeys.push(\"\");\n      render();\n      var nf = document.getElementById(\"t-\" + (state.tableDraft.length - 1) + \"-0\"); if (nf) nf.focus();\n      return;\n    } else if (act === \"trow-del\") {\n      readTableDraft();\n      var delRow = parseInt(a.getAttribute(\"data-row\"), 10);\n      state.tableDraft.splice(delRow, 1);\n      if (state.tableKeys) state.tableKeys.splice(delRow, 1);\n      render();\n      return;\n    } else if (act === \"tsave\") {\n      readTableDraft();\n      var tb = findEntry(id);\n      if (!tb) return;\n      var keys = state.tableKeys || [];\n      var pairs = state.tableDraft.map(function (r, ri) { return [r.map(function (c) { return String(c || \"\").trim(); }), keys[ri] || \"\"]; })\n        .filter(function (p) { return p[0].some(function (c) { return c; }); });\n      var tt = pendingTable(tb);\n      tt.rows = pairs.map(function (p) { return p[0]; });\n      if (tt.logs) {\n        // 교실 이름을 바꿨으면 그 교실 기록도 새 이름으로 옮긴다\n        tt.logs = cloneLogs(tt.logs);\n        pairs.forEach(function (p) {\n          var old = p[1], nw = cellv(p[0], 0);\n          if (old && nw && old !== nw && tt.logs[old] && !tt.logs[nw]) { tt.logs[nw] = tt.logs[old]; delete tt.logs[old]; }\n        });\n      }\n      saveTable(tb, tt, \"표를 저장했습니다.\");\n      return;\n    }\n    if (act === \"order\" || act === \"edit\" || act === \"new\") { state.tableEdit = null; state.tableDraft = null; }\n    if (act === \"order\") {\n      state.reorder = true; state.snapshot = ENTRIES.slice(); state.editing = null; state.draft = null; state.confirmDel = null;\n      render();\n      return;\n    } else if (act === \"order-cancel\") {\n      if (state.snapshot) ENTRIES = state.snapshot;\n      state.reorder = false; state.snapshot = null; render();\n      return;\n    } else if (act === \"order-save\") {\n      persist(ENTRIES.slice(), \"순서를 저장했습니다.\");\n      return;\n    } else if (act === \"up\" || act === \"down\") {\n      if (moveEntry(id, act === \"up\" ? -1 : 1)) {\n        render();\n        var row = listEl.querySelector('.orow[data-id=\"' + id + '\"]');\n        if (row) {\n          var b2 = row.querySelector('[data-act=\"' + act + '\"]');\n          if (!b2 || b2.disabled) b2 = row.querySelector('[data-act=\"' + (act === \"up\" ? \"down\" : \"up\") + '\"]');\n          if (b2) b2.focus();\n        }\n      }\n      return;\n    }\n    if (act === \"edit\") {\n      state.editing = id; state.draft = null; state.confirmDel = null; startAtt(findEntry(id)); render();\n      toMainTop();\n    } else if (act === \"new\") {\n      state.editing = NEW; state.draft = null; state.confirmDel = null; startAtt(null); render();\n      toMainTop();\n      var f2 = document.getElementById(\"f-symptom\"); if (f2) { try { f2.focus({ preventScroll: true }); } catch (e) {} }\n    } else if (act === \"cancel\") {\n      state.editing = null; state.draft = null; endAtt(true); render();\n      toMainTop();\n    } else if (act === \"del\") {\n      state.confirmDel = id; render();\n    } else if (act === \"del-no\") {\n      state.confirmDel = null; render();\n    } else if (act === \"del-yes\") {\n      var gone = findEntry(id);\n      persist(ENTRIES.filter(function (e) { return e.id !== id; }), \"‘\" + (gone ? gone.symptom : \"항목\") + \"’을(를) 삭제했습니다.\", null);\n    }\n  });\n\n  fabEl.addEventListener(\"click\", function () {\n    if (state.saving) return;\n    state.editing = NEW; state.draft = null; state.confirmDel = null; state.reorder = false;\n    state.tableEdit = null; state.tableDraft = null;\n    startAtt(null);\n    render();\n    toMainTop();\n    var f = document.getElementById(\"f-symptom\"); if (f) { try { f.focus({ preventScroll: true }); } catch (e) {} }\n  });\n\n  listEl.addEventListener(\"submit\", function (ev) {\n    ev.preventDefault();\n    var f = ev.target;\n    if (!f || f.id !== \"editor\" || state.saving) return;\n    var v = readForm();\n    var err = document.getElementById(\"f-err\");\n    var att = state.att || [];\n    var busy = att.some(function (x) { return x.st === \"up\"; });\n    var okAtt = att.some(function (x) { return x.st === \"ok\" && x.id; });\n    var problem = !v.symptom.trim() ? \"제목을 적어 주세요.\"\n      : busy ? \"파일을 올리는 중이에요. 다 올라간 뒤 저장해 주세요.\"\n      : (!lines(v.steps).length && !okAtt && !lines(v.memo).length && !(state.editing !== NEW && (findEntry(state.editing) || {}).table))\n        ? \"내용을 한 줄 이상 적거나 파일을 첨부해 주세요.\" : \"\";\n    if (problem) { err.textContent = problem; err.hidden = false; return; }\n    var isNew = state.editing === NEW;\n    var base = isNew ? blankEntry() : findEntry(state.editing);\n    if (!base) { state.editing = null; render(); return; }\n    var n = buildEntry(base, v);\n    var next = isNew ? [n].concat(ENTRIES) : ENTRIES.map(function (e) { return e.id === base.id ? n : e; });\n    if (!isNew && n.important && !base.important) next = [n].concat(ENTRIES.filter(function (e) { return e.id !== base.id; }));\n    state.draft = v;\n    persist(next, isNew ? \"새 항목을 추가했습니다.\" : \"수정했습니다.\", n.id);\n  });\n\n  // 사진이 지워졌거나 못 불러오면 안내 문구로 바꾼다\n  listEl.addEventListener(\"error\", function (ev) {\n    var t = ev.target;\n    if (!t || t.tagName !== \"IMG\" || !t.closest || !t.closest(\".shot\")) return;\n    var p = document.createElement(\"p\");\n    p.className = \"none\";\n    p.textContent = \"사진을 불러오지 못했습니다.\";\n    t.replaceWith(p);\n  }, true);\n\n  // 캡처한 그림 붙여 넣기 (입력 화면에서). 엑셀 칸을 복사해 글 칸에 붙일 때는 글자로 붙인다.\n  document.addEventListener(\"paste\", function (ev) {\n    if (!state.editing || !state.att || !document.getElementById(\"editor\")) return;\n    var cd = ev.clipboardData;\n    if (!cd) return;\n    var files = [];\n    try {\n      Array.prototype.forEach.call(cd.items || [], function (it) {\n        if (it.kind === \"file\") { var f = it.getAsFile(); if (f) files.push(f); }\n      });\n    } catch (e) {}\n    if (!files.length && cd.files && cd.files.length) files = Array.prototype.slice.call(cd.files);\n    if (!files.length) return;\n    var t = ev.target && ev.target.closest ? ev.target : null;\n    var inZone = t && t.closest(\"#f-drop\");\n    var inText = t && t.closest(\"textarea, input\");\n    var types = Array.prototype.slice.call(cd.types || []);\n    if (inText && !inZone && types.indexOf(\"text/plain\") > -1) return;\n    ev.preventDefault();\n    if (!ASSETS) { toast(\"이 화면에서는 파일을 올릴 수 없어요.\"); return; }\n    toast(files.length > 1 ? \"붙여 넣은 파일 \" + files.length + \"개를 올립니다\" : \"붙여 넣은 그림을 올립니다\");\n    addFiles(files, true);\n  });\n\n  // 파일 끌어다 놓기 (입력 화면 아무 곳에나)\n  function dragFiles(ev) { var d = ev.dataTransfer; return !!d && Array.prototype.indexOf.call(d.types || [], \"Files\") > -1; }\n  document.addEventListener(\"dragover\", function (ev) {\n    if (!state.editing || !dragFiles(ev)) return;\n    ev.preventDefault();\n    var z = document.getElementById(\"f-drop\");\n    if (z) z.classList.add(\"over\");\n  });\n  document.addEventListener(\"dragleave\", function (ev) {\n    var z = document.getElementById(\"f-drop\");\n    if (z && (ev.target === document.documentElement || ev.target === document.body || !ev.relatedTarget)) z.classList.remove(\"over\");\n  });\n  document.addEventListener(\"drop\", function (ev) {\n    if (!state.editing || !dragFiles(ev)) return;\n    ev.preventDefault();\n    var z = document.getElementById(\"f-drop\");\n    if (z) z.classList.remove(\"over\");\n    addFiles(ev.dataTransfer.files, false);\n  });\n  document.addEventListener(\"change\", function (ev) {\n    var t = ev.target;\n    if (!t || t.id !== \"f-file\") return;\n    addFiles(t.files, false);\n    try { t.value = \"\"; } catch (e) {}\n  });\n\n  // 비고 칸 바로 고치기: 입력할 때마다 표시만 바꾸고, 저장은 [비고 저장]으로 한 번에\n  listEl.addEventListener(\"input\", function (ev) {\n    var t = ev.target;\n    // 표 고치기 중: 통계를 바로 다시 계산\n    if (t && t.closest && t.closest(\".tedit\") && state.tableEdit) {\n      readTableDraft();\n      var te2 = findEntry(state.tableEdit);\n      var sEl = te2 && isBoard(te2.table) ? document.getElementById(\"stats-\" + te2.id) : null;\n      if (sEl) sEl.outerHTML = statsHTML(te2, state.tableDraft, true);\n      return;\n    }\n    if (!t || !t.classList || !t.classList.contains(\"note-in\")) return;\n    var eid = t.getAttribute(\"data-eid\"), ri = parseInt(t.getAttribute(\"data-row\"), 10);\n    var ne = findEntry(eid);\n    if (!ne || !ne.table) return;\n    var nc = (ne.table.cols || []).indexOf(\"비고\");\n    var row = (ne.table.rows || [])[ri] || [];\n    var orig = row[nc] == null ? \"\" : String(row[nc]);\n    var m = state.notes[eid] || (state.notes[eid] = {});\n    if (t.value === orig) delete m[ri]; else m[ri] = t.value;\n    if (!Object.keys(m).length) delete state.notes[eid];\n    t.classList.toggle(\"dirty\", t.value !== orig);\n    var bar = document.getElementById(\"nbar-\" + eid);\n    if (bar) bar.innerHTML = nbarHTML(ne);\n  });\n  // 업그레이드 가능(가/부) 고르기\n  listEl.addEventListener(\"change\", function (ev) {\n    var t = ev.target;\n    if (!t || !t.classList || !t.classList.contains(\"upg\")) return;\n    var eid = t.getAttribute(\"data-eid\"), k = t.getAttribute(\"data-key\");\n    var ue = findEntry(eid);\n    if (!ue) return;\n    var m = state.upg[eid] || (state.upg[eid] = {});\n    if (t.value === upSaved(ue, k)) delete m[k]; else m[k] = t.value;\n    if (!Object.keys(m).length) delete state.upg[eid];\n    t.classList.toggle(\"dirty\", t.value !== upSaved(ue, k));\n    var bar = document.getElementById(\"nbar-\" + eid);\n    if (bar) bar.innerHTML = nbarHTML(ue);\n  });\n  // 교실(반) 한 줄 정보 저장 (이름을 바꾸면 기록도 따라간다)\n  listEl.addEventListener(\"submit\", function (ev) {\n    var f = ev.target;\n    if (!f || f.id !== \"roomform\") return;\n    ev.preventDefault();\n    if (state.saving) return;\n    var re = findEntry(state.openId);\n    if (!re || !re.table || !state.room) return;\n    var tt = pendingTable(re), rcols = tt.cols || [];\n    var ri = -1;\n    tt.rows.forEach(function (r, i) { if (ri < 0 && cellv(r, 0) === state.room) ri = i; });\n    if (ri < 0) return;\n    var vals = rcols.map(function (_, j) {\n      var el = document.getElementById(\"re-\" + j);\n      return el ? String(el.value || \"\").trim() : cellv(tt.rows[ri], j);\n    });\n    var nn = vals[0];\n    var dup = nn !== state.room && tt.rows.some(function (r, i) { return i !== ri && cellv(r, 0) === nn; });\n    if (!nn || dup) {\n      var er = document.getElementById(\"re-err\");\n      if (er) { er.textContent = !nn ? \"이름을 적어 주세요.\" : \"‘\" + nn + \"’이(가) 이미 있어요.\"; er.hidden = false; }\n      return;\n    }\n    var nrow = tt.rows[ri].slice();\n    vals.forEach(function (v, j) { nrow[j] = v; });\n    tt.rows[ri] = nrow;\n    if (nn !== state.room && tt.logs && tt.logs[state.room]) {\n      tt.logs = cloneLogs(tt.logs);\n      tt.logs[nn] = tt.logs[state.room];\n      delete tt.logs[state.room];\n    }\n    if (state.notes[re.id]) { delete state.notes[re.id][ri]; if (!Object.keys(state.notes[re.id]).length) delete state.notes[re.id]; }\n    state.room = nn; state.roomEdit = false;\n    saveTable(re, tt, \"‘\" + nn + \"’ 정보를 저장했습니다.\");\n  });\n  // 교실 기록 남기기\n  listEl.addEventListener(\"submit\", function (ev) {\n    var f = ev.target;\n    if (!f || f.id !== \"logform\") return;\n    ev.preventDefault();\n    if (state.saving) return;\n    var le = findEntry(state.openId);\n    if (!le || !le.table || !state.room) return;\n    var d = (document.getElementById(\"lg-d\") || {}).value || \"\";\n    var k = (document.getElementById(\"lg-k\") || {}).value || \"기타\";\n    var tx = String((document.getElementById(\"lg-t\") || {}).value || \"\").trim();\n    if (!tx) {\n      var er = document.getElementById(\"lg-err\");\n      if (er) { er.textContent = \"내용을 적어 주세요.\"; er.hidden = false; }\n      return;\n    }\n    var t2 = pendingTable(le);\n    t2.logs = cloneLogs(t2.logs);\n    (t2.logs[state.room] = t2.logs[state.room] || []).push({ d: /^\\d{4}-\\d{2}-\\d{2}$/.test(d) ? d : today(), k: k, t: tx });\n    saveTable(le, t2, \"‘\" + state.room + \"’ 기록을 남겼습니다.\");\n  });\n  // 표 고치기: 엑셀처럼 Enter·↑↓로 위아래 칸 이동 (Tab은 옆 칸)\n  listEl.addEventListener(\"keydown\", function (ev) {\n    var t = ev.target;\n    if (!t || !t.closest || !t.closest(\".tedit\") || ev.isComposing || ev.keyCode === 229) return;\n    var m = /^t-(\\d+)-(\\d+)$/.exec(t.id || \"\");\n    if (!m) return;\n    var dr = 0;\n    if (ev.key === \"Enter\") dr = ev.shiftKey ? -1 : 1;\n    else if (ev.key === \"ArrowDown\") dr = 1;\n    else if (ev.key === \"ArrowUp\") dr = -1;\n    if (!dr) return;\n    ev.preventDefault();\n    var nx = document.getElementById(\"t-\" + (parseInt(m[1], 10) + dr) + \"-\" + m[2]);\n    if (nx) { nx.focus(); try { nx.select(); } catch (e) {} }\n  });\n  listEl.addEventListener(\"keydown\", function (ev) {\n    var t = ev.target;\n    if (!t || !t.classList || !t.classList.contains(\"note-in\") || ev.isComposing || ev.keyCode === 229) return;\n    if (ev.key !== \"Enter\") return;\n    ev.preventDefault();\n    var nx = document.getElementById(\"n-\" + t.getAttribute(\"data-eid\") + \"-\" + (parseInt(t.getAttribute(\"data-row\"), 10) + (ev.shiftKey ? -1 : 1)));\n    if (nx) { nx.focus(); try { nx.select(); } catch (e) {} } else t.blur();\n  });\n\n  // Esc 키로 목록으로\n  document.addEventListener(\"keydown\", function (ev) {\n    if (ev.key !== \"Escape\" || !state.openId || state.editing || state.tableEdit || state.saving) return;\n    var t = ev.target;\n    if (t && t.closest && t.closest(\"input, textarea, select\")) return;\n    if (state.room) { state.room = null; state.logDel = null; state.roomEdit = false; render(); return; }\n    showList();\n  });\n\n  render();\n  stats();\n  if (state.room) {\n    var rp0 = document.getElementById(\"room-panel\");\n    if (rp0) { try { rp0.scrollIntoView({ block: \"start\" }); } catch (e) {} }\n  }\n\n})();";
  var SKELETON = '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>';
  var HEAD = '<title>디지털튜터 문제해결 매뉴얼</title>\n' +
    '<meta name="claude:viewport-fit-sides" content="cover">\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap">\n';

  var CATS = [
    { key: "all", label: "전체" },
    { key: "board", label: "전자칠판" },
    { key: "special", label: "특수교실" },
    { key: "laptop", label: "노트북" },
    { key: "cabinet", label: "충전함" },
    { key: "account", label: "계정·로그인" },
    { key: "windows", label: "윈도우" },
    { key: "etc", label: "기타" }
  ];
  var CAT_LABEL = {}; CATS.forEach(function (c) { CAT_LABEL[c.key] = c.label; });
  var STATUS = { done: "해결", temp: "임시조치", check: "확인 필요", routine: "정기 점검", info: "안내" };
  var NEW = "__new__";

  var SEARCH_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>';
  var LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  var CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

  var SHELL =
    '<header class="top"><div class="wrap">' +
      '<p class="eyebrow">전주기전여자고등학교 · 디지털튜터</p>' +
      '<h1>문제해결 매뉴얼</h1>' +
    '</div></header>' +
    '<div class="bar"><div class="wrap">' +
      '<label class="search" for="q">' + SEARCH_SVG +
        '<input id="q" type="search" enterkeyhint="search" autocomplete="off" placeholder="증상·기기·문구 검색 (예: 아하, 미러링)" aria-label="매뉴얼 검색">' +
        '<button id="clear" type="button" aria-label="검색어 지우기" hidden>×</button>' +
      '</label>' +
      '<div class="chips" id="chips" role="group" aria-label="분류"></div>' +
    '</div></div>' +
    '<main><div class="wrap" id="list"></div></main>' +
    '<footer><div class="wrap">' +
      '<p id="stats"></p>' +
    '</div></footer>' +
    '<button type="button" id="fab" class="fab" hidden>+ 입력</button>' +
    '<div id="toast" role="status" hidden></div>';

  document.getElementById("root").innerHTML = SHELL;

  var STORE_KEY = "dtm-entries";
  var ENTRIES = null;
  try { ENTRIES = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { ENTRIES = null; }
  if (!ENTRIES) { try { ENTRIES = JSON.parse(document.getElementById("data").textContent) || []; } catch (e) { ENTRIES = []; } }

  var listEl = document.getElementById("list");
  var chipsEl = document.getElementById("chips");
  var qEl = document.getElementById("q");
  var clearEl = document.getElementById("clear");
  var statsEl = document.getElementById("stats");
  var toastEl = document.getElementById("toast");
  var fabEl = document.getElementById("fab");

  var state = { cat: "all", q: "", canWrite: true, canDownload: true, editing: null, draft: null, confirmDel: null, saving: false,
    openId: null, listY: 0, att: null, upl: {}, notes: {}, upg: {}, room: null, roomEdit: false, logDel: null, tableKeys: null };
  var DL = {
    save: function (o) {
      try {
        var url = URL.createObjectURL(o.data);
        var a = document.createElement("a");
        a.href = url; a.download = o.filename;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
        return Promise.resolve();
      } catch (e) { return Promise.reject(e); }
    }
  };
  var ASSETS = true;

  // 주소 끝 #분류 또는 #글아이디 로 바로 열기
  try {
    var h = (location.hash || "").replace("#", "");
    if (CAT_LABEL[h]) state.cat = h;
    else if (h && findEntry(h)) state.openId = h;
  } catch (e) {}

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function terms() { return state.q.trim().toLowerCase().split(/\s+/).filter(Boolean); }
  // 한글·영문으로 따로 적힌 말도 같이 찾기 (예: 아하 ↔ AHA)
  var ALIASES = {
    "아하": ["aha"], "aha": ["아하"], "안드로이드": ["android"], "android": ["안드로이드"],
    "크롬": ["chrome"], "chrome": ["크롬"], "업그레이드": ["업데이트"], "업데이트": ["업그레이드"],
    "탐투스": ["tamtus"], "tamtus": ["탐투스"], "패들렛": ["padlet"], "padlet": ["패들렛"],
    "와이파이": ["wifi", "wi-fi"], "wifi": ["와이파이"], "비트라커": ["bitlocker"], "bitlocker": ["비트라커"],
    "인튠": ["intune"], "intune": ["인튠"], "나이스": ["neis"], "neis": ["나이스"],
    "앱코": ["abko"], "abko": ["앱코"], "패드뱅크": ["padbank"], "padbank": ["패드뱅크"],
    "윈도우": ["windows"], "windows": ["윈도우"], "엘지": ["lg"], "lg": ["엘지"], "그램": ["gram"],
    "충전기함": ["충전함"], "충전함": ["충전기함"], "비번": ["비밀번호"], "비밀번호": ["비번"],
    "에이에스": ["a/s"], "as": ["a/s"], "프린트": ["프린터"], "프린터": ["프린트"]
  };
  function expand(t) { return [t].concat(ALIASES[t] || []); }
  function hl(raw, ts) {
    raw = String(raw == null ? "" : raw);
    if (!ts.length) return esc(raw);
    var all = [];
    ts.forEach(function (t) { all = all.concat(expand(t)); });
    var re = new RegExp("(" + all.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "gi");
    var out = "", last = 0, m;
    while ((m = re.exec(raw)) !== null) {
      if (m[0] === "") { re.lastIndex++; continue; }
      out += esc(raw.slice(last, m.index)) + "<mark>" + esc(m[0]) + "</mark>";
      last = m.index + m[0].length;
    }
    return out + esc(raw.slice(last));
  }
  function rich(raw, ts) {
    return String(raw == null ? "" : raw).split("`").map(function (part, i) {
      var h = hl(part, ts);
      return i % 2 ? "<code>" + h + "</code>" : h;
    }).join("");
  }
  function hay(e) {
    return [CAT_LABEL[e.cat], STATUS[e.status], e.symptom, e.device, (e.prep || []).join(" "),
      (e.steps || []).join(" "), (e.memo || []).join(" "),
      (e.secrets || []).map(function (s) { return s.label + " " + (s.value || ""); }).join(" "),
      (e.keywords || []).join(" "),
      (e.attachments || []).map(function (a) { return a.name; }).join(" "),
      (e.links || []).map(function (l) { return l.label + " " + (l.note || ""); }).join(" "),
      e.important ? "중요" : "",
      e.contact ? [e.contact.who, e.contact.num, e.contact.ext].join(" ") : "",
      e.codes ? e.codes.map(function (c) { return c.join(" "); }).join(" ") : "",
      e.table ? [(e.table.cols || []).join(" ")].concat((e.table.rows || []).map(function (r) { return r.join(" "); })).join(" ") : "",
      e.table && e.table.logs ? logsText(e) : "",
      e.checked].join(" ").toLowerCase();
  }
  function matches(e, ts) {
    var hs = hay(e);
    return ts.every(function (t) { return expand(t).some(function (x) { return hs.indexOf(x) !== -1; }); });
  }
  function findEntry(id) {
    for (var i = 0; i < ENTRIES.length; i++) if (ENTRIES[i].id === id) return ENTRIES[i];
    return null;
  }
  function today() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }
  function lines(s) { return String(s || "").split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean); }
  function copyObj(o) { var r = {}; for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) r[k] = o[k]; return r; }

  var toastTimer = null;
  function toast(msg, sticky) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    if (!sticky) toastTimer = setTimeout(function () { toastEl.hidden = true; }, 3200);
  }

  /* ---------- table totals (by company) + Excel export ---------- */
  function company(v) {
    var s = String(v == null ? "" : v).trim();
    var l = s.toLowerCase();
    if (!s) return "미확인";
    if (l.indexOf("탐투스") > -1 || l.indexOf("tamtus") > -1) return "탐투스";
    if (l.indexOf("이지보드") > -1 || l.indexOf("ej board") > -1 || l.indexOf("ejboard") > -1) return "이지보드";
    if (l.indexOf("이지") > -1 || l.indexOf("ej") > -1 || l.indexOf("easy") > -1) return "이지칠판";
    if (l.indexOf("아하") > -1 || l.indexOf("aha") > -1) return "아하";
    return s;
  }
  function version(v) {
    var s = String(v == null ? "" : v).trim();
    if (!s) return "미확인";
    if (s === "없음" || /^x$/i.test(s)) return "안드로이드 없음";
    var m = s.match(/(\d+)/);
    if (/윈도우|windows/i.test(s)) return m ? "윈도우 " + m[1] : "윈도우 (버전 미확인)";
    if (/^\s*\d/.test(s) || /안드로이드|android/i.test(s)) return m ? "안드로이드 " + m[1] : s;
    return s;
  }
  function countBy(rows, keyOf) {
    var m = {}, order = [];
    rows.forEach(function (r) {
      var c = keyOf(r);
      if (!Object.prototype.hasOwnProperty.call(m, c)) { m[c] = 0; order.push(c); }
      m[c]++;
    });
    order.sort(function (a, b) {
      var ua = a === "미확인" ? 1 : 0, ub = b === "미확인" ? 1 : 0;
      return ua - ub || m[b] - m[a];
    });
    return order.map(function (c) { return [c, m[c]]; });
  }
  function boardTotals(t) {
    var cols = t.cols || [];
    var kc = cols.indexOf("전자칠판"), kv = cols.indexOf("안드로이드 버전");
    if (kv < 0) kv = cols.indexOf("안드로이드");
    var kw = cols.indexOf("윈도우");
    if (kc < 0) return null;
    var all = t.rows || [];
    var rows = all.filter(function (r) { return String(r[kc] || "").trim() !== "없음"; });
    var companies = countBy(rows, function (r) { return company(r[kc]); }).map(function (p) {
      var sub = rows.filter(function (r) { return company(r[kc]) === p[0]; });
      var versions = kv > -1 ? countBy(sub, function (r) { return version(r[kv]); }).map(function (q) {
        return [q[0] === "미확인" ? "버전 미확인" : q[0], q[1]];
      }) : [];
      return { name: p[0] === "미확인" ? "기종 미확인" : p[0], n: p[1], versions: versions };
    });
    var wins = [];
    if (kw > -1) {
      var wrows = rows.filter(function (r) { var w = String(r[kw] || "").trim(); return w && w !== "없음"; });
      wins = countBy(wrows, function (r) { var w = String(r[kw]).trim(), n = w.match(/(\d+)/); return n ? "윈도우 " + n[1] : w; });
    }
    return { companies: companies, wins: wins, total: rows.length, none: all.length - rows.length, withVersion: kv > -1 };
  }
  function totalsFoot(t, ncol, grid) {
    var tot = boardTotals(t);
    if (!tot) return "";
    var lead = grid ? '<td class="flab">' : "<td>";
    var span = ncol > 1 ? ' colspan="' + (ncol - 1) + '"' : "";
    var label = tot.withVersion ? "회사·버전별 소계" : "회사별 소계";
    var html = "";
    tot.companies.forEach(function (c, i) {
      html += '<tr class="co' + (i === 0 ? " first" : "") + '">' + lead + (i === 0 ? label : "") + "</td><td" + span + ">" +
        '<span class="sub-name">' + esc(c.name) + '</span><span class="sub-n">' + c.n + "대</span></td></tr>";
      c.versions.forEach(function (v) {
        html += '<tr class="ver">' + lead + '</td><td' + span + '><span class="ver-name">' + esc(v[0]) + '</span><span class="sub-n">' + v[1] + "대</span></td></tr>";
      });
    });
    tot.wins.forEach(function (w, i) {
      html += '<tr class="co' + (i === 0 ? " first" : "") + '">' + lead + (i === 0 ? "윈도우별" : "") + "</td><td" + span + '><span class="sub-name">' + esc(w[0]) + '</span><span class="sub-n">' + w[1] + "대</span></td></tr>";
    });
    if (tot.none) html += '<tr class="co' + '">' + lead + '</td><td' + span + '><span class="sub-name">칠판 없는 교실</span><span class="sub-n">' + tot.none + "곳</span></td></tr>";
    return "<tfoot>" + html +
      '<tr class="total">' + lead + '전체</td><td' + span + '><span class="sub-name">합계</span><span class="sub-n">' + tot.total + "대</span></td></tr>" +
      "</tfoot>";
  }
  var xlsxLoading = null;
  function loadXlsx() {
    if (window.XLSX) return Promise.resolve(window.XLSX);
    if (xlsxLoading) return xlsxLoading;
    xlsxLoading = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
      s.onload = function () { if (window.XLSX) resolve(window.XLSX); else { xlsxLoading = null; reject(new Error("xlsx")); } };
      s.onerror = function () { xlsxLoading = null; reject(new Error("xlsx")); };
      document.head.appendChild(s);
    });
    return xlsxLoading;
  }
  function today8() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  // 엑셀 받기: 지금 표(저장 전 고친 비고·업그레이드 포함)로 만든다. 전자칠판 표는 원래 엑셀과 같은 모양.
  function exportTable(e) {
    var t = (state.tableEdit === e.id && state.tableDraft) ? (function () { var x = pendingTable(e); x.rows = state.tableDraft.map(function (r) { return r.slice(); }); return x; })() : pendingTable(e);
    var cols = t.cols || [];
    var board = isBoard(t);
    var aoa = [], merges = [], widthUpTo = 0;
    function str(v) { return v == null ? "" : String(v); }
    if (board) {
      var rows = (t.rows || []).filter(function (r) { return r.some(function (c) { return str(c).trim(); }); });
      aoa.push(["기전여고 전자칠판 현황"]);
      merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: cols.length } });
      aoa.push(["받은 날 " + today8()]);
      aoa.push(["No."].concat(cols));
      rows.forEach(function (r, i) { aoa.push([i + 1].concat(cols.map(function (_, j) { return str(r[j]); }))); });
      aoa.push(["계", "", rows.length]);
      merges.push({ s: { r: aoa.length - 1, c: 0 }, e: { r: aoa.length - 1, c: 1 } });
      var st = boardStats(t, rows);
      var sc = cols.length + 2;
      var put = function (ri, arr) {
        while (aoa.length <= ri) aoa.push([]);
        var row = aoa[ri];
        while (row.length < sc) row.push("");
        arr.forEach(function (v, k) { row[sc + k] = v; });
      };
      put(3, ["회사", "안드로이드", "OPS", "대수", "업그레이드 가능"]);
      st.groups.forEach(function (x, k) { put(4 + k, [x.co, x.and, x.ops, x.n, upLabel((t.upgrade || {})[upKey(x.co, x.and)] || "")]); });
      put(4 + st.groups.length, ["계", "", "", st.total, ""]);
      var line = statsLine(st);
      if (line) put(6 + st.groups.length, [line]);
      widthUpTo = aoa.length;
      var memo = (e.memo || []).filter(function (m) { return str(m).trim(); });
      if (memo.length) {
        aoa.push([]);
        aoa.push(["메모"]);
        memo.forEach(function (m, k) { aoa.push([k + 1, m]); });
      }
    } else {
      if (cols.length) aoa.push(cols.slice());
      (t.rows || []).forEach(function (r) { aoa.push(r.map(str)); });
      widthUpTo = aoa.length;
    }
    return loadXlsx().then(function (X) {
      var ws = X.utils.aoa_to_sheet(aoa);
      var widths = [];
      aoa.slice(board ? 2 : 0, widthUpTo).forEach(function (r) {
        r.forEach(function (c, j) { var w = textEm(c) * 2 + 2; if (!widths[j] || w > widths[j]) widths[j] = Math.min(w, 40); });
      });
      ws["!cols"] = widths.map(function (w) { return { wch: Math.max(w || 6, 6) }; });
      if (merges.length) ws["!merges"] = merges;
      var wb = X.utils.book_new();
      var sheet = String(t.title || "목록").replace(/[\[\]:*?\/\\]/g, " ").slice(0, 31) || "목록";
      X.utils.book_append_sheet(wb, ws, sheet);
      if (board || t.rooms) {
        var logs = allLogs({ table: t });
        if (logs.length) {
          var la = [["날짜", "교실", "구분", "내용"]].concat(logs.map(function (l) { return [l.d, l.room, l.k, l.t]; }));
          var lw = X.utils.aoa_to_sheet(la);
          lw["!cols"] = [{ wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 60 }];
          X.utils.book_append_sheet(wb, lw, board ? "교실별 기록" : "반별 기록");
        }
      }
      var buf = X.write(wb, { bookType: "xlsx", type: "array" });
      var base = board ? "기전여고 전자칠판 현황" : String(t.title || "목록").replace(/[\\\/:*?"<>|]/g, " ").trim();
      return DL.save({ filename: base + "_" + today8() + ".xlsx", data: new Blob([buf]) });
    });
  }

  /* ---------- read view ---------- */
  function codeGrid(codes, ts) {
    var years = {};
    codes.forEach(function (c) { var y = String(c[0]).charAt(0); (years[y] = years[y] || []).push(c); });
    return '<div class="sec"><p class="label">반별 비밀번호</p><div class="pwgrid">' +
      Object.keys(years).sort().map(function (y) {
        return '<div class="pwcol"><span class="pwyear">' + esc(y) + "학년</span>" +
          years[y].map(function (c) {
            return '<div class="pw"><span class="cls">' + hl(c[0], ts) + '</span><span class="code">' + hl(c[1], ts) + "</span></div>";
          }).join("") + "</div>";
      }).join("") + "</div></div>";
  }

  function linksHTML(links, ts) {
    var ok = (links || []).filter(function (l) { return l && /^https?:\/\//i.test(l.url || ""); });
    if (!ok.length) return "";
    return '<div class="sec"><p class="label">다운로드·링크</p><ul class="links">' + ok.map(function (l) {
      return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer"><span>' + rich(l.label || l.url, ts) + '</span><span aria-hidden="true">↗</span></a>' +
        (l.note ? '<span class="lnote">' + rich(l.note, ts) + "</span>" : "") + "</li>";
    }).join("") + "</ul></div>";
  }

  /* ---------- attachments (files and pictures stored with this page) ---------- */
  var CLIP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 11-8.6 8.6a5 5 0 0 1-7-7l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9"/></svg>';
  var BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  var GO = '<svg class="go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
  var IMG_TYPE = /^image\/(png|jpeg|gif|webp)$/i;
  // 바로 받을 수 있는 확장자. 나머지(한글 hwp 등)는 zip으로 묶어서 받는다.
  var DL_EXT = { gif: 1, png: 1, jpg: 1, jpeg: 1, webp: 1, mp4: 1, webm: 1, txt: 1, json: 1, md: 1, docx: 1, pptx: 1, epub: 1, csv: 1, svg: 1, pdf: 1, xlsx: 1, zip: 1 };
  var MB = 1048576;
  var seq = 0;
  function extOf(name) { var m = String(name || "").match(/\.([A-Za-z0-9]{1,8})$/); return m ? m[1].toLowerCase() : ""; }
  function baseOf(name) { return String(name || "파일").replace(/\.[A-Za-z0-9]{1,8}$/, "") || "파일"; }
  function fmtSize(n) {
    n = +n || 0;
    if (n < 1024) return n + " B";
    if (n < MB) return Math.max(1, Math.round(n / 1024)) + " KB";
    return (n / MB).toFixed(n < 10 * MB ? 1 : 0) + " MB";
  }
  function ftColor(name) {
    var x = extOf(name);
    if (/^(xlsx|xls|xlsm|csv)$/.test(x)) return "var(--s-done)";
    if (/^(hwp|hwpx|docx|doc)$/.test(x)) return "var(--c-laptop)";
    if (x === "pdf") return "var(--s-check)";
    if (/^(pptx|ppt)$/.test(x)) return "var(--c-cabinet)";
    if (/^(zip|7z|egg|alz)$/.test(x)) return "var(--c-account)";
    return "var(--muted)";
  }
  function ftLabel(name) { var x = extOf(name); return x ? x.toUpperCase() : "FILE"; }
  function stamp() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "_" + p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds());
  }
  function attCount(e) { return (e.attachments || []).length + (e.image && e.image.src ? 1 : 0); }
  function getBtn(e, a) {
    if (!state.canDownload) return "";
    return '<button type="button" class="get" data-act="get" data-eid="' + esc(e.id) + '" data-aid="' + esc(a.id) + '">받기</button>';
  }
  function attachHTML(e, ts) {
    var list = (e.attachments || []).filter(function (a) { return a && a.id; });
    if (!list.length) return "";
    var imgs = list.filter(function (a) { return a.kind === "image"; });
    var files = list.filter(function (a) { return a.kind !== "image"; });
    var html = '<div class="sec"><p class="label">첨부 파일 · 사진 ' + list.length + "</p>";
    if (files.length) {
      html += '<ul class="files">' + files.map(function (a) {
        var zip = !DL_EXT[extOf(a.name)];
        return '<li class="file"><span class="ftype" style="--ft: ' + ftColor(a.name) + '">' + esc(ftLabel(a.name)) + "</span>" +
          '<span class="fname"><b>' + hl(a.name, ts) + "</b><small>" + fmtSize(a.size) +
          (zip && state.canDownload ? " · zip" : "") + "</small></span>" +
          getBtn(e, a) + "</li>";
      }).join("") + "</ul>";
    }
    html += imgs.map(function (a) {
      return '<figure class="shot"><img src="data:' + esc(a.type || "image/png") + ';base64,' + a.data + '" alt="' + esc(a.name) + '" loading="lazy">' +
        "<figcaption><span>" + hl(a.name, ts) + " · " + fmtSize(a.size) + "</span>" + getBtn(e, a) + "</figcaption></figure>";
    }).join("");
    return html + "</div>";
  }

  var zipLoading = null;
  function loadZip() {
    if (window.JSZip) return Promise.resolve(window.JSZip);
    if (zipLoading) return zipLoading;
    zipLoading = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      s.onload = function () { if (window.JSZip) resolve(window.JSZip); else { zipLoading = null; reject(new Error("zip")); } };
      s.onerror = function () { zipLoading = null; reject(new Error("zip")); };
      document.head.appendChild(s);
    });
    return zipLoading;
  }
  function b64Blob(s, type) {
    var bin = atob(String(s).replace(/\s+/g, ""));
    var u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return new Blob([u], type ? { type: type } : undefined);
  }
  // 첨부는 글자(base64)로 바꿔 글 안에 함께 저장한다. 받을 때 원래 파일로 되돌린다.
  function fileBlob(a) {
    if (!a.data) return Promise.reject({ code: "missing" });
    return Promise.resolve(b64Blob(a.data, a.type));
  }
  function saveAttachment(a) {
    return fileBlob(a).then(function (blob) {
      if (DL_EXT[extOf(a.name)]) return DL.save({ filename: a.name, data: blob });
      return loadZip().then(function (Z) {
        var z = new Z();
        z.file(a.name, blob);
        return z.generateAsync({ type: "blob" });
      }).then(function (zb) { return DL.save({ filename: baseOf(a.name) + ".zip", data: zb }); });
    });
  }
  function toB64(f) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { var s = String(r.result || ""); resolve(s.slice(s.indexOf(",") + 1)); };
      r.onerror = function () { reject({ code: "read_error" }); };
      r.readAsDataURL(f);
    });
  }
  function upErr(code) {
    if (code === "too_large") return "파일이 너무 커서 올리지 못했어요.";
    if (code === "quota_or_state") return "저장 공간이 꽉 차서 올리지 못했어요.";
    if (code === "unsupported_type") return "이 형식은 올릴 수 없어요.";
    if (code === "rate_limited") return "너무 빨리 올렸어요. 잠시 뒤 다시 올려 주세요.";
    if (code === "read_error") return "파일을 읽지 못했어요.";
    if (code === "not_granted" || code === "capability_disabled" || code === "capability_removed") return "이 화면에서는 파일을 올릴 수 없어요.";
    return "올리지 못했어요. 빼고 다시 올려 주세요.";
  }
  // 이번 입력 중에 올렸다가 뺀 파일만 지운다. 저장된 적 있는 파일은 예전 버전에서 쓰이므로 남겨 둔다.
  function dropAsset(id) {
    if (!id || !state.upl[id]) return;
    delete state.upl[id];
  }
  function uploadOne(f, pasted) {
    var type = String(f.type || "").toLowerCase();
    var img = IMG_TYPE.test(type);
    var name = f.name || "";
    if (img && (!name || (pasted && /^image\.\w+$/i.test(name)))) name = "캡처_" + stamp() + "." + (type === "image/jpeg" ? "jpg" : type.split("/")[1]);
    if (!name) name = "파일_" + stamp();
    var it = { key: "k" + (++seq), name: name, size: f.size || 0, type: type, kind: img ? "image" : "file", st: "up" };
    if (img) { try { it.preview = URL.createObjectURL(f); } catch (e) {} }
    if (!f.size) { it.st = "err"; it.msg = "빈 파일이라 올릴 수 없어요."; }
    else if (f.size > (img ? 20 : 15) * MB) { it.st = "err"; it.msg = (img ? "20" : "15") + "MB보다 큰 파일은 올릴 수 없어요."; }
    state.att.push(it);
    drawAtt();
    if (it.st === "err") return;
    var job;
    try { job = toB64(f); } catch (e) { job = Promise.reject(e); }
    job.then(function (b64) {
      it.id = "a" + Date.now().toString(36) + (++seq);
      it.data = b64; it.st = "ok";
      state.upl[it.id] = true;
    }, function (err) {
      it.st = "err"; it.msg = upErr(err && err.code);
    }).then(drawAtt);
  }
  function addFiles(list, pasted) {
    if (!state.editing || !state.att) return;
    if (!ASSETS) { toast("이 화면에서는 파일을 올릴 수 없어요. 페이지를 새로 불러온 뒤 다시 해 보세요."); return; }
    Array.prototype.forEach.call(list || [], function (f) { uploadOne(f, pasted); });
  }
  function attEditList() {
    return (state.att || []).map(function (a) {
      var thumb = a.kind === "image"
        ? '<img src="' + esc(a.preview || ("data:" + (a.type || "image/png") + ";base64," + a.data)) + '" alt="">'
        : '<span class="ftype" style="--ft: ' + ftColor(a.name) + '">' + esc(ftLabel(a.name)) + "</span>";
      var st = a.st === "up" ? "올리는 중…" : a.st === "err" ? a.msg : fmtSize(a.size);
      return '<li class="att' + (a.st === "err" ? " err" : "") + '">' + thumb +
        '<span class="fname"><b>' + esc(a.name) + '</b><small class="ast">' + esc(st) + "</small></span>" +
        '<button type="button" class="act del" data-act="att-del" data-key="' + esc(a.key) + '" aria-label="' + esc(a.name) + ' 빼기">×</button></li>';
    }).join("");
  }
  function drawAtt() {
    var box = document.getElementById("f-atts");
    if (box) box.innerHTML = attEditList();
  }
  function startAtt(e) {
    state.att = ((e && e.attachments) || []).map(function (a) {
      var c = copyObj(a); c.key = "k" + (++seq); c.st = "ok"; return c;
    });
    state.upl = {};
  }
  function endAtt(discard) {
    if (discard) Object.keys(state.upl).forEach(dropAsset);
    (state.att || []).forEach(function (a) { if (a.preview) { try { URL.revokeObjectURL(a.preview); } catch (e) {} } });
    state.att = null;
    state.upl = {};
  }

  function tableCols(e) {
    var t = e.table || {};
    var n = (t.cols || []).length;
    (state.tableEdit === e.id && state.tableDraft ? state.tableDraft : (t.rows || [])).forEach(function (r) { if (r.length > n) n = r.length; });
    return n;
  }
  /* ---------- 전자칠판 표: 통계(표와 연결) · 교실 관리(오류·A/S 기록) ---------- */
  var LOG_KINDS = ["오류", "A/S", "점검", "조치 완료", "기타"];
  var LOG_COLOR = { "오류": "var(--s-check)", "A/S": "var(--s-temp)", "점검": "var(--s-info)", "조치 완료": "var(--s-done)", "기타": "var(--s-routine)" };
  function isBoard(t) { return !!t && (t.cols || []).indexOf("전자칠판") > -1; }
  function colOf(cols, re) { for (var k = 0; k < cols.length; k++) if (re.test(String(cols[k]))) return k; return -1; }
  function boardCols(cols) {
    return {
      co: cols.indexOf("전자칠판"),
      and: colOf(cols, /^(안드로이드|android)/i),
      ops: colOf(cols, /^ops$/i),
      hdmi: colOf(cols, /^hdmi/i),
      win: cols.indexOf("윈도우"),
      wire: colOf(cols, /^(유선\/무선|유무선)$/)
    };
  }
  function roomKind(name) { return /^\d+-\d+$/.test(String(name || "").trim()) ? "일반교실" : "특수교실"; }
  function cellv(r, k) { return k > -1 && r && r[k] != null ? String(r[k]).trim() : ""; }
  function verNum(v) { var m = String(v).match(/\d+(\.\d+)?/); return m ? parseFloat(m[0]) : 1e9; }
  function upKey(co, an) { return co + "|" + an; }
  function upSaved(e, k) { var u = (e.table && e.table.upgrade) || {}; return u[k] || ""; }
  function upVal(e, k) { var p = state.upg[e.id]; return p && Object.prototype.hasOwnProperty.call(p, k) ? p[k] : upSaved(e, k); }
  function upCount(eid) { return Object.keys(state.upg[eid] || {}).length; }
  function upLabel(v) { return v === "가" ? "가능" : v === "부" ? "불가" : ""; }
  function boardStats(t, rows) {
    var c = boardCols(t.cols || []);
    var g = {}, keys = [];
    rows.forEach(function (r) {
      var co = cellv(r, c.co);
      if (!co || co === "없음") return;
      var an = cellv(r, c.and), op = cellv(r, c.ops), k = co + "|" + an + "|" + op;
      if (!g[k]) { g[k] = { co: co, and: an, ops: op, n: 0 }; keys.push(k); }
      g[k].n++;
    });
    var groups = keys.map(function (k) { return g[k]; }).sort(function (a, b) {
      return a.co.localeCompare(b.co, "ko") || verNum(a.and) - verNum(b.and) || a.ops.localeCompare(b.ops);
    });
    var total = 0;
    groups.forEach(function (x) { total += x.n; });
    var wins = {}, wk = [];
    if (c.win > -1) rows.forEach(function (r) {
      var w = cellv(r, c.win);
      if (!w || w === "없음" || /^x$/i.test(w)) return;
      var m = w.match(/(\d+)/), lab = m ? "윈도우 " + m[1] : w;
      if (!wins[lab]) { wins[lab] = 0; wk.push(lab); }
      wins[lab]++;
    });
    wk.sort(function (a, b) { return verNum(b) - verNum(a); });
    var named = rows.filter(function (r) { return cellv(r, 0); });
    var gen = named.filter(function (r) { return roomKind(cellv(r, 0)) === "일반교실"; }).length;
    return {
      groups: groups, total: total, gen: gen, spec: named.length - gen,
      wins: wk.map(function (k) { return [k, wins[k]]; }),
      hdmi: c.hdmi > -1 ? rows.filter(function (r) { var v = cellv(r, c.hdmi); return v && !/^(x|없음)$/i.test(v); }).length : -1,
      wired: c.wire > -1 ? rows.filter(function (r) { return cellv(r, c.wire) === "유선"; }).map(function (r) { return cellv(r, 0); }) : []
    };
  }
  function statsLine(st) {
    var bits = ["일반교실 " + st.gen + "곳", "특수교실 " + st.spec + "곳"].concat(st.wins.map(function (w) { return w[0] + " " + w[1] + "대"; }));
    if (st.hdmi > -1) bits.push("HDMI로 PC·노트북 연결 " + st.hdmi + "곳");
    if (st.wired.length) bits.push("유선 연결 " + st.wired.join(", "));
    return bits.join(" · ");
  }
  function statsHTML(e, rows, live) {
    var st = boardStats(e.table, rows);
    var canUp = state.canWrite && !live && !state.reorder;
    var body = st.groups.map(function (x) {
      var k = upKey(x.co, x.and), v = upVal(e, k), dirty = v !== upSaved(e, k);
      var cell = canUp
        ? '<select class="upg' + (dirty ? " dirty" : "") + '" data-eid="' + esc(e.id) + '" data-key="' + esc(k) + '" aria-label="' + esc(x.co + " " + x.and) + ' 업그레이드 가능">' +
            [["", "–"], ["가", "가능"], ["부", "불가"]].map(function (o) {
              return '<option value="' + o[0] + '"' + (o[0] === v ? " selected" : "") + ">" + o[1] + "</option>";
            }).join("") + "</select>"
        : '<span class="upv' + (v === "가" ? " yes" : "") + '">' + esc(upLabel(v) || "–") + "</span>";
      return "<tr><td>" + esc(x.co) + "</td><td>" + esc(x.and || "–") + "</td><td>" + esc(x.ops || "–") + '</td><td class="num">' + x.n + "</td><td>" + cell + "</td></tr>";
    }).join("");
    var line = statsLine(st);
    return '<div class="stats" id="stats-' + esc(e.id) + '">' +
      '<p class="label">기종별 통계</p>' +
      '<div class="tbl"><table class="stbl"><thead><tr><th>회사</th><th>안드로이드</th><th>OPS</th><th class="num">대수</th><th>업그레이드</th></tr></thead>' +
      "<tbody>" + body + "</tbody>" +
      '<tfoot><tr><td colspan="3">계</td><td class="num">' + st.total + "</td><td></td></tr></tfoot></table></div>" +
      (line ? '<p class="sline">' + esc(line) + "</p>" : "") +
    "</div>";
  }

  // 표 고치기 칸 너비: 열 내용 길이에 맞추고 비고 열만 넓게 (엑셀처럼)
  function textEm(s) {
    s = String(s == null ? "" : s);
    var w = 0;
    for (var k = 0; k < s.length; k++) w += s.charCodeAt(k) > 0x2e7f ? 1 : 0.6;
    return w;
  }
  function colWidths(cols, rows, n) {
    var out = [];
    for (var j = 0; j < n; j++) {
      var w = Math.min(textEm(cols[j] || ""), 6);
      rows.forEach(function (r) { var x = textEm(r[j]); if (x > w) w = x; });
      var note = cols[j] === "비고";
      out.push(Math.min(note ? 22 : (w > 14 ? 26 : 12), Math.max(note ? 14 : 2.6, w + 1.4)));
    }
    return out;
  }
  // 줄이 많고 칸이 짧은 표는 엑셀처럼(머리줄·첫 열 고정) 보여 준다
  function isSheet(t) {
    var rows = (t && t.rows) || [];
    if (rows.length < 10) return false;
    for (var a = 0; a < rows.length; a++) for (var b = 0; b < rows[a].length; b++) if (String(rows[a][b] == null ? "" : rows[a][b]).length > 60) return false;
    return true;
  }
  // 층 열이 있으면 짝수 층은 회색 줄, 층이 바뀌는 줄은 굵은 선
  function floorBands(cols, rows) {
    var k = cols.indexOf("층");
    if (k < 0) return null;
    var prev = null, gray = true;
    return rows.map(function (r, i) {
      var f = cellv(r, k), c = [];
      if (i === 0 || f !== prev) { gray = !gray; if (i > 0) c.push("fstart"); }
      if (gray) c.push("band");
      prev = f;
      return c.join(" ");
    });
  }
  function cloneLogs(L) {
    var o = {};
    Object.keys(L || {}).forEach(function (k) { o[k] = (L[k] || []).map(copyObj); });
    return o;
  }
  function roomLogs(e, room) {
    var L = ((e.table && e.table.logs) || {})[room] || [];
    return L.map(function (l, i) { return { room: room, i: i, d: l.d || "", k: l.k || "기타", t: l.t || "" }; })
      .sort(function (a, b) { return a.d < b.d ? 1 : a.d > b.d ? -1 : b.i - a.i; });
  }
  function allLogs(e) {
    var L = (e.table && e.table.logs) || {}, out = [];
    Object.keys(L).forEach(function (room) { out = out.concat(roomLogs(e, room)); });
    return out.sort(function (a, b) { return a.d < b.d ? 1 : a.d > b.d ? -1 : 0; });
  }
  function logsText(e) {
    return allLogs(e).map(function (l) { return l.room + " " + l.k + " " + l.t; }).join(" ");
  }
  function kindBadge(k) { return '<span class="kind" style="--kc: ' + (LOG_COLOR[k] || "var(--s-routine)") + '">' + esc(k) + "</span>"; }
  // 기종에 맞는 A/S 연락처를 ‘업체·A/S 연락처 모음’ 표에서 찾는다
  function asContact(co) {
    var key = company(co);
    if (!key || key === "미확인") return null;
    for (var a = 0; a < ENTRIES.length; a++) {
      var t = ENTRIES[a].table;
      if (!t || (t.cols || []).indexOf("번호") < 0) continue;
      var nk = t.cols.indexOf("번호");
      for (var b = 0; b < (t.rows || []).length; b++) {
        var r = t.rows[b], who = String(r[0] || "");
        if (/A\/S/i.test(who) && who.indexOf(key) > -1 && r[nk]) return { who: who, num: String(r[nk]) };
      }
    }
    return null;
  }
  function recentHTML(e) {
    var L = allLogs(e).slice(0, 5);
    if (!L.length) return "";
    return '<div class="sec"><p class="label">최근 기록</p><ul class="logs">' +
      L.map(function (l) {
        return '<li><button type="button" class="logrow" data-act="room" data-name="' + esc(l.room) + '">' +
          '<span class="ld">' + esc(l.d) + "</span>" + kindBadge(l.k) + '<span class="rn">' + esc(l.room) + '</span><span class="lt">' + esc(l.t) + "</span></button></li>";
      }).join("") + "</ul></div>";
  }
  function roomHTML(e) {
    var t = e.table, name = state.room, cols = t.cols || [];
    var board = isBoard(t);
    var row = null, ri = -1;
    (t.rows || []).forEach(function (r, i) { if (!row && cellv(r, 0) === name) { row = r; ri = i; } });
    var nc = cols.indexOf("비고");
    var info;
    if (!row) {
      info = '<p class="none">표에 없습니다.</p>';
    } else if (state.roomEdit && state.canWrite) {
      // 이 줄만 고치기: 같은 열에 있는 값은 목록에서 고를 수 있다
      info = '<form class="redit" id="roomform" novalidate>' + cols.map(function (h, j) {
        var v = cellv(row, j);
        if (j === nc) { var nv0 = noteVal(e.id, ri); if (nv0 !== undefined) v = nv0; }
        var opts = {};
        if (board && j > 0 && j !== nc) (t.rows || []).forEach(function (r) { var x = cellv(r, j); if (x) opts[x] = 1; });
        var keys = Object.keys(opts).sort();
        var dl = keys.length ? '<datalist id="re-dl-' + j + '">' + keys.map(function (o) { return '<option value="' + esc(o) + '">'; }).join("") + "</datalist>" : "";
        return '<label class="rf' + (j === nc ? " wide" : "") + '" for="re-' + j + '"><span>' + esc(h) + "</span>" +
          '<input type="text" id="re-' + j + '" value="' + esc(v) + '" autocomplete="off"' + (dl ? ' list="re-dl-' + j + '"' : "") + "></label>" + dl;
      }).join("") +
        '<p class="ed-err" id="re-err" hidden></p>' +
        '<div class="ed-acts"><button type="submit" class="btn primary"' + (state.saving ? " disabled" : "") + ">" + (state.saving ? "저장 중…" : "저장") + "</button>" +
          '<button type="button" class="btn" data-act="room-edit-cancel">취소</button></div>' +
      "</form>";
    } else {
      info = '<dl class="rinfo">' + (board ? "<div><dt>구분</dt><dd>" + roomKind(name) + "</dd></div>" : "") + cols.map(function (h, j) {
        if (j === 0) return "";
        var v = cellv(row, j);
        if (j === nc) { var nv = noteVal(e.id, ri); if (nv !== undefined) v = nv; }
        return "<div><dt>" + esc(h) + "</dt><dd>" + esc(v || "–") + "</dd></div>";
      }).join("") + "</dl>";
    }
    var as = !row ? null : board ? asContact(cellv(row, boardCols(cols).co)) : (e.contact && e.contact.num ? { who: e.contact.who || "연락처", num: e.contact.num } : null);
    var asHtml = as
      ? '<div class="contact"><span class="who">' + esc(as.who) + '</span><span class="num">' + esc(as.num) + "</span>" +
          '<button type="button" class="copy" data-copy="' + esc(as.num) + '">번호 복사</button></div>'
      : "";
    var logs = roomLogs(e, name);
    var list = logs.length
      ? '<ul class="logs">' + logs.map(function (l) {
          var del = "";
          if (state.canWrite) {
            del = state.logDel === name + "|" + l.i
              ? '<span class="confirm">삭제할까요?<button type="button" class="act yes" data-act="log-del-yes" data-i="' + l.i + '">삭제</button>' +
                  '<button type="button" class="act" data-act="log-del-no">취소</button></span>'
              : '<button type="button" class="act del" data-act="log-del" data-i="' + l.i + '" aria-label="이 기록 삭제">×</button>';
          }
          return '<li class="log"><span class="ld">' + esc(l.d) + "</span>" + kindBadge(l.k) + '<span class="lt">' + esc(l.t) + "</span>" + del + "</li>";
        }).join("") + "</ul>"
      : '<p class="none">아직 기록이 없습니다.</p>';
    var form = state.canWrite
      ? '<form class="logform" id="logform" novalidate>' +
          '<div class="lrow"><input type="date" id="lg-d" value="' + esc(today()) + '" aria-label="날짜">' +
            '<select id="lg-k" aria-label="구분">' + LOG_KINDS.map(function (k) { return "<option>" + esc(k) + "</option>"; }).join("") + "</select></div>" +
          '<input type="text" id="lg-t" autocomplete="off" placeholder="' + (board ? "예: 화면이 안 켜짐 → A/S 접수" : "예: 3번 칸 충전 안 됨 → 케이블 교체") + '" aria-label="기록 내용">' +
          '<p class="ed-err" id="lg-err" hidden></p>' +
          '<button type="submit" class="btn primary"' + (state.saving ? " disabled" : "") + ">" + (state.saving ? "저장 중…" : "기록 남기기") + "</button>" +
        "</form>"
      : "";
    return '<div class="room" id="room-panel">' +
      '<div class="rhead"><p class="rname">' + esc(name) + "<small>" + esc(board ? "교실 관리" : (typeof t.rooms === "string" ? t.rooms : "관리")) + '</small></p><span class="racts">' +
        (row && state.canWrite && !state.roomEdit ? '<button type="button" class="act" data-act="room-edit">정보 고치기</button>' : "") +
        '<button type="button" class="act" data-act="room-close">닫기</button></span></div>' +
      info + asHtml +
      '<div class="sec"><p class="label">오류·A/S 기록 ' + logs.length + "건</p>" + list + "</div>" + form +
    "</div>";
  }
  // 저장하지 않은 비고·업그레이드 변경을 반영한 표 사본
  function pendingTable(e) {
    var t = copyObj(e.table || {});
    var nc = (t.cols || []).indexOf("비고");
    t.rows = (t.rows || []).map(function (r, ri) {
      var c = r.slice(), nv = noteVal(e.id, ri);
      if (nv !== undefined && nc > -1) { while (c.length <= nc) c.push(""); c[nc] = nv.trim(); }
      return c;
    });
    var pu = state.upg[e.id];
    if (pu) {
      t.upgrade = copyObj(t.upgrade || {});
      Object.keys(pu).forEach(function (k) { if (pu[k]) t.upgrade[k] = pu[k]; else delete t.upgrade[k]; });
    }
    return t;
  }
  function saveTable(e, t, msg) {
    var n = copyObj(e);
    n.table = t;
    persist(ENTRIES.map(function (x) { return x.id === e.id ? n : x; }), msg);
  }

  function tableHTML(e, ts) {
    var t = e.table;
    var cols = t.cols || [];
    var title = esc(t.title || "목록");
    var grid = isBoard(t);
    var sheet = grid || isSheet(t);
    var rooms = grid || !!t.rooms;
    if (state.tableEdit === e.id && state.tableDraft) {
      var n = tableCols(e);
      var wds = colWidths(cols, state.tableDraft, n);
      var ebands = floorBands(cols, state.tableDraft);
      return '<div class="sec"><div class="lhead"><p class="label">' + title + " · 고치는 중</p></div>" +
        '<div class="tbl sheet editing' + (grid ? " grid" : "") + '"><table class="tedit">' +
        (cols.length ? "<thead><tr>" + cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "<th></th></tr></thead>" : "") +
        "<tbody>" + state.tableDraft.map(function (r, i) {
          var cells = "";
          for (var j = 0; j < n; j++) {
            cells += '<td><input type="text" id="t-' + i + "-" + j + '" value="' + esc(r[j] || "") + '"' +
              (wds ? ' style="width: ' + wds[j].toFixed(1) + 'em"' : "") + ' autocomplete="off" aria-label="' + esc(cols[j] || "칸") + '"></td>';
          }
          return "<tr" + (ebands && ebands[i] ? ' class="' + ebands[i] + '"' : "") + ">" + cells + '<td><button type="button" class="act del" data-act="trow-del" data-id="' + esc(e.id) + '" data-row="' + i + '" aria-label="이 줄 삭제">×</button></td></tr>';
        }).join("") + "</tbody></table></div>" +
        (grid ? statsHTML(e, state.tableDraft, true) : "") +
        '<div class="ed-acts">' +
          '<button type="button" class="add" data-act="trow-add" data-id="' + esc(e.id) + '">+ 줄 추가</button>' +
          '<button type="button" class="btn primary" data-act="tsave" data-id="' + esc(e.id) + '"' + (state.saving ? " disabled" : "") + ">" + (state.saving ? "저장 중…" : "표 저장") + "</button>" +
          '<button type="button" class="btn" data-act="tcancel">취소</button>' +
        "</div></div>";
    }
    var btn = state.canWrite && !state.reorder && !state.tableEdit
      ? '<button type="button" class="act" data-act="tedit" data-id="' + esc(e.id) + '">표 고치기</button>' : "";
    var xbtn = state.canDownload && !state.tableEdit
      ? '<button type="button" class="act xl" data-act="xlsx" data-id="' + esc(e.id) + '">엑셀 받기</button>' : "";
    // 비고 칸은 표 고치기 없이 바로 고친다 (여러 칸 고친 뒤 한 번에 저장)
    var nc = cols.indexOf("비고");
    var noteOn = state.canWrite && !state.reorder && !state.tableEdit && nc > -1;
    var barOn = state.canWrite && !state.reorder && !state.tableEdit && (nc > -1 || grid);
    var nbar = barOn ? '<div class="nbar" id="nbar-' + esc(e.id) + '">' + nbarHTML(e) + "</div>" : "";
    var head = cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + (rooms ? "<th>최근 기록</th>" : "");
    var bands = floorBands(cols, t.rows || []);
    var body = (t.rows || []).map(function (r, i) {
      var n = Math.max(r.length, noteOn ? nc + 1 : 0, rooms ? cols.length : 0);
      var name = cellv(r, 0);
      var cells = "";
      for (var j = 0; j < n; j++) {
        var c = r[j];
        if (noteOn && j === nc) {
          var dv = noteVal(e.id, i);
          var v = dv === undefined ? (c == null ? "" : String(c)) : dv;
          cells += '<td class="notecell"><input type="text" class="note-in' + (dv === undefined ? "" : " dirty") + '"' +
            ' id="n-' + esc(e.id) + "-" + i + '" data-eid="' + esc(e.id) + '" data-row="' + i + '"' +
            ' value="' + esc(v) + '" placeholder="비고" autocomplete="off" enterkeyhint="next"' +
            ' aria-label="' + esc(name + " 비고") + '"></td>';
        } else if (rooms && j === 0) {
          cells += '<td><button type="button" class="roomlink" data-act="room" data-name="' + esc(name) + '" title="' + esc(name) + ' 교실 관리">' + rich(c, ts) + "</button></td>";
        } else {
          var wired = cols[j] === "유선/무선" && String(c || "").trim() === "유선";
          cells += "<td" + (wired ? ' class="wired"' : "") + ">" + rich(c, ts) + "</td>";
        }
      }
      if (rooms) {
        var last = roomLogs(e, name)[0];
        cells += '<td class="lastlog">' + (last
          ? '<button type="button" class="roomlink sub" data-act="room" data-name="' + esc(name) + '"><span class="ld">' + esc(String(last.d).slice(5)) + "</span>" +
              kindBadge(last.k) + '<span class="lt">' + hl(last.t, ts) + "</span></button>"
          : "") + "</td>";
      }
      var rc = ((bands && bands[i]) || "") + (rooms && state.room === name ? " sel" : "");
      return "<tr" + (rc.trim() ? ' class="' + rc.trim() + '"' : "") + ">" + cells + "</tr>";
    }).join("");
    return '<div class="sec"><div class="lhead"><p class="label">' + title + "</p>" +
      (btn || xbtn ? '<span class="tacts">' + xbtn + btn + "</span>" : "") + "</div>" + nbar +
      (rooms ? recentHTML(e) : "") +
      '<div class="tbl' + (sheet ? " sheet" : "") + (grid ? " grid" : "") + '"><table>' +
      (cols.length ? "<thead><tr>" + head + "</tr></thead>" : "") +
      "<tbody>" + body + "</tbody></table></div>" +
      (grid ? statsHTML(e, t.rows || [], false) : "") +
      (rooms && state.room ? roomHTML(e) : "") +
    "</div>";
  }
  function noteVal(eid, i) {
    var m = state.notes[eid];
    return m && Object.prototype.hasOwnProperty.call(m, i) ? m[i] : undefined;
  }
  function noteCount(eid) { return Object.keys(state.notes[eid] || {}).length; }
  function nbarHTML(e) {
    var n = noteCount(e.id) + upCount(e.id);
    if (!n) return "";
    return "<span><b>" + n + "곳</b>을 고쳤어요. 저장해야 반영됩니다.</span>" +
      '<button type="button" class="add solid" data-act="note-save" data-id="' + esc(e.id) + '"' + (state.saving ? " disabled" : "") + ">" +
        (state.saving ? "저장 중…" : "저장") + "</button>" +
      '<button type="button" class="add" data-act="note-reset" data-id="' + esc(e.id) + '">되돌리기</button>';
  }
  function readTableDraft() {
    if (!state.tableEdit || !state.tableDraft) return;
    var e = findEntry(state.tableEdit);
    if (!e) return;
    var n = tableCols(e);
    for (var i = 0; i < state.tableDraft.length; i++) {
      for (var j = 0; j < n; j++) {
        var el = document.getElementById("t-" + i + "-" + j);
        if (el && typeof el.value === "string") state.tableDraft[i][j] = el.value;
      }
    }
  }

  function acts(e) {
    if (!state.canWrite || state.reorder) return "";
    if (state.confirmDel === e.id) {
      return '<span class="confirm">삭제할까요?' +
        '<button type="button" class="act yes" data-act="del-yes" data-id="' + esc(e.id) + '">삭제</button>' +
        '<button type="button" class="act" data-act="del-no">취소</button></span>';
    }
    return '<span class="acts">' +
      '<button type="button" class="act" data-act="edit" data-id="' + esc(e.id) + '">수정</button>' +
      '<button type="button" class="act del" data-act="del" data-id="' + esc(e.id) + '">삭제</button></span>';
  }

  function badges(e) {
    return (e.important ? '<span class="imp-badge">중요</span>' : "") +
      '<span class="cat" style="--cc: var(--c-' + esc(e.cat) + ')">' + esc(CAT_LABEL[e.cat] || "기타") + "</span>" +
      '<span class="status" style="--sc: var(--s-' + esc(e.status) + ')">' + esc(STATUS[e.status] || "해결") + "</span>";
  }
  // 검색어가 제목이 아니라 본문에서 맞으면, 맞은 줄을 목록에 한 줄 보여 준다.
  function snippet(e, ts) {
    if (!ts.length) return "";
    var head = (String(e.symptom || "") + " " + String(e.device || "")).toLowerCase();
    var hit = function (s) { return ts.some(function (t) { return expand(t).some(function (x) { return s.indexOf(x) > -1; }); }); };
    if (ts.every(function (t) { return expand(t).some(function (x) { return head.indexOf(x) > -1; }); })) return "";
    var pool = [].concat(e.steps || [], e.memo || [], e.prep || [],
      (e.attachments || []).map(function (a) { return "첨부: " + a.name; }),
      (e.links || []).map(function (l) { return (l.label || "") + " " + (l.note || ""); }),
      e.table ? (e.table.rows || []).map(function (r) { return r.filter(function (c) { return c; }).join(" · "); }) : [],
      e.table && e.table.logs ? allLogs(e).map(function (l) { return "기록 " + l.d + " " + l.room + " [" + l.k + "] " + l.t; }) : [],
      (e.secrets || []).map(function (s) { return s.label; }),
      e.contact ? [(e.contact.who || "") + " " + (e.contact.num || "")] : []);
    for (var i = 0; i < pool.length; i++) {
      var s = String(pool[i] || "");
      if (hit(s.toLowerCase())) return '<span class="rsnip">' + rich(s, ts) + "</span>";
    }
    return "";
  }
  function rowHTML(e, ts) {
    var n = attCount(e);
    return '<button type="button" class="row" data-act="open" data-id="' + esc(e.id) + '">' +
      '<span class="meta">' + badges(e) +
        (n ? '<span class="clip" title="첨부 ' + n + '개">' + CLIP + n + "</span>" : "") +
        '<span class="rgo"><span class="date" title="확인일">' + esc(e.checked) + "</span>" + GO + "</span>" +
      "</span>" +
      '<span class="rtitle">' + rich(e.symptom, ts) + "</span>" +
      (e.device ? '<span class="rdev">' + rich(e.device, ts) + "</span>" : "") +
      snippet(e, ts) +
    "</button>";
  }

  function detailHTML(e, ts) {
    var nav = visibleList(ts), i = nav.indexOf(e);
    if (i < 0) { nav = ENTRIES; i = nav.indexOf(e); }
    var prev = i > 0 ? nav[i - 1] : null;
    var next = i > -1 && i < nav.length - 1 ? nav[i + 1] : null;
    var navOn = !state.tableEdit;
    var prep = (e.prep && e.prep.length)
      ? '<div class="sec"><p class="label">준비물</p><ul class="prep">' + e.prep.map(function (p) { return "<li>" + rich(p, ts) + "</li>"; }).join("") + "</ul></div>"
      : "";
    var steps = (e.steps && e.steps.length) ? '<ol class="steps">' + e.steps.map(function (s) { return "<li><span>" + rich(s, ts) + "</span></li>"; }).join("") + "</ol>" : "";
    if (e.keys && e.keys.length) {
      steps += '<div class="keys" aria-label="리모컨 볼륨 버튼 누르는 순서"><span class="cap">전원 버튼 쪽을 향해 리모컨 볼륨 버튼 순서대로</span>' +
        e.keys.map(function (g) {
          var caps = "";
          for (var i = 0; i < g[1]; i++) caps += '<span class="key">' + esc(g[0]) + "</span>";
          return caps;
        }).join('<span class="sep" aria-hidden="true"></span>') + "</div>";
    }
    steps = steps ? '<div class="sec"><p class="label">해결 순서</p>' + steps + "</div>" : "";
    var memo = (e.memo && e.memo.length)
      ? '<div class="sec"><p class="label">메모</p><ul class="memo">' + e.memo.map(function (m) { return "<li>" + rich(m, ts) + "</li>"; }).join("") + "</ul></div>"
      : "";
    var secret = e.secrets && e.secrets.length
      ? '<div class="sec"><p class="label">보관 정보</p>' + e.secrets.map(function (s) {
          return '<div class="secret">' + LOCK + '<span class="slabel">' + rich(s.label, ts) + "</span>" +
            (s.value
              ? '<span class="pwval">' + hl(s.value, ts) + '</span><button type="button" class="copy" data-copy="' + esc(s.value) + '">복사</button>'
              : '<span class="tag">별도 보관</span>') +
            "</div>";
        }).join("") + "</div>"
      : "";
    var contact = e.contact && e.contact.num
      ? '<div class="sec"><p class="label">연락처</p><div class="contact">' +
          '<span class="who">' + rich(e.contact.who, ts) + "</span>" +
          '<span class="num">' + esc(e.contact.num) + "</span>" +
          (e.contact.ext ? '<span class="ext">' + rich(e.contact.ext, ts) + "</span>" : "") +
          '<button type="button" class="copy" data-copy="' + esc(e.contact.num) + '">번호 복사</button>' +
        "</div></div>"
      : "";
    var image = e.image && e.image.src
      ? '<div class="sec"><p class="label">' + esc(e.image.caption || "첨부 사진") + '</p><img class="sheet" src="' + esc(e.image.src) + '" alt="' + esc(e.image.caption || "첨부 사진") + '" loading="lazy"></div>'
      : "";
    var body = contact + prep + steps + attachHTML(e, ts) + linksHTML(e.links, ts) +
      (e.codes && e.codes.length ? codeGrid(e.codes, ts) : "") +
      (e.table && ((e.table.rows && e.table.rows.length) || state.tableEdit === e.id) ? tableHTML(e, ts) : "") +
      image + memo + secret;
    if (!body) body = '<p class="none">적힌 내용이 없습니다.</p>';
    var top = navOn
      ? '<div class="backbar"><button type="button" class="back" data-act="list">' + BACK + "목록</button>" +
          (i > -1 ? '<span class="pos">' + (i + 1) + " / " + nav.length + "</span>" : "") + "</div>"
      : "";
    var art = '<article class="article' + (e.important ? " imp" : "") + '" data-id="' + esc(e.id) + '">' +
      '<div class="ahead">' +
        '<div class="meta">' + badges(e) +
          '<span class="right"><span class="date" title="확인일">' + esc(e.checked) + "</span>" +
            '<button type="button" class="act print" data-act="print">인쇄</button>' + acts(e) + "</span>" +
        "</div>" +
        '<h2 class="symptom" tabindex="-1">' + rich(e.symptom, ts) + "</h2>" +
        (e.device ? '<p class="device">' + rich(e.device, ts) + "</p>" : "") +
      "</div>" +
      '<div class="body">' + body + "</div>" +
    "</article>";
    var pager = navOn
      ? '<div class="pager">' +
          '<button type="button" class="back" data-act="go"' + (prev ? ' data-id="' + esc(prev.id) + '" title="' + esc(prev.symptom) + '"' : " disabled") + ">‹ 이전 글</button>" +
          '<button type="button" class="back" data-act="list">목록</button>' +
          '<button type="button" class="back" data-act="go"' + (next ? ' data-id="' + esc(next.id) + '" title="' + esc(next.symptom) + '"' : " disabled") + ">다음 글 ›</button>" +
        "</div>"
      : "";
    return top + art + pager;
  }

  /* ---------- editor ---------- */
  function fromEntry(e) {
    var c = e.contact || {};
    return {
      cat: e.cat || "etc", status: e.status || "done", imp: !!e.important,
      symptom: e.symptom || "", device: e.device || "",
      prep: (e.prep || []).join("\n"), steps: (e.steps || []).join("\n"), memo: (e.memo || []).join("\n"),
      codes: (e.codes || []).map(function (x) { return x.join(" "); }).join("\n"),
      table: e.table ? [(e.table.cols || []).join(" | ")].concat((e.table.rows || []).map(function (r) { return r.join(" | "); })).join("\n") : "",
      secrets: (e.secrets || []).map(function (s) { return s.value ? s.label + " | " + s.value : s.label; }).join("\n"),
      links: (e.links || []).map(function (l) { return [l.label || "", l.url || "", l.note || ""].join(" | ").replace(/( \| )+$/, ""); }).join("\n"),
      cname: c.who || "", cnum: c.num || "", cext: c.ext || "",
      kw: (e.keywords || []).join(", "), checked: e.checked || today(), noimg: false
    };
  }
  function blankEntry() {
    return { id: NEW, cat: state.cat !== "all" ? state.cat : "etc", status: "done", symptom: "", steps: [], checked: today() };
  }
  function readForm() {
    var f = document.getElementById("editor");
    if (!f) return null;
    function v(id) { var el = document.getElementById(id); return el ? el.value : ""; }
    function ck(id) { var el = document.getElementById(id); return el ? el.checked : false; }
    return {
      cat: v("f-cat"), status: v("f-status"), imp: ck("f-imp"),
      symptom: v("f-symptom"), device: v("f-device"),
      prep: v("f-prep"), steps: v("f-steps"), memo: v("f-memo"), codes: v("f-codes"), table: v("f-table"),
      secrets: v("f-secrets"), links: v("f-links"), cname: v("f-cname"), cnum: v("f-cnum"), cext: v("f-cext"),
      kw: v("f-kw"), checked: v("f-checked"), noimg: ck("f-noimg")
    };
  }
  function opt(list, cur) {
    return list.map(function (o) {
      return '<option value="' + esc(o[0]) + '"' + (o[0] === cur ? " selected" : "") + ">" + esc(o[1]) + "</option>";
    }).join("");
  }
  function editorHTML(e) {
    var d = state.draft || fromEntry(e);
    var isNew = e.id === NEW;
    var catOpts = CATS.filter(function (c) { return c.key !== "all"; }).map(function (c) { return [c.key, c.label]; });
    var stOpts = Object.keys(STATUS).map(function (k) { return [k, STATUS[k]]; });
    var hasCodes = !!(e.codes && e.codes.length);
    var hasImg = !!(e.image && e.image.src);
    var hasTable = !!e.table;
    var basic =
      '<div class="row2">' +
        '<label for="f-cat">분류<select id="f-cat">' + opt(catOpts, d.cat) + "</select></label>" +
        '<label for="f-status">상태<select id="f-status">' + opt(stOpts, d.status) + "</select></label>" +
      "</div>" +
      '<label for="f-symptom">제목 (증상)<input type="text" id="f-symptom" value="' + esc(d.symptom) + '" placeholder="예: 3학년 2반 전자칠판 소리가 안 날 때"></label>' +
      '<label for="f-steps">내용 · 해결 순서 <small>한 줄에 한 단계</small><textarea id="f-steps" rows="7">' + esc(d.steps) + "</textarea></label>" +
      '<div class="sec"><p class="label">사진 · 파일 첨부</p>' +
        (ASSETS
          ? '<div class="drop" id="f-drop" tabindex="0" aria-label="첨부 칸: 캡처한 그림을 붙여 넣거나 파일을 끌어다 놓으세요">' +
              '<div class="dbtns"><button type="button" class="add solid" data-act="pick">+ 파일 선택</button>' +
                '<span class="dhint">캡처 <b>Ctrl+V</b></span></div>' +
              '<ul class="atts" id="f-atts">' + attEditList() + "</ul>" +
              '<input type="file" id="f-file" multiple hidden>' +
            "</div>"
          : '<p class="none">이 화면에서는 파일을 올릴 수 없어요. 페이지를 새로 불러온 뒤 다시 해 보세요.</p>' +
            '<ul class="atts" id="f-atts">' + attEditList() + "</ul>") +
      "</div>" +
      '<label for="f-memo">메모 <small>한 줄에 하나</small><textarea id="f-memo" rows="3">' + esc(d.memo) + "</textarea></label>";
    var more =
      '<label class="chk" for="f-imp"><input type="checkbox" id="f-imp"' + (d.imp ? " checked" : "") + "> 중요 · 맨 위에 고정</label>" +
      '<label for="f-device">기기·대상<input type="text" id="f-device" value="' + esc(d.device) + '"></label>' +
      '<label for="f-prep">준비물 <small>한 줄에 하나</small><textarea id="f-prep" rows="2">' + esc(d.prep) + "</textarea></label>" +
      '<label for="f-links">다운로드·링크 <small>한 줄에 ‘이름 | 주소 | 설명’ · 주소는 https:// 로 시작</small><textarea id="f-links" rows="2">' + esc(d.links) + "</textarea></label>" +
      (hasTable ? '<label for="f-table">표 <small>첫 줄은 제목 줄, 칸은 | 로 구분</small><textarea id="f-table" rows="10">' + esc(d.table) + "</textarea></label>" : "") +
      (hasCodes ? '<label for="f-codes">반별 비밀번호 <small>한 줄에 ‘반 비밀번호’ (예: 101 1001)</small><textarea id="f-codes" rows="9">' + esc(d.codes) + "</textarea></label>" : "") +
      '<label for="f-secrets">보관 정보 <small>한 줄에 ‘이름 | 비밀번호’ · 비밀번호를 비우면 ‘별도 보관’</small><textarea id="f-secrets" rows="2">' + esc(d.secrets) + "</textarea></label>" +
      '<div class="row3">' +
        '<label for="f-cname">연락처 이름<input type="text" id="f-cname" value="' + esc(d.cname) + '"></label>' +
        '<label for="f-cnum">전화번호<input type="text" id="f-cnum" inputmode="tel" value="' + esc(d.cnum) + '"></label>' +
        '<label for="f-cext">내선<input type="text" id="f-cext" value="' + esc(d.cext) + '"></label>' +
      "</div>" +
      '<label for="f-kw">검색어 <small>쉼표로 구분</small><input type="text" id="f-kw" value="' + esc(d.kw) + '"></label>' +
      '<label for="f-checked">확인일<input type="date" id="f-checked" value="' + esc(d.checked) + '"></label>' +
      (hasImg ? '<label class="chk" for="f-noimg"><input type="checkbox" id="f-noimg"' + (d.noimg ? " checked" : "") + "> 첨부 사진 빼기</label>" : "");
    return '<form class="editor" id="editor" data-id="' + esc(e.id) + '" novalidate>' +
      '<p class="ed-title">' + (isNew ? "새로 입력" : "항목 수정") + "</p>" +
      basic +
      (isNew
        ? '<details class="more"><summary>기기·준비물·링크·연락처·비밀번호 더 넣기</summary><div class="more-body">' + more + "</div></details>"
        : more) +
      '<p class="ed-err" id="f-err" hidden></p>' +
      '<div class="ed-acts">' +
        '<button type="submit" class="btn primary"' + (state.saving ? " disabled" : "") + ">" + (state.saving ? "저장 중…" : "저장") + "</button>" +
        '<button type="button" class="btn" data-act="cancel">취소</button>' +
      "</div>" +
    "</form>";
  }
  function parseCodes(text) {
    return lines(text).map(function (l) { return l.split(/[\s,\t:]+/).filter(Boolean); })
      .filter(function (p) { return p.length >= 2; })
      .map(function (p) { return [p[0], p[1]]; });
  }
  function buildEntry(base, v) {
    var n = copyObj(base);
    if (n.id === NEW) n.id = "e-" + Date.now().toString(36);
    n.cat = CAT_LABEL[v.cat] && v.cat !== "all" ? v.cat : "etc";
    n.status = STATUS[v.status] ? v.status : "done";
    if (v.imp) n.important = true; else delete n.important;
    n.symptom = v.symptom.trim();
    if (v.device.trim()) n.device = v.device.trim(); else delete n.device;
    n.prep = lines(v.prep);
    n.steps = lines(v.steps);
    n.memo = lines(v.memo);
    if (base.codes && base.codes.length) {
      var codes = parseCodes(v.codes);
      if (codes.length) n.codes = codes; else delete n.codes;
    }
    if (base.table) {
      var tl = lines(v.table).map(function (l) { return l.split("|").map(function (c) { return c.trim(); }); });
      if (tl.length > 1) { n.table = copyObj(base.table); n.table.cols = tl[0]; n.table.rows = tl.slice(1); }
      else if (tl.length === 1) { n.table = copyObj(base.table); n.table.cols = []; n.table.rows = tl; }
      else delete n.table;
    }
    delete n.secret;
    var secs = lines(v.secrets).map(function (l) {
      var i = l.indexOf("|");
      return i < 0 ? { label: l, value: "" } : { label: l.slice(0, i).trim(), value: l.slice(i + 1).trim() };
    }).filter(function (s) { return s.label || s.value; });
    if (secs.length) n.secrets = secs; else delete n.secrets;
    var lk = lines(v.links).map(function (l) {
      var p = l.split("|").map(function (x) { return x.trim(); });
      var url = p.filter(function (x) { return /^https?:\/\//i.test(x); })[0] || "";
      var rest = p.filter(function (x) { return x !== url; });
      return { label: rest[0] || url, url: url, note: rest.slice(1).join(" · ") };
    }).filter(function (l) { return l.url; });
    if (lk.length) n.links = lk; else delete n.links;
    if (v.cnum.trim()) n.contact = { who: v.cname.trim(), num: v.cnum.trim(), ext: v.cext.trim() }; else delete n.contact;
    var kw = v.kw.split(/[,，]/).map(function (x) { return x.trim(); }).filter(Boolean);
    if (kw.length) n.keywords = kw; else delete n.keywords;
    n.checked = /^\d{4}-\d{2}-\d{2}$/.test(v.checked) ? v.checked : today();
    if (v.noimg) delete n.image;
    if (state.att) {
      var att = state.att.filter(function (a) { return a.st === "ok" && a.id; }).map(function (a) {
        return { id: a.id, name: a.name, size: a.size, type: a.type, kind: a.kind, data: a.data };
      });
      if (att.length) n.attachments = att; else delete n.attachments;
    }
    return n;
  }

  /* ---------- saving: regenerate the whole page and publish it ---------- */
  function buildDoc(entries) {
    var css = CSS_TEXT;
    var app = APP_TEXT;
    var json = JSON.stringify(entries, null, 1).replace(/</g, "\\u003c");
    return SKELETON + "\n" + HEAD +
      '<style id="css">' + css + "</style>\n" +
      '<div id="root"></div>\n' +
      '<script type="application/json" id="data">' + json + "</scr" + "ipt>\n" +
      '<script id="app">' + app + "</scr" + "ipt>\n" +
      "</body></html>";
  }
  function persist(next, doneMsg, openAfter) {
    if (state.saving) return;
    state.saving = true;
    try {
      ENTRIES = next;
      localStorage.setItem(STORE_KEY, JSON.stringify(ENTRIES));
      state.openId = openAfter === undefined ? state.openId : openAfter;
      state.editing = null; state.draft = null; state.confirmDel = null;
      state.reorder = false; state.snapshot = null;
      state.saving = false;
      syncHash();
      render();
      toast(doneMsg);
    } catch (e) {
      state.saving = false;
      toast(e && e.name === "QuotaExceededError" ? "저장 공간이 꽉 차서 저장하지 못했습니다. 첨부 파일을 줄여 보세요." : "저장하지 못했습니다. 잠시 후 다시 해 보세요.");
      render();
    }
  }

  /* ---------- order ---------- */
  function visibleList(ts) {
    return ENTRIES.filter(function (e) { return matches(e, ts) && (state.cat === "all" || e.cat === state.cat); });
  }
  function orderRow(e, i, n) {
    return '<div class="orow' + (e.important ? " imp" : "") + '" data-id="' + esc(e.id) + '">' +
      '<span class="onum">' + (i + 1) + "</span>" +
      '<span class="otext"><span class="cat" style="--cc: var(--c-' + esc(e.cat) + ')">' + esc(CAT_LABEL[e.cat] || "기타") + "</span>" +
      '<span class="otitle">' + esc(e.symptom) + "</span></span>" +
      '<span class="obtns">' +
        '<button type="button" class="act" data-act="up" data-id="' + esc(e.id) + '" aria-label="위로"' + (i === 0 ? " disabled" : "") + ">↑</button>" +
        '<button type="button" class="act" data-act="down" data-id="' + esc(e.id) + '" aria-label="아래로"' + (i === n - 1 ? " disabled" : "") + ">↓</button>" +
      "</span></div>";
  }
  function moveEntry(id, dir) {
    var vis = visibleList(terms());
    var i = -1;
    for (var k = 0; k < vis.length; k++) if (vis[k].id === id) i = k;
    var j = i + dir;
    if (i < 0 || j < 0 || j >= vis.length) return false;
    var slots = vis.map(function (e) { return ENTRIES.indexOf(e); }).sort(function (a, b) { return a - b; });
    var nv = vis.slice(); var t = nv[i]; nv[i] = nv[j]; nv[j] = t;
    var next = ENTRIES.slice();
    slots.forEach(function (s, k2) { next[s] = nv[k2]; });
    ENTRIES = next;
    return true;
  }

  /* ---------- render ---------- */
  function render() {
    if (state.editing && document.getElementById("editor")) state.draft = readForm();
    if (state.tableEdit) readTableDraft();
    var ts = terms();
    var hits = ENTRIES.filter(function (e) { return matches(e, ts); });
    var counts = { all: hits.length };
    CATS.forEach(function (c) { if (c.key !== "all") counts[c.key] = 0; });
    hits.forEach(function (e) { counts[e.cat] = (counts[e.cat] || 0) + 1; });

    chipsEl.innerHTML = CATS.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c.key + '" aria-pressed="' + (state.cat === c.key) + '">' +
        esc(c.label) + '<span class="n">' + (counts[c.key] || 0) + "</span></button>";
    }).join("");

    var editE = state.editing ? (state.editing === NEW ? blankEntry() : findEntry(state.editing)) : null;
    if (state.editing && !editE) { state.editing = null; state.draft = null; endAtt(true); }
    var openE = state.openId ? findEntry(state.openId) : null;
    if (state.openId && !openE) state.openId = null;

    if (editE) {
      listEl.innerHTML = editorHTML(editE);
    } else if (openE && !state.reorder) {
      listEl.innerHTML = detailHTML(openE, ts);
    } else {
      listEl.innerHTML = listHTML(ts);
    }
    clearEl.hidden = !state.q;
    fabEl.hidden = !(state.canWrite && !state.editing && !state.reorder && !state.tableEdit && !state.saving);
  }

  function listHTML(ts) {
    var shown = visibleList(ts);

    var line;
    if (state.reorder) {
      line = "<b>순서 바꾸기</b> · ↑ ↓로 옮긴 뒤 ‘순서 저장’을 누르세요";
    } else if (ts.length) {
      line = "‘<b>" + esc(state.q.trim()) + "</b>’ 검색 결과 " + shown.length + "건" +
        (state.cat !== "all" ? " · " + esc(CAT_LABEL[state.cat]) : "");
    } else {
      line = (state.cat === "all" ? "전체" : esc(CAT_LABEL[state.cat])) + " " + shown.length + "건";
    }
    var tools = "";
    if (state.canWrite && state.reorder) {
      tools = '<button type="button" class="add solid" data-act="order-save"' + (state.saving ? " disabled" : "") + ">" + (state.saving ? "저장 중…" : "순서 저장") + "</button>" +
        '<button type="button" class="add" data-act="order-cancel">취소</button>';
    } else if (state.canWrite && !state.editing) {
      tools = '<button type="button" class="add" data-act="order">순서 바꾸기</button>' +
        '<button type="button" class="add" data-act="export">페이지 내보내기</button>' +
        '<button type="button" class="add" data-act="new">+ 새 항목</button>';
    }
    var head = '<div class="listhead"><p class="summary-line">' + line + "</p>" + tools + "</div>";

    var body = "";
    if (shown.length) {
      body = state.reorder
        ? shown.map(function (e, i) { return orderRow(e, i, shown.length); }).join("")
        : '<div class="board">' + shown.map(function (e) { return rowHTML(e, ts); }).join("") + "</div>";
    } else {
      if (ts.length) {
        body = '<div class="empty"><b>맞는 항목이 없습니다.</b><span>기기 이름이나 화면에 뜬 문구 그대로 다시 찾아보세요.' +
          (state.cat !== "all" ? " ‘전체’ 분류에서도 확인해 보세요." : "") + "</span></div>";
      } else {
        body = '<div class="empty"><b>' + esc(CAT_LABEL[state.cat]) + " 항목이 아직 없습니다.</b><span>해결한 사례가 생기면 증상·준비물·해결 순서를 정리해 여기에 추가합니다.</span></div>";
      }
    }
    return head + body;
  }

  /* ---------- list ↔ one entry ---------- */
  function syncHash() {
    try {
      var hh = state.openId || (state.cat !== "all" ? state.cat : "");
      history.replaceState(null, "", hh ? "#" + hh : location.pathname + location.search);
    } catch (e) {}
  }
  function toMainTop() {
    try {
      var bar = document.querySelector(".bar");
      var y = listEl.getBoundingClientRect().top + window.pageYOffset - (bar ? bar.offsetHeight : 0);
      if (window.pageYOffset > y) window.scrollTo(0, Math.max(0, y));
    } catch (e) {}
  }
  function openEntry(id) {
    if (!findEntry(id)) return;
    if (!state.openId) state.listY = window.pageYOffset || 0;
    state.openId = id; state.confirmDel = null; state.room = null; state.logDel = null; state.roomEdit = false;
    syncHash();
    render();
    toMainTop();
    var hd = listEl.querySelector(".article .symptom");
    if (hd) { try { hd.focus({ preventScroll: true }); } catch (e) {} }
  }
  function showList() {
    var was = state.openId;
    if (Object.keys(state.notes).length || Object.keys(state.upg).length) toast("저장하지 않고 고친 칸이 있어요. 그 글로 돌아가 [저장]을 눌러 주세요.");
    state.room = null; state.logDel = null; state.roomEdit = false;
    state.openId = null; state.confirmDel = null; state.tableEdit = null; state.tableDraft = null;
    syncHash();
    render();
    try { window.scrollTo(0, state.listY || 0); } catch (e) {}
    if (was) {
      var sel = window.CSS && CSS.escape ? CSS.escape(was) : was;
      var r = listEl.querySelector('.row[data-id="' + sel + '"]');
      if (r) { try { r.focus({ preventScroll: true }); } catch (e) {} }
    }
  }

  function stats() {
    var latest = ENTRIES.reduce(function (m, e) { return e.checked > m ? e.checked : m; }, "");
    statsEl.textContent = "전체 " + ENTRIES.length + "건" + (latest ? " · 마지막 확인 " + latest : "");
  }

  /* ---------- events ---------- */
  chipsEl.addEventListener("click", function (ev) {
    var b = ev.target.closest(".chip");
    if (!b) return;
    state.cat = b.getAttribute("data-cat");
    if (!state.editing && !state.tableEdit && state.openId) { state.openId = null; state.listY = 0; }
    syncHash();
    render();
  });
  qEl.addEventListener("input", function () {
    state.q = qEl.value;
    if (!state.editing && !state.tableEdit && state.openId) { state.openId = null; state.listY = 0; syncHash(); }
    render();
  });
  clearEl.addEventListener("click", function () { qEl.value = ""; state.q = ""; render(); qEl.focus(); });

  listEl.addEventListener("click", function (ev) {
    var cp = ev.target.closest && ev.target.closest(".copy");
    if (cp) {
      var num = cp.getAttribute("data-copy");
      var box = cp.parentNode.querySelector(".num, .pwval");
      var selectNum = function () {
        try {
          var r = document.createRange(); r.selectNodeContents(box);
          var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
          cp.textContent = "번호 선택됨";
        } catch (e) {}
      };
      try {
        navigator.clipboard.writeText(num).then(function () {
          var was = cp.textContent;
          cp.textContent = "복사됨";
          setTimeout(function () { cp.textContent = was; }, 1600);
        }, selectNum);
      } catch (e) { selectNum(); }
      return;
    }
    var a = ev.target.closest && ev.target.closest("[data-act]");
    if (!a) return;
    ev.preventDefault();
    if (state.saving) return;
    var act = a.getAttribute("data-act"), id = a.getAttribute("data-id");
    if (act === "print") { window.print(); return; }
    if (act === "note-reset") { delete state.notes[id]; delete state.upg[id]; render(); return; }
    if (act === "note-save") {
      var se = findEntry(id);
      if (!se || !se.table) return;
      saveTable(se, pendingTable(se), "고친 내용을 저장했습니다.");
      return;
    }
    if (act === "room") {
      state.room = a.getAttribute("data-name"); state.logDel = null; state.roomEdit = false;
      render();
      var rp = document.getElementById("room-panel");
      if (rp) { try { rp.scrollIntoView({ block: "start", behavior: "smooth" }); } catch (e) { rp.scrollIntoView(); } }
      return;
    }
    if (act === "room-close") { state.room = null; state.logDel = null; state.roomEdit = false; render(); return; }
    if (act === "room-edit") {
      state.roomEdit = true; state.logDel = null; render();
      var rf = document.getElementById("re-1") || document.getElementById("re-0");
      if (rf) { try { rf.focus({ preventScroll: true }); } catch (e) {} }
      return;
    }
    if (act === "room-edit-cancel") { state.roomEdit = false; render(); return; }
    if (act === "log-del") { state.logDel = state.room + "|" + a.getAttribute("data-i"); render(); return; }
    if (act === "log-del-no") { state.logDel = null; render(); return; }
    if (act === "log-del-yes") {
      var le = findEntry(state.openId);
      if (!le || !le.table || !state.room) return;
      var lt = pendingTable(le);
      lt.logs = cloneLogs(lt.logs);
      var li = parseInt(a.getAttribute("data-i"), 10);
      if (lt.logs[state.room]) {
        lt.logs[state.room].splice(li, 1);
        if (!lt.logs[state.room].length) delete lt.logs[state.room];
      }
      state.logDel = null;
      saveTable(le, lt, "기록을 지웠습니다.");
      return;
    }
    if (act === "open") { openEntry(id); return; }
    if (act === "list") { showList(); return; }
    if (act === "export") {
      DL.save({ filename: "디지털튜터_문제해결_매뉴얼_" + today8() + ".html", data: new Blob([buildDoc(ENTRIES)], { type: "text/html" }) });
      return;
    }
    if (act === "go") { if (id) openEntry(id); return; }
    if (act === "pick") {
      var fi = document.getElementById("f-file");
      if (fi) fi.click();
      return;
    }
    if (act === "att-del") {
      var key = a.getAttribute("data-key");
      state.att = (state.att || []).filter(function (x) {
        if (x.key !== key) return true;
        if (x.id) dropAsset(x.id);
        if (x.preview) { try { URL.revokeObjectURL(x.preview); } catch (e) {} }
        return false;
      });
      drawAtt();
      return;
    }
    if (act === "get") {
      var ge = findEntry(a.getAttribute("data-eid"));
      var aid = a.getAttribute("data-aid");
      var at = ge ? (ge.attachments || []).filter(function (x) { return x.id === aid; })[0] : null;
      if (!at || !DL || a.disabled) return;
      a.disabled = true;
      var gwas = a.textContent;
      a.textContent = "준비 중…";
      saveAttachment(at).then(function () {
        toast("‘" + at.name + "’ 파일을 저장했어요");
      }, function (err) {
        var code = err && err.code;
        if (code === "declined") return;
        if (code === "missing") toast("파일을 찾을 수 없어요. 수정에서 다시 첨부해 주세요");
        else if (code === "rate_limited") toast("저장 창이 이미 열려 있어요. 잠시 뒤 다시 눌러 주세요");
        else if (code === "rejected_extension" || code === "extension_not_enabled") toast("이 화면에서는 이 형식의 파일을 받을 수 없어요");
        else if (code === "unavailable" || code === "not_granted" || code === "capability_disabled" || code === "capability_removed") {
          toast("이 화면에서는 파일 저장을 할 수 없어요");
          DL = null; state.canDownload = false;
        } else toast("파일을 받지 못했어요. 잠시 뒤 다시 눌러 주세요");
      }).then(function () {
        a.disabled = false; a.textContent = gwas;
        if (!state.canDownload) render();
      });
      return;
    }
    if (act === "xlsx") {
      var xe = findEntry(id);
      if (!xe || !xe.table || !DL || a.disabled) return;
      a.disabled = true;
      var wasTxt = a.textContent;
      a.textContent = "만드는 중…";
      exportTable(xe).then(function () {
        toast("엑셀 파일을 저장했어요");
      }, function (err) {
        var code = err && err.code;
        if (code === "declined") return;
        if (code === "rate_limited") toast("저장 창이 이미 열려 있어요. 잠시 뒤 다시 눌러 주세요");
        else if (code === "unavailable" || code === "not_granted" || code === "capability_disabled" || code === "capability_removed") {
          toast("이 화면에서는 파일 저장을 할 수 없어요");
          DL = null; state.canDownload = false;
        } else toast("엑셀 파일을 만들지 못했어요. 잠시 뒤 다시 눌러 주세요");
      }).then(function () {
        a.disabled = false; a.textContent = wasTxt;
        if (!state.canDownload) render();
      });
      return;
    }
    if (act === "tedit") {
      var te = findEntry(id);
      if (!te || !te.table) return;
      state.tableEdit = id; state.editing = null; state.draft = null; state.confirmDel = null;
      var tnc = (te.table.cols || []).indexOf("비고");
      state.tableDraft = (te.table.rows || []).map(function (r, ri) {
        var c = r.slice(), nv = noteVal(id, ri);
        if (nv !== undefined && tnc > -1) { while (c.length <= tnc) c.push(""); c[tnc] = nv; }
        return c;
      });
      delete state.notes[id];
      state.tableKeys = state.tableDraft.map(function (r) { return cellv(r, 0); });
      state.room = null;
      render();
      return;
    } else if (act === "tcancel") {
      state.tableEdit = null; state.tableDraft = null; state.tableKeys = null; render();
      return;
    } else if (act === "trow-add") {
      readTableDraft();
      var tn = tableCols(findEntry(id)) || 1;
      var blank = []; for (var bi = 0; bi < tn; bi++) blank.push("");
      state.tableDraft.push(blank);
      if (state.tableKeys) state.tableKeys.push("");
      render();
      var nf = document.getElementById("t-" + (state.tableDraft.length - 1) + "-0"); if (nf) nf.focus();
      return;
    } else if (act === "trow-del") {
      readTableDraft();
      var delRow = parseInt(a.getAttribute("data-row"), 10);
      state.tableDraft.splice(delRow, 1);
      if (state.tableKeys) state.tableKeys.splice(delRow, 1);
      render();
      return;
    } else if (act === "tsave") {
      readTableDraft();
      var tb = findEntry(id);
      if (!tb) return;
      var keys = state.tableKeys || [];
      var pairs = state.tableDraft.map(function (r, ri) { return [r.map(function (c) { return String(c || "").trim(); }), keys[ri] || ""]; })
        .filter(function (p) { return p[0].some(function (c) { return c; }); });
      var tt = pendingTable(tb);
      tt.rows = pairs.map(function (p) { return p[0]; });
      if (tt.logs) {
        // 교실 이름을 바꿨으면 그 교실 기록도 새 이름으로 옮긴다
        tt.logs = cloneLogs(tt.logs);
        pairs.forEach(function (p) {
          var old = p[1], nw = cellv(p[0], 0);
          if (old && nw && old !== nw && tt.logs[old] && !tt.logs[nw]) { tt.logs[nw] = tt.logs[old]; delete tt.logs[old]; }
        });
      }
      saveTable(tb, tt, "표를 저장했습니다.");
      return;
    }
    if (act === "order" || act === "edit" || act === "new") { state.tableEdit = null; state.tableDraft = null; }
    if (act === "order") {
      state.reorder = true; state.snapshot = ENTRIES.slice(); state.editing = null; state.draft = null; state.confirmDel = null;
      render();
      return;
    } else if (act === "order-cancel") {
      if (state.snapshot) ENTRIES = state.snapshot;
      state.reorder = false; state.snapshot = null; render();
      return;
    } else if (act === "order-save") {
      persist(ENTRIES.slice(), "순서를 저장했습니다.");
      return;
    } else if (act === "up" || act === "down") {
      if (moveEntry(id, act === "up" ? -1 : 1)) {
        render();
        var row = listEl.querySelector('.orow[data-id="' + id + '"]');
        if (row) {
          var b2 = row.querySelector('[data-act="' + act + '"]');
          if (!b2 || b2.disabled) b2 = row.querySelector('[data-act="' + (act === "up" ? "down" : "up") + '"]');
          if (b2) b2.focus();
        }
      }
      return;
    }
    if (act === "edit") {
      state.editing = id; state.draft = null; state.confirmDel = null; startAtt(findEntry(id)); render();
      toMainTop();
    } else if (act === "new") {
      state.editing = NEW; state.draft = null; state.confirmDel = null; startAtt(null); render();
      toMainTop();
      var f2 = document.getElementById("f-symptom"); if (f2) { try { f2.focus({ preventScroll: true }); } catch (e) {} }
    } else if (act === "cancel") {
      state.editing = null; state.draft = null; endAtt(true); render();
      toMainTop();
    } else if (act === "del") {
      state.confirmDel = id; render();
    } else if (act === "del-no") {
      state.confirmDel = null; render();
    } else if (act === "del-yes") {
      var gone = findEntry(id);
      persist(ENTRIES.filter(function (e) { return e.id !== id; }), "‘" + (gone ? gone.symptom : "항목") + "’을(를) 삭제했습니다.", null);
    }
  });

  fabEl.addEventListener("click", function () {
    if (state.saving) return;
    state.editing = NEW; state.draft = null; state.confirmDel = null; state.reorder = false;
    state.tableEdit = null; state.tableDraft = null;
    startAtt(null);
    render();
    toMainTop();
    var f = document.getElementById("f-symptom"); if (f) { try { f.focus({ preventScroll: true }); } catch (e) {} }
  });

  listEl.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var f = ev.target;
    if (!f || f.id !== "editor" || state.saving) return;
    var v = readForm();
    var err = document.getElementById("f-err");
    var att = state.att || [];
    var busy = att.some(function (x) { return x.st === "up"; });
    var okAtt = att.some(function (x) { return x.st === "ok" && x.id; });
    var problem = !v.symptom.trim() ? "제목을 적어 주세요."
      : busy ? "파일을 올리는 중이에요. 다 올라간 뒤 저장해 주세요."
      : (!lines(v.steps).length && !okAtt && !lines(v.memo).length && !(state.editing !== NEW && (findEntry(state.editing) || {}).table))
        ? "내용을 한 줄 이상 적거나 파일을 첨부해 주세요." : "";
    if (problem) { err.textContent = problem; err.hidden = false; return; }
    var isNew = state.editing === NEW;
    var base = isNew ? blankEntry() : findEntry(state.editing);
    if (!base) { state.editing = null; render(); return; }
    var n = buildEntry(base, v);
    var next = isNew ? [n].concat(ENTRIES) : ENTRIES.map(function (e) { return e.id === base.id ? n : e; });
    if (!isNew && n.important && !base.important) next = [n].concat(ENTRIES.filter(function (e) { return e.id !== base.id; }));
    state.draft = v;
    persist(next, isNew ? "새 항목을 추가했습니다." : "수정했습니다.", n.id);
  });

  // 사진이 지워졌거나 못 불러오면 안내 문구로 바꾼다
  listEl.addEventListener("error", function (ev) {
    var t = ev.target;
    if (!t || t.tagName !== "IMG" || !t.closest || !t.closest(".shot")) return;
    var p = document.createElement("p");
    p.className = "none";
    p.textContent = "사진을 불러오지 못했습니다.";
    t.replaceWith(p);
  }, true);

  // 캡처한 그림 붙여 넣기 (입력 화면에서). 엑셀 칸을 복사해 글 칸에 붙일 때는 글자로 붙인다.
  document.addEventListener("paste", function (ev) {
    if (!state.editing || !state.att || !document.getElementById("editor")) return;
    var cd = ev.clipboardData;
    if (!cd) return;
    var files = [];
    try {
      Array.prototype.forEach.call(cd.items || [], function (it) {
        if (it.kind === "file") { var f = it.getAsFile(); if (f) files.push(f); }
      });
    } catch (e) {}
    if (!files.length && cd.files && cd.files.length) files = Array.prototype.slice.call(cd.files);
    if (!files.length) return;
    var t = ev.target && ev.target.closest ? ev.target : null;
    var inZone = t && t.closest("#f-drop");
    var inText = t && t.closest("textarea, input");
    var types = Array.prototype.slice.call(cd.types || []);
    if (inText && !inZone && types.indexOf("text/plain") > -1) return;
    ev.preventDefault();
    if (!ASSETS) { toast("이 화면에서는 파일을 올릴 수 없어요."); return; }
    toast(files.length > 1 ? "붙여 넣은 파일 " + files.length + "개를 올립니다" : "붙여 넣은 그림을 올립니다");
    addFiles(files, true);
  });

  // 파일 끌어다 놓기 (입력 화면 아무 곳에나)
  function dragFiles(ev) { var d = ev.dataTransfer; return !!d && Array.prototype.indexOf.call(d.types || [], "Files") > -1; }
  document.addEventListener("dragover", function (ev) {
    if (!state.editing || !dragFiles(ev)) return;
    ev.preventDefault();
    var z = document.getElementById("f-drop");
    if (z) z.classList.add("over");
  });
  document.addEventListener("dragleave", function (ev) {
    var z = document.getElementById("f-drop");
    if (z && (ev.target === document.documentElement || ev.target === document.body || !ev.relatedTarget)) z.classList.remove("over");
  });
  document.addEventListener("drop", function (ev) {
    if (!state.editing || !dragFiles(ev)) return;
    ev.preventDefault();
    var z = document.getElementById("f-drop");
    if (z) z.classList.remove("over");
    addFiles(ev.dataTransfer.files, false);
  });
  document.addEventListener("change", function (ev) {
    var t = ev.target;
    if (!t || t.id !== "f-file") return;
    addFiles(t.files, false);
    try { t.value = ""; } catch (e) {}
  });

  // 비고 칸 바로 고치기: 입력할 때마다 표시만 바꾸고, 저장은 [비고 저장]으로 한 번에
  listEl.addEventListener("input", function (ev) {
    var t = ev.target;
    // 표 고치기 중: 통계를 바로 다시 계산
    if (t && t.closest && t.closest(".tedit") && state.tableEdit) {
      readTableDraft();
      var te2 = findEntry(state.tableEdit);
      var sEl = te2 && isBoard(te2.table) ? document.getElementById("stats-" + te2.id) : null;
      if (sEl) sEl.outerHTML = statsHTML(te2, state.tableDraft, true);
      return;
    }
    if (!t || !t.classList || !t.classList.contains("note-in")) return;
    var eid = t.getAttribute("data-eid"), ri = parseInt(t.getAttribute("data-row"), 10);
    var ne = findEntry(eid);
    if (!ne || !ne.table) return;
    var nc = (ne.table.cols || []).indexOf("비고");
    var row = (ne.table.rows || [])[ri] || [];
    var orig = row[nc] == null ? "" : String(row[nc]);
    var m = state.notes[eid] || (state.notes[eid] = {});
    if (t.value === orig) delete m[ri]; else m[ri] = t.value;
    if (!Object.keys(m).length) delete state.notes[eid];
    t.classList.toggle("dirty", t.value !== orig);
    var bar = document.getElementById("nbar-" + eid);
    if (bar) bar.innerHTML = nbarHTML(ne);
  });
  // 업그레이드 가능(가/부) 고르기
  listEl.addEventListener("change", function (ev) {
    var t = ev.target;
    if (!t || !t.classList || !t.classList.contains("upg")) return;
    var eid = t.getAttribute("data-eid"), k = t.getAttribute("data-key");
    var ue = findEntry(eid);
    if (!ue) return;
    var m = state.upg[eid] || (state.upg[eid] = {});
    if (t.value === upSaved(ue, k)) delete m[k]; else m[k] = t.value;
    if (!Object.keys(m).length) delete state.upg[eid];
    t.classList.toggle("dirty", t.value !== upSaved(ue, k));
    var bar = document.getElementById("nbar-" + eid);
    if (bar) bar.innerHTML = nbarHTML(ue);
  });
  // 교실(반) 한 줄 정보 저장 (이름을 바꾸면 기록도 따라간다)
  listEl.addEventListener("submit", function (ev) {
    var f = ev.target;
    if (!f || f.id !== "roomform") return;
    ev.preventDefault();
    if (state.saving) return;
    var re = findEntry(state.openId);
    if (!re || !re.table || !state.room) return;
    var tt = pendingTable(re), rcols = tt.cols || [];
    var ri = -1;
    tt.rows.forEach(function (r, i) { if (ri < 0 && cellv(r, 0) === state.room) ri = i; });
    if (ri < 0) return;
    var vals = rcols.map(function (_, j) {
      var el = document.getElementById("re-" + j);
      return el ? String(el.value || "").trim() : cellv(tt.rows[ri], j);
    });
    var nn = vals[0];
    var dup = nn !== state.room && tt.rows.some(function (r, i) { return i !== ri && cellv(r, 0) === nn; });
    if (!nn || dup) {
      var er = document.getElementById("re-err");
      if (er) { er.textContent = !nn ? "이름을 적어 주세요." : "‘" + nn + "’이(가) 이미 있어요."; er.hidden = false; }
      return;
    }
    var nrow = tt.rows[ri].slice();
    vals.forEach(function (v, j) { nrow[j] = v; });
    tt.rows[ri] = nrow;
    if (nn !== state.room && tt.logs && tt.logs[state.room]) {
      tt.logs = cloneLogs(tt.logs);
      tt.logs[nn] = tt.logs[state.room];
      delete tt.logs[state.room];
    }
    if (state.notes[re.id]) { delete state.notes[re.id][ri]; if (!Object.keys(state.notes[re.id]).length) delete state.notes[re.id]; }
    state.room = nn; state.roomEdit = false;
    saveTable(re, tt, "‘" + nn + "’ 정보를 저장했습니다.");
  });
  // 교실 기록 남기기
  listEl.addEventListener("submit", function (ev) {
    var f = ev.target;
    if (!f || f.id !== "logform") return;
    ev.preventDefault();
    if (state.saving) return;
    var le = findEntry(state.openId);
    if (!le || !le.table || !state.room) return;
    var d = (document.getElementById("lg-d") || {}).value || "";
    var k = (document.getElementById("lg-k") || {}).value || "기타";
    var tx = String((document.getElementById("lg-t") || {}).value || "").trim();
    if (!tx) {
      var er = document.getElementById("lg-err");
      if (er) { er.textContent = "내용을 적어 주세요."; er.hidden = false; }
      return;
    }
    var t2 = pendingTable(le);
    t2.logs = cloneLogs(t2.logs);
    (t2.logs[state.room] = t2.logs[state.room] || []).push({ d: /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : today(), k: k, t: tx });
    saveTable(le, t2, "‘" + state.room + "’ 기록을 남겼습니다.");
  });
  // 표 고치기: 엑셀처럼 Enter·↑↓로 위아래 칸 이동 (Tab은 옆 칸)
  listEl.addEventListener("keydown", function (ev) {
    var t = ev.target;
    if (!t || !t.closest || !t.closest(".tedit") || ev.isComposing || ev.keyCode === 229) return;
    var m = /^t-(\d+)-(\d+)$/.exec(t.id || "");
    if (!m) return;
    var dr = 0;
    if (ev.key === "Enter") dr = ev.shiftKey ? -1 : 1;
    else if (ev.key === "ArrowDown") dr = 1;
    else if (ev.key === "ArrowUp") dr = -1;
    if (!dr) return;
    ev.preventDefault();
    var nx = document.getElementById("t-" + (parseInt(m[1], 10) + dr) + "-" + m[2]);
    if (nx) { nx.focus(); try { nx.select(); } catch (e) {} }
  });
  listEl.addEventListener("keydown", function (ev) {
    var t = ev.target;
    if (!t || !t.classList || !t.classList.contains("note-in") || ev.isComposing || ev.keyCode === 229) return;
    if (ev.key !== "Enter") return;
    ev.preventDefault();
    var nx = document.getElementById("n-" + t.getAttribute("data-eid") + "-" + (parseInt(t.getAttribute("data-row"), 10) + (ev.shiftKey ? -1 : 1)));
    if (nx) { nx.focus(); try { nx.select(); } catch (e) {} } else t.blur();
  });

  // Esc 키로 목록으로
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape" || !state.openId || state.editing || state.tableEdit || state.saving) return;
    var t = ev.target;
    if (t && t.closest && t.closest("input, textarea, select")) return;
    if (state.room) { state.room = null; state.logDel = null; state.roomEdit = false; render(); return; }
    showList();
  });

  render();
  stats();
  if (state.room) {
    var rp0 = document.getElementById("room-panel");
    if (rp0) { try { rp0.scrollIntoView({ block: "start" }); } catch (e) {} }
  }

})();