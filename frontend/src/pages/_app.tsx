import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { DrawerProvider } from '../contexts/DrawerContext';

import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <DrawerProvider>
        <Component {...pageProps} />
      </DrawerProvider>
    </ChakraProvider>
  );
}

export default MyApp;
