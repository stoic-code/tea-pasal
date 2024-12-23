import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '1024px',
            xl: '1200px', // according to desing 1200 though
            '2xl': '1536px'
        },
        extend: {
            fontFamily: {
                serif: ['var(--font-playfair-display)'],
                sans: ['var(--font-nunito-sans)']
            },

            colors: {
                'page-background-color': '#FFFFFF',
                'page-section-background-color': '#f7f7f7',
                'normal-color': '#4f4f4f',
                'banner-header-color': '#000000',
                'header-color': '#2d2c2c',
                'black-light': '#242C30',
                body: '#4f4f4f',
                border: '#e9e9e9',
                'danger-light': '#e0333d',
                danger: '#D8000C',
                success: '#4F8A10',
                warning: '#9F6000',
                info: '#31708f',
                primary: '#4d8c40',
                'primary-light': '#88b44e',
                'primary-dark-10': '#4d8c40', // plus 10 in shade
                'primary-dark-20': '#4d8c40',
                'primary-dark-30': '#4d8c40',
                'primary-dark-40': '#4d8c40',
                'primary-light-10': '#94bc60', // minus 10 in tints
                'primary-light-20': '#a0c371',
                'primary-light-30': '#accb83',
                'primary-light-40': '#b8d295',
                'primary-light-50': '#c4daa7',
                'primary-light-60': '#cfe1b8',
                secondary: '#',
                accent: '#' // something that pops up.
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            keyframes: {
                toastify: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '50%,100%': { transform: 'translateY(0%)', opacity: '1' }
                }
            },
            animation: {
                toastify: 'toastify .5s linear forwards'
            }
        }
    },
    plugins: [
        // function ({ addUtilities }) {
        //     const newUtitlities = {
        //         '.scrollbar-thin': {
        //             scrollbarWidth: 'thin',
        //             scrollbarcolor: 'rgb(31 29 29) red'
        //         },
        //         '.scrollbar-webkit': {
        //             '&::webkit-scrollbar': {
        //                 width: '100px'
        //             }
        //         },
        //         '&::-webkit-scrollbar-track': {
        //             background: 'red'
        //         },
        //         '&::-webkit-scrollbar-thumb': {
        //             backgroundColor: 'rgb(31 41 55)',
        //             borderRadius: '20px',
        //             border: '1px solid green'
        //         }
        //     }
        //     addUtilities(newUtitlities, ['responsive', 'hover'])
        // }s
        // require('tailwind-scrollbar')
    ]
}
export default config
