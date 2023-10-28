import { createTheme } from '@mui/material/styles'; 
import { red } from '@mui/material/colors'; 
  
// Create a theme instance. 
const theme = createTheme({ 
    palette: { 
        palette:{
            type: 'dark'
        },
        primary: { 
            main: '#556cd6', 
        }, 
        secondary: { 
            main: '#66B2FF', 
        }, 
        error: { 
            main: red.A400, 
        }, 
    }, 
}); 
  
export default theme;