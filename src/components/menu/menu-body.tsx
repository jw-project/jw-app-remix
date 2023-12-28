import { Fragment } from 'react';

import { useMatches } from '@remix-run/react';

import { PermissionsEnum, type Permissions } from '~/entities/permissions';
import { useMenu } from '~/hooks/use-menu';
import { useTransition } from '~/hooks/use-transition';
import { useTranslation } from '~/i18n/i18n';

import { Icon } from '../commons/icon';
import {
  IconMenuStyled,
  LinkLabelMenuStyled,
  LinkMenuStyled,
  MenuLabel,
} from './menu-styled';
import type { MenuListType, MenuType } from './types';

function MenuLink({ list }: { list: MenuListType[] }) {
  const { translate } = useTranslation('menu');
  const { closeMenu } = useMenu();
  const { toggleTransition } = useTransition();
  const match = useMatches();

  const checkPathname = (to: string) =>
    Boolean(match.find((e) => `/${to}` === e.pathname.replace(/\/$/, '')));

  const onLinkClick = (to: string) => {
    closeMenu();
    if (!checkPathname(to)) {
      toggleTransition();
    }
  };

  return (
    <ul>
      {list.map(({ icon, label, to }) => (
        <li key={label}>
          <LinkMenuStyled
            to={to}
            onClick={() => onLinkClick(to)}
            selected={checkPathname(to)}
          >
            <IconMenuStyled>
              <Icon icon={icon} />
            </IconMenuStyled>
            <LinkLabelMenuStyled>{translate(label)}</LinkLabelMenuStyled>
          </LinkMenuStyled>
        </li>
      ))}
    </ul>
  );
}

export function MenuBody({
  menu,
  permissions,
}: {
  menu: MenuType[];
  permissions: Permissions;
}) {
  const { translate } = useTranslation('menu.categories');

  const filterMenu = () =>
    menu
      .map((item) => ({
        ...item,
        list: item.list.filter((listItem) =>
          [PermissionsEnum.EDIT, PermissionsEnum.READ] //
            .includes(
              permissions[listItem.permissionKey] || PermissionsEnum.NOT,
            ),
        ),
      }))
      .filter((item) => item.list.length);

  return (
    <>
      {filterMenu().map(({ label, list }) => (
        <Fragment key={label}>
          <MenuLabel>{translate(label)}</MenuLabel>
          <MenuLink list={list} />
        </Fragment>
      ))}
    </>
  );
}
