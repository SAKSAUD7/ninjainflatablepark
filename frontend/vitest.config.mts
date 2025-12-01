import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.ts',
        alias: {
            '@repo/ui': path.resolve(__dirname, '../../packages/ui/src'),
            '@': path.resolve(__dirname, './'),
        },
    },
})
