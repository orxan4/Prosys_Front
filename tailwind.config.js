/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        lights: 'lights 5s linear infinite',
      },
      keyframes: {
        lights: {
          '0%': {
            color: 'hsl(230, 40%, 80%)',
            textShadow: `
              0 0 1em hsla(320, 100%, 50%, 0.2),
              0 0 0.125em hsla(320, 100%, 60%, 0.3),
              -1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
              1em 0.125em 0.5em hsla(200, 100%, 60%, 0)
            `,
          },
          '30%': {
            color: 'hsl(230, 80%, 90%)',
            textShadow: `
              0 0 1em hsla(320, 100%, 50%, 0.5),
              0 0 0.125em hsla(320, 100%, 60%, 0.5),
              -0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
              0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4)
            `,
          },
          '40%': {
            color: 'hsl(230, 100%, 95%)',
            textShadow: `
              0 0 1em hsla(320, 100%, 50%, 0.5),
              0 0 0.125em hsla(320, 100%, 90%, 0.5),
              -0.25em -0.125em 0.125em hsla(40, 100%, 60%, 0.2),
              0.25em 0.125em 0.125em hsla(200, 100%, 60%, 0.4)
            `,
          },
          '70%': {
            color: 'hsl(230, 80%, 90%)',
            textShadow: `
              0 0 1em hsla(320, 100%, 50%, 0.5),
              0 0 0.125em hsla(320, 100%, 60%, 0.5),
              0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
              -0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4)
            `,
          },
          '100%': {
            color: 'hsl(230, 40%, 80%)',
            textShadow: `
              0 0 1em hsla(320, 100%, 50%, 0.2),
              0 0 0.125em hsla(320, 100%, 60%, 0.3),
              1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
              -1em 0.125em 0.5em hsla(200, 100%, 60%, 0)
            `,
          },
        },
      },
    },
  },
  plugins: [],
  important: true,
};
