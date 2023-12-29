import { useIsMobile } from '~/hooks/use-is-mobile';
import { useModal } from '~/hooks/use-modal';
import { useTranslation } from '~/hooks/use-translation';

import { Button } from '../button';
import { Icon, type IconProps } from '../icon';
import {
  ModalAlertCloseButtonStyled,
  ModalAlertTextStyled,
  ModalAlertWrapperButtonStyled,
  ModalBodyWrapperStyled,
  ModalContentStyled,
  ModalFullWrapperStyled,
  ModalStyled,
} from './style';

type Severity =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'question'
  | 'question-warning';

export const AlertModal = ({ severity }: { severity: Severity }) => {
  const { text, modalIsOpen, confirmModal, cancelModal } = useModal();
  const isMobile = useIsMobile();
  const { translate } = useTranslation('common');

  const modalSeverityConfigs: Record<Severity, IconProps> = {
    success: {
      icon: 'check_circle',
      className: 'text-green-500',
    },
    info: {
      icon: 'info',
      className: 'text-blue-500',
    },
    warning: {
      icon: 'warning',
      className: 'text-yellow-500',
    },
    error: {
      icon: 'error',
      className: 'text-red-500',
    },
    question: {
      icon: 'help',
      className: 'text-blue-500',
    },
    'question-warning': {
      icon: 'help',
      className: 'text-yellow-500',
    },
  };

  return (
    <ModalFullWrapperStyled leftmargin={!isMobile}>
      <ModalBodyWrapperStyled visible={modalIsOpen}>
        <ModalStyled>
          <ModalAlertCloseButtonStyled
            type="button"
            data-modal-hide="popup-modal"
            onClick={cancelModal}
          >
            <Icon icon="close" className="transition-none" />
          </ModalAlertCloseButtonStyled>
          <ModalContentStyled>
            <Icon size="icon-xxx-large" {...modalSeverityConfigs[severity]} />
            <ModalAlertTextStyled>{text}</ModalAlertTextStyled>
            <ModalAlertWrapperButtonStyled>
              <Button buttonstyle="danger" onClick={confirmModal}>
                {translate('yes')}
              </Button>
              <Button buttonstyle="secondary" onClick={cancelModal}>
                {translate('no')}
              </Button>
            </ModalAlertWrapperButtonStyled>
          </ModalContentStyled>
        </ModalStyled>
      </ModalBodyWrapperStyled>
    </ModalFullWrapperStyled>
  );
};
