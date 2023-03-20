import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
const tailwindcss = require('tailwindcss');
const path = require('path');

export default defineConfig(({ command, mode })=>{
    let env = loadEnv(mode, process.cwd(), '');
    return {
            plugins: [
                laravel({
                    input: [
                        'resources/css/app.css',
                        'resources/js/app.js',
                    ],
                    refresh: true,
                }),
                vue({
                    template: {
                        transformAssetUrls: {
                            base: null,
                            includeAbsolute: false,
                        },
                    },
                }),
            ],
            define: {
                'process.env': env,
            },
            resolve: {
                alias: {
                    vue: 'vue/dist/vue.esm-bundler.js',
                },
            },

            build: {
                outDir: "public/build",
                cssCodeSplit: true,
                emptyOutDir: true,
                minify: true,
                assetsDir: "", 
                rollupOptions: {
                input: {
                    index: "resources/js/app.js",
                    tailwind: "resources/css/app.css",
                },  
                output: {
                    entryFileNames: "[name].js",
                    assetFileNames: "[name].[ext]",
                },  
                },  
            }
        };
})
