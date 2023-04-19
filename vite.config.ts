/* eslint-env node */
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig((config) => ({
    root: path.resolve(__dirname, './src'),
    build: {
        outDir: path.resolve(__dirname, './dist'),
        assetsDir: './assets',
    },
    esbuild: {
        drop: config.mode !== 'development' ? ['console', 'debugger'] : [],
    },
    test: {
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/server/**',
            '**/cypress/**',
            '**/.{idea,git,cache,output,temp}/**',
            '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        ],
        setupFiles: path.resolve(__dirname, './src/tests/setupTests.js'),
        globals: true,
        environment: 'jsdom',
        coverage: {
            all: true,
            provider: 'c8',
            reporter: ['text', 'html', 'lcovonly'],
            reportsDirectory: path.resolve(__dirname, './src/tests/reports/coverage/'),
            exclude: [
                'coverage/**',
                'dist/**',
                'server/**',
                'packages/*/test{,s}/**',
                '**/*.d.ts',
                'cypress/**',
                'test{,s}/**',
                'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
                '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
                '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
                '**/__tests__/**',
                '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
                '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
            ],
        },
        reporters: ['default', 'html'],
        outputFile: path.resolve(__dirname, './src/tests/reports/tests/index.html'),
    },
    publicDir: path.resolve(__dirname, './src/assets'),
    envDir: __dirname,
    plugins: [react()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, './src') },
            { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
            { find: '@contexts', replacement: path.resolve(__dirname, './src/contexts') },
            { find: '@layout', replacement: path.resolve(__dirname, './src/layout') },
            { find: '@models', replacement: path.resolve(__dirname, './src/models') },
            { find: '@services', replacement: path.resolve(__dirname, './src/services') },
            { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
            { find: '@components', replacement: path.resolve(__dirname, './src/components') },
            { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
            { find: '@validators', replacement: path.resolve(__dirname, './src/validators') },
            { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
        ],
    },
}));
