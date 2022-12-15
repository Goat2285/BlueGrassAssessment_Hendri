// i18n
import './locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// components
import { SettingsProvider } from './components/settings';
import ScrollToTop from './components/scroll-to-top';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Check our docs
// https://docs.minimals.cc/authentication/ts-version

import { AuthProvider } from './auth/AuthContext';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import App from './App';

const queryClient = new QueryClient()
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
            <ScrollToTop />
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </BrowserRouter>
        </SettingsProvider>
      </HelmetProvider>
    </AuthProvider>
  </QueryClientProvider>
);

