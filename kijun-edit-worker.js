export default {
  async fetch(request, env) {
    const ALLOW_ORIGIN = "https://botem.com";
    const cors = {
      "Access-Control-Allow-Origin": ALLOW_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405, headers: cors });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "bad_request" }), { status: 400, headers: cors });
    }

    const { password, action } = body;
    if (!password || password !== env.EDIT_PASSWORD) {
      return new Response(JSON.stringify({ error: "bad_password" }), { status: 403, headers: cors });
    }

    const OWNER = "jinheewhite", REPO = "kijun", BRANCH = "master";
    const ghHeaders = {
      Authorization: `Bearer ${env.GITHUB_PAT}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "kijun-edit-worker",
    };

    function b64(str) {
      const bytes = new TextEncoder().encode(str);
      let bin = "";
      for (const b of bytes) bin += String.fromCharCode(b);
      return btoa(bin);
    }

    async function getSha(path) {
      const api = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
      const r = await fetch(`${api}?ref=${BRANCH}`, { headers: ghHeaders });
      if (r.status === 200) return (await r.json()).sha;
      if (r.status === 404) return undefined;
      throw new Error("gh_error");
    }

    // 첨부 파일 업로드 · 삭제 (사진·파일 첨부 기능이 저장소에 직접 커밋한다)
    if (action === "upload" || action === "delete") {
      const path = String(body.path || "");
      if (!/^kijun\/files\/blobs\/[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(path)) {
        return new Response(JSON.stringify({ error: "bad_path" }), { status: 400, headers: cors });
      }
      const api = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
      let sha;
      try {
        sha = await getSha(path);
      } catch (e) {
        return new Response(JSON.stringify({ error: "gh_error" }), { status: 502, headers: cors });
      }

      if (action === "delete") {
        if (!sha) return new Response(JSON.stringify({ ok: true }), { headers: cors });
        const delRes = await fetch(api, {
          method: "DELETE",
          headers: { ...ghHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ message: `첨부 삭제 (${new Date().toISOString()})`, sha, branch: BRANCH }),
        });
        if (!delRes.ok) {
          const errBody = await delRes.json().catch(() => ({}));
          return new Response(JSON.stringify({ error: "gh_error", message: errBody.message }), { status: 502, headers: cors });
        }
        return new Response(JSON.stringify({ ok: true }), { headers: cors });
      }

      const contentBase64 = body.contentBase64;
      if (typeof contentBase64 !== "string" || !contentBase64) {
        return new Response(JSON.stringify({ error: "bad_request" }), { status: 400, headers: cors });
      }
      const putRes = await fetch(api, {
        method: "PUT",
        headers: { ...ghHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `첨부 업로드 (${new Date().toISOString()})`,
          content: contentBase64,
          branch: BRANCH,
          ...(sha ? { sha } : {}),
        }),
      });
      if (!putRes.ok) {
        const errBody = await putRes.json().catch(() => ({}));
        return new Response(JSON.stringify({ error: "gh_error", message: errBody.message }), { status: 502, headers: cors });
      }
      return new Response(JSON.stringify({ ok: true, path }), { headers: cors });
    }

    // 기본 동작: kijun/data.json 저장
    const { content } = body;
    if (typeof content !== "string") {
      return new Response(JSON.stringify({ error: "bad_request" }), { status: 400, headers: cors });
    }
    const PATH = "kijun/data.json";
    const api = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;
    let sha;
    try {
      sha = await getSha(PATH);
    } catch (e) {
      return new Response(JSON.stringify({ error: "gh_error" }), { status: 502, headers: cors });
    }

    const putRes = await fetch(api, {
      method: "PUT",
      headers: { ...ghHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `매뉴얼 업데이트 (${new Date().toISOString()})`,
        content: b64(content),
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    });

    if (putRes.status === 409) {
      return new Response(JSON.stringify({ error: "conflict" }), { status: 409, headers: cors });
    }
    if (!putRes.ok) {
      const errBody = await putRes.json().catch(() => ({}));
      return new Response(JSON.stringify({ error: "gh_error", message: errBody.message }), { status: 502, headers: cors });
    }

    return new Response(JSON.stringify({ ok: true }), { headers: cors });
  },
};
