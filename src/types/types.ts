import type { FirebaseOptions } from 'firebase/app';
import type { MenuType } from '~/components/menu/types';

export type RootLoaderReturn = {
  isLoginPath: boolean;
  menu: MenuType[];
};

export type LoginLoaderReturn = {
  firebaseConfig: FirebaseOptions;
};
