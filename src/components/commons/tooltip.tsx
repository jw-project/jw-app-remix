import React, { useMemo, useState } from 'react';

import tailStyled from 'tailwind-styled-components';

type Diretion = 'top' | 'down' | 'left' | 'right';

function defineDirection(
  direction: Diretion,
  {
    targetHeight,
    targetWidth,
  }: {
    targetWidth: number;
    targetHeight: number;
  },
): React.CSSProperties {
  const tooltipHeight = 36;
  const margin = 10;

  switch (direction) {
    case 'down':
      return { top: `${targetHeight + margin}px` };

    case 'top':
      return { top: `-${tooltipHeight + margin}px` };

    case 'left':
      return {
        top: `${targetHeight / 2 - tooltipHeight / 2}px`,
        left: `${targetWidth + margin}px`,
      };

    default:
      return {
        top: `${targetHeight / 2 - tooltipHeight / 2}px`,
        right: `${targetWidth + margin}px`,
      };
  }
}

export function Tooltip({
  message,
  direction = 'down',
  children,
}: React.PropsWithChildren<{
  message: string;
  direction?: Diretion;
}>) {
  const [targetSize, setTargetSize] = useState({
    targetWidth: 0,
    targetHeight: 0,
  });

  const mouseOver = ({
    currentTarget: { clientWidth, clientHeight },
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setTargetSize({ targetWidth: clientWidth, targetHeight: clientHeight });
  };

  const style = useMemo(
    () => defineDirection(direction, targetSize),
    [direction, targetSize],
  );

  return (
    <TooltipWrapper role="tooltip" onMouseOver={mouseOver}>
      {children}
      <TooltipStyled direction={direction} style={style}>
        {message}
      </TooltipStyled>
    </TooltipWrapper>
  );
}

const TooltipWrapper = tailStyled.div`
    group
    relative
    flex
    justify-center
`;

const TooltipStyled = tailStyled.div<{ direction: Diretion }>`
    absolute
    z-10
    inline-block
    invisible
    opacity-0
    transition-opacity
    whitespace-nowrap
    pointer-events-none
    px-3
    py-2
    text-sm
    font-medium
    rounded-lg
    text-white
    bg-gray-900
    dark:bg-white
    dark:text-gray-900
    group-hover:opacity-100
    group-hover:visible
`;
