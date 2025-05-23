export default {
  async fetch(request, env, ctx) {
    let url = new URL(request.url);
    let newUrl = new URL(request.url);

    const isWebSocket = request.headers.get('Upgrade') === 'websocket';

    if (!isWebSocket) {
      newUrl.hostname = 'api.trynet.xandeum.com';
      newUrl.port = '8899';
      newUrl.protocol = 'http';
    } else {
      newUrl.hostname = 'api.trynet.xandeum.com';
      newUrl.port = '8900';
      newUrl.protocol = 'http';
    }

    let modifiedRequest = new Request(newUrl, request);
    try {
      return await Promise.race([
        fetch(modifiedRequest),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Fetch timeout')), 10000))
      ]);
    } catch (error) {
      return new Response(`Fetch error: ${error.message}`, { status: 503 });
    }
  },
};
