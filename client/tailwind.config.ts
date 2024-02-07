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
        "action-color": "#C86AB4",
        "primary-color": "#4F298B",
        "base-color": "#8156C8",
        "my-text-color": "#eaeaea"
      },
    },
  },
  plugins: [],
}
export default config
