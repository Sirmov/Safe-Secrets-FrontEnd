import React, { useContext } from 'react';

interface ThemeContextType {
    mode: 'light' | 'dark';
}

const ThemeContext = React.createContext<ThemeContextType>({ mode: 'light' });

export default ThemeContext;

export function useThemeContext() {
    return useContext(ThemeContext);
}
