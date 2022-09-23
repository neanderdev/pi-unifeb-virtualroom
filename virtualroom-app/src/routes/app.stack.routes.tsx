import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { AllActivities } from '../screens/AllActivities';

import { AppTabRoutes } from './app.tab.routes';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function AppStackRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Screen
                name="Home"
                component={Home}
            />

            <Group>
                <Screen
                    name="ClassRoom"
                    component={AppTabRoutes}
                />
                <Screen
                    name="Activity"
                    component={AppTabRoutes}
                />
                <Screen
                    name="Peoples"
                    component={AppTabRoutes}
                />
            </Group>

            <Screen
                name="AllActivities"
                component={AllActivities}
            />
        </Navigator>
    )
}