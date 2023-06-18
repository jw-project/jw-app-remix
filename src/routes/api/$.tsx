import { json } from '@remix-run/server-runtime';

export function loader() {
  return json(undefined, { status: 404 });
}

export function action() {
  return json(undefined, { status: 404 });
}
