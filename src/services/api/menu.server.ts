import { firestore } from 'firebase-admin';
import type { MenuType } from '~/components/menu/types';
import { getAllData } from './common.server';

export const getMenu = async (): Promise<MenuType[]> => {
  const menuSnap = await firestore().collection('menu').get();

  return getAllData(menuSnap);
};
