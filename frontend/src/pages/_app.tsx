import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';

import { AuthProvider } from '../contexts/AuthContext';
import { DrawerProvider } from '../contexts/DrawerContext';
import { ModalProvider } from '../contexts/ModalContext';

import { queryClient } from '../services/queryClient';

import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <AuthProvider>
          <DrawerProvider>
            <ModalProvider>
              <Component {...pageProps} />
            </ModalProvider>
          </DrawerProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

