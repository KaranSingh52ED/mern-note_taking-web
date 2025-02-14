/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#1E3A8A", // Professional deep blue
        lightBlue: "#3B82F6", // Vibrant accent blue
        grayText: "#4B5563", // Neutral gray for text
        grayBorder: "#D1D5DB", // Subtle border color
        hoverBlue: "#2563EB", // Hover effect blue
      },
      height: {
        heightWithoutNavbar: "calc(100vh - 80px)",
      },
      backgroundImage: {
        unsplashBgImage: "url('/img/bgImg.jpg')",
      },
    },

    animation: {
      float: "float 6s infinite",
      "float-reverse": "float-reverse 6s infinite",
    },
    keyframes: {
      float: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-20px)" },
      },
      "float-reverse": {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(20px)" },
      },
    },
  },
  plugins: [],
};
