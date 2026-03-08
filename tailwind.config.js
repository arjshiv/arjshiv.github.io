module.exports = {
  darkMode: 'class',
  content: ['./public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        text: {
          light: '#111111',
          dark: '#f6f4ef',
        },
        subtle: {
          light: 'rgba(17, 17, 17, 0.65)',
          dark: 'rgba(246, 244, 239, 0.7)',
        },
        accent: '#ff4d3a',
        background: {
          light: '#f6f4ef',
          dark: '#0b0b0b',
        },
        panel: {
          light: '#ffffff',
          dark: '#111111',
        },
        line: {
          light: 'rgba(0, 0, 0, 0.18)',
          dark: 'rgba(255, 255, 255, 0.18)',
        },
      },
    },
  },
};
