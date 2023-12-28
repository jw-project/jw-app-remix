import { useNavigate } from '@remix-run/react';

import { useDrawer } from '~/hooks/use-drawer';
import { useTranslation } from '~/hooks/use-translation';

import { Button } from '../button';
import type { IconOpts } from '../icon';

export function NewButton({
  button = 'common.empty-state.button',
  icon = 'add',
  mustOpenDrawer,
}: {
  button?: string;
  icon?: IconOpts;
  mustOpenDrawer?: boolean;
}) {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const { openDrawer } = useDrawer();

  const goTo = () => {
    navigate('./new');
    mustOpenDrawer && openDrawer({ onClose: () => navigate('') });
  };

  return (
    <Button onClick={goTo} icon={icon}>
      {translate(button)}
    </Button>
  );
}
