import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "action-color": "#F9A3A3",
        "primary-color": "#93839D",
        "base-color": "#7D799A",
        "my-text-color": "#eaeaea"
      },
    },
  },
  plugins: [],
}
export default config
