import type { ToastType } from '~/components/commons/toast';
import type { MenuType } from '~/components/menu/types';
import type { CongregationEntity } from '~/entities/congregation';
import type { TranslationConfig } from '~/i18n/i18n';

export type RootLoaderReturn = {
  isLoginPath: boolean;
  menu: MenuType[];
  locale: TranslationConfig;
};

export type CongregationLoaderReturn = {
  congregation: CongregationEntity;
};

export type CongregationActionReturn =
  | {
    message: string;
    messageType?: ToastType;
  }
  | undefined;
