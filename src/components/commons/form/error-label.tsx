import { type PropsWithChildren } from 'react';

import { w } from 'windstitch';

import { useTranslation } from '~/i18n/i18n';

const ErrorLabelStyled = w.p(`
  text-red-500
  text-xs
  italic
`);

export function ErrorLabel({ children }: PropsWithChildren) {
  const { translate } = useTranslation();

  if (typeof children === 'string') {
    return <ErrorLabelStyled>{translate(children)}</ErrorLabelStyled>;
  }

  return <ErrorLabelStyled>{children}</ErrorLabelStyled>;
}
