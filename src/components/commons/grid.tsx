import tailStyled from 'tailwind-styled-components';
import { v4 as uuid } from 'uuid';

type Options = 1 | 2 | 3 | 4;

type ColSpanType = {
  colSpan?: Options;
};

type ColType = {
  cols: Options;
};

export type FieldGridType = Array<ColSpanType & { children: JSX.Element }>;

type GridType = ColType & { grids: FieldGridType };

export const GridStyled = tailStyled.div<ColType>`
  grid
  grid-cols-1
  ${({ cols }) => `md:grid-cols-${cols}`}
  gap-4
`;

export const ColSpanStyled = tailStyled.div<ColSpanType>`
  col-span-1
  ${({ colSpan }) => `md:col-span-${colSpan}`}
`;

export function Grid({ cols, grids }: GridType) {
  return (
    <GridStyled cols={cols}>
      {grids.map(({ colSpan, children }) => (
        <ColSpanStyled key={uuid()} colSpan={colSpan}>
          {children}
        </ColSpanStyled>
      ))}
    </GridStyled>
  );
}
