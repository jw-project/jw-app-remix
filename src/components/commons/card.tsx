import React from 'react';
import tailStyled from 'tailwind-styled-components';

export const CardStyled = tailStyled.div`
  bg-white
  shadow
  rounded-lg
  sm:p-6
  xl:p-8
  2xl:col-span-2
`;

export const CardContentStyled = tailStyled.div`
  p-6
`;

export function Card({ children }: React.PropsWithChildren) {
  return (
    <CardStyled>
      <CardContentStyled>
        {children}
      </CardContentStyled>
    </CardStyled>
  );
}
