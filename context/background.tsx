'use client';
import { createContext } from 'react';

export const BackgroundThemeContext = createContext({
	backgroundTheme: 'dark',
});

const BackgroundProvider = BackgroundThemeContext.Provider;

export { BackgroundProvider };
