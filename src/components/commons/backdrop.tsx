import { Fragment } from 'react';

import { Transition } from '@headlessui/react';
import { w } from 'windstitch';

const BackdropStyled = w.div(`
  fixed
  inset-0
  bg-black/60
  dark:bg-white/20
  z-10
`);

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
