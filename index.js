export default {
  async fetch(request, env, ctx) {
    let url = new URL(request.url);
    let newUrl = new URL(request.url);

    // Handle HTTP (port 8899 -> 9801)
    if (url.port === '8899') {
      newUrl.hostname = 'api.trynet.xandeum.com';
      newUrl.port = '9801';
      newUrl.protocol = 'http';
    }
    // Handle WebSocket (port 8900 -> 9802)
    else if (url.port === '8900') {
      newUrl.hostname = 'api.trynet.xandeum.com';
      newUrl.port = '9802';
      newUrl.protocol = 'http';
    } else {
      return new Response('Invalid port', { status: 404 });
    }

    let modifiedRequest = new Request(newUrl, request);
    return fetch(modifiedRequest);
  },
};
