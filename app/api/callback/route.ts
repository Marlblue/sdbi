import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get("gh_oauth_state")?.value;

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!code || !state || !savedState || state !== savedState || !clientId || !clientSecret) {
    return new NextResponse("Invalid OAuth callback", { status: 400 });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${request.nextUrl.origin}/api/callback`,
    }),
  });

  const tokenData: { access_token?: string; error_description?: string } = await tokenResponse.json();

  if (!tokenData.access_token) {
    return new NextResponse(`OAuth error: ${tokenData.error_description || "unknown error"}`, { status: 400 });
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" });

  const html = `<!doctype html>
<html><body>
<script>
  (function() {
    var payload = ${payload};
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:' + JSON.stringify(payload),
        e.origin
      );
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body></html>`;

  const response = new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
  response.cookies.delete("gh_oauth_state");
  return response;
}
