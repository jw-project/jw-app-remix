import { useLoaderData } from '@remix-run/react';

import { Body } from './components/commons/body/body';
import { DrawerProvider } from './global-context/drawer';
import { LanguageProvider } from './global-context/language';
import { MenuProvider } from './global-context/menu';
import { ModalProvider } from './global-context/modal';
import { SavingProvider } from './global-context/saving';
import { ThemeProvider } from './global-context/theme';
import { TransitionProvider } from './global-context/transition';
import type { RootLoaderReturn } from './root.server';

export { loader, links, meta } from './root.server';

export default function App() {
  const { locale, themeMode } = useLoaderData<RootLoaderReturn>();

  return (
    <LanguageProvider {...locale}>
      <ThemeProvider defaultTheme={themeMode}>
        <TransitionProvider>
          <SavingProvider>
            <DrawerProvider>
              <ModalProvider>
                <MenuProvider>
                  <Body />
                </MenuProvider>
              </ModalProvider>
            </DrawerProvider>
          </SavingProvider>
        </TransitionProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
