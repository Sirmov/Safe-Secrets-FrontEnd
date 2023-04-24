import React, { useContext } from 'react';

import { ThemeModes } from '@models/enums/themeModes';
import { Theme } from '@models/theme/theme';

interface ThemeContextType {
    theme: Theme;
    setTheme?: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = React.createContext<ThemeContextType>({ theme: { mode: ThemeModes.Light } });

export default ThemeContext;

export function useThemeContext() {
    return useContext(ThemeContext);
}
