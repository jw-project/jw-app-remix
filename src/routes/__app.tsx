import { Fragment, useEffect, useState } from 'react';

import { Transition } from '@headlessui/react';
import { Outlet, useNavigation } from '@remix-run/react';

import { BodyMargin } from '~/components/commons/body/body-margin';
import { Menu } from '~/components/menu/menu';
import { Navbar } from '~/components/navbar/navbar';

export { loader } from '../server-routes/__app.server';

export default function Layout() {
  const [show, setShow] = useState(false);
  const { state } = useNavigation();

  useEffect(() => {
    setShow(state === 'idle');
  }, [state]);

  return (
    <>
      <Navbar />
      <Menu />
      <Transition
        as={BodyMargin}
        show={show}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Outlet />
      </Transition>
    </>
  );
}
