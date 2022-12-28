import { Menu } from "@headlessui/react";
import tailStyled from "tailwind-styled-components";
import { Dropdown } from "./dropdown";
import { v4 as uuid } from "uuid";
import { Divider } from "./divider";

const MenuItem = tailStyled.div<{ $active: boolean }>`
  ${({ $active }) => ($active ? "bg-gray-100" : "")}
  group
  flex
  w-full
  items-center
  rounded-md
  px-2
  py-2
  text-sm
  cursor-pointer
`;

export type DropdownMenuType = {
  label: string;
  to: string;
};

const isDivider = (opt: DropdownMenuType | "divider"): opt is "divider" =>
  typeof opt === "string";

export const DropdownMenu = ({
  options,
  button,
}: {
  button: React.ReactNode;
  options: Array<DropdownMenuType | "divider">;
}) => {
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
            {({ active }) => <MenuItem $active={active}>{opt.label}</MenuItem>}
          </Menu.Item>
        );
      })}
    </Dropdown>
  );
};
