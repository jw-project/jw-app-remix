import type { EntryContext } from '@remix-run/node';
import { Response } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { error } from 'console';
import isbot from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'stream';

import { firebaseAdminConnection } from './services/firebase-connection.server';

const ABORT_DELAY = 5000;

firebaseAdminConnection();

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const callbackName = isbot(request.headers.get('user-agent'))
    ? 'onAllReady'
    : 'onShellReady';

  let didError = false;

  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]: () => {
          responseHeaders.set('Content-Type', 'text/html');

          const body = new PassThrough();

          pipe(body);

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );
        },
        onShellError: (err: unknown) => {
          reject(err);
        },
        onError: (e: unknown) => {
          didError = true;
          error(e);
        },
      },
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
