export default defineEventHandler((event) => {
  const host = getRequestHost(event, { xForwardedHost: true });

  if (host && host.startsWith('www.')) {
    const protocol = getRequestProtocol(event, { xForwardedProto: true });
    const target = `${protocol}://${host.slice(4)}${event.node.req.url}`;

    return sendRedirect(event, target, 301);
  }
});
