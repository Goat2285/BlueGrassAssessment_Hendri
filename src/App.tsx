// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import SnackbarProvider from './components/snackbar';
import { MotionLazyContainer } from './components/animate';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider>       
          <ThemeLocalization>
            <SnackbarProvider>
              <Router />
            </SnackbarProvider>
          </ThemeLocalization>        
        </ThemeProvider>
      </LocalizationProvider>
    </MotionLazyContainer>
  );
}
