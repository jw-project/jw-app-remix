import { atom } from 'jotai';

export type Theme = 'light' | 'dark';

const theme = atom<Theme>('light');

export const themeAtom = atom(
  (get) => get(theme),
  (get, set, newValue?: Theme) => {
    set(theme, (current) => {
      if (newValue) {
        return (current = newValue);
      }

      return (current = current === 'light' ? 'dark' : 'light');
    });

    return get(theme);
  },
);
