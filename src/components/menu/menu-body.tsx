import React, { Fragment } from 'react';

import { useMatches } from '@remix-run/react';

import type { Permissions } from '~/entities/permissions';
import { PermissionsEnum } from '~/entities/permissions';
import { useTranslation } from '~/i18n/i18n';

import { Icon } from '../commons/icon';
import {
  IconMenuStyled,
  LinkLabelMenuStyled,
  LinkMenuStyled,
  MenuLabel,
} from './menu-styled';
import type { MenuType, MenuListType } from './types';

function MenuLink({ list }: { list: MenuListType[] }) {
  const { translate } = useTranslation('menu');
  const v = useMatches();

  const checkPathname = (to: string) => Boolean(v.find((e) => `/${to}` === e.pathname));

  return (
    <ul>
      {list.map(({ icon, label, to }) => (
        <li key={label}>
          <LinkMenuStyled to={to} $selected={checkPathname(to)}>
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

  const filterMenu = () => menu //
    .map((item) => ({
      ...item,
      list: item.list //
        .filter((listItem) => [PermissionsEnum.EDIT, PermissionsEnum.READ] //
          .includes(
            permissions[listItem.permissionKey] || PermissionsEnum.NOT,
          )),
    })) //
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
