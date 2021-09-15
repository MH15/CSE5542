import { defineConfig } from 'vite'

export default defineConfig({
    // ...
    build: {
        minify: false,
        brotliSize: false,
        rollupOptions: {
            output: {
                preserveModules: true,
                dir: 'dist',
                // format: 'es',
                // chunkFileNames: '[name].js'
            },
            // manualChunks: id => path.parse(id).name,
            // preserveEntrySignatures: "exports-only"
        }
    },
    esbuild: {
        minify: false
    },

    // rollupOptions: {

    //     output: {
    //         entryFileNames: `assets/[name].js`,
    //         chunkFileNames: `assets/[name].js`,
    //         assetFileNames: `assets/[name].[ext]`,
    //         preserveModules: true
    //     }
    // }
})
