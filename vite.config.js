// https://github.com/vitejs/vite/discussions/3448
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized'
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig({
    plugins: [react(), jsconfigPaths()],
    // https://github.com/jpuri/react-draft-wysiwyg/issues/1317
    // define: {
    //     global: 'window'
    // },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [fixReactVirtualized],
        },
    },
    resolve: {
        alias: [
            {
                // this is required for the SCSS modules
                find: /^~(.*)$/,
                replacement: '$1',
            },
            {
                find: /^~(.+)/,
                replacement: path.join(process.cwd(), 'node_modules/$1')
            },
            {
                find: /^src(.+)/,
                replacement: path.join(process.cwd(), 'src/$1')
            }
        ]
    },
    server: {
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000
        port: 3000
    },
    preview: {
        // this ensures that the browser opens upon preview start
        open: true,
        // this sets a default port to 3000
        port: 3000
    },
    build: {
        outDir: "./build",
        emptyOutDir: true,
    }
});
