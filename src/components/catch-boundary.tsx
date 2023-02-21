import React from 'react';

import { useCatch } from '@remix-run/react';

import { useTranslation } from '~/i18n/i18n';

export function CatchBoundaryComponent() {
  const { data, status } = useCatch();
  const { translate } = useTranslation();

  return (
    <div>
      <h1>Caught</h1>
      <p>
        Status:
        {' '}
        {status}
      </p>
      {translate(data.message)}
    </div>
  );
}
