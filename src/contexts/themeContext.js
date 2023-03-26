import React, { useContext } from 'react';

const ThemeContext = React.createContext({ theme: 'light' });

export default ThemeContext;

export function useThemeContext() {
    return useContext(ThemeContext);
}
