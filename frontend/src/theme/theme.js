import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const getNewspaperTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#000000' : '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#333333' : grey[400],
      },
    },
    typography: {
      fontFamily: '"Playfair Display", "Roboto Slab", serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        borderBottom: `2px solid ${mode === 'light' ? '#000' : '#fff'}`,
        paddingBottom: '0.5rem',
        marginBottom: '1rem',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        color: mode === 'light' ? '#000' : '#fff', // Добавлен цвет текста для body1
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            border: `1px solid ${mode === 'light' ? '#000' : '#fff'}`,
            boxShadow: 'none',
            backgroundColor: mode === 'light' ? '#fff' : '#1e1e1e',
            color: mode === 'light' ? '#000' : '#fff',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            border: `1px solid ${mode === 'light' ? '#000' : '#fff'}`,
            borderRadius: 0,
            boxShadow: 'none',
            backgroundColor: mode === 'light' ? '#fff' : '#333', // Button background color changes based on theme
            color: mode === 'light' ? '#000' : '#fff',
            '&:hover': {
              backgroundColor: mode === 'light' ? grey[200] : grey[800],
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
              backgroundColor: mode === 'light' ? '#fff' : '#333', // Textfield background color changes based on theme
              '& fieldset': {
                borderColor: mode === 'light' ? '#000' : '#fff',
              },
              '&:hover fieldset': {
                borderColor: mode === 'light' ? '#000' : '#ddd',
              },
            },
            '& .MuiInputLabel-root': {
              color: mode === 'light' ? '#000' : '#ccc',
            },
          },
        },
      },
    },
  });

export default getNewspaperTheme;
