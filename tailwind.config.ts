import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {    
    extend: {  
      backgroundImage: {
        'homepage_background_1': "url('/Homepage-background-1.svg')",
        'homepage_background_2': "url('/Homepage-background-2.svg')",
        'chat_background': "url('/chat-background.svg')",
      },   
      colors: {
        "action-color-1": "#1B998B",
        "action-color-2": "#15796E",
        "primary-color": "#4F298B",
        "base-color-1": "#8156C8",
        "base-color-2": "#6337A9",        
        "my-text-color": "#eaeaea",
        "gray-1": "#2F3241",
        "gray-2": "#717898"
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    },
  },
  plugins: [],
}
export default config
