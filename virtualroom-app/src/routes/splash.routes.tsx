import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Splash } from '../screens/Splash';

import { AppStackRoutes } from './app.stack.routes';
import { AuthRoutes } from './auth.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function SplashRoutes() {
    const user: { id: string } = {
        id: 'id-user',
    }

    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Screen
                name="Splash"
                component={Splash}
            />
            <Screen
                name="Home"
                component={user.id ? AppStackRoutes : AuthRoutes}
            />
        </Navigator>
    )
}