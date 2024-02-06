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
        "action-color": "#262045",
        "primary-color": "#4F298B",
        "base-color-1": "#4A297F",
        "base-color-2": "#1A1E2E",
        "my-text-color": "#eaeaea"
      },
    },
  },
  plugins: [],
}
export default config
