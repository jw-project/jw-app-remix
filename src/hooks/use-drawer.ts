import { useContext } from 'react';

import { DrawerContext } from '~/global-context/drawer';

export const useDrawer = () => useContext(DrawerContext);
