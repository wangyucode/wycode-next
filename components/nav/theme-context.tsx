import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { Theme } from '../theme-switch';

export const ThemeContext = createContext(Theme.light);
export const ThemeDispatchContext = createContext<any>(null);

export function ThemeProvider({ children }: PropsWithChildren<any>) {
  const [theme, dispatch] = useReducer(
    themeReducer,
    Theme.light
  );

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeDispatch() {
  return useContext(ThemeDispatchContext);
}

function themeReducer(theme: Theme, action: { theme: Theme }) {
  return action.theme;
}