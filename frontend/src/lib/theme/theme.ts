import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      '#__next': {
        minHeight: '100vh',
      },
      '.postText a': {
        textDecoration: 'underline',
      },
      '.postText ol, .postText ul': {
        paddingInlineStart: '20px',
      },
      '.datePickerTable .chakra-input': {
        outline: 'none !important',
      },
      '.MuiPopper-root, .MuiModal-root': {
        zIndex: '1400 !important',
      },
      body: {
        overflowX: 'clip',
        color: 'ui_dark',
      },
    },
  },

  colors: {
    yellow: {
      500: '#FFFF00',
    },
    pink: {
      500: '#FF5BDB',
    },
    radioGrey: {
      500: 'rgba(0, 0, 0, 0.2)',
    },
    greyMiddle: {
      500: 'rgba(0, 0, 0, 0.5)',
    },
    radioWhite: {
      500: '#ffffff',
    },
    radioBlack: {
      500: '#000',
    },
    whiteCheckbox: {
      500: '#ffffff',
    },
    blackCheckbox: {
      500: '#000',
    },
    blue: {
      500: '#9CABCF',
    },

    ui_main: 'rgba(240, 240, 240, 0.50)',

    ui_secondary: "#E4E4E4",

    ui_dark: '#000',

    ui_light: '#FFF',

    ui_grey: '#F0F0F0',

    ui_blue: '#DFE3EE',

    ui_inactive: 'rgba(0, 0, 0, 0.20)',

    ui_elements_outlines_separators: 'rgba(0, 0, 0, 0.10)',

    ui_elements_link: '#77C2E8',

    ui_semantic_negative: '#E24330',

    ui_semantic_positive: '#23A094',

    ui_accents_main: '#FFD45A',

    ui_accents_secondary: '#9CABCF',

    ui_accents_third: '#CDD5E7',

    ui_accents_fourth: '#EBEEF5',
  },

  fonts: {
    heading: 'Playfair Display, sans-serif',
    body: 'Work Sans, sans-serif',
    alt: 'Dancing Script, sans-serif',
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2.5rem',
  },

  components: {
    Input: {
      defaultProps: {
        variant: 'flushed',
      },
    },

    Text: {
      variants: {
        title: {
          fontFamily: 'heading',
          fontSize: '4rem',
          fontWeight: '500',
          lineHeight: '4.5rem',
        },
      },
    },

    Button: {
      baseStyle: {
        fontWeight: '500',
        textTransform: 'uppercase',
        rounded: 'none',
        lineHeight: '1rem',
      },

      sizes: {
        md: {
          px: 6,
          py: '0.875rem',
        },
        sm: {
          px: 6,
          py: '0.65rem',
        },
      },

      variants: {
        pink: {
          backgroundColor: '#FF5BDB',
          rounded: '3rem',
          color: 'white',
          height: 'fit-content',
          _hover: {
            backgroundColor: 'black',
          },

          _disabled: {
            _hover: {
              backgroundColor: '#FF5BDB !important',
              color: 'white',
            },
          },
        },
        transparent: {
          backgroundColor: 'transparent',
          rounded: '3rem',
          border: '0.125rem solid black',
          height: 'fit-content',
          fill: 'black',
          stroke: 'black',

          _hover: {
            backgroundColor: 'black',
            color: 'white',
            border: '0.125rem solid transparent',
            fill: 'white',
            stroke: 'white',
          },

          _disabled: {
            _hover: {
              backgroundColor: 'transparent !important',
              border: '0.125rem solid black',
              color: 'black',
            },
          },
        },

        regular: {
          color: 'ui_light',
          bg: 'ui_dark',
          width: 'fit-content',
          px: '1.5rem',
          py: '0.75rem',
          height: 'fit-content',
          rounded: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.8px',
          fontWeight: '400',
          fill:'ui_light',

          _hover: {
            fill:"ui_dark",
            backgroundColor: 'ui_accents_main',
            color: 'ui_dark',
            _disabled: {
              backgroundColor: 'ui_dark',
              color: 'ui_light',
            },
          },
        },

        action: {
          color: 'ui_dark',
          bg: 'ui_accents_main',
          width: 'fit-content',
          px: '1.5rem',
          py: '0.75rem',
          height: 'fit-content',
          rounded: '3rem',
          fill: 'ui_dark',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.8px',
          fontWeight: '400',
          _hover: {
            fill: 'ui_accents_main',
            backgroundColor: 'ui_dark',
            color: 'ui_light',
            _disabled: {
              backgroundColor: 'ui_dark',
              color: 'ui_light',
            },
          },
        },

        secondary: {
          backgroundColor: 'transparent',
          rounded: '3rem',
          py: '0.75rem',
          px: '1.5rem',
          borderWidth: '0.065rem',
          borderStyle: 'solid',
          borderColor: 'ui_dark',
          height: 'fit-content',
          fill: 'ui_dark',
          stroke: 'ui_dark',
          letterSpacing: '-0.8px',

          _hover: {
            backgroundColor: 'ui_dark',
            color: 'ui_light',
            borderColor: 'transparent',
            fill: 'ui_light',
            stroke: 'ui_light',
            _disabled: {
              backgroundColor: 'transparent !important',
              borderColor: 'ui_dark',
              color: 'ui_dark',
              fill: 'ui_dark',
              stroke: 'ui_dark',
            },
          },
        },

        red: {
          color: 'ui_semantic_negative',
          bg: 'transparent',
          width: 'fit-content',
          px: '1.5rem',
          py: '0.875rem',
          height: 'fit-content',
          rounded: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.8px',
          fontWeight: '400',
          borderWidth: '0.065rem',
          borderStyle: 'solid',
          borderColor: 'ui_semantic_negative',
          _hover: {
            backgroundColor: 'ui_semantic_negative',
            color: 'ui_light',
          },

          _disabled: {
            _hover: {
              backgroundColor: 'trsansparent !important',
              color: 'ui_semantic_negative',
            },
          },
        },

        black: {
          color: 'white',
          bg: 'black',
          width: 'fit-content',
          px: { base: '2rem', sm: '4rem' },
          py: '0.875rem',
          height: 'fit-content',
          rounded: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textTransform: 'uppercase',
          fontWeight: '500',
          border: '0.065rem solid transparent',
          fill: 'white',
          stroke: 'white',
          _hover: {
            backgroundColor: 'white',
            color: 'black',
            border: '0.065rem solid black',
            fill: 'black',
            stroke: 'black',
          },
          _disabled: {
            _hover: {
              backgroundColor: 'black !important',
              color: 'white',
            },
          },
        },
      },

      defaultProps: {},
    },

    Select: {
      defaultProps: {
        variant: 'flushed',
      },
    },
  },
});
