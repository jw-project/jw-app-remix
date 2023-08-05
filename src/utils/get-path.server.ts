export function getPath(request: Request) {
  const url = new URL(request.url);

  return url.pathname.replace(/\/$/, '');
}
