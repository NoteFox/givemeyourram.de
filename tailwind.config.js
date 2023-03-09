/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'primary': 'white',
                'secondary': '#23274E',
            },
            animation: {
                'backgroundPanning': 'panning 20s ease-in-out infinite'
            },
            keyframes: {
                panning: {
                    '0%, 100%': {
                        backgroundPosition: '50% 30%',
                        backgroundSize: '300%'
                    },
                    '30%': {
                        backgroundPosition: '70% 70%',
                        backgroundSize: '300%'
                    },
                    '60%': {
                        backgroundPosition: '78% 45%',
                        backgroundSize: '460%'
                    }
                }
            }
        },
    },
    plugins: [],
}
