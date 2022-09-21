import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { ClassRoom } from '../screens/ClassRoom';
import { Activity } from '../screens/Activity';
import { Peoples } from '../screens/Peoples';

import HomeSvg from '../assets/home.svg';
import AccelerationSvg from '../assets/acceleration.svg';
import PeopleSvg from '../assets/people.svg';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: theme.colors.text_detail,
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 50,
                    backgroundColor: theme.colors.background_primary,
                }
            }}
        >
            <Screen
                name="ClassRoom"
                component={ClassRoom}
                options={{
                    tabBarIcon: (({ color }) => (
                        <HomeSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
            <Screen
                name="Activity"
                component={Activity}
                options={{
                    tabBarIcon: (({ color }) => (
                        <AccelerationSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
            <Screen
                name="Peoples"
                component={Peoples}
                options={{
                    tabBarIcon: (({ color }) => (
                        <PeopleSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
        </ Navigator>
    )
}