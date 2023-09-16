import { error } from 'console';
import { PassThrough } from 'node:stream';

import {
  createReadableStreamFromReadable,
  type EntryContext,
} from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import isbot from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';

import { firebaseAdminConnection } from './services/firebase-connection.server';

const ABORT_DELAY = 5000;

firebaseAdminConnection();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const callbackName = isbot(request.headers.get('user-agent'))
    ? 'onAllReady'
    : 'onShellReady';

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          pipe(body);
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
