import { useContext } from 'react';

import { ModalContext } from '~/global-context/modal';

export const useModal = () => useContext(ModalContext);
