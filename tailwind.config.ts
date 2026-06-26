import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // LIGHT theme — palette matched to the live ttaskiran.com (Astra).
        // Token names are semantic ROLES (kept stable so component classes
        // don't churn), not literal colors:
        //   graphite = page background, surface = card/alt section,
        //   ivory = primary/heading text, muted = secondary text,
        //   brass  = the single accent (ttaskiran red), frame = hairline.
        graphite: '#FFFFFF', // page background (ast-global-color-4)
        surface: '#F6F7F8', // card / alt section (ast-global-color-8)
        ivory: '#1E1810', // primary / heading text (ast-global-color-2)
        muted: '#62615C', // secondary text (ast-global-color-3)
        brass: '#CF2929', // accent — ttaskiran red (ast-global-color-0)
        'brass-light': '#E04545',
        'brass-dark': '#9F1C1C',
        frame: 'rgba(30,24,16,0.12)', // faint warm hairline (~#eaeaea on white)
      },
      fontFamily: {
        // Wired through next/font in layout.tsx
        display: ['var(--font-archivo)', 'Archivo', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
        widest3: '0.42em',
      },
      backgroundImage: {
        // Accent stat numeral — refined red gradient (light theme)
        'brass-metallic':
          'linear-gradient(135deg, #E04545 0%, #CF2929 50%, #9F1C1C 100%)',
      },
      keyframes: {
        sheen: {
          '0%': { backgroundPosition: '-150% 0' },
          '100%': { backgroundPosition: '250% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        sheen: 'sheen 2.4s ease-out 1',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.25,0.1,0.25,1) both',
      },
      transitionTimingFunction: {
        dossier: 'cubic-bezier(0.25,0.1,0.25,1)',
      },
    },
  },
  plugins: [],
};

export default config;
