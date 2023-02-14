import React from 'react';

import tailStyled from 'tailwind-styled-components';

import { useTranslation } from '~/i18n/i18n';

const ErrorLabelStyled = tailStyled.p`
  text-red-500
  text-xs
  italic
`;

export function ErrorLabel({ children }: React.PropsWithChildren) {
  const { translate } = useTranslation();

  if (typeof children === 'string') {
    return <ErrorLabelStyled>{translate(children)}</ErrorLabelStyled>;
  }

  return <ErrorLabelStyled>{children}</ErrorLabelStyled>;
}
