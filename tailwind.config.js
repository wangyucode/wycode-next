/** @type {import('tailwindcss').Config} */ 
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './utils/**/*.{js,ts,jsx,tsx,mjs}',
        // For the best performance and to avoid false positives,
        // be as specific as possible with your content configuration.
    ],
    theme: {
        extend: {
            height:{
                'content': 'calc(100vh - 6.5rem)'
            }
        }
    },
    darkMode: 'class'
};