import { useLoaderData } from "@remix-run/react";
import { useAtom } from "jotai";
import { showMenuAtom } from "~/atoms/global-atoms";
import type { IndexLoaderData } from "~/routes/type";
import { Backdrop } from "./commons/backdrop";
import { Aside, MenuHeader } from "./menu/menu";
import { MenuBody } from "./menu/menu-body";

export const Menu = () => {
  const { menu } = useLoaderData<IndexLoaderData>();
  const [showMenu, setShowMenu] = useAtom(showMenuAtom);

  return (
    <>
      <Aside $expanded={showMenu}>
        <MenuHeader>
          Admin<b className="font-black">One</b>
        </MenuHeader>
        <MenuBody menu={menu} />
      </Aside>
      <Backdrop onClick={() => setShowMenu()} visible={!showMenu} />
    </>
  );
};
