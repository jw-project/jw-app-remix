import tailStyled from 'tailwind-styled-components';

import { Dropdown } from '../commons/dropdown';

const AvatarStyled = tailStyled.div`
    inline-flex
    overflow-hidden
    relative
    justify-center
    items-center
    w-10
    h-10
    rounded-full
    bg-gray-600
`;

const LettersStyled = tailStyled.div`
    font-medium
    text-gray-300
`;

export function Avatar({ name }: { name: string }) {
  const Button = (
    <AvatarStyled>
      <LettersStyled>{name}</LettersStyled>
    </AvatarStyled>
  );

  return <Dropdown button={Button}>usuário</Dropdown>;
}
