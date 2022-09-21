import 'react-native-gesture-handler';

import React, { useCallback, useEffect, useState } from 'react';
import { View, LogBox } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components';

import { AppProvider } from "./src/hooks";

import { Routes } from "./src/routes";

import theme from './src/styles/theme';

LogBox.ignoreLogs([
  'Found screens with the same name nested inside one another. Check:'
])

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Roboto_400Regular,
          Roboto_500Medium,
          Roboto_700Bold,
          Roboto_900Black,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <View
          onLayout={onLayoutRootView}
          style={{
            flex: 1
          }}
        >
          <AppProvider>
            <Routes />
          </AppProvider>
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
