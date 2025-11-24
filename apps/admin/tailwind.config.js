/** @type {import('tailwindcss').Config} */
const sharedConfig = require("@repo/config/tailwind.config");

module.exports = {
    ...sharedConfig,
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    ],
};
