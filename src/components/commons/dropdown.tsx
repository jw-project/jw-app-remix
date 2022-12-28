import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import tailStyled from "tailwind-styled-components";

const MenuItems = tailStyled(Menu.Items)`
  absolute
  right-0
  mt-3
  w-56
  origin-top-right
  rounded-md
  bg-white
  shadow-lg
  ring-1
  ring-black
  ring-opacity-5
`;

export const Dropdown = ({
  button,
  children,
}: React.PropsWithChildren & {
  button: React.ReactNode;
}) => {
  return (
    <div className="fixed">
      <Menu>
        <Menu.Button>{button}</Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems>
            <div className="px-1 py-1">{children}</div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};
