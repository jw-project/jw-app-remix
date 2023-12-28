import type { PropsWithChildren } from 'react';

import { Transition } from '@headlessui/react';
import { Outlet } from '@remix-run/react';

import { BodyMargin } from '~/components/commons/body/body-margin';
import { ErrorScreen } from '~/components/error-screen';
import { Menu } from '~/components/menu/menu';
import { Navbar } from '~/components/navbar/navbar';
import { useTransition } from '~/hooks/use-transition';

function BaseLayout({ children }: PropsWithChildren) {
  const { show } = useTransition();

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
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}

export function ErrorBoundary() {
  return (
    <BaseLayout>
      <ErrorScreen />
    </BaseLayout>
  );
}
