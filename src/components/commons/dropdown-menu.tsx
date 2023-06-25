import React from 'react';

import { Menu } from '@headlessui/react';
import { v4 as uuid } from 'uuid';
import { w } from 'windstitch';

import { Divider } from './divider';
import { Dropdown } from './dropdown';

const MenuItem = w.div(
  `
  group
  flex
  w-full
  items-center
  rounded-md
  px-2
  py-2
  text-sm
  cursor-pointer
`,
  {
    variants: {
      active: (active: boolean) => (active ? 'bg-gray-100' : ''),
    },
    transient: ['active'],
  },
);

type DropdownMenuType = {
  label: string;
  to: string;
};

const isDivider = (opt: DropdownMenuType | 'divider'): opt is 'divider' =>
  typeof opt === 'string';

export function DropdownMenu({
  options,
  button,
}: {
  button: React.ReactNode;
  options: Array<DropdownMenuType | 'divider'>;
}) {
  return (
    <Dropdown button={button}>
      {options.map((opt) => {
        if (isDivider(opt)) {
          return (
            <Menu.Item key={uuid()} disabled>
              <Divider />
            </Menu.Item>
          );
        }

        return (
          <Menu.Item key={opt.label}>
            {({ active }) => <MenuItem active={active}>{opt.label}</MenuItem>}
          </Menu.Item>
        );
      })}
    </Dropdown>
  );
}
