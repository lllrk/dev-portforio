export const config = {
    matcher: '/:path*',
  };
  
  export default function middleware(request: Request) {
    const basicAuth = request.headers.get('authorization');
  
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
  
      if (user === 'admin' && pwd === '1208') {
        return;
      }
    }
  
    return new Response('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }