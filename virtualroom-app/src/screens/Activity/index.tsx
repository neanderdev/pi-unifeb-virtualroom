import React from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';
import { ActivityClass } from '../../components/ActivityClass';

import {
    Container,
    ActivityList,
} from './styles';

export function Activity() {
    const activityData = {
        id: 'id',
        name: 'Material de apoio - TDE 01',
        dataPublished: '16 de setembro de 2022',
    };

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header
                title='Sistemas Operacionais'
            />

            <ActivityList
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <ActivityClass data={activityData} />}
            />
        </Container>
    );
}