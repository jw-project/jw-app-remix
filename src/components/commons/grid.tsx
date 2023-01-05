import tailStyled from 'tailwind-styled-components';

type Options = 1 | 2 | 3 | 4;

type ColSpanType = {
  colSpan?: Options;
};

type ColType = {
  cols: Options;
};

export const Grid = tailStyled.div<ColType>`
  grid
  grid-cols-1
  ${({ cols }) => `md:grid-cols-${cols}`}
  gap-4
`;

export const Col = tailStyled.div<ColSpanType>`
  col-span-1
  ${({ colSpan }) => `md:col-span-${colSpan}`}
`;
