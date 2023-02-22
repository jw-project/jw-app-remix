import tailStyled from 'tailwind-styled-components';

type PadType = 0 | 'sm' | 'md';

const padSwitch = (padded: PadType) => {
  switch (padded) {
    case 0:
      return '';
    case 'sm':
      return 'p-4 md:p-6';
    case 'md':
    default:
      return 'p-6 md:p-8';
  }
};

export const Card = tailStyled.div<{ padded?: PadType }>`
  bg-white
  shadow
  rounded-lg
  ${({ padded = 'md' }) => padSwitch(padded)}
`;
