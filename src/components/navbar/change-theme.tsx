import axios from 'axios';
import { useAtom } from 'jotai';

import { themeAtom } from '~/atoms-global/theme';

import { Icon } from '../commons/icon';
import { Tooltip } from '../commons/tooltip';

export function ChangeTheme() {
  const [theme, changeTheme] = useAtom(themeAtom);
  const isDark = theme === 'dark';

  const changeHandle = async () => {
    const newTheme = changeTheme();
    try {
      await axios.post('/api/save-theme', { theme: newTheme });
    } catch (error) {}
  };

  return (
    <Tooltip message="Mudar o tema">
      <Icon
        icon={isDark ? 'dark_mode' : 'light_mode'}
        onClick={changeHandle}
        className={isDark ? 'dark:text-white' : 'text-black'}
      />
    </Tooltip>
  );
}
