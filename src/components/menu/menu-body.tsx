import React, { Fragment } from 'react';

import { Link } from '@remix-run/react';
import tailStyled from 'tailwind-styled-components';

import { Icon } from '../commons/icon';
import { MenuLabel } from './menu';
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

const t = (a) => a;

function MenuLink({ list }: { list: MenuListType[] }) {
  // const { t } = useTranslation('menu');

  return (
    <ul>
      {list.map(({ icon, label, to }) => (
        <li key={label}>
          <LinkMenuStyled to={to}>
            <IconMenuStyled>
              <Icon icon={icon} />
            </IconMenuStyled>
            <LinkLabelMenuStyled>{t(label)}</LinkLabelMenuStyled>
          </LinkMenuStyled>
        </li>
      ))}
    </ul>
  );
}

export function MenuBody({ menu }: { menu: MenuType[] }) {
  // const { t, i18n } = useTranslation('menu', { keyPrefix: 'categories' });

  return (
    <>
      {/* <button type="button" onClick={() => { i18n.changeLanguage('en'); }}>as</button> */}
      {menu.map(({ label, list }) => (
        <Fragment key={label}>
          <MenuLabel>{t(label)}</MenuLabel>
          <MenuLink list={list} />
        </Fragment>
      ))}
    </>
  );
}
