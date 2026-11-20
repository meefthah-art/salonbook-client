module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        salon: {
          primary: "#B4467B",
          "primary-content": "#FFFFFF",
          secondary: "#2B1E30",
          "secondary-content": "#F7EEF1",
          accent: "#C9A24D",
          "accent-content": "#241A05",
          neutral: "#2B1E30",
          "neutral-content": "#F7EEF1",
          "base-100": "#FFFFFF",
          "base-200": "#FAF4F6",
          "base-300": "#EBDDE3",
          "base-content": "#2B1E30",
          info: "#2F7DB5",
          success: "#2E8B57",
          warning: "#C98A12",
          error: "#C0392B",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "9999px",
        },
      },
    ],
  },
};
