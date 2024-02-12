import type { Config } from 'tailwindcss';

/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
    darkMode: ['class'],
    content: ['./src/**/*.{ts,tsx}'],
    plugins: [],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', ...defaultTheme.fontFamily.sans],
                serif: ["'Roboto Slab'", ...defaultTheme.fontFamily.serif],
            },
        },
    },
} satisfies Config;
