import React from 'react';
import tailStyled from 'tailwind-styled-components';

export const NotificationBadgeStyled = tailStyled.div`
  inline-flex
  absolute  
  -mt-6
  -mr-6
  justify-center
  items-center
  w-4
  h-4
  text-[10px]
  text-white
  bg-red-500
  rounded-full
`;

export function NotificationBadge({ children }: React.PropsWithChildren) {
  if (!children) return null;

  return <NotificationBadgeStyled>{children}</NotificationBadgeStyled>;
}
