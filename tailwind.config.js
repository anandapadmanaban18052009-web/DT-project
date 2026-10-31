/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030712',
          900: '#070d1e',
          850: '#0b1329',
          800: '#0f1a36',
          750: '#142247',
          700: '#1a2b56',
        },
        brand: {
          cyan: '#06b6d4',
          cyanLight: '#67e8f9',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          purpleLight: '#c084fc',
          accent: '#10b981'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-glow': 'radial-gradient(at 20% 20%, rgba(6, 182, 212, 0.15) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(139, 92, 246, 0.15) 0px, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
