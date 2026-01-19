export async function onRequest(context) {
    const authorization = context.request.headers.get('Authorization');
    
    // ユーザー名とパスワードを設定
    const USERNAME = 'admin';
    const PASSWORD = '1208';
    
    if (!authorization) {
      return new Response('認証が必要です', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
    
    const [scheme, encoded] = authorization.split(' ');
    
    if (!encoded || scheme !== 'Basic') {
      return new Response('認証が必要です', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
    
    const credentials = atob(encoded).split(':');
    const user = credentials[0];
    const pass = credentials[1];
    
    if (user !== USERNAME || pass !== PASSWORD) {
      return new Response('認証失敗', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
    
    return context.next();
  }