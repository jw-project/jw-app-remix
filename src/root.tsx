import { useLoaderData } from '@remix-run/react';

import { Body } from './components/commons/body/body';
import { LanguageProvider } from './global-context/language';
import { ThemeProvider } from './global-context/theme';
import { DrawerProvider } from './hooks/drawer';
import { MenuProvider } from './hooks/menu';
import { SavingProvider } from './hooks/saving';
import type { RootLoaderReturn } from './root.server';

export { loader, links, meta } from './root.server';

export default function App() {
  const { locale, themeMode } = useLoaderData<RootLoaderReturn>();

  return (
    <LanguageProvider {...locale}>
      <ThemeProvider defaultTheme={themeMode}>
        <DrawerProvider>
          <SavingProvider>
            <MenuProvider>
              <Body />
            </MenuProvider>
          </SavingProvider>
        </DrawerProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
