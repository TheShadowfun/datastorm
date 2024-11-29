import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { eesti } from './src/eesti'

export default {
    darkMode: 'class',
    content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
    theme: {
        extend: {
            fontFamily: {
                aino: ['Aino', 'sans-serif'],
                'aino-headline': ['Aino Headline', 'sans-serif'],
            },
            colors: {
                'custom-blue': '#300096',
            },
        },
    },
    plugins: [
        forms,
        typography,
        skeleton({
            themes: {
                custom: [
                    eesti,
                ],
            },
        }),
        function({ addBase }) {
            addBase({
                '@font-face': [
                    {
                        fontFamily: 'Aino',
                        src: `url('/fonts/Aino-Regular.woff2') format('woff2'),
                              url('/fonts/Aino-Regular.woff') format('woff')`,
                        fontWeight: '400',
                        fontDisplay: 'swap',
                    },
                    {
                        fontFamily: 'Aino',
                        src: `url('/fonts/Aino-Bold.woff2') format('woff2'),
                              url('/fonts/Aino-Bold.woff') format('woff')`,
                        fontWeight: '700',
                        fontDisplay: 'swap',
                    },
                    {
                        fontFamily: 'Aino Headline',
                        src: `url('/fonts/Aino-Headline.woff2') format('woff2'),
                              url('/fonts/Aino-Headline.woff') format('woff')`,
                        fontWeight: '400',
                        fontDisplay: 'swap',
                    },
                ],
            });
        },
    ],
} satisfies Config;