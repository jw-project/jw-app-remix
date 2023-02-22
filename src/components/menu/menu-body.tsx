import React, { Fragment } from 'react';

import { Link } from '@remix-run/react';
import tailStyled from 'tailwind-styled-components';

import type { Permissions } from '~/entities/permissions';
import { PermissionsEnum } from '~/entities/permissions';
import { useTranslation } from '~/i18n/i18n';

import { Icon } from '../commons/icon';
import { MenuLabel } from './menu-styled';
import type { MenuType, MenuListType } from './types';

export const IconMenuStyled = tailStyled.span`
    w-12
    flex
    justify-center
    text-gray-400
`;

export const LinkMenuStyled = tailStyled(Link)`
    py-2
    flex
    text-gray-300
    hover:bg-gray-700
`;

export const LinkLabelMenuStyled = tailStyled.span`
    flex-grow
`;

function MenuLink({
  list,
}: {
  list: MenuListType[];
}) {
  const { translate } = useTranslation('menu');

  return (
    <ul>
      {list.map(({ icon, label, to }) => (
        <li key={label}>
          <LinkMenuStyled to={to}>
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
