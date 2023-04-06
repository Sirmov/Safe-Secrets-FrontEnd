import React, { useContext } from 'react';

const ThemeContext = React.createContext({ mode: 'light' });

export default ThemeContext;

export function useThemeContext() {
    return useContext(ThemeContext);
}
