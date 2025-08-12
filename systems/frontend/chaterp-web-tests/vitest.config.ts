// systems/frontend/chaterp-web-tests/vitest.config.ts

// @ts-expect-error: VS2022 ne reconnaît pas le module ESM vitest
import { defineConfig } from 'vitest/config';
// @ts-expect-error: VS2022 ne reconnaît pas le module ESM plugin-react
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['tests/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: resolve(__dirname, 'coverage-report/coverage/'),
            include: ['../chaterp-web/src/**/*.{ts,tsx}'],
            exclude: ['**/*.test.ts', '**/*.spec.ts', 'node_modules/**'],
            skipFull: false,
            clean: true,
            all: true,
        },
    },
});
