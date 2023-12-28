import { Fragment } from 'react';

import { Transition } from '@headlessui/react';
import { w, type W } from 'windstitch';

const BackdropStyled = w.div(
  `
  fixed
  inset-0
  bg-black/60
  dark:bg-white/20
`,
  {
    variants: {
      zIndex: {
        0: 'z-0',
        10: 'z-10',
        20: 'z-20',
        30: 'z-30',
        40: 'z-40',
        50: 'z-50',
      },
    },
    defaultVariants: {
      zIndex: 40,
    },
  },
);

type ZIndex = W.Infer<typeof BackdropStyled>['zIndex'];

export function Backdrop({
  visible,
  zIndex,
  onClick,
}: {
  visible: boolean;
  zIndex?: ZIndex;
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
      <BackdropStyled onClick={onClick} zIndex={zIndex} />
    </Transition>
  );
}
