// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import SnackbarProvider from './components/snackbar';
import { MotionLazyContainer } from './components/animate';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>       
        <ThemeLocalization>
          <SnackbarProvider>
            <Router />
          </SnackbarProvider>
        </ThemeLocalization>        
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
