import tailStyled from "tailwind-styled-components";

export const Aside = tailStyled.aside<{ $expanded: boolean }>`
    w-60
    -left-60
    fixed
    top-0
    z-40
    h-screen
    bg-gray-800
    transition-all
    ${({ $expanded }) => ($expanded ? "left-0" : "lg:left-0")}
`;

export const MenuHeader = tailStyled.div`
    flex
    flex-row
    w-full
    bg-gray-900
    text-white
    flex-1
    px-3
    h-14
    items-center
`;

export const MenuLabel = tailStyled.p`
    p-3
    text-xs
    uppercase
    text-gray-400
`;
