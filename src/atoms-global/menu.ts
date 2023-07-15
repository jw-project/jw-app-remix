import { atom } from 'jotai';

const showMenu = atom(false);

export const showMenuAtom = atom(
  (get) => get(showMenu),
  (get, set) => {
    set(showMenu, (current) => !current);
  },
);

export const closeMenuAtom = atom(null, (get, set) => {
  set(showMenu, false);
});
