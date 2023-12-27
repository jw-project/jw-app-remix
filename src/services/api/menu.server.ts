import { remoteConfig } from 'firebase-admin';
import type { RemoteConfigParameterValue } from 'firebase-admin/lib/remote-config/remote-config-api';

import type { MenuType } from '~/components/menu/types';

export const getMenu = async (): Promise<MenuType[]> => {
  const {
    parameters: { menu },
  } = await remoteConfig().getTemplate();

  return JSON.parse(
    (menu?.defaultValue as RemoteConfigParameterValue & { value: string })
      .value,
  );
};
