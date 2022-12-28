import tailStyled from "tailwind-styled-components";

export const NavbarBase = tailStyled.nav<{ $expanded: boolean }>`
    top-0
    left-0
    right-0
    fixed
    flex
    bg-white
    h-14
    border-b
    border-gray-100
    z-1
    w-screen transition-all
    lg:pl-60
    lg:w-auto
`;

export const NavbarStart = tailStyled.div`
    flex-1
    items-stretch
    flex
    h-14
`;

export const NavbarItem = tailStyled.div<{ $withDivider?: boolean }>`
    ${({ $withDivider }) => ($withDivider ? "border-r border-gray-100" : "")}
    items-center
    py-2
    px-3
    w-16
`;

export const NavbarEnd = tailStyled.div`
    flex
    items-stretch
`;
