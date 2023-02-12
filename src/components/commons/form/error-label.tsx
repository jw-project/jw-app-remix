import React from 'react';
// import { useTranslation } from 'react-i18next';
import tailStyled from 'tailwind-styled-components';

const ErrorLabelStyled = tailStyled.p`
  text-red-500
  text-xs
  italic
`;


const t = (a)=>a

export function ErrorLabel({ children }: React.PropsWithChildren) {
  // const { t } = useTranslation();

  if (typeof children === 'string') {
    return <ErrorLabelStyled>{t(children)}</ErrorLabelStyled>;
  }

  return <ErrorLabelStyled>{children}</ErrorLabelStyled>;
}
