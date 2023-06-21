import { Fragment } from 'react';

import { Transition } from '@headlessui/react';
import { useAtomValue } from 'jotai';

import { isSavingAtom } from '~/atoms-global/saving';

import { Icon } from '../commons/icon';

export function SavingIndicator() {
  const isSaving = useAtomValue(isSavingAtom);

  return (
    <Transition
      as={Fragment}
      show={isSaving}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Icon
        icon="autorenew"
        className="animate-spin text-gray-300 dark:text-gray-500"
      />
    </Transition>
  );
}
