/* eslint-env node */
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    root: path.resolve(__dirname, './src'),
    plugins: [react()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, './src') },
            { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
            { find: '@contexts', replacement: path.resolve(__dirname, './src/contexts') },
            { find: '@layout', replacement: path.resolve(__dirname, './src/layout') },
            { find: '@components', replacement: path.resolve(__dirname, './src/components') },
            { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
            { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
            { find: '@services', replacement: path.resolve(__dirname, './src/services') },
            { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
        ],
    },
});
