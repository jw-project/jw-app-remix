import tailStyled from 'tailwind-styled-components';

export const Overlay = tailStyled.div`
    fixed
    top-0
    left-0
    right-0
    bottom-0
    w-full
    h-screen
    z-50
    overflow-hidden
    bg-gray-600
    flex
    flex-col
    items-center
    justify-center
`;

export const LoadingTitle = tailStyled.h2`
    text-center
    text-white
    text-xl
    font-semibold
    mb-1
`;

export const LoadingSubtitle = tailStyled.p`
    w-1/3
    text-center
    text-white
`;

export const Spinner = tailStyled.div`
    w-16
    h-16
    border-4
    border-blue-400
    border-solid
    rounded-full
    animate-spin
    border-t-transparent
    mb-5
`;
