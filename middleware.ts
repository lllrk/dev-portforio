export const config = {
    matcher: "/(.*)",
  };
  
  export default function middleware(request: Request) {
    const authHeader = request.headers.get("authorization");
  
    if (authHeader) {
      const base64 = authHeader.replace("Basic ", "");
      const decoded = atob(base64);
      const [user, pass] = decoded.split(":");
      if (user === "admin" && pass === "password") {
        return new Response(null, { status: 200 });
      }
    }
  
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }