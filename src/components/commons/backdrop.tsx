import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import tailStyled from 'tailwind-styled-components';

const BackdropStyled = tailStyled.div`
  fixed
  inset-0
  bg-black/30
`;

export function Backdrop({
  onClick,
  visible,
}: {
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <Transition
      as={Fragment}
      show={!visible}
      enter="transform transition duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <BackdropStyled onClick={onClick} />
    </Transition>
  );
}
