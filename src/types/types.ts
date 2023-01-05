import type { FirebaseOptions } from 'firebase/app';
import type { ToastType } from '~/components/commons/toast';
import type { MenuType } from '~/components/menu/types';
import type { CongregationEntity } from '~/entities/congregation';

export type RootLoaderReturn = {
  isLoginPath: boolean;
  menu: MenuType[];
};

export type LoginLoaderReturn = {
  firebaseConfig: FirebaseOptions;
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
