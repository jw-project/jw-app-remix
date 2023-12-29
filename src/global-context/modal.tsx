import { createContext, useState, type PropsWithChildren } from 'react';

export type OpenModalProps = {
  text: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

type ModalContextType = {
  modalIsOpen: boolean;
  text: string;
  openModal: (props?: OpenModalProps) => void;
  confirmModal: () => void;
  cancelModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  modalIsOpen: false,
  text: '',
  openModal: () => {},
  confirmModal: () => {},
  cancelModal: () => {},
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [onCancel, setOnCancel] = useState<() => void | undefined>();

  function openModal(props?: OpenModalProps) {
    if (props?.text) {
      setText(() => props.text);
    }
    if (props?.onConfirm) {
      setOnConfirm(() => props.onConfirm);
    }
    if (props?.onCancel) {
      setOnCancel(() => props.onCancel);
    }
    setIsOpen(true);
  }

  function confirmModal() {
    onConfirm();
    setIsOpen(false);
  }

  function cancelModal() {
    onCancel?.();
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen: isOpen,
        text,
        openModal,
        confirmModal,
        cancelModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
