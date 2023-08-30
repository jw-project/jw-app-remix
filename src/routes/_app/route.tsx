import React, { useEffect, useState } from 'react';

import { Transition } from '@headlessui/react';
import { Outlet, useNavigation } from '@remix-run/react';

import { BodyMargin } from '~/components/commons/body/body-margin';
import { ErrorScreen } from '~/components/error-screen';
import { Menu } from '~/components/menu/menu';
import { Navbar } from '~/components/navbar/navbar';

function BaseLayout({
  show,
  children,
}: React.PropsWithChildren<{ show: boolean }>) {
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
        {children}
      </Transition>
    </>
  );
}

export default function Layout() {
  const [show, setShow] = useState(true);
  const { state, location } = useNavigation();

  useEffect(() => {
    // only happens effect when the routes are base routes
    if ((location?.pathname || '').split('/').length < 4) {
      setShow(state === 'idle');
    }
  }, [state]);

  return (
    <BaseLayout show={show}>
      <Outlet />
    </BaseLayout>
  );
}

export function ErrorBoundary() {
  return (
    <BaseLayout show>
      <ErrorScreen />
    </BaseLayout>
  );
}
