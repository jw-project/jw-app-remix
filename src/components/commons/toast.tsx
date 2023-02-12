import React from 'react';
import { toast } from 'react-hot-toast';

import { Transition } from '@headlessui/react';
import tailStyled from 'tailwind-styled-components';

import { Icon } from './icon';

export enum ToastType {
  SUCESS,
  ERROR,
}

const ToastContainer = tailStyled.div`
  flex
  items-center
  p-4
  mb-4
  w-full
  max-w-xs
  rounded-lg
  shadow
  text-gray-300
  bg-gray-800
`;

const ToastIcon = tailStyled.div<{ type: ToastType }>`
  inline-flex
  flex-shrink-0
  justify-center
  items-center
  w-8
  h-8
  rounded-lg
  ${({ type }) => (type === ToastType.SUCESS ? 'bg-green-800 text-green-200' : 'dark:bg-red-800 dark:text-red-200')}
`;

const ToastMessage = tailStyled.div`
  ml-3
  text-sm
  font-normal
`;

const ToastButton = tailStyled.button`
  ml-auto
  -my-1.5
  rounded-lg
  focus:ring-2
  focus:ring-gray-300
  p-1.5
  inline-flex
  h-8
  w-8
  items-center
  text-gray-500
  hover:text-white
  bg-gray-800
  hover:bg-gray-700
`;

export const notify = ({
  message,
  type = ToastType.SUCESS,
}: {
  message: string;
  type?: ToastType;
}) => toast.custom(({ id, visible }) => (
  <Transition
    appear
    show={visible}
    className="w-1/2 flex justify-center"
    enter="transition-all duration-150"
    enterFrom="opacity-0 scale-50"
    enterTo="opacity-100 scale-100"
    leave="transition-all duration-150"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-75"
  >
    <ToastContainer role="alert">
      <ToastIcon type={type}>
        <Icon icon={type === ToastType.SUCESS ? 'done' : 'close'} />
      </ToastIcon>
      <ToastMessage>{message}</ToastMessage>
      <ToastButton
        type="button"
        onClick={() => toast.dismiss(id)}
        aria-label="Close"
      >
        <Icon icon="close" size="icon-small" />
      </ToastButton>
    </ToastContainer>
  </Transition>
));
