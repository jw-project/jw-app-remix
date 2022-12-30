import { Fragment } from 'react';
import tailStyled from 'tailwind-styled-components';
import { Link } from '@remix-run/react';
import { MenuLabel } from './menu';
import type { MenuType, MenuListType } from './types';
import { Icon } from '../commons/icon';

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

function MenuLink({ list }: { list: MenuListType[] }) {
  return (
    <ul>
      {list.map(({ icon, label, to }) => (
        <li key={label}>
          <LinkMenuStyled to={to}>
            <IconMenuStyled>
              <Icon icon={icon} />
            </IconMenuStyled>
            <LinkLabelMenuStyled>{label}</LinkLabelMenuStyled>
          </LinkMenuStyled>
        </li>
      ))}
    </ul>
  );
}

export function MenuBody({ menu }: { menu: MenuType[] }) {
  return (
    <>
      {menu.map(({ label, list }) => (
        <Fragment key={label}>
          <MenuLabel>{label}</MenuLabel>
          <MenuLink list={list} />
        </Fragment>
      ))}
    </>
  );
}
