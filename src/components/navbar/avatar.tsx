import { useState } from "react";
import tailStyled from "tailwind-styled-components";
import { Dropdown } from "../commons/dropdown";

const AvatarStyled = tailStyled.div`
    inline-flex
    overflow-hidden
    relative
    justify-center
    items-center
    w-10
    h-10
    bg-gray-100
    rounded-full
    dark:bg-gray-600
`;

const LettersStyled = tailStyled.div`
    font-medium
    text-gray-600
    dark:text-gray-300
`;

export const Avatar = ({ name }: { name: string }) => {
  const Button = (
    <AvatarStyled>
      <LettersStyled>{name}</LettersStyled>
    </AvatarStyled>
  );

  return <Dropdown button={Button}>usuário</Dropdown>;
};
