/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        
        // Agricultural theme colors
        soil: {
          50: '#faf7f0',
          100: '#f4eee0',
          200: '#e8d9c0',
          300: '#d9c09d',
          400: '#c9a57a',
          500: '#b38b5d',
          600: '#96724b',
          700: '#795a3c',
          800: '#5c442e',
          900: '#3f2e20',
        },
        
        crop: {
          wheat: '#fef3c7',
          corn: '#fde68a',
          rice: '#fed7aa',
          soybean: '#bbf7d0',
          cotton: '#f3f4f6',
        },
        
        // Extended functional colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          900: '#14532d',
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          900: '#78350f',
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          900: '#7f1d1d',
        },
        
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
        mono: [
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
      },
      
      borderWidth: {
        '3': '3px',
      },
      
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'grow': 'grow 2s ease-in-out infinite',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        grow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      
      backgroundImage: {
        'gradient-agri': 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
        'gradient-soil': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        'gradient-weather': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
        'gradient-crop': 'linear-gradient(135deg, #84CC16 0%, #EAB308 100%)',
        
        // Pattern backgrounds
        'pattern-dots': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
        'pattern-grid': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='none'/%3E%3Cpath d='M1 1h1v1H1zM2 2h1v1H2zM3 3h1v1H3zM4 4h1v1H4zM5 5h1v1H5zM6 6h1v1H6zM7 7h1v1H7zM8 8h1v1H8zM9 9h1v1H9zM10 10h1v1h-1zM11 11h1v1h-1zM12 12h1v1h-1zM13 13h1v1h-1zM14 14h1v1h-1zM15 15h1v1h-1zM16 16h1v1h-1zM17 17h1v1h-1zM18 18h1v1h-1zM19 19h1v1h-1z' fill='%239C92AC' fill-opacity='0.1'/%3E%3C/svg%3E\")",
      },
      
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'custom-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
        'custom-xl': '0 20px 60px rgba(0, 0, 0, 0.16)',
        
        // Glow shadows
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-yellow': '0 0 20px rgba(245, 158, 11, 0.3)',
      },
      
      zIndex: {
        '60': 60,
        '70': 70,
        '80': 80,
        '90': 90,
        '100': 100,
      },
      
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform',
        'opacity': 'opacity',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}