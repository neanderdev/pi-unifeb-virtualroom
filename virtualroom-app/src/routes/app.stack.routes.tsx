import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { AllActivities } from '../screens/AllActivities';
import { ActivityByUid } from '../screens/ActivityByUid';

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
                <Screen
                    name="ActivityByUid"
                    component={ActivityByUid}
                />
            </Group>

            <Screen
                name="AllActivities"
                component={AllActivities}
            />
        </Navigator>
    )
}