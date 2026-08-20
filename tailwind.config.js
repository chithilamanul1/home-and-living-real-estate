/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#EFF6FC',
                    100: '#DCEBF7',
                    200: '#B7DAF2',
                    300: '#8FC2E6',
                    500: '#3B82C4',
                    600: '#2E6DAB',
                    700: '#245688',
                },
                ink: {
                    400: '#8792A5',
                    500: '#5B6678',
                    700: '#2B3545',
                    900: '#0E1620',
                },
                mist: '#F2F7FB',
                line: '#E3EBF3',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                card: '0 1px 2px rgba(14,22,32,0.03), 0 10px 30px rgba(14,22,32,0.05)',
                lift: '0 16px 44px rgba(14,22,32,0.10)',
            },
            letterSpacing: {
                display: '-0.03em',
            },
        },
    },
    plugins: [],
}
