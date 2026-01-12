import { config } from "process"

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
}
export default config;