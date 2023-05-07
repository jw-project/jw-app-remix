import { atom } from 'jotai';

const showMenu = atom(false);

export const showMenuAtom = atom(
  (get) => get(showMenu),
  (_get, set) => {
    set(showMenu, (current) => !current);
  },
);
