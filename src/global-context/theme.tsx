import React, { createContext, useContext, useState } from 'react';

export type Theme = 'light' | 'dark';

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => Theme;
}>({
  theme: 'light',
  toggleTheme: () => 'light',
});

export const ThemeProvider = ({
  children,
  defaultTheme,
}: React.PropsWithChildren<{ defaultTheme: Theme }>) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    let newTheme: Theme = defaultTheme;
    setTheme((current) => {
      newTheme = current === 'light' ? 'dark' : 'light';

      return newTheme;
    });

    return newTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
