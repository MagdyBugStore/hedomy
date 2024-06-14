module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    theme: {
      extend: {
        colors: {
          primary: "rgb(var(--color-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-secondary) / <alpha-value>)",
          success: "rgb(var(--color-success) / <alpha-value>)",
          info: "rgb(var(--color-info) / <alpha-value>)",
          warning: "rgb(var(--color-warning) / <alpha-value>)",
          pending: "rgb(var(--color-pending) / <alpha-value>)",
          danger: "rgb(var(--color-danger) / <alpha-value>)",
          light: "rgb(var(--color-light) / <alpha-value>)",
          dark: "rgb(var(--color-dark) / <alpha-value>)",
          darkmode: {
            50: "rgb(var(--color-darkmode-50) / <alpha-value>)",
            100: "rgb(var(--color-darkmode-100) / <alpha-value>)",
            200: "rgb(var(--color-darkmode-200) / <alpha-value>)",
            300: "rgb(var(--color-darkmode-300) / <alpha-value>)",
            400: "rgb(var(--color-darkmode-400) / <alpha-value>)",
            500: "rgb(var(--color-darkmode-500) / <alpha-value>)",
            600: "rgb(var(--color-darkmode-600) / <alpha-value>)",
            700: "rgb(var(--color-darkmode-700) / <alpha-value>)",
            800: "rgb(var(--color-darkmode-800) / <alpha-value>)",
            900: "rgb(var(--color-darkmode-900) / <alpha-value>)",
          },
        },
        fontFamily: {
          roboto: ["Roboto"],
        },
        container: {
          center: true,
        },
        maxWidth: {
          "1/4": "25%",
          "1/2": "50%",
          "3/4": "75%",
        },
        strokeWidth: {
          0.5: 0.5,
          1.5: 1.5,
          2.5: 2.5,
        },
        backgroundImage: {
          "menu-active":
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='80' viewBox='0 0 20 122.1'%3E%3Cpath data-name='Union 1' d='M16.038 122H16v-2.213a95.805 95.805 0 00-2.886-20.735 94.894 94.894 0 00-7.783-20.434A39.039 39.039 0 010 61.051a39.035 39.035 0 015.331-17.567 94.9 94.9 0 007.783-20.435A95.746 95.746 0 0016 2.314V0h4v122h-3.961v.1l-.001-.1z' fill='%23f1f5f8'/%3E%3C/svg%3E\")",
          "menu-active-dark":
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='80' viewBox='0 0 20 122.1'%3E%3Cpath data-name='Union 1' d='M16.038 122H16v-2.213a95.805 95.805 0 00-2.886-20.735 94.894 94.894 0 00-7.783-20.434A39.039 39.039 0 010 61.051a39.035 39.035 0 015.331-17.567 94.9 94.9 0 007.783-20.435A95.746 95.746 0 0016 2.314V0h4v122h-3.961v.1l-.001-.1z' fill='%23232e45'/%3E%3C/svg%3E\")",
          "skew-pattern":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920.004' height='1193.001' viewBox='0 0 1920.004 1193.001'%3E%3Cpath id='Intersection_13' data-name='Intersection 13' d='M1183.231,1554.011,2050,361.011h346.311V1440.1l-82.762,113.912Zm-706.924-1193H918.725L476.308,969.945Z' transform='translate(-476.307 -361.011)' fill='rgba(255,255,255,0.02)'/%3E%3C/svg%3E%0A\")",
          "skew-pattern-dark":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920.004' height='1193.001' viewBox='0 0 1920.004 1193.001'%3E%3Cpath id='Intersection_13' data-name='Intersection 13' d='M1183.231,1554.011,2050,361.011h346.311V1440.1l-82.762,113.912Zm-706.924-1193H918.725L476.308,969.945Z' transform='translate(-476.307 -361.011)' fill='rgba(0,0,0,0.06)'/%3E%3C/svg%3E%0A\")",
          "bredcrumb-chevron-dark":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right breadcrumb__icon'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\")",
          "bredcrumb-chevron-light":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23e8eeff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right breadcrumb__icon'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\")",
          "bredcrumb-chevron-darkmode":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right breadcrumb__icon'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\")",
        },
        keyframes: {
          // Side & simple menu
          "intro-divider": {
            "100%": {
              opacity: 1,
            },
          },
          "intro-menu": {
            "100%": {
              opacity: 1,
              transform: "translateX(0px)",
            },
          },
          "active-side-menu-chevron": {
            "100%": {
              opacity: 1,
              "margin-right": "-27px",
            },
          },
  
          // Top menu
          "intro-top-menu": {
            "100%": {
              opacity: 1,
              transform: "translateY(0px)",
            },
          },
          "active-top-menu-chevron": {
            "100%": {
              opacity: 1,
              "margin-bottom": "-54px",
            },
          },
  
          // Wrapper
          "intro-wrapper": {
            "100%": {
              opacity: 1,
              transform: "translateX(0px)",
            },
          },
        },
      },
    },
  },
  plugins: [],
}

