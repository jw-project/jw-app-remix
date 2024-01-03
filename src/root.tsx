import { useLoaderData } from '@remix-run/react';

import { Body } from './components/commons/body/body';
import { LanguageProvider } from './global-context/language';
import { MenuProvider } from './global-context/menu';
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
            <MenuProvider>
              <Body />
            </MenuProvider>
          </SavingProvider>
        </TransitionProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
