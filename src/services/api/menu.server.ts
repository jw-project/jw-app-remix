import type { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { firestore } from "firebase-admin";
import type { MenuType } from "~/components/menu/types";

const getAllData = <T>(snap: QuerySnapshot<DocumentData>) => {
  return snap.docs.map((e) => e.data()) as T;
};

export const getMenu = async (): Promise<MenuType[]> => {
  const menuSnap = await firestore().collection("menu").get();

  return getAllData(menuSnap);
};
