import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../contexts/AuthContext';
import { DrawerProvider } from '../contexts/DrawerContext';

import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <DrawerProvider>
          <Component {...pageProps} />
        </DrawerProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
